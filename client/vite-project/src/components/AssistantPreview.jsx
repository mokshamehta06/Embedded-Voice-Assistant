import React, { useState, useEffect } from "react";
/* ── Theme Tokens ── */
const themes = {
    dark: {
        label: "Dark",
        card: {
            background: "#0a0e1a",
            border: "1px solid rgba(0,255,170,0.1)",
            boxShadow: "0 25px 80px rgba(0,0,0,0.6), 0 0 40px rgba(0,255,170,0.04)",
        },
        overlay: "radial-gradient(circle at 50% 0%, rgba(0,255,170,0.06), transparent 60%)",
        orbGrad: "linear-gradient(135deg, #00ffaa, #06b6d4, #8b5cf6)",
        orbGlow: "0 0 60px rgba(0,255,170,0.3), 0 0 120px rgba(0,255,170,0.1)",
        orbGlowActive: "0 0 80px rgba(0,255,170,0.5), 0 0 160px rgba(0,255,170,0.2)",
        text: "#e6f1ff",
        sub: "#5a6a8a",
        statusActive: "#00ffaa",
        waveColor: "#00ffaa",
        btnBg: "linear-gradient(90deg, #00ffaa, #06d6a0)",
        btnText: "#0a0e1a",
        msgBg: "rgba(255,255,255,0.03)",
        msgBorder: "1px solid rgba(255,255,255,0.06)",
    },
    light: {
        label: "Light",
        card: {
            background: "linear-gradient(135deg, #ffffff, #f0f4ff, #f8faff)",
            border: "1px solid #dbeafe",
            boxShadow: "0 25px 80px rgba(59,130,246,0.08), 0 4px 20px rgba(0,0,0,0.04)",
        },
        overlay: "radial-gradient(circle at 50% 0%, rgba(59,130,246,0.08), transparent 60%)",
        orbGrad: "linear-gradient(135deg, #60a5fa, #34d399, #a78bfa)",
        orbGlow: "0 0 60px rgba(59,130,246,0.2), 0 0 120px rgba(59,130,246,0.06)",
        orbGlowActive: "0 0 80px rgba(59,130,246,0.4), 0 0 160px rgba(59,130,246,0.12)",
        text: "#0f172a",
        sub: "#64748b",
        statusActive: "#3b82f6",
        waveColor: "#3b82f6",
        btnBg: "linear-gradient(90deg, #3b82f6, #06b6d4)",
        btnText: "#ffffff",
        msgBg: "rgba(59,130,246,0.04)",
        msgBorder: "1px solid rgba(59,130,246,0.1)",
    },
    glass: {
        label: "Glass",
        card: {
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 25px 80px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
        },
        overlay: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.05), transparent 60%)",
        orbGrad: "linear-gradient(135deg, #67e8f9, #a78bfa, #f472b6)",
        orbGlow: "0 0 60px rgba(103,232,249,0.25), 0 0 120px rgba(103,232,249,0.08)",
        orbGlowActive: "0 0 80px rgba(103,232,249,0.45), 0 0 160px rgba(103,232,249,0.15)",
        text: "#ffffff",
        sub: "rgba(255,255,255,0.5)",
        statusActive: "#67e8f9",
        waveColor: "#67e8f9",
        btnBg: "linear-gradient(90deg, #67e8f9, #a78bfa)",
        btnText: "#0f172a",
        msgBg: "rgba(255,255,255,0.04)",
        msgBorder: "1px solid rgba(255,255,255,0.08)",
    },
    minimal: {
        label: "Minimal",
        card: {
            background: "#fafafa",
            border: "1px solid #e5e7eb",
            boxShadow: "0 25px 80px rgba(0,0,0,0.04)",
        },
        overlay: "none",
        orbGrad: "linear-gradient(135deg, #1f2937, #374151, #4b5563)",
        orbGlow: "0 0 40px rgba(0,0,0,0.08)",
        orbGlowActive: "0 0 60px rgba(0,0,0,0.15)",
        text: "#111827",
        sub: "#9ca3af",
        statusActive: "#374151",
        waveColor: "#374151",
        btnBg: "linear-gradient(90deg, #111827, #374151)",
        btnText: "#ffffff",
        msgBg: "rgba(0,0,0,0.02)",
        msgBorder: "1px solid #e5e7eb",
    },
};
const themeKeys = Object.keys(themes);

