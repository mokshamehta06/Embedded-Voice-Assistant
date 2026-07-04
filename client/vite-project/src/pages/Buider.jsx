import React, { useState, useEffect } from "react";
import axios from "axios";
import { SeverUrl, ClientUrl } from "../App";
import toast from "react-hot-toast";

function Builder({ user, setUser }) {
    const [saving, setSaving] = useState(false);
    const [editAssistant, setEditAssistant] = useState(false);
    const [form, setForm] = useState({
        assistantName: "",
        businessName: "",
        businessType: "",
        businessDescription: "",
        tone: "friendly",
        theme: "dark",
        enableVoice: true,
        enableNavigation: true,
        geminiApiKey: "",
        pages: [],
    });

    // Page form state
    const [pageName, setPageName] = useState("");
    const [pagePath, setPagePath] = useState("");
    const [pageKeywords, setPageKeywords] = useState("");

    // Sync form with user data
    useEffect(() => {
        if (user) {
            setForm({
                assistantName: user.assistantName || "MyAssistant",
                businessName: user.businessName || "",
                businessType: user.businessType || "",
                businessDescription: user.businessDescription || "",
                tone: user.tone || "friendly",
                theme: user.theme || "dark",
                enableVoice: user.enableVoice ?? true,
                enableNavigation: user.enableNavigation ?? true,
                geminiApiKey: user.geminiApiKey || "",
                pages: user.pages || [],
            });
        }
    }, [user]);
    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const addPage = () => {
        if (!pageName.trim() || !pagePath.trim()) {
            toast.error("Page name and path are required");
            return;
        }
        const keywords = pageKeywords
            .split(",")
            .map((k) => k.trim())
            .filter(Boolean);
        setForm((prev) => ({
            ...prev,
            pages: [...prev.pages, { name: pageName, path: pagePath, keywords }],
        }));
        setPageName("");
        setPagePath("");
        setPageKeywords("");
    };

    const removePage = (index) => {
        setForm((prev) => ({
            ...prev,
            pages: prev.pages.filter((_, i) => i !== index),
        }));
    };

    const handleSave = async () => {
        if (!form.assistantName.trim()) {
            toast.error("Assistant name is required");
            return;
        }
        setSaving(true);
        try {
            const saveRes = await axios.post(
                SeverUrl + "/api/user/save-assistant",
                {
                    assistantName: form.assistantName,
                    businessName: form.businessName,
                    businessType: form.businessType,
                    businessDescription: form.businessDescription,
                    tone: form.tone,
                    theme: form.theme,
                    enableVoice: form.enableVoice,
                    enableNavigation: form.enableNavigation,
                    geminiApiKey: form.geminiApiKey,
                    pages: form.pages,
                },
                { withCredentials: true }
            );
            console.log(saveRes.data);
            toast.success("Assistant saved successfully!");
            setEditAssistant(false);
            // Update user from response
            if (setUser && saveRes.data.user) {
                setUser(saveRes.data.user);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to save assistant");
        } finally {
            setSaving(false);
        }
    };

    // ── Style helpers ──
    const tones = ["friendly", "professional", "sales"];
    const themes = ["light", "dark", "glass", "neon"];

    const themeIcons = {
        light: (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
        ),
        dark: (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
        ),
        glass: (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
        ),
        neon: (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
        ),
    };

    const toneColors = {
        friendly: "#00ffaa",
        professional: "#06b6d4",
        sales: "#8b5cf6",
    };

    const inputStyle = {
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        color: "rgba(255,255,255,0.85)",
        outline: "none",
    };

    const inputFocusHandlers = {
        onFocus: (e) => {
            e.currentTarget.style.borderColor = "rgba(0,255,170,0.3)";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,255,170,0.06)";
        },
        onBlur: (e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            e.currentTarget.style.boxShadow = "none";
        },
    };

    return (
        <div
            className="min-h-screen w-full relative overflow-hidden"
            style={{
                background:
                    "linear-gradient(180deg, #08080c 0%, #0a0c14 50%, #08080c 100%)",
            }}
        >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-3xl pointer-events-none opacity-20"
                style={{
                    background:
                        "radial-gradient(circle, rgba(0,255,170,0.08), rgba(6,182,212,0.04), transparent 70%)",
                }}
            />
            <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none opacity-15"
                style={{
                    background:
                        "radial-gradient(circle, rgba(139,92,246,0.06), transparent 70%)",
                }}
            />
            <div className="absolute top-1/3 right-0 w-[350px] h-[350px] rounded-full blur-3xl pointer-events-none opacity-15"
                style={{
                    background:
                        "radial-gradient(circle, rgba(6,182,212,0.06), transparent 70%)",
                }}
            />
            <div className="relative z-10 max-w-4xl mx-auto px-6 pt-12 pb-20">
                <div className="mb-10"
                    style={{ animation: "fadeUp 0.5s ease-out both" }}
                >
                    <h1 className="text-3xl sm:text-4xl font-extrabold mb-2"
                        style={{ color: "rgba(255,255,255,0.92)" }}
                    >
                        Assistant{" "}
                        <span
                            style={{
                                background:
                                    "linear-gradient(90deg, #00ffaa, #06b6d4, #8b5cf6)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Builder
                        </span>
                    </h1>
                    <p className="text-[14px]"
                        style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                        Customize your virtual assistant
                    </p>
                </div>
                {user.isSetupComplete && !editAssistant && (
                    <div className="rounded-2xl p-6 mb-8"
                        style={{
                            background: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            animation: "fadeUp 0.5s ease-out 0.1s both",
                        }}
                    >
                        {/* Header row with label + Edit button */}
                        <div className="flex items-center justify-between mb-1">
                            <p className="text-[11px] uppercase tracking-widest font-semibold"
                                style={{ color: "rgba(255,255,255,0.25)" }}
                            >
                                Assistant
                            </p>
                            <button
                                onClick={() => setEditAssistant(true)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-300 cursor-pointer"
                                style={{
                                    background: "rgba(0,255,170,0.08)",
                                    color: "#00ffaa",
                                    border: "1px solid rgba(0,255,170,0.15)",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "rgba(0,255,170,0.15)";
                                    e.currentTarget.style.boxShadow = "0 0 12px rgba(0,255,170,0.12)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "rgba(0,255,170,0.08)";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                            >
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                                Edit
                            </button>
                        </div>

                        {/* Assistant Name */}
                        <h2 className="text-2xl font-bold mb-1"
                            style={{ color: "rgba(255,255,255,0.92)" }}
                        >
                            {user.assistantName || "MyAssistant"}
                        </h2>

                        {/* Business info line */}
                        {(user.businessName || user.businessType) && (
                            <p className="text-[13px] mb-1"
                                style={{ color: "rgba(255,255,255,0.4)" }}
                            >
                                {user.businessName}{user.businessName && user.businessType ? " · " : ""}{user.businessType}
                            </p>
                        )}

                        <p className="text-[13px] mb-5"
                            style={{ color: "rgba(255,255,255,0.3)" }}
                        >
                            Your assistant is ready to use on your website.
                        </p>

                        {/* Stats row */}
                        <div className="grid grid-cols-3 gap-3">
                            {/* Plan */}
                            <div className="rounded-xl px-4 py-3"
                                style={{
                                    background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(255,255,255,0.06)",
                                }}
                            >
                                <p className="text-[10px] uppercase tracking-widest mb-1 font-semibold"
                                    style={{ color: "rgba(255,255,255,0.25)" }}
                                >
                                    Current Plan
                                </p>
                                <p className="text-[15px] font-bold capitalize"
                                    style={{ color: "rgba(255,255,255,0.85)" }}
                                >
                                    {user.plan || "Free"}
                                </p>
                            </div>

                            {/* Gemini Status */}
                            <div className="rounded-xl px-4 py-3"
                                style={{
                                    background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(255,255,255,0.06)",
                                }}
                            >
                                <p className="text-[10px] uppercase tracking-widest mb-1 font-semibold"
                                    style={{ color: "rgba(255,255,255,0.25)" }}
                                >
                                    Gemini Status
                                </p>
                                <p className="text-[15px] font-bold capitalize"
                                    style={{
                                        color: user.geminiStatus === "active" ? "#00ffaa"
                                            : user.geminiStatus === "quota_exceeded" ? "#f59e0b"
                                                : "#ef4444",
                                    }}
                                >
                                    {user.geminiStatus || "Active"}
                                </p>
                            </div>

                            {/* Messages Left */}
                            <div className="rounded-xl px-4 py-3"
                                style={{
                                    background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(255,255,255,0.06)",
                                }}
                            >
                                <p className="text-[10px] uppercase tracking-widest mb-1 font-semibold"
                                    style={{ color: "rgba(255,255,255,0.25)" }}
                                >
                                    Messages Left
                                </p>
                                <p className="text-[15px] font-bold"
                                    style={{ color: "rgba(255,255,255,0.85)" }}
                                >
                                    {(user.requestLimit || 200) - (user.totalMessages || 0)}
                                </p>
                            </div>
                        </div>

                        {/* Embed Script Section */}
                        <div className="mt-6">
                            <p className="text-[11px] uppercase tracking-widest mb-3 font-semibold"
                                style={{ color: "rgba(255,255,255,0.25)" }}
                            >
                                Embed Script
                            </p>
                            <p className="text-[13px] mb-3"
                                style={{ color: "rgba(255,255,255,0.4)" }}
                            >
                                Add this script to your website to activate the assistant.
                            </p>
                            <pre className="mt-3 rounded-xl p-4 text-[12px] font-mono overflow-x-auto"
                                style={{
                                    background: "rgba(0,255,170,0.04)",
                                    border: "1px solid rgba(0,255,170,0.12)",
                                    color: "#00ffaa",
                                    lineHeight: 1.6,
                                }}
                            >
{`<body>
  Your Website Content
  <script src="${ClientUrl}/assistant.js" data-user-id="${user?._id}"></script>
</body>`}
                            </pre>

                            {/* Where to paste info */}
                            <div className="mt-4 rounded-xl px-4 py-3"
                                style={{
                                    background: "rgba(245,158,11,0.05)",
                                    border: "1px solid rgba(245,158,11,0.12)",
                                }}
                            >
                                <p className="text-[12px] font-semibold mb-1"
                                    style={{ color: "rgba(245,158,11,0.8)" }}
                                >
                                    Where to paste this script?
                                </p>
                                <p className="text-[12px]"
                                    style={{ color: "rgba(255,255,255,0.35)" }}
                                >
                                    Paste this script before the closing <code style={{ color: "rgba(245,158,11,0.7)" }}>&lt;/body&gt;</code> tag of your website HTML file.
                                </p>
                            </div>

                            {/* Embed Code with Copy Button */}
                            <div className="mt-4">
                                <p className="text-[11px] uppercase tracking-widest mb-2 font-semibold"
                                    style={{ color: "rgba(255,255,255,0.25)" }}
                                >
                                    Embed Code
                                </p>
                                <div className="relative flex items-center rounded-xl"
                                    style={{
                                        background: "rgba(255,255,255,0.03)",
                                        border: "1px solid rgba(255,255,255,0.08)",
                                    }}
                                >
                                    <code className="flex-1 px-4 py-3 text-[12px] font-mono overflow-x-auto"
                                        style={{ color: "#00ffaa" }}
                                    >
                                        {`<script src="${ClientUrl}/assistant.js" data-user-id="${user?._id}"></script>`}
                                    </code>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                `<script src="${ClientUrl}/assistant.js" data-user-id="${user?._id}"></script>`
                                            );
                                            toast.success("Copied to clipboard!");
                                        }}
                                        className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mr-2 transition-all duration-200 cursor-pointer"
                                        style={{
                                            background: "rgba(255,255,255,0.05)",
                                            border: "1px solid rgba(255,255,255,0.1)",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = "rgba(0,255,170,0.12)";
                                            e.currentTarget.style.borderColor = "rgba(0,255,170,0.25)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                                        }}
                                        title="Copy to clipboard"
                                    >
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {(!user.isSetupComplete || editAssistant) && (<>
                    <div className="rounded-2xl p-6 mb-6"
                        style={{
                            background: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            animation: "fadeUp 0.5s ease-out 0.1s both",
                        }}
                    >
                        <h2 className="text-[15px] font-bold mb-5 flex items-center gap-2"
                            style={{ color: "rgba(255,255,255,0.85)" }}
                        >
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                                style={{
                                    background: "rgba(0,255,170,0.08)",
                                    border: "1px solid rgba(0,255,170,0.15)",
                                }}
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#00ffaa" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                            </div>
                            Basic Information
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-[11px] uppercase tracking-widest mb-2 font-semibold"
                                    style={{ color: "rgba(255,255,255,0.3)" }}
                                >
                                    Assistant Name
                                </label>
                                <input type="text"
                                    value={form.assistantName}
                                    onChange={(e) =>
                                        handleChange("assistantName", e.target.value)
                                    }
                                    placeholder="e.g. Shifra"
                                    className="w-full px-4 py-3 rounded-xl text-[13px] transition-all duration-200"
                                    style={inputStyle}
                                    {...inputFocusHandlers}
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] uppercase tracking-widest mb-2 font-semibold"
                                    style={{ color: "rgba(255,255,255,0.3)" }}
                                >
                                    Business Name
                                </label>
                                <input
                                    type="text"
                                    value={form.businessName}
                                    onChange={(e) =>
                                        handleChange("businessName", e.target.value)
                                    }
                                    placeholder="Your business name"
                                    className="w-full px-4 py-3 rounded-xl text-[13px] transition-all duration-200"
                                    style={inputStyle}
                                    {...inputFocusHandlers}
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] uppercase tracking-widest mb-2 font-semibold"
                                    style={{ color: "rgba(255,255,255,0.3)" }}
                                >
                                    Business Type
                                </label>
                                <input
                                    type="text"
                                    value={form.businessType}
                                    onChange={(e) =>
                                        handleChange("businessType", e.target.value)
                                    }
                                    placeholder="e.g. E-commerce, SaaS, Healthcare"
                                    className="w-full px-4 py-3 rounded-xl text-[13px] transition-all duration-200"
                                    style={inputStyle}
                                    {...inputFocusHandlers}
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] uppercase tracking-widest mb-2 font-semibold"
                                    style={{ color: "rgba(255,255,255,0.3)" }}
                                >
                                    Business Description
                                </label>
                                <textarea
                                    value={form.businessDescription}
                                    onChange={(e) =>
                                        handleChange("businessDescription", e.target.value)
                                    }
                                    placeholder="Describe your business so the assistant can provide relevant answers..."
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl text-[13px] resize-none transition-all duration-200"
                                    style={inputStyle}
                                    {...inputFocusHandlers}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl p-6 mb-6"
                        style={{
                            background: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            animation: "fadeUp 0.5s ease-out 0.2s both",
                        }}
                    >
                        <h2 className="text-[15px] font-bold mb-5 flex items-center gap-2"
                            style={{ color: "rgba(255,255,255,0.85)" }}
                        >
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                                style={{
                                    background: "rgba(139,92,246,0.08)",
                                    border: "1px solid rgba(139,92,246,0.15)",
                                }}
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
                                </svg>
                            </div>
                            Appearance
                        </h2>
                        <div className="mb-6">
                            <label className="block text-[11px] uppercase tracking-widest mb-3 font-semibold"
                                style={{ color: "rgba(255,255,255,0.3)" }}
                            >
                                Theme
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {themes.map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => handleChange("theme", t)}
                                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-[13px] font-medium capitalize transition-all duration-300 cursor-pointer"
                                        style={{
                                            background:
                                                form.theme === t
                                                    ? "rgba(139,92,246,0.12)"
                                                    : "rgba(255,255,255,0.03)",
                                            border: form.theme === t ? "1px solid rgba(139,92,246,0.35)" : "1px solid rgba(255,255,255,0.08)",
                                            color: form.theme === t ? "#8b5cf6" : "rgba(255,255,255,0.5)",
                                            boxShadow: form.theme === t ? "0 0 16px rgba(139,92,246,0.12)" : "none",
                                        }}
                                    >
                                        {themeIcons[t]}
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-[11px] uppercase tracking-widest mb-3 font-semibold"
                                style={{ color: "rgba(255,255,255,0.3)" }}
                            >
                                Tone
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {tones.map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => handleChange("tone", t)}
                                        className="px-4 py-3 rounded-xl text-[13px] font-medium capitalize transition-all duration-300 cursor-pointer"
                                        style={{
                                            background:
                                                form.tone === t
                                                    ? `${toneColors[t]}15`
                                                    : "rgba(255,255,255,0.03)",
                                            border:
                                                form.tone === t
                                                    ? `1px solid ${toneColors[t]}50`
                                                    : "1px solid rgba(255,255,255,0.08)",
                                            color:
                                                form.tone === t
                                                    ? toneColors[t]
                                                    : "rgba(255,255,255,0.5)",
                                            boxShadow:
                                                form.tone === t
                                                    ? `0 0 16px ${toneColors[t]}15`
                                                    : "none",
                                        }}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="rounded-2xl p-6 mb-6"
                        style={{
                            background: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            animation: "fadeUp 0.5s ease-out 0.3s both",
                        }}
                    >
                        <h2 className="text-[15px] font-bold mb-5 flex items-center gap-2"
                            style={{ color: "rgba(255,255,255,0.85)" }}
                        >
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                                style={{
                                    background: "rgba(6,182,212,0.08)",
                                    border: "1px solid rgba(6,182,212,0.15)",
                                }}
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            Features
                        </h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200"
                                style={{
                                    background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={form.enableVoice ? "#00ffaa" : "rgba(255,255,255,0.25)"} strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                                    </svg>
                                    <div>
                                        <p
                                            className="text-[13px] font-medium"
                                            style={{ color: "rgba(255,255,255,0.7)" }}
                                        >
                                            Enable Voice
                                        </p>
                                        <p
                                            className="text-[11px]"
                                            style={{ color: "rgba(255,255,255,0.25)" }}
                                        >
                                            Allow visitors to interact using voice
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() =>
                                        handleChange("enableVoice", !form.enableVoice)
                                    }
                                    className="w-12 h-6 rounded-full relative transition-all duration-300 cursor-pointer"
                                    style={{
                                        background: form.enableVoice
                                            ? "linear-gradient(90deg, #00ffaa, #06b6d4)"
                                            : "rgba(255,255,255,0.08)",
                                        boxShadow: form.enableVoice
                                            ? "0 0 12px rgba(0,255,170,0.25)"
                                            : "none",
                                    }}
                                >
                                    <div
                                        className="w-5 h-5 rounded-full absolute top-0.5 transition-all duration-300"
                                        style={{
                                            background: form.enableVoice ? "#08080c" : "rgba(255,255,255,0.3)",
                                            left: form.enableVoice ? "26px" : "2px",
                                        }}
                                    />
                                </button>
                            </div>

                            {/* Enable Navigation */}
                            <div
                                className="flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200"
                                style={{
                                    background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={form.enableNavigation ? "#06b6d4" : "rgba(255,255,255,0.25)"} strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m0 0l3-3m-3 3l-3-3m12-1.5V15m0 0l3-3m-3 3l-3-3" />
                                    </svg>
                                    <div>
                                        <p
                                            className="text-[13px] font-medium"
                                            style={{ color: "rgba(255,255,255,0.7)" }}
                                        >
                                            Enable Navigation
                                        </p>
                                        <p
                                            className="text-[11px]"
                                            style={{ color: "rgba(255,255,255,0.25)" }}
                                        >
                                            Assistant can navigate users to different pages
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() =>
                                        handleChange(
                                            "enableNavigation",
                                            !form.enableNavigation
                                        )
                                    }
                                    className="w-12 h-6 rounded-full relative transition-all duration-300 cursor-pointer"
                                    style={{
                                        background: form.enableNavigation
                                            ? "linear-gradient(90deg, #06b6d4, #8b5cf6)"
                                            : "rgba(255,255,255,0.08)",
                                        boxShadow: form.enableNavigation
                                            ? "0 0 12px rgba(6,182,212,0.25)"
                                            : "none",
                                    }}
                                >
                                    <div
                                        className="w-5 h-5 rounded-full absolute top-0.5 transition-all duration-300"
                                        style={{
                                            background: form.enableNavigation ? "#08080c" : "rgba(255,255,255,0.3)",
                                            left: form.enableNavigation ? "26px" : "2px",
                                        }}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div
                        className="rounded-2xl p-6 mb-6"
                        style={{
                            background: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            animation: "fadeUp 0.5s ease-out 0.4s both",
                        }}
                    >
                        <h2
                            className="text-[15px] font-bold mb-1 flex items-center gap-2"
                            style={{ color: "rgba(255,255,255,0.85)" }}
                        >
                            <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center"
                                style={{
                                    background: "rgba(0,255,170,0.08)",
                                    border: "1px solid rgba(0,255,170,0.15)",
                                }}
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#00ffaa" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                                </svg>
                            </div>
                            Website Pages
                        </h2>
                        <p
                            className="text-[12px] mb-5 ml-10"
                            style={{ color: "rgba(255,255,255,0.25)" }}
                        >
                            Add pages so the assistant can navigate visitors
                        </p>

                        {/* Existing pages */}
                        {form.pages.length > 0 && (
                            <div className="space-y-2 mb-5">
                                {form.pages.map((page, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center justify-between px-4 py-3 rounded-xl group transition-all duration-200"
                                        style={{
                                            background: "rgba(255,255,255,0.03)",
                                            border: "1px solid rgba(255,255,255,0.06)",
                                        }}
                                    >
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <div
                                                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                                                style={{
                                                    background: "rgba(0,255,170,0.06)",
                                                    border: "1px solid rgba(0,255,170,0.1)",
                                                }}
                                            >
                                                <span
                                                    className="text-[10px] font-bold"
                                                    style={{ color: "#00ffaa" }}
                                                >
                                                    {i + 1}
                                                </span>
                                            </div>
                                            <div className="min-w-0">
                                                <p
                                                    className="text-[13px] font-medium truncate"
                                                    style={{ color: "rgba(255,255,255,0.7)" }}
                                                >
                                                    {page.name}
                                                </p>
                                                <p
                                                    className="text-[11px] font-mono truncate"
                                                    style={{ color: "rgba(255,255,255,0.25)" }}
                                                >
                                                    {page.path}
                                                </p>
                                            </div>
                                        </div>
                                        {page.keywords?.length > 0 && (
                                            <div className="flex gap-1.5 mr-3 flex-shrink-0">
                                                {page.keywords.slice(0, 3).map((kw, j) => (
                                                    <span
                                                        key={j}
                                                        className="text-[9px] px-2 py-0.5 rounded-full"
                                                        style={{
                                                            background: "rgba(6,182,212,0.08)",
                                                            color: "rgba(6,182,212,0.6)",
                                                            border: "1px solid rgba(6,182,212,0.12)",
                                                        }}
                                                    >
                                                        {kw}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        <button
                                            onClick={() => removePage(i)}
                                            className="w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer flex-shrink-0"
                                            style={{
                                                background: "rgba(239,68,68,0.08)",
                                                border: "1px solid rgba(239,68,68,0.15)",
                                            }}
                                        >
                                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Add page form */}
                        <div
                            className="rounded-xl p-4"
                            style={{
                                background: "rgba(255,255,255,0.015)",
                                border: "1px dashed rgba(255,255,255,0.08)",
                            }}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                                <input
                                    type="text"
                                    value={pageName}
                                    onChange={(e) => setPageName(e.target.value)}
                                    placeholder="Page name (e.g. About Us)"
                                    className="px-4 py-2.5 rounded-lg text-[12px] transition-all duration-200"
                                    style={inputStyle}
                                    {...inputFocusHandlers}
                                />
                                <input
                                    type="text"
                                    value={pagePath}
                                    onChange={(e) => setPagePath(e.target.value)}
                                    placeholder="Page path (e.g. /about)"
                                    className="px-4 py-2.5 rounded-lg text-[12px] font-mono transition-all duration-200"
                                    style={inputStyle}
                                    {...inputFocusHandlers}
                                />
                            </div>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={pageKeywords}
                                    onChange={(e) => setPageKeywords(e.target.value)}
                                    placeholder="Keywords (comma separated, e.g. about, team, company)"
                                    className="flex-1 px-4 py-2.5 rounded-lg text-[12px] transition-all duration-200"
                                    style={inputStyle}
                                    {...inputFocusHandlers}
                                />
                                <button
                                    onClick={addPage}
                                    className="px-4 py-2.5 rounded-lg text-[12px] font-semibold transition-all duration-300 cursor-pointer flex items-center gap-1.5"
                                    style={{
                                        background: "rgba(0,255,170,0.1)",
                                        color: "#00ffaa",
                                        border: "1px solid rgba(0,255,170,0.2)",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = "rgba(0,255,170,0.18)";
                                        e.currentTarget.style.boxShadow = "0 0 12px rgba(0,255,170,0.15)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "rgba(0,255,170,0.1)";
                                        e.currentTarget.style.boxShadow = "none";
                                    }}
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ═══════════════ Gemini API Key ═══════════════ */}
                    <div
                        className="rounded-2xl p-6 mb-8"
                        style={{
                            background: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            animation: "fadeUp 0.5s ease-out 0.5s both",
                        }}
                    >
                        <h2
                            className="text-[15px] font-bold mb-1 flex items-center gap-2"
                            style={{ color: "rgba(255,255,255,0.85)" }}
                        >
                            <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center"
                                style={{
                                    background: "rgba(6,182,212,0.08)",
                                    border: "1px solid rgba(6,182,212,0.15)",
                                }}
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                                </svg>
                            </div>
                            API Configuration
                        </h2>
                        <p
                            className="text-[12px] mb-5 ml-10"
                            style={{ color: "rgba(255,255,255,0.25)" }}
                        >
                            Your Gemini API key powers the assistant's AI responses
                        </p>

                        <div className="relative">
                            <input
                                type="password"
                                value={form.geminiApiKey}
                                onChange={(e) =>
                                    handleChange("geminiApiKey", e.target.value)
                                }
                                placeholder="Enter your Gemini API Key"
                                className="w-full px-4 py-3 rounded-xl text-[13px] font-mono transition-all duration-200 pr-24"
                                style={inputStyle}
                                {...inputFocusHandlers}
                            />
                            {form.geminiApiKey && (
                                <div
                                    className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1 rounded-lg"
                                    style={{
                                        background: "rgba(0,255,170,0.06)",
                                    }}
                                >
                                    <div
                                        className="w-1.5 h-1.5 rounded-full"
                                        style={{
                                            background: "#00ffaa",
                                            boxShadow: "0 0 6px rgba(0,255,170,0.5)",
                                        }}
                                    />
                                    <span
                                        className="text-[10px] font-medium"
                                        style={{ color: "rgba(0,255,170,0.6)" }}
                                    >
                                        Configured
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ═══════════════ Save Button ═══════════════ */}
                    {editAssistant && (
                        <div className="mb-4" style={{ animation: "fadeUp 0.5s ease-out 0.55s both" }}>
                            <button
                                onClick={() => setEditAssistant(false)}
                                className="px-5 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-300 cursor-pointer"
                                style={{
                                    background: "rgba(255,255,255,0.03)",
                                    color: "rgba(255,255,255,0.5)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                                    e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                                    e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                                }}
                            >
                                ← Cancel Editing
                            </button>
                        </div>
                    )}
                    <div
                        className="flex items-center justify-between"
                        style={{ animation: "fadeUp 0.5s ease-out 0.6s both" }}
                    >
                        <p
                            className="text-[11px]"
                            style={{ color: "rgba(255,255,255,0.2)" }}
                        >
                            Changes are saved to your account
                        </p>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="px-8 py-3 rounded-xl font-semibold text-[14px] tracking-wide transition-all duration-300 cursor-pointer relative group overflow-hidden"
                            style={{
                                background:
                                    "linear-gradient(90deg, #00ffaa, #06d6a0, #06b6d4)",
                                color: "#08080c",
                                boxShadow:
                                    "0 0 30px rgba(0,255,170,0.2), 0 0 60px rgba(0,255,170,0.05)",
                                opacity: saving ? 0.7 : 1,
                            }}
                            onMouseEnter={(e) => {
                                if (!saving) {
                                    e.currentTarget.style.boxShadow =
                                        "0 0 40px rgba(0,255,170,0.35), 0 0 80px rgba(0,255,170,0.1)";
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow =
                                    "0 0 30px rgba(0,255,170,0.2), 0 0 60px rgba(0,255,170,0.05)";
                                e.currentTarget.style.transform = "translateY(0)";
                            }}
                        >
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{
                                    background:
                                        "linear-gradient(90deg, #33ffbb, #22ffb0, #22d4e0)",
                                }}
                            />
                            <span className="relative z-10 flex items-center gap-2">
                                {saving ? (
                                    <>
                                        <svg
                                            className="w-4 h-4 animate-spin"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <svg
                                            className="w-4 h-4"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4.5 12.75l6 6 9-13.5"
                                            />
                                        </svg>
                                        Save Assistant
                                    </>
                                )}
                            </span>
                        </button>
                    </div>
                </>)}
            </div>

            {/* ── Keyframe Animations ── */}
            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}

export default Builder;
