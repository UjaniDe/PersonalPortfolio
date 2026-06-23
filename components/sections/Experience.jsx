"use client";

import { useEffect, useState } from "react";

function ScrambleText({ text, trigger, style }) {
  const ref = { current: null };
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

  return <span style={style}>{displayed}</span>;
}

const experiences = [
  {
    role: "Software Development Intern",
    org: "National Informatics Centre, MeitY",
    period: "May 2026 – Present",
    points: [
      "Developed a Flutter-based mobile application for government student verification and declaration workflows.",
      "Built and integrated REST APIs using Node.js, Express.js, and PostgreSQL.",
      "Implemented JWT-based authentication, OTP verification, and secure data handling workflows.",
      "Deployed backend infrastructure using Railway/Render with Neon-hosted PostgreSQL.",
    ],
  },
  {
    role: "Senior Core Member",
    org: "Robovitics Club, VIT Vellore",
    period: "May 2025 – Present",
    points: [
      "Led technical execution for ROBOWARS at GraVITas, managing 40+ bots and 12L+ budget.",
      "Organized workshops engaging 300+ participants.",
      "Recruited and onboarded 50+ junior members.",
    ],
  },
];

export default function Experience({ isActive }) {
  const [triggered, setTriggered] = useState(false);
  useEffect(() => {
    if (isActive) setTimeout(() => setTriggered(true), 200);
    else setTriggered(false);
  }, [isActive]);

  return (
    <div style={{ width: "100%", height: "100%", background: "#1a1a18", padding: "4rem 6vw", overflowY: "auto" }}>
      <h2 style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(3rem, 10vw, 7rem)", fontWeight: 700, color: "#e8e0d5", lineHeight: 0.9, marginBottom: "0.3rem", letterSpacing: "-0.02em" }}>
        <ScrambleText text="EXPERIENCE" trigger={triggered} />
      </h2>
      <p style={{ fontFamily: "'Caveat', cursive", fontSize: "1.4rem", color: "#c4a0a0", marginBottom: "3rem" }}>
        Software Development Intern
      </p>

      {experiences.map((exp, i) => (
        <div key={i} style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
            <div>
              <p style={{ fontSize: "1rem", color: "#e8e0d5", fontWeight: 700 }}>{exp.role}</p>
              <p style={{ fontSize: "0.75rem", color: "#8B1A1A", marginTop: "0.2rem" }}>{exp.org}</p>
            </div>
            <p style={{ fontSize: "0.65rem", color: "#444", fontFamily: "monospace" }}>{exp.period}</p>
          </div>
          {exp.points.map((pt, j) => (
            <p key={j} style={{ fontSize: "0.82rem", color: "#777", lineHeight: "1.9", marginBottom: "0.6rem" }}>• {pt}</p>
          ))}
        </div>
      ))}
    </div>
  );
}