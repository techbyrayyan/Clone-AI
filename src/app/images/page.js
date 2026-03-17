"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mic, ArrowUp, ChevronLeft, ChevronRight, Upload, PluSquare, Image as ImageIcon } from "lucide-react";

const styleImages = [
    {
        label: "Me at a Holi Festival",
        img: "https://images.unsplash.com/photo-1576502200916-3808e07386a5?w=300&q=80",
    },
    {
        label: "Caricature Trend",
        img: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=300&q=80",
    },
    {
        label: "Lunar New Year",
        img: "https://images.unsplash.com/photo-1521478413868-1bbd982fa4a5?w=300&q=80",
    },
    {
        label: "Flower petals",
        img: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=300&q=80",
    },
    {
        label: "Gold",
        img: "https://images.unsplash.com/photo-1610375461369-d613b564f4c4?w=300&q=80",
    },
    {
        label: "Crayon",
        img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300&q=80",
    },
    {
        label: "Watercolor",
        img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80",
    },
    {
        label: "Oil Painting",
        img: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=300&q=80",
    },
];

const discoverItems = [
    {
        label: "Me as an emperor",
        bg: "linear-gradient(135deg, #2d3561, #c05c7e, #f3826f, #ffb961)",
        icon: "👑",
    },
    {
        label: "Redecorate my room",
        bg: "linear-gradient(135deg, #667eea, #764ba2, #f093fb, #f5576c)",
        icon: "🏠",
    },
    {
        label: "Reimagine my pet as a human",
        bg: "linear-gradient(135deg, #f7971e, #ffd200, #ff8c00, #e44d26)",
        icon: "🐾",
    },
    {
        label: "Create a cartoon",
        bg: "linear-gradient(135deg, #43e97b, #38f9d7, #4facfe, #00f2fe)",
        icon: "🎨",
    },
    {
        label: "Give them a bowl cut",
        bg: "linear-gradient(135deg, #a18cd1, #fbc2eb, #fccb90, #d57eeb)",
        icon: "✂️",
    },
    {
        label: "Turn into a keychain",
        bg: "linear-gradient(135deg, #6a3093, #a044ff, #ec407a, #ff6b6b)",
        icon: "🔑",
    },
];

