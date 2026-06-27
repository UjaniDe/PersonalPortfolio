"use client";

import { useEffect, useState, useRef } from "react";

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

function LiveClock() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }));
      setDate(now.toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short", year: "numeric" }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return { time, date };
}

const links = [
  { label: "Email", href: "mailto:ujani.de2024@vitstudent.ac.in" },
  { label: "LinkedIn", href: "https://linkedin.com/in/ujani-de-b557a1351" },
  { label: "GitHub", href: "https://github.com/UjaniDe" },
];

export default function Connect({ isActive }) {
  const [triggered, setTriggered] = useState(false);
  const { time, date } = LiveClock();

  useEffect(() => {
    if (isActive) setTimeout(() => setTriggered(true), 200);
    else setTriggered(false);
  }, [isActive]);

  return (
    <div style={{ width: "100%", height: "100%", background: "#1a1a18", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "4rem 4vw 3rem" }}>

      {/* top — links list like Oscar Tao */}
      <div>
        {links.map((link, i) => (
          <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" style={{ display: "block", fontFamily: "'Anton', sans-serif", fontSize: "clamp(2.5rem, 6vw, 5.5rem)", color: "#e8e0d5", textDecoration: "none", lineHeight: 1.15, letterSpacing: "-0.01em", transition: "color 0.2s, opacity 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.color = "#c4a0a0"; }} onMouseLeave={(e) => { e.currentTarget.style.color = "#e8e0d5"; }}>
            {link.label}
          </a>
        ))}
      </div>

      {/* bottom — footer like image 3 */}
      <div>
        {/* top border */}
        <div style={{ height: "1px", background: "#2a2a2a", marginBottom: "2rem" }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
          {/* left — built by + uptime */}
          <div>
            <p style={{ fontFamily: "sans-serif", fontSize: "0.75rem", color: "#555", marginBottom: "1rem" }}>
              Built by{" "}
              <span style={{ color: "#c4a0a0" }}>Ujani De</span>.
            </p>
            <p style={{ fontFamily: "sans-serif", fontSize: "0.65rem", color: "#333", letterSpacing: "0.05em" }}>
              VIT Vellore · NIC MeitY · Durgapur
            </p>
          </div>

          {/* center — date + time */}
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "sans-serif", fontSize: "0.7rem", color: "#444", letterSpacing: "0.1em" }}>
              {date} &nbsp;|&nbsp; {time} IST
            </p>
          </div>

          {/* right — big clock + location like Oscar */}
          <div style={{ textAlign: "right" }}>
            <p style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(2rem, 5vw, 4rem)", color: "#222", lineHeight: 1, letterSpacing: "-0.02em" }}>
              {time}
            </p>
            <p style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(2rem, 5vw, 4rem)", color: "#2a2a2a", lineHeight: 1, letterSpacing: "-0.02em" }}>
              Vellore, India
            </p>
          </div>
        </div>

        {/* copyright */}
        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontFamily: "sans-serif", fontSize: "0.6rem", color: "#2a2a2a", letterSpacing: "0.1em" }}>
            2026, Ujani De. All rights reserved.
          </p>
          <a href="https://github.com/UjaniDe/PersonalPortfolio" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "sans-serif", fontSize: "0.6rem", color: "#333", letterSpacing: "0.1em", textDecoration: "none" }}>
            github · source
          </a>
        </div>
      </div>
    </div>
  );
}