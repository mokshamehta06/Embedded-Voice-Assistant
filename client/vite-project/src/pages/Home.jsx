import React from "react";
import { useNavigate } from "react-router-dom";
import AssistantPreview from "../components/AssistantPreview";

function Home({ user }) {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full relative overflow-hidden"
            style={{
                background: "linear-gradient(180deg, #08080c 0%, #0a0c14 50%, #08080c 100%)",
            }}
        >
            {/* ── Ambient glows ── */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-3xl pointer-events-none opacity-20"
                style={{
                    background:
                        "radial-gradient(circle, rgba(0,255,170,0.08), rgba(6,182,212,0.04), transparent 70%)",
                }}
            />
            <div
                className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none opacity-15"
                style={{
                    background:
                        "radial-gradient(circle, rgba(6,182,212,0.06), transparent 70%)",
                }}
            />
            <div
                className="absolute top-1/3 right-0 w-[350px] h-[350px] rounded-full blur-3xl pointer-events-none opacity-15"
                style={{
                    background:
                        "radial-gradient(circle, rgba(0,255,170,0.06), transparent 70%)",
                }}
            />

            {/* ── Hero Section ── */}
            <div className="relative z-10 flex flex-col items-center justify-center pt-28 pb-20 px-6">
                {/* Badge */}
                <div
                    className="flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
                    style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        animation: "fadeUp 0.5s ease-out both",
                    }}
                >
                    <div className="w-2 h-2 rounded-full"
                        style={{
                            background: "#00ffaa",
                            boxShadow: "0 0 8px rgba(0,255,170,0.5)",
                            animation: "pulse 2s ease-in-out infinite",
                        }}
                    />
                    <span
                        className="text-[13px] font-medium tracking-wide"
                        style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                        Voice AI for modern websites
                    </span>
                </div>

                {/* Main heading */}
                <h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-center leading-tight max-w-4xl"
                    style={{
                        color: "rgba(255,255,255,0.92)",
                        animation: "fadeUp 0.6s ease-out 0.1s both",
                    }}
                >
                    Add a{" "}
                    <span
                        style={{
                            background: "linear-gradient(90deg, #00ffaa, #06b6d4, #8b5cf6)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        Virtual Assistant
                    </span>
                    <br />
                    to your website
                </h1>

                {/* Subtitle */}
                <p
                    className="mt-6 text-center max-w-lg text-base sm:text-lg leading-relaxed"
                    style={{
                        color: "rgba(255,255,255,0.35)",
                        animation: "fadeUp 0.6s ease-out 0.2s both",
                    }}
                >
                    Create a smart voice-enabled assistant that talks to visitors,
                    answers questions and helps users navigate your website instantly.
                </p>

                {/* CTA Button */}
                <button
                    onClick={() => navigate("/builder")}
                    className="mt-10 px-8 py-3.5 rounded-xl font-semibold text-sm tracking-wider text-black overflow-hidden transition-all duration-300 hover:shadow-lg active:scale-[0.97] cursor-pointer relative group"
                    style={{
                        background: "linear-gradient(90deg, #00ffaa, #06d6a0, #06b6d4)",
                        boxShadow: "0 0 30px rgba(0,255,170,0.2), 0 0 60px rgba(0,255,170,0.05)",
                        animation: "fadeUp 0.6s ease-out 0.3s both",
                    }}
                >
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                            background: "linear-gradient(90deg, #33ffbb, #22ffb0, #22d4e0)",
                        }}
                    />
                    <span className="relative z-10">Build Your Assistant</span>
                </button>

                {/* Free plan note */}
                <p
                    className="mt-4 text-[12px]"
                    style={{
                        color: "rgba(255,255,255,0.2)",
                        animation: "fadeUp 0.6s ease-out 0.4s both",
                    }}
                >
                    Free plan includes 200 AI responses
                </p>
            </div>

            {/* ── Assistant Preview ── */}
            <AssistantPreview />

            {/* ── Features Section ── */}
            <div
                className="relative z-10 max-w-5xl mx-auto px-6 pb-20"
                style={{ animation: "fadeUp 0.6s ease-out 0.5s both" }}
            >
                {/* Divider */}
                <div className="flex items-center gap-4 mb-12">
                    <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
                    <span
                        className="text-[10px] tracking-widest uppercase"
                        style={{ color: "rgba(255,255,255,0.15)" }}
                    >
                        What you get
                    </span>
                    <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
                </div>

                {/* Feature cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                        {
                            icon: (
                                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#00ffaa" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                                </svg>
                            ),
                            title: "Voice Powered",
                            desc: "Visitors speak naturally and your assistant responds with real-time voice.",
                        },
                        {
                            icon: (
                                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#06b6d4" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            ),
                            title: "Fully Customizable",
                            desc: "Set your brand name, voice, tone, accent color and personality.",
                        },
                        {
                            icon: (
                                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#8b5cf6" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                                </svg>
                            ),
                            title: "One Line Embed",
                            desc: "Copy a single script tag and paste it into any website — done.",
                        },
                        {
                            icon: (
                                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#00ffaa" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                </svg>
                            ),
                            title: "AI Trained on You",
                            desc: "Feed your business info and get responses tailored to your brand.",
                        },
                        {
                            icon: (
                                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#06b6d4" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                                </svg>
                            ),
                            title: "Usage Analytics",
                            desc: "Track conversations, popular questions and engagement metrics.",
                        },
                        {
                            icon: (
                                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#8b5cf6" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                </svg>
                            ),
                            title: "Secure & Private",
                            desc: "Your data stays safe with end-to-end encryption and privacy controls.",
                        },
                    ].map((feat, i) => (
                        <div
                            key={i}
                            className="rounded-xl p-5 transition-all duration-300 group cursor-default"
                            style={{
                                background: "rgba(255,255,255,0.02)",
                                border: "1px solid rgba(255,255,255,0.05)",
                                animation: `fadeUp 0.4s ease-out ${0.5 + i * 0.08}s both`,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                                e.currentTarget.style.borderColor = "rgba(0,255,170,0.12)";
                                e.currentTarget.style.transform = "translateY(-2px)";
                                e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.3)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                                e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                        >
                            <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                                style={{
                                    background: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(255,255,255,0.06)",
                                }}
                            >
                                {feat.icon}
                            </div>
                            <h3
                                className="text-sm font-semibold mb-1"
                                style={{ color: "rgba(255,255,255,0.8)" }}
                            >
                                {feat.title}
                            </h3>
                            <p
                                className="text-[12px] leading-relaxed"
                                style={{ color: "rgba(255,255,255,0.25)" }}
                            >
                                {feat.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Bottom Stats Bar ── */}
            <div
                className="relative z-10 max-w-4xl mx-auto px-6 pb-16"
                style={{ animation: "fadeUp 0.6s ease-out 0.8s both" }}
            >
                <div
                    className="rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-around gap-6"
                    style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.05)",
                    }}
                >
                    {[
                        { value: "10K+", label: "Assistants Created" },
                        { value: "2M+", label: "Conversations" },
                        { value: "99.9%", label: "Uptime" },
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <div
                                className="text-2xl font-bold"
                                style={{
                                    background: "linear-gradient(90deg, #00ffaa, #06b6d4)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                {stat.value}
                            </div>
                            <div
                                className="text-[11px] mt-1 tracking-wider uppercase"
                                style={{ color: "rgba(255,255,255,0.2)" }}
                            >
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* ── Get Started Section ── */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20">
                <div className="text-center mb-12">
                    <h2
                        className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3"
                        style={{ color: "rgba(255,255,255,0.92)" }}
                    >
                        Get started in minutes
                    </h2>
                    <p
                        className="text-[14px]"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                        Simple setup. No complicated integration.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        {
                            num: "01",
                            color: "#8b5cf6",
                            title: "Sign up free",
                            desc: "Continue with Google and create your assistant instantly.",
                        },
                        {
                            num: "02",
                            color: "#00ffaa",
                            title: "Customize assistant",
                            desc: "Set your business name, tone, voice and theme.",
                        },
                        {
                            num: "03",
                            color: "#8b5cf6",
                            title: "Train your assistant",
                            desc: "Add business details and personalize responses.",
                        },
                        {
                            num: "04",
                            color: "#00ffaa",
                            title: "Embed anywhere",
                            desc: "Copy one script tag and add it to your website.",
                        },
                    ].map((step, i) => (
                        <div
                            key={i}
                            className="rounded-xl p-6 transition-all duration-300 group"
                            style={{
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.06)",
                                animation: `fadeUp 0.4s ease-out ${0.2 + i * 0.1}s both`,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                                e.currentTarget.style.borderColor = `${step.color}25`;
                                e.currentTarget.style.transform = "translateY(-2px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                                e.currentTarget.style.transform = "translateY(0)";
                            }}
                        >
                            <div
                                className="text-2xl font-extrabold mb-3"
                                style={{ color: step.color }}
                            >
                                {step.num}
                            </div>
                            <h3
                                className="text-[15px] font-bold mb-1.5"
                                style={{ color: "rgba(255,255,255,0.85)" }}
                            >
                                {step.title}
                            </h3>
                            <p
                                className="text-[12px] leading-relaxed"
                                style={{ color: "rgba(255,255,255,0.3)" }}
                            >
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Footer ── */}
            <footer
                className="relative z-10 w-full px-6 sm:px-8 lg:px-12 py-6"
                style={{
                    background: "rgba(5,5,12,0.9)",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                }}
            >
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Left: Logo + brand */}
                    <div className="flex items-center gap-3">
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{
                                background: "linear-gradient(135deg, rgba(0,255,170,0.2), rgba(6,182,212,0.2))",
                                border: "1px solid rgba(0,255,170,0.2)",
                            }}
                        >
                            <svg
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#00ffaa"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
                                />
                            </svg>
                        </div>
                        <div>
                            <span
                                className="text-[14px] font-semibold"
                                style={{ color: "rgba(255,255,255,0.85)" }}
                            >
                                Assistant{" "}
                                <span style={{ color: "#00ffaa" }}>AI</span>
                            </span>
                            <p
                                className="text-[11px]"
                                style={{ color: "rgba(255,255,255,0.25)" }}
                            >
                                Voice AI assistant for websites
                            </p>
                        </div>
                    </div>
                    <p
                        className="text-[11px]"
                        style={{ color: "rgba(255,255,255,0.25)" }}
                    >
                        © 2026 AssistantAI. All rights reserved.
                    </p>
                </div>
            </footer>
            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 0.6; transform: scale(1); }
                    50%      { opacity: 1;   transform: scale(1.3); }
                }
            `}</style>
        </div>
    );
}

export default Home;