"use client";

import { Settings, Bell, Github, Terminal, MessageSquare, X } from "lucide-react";

export default function CodexPage() {
    return (
        <div className="min-h-screen bg-[#0D0D0D] text-white font-sans">
            {/* Navbar */}
            <nav className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                {/* Left: Logo + Name */}
                <div className="flex items-center gap-2.5">
                    {/* Codex icon — circular clock-like logo */}
                    <div className="w-8 h-8 rounded-full border-2 border-white/60 flex items-center justify-center relative">
                        <div className="absolute w-[2px] h-3 bg-white rounded-full" style={{ transformOrigin: "bottom center", transform: "rotate(-30deg) translateY(-2px)" }} />
                        <div className="absolute w-[2px] h-2 bg-white rounded-full" style={{ transformOrigin: "bottom center", transform: "rotate(60deg) translateY(-1px)" }} />
                    </div>
                    <span className="text-white font-semibold text-[17px] tracking-tight">Codex</span>
                </div>

                {/* Right: Nav links + icons */}
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

            {/* Main Content */}
            <main className="max-w-[900px] mx-auto mt-16 px-6 pb-24">
                <h1 className="text-[38px] font-semibold text-center mb-10 tracking-tight">
                    What should we code next?
                </h1>

                {/* GitHub Connection Box */}
                <div className="bg-[#1C1C1C] rounded-3xl flex flex-col items-center justify-center border border-white/4 shadow-2xl py-28 px-10 mb-12">
                    <button className="bg-white text-black px-7 py-3 rounded-full flex items-center gap-2.5 font-semibold text-[15px] hover:bg-gray-100 transition-all active:scale-95 shadow-lg">
                        <Github size={20} fill="black" strokeWidth={0} />
                        Connect to GitHub
                    </button>
                    <p className="mt-4 text-[#888] text-sm">
                        Connect a repository to create a{" "}
                        <span className="text-orange-400 underline underline-offset-2 cursor-pointer hover:text-orange-300 transition-colors">
                            task
                        </span>
                    </p>
                </div>

                {/* Get Started Section */}
                <div className="mb-14">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-[16px] font-semibold text-white">Get started with Codex</h2>
                        <X className="text-[#888] cursor-pointer hover:text-white transition-colors" size={18} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {/* Try in your terminal */}
                        <div className="bg-[#1C1C1C] p-5 rounded-2xl border border-white/4 flex items-center gap-4 hover:border-white/10 hover:bg-[#222] cursor-pointer transition-all group">
                            <div className="bg-[#2A2A2A] p-2.5 rounded-xl group-hover:bg-[#333] transition-colors shrink-0">
                                <Terminal size={20} className="text-gray-300" />
                            </div>
                            <span className="font-semibold text-[14px] text-gray-100">Try in your terminal</span>
                        </div>

                        {/* Try in your IDE */}
                        <div className="bg-[#1C1C1C] p-5 rounded-2xl border border-white/4 flex items-center gap-4 hover:border-white/10 hover:bg-[#222] cursor-pointer transition-all group">
                            <div className="bg-[#1A2A3A] p-2.5 rounded-xl group-hover:bg-[#1E3248] transition-colors shrink-0">
                                {/* VS Code-like icon */}
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17 1.5L3 8.5L7 12L3 15.5L17 22.5L21 20V4L17 1.5Z" stroke="#0078D4" strokeWidth="2" strokeLinejoin="round" />
                                    <path d="M7 12L17 4" stroke="#0078D4" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M7 12L17 20" stroke="#0078D4" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                            <span className="font-semibold text-[14px] text-gray-100">Try in your IDE</span>
                        </div>

                        {/* Enable code review */}
                        <div className="bg-[#1C1C1C] p-5 rounded-2xl border border-white/4 flex items-center justify-between hover:border-white/10 hover:bg-[#222] cursor-pointer transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="bg-[#2A2A2A] p-2.5 rounded-xl group-hover:bg-[#333] transition-colors shrink-0">
                                    <MessageSquare size={20} className="text-gray-300" />
                                </div>
                                <span className="font-semibold text-[14px] text-gray-100">Enable code review</span>
                            </div>
                            {/* Empty circle checkbox */}
                            <div className="w-5 h-5 rounded-full border-2 border-[#555] group-hover:border-gray-400 transition-colors shrink-0"></div>
                        </div>
                    </div>
                </div>

                {/* Examples Section */}
                <div>
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
