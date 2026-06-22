"use client";

export default function FilmBackground() {
  const holes = Array.from({ length: 40 });

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "min(560px, 88vw)",
      height: "100vh",
      zIndex: 0,
      display: "flex",
      flexDirection: "row",
      overflow: "hidden",
    }}>
      {/* left sprocket strip */}
      <div style={{
        width: "36px",
        flexShrink: 0,
        background: "#111",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "12px",
        gap: "10px",
        borderRight: "1px solid #1e1e1e",
      }}>
        {holes.map((_, i) => (
          <div key={i} style={{
            width: "18px",
            height: "14px",
            borderRadius: "3px",
            background: "#0d0d0d",
            border: "1px solid #2a2a2a",
            flexShrink: 0,
          }} />
        ))}
      </div>

      {/* center dark red film area */}
      <div style={{
        flex: 1,
        background: "linear-gradient(180deg, #0d0d0d 0%, #120808 40%, #0d0d0d 100%)",
        borderLeft: "1px solid #1a0808",
        borderRight: "1px solid #1a0808",
      }} />

      {/* right sprocket strip */}
      <div style={{
        width: "36px",
        flexShrink: 0,
        background: "#111",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "12px",
        gap: "10px",
        borderLeft: "1px solid #1e1e1e",
      }}>
        {holes.map((_, i) => (
          <div key={i} style={{
            width: "18px",
            height: "14px",
            borderRadius: "3px",
            background: "#0d0d0d",
            border: "1px solid #2a2a2a",
            flexShrink: 0,
          }} />
        ))}
      </div>
    </div>
  );
}