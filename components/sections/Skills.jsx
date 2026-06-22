"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const skillGroups = [
  { label: "Frontend", items: ["React", "Next.js", "Flutter", "Tailwind", "HTML / CSS"] },
  { label: "Backend", items: ["Node.js", "Express.js", "FastAPI", "REST APIs", "WebSockets"] },
  { label: "Data + DB", items: ["PostgreSQL", "MongoDB", "MySQL", "SQLite"] },
  { label: "Tools", items: ["Git", "Docker", "Postman", "Railway", "Figma*"] },
];

export default function Skills() {
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const funRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: cardRef.current, start: "top 92%" }
        }
      );
      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 85%" }
        }
      );
      gsap.fromTo(funRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: funRef.current, start: "top 88%" }
        }
      );
      gsap.fromTo(gridRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 88%" }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section style={{ paddingBottom: "2rem", display: "flex", justifyContent: "center" }}>
      <div ref={cardRef} style={{
        background: "#7a1212",
        width: "min(620px, 78vw)",
        borderRadius: "12px",
        padding: "2.5rem 2.5rem",
        boxShadow: "0 30px 80px rgba(0,0,0,0.8)",
        border: "1px solid #9a2222",
      }}>
        <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "#c4a0a0", marginBottom: "0.6rem" }}>04 / WHO I AM</p>
        <h2 ref={titleRef} style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400, lineHeight: 1, color: "#f0e8e0", marginBottom: "2rem" }}>
          skills &amp; <em>other things</em>
        </h2>

        <div ref={funRef} style={{ marginBottom: "2rem", paddingBottom: "1.5rem", borderBottom: "1px solid #5a1515", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          <div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", color: "#f0e8e0", lineHeight: 2, fontStyle: "italic" }}>If you believe in astrology — I am a Virgo.</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", color: "#e8b4b4", lineHeight: 2, fontStyle: "italic" }}>If you believe in MBTI — I am an INTJ.</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", color: "#8a5555", lineHeight: 2, fontStyle: "italic" }}>If you believe in neither — relax a bit.</p>
          </div>
          <div>
            <p style={{ color: "#8a5555", fontSize: "0.78rem", lineHeight: "1.9" }}>
              I used to draw. Now I just contemplate opening Figma.<br />
              I build things — not in a "I can ship anything" way.<br />
              More of a "why does this work" way.
            </p>
            <p style={{ marginTop: "0.5rem", color: "#3a1010", fontSize: "0.6rem" }}>* Figma opens. Stares. Closes.</p>
          </div>
        </div>

        <div ref={gridRef} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
          {skillGroups.map((group, i) => (
            <div key={i}>
              <p style={{ fontSize: "0.5rem", letterSpacing: "0.2em", color: "#e8b4b4", marginBottom: "0.8rem" }}>{group.label.toUpperCase()}</p>
              {group.items.map((item, j) => (
                <p key={j} style={{ color: "#c4a0a0", fontSize: "0.72rem", lineHeight: 1.5, borderBottom: "1px solid #5a1515", paddingBottom: "0.5rem", marginBottom: "0.5rem" }}>{item}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}