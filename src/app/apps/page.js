"use client";

import { useState, useEffect } from "react";
import { Search, ChevronRight, Settings, Download, Plus, Trash2, Edit2, X, Upload, LayoutGrid } from "lucide-react";

export default function AppsPage() {
    const [currentSlide, setCurrentSlide] = useState(1);
    const [activeCategory, setActiveCategory] = useState("Featured");
    const [dynamicApps, setDynamicApps] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(null);
    const [formData, setFormData] = useState({ title: '', route: '', order: '0', file: null });
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch dynamic apps
    const fetchApps = async () => {
        try {
            const res = await fetch('/api/sidebar');
            const data = await res.json();
            if (Array.isArray(data)) {
                setDynamicApps(data);
            }
        } catch (err) {
            console.error("Failed to fetch apps:", err);
        }
    };

    useEffect(() => {
        fetchApps();
    }, []);

    const slides = [
        {
            id: 0,
            icon: <span className="font-bold text-[#31A8FF] text-xl tracking-tight">Ps</span>,
            iconBg: "bg-[#001E36]",
            title: "Edit with Photoshop",
            description: "Edit and enhance images",
            buttonText: "View",
            badgeLabel: "@Adobe Photoshop add lens blur",
            mockupImg: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=500&auto=format&fit=crop",
            bgClass: "bg-gradient-to-r from-[#0C4A93] via-[#3582E0] to-[#A4D8F7]",
        },
        {
            id: 1,
            icon: <span className="font-bold text-black text-xl">D</span>,
            iconBg: "bg-white",
            title: "Create with DALL·E",
            description: "Generate stunning images from text",
            buttonText: "View",
            badgeLabel: "@DALL·E generate a futuristic city",
            mockupImg: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=500&auto=format&fit=crop",
            bgClass: "bg-gradient-to-r from-[#4E1E4F] via-[#914088] to-[#E593D6]",
        }
    ];

    const nextSlide = () => setCurrentSlide((p) => (p === 0 ? 1 : 0));
    const setSlide = (index) => setCurrentSlide(index);

    const getLogo = (domain, alt) => (
        <img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`} alt={alt} className="w-9 h-9 rounded-full object-contain bg-white p-1" />
    );

    const appList = [
        { name: "Adobe Photoshop", desc: "Edit, stylize, refine images", icon: getLogo("adobe.com", "Photoshop"), bg: "bg-[#001E36]" },
        { name: "Airtable", desc: "Add structured data to ChatGPT", icon: getLogo("airtable.com", "Airtable"), bg: "bg-white" },
        { name: "Booking.com", desc: "Find hotels, homes and more", icon: getLogo("booking.com", "Booking.com"), bg: "bg-[#003B95]" },
        { name: "Canva", desc: "Search, create, edit designs", icon: getLogo("canva.com", "Canva"), bg: "bg-gradient-to-br from-[#00C4CC] to-[#7D2AE8]" },
        { name: "Figma", desc: "Make diagrams, slides, assets", icon: getLogo("figma.com", "Figma"), bg: "bg-[#2C2C2C]" },
        { name: "Lovable", desc: "Build apps and websites", icon: getLogo("lovable.dev", "Lovable"), bg: "bg-[#1E1122]" },
        { name: "OpenTable", desc: "Find restaurant reservations", icon: getLogo("opentable.com", "OpenTable"), bg: "bg-[#DA3743]" },
        { name: "Replit", desc: "Turn your ideas into real apps", icon: getLogo("replit.com", "Replit"), bg: "bg-[#F26207]" },
    ];

    const lifestyleApps = [
        { name: "ALL Accor", desc: "Search and book Accor hotels", icon: getLogo("all.accor.com", "ALL Accor"), bg: "bg-[#111] border border-gray-700" },
        { name: "AutoScout24", desc: "Automobile buying and leasing", icon: getLogo("autoscout24.com", "AutoScout24"), bg: "bg-[#FFD400]" },
        { name: "AutoTrader", desc: "Cars, Motorcycles, Boats Deals", icon: getLogo("autotrader.co.uk", "AutoTrader"), bg: "bg-[#E31837]" },
        { name: "BODi", desc: "Find your best workout plan", icon: getLogo("bodi.com", "BODi"), bg: "bg-[#0056A3]" },
        { name: "Booking.com", desc: "Find hotels, homes and more", icon: getLogo("booking.com", "Booking.com"), bg: "bg-[#003B95]" },
        { name: "Busbud", desc: "Find bus and train tickets", icon: getLogo("busbud.com", "Busbud"), bg: "bg-[#0084FF]" },
        { name: "Cafe24", desc: "Search, explore, and shop", icon: getLogo("cafe24.com", "Cafe24"), bg: "bg-white" },
        { name: "CarGurus", desc: "Find, buy, and research cars", icon: getLogo("cargurus.com", "CarGurus"), bg: "bg-[#1C2536]" },
        { name: "CHECK24", desc: "Compare travel deals easily", icon: getLogo("check24.de", "CHECK24"), bg: "bg-[#005EA8]" },
        { name: "Cottages", desc: "Discover UK holiday cottages", icon: getLogo("cottages.com", "Cottages"), bg: "bg-[#71B238]" },
        { name: "Cruise Critic", desc: "Find cruise vacations", icon: getLogo("cruisecritic.com", "Cruise Critic"), bg: "bg-[#003366]" },
    ];

    const productivityApps = [
        { name: "Ace Knowledge Graph", desc: "Turn Docs & Topics to Graphs", icon: getLogo("aceknowledge.com", "Ace"), bg: "bg-[#252A2E]" },
        { name: "Ace Quiz Maker", desc: "Turn PDFs & Notes to Quizzes", icon: getLogo("aceknowledge.com", "Ace"), bg: "bg-[#4585FF]" },
        { name: "Adobe Acrobat", desc: "Edit and organize PDFs easily", icon: getLogo("adobe.com", "Acrobat"), bg: "bg-[#FF0000]" },
        { name: "Adobe Express", desc: "Design posts, flyers, and more", icon: getLogo("adobe.com", "Express"), bg: "bg-gradient-to-br from-[#FF0000] via-[#FF00B3] to-[#FF8000]" },
        { name: "Adobe Photoshop", desc: "Edit, stylize, refine images", icon: getLogo("adobe.com", "Photoshop"), bg: "bg-[#001E36]" },
        { name: "Airtable", desc: "Add structured data to ChatGPT", icon: getLogo("airtable.com", "Airtable"), bg: "bg-white" },
        { name: "Asana", desc: "Turn chats into actions", icon: getLogo("asana.com", "Asana"), bg: "bg-white" },
        { name: "Atlassian Rovo", desc: "Manage Jira and Confluence fast", icon: getLogo("atlassian.com", "Atlassian Rovo"), bg: "bg-[#0052CC]" },
    ];

    // Format dynamic apps to match static style
    const myApps = dynamicApps.map(a => ({
        id: a.id,
        name: a.title,
        desc: a.route,
        icon: <img src={a.icon_url} alt={a.title} className="w-9 h-9 object-contain rounded-full bg-white p-1" />,
        bg: "bg-white/10",
        isDynamic: true
    }));

    // Logic to display apps based on category
    let appsToDisplay = [];
    if (activeCategory === "Featured") {
        appsToDisplay = [...appList, ...myApps];
    } else if (activeCategory === "Lifestyle") {
        appsToDisplay = lifestyleApps;
    } else if (activeCategory === "Productivity") {
        appsToDisplay = productivityApps;
    } else if (activeCategory === "Your Apps") {
        appsToDisplay = myApps;
    }

    // Apply search filter
    if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        appsToDisplay = appsToDisplay.filter(app => 
            app.name.toLowerCase().includes(query) || 
            (app.desc && app.desc.toLowerCase().includes(query))
        );
    }

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        const method = isEditing ? 'PUT' : 'POST';
        const body = new FormData();
        if (isEditing) body.append('id', isEditing.id);
        body.append('title', formData.title);
        body.append('route', formData.route);
        body.append('order', formData.order);
        if (formData.file) body.append('file', formData.file);

        try {
            const res = await fetch('/api/sidebar', { method, body });
            if (res.ok) {
                await fetchApps();
                setIsModalOpen(false);
                setFormData({ title: '', route: '', order: '0', file: null });
                setIsEditing(null);
                // Trigger sidebar refresh by just reloading window or custom event
                window.dispatchEvent(new Event('sidebar-update')); 
                // For simplicity, I'll just reload sidebar data in Sidebar.js if I add the listener.
            }
        } catch (err) {
            console.error("Save failed:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this app?")) return;
        try {
            const res = await fetch(`/api/sidebar?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                await fetchApps();
                window.dispatchEvent(new Event('sidebar-update'));
            }
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    const openEdit = (app) => {
        const original = dynamicApps.find(a => a.id === app.id);
        setIsEditing(original);
        setFormData({
            title: original.title,
            route: original.route,
            order: (original.order ?? 0).toString(),
            file: null
        });
        setIsModalOpen(true);
    };

    const slide = slides[currentSlide];

    return (
        <div className="min-h-screen bg-[#212121] text-white w-full overflow-y-auto relative font-sans">
            {/* Top Right Header */}
            <div className="absolute top-4 right-6 flex items-center gap-5 text-gray-300">
                <span className="text-sm font-semibold hover:text-white cursor-pointer transition-colors">GPTs</span>
                <button 
                  onClick={() => {
                      setIsEditing(null);
                      setFormData({ title: '', route: '', order: '0', file: null });
                      setIsModalOpen(true);
                  }}
                  className="flex items-center gap-2 bg-[#3A3A3A] hover:bg-[#444] px-4 py-2 rounded-full text-sm font-medium transition-all"
                >
                    <Plus size={16} /> Add App
                </button>
                <button className="hover:text-white transition-colors">
                    <Settings size={20} />
                </button>
            </div>

            <div className="w-full max-w-[1024px] mx-auto pt-[72px] pb-16 px-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-1.5">
                            <h1 className="text-[28px] font-semibold tracking-tight">Apps</h1>
                            <span className="text-[10px] font-bold text-gray-400 px-1.5 py-0.5 border border-gray-600 rounded-[4px] tracking-wide mt-1">BETA</span>
                        </div>
                        <p className="text-[#a8a8a8] text-[15px]">Chat with your favorite apps in ChatGPT</p>
                    </div>
                    <div className="relative mt-2">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search apps" 
                            className="w-[320px] bg-transparent border border-[#444] rounded-full py-2.5 pl-11 pr-4 text-[15px] text-white focus:outline-none focus:border-gray-300 transition-colors"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Slider */}
                <div className={`relative w-full h-[340px] rounded-[32px] overflow-hidden ${slide.bgClass} shadow-2xl transition-colors duration-500 mb-12`}>
                    <div className="absolute inset-0 flex">
                        <div className="w-1/2 p-12 flex flex-col justify-center relative z-10">
                            <div className={`w-[52px] h-[52px] rounded-full flex items-center justify-center mb-6 shadow-lg ${slide.iconBg}`}>{slide.icon}</div>
                            <h2 className="text-[32px] font-semibold tracking-tight mb-2">{slide.title}</h2>
                            <p className="text-white/90 text-lg mb-8 font-medium">{slide.description}</p>
                            <button className="bg-[#111] hover:bg-black text-white px-7 py-2.5 rounded-full font-semibold w-fit text-[15px] active:scale-95 transition-transform">View</button>
                        </div>
                        <div className="w-1/2 flex items-center justify-end pr-16 relative h-full">
                            <div className="absolute top-[52px] right-[100px] z-20 bg-white/90 rounded-full px-4 py-2 shadow-xl">
                                <span className="text-black text-sm font-semibold whitespace-nowrap">{slide.badgeLabel}</span>
                            </div>
                            <div className="w-[280px] h-[250px] bg-white rounded-t-3xl rounded-b-xl overflow-hidden relative shadow-2xl translate-y-8">
                                <img src={slide.mockupImg} alt="Mockup" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                    <button onClick={nextSlide} className="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/10 hover:bg-black/20 text-white rounded-full backdrop-blur-sm z-20">
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 mb-6">
                    {["Featured", "Lifestyle", "Productivity", "Your Apps"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 text-[15px] font-medium rounded-full transition-colors ${activeCategory === cat ? "bg-[#3A3A3A] text-white" : "text-[#a8a8a8] hover:text-white hover:bg-[#2A2A2A]"}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-4">
                    {appsToDisplay.map((app, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-[24px] hover:bg-white/5 border border-transparent hover:border-white/10 cursor-pointer transition-all group relative">
                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${app.bg} overflow-hidden`}>{app.icon}</div>
                                <div className="flex flex-col gap-0.5">
                                    <h3 className="text-white font-semibold text-[17px] tracking-tight">{app.name}</h3>
                                    <p className="text-[#a8a8a8] text-[14px] truncate max-w-[200px]">{app.desc}</p>
                                </div>
                            </div>
                            {app.isDynamic ? (
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={(e) => { e.stopPropagation(); openEdit(app); }} className="p-2 hover:bg-white/10 rounded-full text-blue-400"><Edit2 size={16} /></button>
                                    <button onClick={(e) => { e.stopPropagation(); handleDelete(app.id); }} className="p-2 hover:bg-white/10 rounded-full text-red-400"><Trash2 size={16} /></button>
                                </div>
                            ) : (
                                <ChevronRight className="text-[#666] opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
                    <div className="bg-[#171717] w-full max-w-md rounded-[32px] border border-white/10 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4">
                        <div className="flex items-center justify-between p-6 border-b border-white/5">
                            <h2 className="text-xl font-semibold capitalize">{isEditing ? 'Edit App' : 'Add New App'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full text-gray-400"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">App Name</label>
                                <input required type="text" placeholder="e.g. My Custom App" className="w-full bg-[#2A2A2A] border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-[#155dfc] transition-colors" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">Route / URL</label>
                                <input required type="text" placeholder="e.g. /my-app" className="w-full bg-[#2A2A2A] border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-[#155dfc] transition-colors" value={formData.route} onChange={e => setFormData({...formData, route: e.target.value})} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">Order</label>
                                    <input type="number" className="w-full bg-[#2A2A2A] border border-white/10 rounded-2xl py-3 px-4 text-white focus:outline-none focus:border-[#155dfc]" value={formData.order} onChange={e => setFormData({...formData, order: e.target.value})} />
                                </div>
                                <div className="flex flex-col">
                                    <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">Icon</label>
                                    <label className="flex-1 flex items-center justify-center bg-[#2A2A2A] border border-dashed border-white/20 rounded-2xl cursor-pointer hover:bg-[#303030] py-3">
                                        <input type="file" className="hidden" accept="image/*" onChange={e => setFormData({...formData, file: e.target.files[0]})} />
                                        <div className="flex items-center gap-2 text-sm text-gray-400">{formData.file ? <span className="text-white truncate max-w-[120px]">{formData.file.name}</span> : <><Upload size={16} /> <span>Upload</span></>}</div>
                                    </label>
                                </div>
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3.5 rounded-2xl font-semibold bg-white/5 hover:bg-white/10 transition-colors">Cancel</button>
                                <button disabled={loading} type="submit" className="flex-1 py-3.5 rounded-2xl font-semibold bg-[#155dfc] hover:bg-[#1e6aff] disabled:opacity-50 transition-colors">{loading ? 'Saving...' : 'Save App'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
