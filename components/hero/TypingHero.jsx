"use client";

import { useEffect, useState } from "react";

const fullText = "Hi, this is Ujani.";

export default function TypingHero() {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + fullText[index]);
        setIndex((i) => i + 1);
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor((c) => !c), 500);
    return () => clearInterval(blink);
  }, []);

  return (
    <div style={{
      position: "fixed",
      top: "5vh",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 1,
      textAlign: "center",
      pointerEvents: "none",
      width: "min(620px, 78vw)",
    }}>
      <p style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
        color: "#f0e8e0",
        lineHeight: 1.2,
        textShadow: "0 2px 20px rgba(0,0,0,0.9)",
        whiteSpace: "nowrap",
      }}>
        {displayed}
        <span style={{ opacity: showCursor ? 1 : 0, color: "#8B1A1A" }}>|</span>
      </p>
    </div>
  );
}