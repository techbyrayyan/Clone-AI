"use client";

import { useState, useEffect } from "react";
import { Settings, Bell, Github, Terminal, MessageSquare, Play, CheckCircle2, Circle } from "lucide-react";

export default function CodexPage() {
    const [taskTitle, setTaskTitle] = useState("");
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch tasks on mount
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await fetch("/api/codex");
            if (res.ok) {
                const data = await res.json();
                setTasks(data);
            }
        } catch (err) {
            console.error("Failed to fetch tasks:", err);
        }
    };

    const createTask = async () => {
        if (!taskTitle.trim()) return;
        setIsLoading(true);
        try {
            const res = await fetch("/api/codex", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: taskTitle }),
            });
            if (res.ok) {
                setTaskTitle("");
                fetchTasks();
            }
        } catch (err) {
            console.error("Failed to create task:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const updateTaskStatus = async (id, currentStatus) => {
        const nextStatus = currentStatus === 'completed' ? 'pending' : 'completed';
        try {
            const res = await fetch("/api/codex", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: nextStatus }),
            });
            if (res.ok) fetchTasks();
        } catch (err) {
            console.error("Failed to update status:", err);
        }
    };

    return (
        <div className="min-h-screen bg-[#0D0D0D] text-white font-sans overflow-y-auto custom-scrollbar">
            {/* Navbar */}
            <nav className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0D0D0D]/80 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full border-2 border-white/60 flex items-center justify-center relative">
                        <div className="absolute w-[2px] h-3 bg-white rounded-full" style={{ transformOrigin: "bottom center", transform: "rotate(-30deg) translateY(-2px)" }} />
                        <div className="absolute w-[2px] h-2 bg-white rounded-full" style={{ transformOrigin: "bottom center", transform: "rotate(60deg) translateY(-1px)" }} />
                    </div>
                    <span className="text-white font-semibold text-[17px] tracking-tight">Codex</span>
                </div>

                <div className="flex items-center gap-7">
                    <div className="flex items-center gap-6">
                        <span className="text-white cursor-pointer text-sm font-medium border-b border-white pb-0.5">Code</span>
                        <span className="text-gray-400 hover:text-white cursor-pointer transition-colors text-sm font-medium">Docs</span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-400 ml-2">
                        <Settings size={18} className="hover:text-white cursor-pointer transition-colors" />
                        <Bell size={18} className="hover:text-white cursor-pointer transition-colors" />
                        <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs cursor-pointer select-none">
                            R
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-[1000px] mx-auto mt-12 px-6 pb-24">
                <h1 className="text-[42px] font-bold text-center mb-10 tracking-tight text-white leading-tight">
                    What should we code next?
                </h1>

                {/* Task Input Box */}
                <div className="bg-[#1C1C1C] rounded-[32px] border border-white/5 shadow-2xl p-8 mb-12">
                    <div className="flex flex-col gap-6">
                        <div className="relative group">
                            <input
                                autoFocus
                                type="text"
                                value={taskTitle}
                                onChange={(e) => setTaskTitle(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && createTask()}
                                placeholder="Describe a task: 'Fix the login validation bug' or 'Add dark mode support'..."
                                className="w-full bg-[#262626] border border-white/10 focus:border-blue-500/50 rounded-2xl py-5 pl-6 pr-16 text-white text-[18px] placeholder-gray-500 outline-none transition-all"
                            />
                            <button
                                onClick={createTask}
                                disabled={isLoading || !taskTitle}
                                className="absolute right-3 top-3 bottom-3 aspect-square bg-white text-black rounded-xl flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 disabled:bg-gray-700 transition-all active:scale-95"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <Play size={20} fill="black" />
                                )}
                            </button>
                        </div>
                        <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                             <div className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                                 <Github size={16} />
                                 <span>Link repository</span>
                             </div>
                             <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
                             <p>Connected to <b>techbyrayyan/portfolio</b></p>
                        </div>
                    </div>
                </div>

                {/* Active Tasks Section */}
                {tasks.length > 0 && (
                    <div className="mb-14">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-[18px] font-bold text-white flex items-center gap-3">
                                Active Tasks
                                <span className="bg-blue-600/20 text-blue-400 text-xs px-2 py-0.5 rounded-full">{tasks.length}</span>
                            </h2>
                        </div>
                        <div className="grid gap-3">
                            {tasks.map((task) => (
                                <div
                                    key={task.id}
                                    className={`bg-[#1C1C1C] p-5 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-white/20 transition-all ${task.status === 'completed' ? 'opacity-60' : ''}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <button 
                                            onClick={() => updateTaskStatus(task.id, task.status)}
                                            className="text-gray-500 hover:text-white transition-colors"
                                        >
                                            {task.status === 'completed' ? <CheckCircle2 className="text-green-500" size={24} /> : <Circle size={24} />}
                                        </button>
                                        <div>
                                            <h3 className={`font-semibold text-[16px] ${task.status === 'completed' ? 'text-gray-500 line-through' : 'text-white'}`}>
                                                {task.title}
                                            </h3>
                                            <p className="text-xs text-gray-500 mt-0.5">Created {new Date(task.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                         <span className={`text-[11px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${
                                             task.status === 'completed' ? 'bg-green-500/10 text-green-500' : 
                                             task.status === 'ongoing' ? 'bg-blue-500/10 text-blue-500' : 'bg-orange-500/10 text-orange-500'
                                         }`}>
                                             {task.status}
                                         </span>
                                         <button className="p-2 text-gray-600 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                                             <Settings size={16} />
                                         </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Get Started Section */}
                <div className="mb-14">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-[16px] font-semibold text-white">Get started with Codex</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="bg-[#1C1C1C] p-5 rounded-2xl border border-white/4 flex items-center gap-4 hover:border-white/10 hover:bg-[#222] cursor-pointer transition-all group">
                            <div className="bg-[#2A2A2A] p-2.5 rounded-xl group-hover:bg-[#333] transition-colors shrink-0">
                                <Terminal size={20} className="text-gray-300" />
                            </div>
                            <span className="font-semibold text-[14px] text-gray-100">Try in terminal</span>
                        </div>

                        <div className="bg-[#1C1C1C] p-5 rounded-2xl border border-white/4 flex items-center gap-4 hover:border-white/10 hover:bg-[#222] cursor-pointer transition-all group">
                            <div className="bg-[#1A2A3A] p-2.5 rounded-xl group-hover:bg-[#1E3248] transition-colors shrink-0">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17 1.5L3 8.5L7 12L3 15.5L17 22.5L21 20V4L17 1.5Z" stroke="#0078D4" strokeWidth="2" strokeLinejoin="round" />
                                    <path d="M7 12L17 4" stroke="#0078D4" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M7 12L17 20" stroke="#0078D4" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                            <span className="font-semibold text-[14px] text-gray-100">Try in IDE</span>
                        </div>

                        <div className="bg-[#1C1C1C] p-5 rounded-2xl border border-white/4 flex items-center justify-between hover:border-white/10 hover:bg-[#222] cursor-pointer transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="bg-[#2A2A2A] p-2.5 rounded-xl group-hover:bg-[#333] transition-colors shrink-0">
                                    <MessageSquare size={20} className="text-gray-300" />
                                </div>
                                <span className="font-semibold text-[14px] text-gray-100">Enable review</span>
                            </div>
                            <div className="w-5 h-5 rounded-full border-2 border-[#555] group-hover:border-gray-400 transition-colors shrink-0"></div>
                        </div>
                    </div>
                </div>

                {/* Examples Section */}
                <div className="mb-14">
                    <h2 className="text-[16px] font-semibold text-white mb-5">Examples of what Codex can do</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                            { title: "Fix a bug", desc: "Let Codex find and fix bugs in your codebase automatically." },
                            { title: "Write tests", desc: "Generate comprehensive unit and integration tests." },
                            { title: "Add a feature", desc: "Describe a feature and Codex will implement it for you." },
                            { title: "Explain code", desc: "Get clear explanations for complex code sections." },
                        ].map((ex, i) => (
                            <div
                                key={i}
                                className="bg-[#1C1C1C] p-5 rounded-2xl border border-white/4 hover:border-white/10 hover:bg-[#222] cursor-pointer transition-all group"
                            >
                                <h3 className="text-white font-semibold text-[15px] mb-1.5 group-hover:text-blue-400 transition-colors">{ex.title}</h3>
                                <p className="text-[#888] text-sm leading-relaxed">{ex.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
