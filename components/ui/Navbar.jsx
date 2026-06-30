"use client";

import { useState, useEffect, useRef } from "react";

const sections = ["Hero", "Experience", "Projects", "Connect"];

export default function Navbar({ current, onNavigate }) {
  const isHero = current === 0;
  const [collapsed, setCollapsed] = useState(!isHero);
  const timeoutRef = useRef(null);

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    setCollapsed(!isHero);
  }, [current, isHero]);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setCollapsed(false);
  };

  const handleMouseLeave = () => {
    if (!isHero) {
      timeoutRef.current = setTimeout(() => setCollapsed(true), 500);
    }
  };

  const borderThickness = 9;
  const squareSize = 7;

  // Pure CSS checkerboard — two diagonal gradients offset to form alternating squares
  const checkerPattern = {
    backgroundImage: `
      linear-gradient(45deg, #555 25%, transparent 25%, transparent 75%, #555 75%, #555),
      linear-gradient(45deg, #555 25%, #d8d8d8 25%, #d8d8d8 75%, #555 75%, #555)
    `,
    backgroundSize: `${squareSize * 2}px ${squareSize * 2}px`,
    backgroundPosition: `0 0, ${squareSize}px ${squareSize}px`,
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "2.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 200,
        display: "flex",
        justifyContent: "center",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Checkered border wrapper */}
      <div
        style={{
          borderRadius: "999px",
          padding: `${borderThickness}px`,
          ...checkerPattern,
          boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
          overflow: "hidden",
          transition: "all 0.6s cubic-bezier(0.7, 0, 0.3, 1)",
        }}
      >
        {/* Inner solid pill */}
        <div
          style={{
            background: "#000000",
            borderRadius: "999px",
            width: collapsed ? "16px" : "580px",
            height: collapsed ? "16px" : "58px",
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "space-between",
            padding: collapsed ? 0 : "0.4rem 0.5rem 0.4rem 1.4rem",
            overflow: "hidden",
            cursor: "pointer",
            transition: "all 0.6s cubic-bezier(0.7, 0, 0.3, 1)",
          }}
        >
          <span
            style={{
              fontFamily: "inherit",
              fontWeight: 800,
              fontSize: "1rem",
              color: "#f5f1ea",
              whiteSpace: "nowrap",
              opacity: collapsed ? 0 : 1,
              transition: "opacity 0.3s ease",
              flexShrink: 0,
            }}
          >
            Ujani De
          </span>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              opacity: collapsed ? 0 : 1,
              transition: "opacity 0.3s ease",
            }}
          >
            {sections.map((label, i) => (
              <button
                key={i}
                onClick={() => onNavigate(i)}
                style={{
                  background: current === i ? "rgba(245,241,234,0.14)" : "transparent",
                  border: "none",
                  borderRadius: "999px",
                  padding: "0.55rem 1rem",
                  fontFamily: "inherit",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  color: current === i ? "#f5f1ea" : "#9a9a9a",
                  cursor: "pointer",
                  transition: "background 0.2s, color 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(245,241,234,0.14)")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    current === i ? "rgba(245,241,234,0.14)" : "transparent")
                }
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}