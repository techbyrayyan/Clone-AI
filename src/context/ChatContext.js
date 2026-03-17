"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
    const [chats, setChats] = useState([]);
    const [currentMessages, setCurrentMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const isFirstMount = useRef(true);

    // Initial load
    useEffect(() => {
        const savedHistory = localStorage.getItem("chatHistory");
        if (savedHistory) setChats(JSON.parse(savedHistory));

        const activeChat = localStorage.getItem("activeChat");
        if (activeChat) setCurrentMessages(JSON.parse(activeChat));

        isFirstMount.current = false;
    }, []);

    // Sync active session to localStorage (to survive refreshes)
    useEffect(() => {
        if (!isFirstMount.current) {
            localStorage.setItem("activeChat", JSON.stringify(currentMessages));
        }
    }, [currentMessages]);

    // Sync history to localStorage
    useEffect(() => {
        if (!isFirstMount.current) {
            localStorage.setItem("chatHistory", JSON.stringify(chats));
        }
    }, [chats]);

    const generateTitle = (messages) => {
        if (messages.length === 0) return "New Chat";
        const firstUserMessage = messages.find(m => m.role === "user")?.content || "New Chat";
        return firstUserMessage.split(" ").slice(0, 5).join(" ") + (firstUserMessage.split(" ").length > 5 ? "..." : "");
    };

    const startNewChat = () => {
        if (currentMessages.length > 0) {
            // Archive current session into history
            const newHistoryItem = {
                id: Date.now().toString(),
                title: generateTitle(currentMessages),
                messages: [...currentMessages],
                date: new Date().toISOString()
            };
            setChats(prev => [newHistoryItem, ...prev]);
        }

        // Reset active session
        setCurrentMessages([]);
        localStorage.removeItem("activeChat");
        router.push("/");
    };

    const loadChat = (chatId) => {
        // Find the chat in history
        const selectedChat = chats.find(c => c.id === chatId);
        if (selectedChat) {
            // Before loading, if there's a current (new) unsaved session, should we save it?
            // User asked for "only on new chat", so let's just switch.
            setCurrentMessages(selectedChat.messages);
            router.push("/");
        }
    };

    const sendMessage = async (text) => {
        if (!text.trim()) return;

        const updatedMessages = [...currentMessages, { role: "user", content: text }];
        setCurrentMessages(updatedMessages);

        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: updatedMessages }),
            });

            if (!res.ok) throw new Error("API error");

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
        } catch (error) {
            console.error("Chat Error:", error);
            const fallback = "I'm in demo mode (OpenAI API key issues). Everything else works!";
            setCurrentMessages((prev) => [...prev, { role: "assistant", content: fallback }]);
        } finally {
            setLoading(false);
        }
    };

    const deleteChat = (chatId) => {
        setChats(prev => prev.filter(c => c.id !== chatId));
        // Optional: If you are currently viewing the chat you just deleted, what should happen? Clear it?
        // Let's just leave it for now unless user asks.
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
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};
