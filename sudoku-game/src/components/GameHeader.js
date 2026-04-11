import React from 'react';

function GameHeader({ difficulty, seconds, isPaused, mistakes, onPause, onNewGame }) {
  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const diffColors = {
    easy: '#4ade80',
    medium: '#60a5fa',
    hard: '#f59e0b',
    expert: '#f97316',
    master: '#ef4444',
  };

  return (
    <div className="game-header">
      <div className="header-left">
        <button className="back-btn" onClick={onNewGame}>
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path
              d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
              fill="currentColor"
            />
          </svg>
        </button>
        <span
          className="diff-tag"
          style={{ background: diffColors[difficulty] }}
        >
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </span>
      </div>

      <div className="header-center">
        <div className="timer-display" onClick={onPause}>
          <svg viewBox="0 0 24 24" width="16" height="16" className="timer-icon">
            {isPaused ? (
              <path d="M8 5v14l11-7z" fill="currentColor" />
            ) : (
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor" />
            )}
          </svg>
          <span className="timer-text">{formatTime(seconds)}</span>
        </div>
      </div>

      <div className="header-right">
        <div className="mistakes-display">
          <span className="mistakes-label">Mistakes:</span>
          <span className={`mistakes-count ${mistakes >= 2 ? 'danger' : ''}`}>{mistakes}/3</span>
        </div>
      </div>
    </div>
  );
}

export default GameHeader;
