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
    category: "Reiterate",
    title: "Reiterate",
    tech: "React · Node.js · MongoDB · Gemini API",
    desc: "An AI experimentation platform that evaluates Large Language Model responses by generating multiple prompt variations and comparing outputs. The platform analyzes response quality, sentiment, and consistency, enabling structured benchmarking of generative AI models.",
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
    category: "Student Portal",
    title: "Student Declaration Portal",
    tech: "Flutter · Node.js · PostgreSQL · JWT · REST APIs",
    desc: "Government-backed student verification platform developed during my internship at NIC. Built secure backend APIs for authentication, OTP workflows, and beneficiary verification.",
    link: "https://github.com/UjaniDe/taruner-swapno-backend",
    images: ["/images/project1.jpg", "/images/project2.jpeg", "/images/project1.jpg"],
    isVideo: [false, false, false]
  },
  {
    number: "03",
    category: "Sahasini",
    title: "Sahasini",
    tech: "React · FastAPI · PostgreSQL · Leaflet · Python",
    desc: "Crowdsourced women's safety platform featuring interactive safety maps, incident reporting, and geospatial visualization for safer urban navigation.",
    link: "#",
    images: [
      "/images/sahasani.mov"
    ],
    isVideo: [true]
  },
  {
    number: "04",
    category: "Collision Alert",
    title: "IoT-Based Blind-Turn Collision Detection and Alert System",
    tech: "ESP32 · Arduino · Arduino IoT Cloud · C++ · Ultrasonic · Laser · Touch Sensor",
    desc: "Embedded security system combining laser, touch and ultrasonic sensing with real-time cloud monitoring to detect physical intrusion events across multiple disturbance channels.",
    link: "#",
    images: ["/images/project4.png"],
    isVideo: [false]
  }
];

// Alternate off-white / black folder tabs
const TAB_COLORS = ["#f0ead9", "#1c1c1a", "#f0ead9", "#1c1c1a"];

// Subtle cardboard/paper grain — layered noise via repeating gradients
const paperTexture = {
  backgroundImage: `
    repeating-linear-gradient(0deg, rgba(0,0,0,0.035) 0px, rgba(0,0,0,0.035) 1px, transparent 1px, transparent 3px),
    repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 3px)
  `,
  backgroundBlendMode: "overlay",
};

function ProjectCard({ project, tabColor, tabOffset, tabOpacity }) {
  const tabTextColor = tabColor === "#1c1c1a" ? "#f0ead9" : "#1c1c1a";

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* ── Folder tab ── */}
      <motion.div
        style={{
          position: "absolute",
          top: "-30px",
          left: `${40 + tabOffset}px`,
          width: "180px",
          height: "44px",
          background: tabColor,
          border: `2px solid ${tabColor}`,
          borderBottom: "none",
          borderRadius: "14px 14px 0 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 0,
          opacity: tabOpacity,
          ...paperTexture,
        }}
      >
        <span
          style={{
            fontFamily: "monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            color: tabTextColor,
            textTransform: "uppercase",
            fontWeight: 800,
          }}
        >
          {project.category}
        </span>
      </motion.div>

      {/* ── Card body ── */}
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "2rem 2.5rem",
          background: "#111110",
          border: `2px solid ${tabColor}`,
          borderRadius: "32px",
          boxSizing: "border-box",
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: "2rem",
          position: "relative",
          zIndex: 1,
          ...paperTexture,
        }}
      >
        {/* ── LEFT: text ── */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: "5rem" }}>
          <div>
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
                  fontWeight: 900,
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
                fontSize: "clamp(0.9rem, 1.1vw, 0.95rem)",
                color: "#a09890",
                lineHeight: 1.75,
                marginBottom: "1.5rem",
                margin: 0,
                fontWeight: 600,
              }}
            >
              {project.desc}
            </p>
          </div>

          <div>
            {/* Tech stack as bullets */}
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                marginBottom: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.35rem",
              }}
            >
              {project.tech.split(" · ").map((t) => (
                <li
                  key={t}
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: "0.9rem",
                    letterSpacing: "0.08em",
                    color: "#fffdfd",
                    textTransform: "uppercase",
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span style={{ color: tabColor === "#1c1c1a" ? "#f0ead9" : tabColor }}>●</span>
                  {t}
                </li>
              ))}
            </ul>

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
                fontWeight: 800,
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

  const tabOpacity = useTransform(overlayOpacity, (v) => 1 - v);

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
      <ProjectCard
        project={project}
        tabColor={TAB_COLORS[index % TAB_COLORS.length]}
        tabOffset={index * 60}
        tabOpacity={tabOpacity}
      />
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
            padding: "8.5rem 4vw 1.2rem",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              borderRadius: "32px",
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