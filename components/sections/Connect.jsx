"use client";

import { useEffect, useState } from "react";

function ScrambleText({ text, trigger }) {
  const [displayed, setDisplayed] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%";

  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    const totalFrames = 20;
    const interval = setInterval(() => {
      frame++;
      if (frame >= totalFrames) { setDisplayed(text); clearInterval(interval); return; }
      const progress = frame / totalFrames;
      setDisplayed(text.split("").map((char, i) => {
        if (char === " ") return " ";
        if (i / text.length < progress) return char;
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(""));
    }, 40);
    return () => clearInterval(interval);
  }, [trigger, text]);

  return <span>{displayed}</span>;
}

const links = [
  { label: "EMAIL", value: "ujani.de2024@vitstudent.ac.in", href: "mailto:ujani.de2024@vitstudent.ac.in" },
  { label: "LINKEDIN", value: "linkedin.com/in/ujani-de-b557a1351", href: "https://linkedin.com/in/ujani-de-b557a1351" },
  { label: "GITHUB", value: "github.com/UjaniDe", href: "https://github.com/UjaniDe" },
];

export default function Connect({ isActive }) {
  const [triggered, setTriggered] = useState(false);
  useEffect(() => {
    if (isActive) setTimeout(() => setTriggered(true), 200);
    else setTriggered(false);
  }, [isActive]);

  return (
    <div style={{ width: "100%", height: "100%", background: "#1a1a18", padding: "4rem 6vw", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(3rem, 10vw, 7rem)", fontWeight: 700, color: "#e8e0d5", lineHeight: 0.9, marginBottom: "3rem", letterSpacing: "-0.02em" }}>
        <ScrambleText text="CONNECT" trigger={triggered} />
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        {links.map((link, i) => (
          <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" style={{ display: "grid", gridTemplateColumns: "100px 1fr", alignItems: "center", padding: "1.5rem 0", borderBottom: "1px solid #222", textDecoration: "none", transition: "opacity 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.opacity = "0.6"} onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
            <span style={{ fontSize: "0.55rem", letterSpacing: "0.2em", color: "#444" }}>{link.label}</span>
            <span style={{ fontSize: "0.85rem", color: "#e8e0d5" }}>{link.value}</span>
          </a>
        ))}
      </div>

      <p style={{ marginTop: "4rem", color: "#222", fontSize: "0.55rem", letterSpacing: "0.15em" }}>2026 — UJANI DE</p>
    </div>
  );
}