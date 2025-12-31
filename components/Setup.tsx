import React from "react";
import { FOCUS_AREAS } from "../constants";
import { FocusArea, ReadingType } from "../types";

type SetupProps = {
  onSubmit: (focus: FocusArea, type: ReadingType) => void;
};

export default function Setup({ onSubmit }: SetupProps) {
  const [focus, setFocus] = React.useState<FocusArea>(FOCUS_AREAS[0]);
  const [type, setType] = React.useState<ReadingType>("single");

  return (
    <div>
      <h2>Choose your focus</h2>

      <select
        value={focus}
        onChange={(e) => setFocus(e.target.value as FocusArea)}
      >
        {FOCUS_AREAS.map((area) => (
          <option key={area} value={area}>
            {area}
          </option>
        ))}
      </select>

      <h3 style={{ marginTop: "24px" }}>Reading type</h3>

      <select
        value={type}
        onChange={(e) => setType(e.target.value as ReadingType)}
      >
        <option value="single">Single Card</option>
        <option value="three">Three Cards</option>
      </select>

      <button
        style={{ marginTop: "24px" }}
        onClick={() => onSubmit(focus, type)}
      >
        Get Reading
      </button>
    </div>
  );
}
