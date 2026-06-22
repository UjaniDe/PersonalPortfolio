"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function HeroReveal() {
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { y: "80vh" },
      { y: "0vh", duration: 2.2, ease: "power2.out", delay: 0.2 }
    );
  }, []);

  return (
    <section style={{ paddingTop: "22vh", paddingBottom: "2rem", display: "flex", justifyContent: "center" }}>
      <div ref={cardRef} style={{
        background: "#7a1212",
        width: "min(620px, 78vw)",
        borderRadius: "12px",
        padding: "2.5rem 2.5rem",
        boxShadow: "0 30px 80px rgba(0,0,0,0.8)",
        border: "1px solid #9a2222",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginBottom: "1.5rem" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", overflow: "hidden", border: "2px solid #9a2222", flexShrink: 0 }}>
            <img src="/images/placeholder.jpg" alt="Ujani" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "#f0e8e0", fontStyle: "italic" }}>Ujani De</p>
            <p style={{ fontSize: "0.65rem", color: "#c4a0a0", marginTop: "0.3rem", letterSpacing: "0.06em" }}>CS @ VIT · NIC MeitY intern</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          <div>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "#c4a0a0", marginBottom: "0.8rem" }}>ABOUT ME</p>
            <p style={{ color: "#e8d0d0", fontSize: "0.8rem", lineHeight: "1.9" }}>
              I spend most of my days somewhere between code, design, books, and far too many half-finished ideas.
              CS student at VIT, currently building at NIC MeitY.
            </p>
          </div>
          <div>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "#c4a0a0", marginBottom: "0.8rem" }}>MORE</p>
            <p style={{ color: "#8a5555", fontSize: "0.8rem", lineHeight: "1.9" }}>
              Flutter, Node, Postgres — and occasionally wondering why my code works.
              I used to draw. Now I just contemplate opening Figma.
            </p>
            <p style={{ marginTop: "1rem", fontSize: "0.6rem", color: "#5a2222", letterSpacing: "0.1em" }}>Durgapur → Vellore</p>
          </div>
        </div>
      </div>
    </section>
  );
}