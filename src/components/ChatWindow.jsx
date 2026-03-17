"use client";
import { useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { useChat } from "@/context/ChatContext";

export default function ChatWindow() {
    const { currentMessages: messages, sendMessage, loading } = useChat();
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex flex-col h-full max-w-3xl mx-auto p-4">
            {messages.length === 0 ? (
                <div className="flex-1 flex flex-col justify-center items-center w-full">
                    <h2 className="text-2xl md:text-3xl mb-6 text-white text-center font-bold">
                       How can I assist you today?
                    </h2>
                    <div className="w-[80%] mx-auto">
                        <ChatInput onSend={sendMessage} loading={loading} />
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pr-2">
                        {messages.map((msg, index) => (
                            <MessageBubble key={index} role={msg.role} content={msg.content} />
                        ))}
                        <div ref={bottomRef} />
                    </div>
                    <div className="py-4 bg-[#171717]">
                        <ChatInput onSend={sendMessage} loading={loading} />
                    </div>
                </>
            )}
        </div>
    );
}
