import React from "react";

type LandingProps = {
  onStart: () => void;
};

export default function Landing({ onStart }: LandingProps) {
  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>2026 Tarot Reflection 🔮</h1>
      <p style={{ marginTop: "16px", opacity: 0.85 }}>
        A gentle look into what 2026 may hold for you
      </p>

      <button
        onClick={onStart}
        style={{
          marginTop: "32px",
          padding: "12px 24px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          background: "#6366f1",
          color: "#fff",
        }}
      >
        Begin Reading
      </button>
    </div>
  );
}
