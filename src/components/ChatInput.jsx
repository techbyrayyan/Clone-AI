"use client"

import { useState, useRef, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ChatInput({ onSend, loading }) {
    const [text, setText] = useState("");
    const textareaRef = useRef(null);

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
        }
    };

    useEffect(() => {
        adjustHeight();
    }, [text]);

    const handleSubmit = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        if (!text.trim()) return;
        onSend(text.trim());
        setText("");
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{
            position: "relative",
            display: "flex",
            marginTop: "16px",
            width: "100%",
            alignItems: "flex-end",
        }}>
            <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Anything...."
                rows={1}
                style={{
                    minHeight: "48px",
                    maxHeight: "200px",
                    backgroundColor: "#262626",
                    color: "#ffffff",
                    padding: "12px 48px 12px 16px",
                    borderRadius: "24px",
                    border: "none",
                    outline: "none",
                    width: "100%",
                    resize: "none",
                    overflowY: "auto",
                    fontSize: "16px",
                }}
            />
            <button
                type="submit"
                disabled={loading || !text.trim()}
                style={{
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    right: "12px",
                    bottom: "8px",
                    cursor: text.trim() ? "pointer" : "default",
                    opacity: 1,
                    transition: "all 0.2s ease",
                }}
            >
                {loading ? (
                    <span style={{ fontSize: "12px" }}>...</span>
                ) : (
                    <ArrowUp size={18} strokeWidth={2} />
                )}
            </button>
        </form>
    );
}