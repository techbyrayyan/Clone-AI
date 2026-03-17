"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Send } from "lucide-react";

export default function StyleEditorPage() {
    const router = useRouter();
    const [image, setImage] = useState(null);
    const [styleName, setStyleName] = useState("");
    const [prompt, setPrompt] = useState("");

    useEffect(() => {
        // Read from local storage
        const savedImage = localStorage.getItem("styleImage");
        const savedStyle = localStorage.getItem("styleSelected");
        if (savedImage) setImage(savedImage);
        if (savedStyle) setStyleName(savedStyle);
    }, []);

    const handleBack = () => {
        router.back();
    };

    const handleGenerate = () => {
        if (!prompt) return;
        alert(`Generating new image with style: ${styleName} and prompt: ${prompt}`);
        // Here you would call your backend API to style the image
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#1a1a1a",
                color: "#e0e0e0",
                fontFamily: "'Inter', 'Segoe UI', sans-serif",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Header */}
            <div style={{ padding: "16px 32px", borderBottom: "1px solid #333", display: "flex", alignItems: "center" }}>
                <button
                    onClick={handleBack}
                    style={{
                        background: "transparent",
                        border: "none",
                        color: "#fff",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 16,
                    }}
                >
                    <ArrowLeft size={20} />
                    Back
                </button>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 20px" }}>
                <h1 style={{ fontSize: 24, fontWeight: 600, color: "#fff", marginBottom: 24 }}>
                    Apply Style: <span style={{ color: "#4a9eff" }}>{styleName}</span>
                </h1>

                {/* Image Preview */}
                <div 
                    style={{
                        width: "100%",
                        maxWidth: 600,
                        height: 400,
                        background: "#222",
                        borderRadius: 16,
                        border: "1px dashed #444",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 32,
                        overflow: "hidden"
                    }}
                >
                    {image ? (
                        <img 
                            src={image} 
                            alt="Uploaded for styling" 
                            style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        />
                    ) : (
                        <p style={{ color: "#888" }}>No image selected</p>
                    )}
                </div>

                {/* Prompt Input */}
                <div
                    style={{
                        width: "100%",
                        maxWidth: 600,
                        display: "flex",
                        alignItems: "center",
                        background: "#2a2a2a",
                        borderRadius: 32,
                        padding: "12px 20px",
                        border: "1px solid #3a3a3a",
                        gap: 12,
                    }}
                >
                    <input
                        type="text"
                        placeholder="Describe how you want to style this image..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        style={{
                            flex: 1,
                            background: "transparent",
                            border: "none",
                            outline: "none",
                            color: "#e0e0e0",
                            fontSize: 15,
                        }}
                    />
                    <button
                        onClick={handleGenerate}
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
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
