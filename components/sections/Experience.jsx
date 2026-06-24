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

const experiences = [
  {
    role: "Software Development Intern",
    org: "National Informatics Centre, MeitY",
    period: "May 2026 – Present",
    points: [
      "Developed a Flutter-based mobile application for government student verification and declaration workflows, improving accessibility and streamlining multi-step form submission processes.",
      "Built and integrated REST APIs using Node.js, Express.js, and PostgreSQL, enabling secure end-to-end communication between frontend, backend, and database systems.",
      "Implemented JWT-based authentication, OTP verification, and secure data handling workflows to support authenticated access and protected student record management.",
      "Deployed backend infrastructure using Railway/Render with Neon-hosted PostgreSQL, enabling cloud-based persistence, API hosting, and scalable remote testing.",
    ],
  },
  {
    role: "Senior Core Member",
    org: "Robovitics Club, VIT Vellore",
    period: "May 2025 – Present",
    points: [
      "Led technical execution for ROBOWARS at GraVITas, managing 40+ competing bots and 12L+ event budget.",
      "Organized workshops engaging 300+ participants through live demonstrations and guided activities.",
      "Recruited and onboarded 50+ junior members, strengthening club continuity and technical capacity.",
    ],
  },
];

export default function Experience({ isActive }) {
  const [triggered, setTriggered] = useState(false);
  const [activeExp, setActiveExp] = useState(0);

  useEffect(() => {
    if (isActive) setTimeout(() => setTriggered(true), 200);
    else setTriggered(false);
  }, [isActive]);

  const exp = experiences[activeExp];

  return (
    <div style={{ width: "100%", height: "100%", background: "#1a1a18", padding: "3rem 6vw", overflowY: "auto", position: "relative" }}>

      {/* cutout — floating right */}
      <div style={{
        position: "absolute",
        top: 0,
        right: "4vw",
        height: "100%",
        zIndex: 1,
        opacity: 0.5,
        pointerEvents: "none",
      }}>
        <img src="/images/cutout.png" alt="" style={{ height: "100%", width: "auto", objectFit: "contain" }} />
      </div>

      {/* content — sits above cutout */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: "65%" }}>

        {/* heading */}
        <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(3rem, 10vw, 7rem)", fontWeight: 700, color: "#e8e0d5", lineHeight: 0.9, marginBottom: "0.2rem", letterSpacing: "-0.02em" }}>
          <ScrambleText text="EXPERIENCE" trigger={triggered} />
        </h2>
        <p style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(1.2rem, 2vw, 1.6rem)", color: "#c4a0a0", marginBottom: "2.5rem" }}>
          {exp.role}
        </p>

        {/* tab switcher */}
        <div style={{ display: "flex", gap: "2rem", marginBottom: "2rem", borderBottom: "1px solid #2a2a2a", paddingBottom: "0.8rem" }}>
          {experiences.map((e, i) => (
            <button key={i} onClick={() => setActiveExp(i)} style={{
              background: "none", border: "none", cursor: "pointer", padding: 0,
              fontFamily: "sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em",
              color: activeExp === i ? "#e8e0d5" : "#444",
              borderBottom: activeExp === i ? "1px solid #e8e0d5" : "1px solid transparent",
              paddingBottom: "0.5rem", transition: "all 0.3s",
            }}>
              {e.org}
            </button>
          ))}
        </div>

        {/* period */}
        <p style={{ fontFamily: "sans-serif", fontSize: "0.7rem", color: "#444", letterSpacing: "0.15em", marginBottom: "1.5rem" }}>
          {exp.period}
        </p>

        {/* bullet points — big like Figma */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          {exp.points.map((pt, j) => (
            <p key={j} style={{
              fontFamily: "sans-serif",
              fontSize: "clamp(0.82rem, 1.1vw, 1rem)",
              color: "#aaa",
              lineHeight: "1.85",
              letterSpacing: "0.02em",
            }}>
              • {pt}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}