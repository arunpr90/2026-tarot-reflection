import React from "react";
import { GeneratedReading } from "../types";

type ResultsProps = {
  reading: GeneratedReading;
  onRestart: () => void;
};

export default function Results({ reading, onRestart }: ResultsProps) {
  return (
    <div>
      <h2>Your 2026 Reading ✨</h2>

      <div style={{ marginTop: "24px" }}>
        {reading.cards.map((card, idx) => (
          <div key={idx} style={{ marginBottom: "16px" }}>
            <strong>{card.name}</strong>{" "}
            <em>({card.isReversed ? "Reversed" : "Upright"})</em>
            <div style={{ opacity: 0.85 }}>
              {card.keywords.join(", ")}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onRestart}
        style={{ marginTop: "32px" }}
      >
        Start Over
      </button>
    </div>
  );
}
