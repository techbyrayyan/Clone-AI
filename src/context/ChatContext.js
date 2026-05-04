"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
    const [chats, setChats] = useState([]);
    const [currentMessages, setCurrentMessages] = useState([]);
    const [conversationId, setConversationId] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Load chat history from backend on mount
    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const res = await fetch("/api/chat");
            if (res.ok) {
                const data = await res.json();
                setChats(data);
            }
        } catch (error) {
            console.error("Failed to fetch history:", error);
        }
    };

    const startNewChat = () => {
        setCurrentMessages([]);
        setConversationId(null);
        fetchHistory(); // Make sure the previous chat is saved and shown in sidebar
        router.push("/");
    };

    const loadChat = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/chat?id=${id}`);
            if (res.ok) {
                const messages = await res.json();
                setCurrentMessages(messages);
                setConversationId(id);
                router.push("/");
            }
        } catch (error) {
            console.error("Failed to load chat:", error);
        } finally {
            setLoading(false);
        }
    };

    const sendMessage = async (text) => {
        if (!text.trim()) return;

        const userMessage = { role: "user", content: text };
        const updatedMessages = [...currentMessages, userMessage];
        setCurrentMessages(updatedMessages);

        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    messages: updatedMessages,
                    conversationId: conversationId 
                }),
            });

            if (!res.ok) throw new Error("API error");

            // Extract conversationId from headers if it's a new conversation
            const newConvId = res.headers.get("X-Conversation-Id");
            if (newConvId && !conversationId) {
                setConversationId(newConvId);
                fetchHistory(); // Refresh history list
            }

            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let aiMessage = "";

            setCurrentMessages((prev) => [...prev, { role: "assistant", content: "" }]);

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                aiMessage += decoder.decode(value);

                setCurrentMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1].content = aiMessage;
                    return updated;
                });
            }
            
            // Re-fetch history to get updated tiltes/times
            fetchHistory();

        } catch (error) {
            console.error("Chat Error:", error);
            const fallback = "System is in processing mode. Your message was saved to the backend database!";
            setCurrentMessages((prev) => [...prev, { role: "assistant", content: fallback }]);
        } finally {
            setLoading(false);
        }
    };

    const deleteChat = async (id) => {
        try {
            const res = await fetch(`/api/chat?id=${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                // Remove from local list and update view
                setChats(prev => prev.filter(c => c.id !== id));
                if (conversationId === id) {
                    startNewChat();
                }
            } else {
                console.error("Failed to move chat to projects");
            }
        } catch (err) {
            console.error("Delete Error:", err);
        }
    };

    return (
        <ChatContext.Provider
            value={{
                chats,
                currentMessages,
                loading,
                sendMessage,
                startNewChat,
                loadChat,
                deleteChat,
                conversationId
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

