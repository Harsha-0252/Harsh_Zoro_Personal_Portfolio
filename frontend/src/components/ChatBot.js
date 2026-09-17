import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, X, Sparkles, Trash2 } from "lucide-react";
import zoroAvatar from "@/assets/zoro-avatar.png";

const GREETING = { role: "bot", text: "Hi! Ask me about Harsha's projects, skills, experience, or education, and I'll help you find what you're looking for." };

const SUGGESTIONS = [
    "What has Harsha built?",
    "What are his technical skills?",
    "Tell me about his experience at Ivanti.",
    "What AI projects has he worked on?"
];

export default function ChatBot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([GREETING]);
    const [input, setInput] = useState("");
    const [sending, setSending] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages, open]);

    const send = async (e, directText = null) => {
        if (e) e.preventDefault();
        const text = (directText || input).trim();
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
        <div className="fixed bottom-6 right-6 z-50 flex items-center justify-end">
            <AnimatePresence>
                {!open && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10, scale: 0.9 }}
                        className="absolute right-[5rem] bg-[#1E293B] text-[#E2E8F0] border border-[#334155] px-4 py-2.5 rounded-2xl whitespace-nowrap shadow-xl text-sm font-medium flex items-center gap-2 pointer-events-none"
                    >
                        <Sparkles size={16} className="text-[#00FF66]" />
                        Yoo! I'm Zoro! Want some tea on Harsha? Ask me.
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Avatar Container with Siri-style Outer Glow */}
            <div className="relative">
                {/* Outer Glow Pulse (Visible only when closed) */}
                {!open && (
                    <div className="absolute -inset-2 rounded-full bg-[#00FF66] opacity-30 blur-xl animate-pulse pointer-events-none z-0" />
                )}

                <motion.button
                    className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl overflow-hidden transition-all duration-300 border-2 ${open ? 'bg-[#0B0F17] border-[#00FF66] shadow-[0_0_20px_rgba(0,255,102,0.4)]' : 'border-transparent bg-[#0B0F17]'}`}
                    data-testid="chatbot-toggle-button"
                    onClick={() => setOpen((v) => !v)}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={open ? "Close chat" : "Ask Zoro about Harsha"}
                >
                    {open ? (
                        <X size={24} className="text-[#00FF66]" />
                    ) : (
                        <img src={zoroAvatar} alt="" className="w-full h-full object-cover rounded-full" />
                    )}
                </motion.button>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="absolute bottom-20 right-0 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[70vh] bg-[#131C2D] border border-[#1E293B] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                        data-testid="chatbot-panel"
                        initial={{ opacity: 0, y: 24, scale: 0.96, originX: 1, originY: 1 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 24, scale: 0.96 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="flex justify-between items-center bg-[#0B0F17] p-4 border-b border-[#1E293B]">
                            <div>
                                <h3 className="text-sm font-semibold text-[#E2E8F0]">Zoro Assistant</h3>
                                <p className="text-xs text-[#94A3B8]">Ask about his projects, skills, or experience</p>
                            </div>
                            <button onClick={() => setMessages([GREETING])} className="text-[#94A3B8] hover:text-[#00FF66] transition-colors" aria-label="Clear chat">
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef} data-testid="chatbot-messages">
                            {messages.map((m, i) => (
                                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${m.role === "user" ? "bg-[#1E293B] text-white rounded-tr-sm" : "bg-[#0B0F17] border border-[#1E293B] text-[#E2E8F0] rounded-tl-sm"}`}>
                                        <p className="whitespace-pre-wrap">{m.text}</p>
                                    </div>
                                </div>
                            ))}

                            {messages.length === 1 && (
                                <div className="pt-2">
                                    <p className="text-xs text-[#94A3B8] mb-3 uppercase tracking-wider font-semibold">Try Asking</p>
                                    <div className="space-y-2">
                                        {SUGGESTIONS.map(sug => (
                                            <button key={sug} onClick={() => send(null, sug)} className="w-full text-left p-3 text-sm text-[#E2E8F0] bg-[#0B0F17] border border-[#1E293B] rounded-xl hover:border-[#00FF66] transition-colors">
                                                {sug}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {sending && (
                                <div className="flex justify-start">
                                    <div className="bg-[#0B0F17] border border-[#1E293B] rounded-2xl rounded-tl-sm px-4 py-3">
                                        <p className="chat-typing text-[#00FF66] text-sm">thinking<span>.</span><span>.</span><span>.</span></p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <form className="p-3 bg-[#0B0F17] border-t border-[#1E293B] flex items-center gap-2" onSubmit={(e) => send(e)}>
                            <input
                                className="flex-1 bg-transparent border border-[#1E293B] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#00FF66] transition-colors"
                                data-testid="chatbot-input"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about Harsha's work..."
                                aria-label="Ask a question"
                            />
                            <button
                                className="w-10 h-10 rounded-xl bg-[#1E293B] text-white flex items-center justify-center hover:bg-[#00FF66] hover:text-black transition-colors disabled:opacity-50 disabled:hover:bg-[#1E293B] disabled:hover:text-white"
                                type="submit"
                                data-testid="chatbot-send-button"
                                disabled={sending || !input.trim()}
                                aria-label="Send"
                            >
                                <Send size={16} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
