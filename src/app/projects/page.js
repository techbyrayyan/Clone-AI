"use client";

import { useState } from "react";
import { Settings, X, CircleDollarSign, GraduationCap, PenTool, Plane, Lightbulb, Smile } from "lucide-react";

export default function ProjectsPage() {
    const [projectName, setProjectName] = useState("");

    // Use to handle the preset quick tags
    const handleTagClick = (tag) => {
        setProjectName(tag);
    };

    return (
        <div className="flex h-screen w-full items-center justify-center bg-[#171717] p-4 sm:p-8 font-sans">
            {/* Modal Card - Equal margin around it is achieved by flex center and padding on parent */}
            <div className="w-full max-w-[660px] bg-[#212121] rounded-[24px] p-6 sm:p-8 shadow-2xl border border-gray-800/80">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-white tracking-tight">Create project</h1>
                    <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5 cursor-pointer">
                            <Settings size={22} strokeWidth={1.5} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5 cursor-pointer">
                            <X size={24} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>

                {/* Input Field */}
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
                        placeholder="Copenhagen Trip"
                        className="w-full bg-transparent border border-gray-600 focus:border-gray-400 rounded-xl py-4 pl-14 pr-4 text-white text-[17px] placeholder-gray-500 outline-none transition-colors"
                    />
                </div>

                {/* Tags Row */}
                <div className="flex flex-wrap gap-3 mt-5">
                    <button
                        onClick={() => handleTagClick("Investing")}
                        className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-gray-600 hover:bg-[#2A2A2A] transition-colors cursor-pointer group"
                    >
                        <CircleDollarSign size={18} className="text-[#10a37f] group-hover:scale-110 transition-transform" strokeWidth={2} />
                        <span className="text-[15px] font-medium text-white/90">Investing</span>
                    </button>

                    <button
                        onClick={() => handleTagClick("Homework")}
                        className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-gray-600 hover:bg-[#2A2A2A] transition-colors cursor-pointer group"
                    >
                        <GraduationCap size={18} className="text-[#3b82f6] group-hover:scale-110 transition-transform" strokeWidth={2} />
                        <span className="text-[15px] font-medium text-white/90">Homework</span>
                    </button>

                    <button
                        onClick={() => handleTagClick("Writing")}
                        className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-gray-600 hover:bg-[#2A2A2A] transition-colors cursor-pointer group"
                    >
                        <PenTool size={18} className="text-[#a855f7] group-hover:scale-110 transition-transform" strokeWidth={2} />
                        <span className="text-[15px] font-medium text-white/90">Writing</span>
                    </button>

                    <button
                        onClick={() => handleTagClick("Travel")}
                        className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-gray-600 hover:bg-[#2A2A2A] transition-colors cursor-pointer group"
                    >
                        <Plane size={18} className="text-[#eab308] group-hover:scale-110 transition-transform" strokeWidth={2} />
                        <span className="text-[15px] font-medium text-white/90">Travel</span>
                    </button>
                </div>

                {/* Info Box */}
                <div className="mt-6 bg-[#303030] rounded-2xl p-4 sm:p-5 flex items-start gap-4 shadow-sm border border-gray-700/50">
                    <Lightbulb size={24} className="text-gray-300 shrink-0 mt-0.5" strokeWidth={1.5} />
                    <p className="text-[15px] leading-relaxed text-[#c3c3c3]">
                        Projects keep chats, files, and custom instructions in one place. Use them for ongoing work, or just to keep things tidy.
                    </p>
                </div>

                {/* Footer Action */}
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
        </div>
    );
}
