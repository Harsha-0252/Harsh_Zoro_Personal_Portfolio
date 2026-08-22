import os
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")


def test_api_root_is_available():
    response = requests.get(f"{BASE_URL}/api/", timeout=15)
    assert response.status_code == 200
    assert response.json().get("message") == "Hello World"


def test_contact_rejects_malformed_input():
    response = requests.post(f"{BASE_URL}/api/contact", json={"name": "", "email": "bad", "message": ""}, timeout=15)
    assert response.status_code == 422
