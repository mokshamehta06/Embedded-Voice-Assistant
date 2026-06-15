import React, { useState, Suspense, lazy, Component, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import axios from "axios";
import { SeverUrl } from "../App";



const Spline = lazy(() => import("@splinetool/react-spline"));
const SPLINE_SCENE_URL =
    "https://prod.spline.design/xlzRpQnyMvDPRfvH/scene.splinecode";

// Error boundary
class SplineErrorBoundary extends Component {
    constructor(props) { super(props); this.state = { hasError: false }; }
    static getDerivedStateFromError() { return { hasError: true }; }
    render() { return this.state.hasError ? (this.props.fallback || null) : this.props.children; }
}

function SplineFallback() {
    return (
        <div className="w-full h-full flex items-center justify-center relative">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="absolute rounded-full"
                    style={{
                        width: `${140 + i * 70}px`, height: `${140 + i * 70}px`,
                        border: `1px solid rgba(0,255,170,${0.15 - i * 0.04})`,
                        animation: `ripple ${3 + i}s ease-in-out infinite`, animationDelay: `${i * 0.3}s`
                    }} />
            ))}
            <div className="absolute w-44 h-44 rounded-full"
                style={{
                    background: "conic-gradient(from 0deg, transparent, rgba(0,255,170,0.2), transparent, rgba(6,182,212,0.15), transparent)",
                    animation: "spin 8s linear infinite", filter: "blur(8px)"
                }} />
        </div>
    );
}

