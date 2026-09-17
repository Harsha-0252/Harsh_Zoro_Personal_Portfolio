import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, Send, X } from "lucide-react";

const GREETING = { role: "bot", text: "$ whoami --ask\nHey, I'm Zoro — Harsha's portfolio bot. Ask me about his experience, projects, or skills." };

export default function ChatBot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([GREETING]);
    const [input, setInput] = useState("");
    const [sending, setSending] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages, open]);

    const send = async (e) => {
        e.preventDefault();
        const text = input.trim();
        if (!text || sending) return;
        const next = [...messages, { role: "user", text }];
        setMessages(next);
        setInput("");
        setSending(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: text,
                    // last 6 turns of history for short-term context; keeps payload small
                    history: next.slice(-7, -1).map((m) => ({ role: m.role === "bot" ? "assistant" : "user", content: m.text })),
                }),
            });
            if (!response.ok) throw new Error("chat request failed");
            const data = await response.json();
            setMessages((cur) => [...cur, { role: "bot", text: data.reply }]);
        } catch (err) {
            setMessages((cur) => [...cur, { role: "bot", text: "Connection dropped — please try again in a moment, or reach Harsha directly via the contact section." }]);
        } finally {
            setSending(false);
        }
    };

    return (
        <>
            <motion.button
                className="chat-fab"
                data-testid="chatbot-toggle-button"
                onClick={() => setOpen((v) => !v)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                aria-label={open ? "Close chat" : "Ask Zoro about Harsha"}
            >
                {open ? <X size={20} /> : <MessageSquare size={20} />}
            </motion.button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="chat-panel glass"
                        data-testid="chatbot-panel"
                        initial={{ opacity: 0, y: 24, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 24, scale: 0.96 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="window-bar"><span></span><span></span><span></span><b>zoro.sh</b></div>
                        <div className="chat-messages" ref={scrollRef} data-testid="chatbot-messages">
                            {messages.map((m, i) => (
                                <div key={i} className={`chat-msg ${m.role}`}>
                                    {m.role === "bot" && <span className="chat-prompt">$</span>}
                                    <p>{m.text}</p>
                                </div>
                            ))}
                            {sending && <div className="chat-msg bot"><span className="chat-prompt">$</span><p className="chat-typing">thinking<span>.</span><span>.</span><span>.</span></p></div>}
                        </div>
                        <form className="chat-input-row" onSubmit={send}>
                            <input
                                data-testid="chatbot-input"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about experience, projects, skills..."
                                aria-label="Ask a question about Harshavardhan"
                            />
                            <button type="submit" data-testid="chatbot-send-button" disabled={sending || !input.trim()} aria-label="Send">
                                <Send size={15} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
