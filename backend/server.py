from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Literal, Optional
import uuid
import asyncio
import html
import resend
from datetime import datetime, timezone
from openai import OpenAI
from profile_context import SYSTEM_PROMPT

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

RESEND_API_KEY = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL')
CONTACT_EMAIL = os.environ.get('CONTACT_EMAIL')
resend.api_key = RESEND_API_KEY

# Groq (OpenAI-compatible, free tier) client for the portfolio chatbot
GROQ_API_KEY = os.environ.get('GROQ_API_KEY')
# Updated to a stable, active model
GROQ_MODEL = os.environ.get('GROQ_MODEL', 'llama3-8b-8192')

groq_client = OpenAI(api_key=GROQ_API_KEY, base_url="https://api.groq.com/openai/v1") if GROQ_API_KEY else None

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactRequest(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(min_length=1, max_length=5000)

class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=2000)

class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=800)
    history: List[ChatMessage] = Field(default_factory=list, max_length=6)

@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/contact")
async def send_contact_message(request: ContactRequest):
    safe_name = html.escape(request.name)
    safe_email = html.escape(str(request.email))
    safe_message = html.escape(request.message).replace("\n", "<br>")

    params = {
        "from": SENDER_EMAIL,
        "to": [CONTACT_EMAIL],
        "reply_to": str(request.email),
        "subject": f"Portfolio message from {safe_name}",
        "html": f"<div style='font-family:Arial,sans-serif;line-height:1.6'><h2>New portfolio message</h2><p><strong>Name:</strong> {safe_name}</p><p><strong>Email:</strong> {safe_email}</p><hr><p>{safe_message}</p></div>",
    }
    try:
        email = await asyncio.to_thread(resend.Emails.send, params)
        return {"status": "success", "message": "Your message was sent successfully.", "email_id": email.get("id")}
    except Exception as exc:
        logger.exception("Failed to send portfolio contact message")
        raise HTTPException(status_code=502, detail="Unable to send your message right now. Please email Harshavardhan directly.") from exc

@api_router.post("/chat")
async def chat(request: ChatRequest):
    if groq_client is None:
        raise HTTPException(status_code=503, detail="Chatbot isn't configured yet — GROQ_API_KEY missing.")

    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    messages += [{"role": m.role, "content": m.content} for m in request.history]
    messages.append({"role": "user", "content": request.message})

    try:
        completion = await asyncio.to_thread(
            groq_client.chat.completions.create,
            model=GROQ_MODEL,
            messages=messages,
            max_tokens=400,
            temperature=0.4,
        )
        reply = completion.choices[0].message.content
        return {"reply": reply}
    except Exception as exc:
        logger.exception("Chatbot request failed")
        raise HTTPException(status_code=502, detail="Chatbot is unavailable right now — please try again shortly.") from exc

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()