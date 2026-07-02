import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { SeverUrl } from "../App";
import toast from "react-hot-toast";

function Navbar({ user, setUser }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen,setMenuOpen] = useState(false)

    const handleLogout = async () => {
        try {
            await axios.post(SeverUrl + "/api/auth/logout", {}, { withCredentials: true });
            setUser(null);
            toast.success("Logged out successfully");
            navigate("/login");
        } catch (error) {
            console.log(error);
            toast.error("Logout failed");
        }
    };

    const getInitial = () => {
        if (user?.name) return user.name.charAt(0).toUpperCase();
        if (user?.email) return user.email.charAt(0).toUpperCase();
        return "U";
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav
            className="sticky top-0 z-50"
            style={{
                background: "rgba(8, 8, 12, 0.85)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
        >
            {/* Top accent line */}
            <div
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, rgba(0,255,170,0.15), rgba(6,182,212,0.15), transparent)",
                }}
            />

            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14">

                    {/* ── Left: Version + Logo + Brand ── */}
                    <div className="flex items-center gap-3">
                        {/* Version badge */}
                        <span
                            className="text-[11px] font-mono px-2 py-0.5 rounded"
                            style={{
                                color: "#00ffaa",
                                background: "rgba(0,255,170,0.08)",
                                border: "1px solid rgba(0,255,170,0.15)",
                            }}
                        >
                            1.00
                        </span>

                        {/* Logo icon */}
                        <div
                            className="w-7 h-7 rounded-full flex items-center justify-center relative"
                            style={{
                                background: "linear-gradient(135deg, rgba(0,255,170,0.2), rgba(6,182,212,0.2))",
                                border: "1px solid rgba(0,255,170,0.2)",
                                boxShadow: "0 0 12px rgba(0,255,170,0.1)",
                            }}
                        >
                            <svg
                                className="w-3.5 h-3.5"
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

                        {/* Brand name */}
                        <span className="text-[15px] font-semibold tracking-tight"
                            style={{ color: "rgba(255,255,255,0.9)" }}>
                            Shifra{" "}
                            <span style={{ color: "#00ffaa" }}>AI</span>
                        </span>
                    </div>

                    {/* ── Center-Right: Nav Links + Profile ── */}
                    <div className="flex items-center gap-2">
                        {/* Builder button */}
                        <button
                            onClick={() => navigate("/builder")}
                            className="px-4 py-1.5 rounded-lg text-[13px] font-semibold transition-all duration-300 cursor-pointer"
                            style={{
                                background: isActive("/builder")
                                    ? "linear-gradient(90deg, #00ffaa, #06d6a0)"
                                    : "rgba(255,255,255,0.04)",
                                color: isActive("/builder") ? "#08080c" : "rgba(255,255,255,0.5)",
                                border: isActive("/builder")
                                    ? "1px solid rgba(0,255,170,0.4)"
                                    : "1px solid rgba(255,255,255,0.06)",
                                boxShadow: isActive("/builder")
                                    ? "0 0 16px rgba(0,255,170,0.25)"
                                    : "none",
                            }}
                        >
                            Builder
                        </button>

                        {/* Billing link */}
                        <button
                            onClick={() => navigate("/billing")}
                            className="px-4 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-300 cursor-pointer"
                            style={{
                                background: isActive("/billing")
                                    ? "linear-gradient(90deg, #00ffaa, #06d6a0)"
                                    : "transparent",
                                color: isActive("/billing") ? "#08080c" : "rgba(255,255,255,0.4)",
                                border: isActive("/billing")
                                    ? "1px solid rgba(0,255,170,0.4)"
                                    : "1px solid transparent",
                                boxShadow: isActive("/billing")
                                    ? "0 0 16px rgba(0,255,170,0.25)"
                                    : "none",
                            }}
                        >
                            Billing
                        </button>

                        {/* Divider */}
                        <div
                            className="w-px h-6 mx-2"
                            style={{ background: "rgba(255,255,255,0.08)" }}
                        />

                        {/* User profile */}
                        <div className="flex items-center gap-2.5 cursor-pointer group">
                            {/* Avatar */}
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold relative"
                                style={{
                                    background: "linear-gradient(135deg, rgba(0,255,170,0.15), rgba(6,182,212,0.15))",
                                    border: "1px solid rgba(0,255,170,0.2)",
                                    color: "#00ffaa",
                                    boxShadow: "0 0 10px rgba(0,255,170,0.08)",
                                }}
                            >
                                {getInitial()}
                            </div>

                            {/* Name & Email */}
                            <div className="hidden sm:flex flex-col leading-tight">
                                <span
                                    className="text-[13px] font-semibold"
                                    style={{ color: "rgba(255,255,255,0.85)" }}
                                >
                                    {user?.name || "User"}
                                </span>
                                <span
                                    className="text-[11px]"
                                    style={{ color: "rgba(255,255,255,0.3)" }}
                                >
                                    {user?.email || ""}
                                </span>
                            </div>
                        </div>

                        {/* Logout button */}
                        <button
                            onClick={handleLogout}
                            className="ml-1 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 cursor-pointer"
                            style={{
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(255,255,255,0.06)",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(239,68,68,0.15)";
                                e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)";
                                e.currentTarget.querySelector("svg").style.stroke = "#ef4444";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                                e.currentTarget.querySelector("svg").style.stroke = "rgba(255,255,255,0.35)";
                            }}
                            title="Logout"
                        >
                            <svg
                                className="w-4 h-4 transition-all duration-300"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="rgba(255,255,255,0.35)"
                                strokeWidth={1.5}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                {user && (
                    <button onClick={() => setMenuOpen(prev => !prev)} className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg transition-colors cursor-pointer"
                        style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            color: "rgba(255,255,255,0.5)",
                        }}>
                        {menuOpen ? (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        )}
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
