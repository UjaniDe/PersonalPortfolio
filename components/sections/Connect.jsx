"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const links = [
  { label: "EMAIL", value: "ujani.de2024@vitstudent.ac.in", href: "mailto:ujani.de2024@vitstudent.ac.in" },
  { label: "LINKEDIN", value: "linkedin.com/in/ujani-de-b557a1351", href: "https://linkedin.com/in/ujani-de-b557a1351" },
  { label: "GITHUB", value: "github.com/UjaniDe", href: "https://github.com/UjaniDe" },
];

function LinkRow({ label, value, href }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", alignItems: "center", padding: "1rem 0", borderBottom: "1px solid #5a1515" }}>
      <p style={{ fontSize: "0.5rem", letterSpacing: "0.2em", color: "#e8b4b4" }}>{label}</p>
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.75rem", color: "#c4a0a0", textDecoration: "none", transition: "color 0.3s" }} onMouseEnter={(e) => (e.target.style.color = "#f0e8e0")} onMouseLeave={(e) => (e.target.style.color = "#c4a0a0")}>{value}</a>
    </div>
  );
}

export default function Connect() {
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

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
      gsap.fromTo(contentRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: contentRef.current, start: "top 88%" }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section style={{ paddingBottom: "6rem", display: "flex", justifyContent: "center" }}>
      <div ref={cardRef} style={{
        background: "#7a1212",
        width: "min(620px, 78vw)",
        borderRadius: "12px",
        padding: "2.5rem 2.5rem",
        boxShadow: "0 30px 80px rgba(0,0,0,0.8)",
        border: "1px solid #9a2222",
      }}>
        <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "#c4a0a0", marginBottom: "0.6rem" }}>05 / CONNECT</p>
        <h2 ref={titleRef} style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400, lineHeight: 1, color: "#f0e8e0", marginBottom: "1rem" }}>
          let's <em>talk.</em>
        </h2>
        <p style={{ color: "#8a5555", fontSize: "0.78rem", lineHeight: 2, marginBottom: "1.5rem" }}>
          Whether it is a project, a question, or just a good conversation. I am around.
        </p>
        <div ref={contentRef}>
          {links.map((l) => <LinkRow key={l.label} label={l.label} value={l.value} href={l.href} />)}
        </div>
        <p style={{ marginTop: "2.5rem", color: "#3a1010", fontSize: "0.5rem", letterSpacing: "0.15em" }}>2026 — UJANI DE</p>
      </div>
    </section>
  );
}