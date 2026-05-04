"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    SquarePen,
    Search,
    Image as ImageIcon,
    LayoutGrid,
    SquareTerminal,
    FolderPlus,
    Settings,
    User,
    PanelLeft,
    MessageSquare,
    Trash2,
    ChevronRight,
    ChevronDown,
    X,
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useChat } from "@/context/ChatContext";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isHistoryOpen, setIsHistoryOpen] = useState(true);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const pathname = usePathname();
    const { chats, startNewChat, loadChat, deleteChat } = useChat();

    // Grouping chats by date
    const groupedChats = useMemo(() => {
        const query = searchQuery.toLowerCase();
        const filtered = chats.filter(chat =>
            (chat.title || "Untitled").toLowerCase().includes(query) ||
            (chat.messages && chat.messages.some(m => m.content.toLowerCase().includes(query)))
        );

        const groups = {
            Today: [],
            Yesterday: [],
            "Previous 7 Days": [],
            "Earlier": []
        };

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);

        filtered.forEach(chat => {
            const chatDate = new Date(chat.createdAt);
            if (chatDate >= today) groups.Today.push(chat);
            else if (chatDate >= yesterday) groups.Yesterday.push(chat);
            else if (chatDate >= sevenDaysAgo) groups["Previous 7 Days"].push(chat);
            else groups.Earlier.push(chat);
        });

        return groups;
    }, [chats, searchQuery]);

    const [dynamicMenuItems, setDynamicMenuItems] = useState([]);

    useEffect(() => {
        const fetchSidebar = () => {
            fetch('/api/sidebar')
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setDynamicMenuItems(data.map(item => ({
                            id: item.id,
                            name: item.title,
                            icon_url: item.icon_url,
                            href: item.route,
                            isDynamic: true
                        })));
                    }
                })
                .catch(err => console.error("Failed to fetch sidebar items:", err));
        };

        fetchSidebar();
        window.addEventListener('sidebar-update', fetchSidebar);
        return () => window.removeEventListener('sidebar-update', fetchSidebar);
    }, []);

    const staticMenuItems = [
        { name: "Search chats", icon: Search, href: "#", special: "search" },
        { name: "Images", icon: ImageIcon, href: "/images" },
        { name: "Apps", icon: LayoutGrid, href: "/apps" },
        { name: "Codex", icon: SquareTerminal, href: "/codex" },
        { name: "Projects", icon: FolderPlus, href: "/projects" },
    ];

    const menuItems = [...staticMenuItems, ...dynamicMenuItems];

    return (
        <>
            <aside
                className={`flex flex-col h-screen bg-[#0F0F0F] text-[#E0E0E0] transition-all duration-300 ease-in-out border-r border-gray-800 font-sans ${isOpen ? "w-64" : "w-16"
                    }`}
            >
                {/* Top / Scrollable Section */}
                <div className="flex flex-col flex-1 min-h-0 overflow-y-auto custom-scrollbar">
                    {/* Header Row */}
                    <div className={`flex items-center p-3 gap-2 ${isOpen ? "justify-between" : "justify-center"}`}>
                        {isOpen && (
                            <div className="flex items-center gap-3 px-2">
                                <div className="w-9 h-9 bg-[#155dfc] rounded-xl flex items-center justify-center font-bold text-sm text-white shrink-0">
                                    RA
                                </div>
                                <span className="font-semibold text-base tracking-tight text-white whitespace-nowrap">
                                    Rayyan Ansari
                                </span>
                            </div>
                        )} 
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            title={isOpen ? "Close sidebar" : "Open sidebar"}
                            className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-400 hover:bg-[#303030] hover:text-white transition-all duration-200 shrink-0"
                        >
                            <PanelLeft size={20} />
                        </button>
                    </div>

                    {/* New Chat Button */}
                    <div className="px-2 mt-1">
                        <button
                            onClick={startNewChat}
                            className={`flex items-center gap-3 w-full py-3 px-3 rounded-xl transition-all duration-200 group text-gray-300 hover:bg-[#303030] hover:text-white ${!isOpen ? "justify-center" : ""}`}
                            title={!isOpen ? "New chat" : ""}
                        >
                            <SquarePen size={22} className="text-gray-300 group-hover:text-white shrink-0" />
                            {isOpen && <span className="font-medium text-[15px] whitespace-nowrap">New chat</span>}
                        </button>
                    </div>

                    {/* Navigation Items */}
                    <nav className="px-2 space-y-1">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;

                            if (item.special === "search") {
                                return (
                                    <button
                                        key={item.name}
                                        onClick={() => setIsSearchModalOpen(true)}
                                        className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all group text-gray-300 hover:bg-[#303030] hover:text-white ${!isOpen ? "justify-center" : ""}`}
                                    >
                                        <item.icon size={22} className="shrink-0" />
                                        {isOpen && <span className="font-medium text-[15px]">{item.name}</span>}
                                    </button>
                                );
                            }

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    title={!isOpen ? item.name : ""}
                                    target={item.name === "Codex" ? "_blank" : undefined}
                                    rel={item.name === "Codex" ? "noopener noreferrer" : undefined}
                                    className={`flex items-center gap-3 p-3 rounded-xl transition-all group ${isActive ? "bg-[#303030] text-white" : "text-gray-300 hover:bg-[#303030] hover:text-white"} ${!isOpen ? "justify-center" : ""}`}
                                >
                                    {item.isDynamic ? (
                                        <img src={item.icon_url} alt={item.name} className={`shrink-0 w-[22px] h-[22px] object-contain ${isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`} />
                                    ) : (
                                        <item.icon size={22} className={`shrink-0 ${isActive ? "text-white" : "text-gray-300 group-hover:text-white"}`} />
                                    )}
                                    {isOpen && <span className="font-medium text-[15px] whitespace-nowrap">{item.name}</span>}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Your Chats Dropdown */}
                    {isOpen && (
                        <div className="mt-6 px-2 pb-4">
                            <button
                                onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                                className="flex items-center justify-between w-full px-3 py-2 text-gray-500 hover:text-white transition-colors group"
                            >
                                <span className="text-[12px] uppercase tracking-wider">Your chats</span>
                                {isHistoryOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            </button>

                            {isHistoryOpen && (
                                <div className="mt-1 space-y-0.5">
                                    {chats.length > 0 ? (
                                        chats.slice(0, 10).map((chat) => (
                                            <div key={chat.id} className="relative group/item">
                                                <button
                                                    onClick={() => loadChat(chat.id)}
                                                    className="flex items-center gap-3 w-full p-2.5 rounded-xl hover:bg-[#202020] text-gray-400 hover:text-white transition-all text-left pr-10"
                                                >
                                                    <MessageSquare size={16} className="shrink-0 text-gray-500 group-hover/item:text-white" />
                                                    <span className="text-[14px] truncate flex-1 font-medium">{chat.title}</span>
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); deleteChat(chat.id); }}
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-600 hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-all rounded-lg hover:bg-red-500/10"
                                                    title="Delete chat"
                                                >
                                                    <Trash2 size={13} />
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="px-3 py-4 text-xs text-gray-600 italic">No saved chats yet.</div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer Section */}
                <div className="p-3 border-t border-gray-800 bg-[#0F0F0F]">
                    <div className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group ${!isOpen ? "justify-center" : ""}`}>
                        <div className="w-9 h-9 rounded-full flex items-center justify-center border border-gray-700 shrink-0">
                            <User size={18} className="text-gray-300" />
                        </div>
                        {isOpen && (
                            <>
                                <div className="flex-1 overflow-hidden">
                                    <p className="font-medium text-sm truncate text-white">Rayyan Ansari</p>
                                    <p className="text-xs text-gray-500 truncate">techbyrayyan@gmail.com</p>
                                </div>
                                <Settings size={18} className="text-gray-500 group-hover:text-white transition-colors shrink-0" />
                            </>
                        )}
                    </div>
                </div>
            </aside>

            {/* Premium Search Modal Overlay */}
            {isSearchModalOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="relative w-full max-w-2xl bg-[#171717] rounded-3xl shadow-2xl border border-gray-800 flex flex-col max-h-[70vh] overflow-hidden animate-in slide-in-from-top-4 duration-300">
                        {/* Search Input Box */}
                        <div className="p-6 border-b border-gray-800 flex items-center gap-4">
                            <Search size={22} className="text-gray-500" />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search chats..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 bg-transparent border-none outline-none text-xl text-white placeholder-gray-500"
                            />
                            <button
                                onClick={() => {
                                    setIsSearchModalOpen(false);
                                    setSearchQuery("");
                                }}
                                className="p-2 hover:bg-gray-800 rounded-full text-gray-500 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Search Results / Groups */}
                        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                            <button
                                onClick={() => {
                                    startNewChat();
                                    setIsSearchModalOpen(false);
                                }}
                                className="flex items-center gap-3 w-full p-4 rounded-2xl hover:bg-white/[0.03] text-gray-300 transition-colors mb-4 group"
                            >
                                <SquarePen size={20} className="text-gray-500 group-hover:text-white" />
                                <span className="font-medium">New chat</span>
                            </button>

                            {Object.entries(groupedChats).map(([groupName, groupChats]) => (
                                groupChats.length > 0 && (
                                    <div key={groupName} className="mb-6">
                                        <h3 className="px-4 text-[12px] font-bold text-gray-500 uppercase tracking-widest mb-3">
                                            {groupName}
                                        </h3>
                                        <div className="space-y-1">
                                            {groupChats.map((chat) => (
                                                <button
                                                    key={chat.id}
                                                    onClick={() => {
                                                        loadChat(chat.id);
                                                        setIsSearchModalOpen(false);
                                                    }}
                                                    className="flex items-center gap-4 w-full p-4 rounded-2xl hover:bg-white/[0.03] text-gray-300 hover:text-white transition-all text-left group"
                                                >
                                                    <MessageSquare size={20} className="shrink-0 text-gray-500 group-hover:text-white" />
                                                    <span className="text-base truncate flex-1">{chat.title}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )
                            ))}

                            {chats.length === 0 && (
                                <div className="text-center py-20 text-gray-600">
                                    No chat history found.
                                </div>
                            )}

                            {searchQuery && Object.values(groupedChats).every(g => g.length === 0) && (
                                <div className="text-center py-20 text-gray-600">
                                    No results matching "{searchQuery}"
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Backdrop Close Click */}
                    <div
                        className="fixed inset-0 -z-10"
                        onClick={() => {
                            setIsSearchModalOpen(false);
                            setSearchQuery("");
                        }}
                    ></div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
