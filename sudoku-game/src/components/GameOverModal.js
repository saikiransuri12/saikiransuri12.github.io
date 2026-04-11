import React from 'react';

function GameOverModal({ difficulty, onNewGame, onRetry }) {
  return (
    <div className="modal-overlay">
      <div className="win-modal gameover-modal">
        <div className="gameover-icon">
          <svg viewBox="0 0 24 24" width="56" height="56">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
              fill="#ef4444"
            />
          </svg>
        </div>
        <h2 className="gameover-title">Game Over</h2>
        <p className="win-subtitle">You made 3 mistakes</p>

        <div className="gameover-actions">
          <button className="play-btn" onClick={onRetry}>
            Try Again
          </button>
          <button className="retry-secondary" onClick={onNewGame}>
            New Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameOverModal;
