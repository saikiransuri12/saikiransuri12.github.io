import React, { useState } from 'react';

const DIFF_LABELS = {
  easy: { label: 'Easy', desc: 'Perfect for beginners', color: '#4ade80' },
  medium: { label: 'Medium', desc: 'A fair challenge', color: '#60a5fa' },
  hard: { label: 'Hard', desc: 'For experienced players', color: '#f59e0b' },
  expert: { label: 'Expert', desc: 'Test your limits', color: '#f97316' },
  master: { label: 'Master', desc: 'Only the bravest', color: '#ef4444' },
};

function StartScreen({ difficulties, onStart }) {
  const [selected, setSelected] = useState('medium');

  return (
    <div className="start-screen">
      <div className="start-content">
        <div className="start-logo">
          <div className="logo-grid">
            {[9, 5, null, null, 3, null, null, null, 7].map((n, i) => (
              <div key={i} className={`logo-cell ${n ? 'filled' : ''}`}>
                {n || ''}
              </div>
            ))}
          </div>
        </div>
        <h1 className="start-title">Sudoku</h1>
        <p className="start-subtitle">Challenge your mind</p>

        <div className="difficulty-selector">
          <p className="diff-label">Select Difficulty</p>
          <div className="diff-options">
            {difficulties.map((d) => (
              <button
                key={d}
                className={`diff-btn ${selected === d ? 'active' : ''}`}
                style={{
                  '--diff-color': DIFF_LABELS[d].color,
                }}
                onClick={() => setSelected(d)}
              >
                <span className="diff-name">{DIFF_LABELS[d].label}</span>
                <span className="diff-desc">{DIFF_LABELS[d].desc}</span>
              </button>
            ))}
          </div>
        </div>

        <button className="play-btn" onClick={() => onStart(selected)}>
          Start Game
        </button>

        <div className="start-hints">
          <p>2 hints available per game</p>
          <p>Use keyboard or tap to play</p>
        </div>
      </div>
    </div>
  );
}

export default StartScreen;
