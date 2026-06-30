"use client";

import { useEffect, useState, useRef } from "react";

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

function LiveClock() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }));
      setDate(now.toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short", year: "numeric" }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return { time, date };
}

// ── GitHub Contributions Graph ──
const GITHUB_USERNAME = "UjaniDe";

function GithubContributions() {
  const [weeks, setWeeks] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`)
      .then((res) => res.json())
      .then((data) => {
        const contributions = data.contributions || [];
        setTotal(contributions.reduce((sum, d) => sum + d.count, 0));

        // Group days into weeks (columns), starting from the first Sunday
        const grouped = [];
        let currentWeek = [];
        contributions.forEach((day, i) => {
          const date = new Date(day.date);
          if (date.getDay() === 0 && currentWeek.length > 0) {
            grouped.push(currentWeek);
            currentWeek = [];
          }
          currentWeek.push(day);
        });
        if (currentWeek.length) grouped.push(currentWeek);
        setWeeks(grouped);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const cellSize = 11;
  const cellGap = 3;
  const colors = ["#1c1c1a", "#3a4d2e", "#5a7a3f", "#8fc24a", "#c5d94e"];

  const monthLabels = [];
  let lastMonth = null;
  weeks.forEach((week, wi) => {
    const firstDay = week[0];
    if (!firstDay) return;
    const month = new Date(firstDay.date).getMonth();
    if (month !== lastMonth) {
      monthLabels.push({ index: wi, label: new Date(firstDay.date).toLocaleString("en-US", { month: "short" }) });
      lastMonth = month;
    }
  });

  if (loading) {
    return (
      <p style={{ fontFamily: "sans-serif", fontSize: "0.75rem", color: "#444" }}>
        Loading GitHub contributions…
      </p>
    );
  }

  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <p
        style={{
          fontFamily: "sans-serif",
          fontSize: "0.78rem",
          color: "#777",
          marginBottom: "0.8rem",
          letterSpacing: "0.05em",
        }}
      >
        GitHub Contributions
      </p>

      <div style={{ overflowX: "auto" }}>
        <svg
          width={weeks.length * (cellSize + cellGap)}
          height={(cellSize + cellGap) * 7 + 16}
        >
          {/* Month labels */}
          {monthLabels.map((m, i) => (
            <text
              key={i}
              x={m.index * (cellSize + cellGap)}
              y={10}
              fontSize="10"
              fill="#666"
              fontFamily="sans-serif"
            >
              {m.label}
            </text>
          ))}

          {/* Day cells */}
          {weeks.map((week, wi) =>
            week.map((day, di) => {
              const level = Math.min(day.count > 0 ? Math.ceil(day.count / 3) : 0, 4);
              return (
                <rect
                  key={`${wi}-${di}`}
                  x={wi * (cellSize + cellGap)}
                  y={di * (cellSize + cellGap) + 16}
                  width={cellSize}
                  height={cellSize}
                  rx={3}
                  fill={colors[level]}
                />
              );
            })
          )}
        </svg>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.6rem" }}>
        <p style={{ fontFamily: "sans-serif", fontSize: "0.7rem", color: "#555" }}>
          {total.toLocaleString()} contributions in the last year on{" "}
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#a09890", textDecoration: "underline" }}
          >
            GitHub
          </a>
          .
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
          <span style={{ fontFamily: "sans-serif", fontSize: "0.65rem", color: "#555" }}>Less</span>
          {colors.map((c, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: 2, background: c }} />
          ))}
          <span style={{ fontFamily: "sans-serif", fontSize: "0.65rem", color: "#555" }}>More</span>
        </div>
      </div>
    </div>
  );
}

const links = [
  { label: "Email", href: "mailto:ujani.de2024@vitstudent.ac.in" },
  { label: "LinkedIn", href: "https://linkedin.com/in/ujani-de-b557a1351" },
  { label: "GitHub", href: "https://github.com/UjaniDe" },
];

export default function Connect({ isActive }) {
  const [triggered, setTriggered] = useState(false);
  const { time, date } = LiveClock();

  useEffect(() => {
    if (isActive) setTimeout(() => setTriggered(true), 200);
    else setTriggered(false);
  }, [isActive]);

  return (
    <div style={{ width: "100%", height: "100%", background: "#1a1a18", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "4rem 4vw 3rem" }}>

      {/* top — links list like Oscar Tao */}
      <div>
        {links.map((link, i) => (
          <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" style={{ display: "block", fontFamily: "'Anton', sans-serif", fontSize: "clamp(2.5rem, 6vw, 5.5rem)", color: "#e8e0d5", textDecoration: "none", lineHeight: 1.15, letterSpacing: "-0.01em", transition: "color 0.2s, opacity 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.color = "#c4a0a0"; }} onMouseLeave={(e) => { e.currentTarget.style.color = "#e8e0d5"; }}>
            {link.label}
          </a>
        ))}
      </div>

      {/* GitHub contributions graph */}
      <GithubContributions />

      {/* bottom — footer like image 3 */}
      <div>
        {/* top border */}
        <div style={{ height: "1px", background: "#2a2a2a", marginBottom: "2rem" }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
          {/* left — built by + uptime */}
          <div>
            <p style={{ fontFamily: "sans-serif", fontSize: "0.75rem", color: "#555", marginBottom: "1rem" }}>
              Built by{" "}
              <span style={{ color: "#c4a0a0" }}>Ujani De</span>.
            </p>
            <p style={{ fontFamily: "sans-serif", fontSize: "0.65rem", color: "#333", letterSpacing: "0.05em" }}>
              VIT Vellore · NIC MeitY · Durgapur
            </p>
          </div>

          {/* center — date + time */}
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "sans-serif", fontSize: "0.7rem", color: "#444", letterSpacing: "0.1em" }}>
              {date} &nbsp;|&nbsp; {time} IST
            </p>
          </div>

          {/* right — big clock + location like Oscar */}
          <div style={{ textAlign: "right" }}>
            <p style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(2rem, 5vw, 4rem)", color: "#222", lineHeight: 1, letterSpacing: "-0.02em" }}>
              {time}
            </p>
            <p style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(2rem, 5vw, 4rem)", color: "#2a2a2a", lineHeight: 1, letterSpacing: "-0.02em" }}>
              Vellore, India
            </p>
          </div>
        </div>

        {/* copyright */}
        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontFamily: "sans-serif", fontSize: "0.6rem", color: "#2a2a2a", letterSpacing: "0.1em" }}>
            2026, Ujani De. All rights reserved.
          </p>
          <a href="https://github.com/UjaniDe/PersonalPortfolio" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "sans-serif", fontSize: "0.6rem", color: "#333", letterSpacing: "0.1em", textDecoration: "none" }}>
            github · source
          </a>
        </div>
      </div>
    </div>
  );
}