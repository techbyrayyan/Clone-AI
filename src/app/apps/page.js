"use client";

import { useState } from "react";
import { Search, ChevronRight, Settings, Download, ChevronLeft } from "lucide-react";

export default function AppsPage() {
    const [currentSlide, setCurrentSlide] = useState(1);
    const [activeCategory, setActiveCategory] = useState("Featured");

    // The user wants a slider where the second slide contains the photoshop one. I will start at 0.
    const slides = [

        {
            id: 0,
            icon: <span className="font-bold text-[#31A8FF] text-xl tracking-tight">Ps</span>,
            iconBg: "bg-[#001E36]",
            title: "Edit with Photoshop",
            description: "Edit and enhance images",
            buttonText: "View",
            badgeLabel: "@Adobe Photoshop add lens blur",
            mockupImg: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=500&auto=format&fit=crop", // Replaced with a more appropriate snow image just in case
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
        { name: "DoneDeal", desc: "Find the most new & used cars", icon: getLogo("donedeal.ie", "DoneDeal"), bg: "bg-[#E22E39]" },
        { name: "Dupe", desc: "Find similar products for less", icon: getLogo("dupe.com", "Dupe"), bg: "bg-[#A2E2D9]" },
        { name: "FareHarbor", desc: "Find tours and activities", icon: getLogo("fareharbor.com", "FareHarbor"), bg: "bg-[#0060A9]" },
        { name: "Flixor", desc: "Movie & TV Recommender", icon: getLogo("flixor.video", "Flixor"), bg: "bg-[#E50914]" },
        { name: "Hyatt", desc: "Find hotels and resorts", icon: getLogo("hyatt.com", "Hyatt"), bg: "bg-[#005596]" },
        { name: "ImmoScout24", desc: "Find homes to buy or rent", icon: getLogo("immoscout24.de", "ImmoScout24"), bg: "bg-[#00E5A3]" },
        { name: "Kleinanzeigen", desc: "Kleinanzeigen: Kauf & Verkauf", icon: getLogo("kleinanzeigen.de", "Kleinanzeigen"), bg: "bg-[#252A2D]" },
        { name: "Klook", desc: "Find travel things-to-do", icon: getLogo("klook.com", "Klook"), bg: "bg-[#FF5A00]" },
        { name: "komoot", desc: "Find outdoor sport routes", icon: getLogo("komoot.com", "komoot"), bg: "bg-[#C4D350]" },
        { name: "leboncoin", desc: "toutes les annonces leboncoin!", icon: getLogo("leboncoin.fr", "leboncoin"), bg: "bg-white overflow-hidden p-[2px]" },
        { name: "Lugg", desc: "On-demand movers and trucks", icon: getLogo("lugg.com", "Lugg"), bg: "bg-[#D4E875]" },
        { name: "MakeMyTrip", desc: "Discover & book flights,hotels", icon: getLogo("makemytrip.com", "MakeMyTrip"), bg: "bg-[#ED1C24]" },
        { name: "Malwarebytes", desc: "Verify links, domains, phones.", icon: getLogo("malwarebytes.com", "Malwarebytes"), bg: "bg-[#004FFF]" },
        { name: "OpenTable", desc: "Find restaurant reservations", icon: getLogo("opentable.com", "OpenTable"), bg: "bg-[#DA3743]" },
        { name: "PC Express", desc: "Buy groceries online", icon: getLogo("pcexpress.ca", "PC Express"), bg: "bg-[#111] border border-gray-700" },
        { name: "Priceline", desc: "Find hotel and travel deals", icon: getLogo("priceline.com", "Priceline"), bg: "bg-[#0066FF]" },
        { name: "realestate.com.au", desc: "Search Australian property", icon: getLogo("realestate.com.au", "realestate.com.au"), bg: "bg-[#E4002B]" },
        { name: "Redfin", desc: "Find and tour homes for sale", icon: getLogo("redfin.com", "Redfin"), bg: "bg-[#C82021]" },
        { name: "Skyscanner", desc: "Find cheap flights", icon: getLogo("skyscanner.net", "Skyscanner"), bg: "bg-[#0770E3]" },
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
        { name: "B12 Website Generator", desc: "Create a website in seconds", icon: getLogo("b12.io", "B12"), bg: "bg-[#473BBA]" },
        { name: "Box", desc: "Search and reference your documents", icon: getLogo("box.com", "Box"), bg: "bg-[#0A77D0]" },
        { name: "Brex", desc: "Automate expense workflows", icon: getLogo("brex.com", "Brex"), bg: "bg-white" },
        { name: "Canva", desc: "Search, create, edit designs", icon: getLogo("canva.com", "Canva"), bg: "bg-gradient-to-br from-[#00C4CC] to-[#7D2AE8]" },
        { name: "Clay", desc: "Find and engage prospects", icon: getLogo("clay.com", "Clay"), bg: "bg-[#252525]" },
        { name: "Cloudinary", desc: "Manage, modify, and host your images &...", icon: getLogo("cloudinary.com", "Cloudinary"), bg: "bg-[#3448C5]" },
        { name: "Conductor", desc: "Track brand sentiment in AI", icon: getLogo("conductor.com", "Conductor"), bg: "bg-[#222]" },
        { name: "Coursera", desc: "Skill-building course videos", icon: getLogo("coursera.org", "Coursera"), bg: "bg-[#0056D2]" },
        { name: "Daloopa", desc: "Financial KPIs with links", icon: getLogo("daloopa.com", "Daloopa"), bg: "bg-[#11243E]" },
        { name: "DataCamp", desc: "Learn AI and Coding Skills", icon: getLogo("datacamp.com", "DataCamp"), bg: "bg-[#05F2BA]" },
        { name: "DEWA", desc: "View bills, services and more.", icon: getLogo("dewa.gov.ae", "DEWA"), bg: "bg-black border border-gray-700" },
        { name: "Docket", desc: "Your product knowledge expert", icon: getLogo("dockethq.com", "Docket"), bg: "bg-white" },
        { name: "Dropbox", desc: "Find and access your stored files", icon: getLogo("dropbox.com", "Dropbox"), bg: "bg-[#0061FF]" },
        { name: "Egnyte", desc: "Explore and analyze your content", icon: getLogo("egnyte.com", "Egnyte"), bg: "bg-[#00B2A9]" },
    ];

    const appsToDisplay = activeCategory === "Lifestyle" ? lifestyleApps : activeCategory === "Productivity" ? productivityApps : appList;
    const slide = slides[currentSlide];

    return (
        <div className="min-h-screen bg-[#212121] text-white w-full overflow-y-auto relative font-sans">
            {/* Top Right Header Options */}
            <div className="absolute top-4 right-6 flex items-center gap-5 text-gray-300">
                <span className="text-sm font-semibold hover:text-white cursor-pointer transition-colors">GPTs</span>
                <button className="hover:text-white transition-colors">
                    <Settings size={20} />
                </button>
            </div>

            {/* Main Content */}
            <div className="w-full max-w-[1024px] mx-auto pt-[72px] pb-16 px-8">
                {/* Header Row */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-1.5">
                            <h1 className="text-[28px] font-semibold tracking-tight">Apps</h1>
                            <span className="text-[10px] font-bold text-gray-400 px-1.5 py-0.5 border border-gray-600 rounded-[4px] tracking-wide mt-1">
                                BETA
                            </span>
                        </div>
                        <p className="text-[#a8a8a8] text-[15px]">Chat with your favorite apps in ChatGPT</p>
                    </div>

                    {/* Search Field */}
                    <div className="relative mt-2">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search apps"
                            className="w-[320px] bg-transparent border border-[#444] rounded-full py-2.5 pl-11 pr-4 text-[15px] text-white placeholder-gray-400 focus:outline-none focus:border-gray-300 transition-colors"
                        />
                    </div>
                </div>

                {/* Banner Slider */}
                <div className={`relative w-full h-[340px] rounded-[32px] overflow-hidden ${slide.bgClass} shadow-2xl transition-colors duration-500 ease-in-out`}>
                    <div className="absolute inset-0 flex">
                        {/* Banner Left Content */}
                        <div className="w-1/2 p-12 flex flex-col justify-center relative z-10">
                            <div className={`w-[52px] h-[52px] rounded-full flex items-center justify-center mb-6 shadow-lg ${slide.iconBg}`}>
                                {slide.icon}
                            </div>
                            <h2 className="text-[32px] font-semibold tracking-tight leading-tight mb-2">
                                {slide.title}
                            </h2>
                            <p className="text-white/90 text-lg mb-8 font-medium">
                                {slide.description}
                            </p>
                            <button className="bg-[#111] hover:bg-black text-white px-7 py-2.5 rounded-full font-semibold w-fit text-[15px] transition-transform active:scale-95">
                                {slide.buttonText}
                            </button>
                        </div>

                        {/* Banner Right Content (Mockup Image) */}
                        <div className="w-1/2 flex items-center justify-end pr-16 relative h-full">
                            {/* Floating Badge */}
                            <div className="absolute top-[52px] right-[100px] z-20 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 shadow-xl flex items-center">
                                <span className="text-black text-sm font-semibold whitespace-nowrap">
                                    {slide.badgeLabel}
                                </span>
                            </div>

                            {/* App Screen Mockup */}
                            <div className="w-[280px] h-[250px] bg-white rounded-t-3xl rounded-b-xl overflow-hidden relative shadow-2xl translate-y-8">
                                <div className="absolute top-4 left-4 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm cursor-pointer hover:bg-white transition-colors">
                                    <Download size={16} className="text-black" />
                                </div>
                                <img
                                    src={slide.mockupImg}
                                    alt="Mockup"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Slider Controls */}
                    <button
                        onClick={nextSlide}
                        className="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/10 hover:bg-black/20 text-white rounded-full backdrop-blur-sm transition-colors z-20"
                    >
                        <ChevronRight size={24} />
                    </button>

                    <div className="absolute bottom-6 left-12 flex items-center gap-2 z-20">
                        {slides.map((s, i) => (
                            <button
                                key={s.id}
                                onClick={() => setSlide(i)}
                                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentSlide === i ? "bg-white w-1.5 h-1.5 opacity-100" : "bg-white/40"
                                    }`}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Filters Row */}
                <div className="flex gap-2 mt-8 mb-6 relative z-10">
                    {["Featured", "Lifestyle", "Productivity"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 text-[15px] font-medium rounded-full cursor-pointer transition-colors ${activeCategory === cat
                                ? "bg-[#3A3A3A] text-white"
                                : "text-[#a8a8a8] hover:text-white hover:bg-[#2A2A2A]"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* App Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-2 mt-2">
                    {appsToDisplay.map((app, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 -mx-3 rounded-[20px] hover:bg-[#2A2A2A] cursor-pointer transition-colors group"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 shadow-sm ${app.bg}`}>
                                    {app.icon}
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <h3 className="text-white font-medium text-[16px] tracking-tight">{app.name}</h3>
                                    <p className="text-[#a8a8a8] text-[14px]">{app.desc}</p>
                                </div>
                            </div>
                            <ChevronRight className="text-[#666] opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
