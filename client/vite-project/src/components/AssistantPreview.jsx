import React, { useState, useEffect } from "react";
/* ── Theme Tokens ── */
const themes = {
    dark: {
        label: "Midnight",
        card: {
            background: "linear-gradient(160deg, #0f172a 0%, #020617 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 40px 80px -20px rgba(0,0,0,1), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 0 20px rgba(255,255,255,0.02)",
        },
        overlay: "radial-gradient(circle at 15% 0%, rgba(99,102,241,0.15) 0%, transparent 50%), radial-gradient(circle at 85% 100%, rgba(168,85,247,0.15) 0%, transparent 50%)",
        orbGrad: "linear-gradient(135deg, #38bdf8, #818cf8, #c084fc)",
        orbGlow: "0 0 40px rgba(129,140,248,0.4), 0 0 80px rgba(129,140,248,0.2), inset 0 0 20px rgba(255,255,255,0.5)",
        orbGlowActive: "0 0 60px rgba(129,140,248,0.7), 0 0 120px rgba(129,140,248,0.4), inset 0 0 30px rgba(255,255,255,0.6)",
        text: "#f8fafc",
        sub: "#94a3b8",
        statusActive: "#818cf8",
        waveColor: "#818cf8",
        btnBg: "linear-gradient(135deg, #6366f1, #a855f7)",
        btnText: "#ffffff",
        btnBorder: "1px solid rgba(255,255,255,0.1)",
        btnShadow: "0 10px 20px -10px rgba(168,85,247,0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
        msgBg: "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
        msgBorder: "1px solid rgba(255,255,255,0.05)",
    },
    light: {
        label: "Pearl",
        card: {
            background: "linear-gradient(160deg, #ffffff 0%, #f1f5f9 100%)",
            border: "1px solid rgba(255,255,255,0.8)",
            boxShadow: "0 40px 80px -20px rgba(15,23,42,0.1), inset 0 1px 0 rgba(255,255,255,1), inset 0 0 20px rgba(255,255,255,0.5)",
        },
        overlay: "radial-gradient(circle at 15% 0%, rgba(56,189,248,0.1) 0%, transparent 50%), radial-gradient(circle at 85% 100%, rgba(250,204,21,0.05) 0%, transparent 50%)",
        orbGrad: "linear-gradient(135deg, #f43f5e, #f97316, #fbbf24)",
        orbGlow: "0 0 40px rgba(244,63,94,0.2), 0 0 80px rgba(244,63,94,0.1), inset 0 0 20px rgba(255,255,255,0.8)",
        orbGlowActive: "0 0 60px rgba(244,63,94,0.4), 0 0 120px rgba(244,63,94,0.2), inset 0 0 30px rgba(255,255,255,0.9)",
        text: "#0f172a",
        sub: "#64748b",
        statusActive: "#f43f5e",
        waveColor: "#f43f5e",
        btnBg: "linear-gradient(135deg, #f43f5e, #f97316)",
        btnText: "#ffffff",
        btnBorder: "1px solid rgba(255,255,255,0.2)",
        btnShadow: "0 10px 20px -10px rgba(244,63,94,0.4), inset 0 1px 0 rgba(255,255,255,0.3)",
        msgBg: "linear-gradient(145deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)",
        msgBorder: "1px solid rgba(255,255,255,0.5)",
    },
    glass: {
        label: "Holo Glass",
        card: {
            background: "linear-gradient(160deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 40px 80px -20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 0 20px rgba(255,255,255,0.05)",
        },
        overlay: "radial-gradient(circle at 50% -20%, rgba(255,255,255,0.2) 0%, transparent 60%)",
        orbGrad: "linear-gradient(135deg, #00f2fe, #4facfe, #00f2fe)",
        orbGlow: "0 0 40px rgba(79,172,254,0.5), 0 0 80px rgba(79,172,254,0.3), inset 0 0 20px rgba(255,255,255,0.6)",
        orbGlowActive: "0 0 60px rgba(79,172,254,0.8), 0 0 120px rgba(79,172,254,0.5), inset 0 0 30px rgba(255,255,255,0.8)",
        text: "#ffffff",
        sub: "rgba(255,255,255,0.7)",
        statusActive: "#4facfe",
        waveColor: "#4facfe",
        btnBg: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)",
        btnText: "#ffffff",
        btnBorder: "1px solid rgba(255,255,255,0.3)",
        btnShadow: "0 10px 20px -10px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2)",
        msgBg: "linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)",
        msgBorder: "1px solid rgba(255,255,255,0.15)",
    },
    neon: {
        label: "Cyber Neon",
        card: {
            background: "linear-gradient(160deg, #050505 0%, #000000 100%)",
            border: "1px solid rgba(57,255,20,0.3)",
            boxShadow: "0 40px 80px -20px rgba(0,0,0,1), 0 0 20px rgba(57,255,20,0.05), inset 0 0 20px rgba(57,255,20,0.05)",
        },
        overlay: "radial-gradient(circle at 50% 100%, rgba(57,255,20,0.1) 0%, transparent 60%), repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(57,255,20,0.02) 2px, rgba(57,255,20,0.02) 4px)",
        orbGrad: "linear-gradient(135deg, #39ff14, #00ffcc)",
        orbGlow: "0 0 40px rgba(57,255,20,0.4), 0 0 80px rgba(57,255,20,0.2), inset 0 0 20px rgba(255,255,255,0.5)",
        orbGlowActive: "0 0 60px rgba(57,255,20,0.7), 0 0 120px rgba(57,255,20,0.4), inset 0 0 30px rgba(255,255,255,0.7)",
        text: "#e0ffe0",
        sub: "rgba(57,255,20,0.7)",
        statusActive: "#39ff14",
        waveColor: "#39ff14",
        btnBg: "linear-gradient(135deg, rgba(57,255,20,0.15) 0%, rgba(57,255,20,0.05) 100%)",
        btnText: "#39ff14",
        btnBorder: "1px solid rgba(57,255,20,0.4)",
        btnShadow: "0 10px 20px -10px rgba(57,255,20,0.2), inset 0 1px 0 rgba(57,255,20,0.2)",
        msgBg: "linear-gradient(145deg, rgba(57,255,20,0.05) 0%, rgba(57,255,20,0.01) 100%)",
        msgBorder: "1px solid rgba(57,255,20,0.15)",
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
            <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="flex-1 max-w-[120px] h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1))" }} />
                    <span className="text-[11px] font-bold tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>
                        Live Preview
                    </span>
                    <div className="flex-1 max-w-[120px] h-px" style={{ background: "linear-gradient(270deg, transparent, rgba(255,255,255,0.1))" }} />
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight" style={{ color: "rgba(255,255,255,0.95)" }}>
                    See it in{" "}
                    <span className="relative inline-block">
                        <span className="relative z-10" style={{background: "linear-gradient(135deg, #00ffaa, #06b6d4)",WebkitBackgroundClip: "text",WebkitTextFillColor: "transparent"}}>action</span>
                        <span className="absolute inset-0 blur-xl opacity-30" style={{background: "linear-gradient(135deg, #00ffaa, #06b6d4)"}}></span>
                    </span>
                </h2>
                <p className="text-[14px] max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Switch themes to preview how your assistant looks and feels before deploying to your site.
                </p>
            </div>

            {/* Theme pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
                {themeKeys.map((key) => {
                    const active = activeTheme === key;
                    const themeData = themes[key];
                    return (
                        <button
                            key={key}
                            onClick={() => setActiveTheme(key)}
                            className="px-6 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-500 cursor-pointer backdrop-blur-md relative overflow-hidden group"
                            style={{
                                background: active ? themeData.btnBg : "rgba(255,255,255,0.03)",
                                color: active ? themeData.btnText : "rgba(255,255,255,0.4)",
                                border: active ? themeData.btnBorder : "1px solid rgba(255,255,255,0.05)",
                                boxShadow: active ? themeData.btnShadow : "0 4px 10px rgba(0,0,0,0.1)",
                                transform: active ? "scale(1.05) translateY(-2px)" : "scale(1) translateY(0)",
                            }}
                        >
                            {active && (
                                <div className="absolute inset-0 opacity-50" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)", transform: "skewX(-20deg) translateX(-100%)", animation: "shimmer 2.5s infinite" }} />
                            )}
                            <span className="relative z-10">{themeData.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Preview card wrapper — provides the "browser" chrome feel */}
            <div className="mx-auto max-w-[420px] transition-all duration-700" style={{ filter: isListening ? "drop-shadow(0 20px 40px rgba(0,0,0,0.4))" : "drop-shadow(0 10px 30px rgba(0,0,0,0.3))" }}>
                {/* Browser dots */}
                <div className="flex items-center gap-2 px-5 py-3.5 rounded-t-3xl relative overflow-hidden transition-colors duration-500"
                    style={{
                        background: activeTheme === "dark" ? "#050812" : activeTheme === "glass" ? "rgba(255,255,255,0.05)" : activeTheme === "neon" ? "#020202" : "#f8fafc",
                        borderTop: activeTheme === "dark" ? "1px solid rgba(255,255,255,0.08)" : activeTheme === "glass" ? "1px solid rgba(255,255,255,0.2)" : activeTheme === "neon" ? "1px solid rgba(57,255,20,0.3)" : "1px solid rgba(226,232,240,0.8)",
                        borderLeft: activeTheme === "dark" ? "1px solid rgba(255,255,255,0.08)" : activeTheme === "glass" ? "1px solid rgba(255,255,255,0.2)" : activeTheme === "neon" ? "1px solid rgba(57,255,20,0.3)" : "1px solid rgba(226,232,240,0.8)",
                        borderRight: activeTheme === "dark" ? "1px solid rgba(255,255,255,0.08)" : activeTheme === "glass" ? "1px solid rgba(255,255,255,0.2)" : activeTheme === "neon" ? "1px solid rgba(57,255,20,0.3)" : "1px solid rgba(226,232,240,0.8)",
                        backdropFilter: activeTheme === "glass" ? "blur(40px)" : "none",
                    }}
                >
                    <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57", boxShadow: "inset 0 0 4px rgba(0,0,0,0.2)" }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e", boxShadow: "inset 0 0 4px rgba(0,0,0,0.2)" }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: "#28c840", boxShadow: "inset 0 0 4px rgba(0,0,0,0.2)" }} />
                    <div className="ml-3 flex-1 h-5 rounded-md transition-colors duration-500" style={{background: activeTheme === "dark" ? "rgba(255,255,255,0.04)" : activeTheme === "glass" ? "rgba(255,255,255,0.06)" : activeTheme === "neon" ? "rgba(57,255,20,0.05)" : "rgba(0,0,0,0.04)", border: activeTheme === "neon" ? "1px solid rgba(57,255,20,0.1)" : "none"}}/>
                </div>

                {/* Main preview card */}
                <div className="relative rounded-b-3xl overflow-hidden transition-all duration-500"style={{ ...t.card, borderTop: "none", borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                    {/* Overlay */}
                    {t.overlay !== "none" && (
                        <div className="absolute inset-0 pointer-events-none transition-all duration-500" style={{ background: t.overlay }} />
                    )}

                    <div className="relative z-10 flex flex-col items-center py-14 px-8">
                        {/* Orb container */}
                        <div className="relative mb-10">
                            {/* Ripple rings when listening */}
                            {isListening && [0, 1, 2].map((i) => (
                                    <div key={i}className="absolute top-1/2 left-1/2 rounded-full pointer-events-none"
                                        style={{ width: `${112 + i * 40}px`,height: `${112 + i * 40}px`,transform: "translate(-50%, -50%)",border: `1.5px solid ${t.waveColor}`,opacity: 0,animation: `rippleOut 2.5s cubic-bezier(0.19, 1, 0.22, 1) ${i * 0.4}s infinite`,}}
                                    />
                                ))}

                            {/* Orb */}
                            <div className="w-28 h-28 rounded-full flex items-center justify-center relative cursor-pointer group"
                                onClick={() => !isListening && setIsListening(true)}
                                style={{
                                    background: t.orbGrad,
                                    boxShadow: isListening ? t.orbGlowActive : t.orbGlow,
                                    animation: isListening ? "orbPulse 1.5s ease-in-out infinite" : "orbFloat 4s ease-in-out infinite",
                                    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                                }}
                            >
                                {/* Inner shimmer */}
                                <div className="absolute inset-1 rounded-full opacity-80"
                                    style={{
                                        background: "conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.3) 25%, transparent 50%, rgba(255,255,255,0.2) 75%, transparent 100%)",
                                        animation: "spin 4s linear infinite",
                                    }}
                                />

                                {/* Mic */}
                                <div className="relative z-10 bg-white/10 p-3 rounded-full backdrop-blur-sm border border-white/20 transition-transform duration-300 group-hover:scale-110">
                                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Sound wave bars */}
                        <div className="flex items-center justify-center gap-1 h-10 mb-6 w-full max-w-[200px]">
                            {[...Array(24)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-1 rounded-full transition-all duration-300"
                                    style={{
                                        background: t.waveColor,
                                        height: isListening ? undefined : "4px",
                                        opacity: isListening ? 0.9 : 0.15,
                                        animation: isListening
                                            ? `waveBar 0.5s ease-in-out ${i * 0.05}s infinite alternate`
                                            : "none",
                                    }}
                                />
                            ))}
                        </div>

                        {/* Assistant name */}
                        <h3 className="text-xl font-bold mb-2 transition-colors duration-500" style={{ color: t.text, textShadow: activeTheme === "neon" ? "0 0 10px rgba(57,255,20,0.5)" : "none" }}>
                            {assistant?.name || "Shifra Assistant"}
                        </h3>

                        {/* Status text */}
                        <p className="text-[14px] mb-8 font-medium transition-all duration-500"
                            style={{
                                color: isListening ? t.statusActive : t.sub,
                                animation: isListening ? "textPulse 1.5s ease-in-out infinite" : "none",
                                textShadow: isListening && activeTheme === "neon" ? "0 0 10px rgba(57,255,20,0.5)" : "none",
                            }}
                        >
                            {statusText}
                        </p>

                        {/* Action button */}
                        <button onClick={() => !isListening && setIsListening(true)}
                            className="relative overflow-hidden px-8 py-3.5 rounded-2xl text-[14px] font-bold transition-all duration-500 hover:-translate-y-1 active:translate-y-0 cursor-pointer group"
                            style={{
                                background: t.btnBg,
                                color: t.btnText,
                                border: t.btnBorder,
                                boxShadow: isListening ? `0 0 40px ${t.waveColor}60, ${t.btnShadow}` : t.btnShadow,
                                textShadow: activeTheme === "neon" ? "0 0 5px rgba(57,255,20,0.5)" : "none",
                            }}
                        >
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300" style={{ background: "linear-gradient(90deg, transparent, #fff, transparent)", transform: "skewX(-20deg) translateX(-100%)", animation: "shimmer 2s infinite" }} />
                            <span className="relative z-10 flex items-center justify-center gap-2.5">
                                {isListening ? (
                                    <>
                                        <span className="relative flex h-2.5 w-2.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: t.btnText }}></span>
                                            <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: t.btnText }}></span>
                                        </span>
                                        Listening...
                                    </>
                                ) : "Start Conversation"}
                            </span>
                        </button>

                        {/* Chat bubble */}
                        <div className="mt-8 w-full rounded-2xl p-4.5 transition-all duration-500 animate-fade-in-up" 
                             style={{ background: t.msgBg, border: t.msgBorder, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", animation: "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.2s" }}>
                            <div className="flex items-start gap-3.5">
                                <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center relative shadow-lg" style={{ background: t.orbGrad }}>
                                    <div className="absolute inset-0 rounded-full" style={{ boxShadow: "inset 0 0 10px rgba(255,255,255,0.5)" }}></div>
                                    <svg className="w-4.5 h-4.5 text-white relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                                    </svg>
                                </div>
                                <p className="text-[13px] leading-relaxed pt-1.5 font-medium" style={{ color: t.sub }}>
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
                    50%      { transform: translateY(-8px); }
                }
                @keyframes orbPulse {
                    0%, 100% { transform: scale(1); }
                    50%      { transform: scale(1.05); }
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                @keyframes rippleOut {
                    0%   { transform: translate(-50%, -50%) scale(0.8); opacity: 0.6; }
                    100% { transform: translate(-50%, -50%) scale(1.8); opacity: 0; }
                }
                @keyframes waveBar {
                    0%   { height: 4px; }
                    100% { height: 32px; }
                }
                @keyframes textPulse {
                    0%, 100% { opacity: 0.7; }
                    50%      { opacity: 1; text-shadow: 0 0 10px currentColor; }
                }
                @keyframes fadeInUp {
                    0%   { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                @keyframes shimmer {
                    0%   { transform: skewX(-20deg) translateX(-150%); }
                    50%, 100% { transform: skewX(-20deg) translateX(150%); }
                }
            `}</style>
        </div>
    );
}

export default AssistantPreview;