function AssistantPreview({ assistant }) {
    const [activeTheme, setActiveTheme] = useState("dark");
    const [isListening, setIsListening] = useState(false);
    const [statusText, setStatusText] = useState("Tap to start speaking");
    const t = themes[activeTheme];

    useEffect(() => {
        if (!isListening) return;
        const sequence = [
            { text: "Listening...", delay: 0 },
            { text: "Processing your request...", delay: 2000 },
            { text: "Here's what I found!", delay: 3500 },
        ];
        const timeouts = [];
        sequence.forEach(({ text, delay }) => {
            timeouts.push(setTimeout(() => setStatusText(text), delay));
        });
        timeouts.push(
            setTimeout(() => {
                setIsListening(false);
                setStatusText("Tap to start speaking");
            }, 5000)
        );
        return () => timeouts.forEach(clearTimeout);
    }, [isListening]);

    return (
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
            {/* Section heading */}
            <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="flex-1 max-w-[120px] h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                    <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.2)" }}>
                        Preview
                    </span>
                    <div className="flex-1 max-w-[120px] h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>
                    See it in{" "}
                    <span
                        style={{
                            background: "linear-gradient(90deg, #00ffaa, #06b6d4)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        action
                    </span>
                </h2>
                <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                    Switch themes to preview how your assistant looks on any site
                </p>
            </div>

            {/* Theme pills */}
            <div className="flex items-center justify-center gap-2 mb-10">
                {themeKeys.map((key) => {
                    const active = activeTheme === key;
                    return (
                        <button
                            key={key}
                            onClick={() => setActiveTheme(key)}
                            className="px-5 py-2 rounded-full text-[12px] font-semibold capitalize transition-all duration-300 cursor-pointer"
                            style={{
                                background: active ? "linear-gradient(90deg, #00ffaa, #06d6a0)" : "rgba(255,255,255,0.04)",
                                color: active ? "#08080c" : "rgba(255,255,255,0.35)",
                                border: active ? "1px solid rgba(0,255,170,0.3)" : "1px solid rgba(255,255,255,0.06)",
                                boxShadow: active ? "0 4px 20px rgba(0,255,170,0.2)" : "none",
                                transform: active ? "scale(1.05)" : "scale(1)",
                            }}
                        >
                            {themes[key].label}
                        </button>
                    );
                })}
            </div>

            {/* Preview card wrapper — provides the "browser" chrome feel */}
            <div className="mx-auto max-w-md">
                {/* Browser dots */}
                <div className="flex items-center gap-1.5 px-4 py-2.5 rounded-t-2xl"
                    style={{
                        background: activeTheme === "dark" ? "#06080f" : activeTheme === "glass" ? "rgba(255,255,255,0.04)" : activeTheme === "minimal" ? "#f0f0f0" : "#e8ecf4",
                        borderTop: activeTheme === "dark" ? "1px solid rgba(255,255,255,0.06)" : activeTheme === "glass" ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d1d5db",
                        borderLeft: activeTheme === "dark" ? "1px solid rgba(255,255,255,0.06)" : activeTheme === "glass" ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d1d5db",
                        borderRight: activeTheme === "dark" ? "1px solid rgba(255,255,255,0.06)" : activeTheme === "glass" ? "1px solid rgba(255,255,255,0.1)" : "1px solid #d1d5db",
                    }}
                >
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
                    <div className="ml-3 flex-1 h-5 rounded-md"
                        style={{
                            background: activeTheme === "dark" ? "rgba(255,255,255,0.04)" : activeTheme === "glass" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                        }}
                    />
                </div>

                {/* Main preview card */}
                <div className="relative rounded-b-2xl overflow-hidden transition-all duration-500"
                    style={{ ...t.card, borderTop: "none", borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                >
                    {/* Overlay */}
                    {t.overlay !== "none" && (
                        <div className="absolute inset-0 pointer-events-none" style={{ background: t.overlay }} />
                    )}

                    <div className="relative z-10 flex flex-col items-center py-12 px-8">
                        {/* Orb container */}
                        <div className="relative mb-8">
                            {/* Orb */}
                            <div className="w-24 h-24 rounded-full flex items-center justify-center relative cursor-pointer"
                                onClick={() => !isListening && setIsListening(true)}
                                style={{
                                    background: t.orbGrad,
                                    boxShadow: isListening ? t.orbGlowActive : t.orbGlow,
                                    animation: isListening ? "orbPulse 1.5s ease-in-out infinite" : "orbFloat 4s ease-in-out infinite",
                                    transition: "box-shadow 0.5s ease",
                                }}
                            >
                                {/* Inner shimmer */}
                                <div className="absolute inset-1 rounded-full"
                                    style={{
                                        background: "conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.2) 25%, transparent 50%, rgba(255,255,255,0.15) 75%, transparent 100%)",
                                        animation: "spin 5s linear infinite",
                                    }}
                                />

                                {/* Mic */}
                                <svg className="w-7 h-7 relative z-10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.8}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                                </svg>
                            </div>

                            {/* Ripple rings when listening */}
                            {isListening &&
                                [0, 1, 2].map((i) => (
                                    <div
                                        key={i}
                                        className="absolute top-1/2 left-1/2 rounded-full pointer-events-none"
                                        style={{
                                            width: `${96 + i * 30}px`,
                                            height: `${96 + i * 30}px`,
                                            transform: "translate(-50%, -50%)",
                                            border: `1.5px solid ${t.waveColor}`,
                                            opacity: 0,
                                            animation: `rippleOut 2s ease-out ${i * 0.5}s infinite`,
                                        }}
                                    />
                                ))}
                        </div>

                        {/* Sound wave bars */}
                        <div className="flex items-center gap-[3px] h-8 mb-5">
                            {[...Array(16)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-[3px] rounded-full transition-all duration-200"
                                    style={{
                                        background: t.waveColor,
                                        height: isListening ? undefined : "4px",
                                        opacity: isListening ? 0.7 : 0.15,
                                        animation: isListening
                                            ? `waveBar 0.6s ease-in-out ${i * 0.04}s infinite alternate`
                                            : "none",
                                    }}
                                />
                            ))}
                        </div>

                        {/* Assistant name */}
                        <h3 className="text-lg font-bold mb-1 transition-colors duration-300" style={{ color: t.text }}>
                            {assistant?.name || "Shifra Assistant"}
                        </h3>

                        {/* Status text */}
                        <p className="text-[13px] mb-7 transition-all duration-300"
                            style={{
                                color: isListening ? t.statusActive : t.sub,
                                animation: isListening ? "textPulse 1.5s ease-in-out infinite" : "none",
                            }}
                        >
                            {statusText}
                        </p>

                        {/* Action button */}
                        <button onClick={() => !isListening && setIsListening(true)}
                            className="px-7 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-300 hover:opacity-90 active:scale-95 cursor-pointer"
                            style={{
                                background: t.btnBg,
                                color: t.btnText,
                                boxShadow: isListening ? `0 0 25px ${t.waveColor}40` : "0 4px 15px rgba(0,0,0,0.1)",
                            }}
                        >
                            {isListening ? "● Listening..." : "Start Conversation"}
                        </button>

                        {/* Chat bubble */}
                        <div className="mt-7 w-full rounded-xl p-4 transition-all duration-300" style={{ background: t.msgBg, border: t.msgBorder }}>
                            <div className="flex items-start gap-3">
                                <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[11px] font-bold" style={{ background: t.orbGrad, color: "#fff" }}
                                >
                                </div>
                                <p className="text-[12px] leading-relaxed" style={{ color: t.sub }}>
                                    👋 Hello! I'm your AI assistant. How can I help you today? Ask me about products, pricing, or anything else!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Keyframes */}
            <style>{`
                @keyframes orbFloat {
                    0%, 100% { transform: translateY(0); }
                    50%      { transform: translateY(-6px); }
                }
                @keyframes orbPulse {
                    0%, 100% { transform: scale(1); }
                    50%      { transform: scale(1.06); }
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                @keyframes rippleOut {
                    0%   { transform: translate(-50%, -50%) scale(0.9); opacity: 0.5; }
                    100% { transform: translate(-50%, -50%) scale(1.6); opacity: 0; }
                }
                @keyframes waveBar {
                    0%   { height: 3px; }
                    100% { height: 26px; }
                }
                @keyframes textPulse {
                    0%, 100% { opacity: 0.6; }
                    50%      { opacity: 1; }
                }
            `}</style>
        </div>
    );
}

export default AssistantPreview;