"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const projects = [
  { title: "Reiterate", tech: "React · Node.js · MongoDB", desc: "Bias analysis platform for LLMs. 100+ prompt variants per experiment, sentiment scoring, side-by-side output visualization.", media: "/images/reiterate.mov", isVideo: true, link: "#" },
  { title: "Taruner Swapno", tech: "Flutter · Node.js · PostgreSQL", desc: "Government student verification platform built at NIC, MeitY. JWT auth, OTP verification, REST APIs, cloud deployment.", media: "/images/project1.jpg", isVideo: false, link: "https://github.com/UjaniDe/taruner-swapno-backend" },
  { title: "Sahasini", tech: "React · FastAPI · PostgreSQL", desc: "Crowdsourced urban safety incident reporting. Geospatial heatmaps, WebSockets, AI-driven insights. Won VinHack 2025 from 200+ teams.", media: "/images/project2.jpg", isVideo: false, link: "#" },
];

export default function Projects() {
  const cardRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: cardRef.current, start: "top 92%" }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const prev = () => setActive((a) => (a - 1 + projects.length) % projects.length);
  const next = () => setActive((a) => (a + 1) % projects.length);

  return (
    <section style={{ paddingBottom: "2rem", display: "flex", justifyContent: "center" }}>
      <div ref={cardRef} style={{
        background: "#7a1212",
        width: "min(620px, 78vw)",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 30px 80px rgba(0,0,0,0.8)",
        border: "1px solid #9a2222",
      }}>
        {/* software heading */}
        <div style={{ padding: "1.8rem 2rem 0.5rem", borderBottom: "1px solid #5a1515" }}>
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "#c4a0a0", marginBottom: "0.4rem" }}>03 / PROJECTS</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400, color: "#f0e8e0", lineHeight: 1 }}>
            / <em>software</em>
          </h2>
        </div>

        {/* image carousel */}
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "#3a0808" }}>
{projects[active].isVideo
  ? <video src={projects[active].media} autoPlay muted loop playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
  : <img src={projects[active].media} alt={projects[active].title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
}

          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "65%", background: "linear-gradient(to top, rgba(20,0,0,0.97) 0%, transparent 100%)" }} />

          <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", right: "1.5rem" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 4vw, 2.2rem)", color: "#f0e8e0", fontWeight: 400, marginBottom: "0.5rem" }}>{projects[active].title}</h3>
            <p style={{ fontSize: "0.72rem", color: "#c4a0a0", lineHeight: "1.7" }}>{projects[active].desc}</p>
            <p style={{ fontSize: "0.6rem", color: "#e8b4b4", marginTop: "0.5rem", letterSpacing: "0.1em" }}>{projects[active].tech}</p>
          </div>

          <button onClick={prev} style={{ position: "absolute", left: "1rem", top: "40%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.5)", border: "1px solid #5a1515", color: "#f0e8e0", width: "40px", height: "40px", borderRadius: "50%", cursor: "pointer", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>{"<"}</button>
          <button onClick={next} style={{ position: "absolute", right: "1rem", top: "40%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.5)", border: "1px solid #5a1515", color: "#f0e8e0", width: "40px", height: "40px", borderRadius: "50%", cursor: "pointer", fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>{">"}</button>
        </div>

        <div style={{ padding: "1.2rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {projects.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} style={{ width: i === active ? "24px" : "8px", height: "4px", borderRadius: "2px", background: i === active ? "#f0e8e0" : "#5a1515", border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0 }} />
            ))}
          </div>
          <a href={projects[active].link} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "#c4a0a0", textDecoration: "none", borderBottom: "1px solid #5a1515", paddingBottom: "2px" }}>VIEW PROJECT</a>
        </div>
      </div>
    </section>
  );
}