export default function ImagesPage() {
    const [prompt, setPrompt] = useState("");
    const [styleIndex, setStyleIndex] = useState(0);
    const visibleCount = 6;

    const [sidebarItems, setSidebarItems] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [itemTitle, setItemTitle] = useState("");
    const [itemRoute, setItemRoute] = useState("");
    const fileInputRef = useRef(null);

    // Style popup state
    const [selectedStyle, setSelectedStyle] = useState(null);
    const styleUploadRef = useRef(null);
    const router = useRouter();

    const handleStyleUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                localStorage.setItem("styleImage", event.target.result);
                localStorage.setItem("styleSelected", selectedStyle?.label || "Unknown Style");
                setSelectedStyle(null);
                router.push("/images/style");
            };
            reader.readAsDataURL(file);
        }
    };

    // Fetch sidebar items from database (mock JSON)
    useEffect(() => {
        fetch('/images/api/sidebar')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setSidebarItems(data);
            })
            .catch(err => console.error(err));
    }, []);

    const handleUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file || !itemTitle || !itemRoute) {
            alert("Please provide Title, Route and select an Image.");
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", itemTitle);
        formData.append("route", itemRoute);

        try {
            const res = await fetch("/images/api/sidebar", {
                method: "POST",
                body: formData,
            });
            const newItem = await res.json();
            
            if (newItem.id) {
                setSidebarItems(prev => [...prev, newItem]);
                setItemTitle("");
                setItemRoute("");
            } else {
                alert("Failed to upload: " + (newItem.error || 'Unknown error'));
            }
        } catch (error) {
            alert("Upload error.");
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleStylePrev = () => {
        setStyleIndex((prev) => Math.max(0, prev - 1));
    };
    const handleStyleNext = () => {
        setStyleIndex((prev) =>
            Math.min(styleImages.length - visibleCount, prev + 1)
        );
    };

    const visibleStyles = styleImages.slice(styleIndex, styleIndex + visibleCount);

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#1a1a1a",
                color: "#e0e0e0",
                fontFamily: "'Inter', 'Segoe UI', sans-serif",
                overflowY: "auto",
            }}
        >
            <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 32px" }}>

                {/* Title */}
                <h1
                    style={{
                        fontSize: 32,
                        fontWeight: 700,
                        marginBottom: 28,
                        color: "#ffffff",
                        letterSpacing: "-0.5px",
                    }}
                >
                    Images
                </h1>

                {/* Search Bar */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        background: "#2a2a2a",
                        borderRadius: 32,
                        padding: "12px 20px",
                        marginBottom: 48,
                        border: "1px solid #3a3a3a",
                        gap: 12,
                    }}
                >
                    <span style={{ fontSize: 20, color: "#888" }}>🖼️</span>
                    <input
                        type="text"
                        placeholder="Describe a new image"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        style={{
                            flex: 1,
                            background: "transparent",
                            border: "none",
                            outline: "none",
                            color: "#e0e0e0",
                            fontSize: 15,
                            caretColor: "#4a9eff",
                        }}
                    />
                    <button
                        style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            color: "#888",
                            padding: 4,
                            display: "flex",
                            alignItems: "center",
                        }}
                        title="Voice input"
                    >
                        <Mic size={20} />
                    </button>
                    <button
                        style={{
                            background: prompt ? "#4a9eff" : "#3a3a3a",
                            border: "none",
                            cursor: prompt ? "pointer" : "default",
                            color: prompt ? "#fff" : "#666",
                            padding: 8,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            transition: "background 0.2s",
                        }}
                        title="Generate"
                    >
                        <ArrowUp size={18} />
                    </button>
                </div>

                {/* Try a Style Section */}
                <section style={{ marginBottom: 48 }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 20,
                        }}
                    >
                        <h2
                            style={{
                                fontSize: 18,
                                fontWeight: 600,
                                color: "#ffffff",
                            }}
                        >
                            Try a style on an image
                        </h2>
                        <div style={{ display: "flex", gap: 8 }}>
                            <button
                                onClick={handleStylePrev}
                                disabled={styleIndex === 0}
                                style={{
                                    background: "#2a2a2a",
                                    border: "1px solid #3a3a3a",
                                    borderRadius: "50%",
                                    width: 34,
                                    height: 34,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: styleIndex === 0 ? "default" : "pointer",
                                    color: styleIndex === 0 ? "#555" : "#ccc",
                                    transition: "all 0.2s",
                                }}
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={handleStyleNext}
                                disabled={styleIndex >= styleImages.length - visibleCount}
                                style={{
                                    background: "#2a2a2a",
                                    border: "1px solid #3a3a3a",
                                    borderRadius: "50%",
                                    width: 34,
                                    height: 34,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor:
                                        styleIndex >= styleImages.length - visibleCount
                                            ? "default"
                                            : "pointer",
                                    color:
                                        styleIndex >= styleImages.length - visibleCount
                                            ? "#555"
                                            : "#ccc",
                                    transition: "all 0.2s",
                                }}
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: 16, overflow: "hidden" }}>
                        {visibleStyles.map((item, i) => (
                            <div
                                key={i}
                                onClick={() => setSelectedStyle(item)}
                                style={{
                                    flex: "0 0 calc((100% - 80px) / 6)",
                                    cursor: "pointer",
                                    transition: "transform 0.2s",
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.transform = "scale(1.04)")
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.transform = "scale(1)")
                                }
                            >
                                <div
                                    style={{
                                        width: "100%",
                                        aspectRatio: "2/3",
                                        borderRadius: 14,
                                        overflow: "hidden",
                                        marginBottom: 8,
                                        boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                                        background: "#2a2a2a",
                                    }}
                                >
                                    <img
                                        src={item.img}
                                        alt={item.label}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            display: "block",
                                        }}
                                    />
                                </div>
                                <p
                                    style={{
                                        fontSize: 12,
                                        color: "#aaa",
                                        textAlign: "center",
                                        lineHeight: 1.3,
                                    }}
                                >
                                    {item.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Discover Something New Section */}
                <section style={{ marginBottom: 48 }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 20,
                        }}
                    >
                        <h2
                            style={{
                                fontSize: 18,
                                fontWeight: 600,
                                color: "#ffffff",
                            }}
                        >
                            Discover something new
                        </h2>
                        <div style={{ display: "flex", gap: 8 }}>
                            <button
                                style={{
                                    background: "#2a2a2a",
                                    border: "1px solid #3a3a3a",
                                    borderRadius: "50%",
                                    width: 34,
                                    height: 34,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    color: "#ccc",
                                }}
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                style={{
                                    background: "#2a2a2a",
                                    border: "1px solid #3a3a3a",
                                    borderRadius: "50%",
                                    width: 34,
                                    height: 34,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    color: "#ccc",
                                }}
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 14,
                        }}
                    >
                        {discoverItems.map((item, i) => (
                            <div
                                key={i}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 14,
                                    padding: "10px 14px",
                                    borderRadius: 14,
                                    background: "#222",
                                    cursor: "pointer",
                                    transition: "background 0.2s, transform 0.2s",
                                    border: "1px solid #2e2e2e",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "#2e2e2e";
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "#222";
                                    e.currentTarget.style.transform = "translateY(0)";
                                }}
                            >
                                <div
                                    style={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: 10,
                                        background: item.bg,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: 20,
                                        flexShrink: 0,
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                                    }}
                                >
                                    {item.icon}
                                </div>
                                <span style={{ fontSize: 14, color: "#d0d0d0" }}>
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* My Images Section */}
                <section style={{ marginBottom: 48 }}>
                    <h2
                        style={{
                            fontSize: 18,
                            fontWeight: 600,
                            color: "#ffffff",
                            marginBottom: 20,
                        }}
                    >
                        My images
                    </h2>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "60px 20px",
                            borderRadius: 16,
                            background: "#222",
                            border: "1px dashed #3a3a3a",
                            color: "#666",
                            gap: 12,
                        }}
                    >
                        <span style={{ fontSize: 40 }}>🖼️</span>
                        <p style={{ fontSize: 15, color: "#777" }}>
                            No images yet. Start creating!
                        </p>
                        <button
                            style={{
                                marginTop: 8,
                                padding: "10px 24px",
                                background: "linear-gradient(135deg, #4a9eff, #6c63ff)",
                                border: "none",
                                borderRadius: 24,
                                color: "#fff",
                                fontSize: 14,
                                fontWeight: 600,
                                cursor: "pointer",
                                transition: "opacity 0.2s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                        >
                            Generate your first image
                        </button>
                    </div>
                </section>

                {/* Sidebar Setup Section */}
                <section>
                    <h2
                        style={{
                            fontSize: 18,
                            fontWeight: 600,
                            color: "#ffffff",
                            marginBottom: 20,
                        }}
                    >
                        Sidebar Configuration (Database Mock)
                    </h2>
                    
                    <div style={{ background: "#222", borderRadius: 16, padding: 24, border: "1px solid #3a3a3a", marginBottom: 24 }}>
                        <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                            <input
                                type="text"
                                placeholder="Icon Title (e.g. Dashboard)"
                                value={itemTitle}
                                onChange={(e) => setItemTitle(e.target.value)}
                                style={{
                                    flex: 1, padding: "10px 14px", borderRadius: 8, background: "#1a1a1a", border: "1px solid #333", color: "#fff", outline: "none"
                                }}
                            />
                            <input
                                type="text"
                                placeholder="Route (e.g. /dashboard)"
                                value={itemRoute}
                                onChange={(e) => setItemRoute(e.target.value)}
                                style={{
                                    flex: 1, padding: "10px 14px", borderRadius: 8, background: "#1a1a1a", border: "1px solid #333", color: "#fff", outline: "none"
                                }}
                            />
                            <input 
                                type="file" 
                                accept="image/*" 
                                ref={fileInputRef} 
                                style={{ display: "none" }} 
                                onChange={handleUpload}
                            />
                            <button
                                onClick={() => {
                                    if (!itemTitle || !itemRoute) {
                                        alert("Please enter title and route first!");
                                        return;
                                    }
                                    fileInputRef.current?.click();
                                }}
                                disabled={uploading}
                                style={{
                                    padding: "10px 24px", background: "#4a9eff", border: "none", borderRadius: 8, color: "#fff", fontWeight: 600, cursor: uploading ? "wait" : "pointer", opacity: uploading ? 0.7 : 1
                                }}
                            >
                                {uploading ? "Uploading..." : "Upload Icon & Save"}
                            </button>
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                        {sidebarItems.map((item, idx) => (
                            <div key={idx} style={{ background: "#222", padding: 16, borderRadius: 12, border: "1px solid #333", display: "flex", alignItems: "center", gap: 16 }}>
                                <img src={item.icon_url} alt={item.title} style={{ width: 40, height: 40, objectFit: "contain" }} />
                                <div>
                                    <h4 style={{ color: "#fff", margin: "0 0 4px 0", fontSize: 16 }}>{item.title}</h4>
                                    <p style={{ color: "#aaa", margin: 0, fontSize: 12 }}>{item.route}</p>
                                </div>
                            </div>
                        ))}
                        {sidebarItems.length === 0 && (
                            <p style={{ color: "#aaa", fontSize: 14 }}>No sidebar items in database.</p>
                        )}
                    </div>
                </section>
            </div>

            {/* Popup Modal for Try a Style */}
            {selectedStyle && (
                <div 
                    style={{
                        position: "fixed",
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: "rgba(0,0,0,0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000,
                        backdropFilter: "blur(2px)",
                    }}
                    onClick={() => setSelectedStyle(null)}
                >
                    <div 
                        style={{
                            background: "#222",
                            padding: "40px 32px",
                            borderRadius: 16,
                            width: 400,
                            textAlign: "center",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                            border: "1px solid #333",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 style={{ fontSize: 24, fontWeight: 600, color: "#fff", marginBottom: 8 }}>
                            {selectedStyle.label}
                        </h2>
                        <p style={{ fontSize: 14, color: "#bbb", marginBottom: 32 }}>
                            Try a style on an image
                        </p>

                        <input 
                            type="file" 
                            accept="image/*" 
                            ref={styleUploadRef} 
                            style={{ display: "none" }} 
                            onChange={handleStyleUpload}
                        />

                        <button
                            onClick={() => styleUploadRef.current?.click()}
                            style={{
                                width: "100%",
                                padding: "12px",
                                background: "#fff",
                                color: "#000",
                                border: "none",
                                borderRadius: 24,
                                fontSize: 16,
                                fontWeight: 500,
                                cursor: "pointer",
                                marginBottom: 20,
                            }}
                        >
                            Choose a new photo
                        </button>

                        <button
                            onClick={() => setSelectedStyle(null)}
                            style={{
                                background: "transparent",
                                color: "#fff",
                                border: "none",
                                fontSize: 14,
                                textDecoration: "underline",
                                cursor: "pointer",
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
