import React, { useState } from "react";

function Billing() {
    const [selectedPlan, setSelectedPlan] = useState("pro");
    const [billingCycle, setBillingCycle] = useState("monthly");

    const plans = [
        {
            id: "free",
            name: "Free",
            price: { monthly: 0, yearly: 0 },
            color: "#00ffaa",
            description: "Get started with basic features",
            features: [
                "200 AI responses/month",
                "1 Assistant",
                "Basic voice support",
                "Community support",
                "Standard themes",
            ],
            limitations: [
                "No custom branding",
                "No analytics",
            ],
            current: true,
        },
        {
            id: "pro",
            name: "Pro",
            price: { monthly: 29, yearly: 290 },
            color: "#06b6d4",
            description: "For growing businesses",
            features: [
                "5,000 AI responses/month",
                "5 Assistants",
                "Advanced voice & accents",
                "Priority support",
                "Custom themes & branding",
                "Usage analytics",
                "Remove watermark",
            ],
            limitations: [],
            popular: true,
        },
        {
            id: "enterprise",
            name: "Enterprise",
            price: { monthly: 99, yearly: 990 },
            color: "#8b5cf6",
            description: "For large-scale operations",
            features: [
                "Unlimited AI responses",
                "Unlimited Assistants",
                "Premium voice models",
                "Dedicated support",
                "White-label solution",
                "Advanced analytics & API",
                "Custom integrations",
                "SLA guarantee",
            ],
            limitations: [],
        },
    ];

    const usageData = {
        responses: { used: 142, total: 200 },
        assistants: { used: 1, total: 1 },
    };

    const invoices = [
        { id: "INV-001", date: "Jun 2026", amount: "$0.00", status: "Free", plan: "Free" },
        { id: "INV-002", date: "May 2026", amount: "$0.00", status: "Free", plan: "Free" },
        { id: "INV-003", date: "Apr 2026", amount: "$0.00", status: "Free", plan: "Free" },
    ];

    const usagePercent = (usageData.responses.used / usageData.responses.total) * 100;

    return (
        <div className="min-h-screen w-full relative overflow-hidden"
            style={{ background: "linear-gradient(180deg, #08080c 0%, #0a0c14 50%, #08080c 100%)", }}>
            {/* ── Ambient glows ── */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-3xl pointer-events-none opacity-20" style={{ background: "radial-gradient(circle, rgba(6,182,212,0.08), rgba(0,255,170,0.04), transparent 70%)", }} />
            <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none opacity-15" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.06), transparent 70%)", }}></div>

            {/* ── Page Content ── */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 pt-12 pb-20">
                {/* Header */}
                <div className="mb-10" style={{ animation: "fadeUp 0.5s ease-out both" }}>
                    <h1 className="text-3xl sm:text-4xl font-extrabold mb-2" style={{ color: "rgba(255,255,255,0.92)" }}>
                        Billing &{" "}
                        <span style={{ background: "linear-gradient(90deg, #00ffaa, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Plans
                        </span>
                    </h1>
                    <p
                        className="text-[14px]"style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                        Manage your subscription and track your usage.
                    </p>
                </div>

                {/* ── Current Plan & Usage ── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10" style={{ animation: "fadeUp 0.5s ease-out 0.1s both" }}>
                    {/* Current Plan Card */}
                    <div className="lg:col-span-2 rounded-2xl p-6"style={{background: "rgba(255,255,255,0.02)",border: "1px solid rgba(255,255,255,0.06)"}}>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <p className="text-[11px] uppercase tracking-widest mb-1"style={{ color: "rgba(255,255,255,0.25)" }}>
                                    Current Plan
                                </p>
                                <div className="flex items-center gap-3">
                                    <h3 className="text-xl font-bold" style={{ color: "rgba(255,255,255,0.9)" }}>Free Plan</h3>
                                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ background: "rgba(0,255,170,0.1)", color: "#00ffaa", border: "1px solid rgba(0,255,170,0.2)", }}>Active</span>
                                </div>
                            </div>
                            <button className="px-5 py-2 rounded-xl text-[13px] font-semibold transition-all duration-300 cursor-pointer"
                                style={{background: "linear-gradient(90deg, #00ffaa, #06d6a0, #06b6d4)",color: "#08080c",boxShadow: "0 0 20px rgba(0,255,170,0.15)",}}
                                onMouseEnter={(e) => {e.currentTarget.style.boxShadow = "0 0 30px rgba(0,255,170,0.3)";e.currentTarget.style.transform = "translateY(-1px)";}}
                                onMouseLeave={(e) => {e.currentTarget.style.boxShadow = "0 0 20px rgba(0,255,170,0.15)";e.currentTarget.style.transform = "translateY(0)";}}>
                                Upgrade Plan
                            </button>
                        </div>
                        {/* Usage bars */}
                        <div className="space-y-4">
                            {/* AI Responses */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[12px] font-medium"
                                        style={{ color: "rgba(255,255,255,0.5)" }}
                                    >
                                        AI Responses
                                    </span>
                                    <span className="text-[12px] font-mono"
                                        style={{ color: "rgba(255,255,255,0.4)" }}
                                    >
                                        {usageData.responses.used}{" "}
                                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>{" "}
                                        {usageData.responses.total}
                                    </span>
                                </div>
                                <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                                    <div className="h-full rounded-full transition-all duration-700" style={{
                                            width: `${usagePercent}%`,
                                            background:
                                                usagePercent > 80
                                                    ? "linear-gradient(90deg, #f59e0b, #ef4444)"
                                                    : "linear-gradient(90deg, #00ffaa, #06b6d4)",
                                            boxShadow:
                                                usagePercent > 80
                                                    ? "0 0 12px rgba(239,68,68,0.3)"
                                                    : "0 0 12px rgba(0,255,170,0.2)",
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Assistants */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[12px] font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
                                        Assistants
                                    </span>
                                    <span
                                        className="text-[12px] font-mono"
                                        style={{ color: "rgba(255,255,255,0.4)" }}
                                    >
                                        {usageData.assistants.used}{" "}
                                        <span style={{ color: "rgba(255,255,255,0.15)" }}>/</span>{" "}
                                        {usageData.assistants.total}
                                    </span>
                                </div>
                                <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${(usageData.assistants.used / usageData.assistants.total) * 100}%`, background: "linear-gradient(90deg, #8b5cf6, #06b6d4)", boxShadow: "0 0 12px rgba(139,92,246,0.2)", }}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Quick Stats Card */}
                    <div className="rounded-2xl p-6 flex flex-col justify-between" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", }}>
                        <div>
                            <p className="text-[11px] uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>
                                This Month
                            </p>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-2xl font-bold" style={{
                                            background: "linear-gradient(90deg, #00ffaa, #06b6d4)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            backgroundClip: "text",
                                        }}
                                    >
                                        142
                                    </div>
                                    <p className="text-[11px] mt-0.5"
                                        style={{ color: "rgba(255,255,255,0.3)" }}
                                    >
                                        Total conversations
                                    </p>
                                </div>
                                <div className="h-px" style={{ background: "rgba(255,255,255,0.05)" }}/>
                                <div>
                                    <div className="text-2xl font-bold" style={{ color: "rgba(255,255,255,0.85)" }}>
                                        $0
                                    </div>
                                    <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                                        Amount due
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: "rgba(0,255,170,0.05)", border: "1px solid rgba(0,255,170,0.1)", }}>
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#00ffaa", boxShadow: "0 0 6px rgba(0,255,170,0.5)", }}/>
                            <span className="text-[11px]" style={{ color: "rgba(0,255,170,0.7)" }}>
                                Renews Jul 30, 2026
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── Billing Cycle Toggle ── */}
                <div className="flex items-center justify-center mb-8"
                    style={{ animation: "fadeUp 0.5s ease-out 0.2s both" }}
                >
                    <div className="flex items-center rounded-xl p-1 gap-1" style={{
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.06)",
                        }}
                    >
                        <button onClick={() => setBillingCycle("monthly")} className="px-5 py-2 rounded-lg text-[13px] font-medium transition-all duration-300 cursor-pointer" style={{
                                background:
                                    billingCycle === "monthly"
                                        ? "rgba(255,255,255,0.08)"
                                        : "transparent",
                                color:
                                    billingCycle === "monthly"
                                        ? "rgba(255,255,255,0.9)"
                                        : "rgba(255,255,255,0.35)",
                                border:
                                    billingCycle === "monthly"
                                        ? "1px solid rgba(255,255,255,0.1)"
                                        : "1px solid transparent",
                            }}
                        >
                            Monthly
                        </button>
                        <button onClick={() => setBillingCycle("yearly")} className="px-5 py-2 rounded-lg text-[13px] font-medium transition-all duration-300 cursor-pointer flex items-center gap-2" style={{
                                background:
                                    billingCycle === "yearly"
                                        ? "rgba(255,255,255,0.08)"
                                        : "transparent",
                                color:
                                    billingCycle === "yearly"
                                        ? "rgba(255,255,255,0.9)"
                                        : "rgba(255,255,255,0.35)",
                                border:
                                    billingCycle === "yearly"
                                        ? "1px solid rgba(255,255,255,0.1)"
                                        : "1px solid transparent",
                            }}
                        >
                            Yearly
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{
                                    background: "rgba(0,255,170,0.12)",
                                    color: "#00ffaa",
                                    border: "1px solid rgba(0,255,170,0.2)",
                                }}
                            >
                                Save 17%
                            </span>
                        </button>
                    </div>
                </div>

                {/* ── Pricing Cards ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"style={{ animation: "fadeUp 0.5s ease-out 0.3s both" }}>
                    {plans.map((plan, i) => (
                        <div key={plan.id} className="rounded-2xl p-6 transition-all duration-300 relative cursor-pointer group"
                            style={{
                                background:selectedPlan === plan.id
                                        ? "rgba(255,255,255,0.04)"
                                        : "rgba(255,255,255,0.02)",
                                border:selectedPlan === plan.id
                                        ? `1px solid ${plan.color}30`
                                        : "1px solid rgba(255,255,255,0.06)",
                                boxShadow:
                                    selectedPlan === plan.id
                                        ? `0 0 40px ${plan.color}10, 0 8px 32px rgba(0,0,0,0.3)`
                                        : "none",
                                animation: `fadeUp 0.4s ease-out ${0.3 + i * 0.08}s both`,
                            }}
                            onClick={() => setSelectedPlan(plan.id)}
                            onMouseEnter={(e) => {
                                if (selectedPlan !== plan.id) {
                                    e.currentTarget.style.background = "rgba(255,255,255,0.035)";
                                    e.currentTarget.style.borderColor = `${plan.color}20`;
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (selectedPlan !== plan.id) {
                                    e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                                    e.currentTarget.style.transform = "translateY(0)";
                                }
                            }}>
                            {/* Popular badge */}
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider"
                                    style={{ background: `linear-gradient(90deg, ${plan.color}, #00ffaa)`, color: "#08080c", boxShadow: `0 0 20px ${plan.color}30`, }}>
                                    Most Popular
                                </div>
                            )}
                            {/* Current badge */}
                            {plan.current && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider"
                                    style={{background: "rgba(255,255,255,0.06)",color: "rgba(255,255,255,0.5)",border: "1px solid rgba(255,255,255,0.1)",}}>
                                    Current Plan
                                </div>
                            )}
                            {/* Plan name */}
                            <div className="mt-2 mb-4">
                                <h3 className="text-lg font-bold mb-1" style={{ color: plan.color }}>{plan.name}</h3>
                                <p className="text-[12px]"style={{ color: "rgba(255,255,255,0.3)"}}>{plan.description}</p>
                            </div>
                            {/* Price */}
                            <div className="mb-6">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-extrabold" style={{ color: "rgba(255,255,255,0.9)"}}>${plan.price[billingCycle]}</span>
                                    <span className="text-[12px]"style={{ color: "rgba(255,255,255,0.25)" }}>/{billingCycle === "monthly" ? "mo" : "yr"}</span>
                                </div>
                                {billingCycle === "yearly" && plan.price.yearly > 0 && (
                                    <p className="text-[11px] mt-1"style={{ color: "rgba(0,255,170,0.5)" }}>
                                        Save ${plan.price.monthly * 12 - plan.price.yearly}/year
                                    </p>
                                )}
                            </div>

                            {/* Features */}
                            <div className="space-y-2.5 mb-6">
                                {plan.features.map((feature, j) => (
                                    <div key={j} className="flex items-start gap-2.5">
                                        <svg className="w-4 h-4 mt-0.5 flex-shrink-0" viewBox="0 0 24 24"fill="none"stroke={plan.color}strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                                        </svg>
                                        <span className="text-[12px]"style={{ color: "rgba(255,255,255,0.5)" }}>{feature}</span>
                                    </div>
                                ))}
                                {plan.limitations.map((limit, j) => (
                                    <div key={`l-${j}`} className="flex items-start gap-2.5">
                                        <svg className="w-4 h-4 mt-0.5 flex-shrink-0"
                                            viewBox="0 0 24 24"
                                            fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={2}>
                                            <path strokeLinecap="round"strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                        <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.2)" }}>{limit}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <button
                                className="w-full py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-300 cursor-pointer"
                                style={{ background: plan.current
                                        ? "rgba(255,255,255,0.04)"
                                        : selectedPlan === plan.id
                                        ? `linear-gradient(90deg, ${plan.color}, ${plan.color}cc)`
                                        : "rgba(255,255,255,0.04)",
                                    color: plan.current
                                        ? "rgba(255,255,255,0.3)"
                                        : selectedPlan === plan.id
                                        ? "#08080c"
                                        : "rgba(255,255,255,0.5)",
                                    border: plan.current
                                        ? "1px solid rgba(255,255,255,0.06)"
                                        : selectedPlan === plan.id
                                        ? `1px solid ${plan.color}50`
                                        : "1px solid rgba(255,255,255,0.08)",
                                    boxShadow:
                                        selectedPlan === plan.id && !plan.current
                                            ? `0 0 20px ${plan.color}20`
                                            : "none",
                                    cursor: plan.current ? "default" : "pointer",
                                }}
                            >
                                {plan.current
                                    ? "Current Plan"
                                    : selectedPlan === plan.id
                                    ? "Upgrade Now"
                                    : "Select Plan"}
                            </button>
                        </div>
                    ))}
                </div>

                {/* ── Divider ── */}
                <div className="flex items-center gap-4 mb-10"style={{ animation: "fadeUp 0.5s ease-out 0.5s both" }}>
                    <div className="flex-1 h-px"style={{ background: "rgba(255,255,255,0.05)" }}/>
                    <span className="text-[10px] tracking-widest uppercase"style={{ color: "rgba(255,255,255,0.15)" }}>
                        Payment History
                    </span>
                    <div className="flex-1 h-px"style={{ background: "rgba(255,255,255,0.05)" }}/>
                </div>
                {/* ── Invoices Table ── */}
                <div className="rounded-2xl overflow-hidden"
                    style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        animation: "fadeUp 0.5s ease-out 0.6s both",
                    }}
                >
                    {/* Table Header */}
                    <div className="grid grid-cols-5 gap-4 px-6 py-3"
                        style={{
                            background: "rgba(255,255,255,0.02)",
                            borderBottom: "1px solid rgba(255,255,255,0.05)",
                        }}
                    >
                        {["Invoice", "Date", "Plan", "Amount", "Status"].map(
                            (header) => (
                                <span
                                    key={header}
                                    className="text-[10px] uppercase tracking-widest font-semibold"
                                    style={{ color: "rgba(255,255,255,0.25)" }}
                                >
                                    {header}
                                </span>
                            )
                        )}
                    </div>

                    {/* Table Rows */}
                    {invoices.map((invoice, i) => (
                        <div
                            key={invoice.id}
                            className="grid grid-cols-5 gap-4 px-6 py-4 transition-all duration-200"
                            style={{
                                borderBottom:
                                    i < invoices.length - 1
                                        ? "1px solid rgba(255,255,255,0.03)"
                                        : "none",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "transparent";
                            }}
                        >
                            <span
                                className="text-[12px] font-mono"
                                style={{ color: "rgba(255,255,255,0.5)" }}
                            >
                                {invoice.id}
                            </span>
                            <span
                                className="text-[12px]"
                                style={{ color: "rgba(255,255,255,0.4)" }}
                            >
                                {invoice.date}
                            </span>
                            <span
                                className="text-[12px]"
                                style={{ color: "rgba(255,255,255,0.4)" }}
                            >
                                {invoice.plan}
                            </span>
                            <span
                                className="text-[12px] font-medium"
                                style={{ color: "rgba(255,255,255,0.6)" }}
                            >
                                {invoice.amount}
                            </span>
                            <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full w-fit"
                                style={{ background: "rgba(0,255,170,0.08)",
                                    color: "rgba(0,255,170,0.6)",
                                    border: "1px solid rgba(0,255,170,0.12)",
                                }}
                            >
                                {invoice.status}
                            </span>
                        </div>
                    ))}
                </div>

                {/* ── Payment Method ── */}
                <div
                    className="mt-6 rounded-2xl p-6"
                    style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        animation: "fadeUp 0.5s ease-out 0.7s both",
                    }}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {/* Card icon */}
                            <div
                                className="w-12 h-8 rounded-lg flex items-center justify-center"
                                style={{
                                    background: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                }}
                            >
                                <svg
                                    className="w-6 h-6"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.4)"
                                    strokeWidth={1.5}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <p
                                    className="text-[13px] font-medium"
                                    style={{ color: "rgba(255,255,255,0.6)" }}
                                >
                                    No payment method added
                                </p>
                                <p
                                    className="text-[11px]"
                                    style={{ color: "rgba(255,255,255,0.25)" }}
                                >
                                    Add a card to upgrade your plan
                                </p>
                            </div>
                        </div>
                        <button
                            className="px-4 py-2 rounded-lg text-[12px] font-medium transition-all duration-300 cursor-pointer"
                            style={{
                                background: "rgba(255,255,255,0.04)",
                                color: "rgba(255,255,255,0.5)",
                                border: "1px solid rgba(255,255,255,0.08)",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                                e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                                e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                            }}
                        >
                            + Add Card
                        </button>
                    </div>
                </div>
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

export default Billing;