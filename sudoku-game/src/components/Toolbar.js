import React from 'react';

function Toolbar({
  isNotesMode,
  isFastPencil,
  hintsUsed,
  maxHints,
  historyLength,
  onToggleNotes,
  onFastPencil,
  onErase,
  onHint,
  onUndo,
}) {
  return (
    <div className="toolbar">
      <button
        className={`tool-btn ${historyLength === 0 ? 'disabled' : ''}`}
        onClick={onUndo}
        disabled={historyLength === 0}
      >
        <svg viewBox="0 0 24 24" className="tool-icon">
          <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" />
        </svg>
        <span>Undo</span>
      </button>

      <button className="tool-btn" onClick={onErase}>
        <svg viewBox="0 0 24 24" className="tool-icon">
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
        </svg>
        <span>Erase</span>
      </button>

      <button
        className={`tool-btn ${isNotesMode ? 'active' : ''}`}
        onClick={onToggleNotes}
      >
        <svg viewBox="0 0 24 24" className="tool-icon">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
        </svg>
        <span>Notes</span>
        {isNotesMode && <span className="tool-badge">ON</span>}
      </button>

      <button
        className={`tool-btn ${isFastPencil ? 'active' : ''}`}
        onClick={onFastPencil}
      >
        <svg viewBox="0 0 24 24" className="tool-icon">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
        </svg>
        <span>FastPencil</span>
        {isFastPencil && <span className="tool-badge">ON</span>}
      </button>

      <button
        className={`tool-btn ${hintsUsed >= maxHints ? 'disabled' : ''}`}
        onClick={onHint}
        disabled={hintsUsed >= maxHints}
      >
        <svg viewBox="0 0 24 24" className="tool-icon">
          <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" />
        </svg>
        <span>Hint</span>
        <span className="tool-count">
          {maxHints - hintsUsed}/{maxHints}
        </span>
      </button>
    </div>
  );
}

export default Toolbar;
