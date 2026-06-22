"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const experiences = [
  {
    role: "Software Development Intern",
    org: "National Informatics Centre, MeitY",
    period: "May 2026 – Present",
    points: ["Flutter app for government student verification", "REST APIs with Node.js, Express, PostgreSQL", "JWT auth + OTP verification", "Deployed on Railway/Render with Neon PostgreSQL"],
  },
  {
    role: "Senior Core Member",
    org: "Robovitics Club, VIT Vellore",
    period: "May 2025 – Present",
    points: ["Led ROBOWARS at GraVITas tech fest", "Managed 40+ bots, 12L+ budget", "300+ participants across workshops", "Recruited 50+ junior members"],
  },
];

export default function Experience() {
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const itemsRef = useRef([]);

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
      itemsRef.current.forEach((el, i) => {
        gsap.fromTo(el,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, delay: i * 0.15, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%" }
          }
        );
      });
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
        <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "#c4a0a0", marginBottom: "0.6rem" }}>02 / EXPERIENCE</p>
        <h2 ref={titleRef} style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400, lineHeight: 1, color: "#f0e8e0", marginBottom: "2rem" }}>
          where <em>i've been</em>
        </h2>

        {experiences.map((exp, i) => (
          <div key={i} ref={(el) => (itemsRef.current[i] = el)} style={{ padding: "1.5rem 0", borderTop: "1px solid #5a1515", display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "2rem" }}>
            <div>
              <p style={{ color: "#f0e8e0", fontSize: "0.85rem", marginBottom: "0.3rem", lineHeight: 1.4 }}>{exp.role}</p>
              <p style={{ color: "#e8b4b4", fontSize: "0.65rem", marginBottom: "0.2rem" }}>{exp.org}</p>
              <p style={{ color: "#5a2222", fontSize: "0.6rem", fontFamily: "monospace" }}>{exp.period}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {exp.points.map((pt, j) => (
                <p key={j} style={{ color: "#c4a0a0", fontSize: "0.75rem", lineHeight: "1.8", paddingLeft: "0.8rem", borderLeft: "1px solid #5a1515" }}>{pt}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}