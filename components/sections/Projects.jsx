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

const projects = [
  { title: "Reiterate", tech: "React · Node.js · MongoDB", desc: "Bias analysis platform for LLMs. 100+ prompt variants per experiment, sentiment scoring, side-by-side output visualization.", media: "/images/reiterate.mov", isVideo: true, link: "#" },
  { title: "Taruner Swapno", tech: "Flutter · Node.js · PostgreSQL", desc: "Government student verification platform built at NIC, MeitY. JWT auth, OTP verification, REST APIs, cloud deployment.", media: "/images/project1.jpg", isVideo: false, link: "https://github.com/UjaniDe/taruner-swapno-backend" },
  { title: "Sahasini", tech: "React · FastAPI · PostgreSQL", desc: "Crowdsourced urban safety incident reporting. Geospatial heatmaps, WebSockets, AI-driven insights. Won VinHack 2025.", media: "/images/project2.jpg", isVideo: false, link: "#" },
];

export default function Projects({ isActive }) {
  const [triggered, setTriggered] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (isActive) setTimeout(() => setTriggered(true), 200);
    else setTriggered(false);
  }, [isActive]);

  const prev = () => setActive((a) => (a - 1 + projects.length) % projects.length);
  const next = () => setActive((a) => (a + 1) % projects.length);

  return (
    <div style={{ width: "100%", height: "100%", background: "#1a1a18", padding: "4rem 6vw", display: "flex", flexDirection: "column" }}>
      <h2 style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(3rem, 10vw, 7rem)", fontWeight: 700, color: "#e8e0d5", lineHeight: 0.9, marginBottom: "0.3rem", letterSpacing: "-0.02em" }}>
        <ScrambleText text="PROJECTS" trigger={triggered} />
      </h2>
      <p style={{ fontFamily: "'Caveat', cursive", fontSize: "1.4rem", color: "#c4a0a0", marginBottom: "2rem" }}>
        / software
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "3rem", flex: 1, alignItems: "center" }}>
        {/* media left */}
        <div style={{ position: "relative", borderRadius: "8px", overflow: "hidden", background: "#111", aspectRatio: "16/9" }}>
          {projects[active].isVideo
            ? <video src={projects[active].media} autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }} />
            : <img src={projects[active].media} alt={projects[active].title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          }
          {/* arrows */}
          <button onClick={prev} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.6)", border: "1px solid #333", color: "#fff", width: "36px", height: "36px", borderRadius: "50%", cursor: "pointer", fontSize: "1rem" }}>{"<"}</button>
          <button onClick={next} style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.6)", border: "1px solid #333", color: "#fff", width: "36px", height: "36px", borderRadius: "50%", cursor: "pointer", fontSize: "1rem" }}>{">"}</button>
        </div>

        {/* info right */}
        <div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#e8e0d5", fontWeight: 400, marginBottom: "0.8rem" }}>{projects[active].title}</h3>
          <p style={{ fontSize: "0.65rem", color: "#8B1A1A", letterSpacing: "0.1em", marginBottom: "1rem", fontFamily: "monospace" }}>{projects[active].tech}</p>
          <p style={{ fontSize: "0.82rem", color: "#777", lineHeight: "1.9", marginBottom: "1.5rem" }}>{projects[active].desc}</p>
          <a href={projects[active].link} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "#e8e0d5", borderBottom: "1px solid #444", paddingBottom: "3px", textDecoration: "none" }}>VIEW PROJECT</a>

          {/* dots */}
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "2rem" }}>
            {projects.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} style={{ width: i === active ? "24px" : "8px", height: "4px", borderRadius: "2px", background: i === active ? "#e8e0d5" : "#333", border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}