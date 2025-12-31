return (
  <div className="page">
    <div className="shell">
      <div className="card">
        <div className="hero">
          <h1 className="h1">How will my 2026 be?</h1>
          <p className="p">
            Pick a focus area and a reading type. You’ll get a simple, reflective tarot-style reading (for fun + clarity).
          </p>
        </div>

        <div className="formRow">
          <div>
            <div className="label">Choose your focus</div>
            <select className="select" value={focus} onChange={(e) => setFocus(e.target.value as any)}>
              {FOCUS_AREAS.map((f) => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="label">Reading type</div>
            <select className="select" value={readingType} onChange={(e) => setReadingType(e.target.value as any)}>
              {READING_TYPES.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="actions">
          <button className="btn btnPrimary" onClick={onGenerate}>
            Get Reading
          </button>
          <button className="btn" onClick={onReset}>
            Reset
          </button>
        </div>
      </div>

      <div className="rightCard">
        <div className="card">
          <h2 className="h1" style={{ fontSize: 18, marginBottom: 10 }}>What you’ll get</h2>
          <div className="tip">✅ Card draw + meaning</div>
          <div className="tip">✅ Focus-based advice</div>
          <div className="tip">✅ A simple takeaway for 2026</div>
        </div>

        <div className="card">
          <h2 className="h1" style={{ fontSize: 18, marginBottom: 10 }}>Pro tip</h2>
          <p className="p">Try “Money + Three Cards” first. It gives a nice past/present/future style structure.</p>
        </div>
      </div>
    </div>
  </div>
);
