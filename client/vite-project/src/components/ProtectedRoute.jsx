import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ user, loading, children }) {
    if (loading) {
        return (
            <div
                className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
                style={{
                    background:
                        "linear-gradient(180deg, #08080c 0%, #0a0c14 50%, #08080c 100%)",
                }}
            >
                {/* Ambient glow – top-right */}
                <div
                    className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none opacity-25"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(0,255,170,0.08), transparent 70%)",
                    }}
                />

                {/* Ambient glow – bottom-left */}
                <div
                    className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full blur-3xl pointer-events-none opacity-20"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(6,182,212,0.08), transparent 70%)",
                    }}
                />

                {/* Centered loader */}
                <div className="relative flex flex-col items-center gap-8">
                    {/* Ripple rings */}
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                                width: `${120 + i * 60}px`,
                                height: `${120 + i * 60}px`,
                                border: `1px solid rgba(0,255,170,${0.15 - i * 0.04})`,
                                animation: `ripple ${3 + i}s ease-in-out infinite`,
                                animationDelay: `${i * 0.3}s`,
                            }}
                        />
                    ))}

                    {/* Conic spinner */}
                    <div
                        className="w-28 h-28 rounded-full"
                        style={{
                            background:
                                "conic-gradient(from 0deg, transparent, rgba(0,255,170,0.25), transparent, rgba(6,182,212,0.2), transparent)",
                            animation: "spin 3s linear infinite",
                            filter: "blur(6px)",
                        }}
                    />

                    {/* Inner dot */}
                    <div
                        className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full -translate-x-1/2 -translate-y-1/2"
                        style={{
                            background:
                                "linear-gradient(135deg, #00ffaa, #06b6d4)",
                            boxShadow: "0 0 20px rgba(0,255,170,0.35)",
                            animation: "pulse 2s ease-in-out infinite",
                        }}
                    />

                    {/* Loading text */}
                    <p
                        className="mt-6 text-sm tracking-widest uppercase"
                        style={{
                            color: "rgba(255,255,255,0.25)",
                            animation: "fadeUp 0.6s ease-out both",
                        }}
                    >
                        Loading
                        <span style={{ color: "#00ffaa", opacity: 0.6 }}>
                            ...
                        </span>
                    </p>
                </div>

                {/* Keyframes */}
                <style>{`
                    @keyframes ripple {
                        0%, 100% { transform: scale(1); opacity: 0.3; }
                        50%      { transform: scale(1.08); opacity: 0.1; }
                    }
                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to   { transform: rotate(360deg); }
                    }
                    @keyframes pulse {
                        0%, 100% { opacity: 0.6; transform: translate(-50%,-50%) scale(1); }
                        50%      { opacity: 1;   transform: translate(-50%,-50%) scale(1.3); }
                    }
                    @keyframes fadeUp {
                        from { opacity: 0; transform: translateY(12px); }
                        to   { opacity: 1; transform: translateY(0); }
                    }
                `}</style>
            </div>
        );
    }

    if (!user) return <Navigate to="/login" replace />;
    return children;
}

export default ProtectedRoute;