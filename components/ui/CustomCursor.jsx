"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [hidden, setHidden] = useState(true);
  const [inverted, setInverted] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      if (hidden) setHidden(false);
    };

    const checkHover = (e) => {
      const target = e.target;
      const isLightBg = target.closest("[data-light-bg]");
      setInverted(!!isLightBg);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", checkHover);
    window.addEventListener("mouseleave", () => setHidden(true));

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", checkHover);
    };
  }, [hidden]);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "30px",
        height: "30px",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: hidden ? 0 : 1,
        transition: "opacity 0.15s ease",
        transform: "translate(-2px, -2px)",
        mixBlendMode: "difference",
      }}
    >
<svg width="30" height="30" viewBox="0 0 18 18" fill="none">
  <path
    d="M1 1 L1 13 L4.5 9.8 L13 9.8 Z"
    fill="#ffffff"
  />
</svg>
    </div>
  );
}