import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
function ScrollFadeText({
    text = "",
    className = "",
    style = {},
    scrollOffset = ["start 0.9", "start 0.25"],
}) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: scrollOffset,
    });

    const words = text.split(" ");

    return (
        <p ref={containerRef} className={className} style={{ ...style, display: "flex", flexWrap: "wrap" }}>
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + 1 / words.length;
                return <Word key={i} word={word} range={[start, end]} progress={scrollYProgress} />;
            })}
        </p>
    );
}

function Word({ word, range, progress }) {
    const opacity = useTransform(progress, range, [0.12, 1]);
    const y = useTransform(progress, range, [4, 0]);

    return (
        <span style={{ marginRight: "0.3em", display: "inline-block", overflow: "hidden" }}>
            <motion.span
                style={{ opacity, y, display: "inline-block", willChange: "opacity, transform" }}
            >
                {word}
            </motion.span>
        </span>
    );
}

export default ScrollFadeText;
