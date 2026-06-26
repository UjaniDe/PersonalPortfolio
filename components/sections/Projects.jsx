"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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

  {
  number: "01",
  category: "PERSONAL",
  title: "Reiterate",
  tech: "React · Node.js · MongoDB · Gemini API",
  desc: "...",
  link: "#",
  images: [
    "/images/reiterate.mov",
    "/images/project1.jpg",
    "/images/project1.jpg"
  ],
  isVideo: [true, false, false]
},
  {
    number: "02",
    category: "GOVERNMENT · NIC INTERNSHIP",
    title: "Taruner Swapno",
    tech: "Flutter · Node.js · PostgreSQL · JWT · REST APIs",
    desc: "Government-backed student verification platform developed during my internship at NIC. Built secure backend APIs for authentication, OTP workflows, and beneficiary verification.",
    link: "https://github.com/UjaniDe/taruner-swapno-backend",
    images: ["/images/project1.jpg", "/images/project2.jpeg", "/images/project1.jpg"],
    isVideo: [false, false, false]
  },

  {
    number: "03",
    category: "HACKATHON · VINHACK 2025",
    title: "Sahasini",
    tech: "React · FastAPI · PostgreSQL · Leaflet · Python",
    desc: "Crowdsourced women's safety platform featuring interactive safety maps, incident reporting, and geospatial visualization for safer urban navigation.",
    link: "#",
    images: ["/images/project3.jpg", "/images/project2.jpeg", "/images/project1.jpg"],
    isVideo: [false, false, false]
  },

  {
  number: "04",
  category: "HARDWARE · EMBEDDED SYSTEMS",
  title: "Sentinel",
  tech: "ESP32 · Arduino · Arduino IoT Cloud · C++ · Ultrasonic · Laser · Touch Sensor",
  desc: "Embedded security system combining laser, touch and ultrasonic sensing with real-time cloud monitoring to detect physical intrusion events across multiple disturbance channels.",
  link: "#",
  images: ["/images/sentinel.jpg"],
  isVideo: [false]
}
];

function ProjectCard({ project }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "2rem 2.5rem",
        background: "#111110",
       border: "2px solid rgba(255,255,255,0.9)",
        borderRadius: "32px",
        boxSizing: "border-box",
        display: "grid",
        gridTemplateColumns: "1fr 1.4fr",
        gap: "2rem",
      }}
    >
      {/* ── LEFT: text ── */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          {/* Category */}
          <p
            style={{
              fontFamily: "sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.22em",
              color: "#9f9b9b",
              textTransform: "uppercase",
              marginBottom: "0.6rem",
            }}
          >
            {project.category}
          </p>

          {/* Number + Title */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "1.2rem" }}>
            <span
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: "clamp(3rem, 6vw, 5rem)",
                color: "rgba(236, 236, 236, 0.1)",
                lineHeight: 1,
                userSelect: "none",
                flexShrink: 0,
              }}
            >
              {project.number}
            </span>
            <h3
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                color: "#e8e0d5",
                letterSpacing: "0.02em",
                lineHeight: 1,
                margin: 0,
              }}
            >
              {project.title}
            </h3>
          </div>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              background: "rgba(232,224,213,0.08)",
              marginBottom: "1.2rem",
            }}
          />

          {/* Description */}
          <p
            style={{
              fontFamily: "sans-serif",
              fontSize: "clamp(0.78rem, 1.1vw, 0.95rem)",
              color: "#a09890",
              lineHeight: 1.75,
              marginBottom: "1.5rem",
              margin: 0,
            }}
          >
            {project.desc}
          </p>
        </div>

        <div>
          {/* Tech pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.4rem",
              marginBottom: "1.5rem",
            }}
          >
            {project.tech.split(" · ").map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: "sans-serif",
                  fontSize: "0.58rem",
                  letterSpacing: "0.12em",
                  color: "#fffdfd",
                  border: "1px solid rgba(232,224,213,0.1)",
                  borderRadius: "999px",
                  padding: "0.25rem 0.7rem",
                  textTransform: "uppercase",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTA */}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(232,224,213,0.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            style={{
              alignSelf: "flex-start",
              display: "inline-block",
              border: "2px solid rgb(255, 239, 218)",
              borderRadius: "999px",
              padding: "0.5rem 1.4rem",
              fontFamily: "sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              color: "#e8e0d5",
              textDecoration: "none",
              textTransform: "uppercase",
              background: "transparent",
              transition: "background 0.2s",
            }}
          >
            LIVE PROJECT ↗
          </a>
        </div>
      </div>

      {/* ── RIGHT: single image / video ── */}
      <div
        style={{
          borderRadius: "20px",
          overflow: "hidden",
          background: "#1a1a18",
          height: "100%",
          
        }}
      >
        {project.isVideo[0] ? (
          <video
            src={project.images[0]}
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              pointerEvents: "none",
            }}
          />
        ) : (
          <img
            src={project.images[0]}
            alt={project.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        )}
      </div>
    </div>
  );
}

