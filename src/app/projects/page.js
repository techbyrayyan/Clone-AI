"use client";

import { useState, useEffect } from "react";
import { Settings, X, CircleDollarSign, GraduationCap, PenTool, Plane, Lightbulb, Smile, MessageSquare, Clock } from "lucide-react";
import { useChat } from "@/context/ChatContext";

export default function ProjectsPage() {
    const [projectName, setProjectName] = useState("");
    const [projectChats, setProjectChats] = useState([]);
    const { loadChat } = useChat();

    useEffect(() => {
        const fetchProjectChats = async () => {
            try {
                const res = await fetch("/api/chat?type=project");
                if (res.ok) {
                    const data = await res.json();
                    setProjectChats(data);
                }
            } catch (err) {
                console.error("Failed to fetch project chats:", err);
            }
        };
        fetchProjectChats();
    }, []);

    const handleTagClick = (tag) => {
        setProjectName(tag);
    };

    return (
        <div className="flex flex-col min-h-screen w-full bg-[#171717] p-4 sm:p-8 font-sans overflow-y-auto custom-scrollbar">
            {/* Modal Card - Create Project */}
            <div className="w-full max-w-[660px] mx-auto bg-[#212121] rounded-[24px] p-6 sm:p-8 shadow-2xl border border-gray-800/80 mb-10">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-white tracking-tight">Create project</h1>
                    <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5 cursor-pointer">
                            <Settings size={22} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>

                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-400 group-focus-within:text-white transition-colors">
                        <div className="relative">
                            <Smile size={24} strokeWidth={1.5} />
                            <span className="absolute -top-1.5 -left-1.5 text-[18px] leading-none font-medium bg-[#212121] rounded-full w-3 h-3 flex items-center justify-center">+</span>
                        </div>
                    </div>
                    <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="Project Name..."
                        className="w-full bg-transparent border border-gray-600 focus:border-gray-400 rounded-xl py-4 pl-14 pr-4 text-white text-[17px] placeholder-gray-500 outline-none transition-colors"
                    />
                </div>

                <div className="flex flex-wrap gap-3 mt-5">
                    {["Investing", "Homework", "Writing", "Travel"].map((tag) => (
                        <button
                            key={tag}
                            onClick={() => handleTagClick(tag)}
                            className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-gray-600 hover:bg-[#2A2A2A] transition-colors cursor-pointer group"
                        >
                            <span className="text-[15px] font-medium text-white/90">{tag}</span>
                        </button>
                    ))}
                </div>

                <div className="mt-8 flex justify-end">
                    <button
                        disabled={projectName.length === 0}
                        className={`px-5 py-2.5 text-[15px] font-semibold rounded-full transition-all duration-200 ${projectName.length > 0
                                ? "bg-white text-black hover:bg-gray-100 cursor-pointer active:scale-95"
                                : "bg-[#383838] text-[#707070] cursor-not-allowed"
                            }`}
                    >
                        Create project
                    </button>
                </div>
            </div>

            {/* Project History / Moved Chats Section */}
            <div className="w-full max-w-[660px] mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-xl font-medium text-white/90">Moved Chats & Projects</h2>
                    <span className="bg-[#10a37f]/20 text-[#10a37f] text-xs font-bold px-2 py-0.5 rounded-full">{projectChats.length}</span>
                </div>

                <div className="grid gap-3">
                    {projectChats.length > 0 ? (
                        projectChats.map((chat) => (
                            <button
                                key={chat.id}
                                onClick={() => loadChat(chat.id)}
                                className="w-full bg-[#212121] border border-gray-800/50 hover:border-gray-700 p-4 rounded-2xl flex items-center gap-4 text-left transition-all hover:bg-[#2A2A2A] group"
                            >
                                <div className="w-12 h-12 bg-[#303030] rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#383838] transition-colors">
                                    <MessageSquare size={22} className="text-[#10a37f]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-[16px] font-medium text-white truncate">{chat.title || "Untitled Search"}</h3>
                                    <div className="flex items-center gap-3 mt-1">
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                            <Clock size={12} />
                                            <span>{new Date(chat.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Plane size={18} />
                                </div>
                            </button>
                        ))
                    ) : (
                        <div className="text-center py-12 bg-[#212121]/50 rounded-3xl border border-dashed border-gray-800">
                            <Lightbulb size={40} className="text-gray-700 mx-auto mb-4" />
                            <p className="text-gray-500">No chats moved to projects yet.</p>
                            <p className="text-xs text-gray-600 mt-1">Delete a chat from "Your Chats" to see it here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