const features = [
    {
        icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
        ),
        title: "Sign up free with Google",
        desc: "Continue with Google and create your assistant instantly.",
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="rgba(0,255,170,0.8)" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        title: "Customize assistant",
        desc: "Set your business name, tone, voice and theme.",
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="rgba(6,182,212,0.8)" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
            </svg>
        ),
        title: "Train your assistant",
        desc: "Add business details and personalize responses.",
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="rgba(74,222,128,0.8)" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
            </svg>
        ),
        title: "Embed anywhere",
        desc: "Copy one script tag and add it to your website.",
    },
];

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);


    useEffect(() => {
        let intervalId;
        const hideLogo = () => {
            const viewers = document.querySelectorAll("spline-viewer");
            viewers.forEach(viewer => {
                if (viewer.shadowRoot) {
                    const logo = viewer.shadowRoot.getElementById("logo");
                    if (logo) {
                        logo.style.display = "none";
                        logo.style.opacity = "0";
                        logo.style.visibility = "hidden";
                    }
                    if (!viewer.shadowRoot.querySelector("#hide-spline-logo-style")) {
                        const style = document.createElement("style");
                        style.id = "hide-spline-logo-style";
                        style.textContent = "#logo { display: none !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; }";
                        viewer.shadowRoot.appendChild(style);
                    }
                }
            });
        };

        hideLogo();
        intervalId = setInterval(hideLogo, 200);
        return () => clearInterval(intervalId);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2000);
    };
    const handleLogin=async ()=>{
        try{
            const result=await signInWithPopup(auth,provider)
            const {displayName,email}=result.user
            const res = await axios.post(
                SeverUrl + "/api/auth/google",
                {
                    name: displayName,
                    email
                },
                { withCredentials: true }
            )
            console.log(res.data)
            if(res.status==200){
                navigate("/");
            }
        }
        catch(error){
            console.log(error)
        }
    }
    
    return (
        <div className="h-screen w-full flex overflow-hidden relative bg-black">

            {/* ══════ LEFT: Spline 3D (takes full left half, seamless black bg) ══════ */}
            <div className="hidden lg:block w-[50%] relative">
                <div className="absolute inset-0">
                    <SplineErrorBoundary fallback={<SplineFallback />}>
                        <Suspense fallback={<SplineFallback />}>
                            <Spline scene={SPLINE_SCENE_URL} style={{ width: "100%", height: "100%" }} />
                        </Suspense>
                    </SplineErrorBoundary>
                </div>
                {/* Soft edge fade into right panel */}
                <div className="absolute top-0 right-0 bottom-0 w-40 pointer-events-none z-10"
                    style={{ background: "linear-gradient(to right, transparent, rgba(8,8,12,1))" }} />
            </div>

            {/* ══════ RIGHT: Login form + features ══════ */}
            <div className="w-full lg:w-[50%] h-full overflow-y-auto flex flex-col items-center justify-center px-6 lg:px-14 relative z-20"
                style={{ background: "linear-gradient(180deg, #08080c 0%, #0a0c14 50%, #08080c 100%)" }}>

                {/* Subtle ambient glow */}
                <div className="absolute top-1/4 right-0 w-[300px] h-[300px] rounded-full blur-3xl pointer-events-none opacity-30"
                    style={{ background: "radial-gradient(circle, rgba(0,255,170,0.06), transparent 70%)" }} />

                <div className="w-full max-w-md py-6">
                    {/* Login card */}
                    <div className="rounded-2xl p-5 relative"
                        style={{
                            background: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(255,255,255,0.06)",
                        }}>

                        {/* Top accent line */}
                        <div className="absolute top-0 left-6 right-6 h-px"
                            style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,170,0.3), rgba(6,182,212,0.3), transparent)" }} />

                        <h2 className="text-base font-semibold text-white/90 mb-4">
                            Log in to build{" "}
                            <span style={{ color: "#00ffaa" }}>your assistant</span>
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-3">
                            {/* Email */}
                            <div className="relative group">
                                <div className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{ background: "linear-gradient(90deg, rgba(0,255,170,0.15), rgba(6,182,212,0.15))", filter: "blur(2px)" }} />
                                <div className="relative flex items-center rounded-xl"
                                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                                    <span className="pl-4 text-white/20">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                        </svg>
                                    </span>
                                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-3 py-2.5 bg-transparent text-white/90 placeholder-white/20 outline-none text-sm" />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="relative group">
                                <div className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{ background: "linear-gradient(90deg, rgba(0,255,170,0.15), rgba(6,182,212,0.15))", filter: "blur(2px)" }} />
                                <div className="relative flex items-center rounded-xl"
                                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                                    <span className="pl-4 text-white/20">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                        </svg>
                                    </span>
                                    <input type={showPassword ? "text" : "password"} placeholder="Password"
                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-3 py-2.5 bg-transparent text-white/90 placeholder-white/20 outline-none text-sm" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                                        className="pr-4 text-white/20 hover:text-white/40 transition-colors cursor-pointer">
                                        {showPassword ? (
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Submit */}
                            <button type="submit" disabled={isLoading}
                                className="relative w-full py-2.5 rounded-xl font-semibold text-sm tracking-wider text-black overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group mt-1"
                                style={{ background: "linear-gradient(90deg, #00ffaa, #00e6a0, #06d6a0)" }}>
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ background: "linear-gradient(90deg, #33ffbb, #22ffb0, #11f0a0)" }} />
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {isLoading ? (
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                    ) : "Submit"}
                                </span>
                            </button>
                        </form>

                        {/* Links */}
                        <div className="flex items-center justify-between mt-3 text-xs">
                            <a href="#" className="text-white/25 hover:text-emerald-400/80 transition-colors duration-300">Forgot Password?</a>
                            <a href="#" className="text-white/25 hover:text-emerald-400/80 transition-colors duration-300">
                                New to Aura? <span className="text-emerald-400/60">Create an account</span>
                            </a>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-4">
                        <div className="flex-1 h-px bg-white/5" />
                        <span className="text-white/15 text-[10px] tracking-widest uppercase">How it works</span>
                        <div className="flex-1 h-px bg-white/5" />
                    </div>

                    {/* Feature cards */}
                    <div className="space-y-2">
                        {features.map((feat, i) => (
                            <div key={i}
                                onClick={i === 0 ? handleLogin : undefined}
                                className="rounded-xl p-3 cursor-pointer transition-all duration-300"
                                style={{
                                    background: hoveredCard === i ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.015)",
                                    border: `1px solid ${hoveredCard === i ? "rgba(0,255,170,0.12)" : "rgba(255,255,255,0.04)"}`,
                                    transform: hoveredCard === i ? "translateX(4px)" : "translateX(0)",
                                    animation: `fadeUp 0.4s ease-out ${i * 0.08}s both`,
                                }}
                                onMouseEnter={() => setHoveredCard(i)}
                                onMouseLeave={() => setHoveredCard(null)}>
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                        {feat.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-white/80 font-medium text-sm">{feat.title}</h3>
                                        <p className="text-white/25 text-[11px] mt-0.5">{feat.desc}</p>
                                    </div>
                                    <svg className="w-3.5 h-3.5 flex-shrink-0 transition-all duration-300"
                                        style={{
                                            color: hoveredCard === i ? "rgba(0,255,170,0.6)" : "rgba(255,255,255,0.1)",
                                            transform: hoveredCard === i ? "translateX(2px)" : "translateX(0)"
                                        }}
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile Spline fallback */}
            <div className="lg:hidden absolute top-0 left-0 right-0 h-[250px] z-0 opacity-30">
                <SplineErrorBoundary fallback={<SplineFallback />}>
                    <Suspense fallback={<SplineFallback />}>
                        <Spline scene={SPLINE_SCENE_URL} style={{ width: "100%", height: "100%" }} />
                    </Suspense>
                </SplineErrorBoundary>
                <div className="absolute bottom-0 left-0 right-0 h-24"
                    style={{ background: "linear-gradient(to top, #08080c, transparent)" }} />
            </div>

            {/* Keyframes */}
            <style>{`
        @keyframes float { 0%,100%{transform:translateY(0);opacity:.2} 50%{transform:translateY(-20px);opacity:.35} }
        @keyframes pulse { 0%,100%{opacity:.08;transform:scale(1)} 50%{opacity:.15;transform:scale(1.05)} }
        @keyframes spin { from{transform:rotate(0)} to{transform:rotate(360deg)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ripple { 0%,100%{transform:scale(1);opacity:.3} 50%{transform:scale(1.08);opacity:.1} }
        @keyframes logoFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        /* Hide Spline watermark */
        a[href*="spline.design"] { display: none !important; }
      `}</style>
        </div>
    );
}

export default Login;