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
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (isActive) setTimeout(() => setTriggered(true), 200);
    else setTriggered(false);
  }, [isActive]);

  useEffect(() => {
    const updateScale = () => {
      setScale(Math.min(window.innerWidth / 1440, window.innerHeight / 900));
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", background: "#1a1a18", position: "relative", overflow: "hidden" }}>

      {/* scaling wrapper — keeps all absolute positions intact */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "1440px",
        height: "900px",
        transform: `translate(-50%, -50%) scale(${scale})`,
        transformOrigin: "center center",
      }}>

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
          
        </p>

        {/* Group 2 — the premade polaroid+stamp image, center-left */}
        <div style={{
          position: "absolute",
          top: "8vh",
          left: "20vw",
          zIndex: 4,
          width: "min(610px, 52vw)",
        }}>
          <img src="/images/Group2.png" alt="" style={{ width: "100%", height: "auto", objectFit: "contain" }} />
        </div>

        {/* About me — right side */}
        <div style={{
          position: "absolute",
          top: "21vh",
          right: "5vw",
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
          <p style={{
  fontFamily: "'Moonspace', sans-serif",
  fontSize: "clamp(0.72rem, 1vw, 0.9rem)",
  color: "#888",
  lineHeight: "2",
  letterSpacing: "0.06em",
  marginBottom: "1rem",
}}>
            Hi, I'm Ujani. I spend most of my days somewhere between code, design, books, and far too many half-finished ideas. As a Computer Science student, I love building things that are both functional and meaningful. I'm endlessly curious, always learning, and happiest when creating something that leaves a lasting impression.
          </p>
  <p style={{
  fontFamily: "'Moonspace', sans-serif",
  fontSize: "clamp(0.72rem, 1vw, 0.9rem)",
  color: "#888",
  lineHeight: "2",
  letterSpacing: "0.06em",
  marginBottom: "1rem",
}}>
            In my free time, I'm nerdy about tech gadgets, love literary fiction, and play way too many battle royale games. Oh, I make content too.
          </p>
        </div>

{/* currently building with — bottom left */}
<div style={{
  position: "absolute",
  bottom: "10vh",
  left: "19vw",
  zIndex: 5,
  maxWidth: "420px",
}}>
  <h2 style={{
    fontFamily: "'Anton', sans-serif",
    fontSize: "clamp(2rem, 5vw, 4rem)",
    color: "#e8e0d5",
    lineHeight: 1,
    marginBottom: "0.8rem",
    letterSpacing: "0.02em",
  }}>
    currently
     &
    <br />
    building with
  </h2>

  <p style={{
    fontFamily: "'Moonspace', sans-serif",
    color: "#666",
    fontSize: "clamp(0.72rem, 1vw, 0.9rem)",
    lineHeight: 2.2,
    letterSpacing: "0.08em",
  }}>
    Java • Python • TypeScript • JavaScript • C++ • SQL
    <br />
    React • Next.js • Node.js • Express • Flutter
    <br />
    PostgreSQL • Git • GitHub • Figma • Railway • Neon • Postman
  </p>
</div>

        {/* Group2 — text silhouette, center */}
        

      </div>
      {/* end scaling wrapper */}

    </div>
  );
}