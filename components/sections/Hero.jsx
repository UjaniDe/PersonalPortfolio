"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

function ScrambleText({ text, trigger, style }) {
  const ref = useRef(null);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*";

  useEffect(() => {
    if (!trigger || !ref.current) return;
    let frame = 0;
    const totalFrames = 18;
    const interval = setInterval(() => {
      frame++;
      if (frame >= totalFrames) {
        ref.current.textContent = text;
        clearInterval(interval);
        return;
      }
      const progress = frame / totalFrames;
      ref.current.textContent = text.split("").map((char, i) => {
        if (char === " ") return " ";
        if (i / text.length < progress) return char;
        return chars[Math.floor(Math.random() * chars.length)];
      }).join("");
    }, 40);
    return () => clearInterval(interval);
  }, [trigger, text]);

  return <span ref={ref} style={style}>{text}</span>;
}

export default function Hero({ isActive }) {
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (isActive) setTimeout(() => setTriggered(true), 200);
    else setTriggered(false);
  }, [isActive]);

  return (
    <div style={{ width: "100%", height: "100%", background: "#1a1a18", position: "relative", overflow: "hidden" }}>

      {/* handwritten greeting — top center */}
      <p style={{
        position: "absolute",
        top: "5vh",
        left: "50%",
        transform: "translateX(-50%)",
        fontFamily: "'Caveat', cursive",
        fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
        color: "#d4a0a8",
        whiteSpace: "nowrap",
        zIndex: 10,
      }}>
        Hi this is ujani...
      </p>

{/* Group 2 — the premade polaroid+stamp image, center-left */}
<div style={{
  position: "absolute",
  top: "8vh",
  left: "20vw",
  zIndex: 4,
  width: "min(520px, 52vw)",
}}>
  <img
    src="/images/Group2.png"
    alt=""
    style={{ width: "100%", height: "auto", objectFit: "contain" }}
  />
</div>



      {/* About me — right side */}
      <div style={{
        position: "absolute",
        top: "12vh",
        right: "13vw",
        maxWidth: "min(380px, 52vw)",
        zIndex: 5,
      }}>
        <h2 style={{
          fontFamily: "'Anton', sans-serif",
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          color: "#e8e0d5",
          lineHeight: 1,
          marginBottom: "1.2rem",
          letterSpacing: "0.02em",
        }}>
          <ScrambleText text="About me" trigger={triggered} />
        </h2>
        <p style={{ fontSize: "clamp(0.7rem, 1.2vw, 0.85rem)", color: "#888", lineHeight: "1.9", marginBottom: "0.8rem" }}>
          Hi, I'm Ujani. I spend most of my days somewhere between code, design, books, and far too many half-finished ideas. As a Computer Science student, I love building things that are both functional and meaningful. I'm endlessly curious, always learning, and happiest when creating something that leaves a lasting impression.
        </p>
        <p style={{ fontSize: "clamp(0.7rem, 1.2vw, 0.85rem)", color: "#555", lineHeight: "1.9" }}>
          In my free time, I'm nerdy about tech gadgets, love literary fiction, and play way too many battle royale games. Oh, I make content too.
        </p>
      </div>

      {/* currently building with — bottom left */}
      <div style={{
        position: "absolute",
        bottom: "4vh",
        left: "15vw",
        zIndex: 5,
      }}>
        <h2 style={{
          fontFamily: "'Anton', sans-serif",
          fontSize: "clamp(2rem, 5vw, 4rem)",
          color: "#e8e0d5",
          lineHeight: 1,
          marginBottom: "1rem",
          letterSpacing: "0.02em",
        }}>
          currently<br />building with
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.2rem 3rem" }}>
          {["Python", "Node.js", "Typescript", "C++", "React.js", "Next.js", "Java", "Go", "Javascript ES6+"].map((s, i) => (
            <p key={i} style={{ fontSize: "clamp(0.65rem, 1vw, 0.8rem)", color: "#666", lineHeight: 2 }}>• {s}</p>
          ))}
        </div>
      </div>

      {/* Group 2 — text silhouette, center */}
      <div style={{
        position: "absolute",
        bottom: "0",
        left: "50%",
        transform: "translateX(-30%)",
        zIndex: 2,
        opacity: 0.35,
        height: "65vh",
      }}>
        <img src="/images/Group 2.png" alt="" style={{ height: "100%", width: "auto", objectFit: "contain" }} />
      </div>

    </div>
  );
}