// Transitions happen fast: card 2 at [0–0.35], card 3 at [0.35–0.7]
// Leaving [0.7–1.0] as settled/rest at the end
const TRANSITION_SLOTS = [
  [0.00, 0.40],
  [0.40, 0.70],
  [0.70, 1.00],
];

function AnimatedCard({ project, index, total, scrollProgress }) {
  const N = total;

  const slot = index > 0 ? TRANSITION_SLOTS[index - 1] : null;

  const y = useTransform(
    scrollProgress,
    slot ? [slot[0], slot[1]] : [0, 1],
    slot ? ["100%", "0%"] : ["0%", "0%"]
  );

  // When the NEXT card comes in, this card scales down slightly
  const nextSlot = index < N - 1 ? TRANSITION_SLOTS[index] : null;

  const scale = useTransform(
    scrollProgress,
    nextSlot ? [nextSlot[0], nextSlot[1]] : [0, 1],
    nextSlot ? [1, 0.97] : [1, 1]
  );

  const overlayOpacity = useTransform(
    scrollProgress,
    nextSlot ? [nextSlot[0], nextSlot[1]] : [0, 1],
    nextSlot ? [0, 0.3] : [0, 0]
  );

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        y,
        scale,
        transformOrigin: "top center",
        zIndex: index + 1,
        willChange: "transform",
      }}
    >
      <ProjectCard project={project} />
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "32px",
          background: "#111110",
          opacity: overlayOpacity,
          pointerEvents: "none",
          zIndex: 10,
        }}
      />
    </motion.div>
  );
}

const HEADER_HEIGHT = "7rem";

export default function Projects({ isActive }) {
  const [triggered, setTriggered] = useState(false);
  const scrollRef = useRef(null);
  const N = projects.length;

  useEffect(() => {
    if (isActive) setTimeout(() => setTriggered(true), 200);
    else setTriggered(false);
  }, [isActive]);

  const { scrollYProgress } = useScroll({ container: scrollRef });

  return (
    <div
      ref={scrollRef}
      style={{
        width: "100%",
        height: "100%",
        background: "#1a1a18",
        overflowY: "auto",
        position: "relative",
      }}
    >
      {/* Sticky header */}
      <div
        style={{
          padding: "2rem 6vw 0.8rem",
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "#1a1a18",
          height: HEADER_HEIGHT,
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: "clamp(2.5rem, 8vw, 6rem)",
            fontWeight: 700,
            color: "#e8e0d5",
            lineHeight: 0.9,
            marginBottom: "0.2rem",
            letterSpacing: "-0.02em",
          }}
        >
          <ScrambleText text="PROJECTS" trigger={triggered} />
        </h2>
        <p
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: "clamp(1rem, 1.8vw, 1.4rem)",
            color: "#c4a0a0",
          }}
        >
          / software
        </p>
      </div>

      {/* Scroll canvas */}
      <div style={{ position: "relative", height: "400vh" }}>
        {/* Pinned stage */}
        <div
          style={{
            position: "sticky",
            top: HEADER_HEIGHT,
            height: `calc(98vh - ${HEADER_HEIGHT})`,
            padding: "7.0rem 4vw 1.2rem",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              borderRadius: "32px",
              overflow: "hidden",
            }}
          >
            {projects.map((project, i) => (
              <AnimatedCard
                key={i}
                project={project}
                index={i}
                total={N}
                scrollProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>

      <div style={{ height: "10vh" }} />
    </div>
  );
}