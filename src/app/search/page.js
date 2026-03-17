"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const allChats = [
    { label: "Next.js Sidebar Setup", section: "Today" },
    { label: "Git Command Not Found", section: "Previous 7 Days" },
    { label: "Best Graphic Design Tools", section: "Previous 7 Days" },
    { label: "AI Quiz App Ideas", section: "Previous 7 Days" },
    { label: "Mental Health App Ideas", section: "Previous 30 Days" },
    { label: "Hospital Data Prerender Fix", section: "Previous 30 Days" },
    { label: "Navbar User Profile Picture", section: "Previous 30 Days" },
];

const ChatIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);

const SearchItem = ({ label, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.04 }}
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#2f2f2f] transition-colors cursor-pointer group"
    >
        <div className="text-neutral-400 group-hover:text-white transition-colors">
            <ChatIcon />
        </div>
        <p className="text-sm text-neutral-200 truncate font-medium flex-1">{label}</p>
    </motion.div>
);

const SectionHeader = ({ label }) => (
    <div className="px-3 mt-5 mb-1 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
        {label}
    </div>
);

export default function SearchPage() {
    const [query, setQuery] = useState("");

    const filtered = query.trim()
        ? allChats.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))
        : allChats;

    const sections = [...new Set(filtered.map((c) => c.section))];

    return (
        <div className="flex flex-col h-full bg-[#171717] text-white">
            {/* Search Header */}
            <div className="sticky top-0 z-10 bg-[#171717] px-6 pt-8 pb-4 border-b border-[#2f2f2f]">
                <h1 className="text-2xl font-semibold mb-4 text-white">Search Chats</h1>
                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                    </div>
                    <input
                        autoFocus
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search your chats..."
                        className="w-full bg-[#212121] border border-[#333] rounded-2xl py-3 pl-11 pr-4 text-[15px] text-white placeholder-neutral-500 outline-none focus:border-[#555] transition-all"
                    />
                    {query && (
                        <button
                            onClick={() => setQuery("")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6 6 18M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* Results */}
            <div className="flex-1 overflow-y-auto px-4 pb-8">
                {filtered.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center mt-24 text-center gap-3"
                    >
                        <div className="text-neutral-600">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                        </div>
                        <p className="text-neutral-400 text-sm">No chats found for <span className="text-white font-medium">&quot;{query}&quot;</span></p>
                    </motion.div>
                ) : (
                    <>
                        {sections.map((section) => (
                            <div key={section}>
                                <SectionHeader label={section} />
                                {filtered
                                    .filter((c) => c.section === section)
                                    .map((c, i) => (
                                        <SearchItem key={c.label} label={c.label} index={i} />
                                    ))}
                            </div>
                        ))}
                    </>
                )}
            </div>

            <div className="py-3 border-t border-[#2f2f2f] flex justify-center">
                <p className="text-[11px] text-neutral-500">Searching across your entire chat history</p>
            </div>
        </div>
    );
}
