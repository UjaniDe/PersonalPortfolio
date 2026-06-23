"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Connect from "@/components/sections/Connect";

const sections = [Hero, Experience, Projects, Connect];
export default function Home() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const sectionRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleWheel = (e) => {
      if (animating) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      const next = current + dir;
      if (next < 0 || next >= sections.length) return;

      setAnimating(true);

      // slide current section out
      gsap.to(sectionRefs.current[current], {
        y: dir > 0 ? "-100vh" : "100vh",
        opacity: 0,
        duration: 0.8,
        ease: "power3.inOut",
      });

      // slide next section in
      gsap.fromTo(
        sectionRefs.current[next],
        { y: dir > 0 ? "100vh" : "-100vh", opacity: 0 },
        {
          y: "0vh",
          opacity: 1,
          duration: 0.8,
          ease: "power3.inOut",
          onComplete: () => {
            setCurrent(next);
            setAnimating(false);
          },
        }
      );
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [current, animating]);

  // init positions
  useEffect(() => {
    sectionRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        y: i === 0 ? "0vh" : "100vh",
        opacity: i === 0 ? 1 : 0,
      });
    });
  }, []);

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", background: "#1a1a18" }}>
      {sections.map((Section, i) => (
        <div
          key={i}
          ref={(el) => (sectionRefs.current[i] = el)}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "hidden" }}
        >
          <Section isActive={current === i} />
        </div>
      ))}

      {/* dot nav */}
      <div style={{ position: "fixed", right: "2rem", top: "50%", transform: "translateY(-50%)", zIndex: 100, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {sections.map((_, i) => (
          <div key={i} style={{ width: "6px", height: i === current ? "20px" : "6px", borderRadius: "3px", background: i === current ? "#e8e0d5" : "#444", transition: "all 0.3s" }} />
        ))}
      </div>
    </div>
  );
}