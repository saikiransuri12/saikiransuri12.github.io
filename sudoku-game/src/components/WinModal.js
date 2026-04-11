import React from 'react';

function WinModal({ seconds, difficulty, mistakes, hintsUsed, onNewGame }) {
  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Simple star rating based on performance
  const getStars = () => {
    let stars = 3;
    if (mistakes > 3) stars--;
    if (mistakes > 6) stars--;
    if (hintsUsed > 1) stars--;
    return Math.max(1, stars);
  };

  const stars = getStars();

  return (
    <div className="modal-overlay">
      <div className="win-modal">
        <div className="win-stars">
          {[1, 2, 3].map((s) => (
            <span key={s} className={`star ${s <= stars ? 'filled' : ''}`}>
              &#9733;
            </span>
          ))}
        </div>
        <h2 className="win-title">Congratulations!</h2>
        <p className="win-subtitle">You solved the puzzle!</p>

        <div className="win-stats">
          <div className="stat">
            <span className="stat-value">{formatTime(seconds)}</span>
            <span className="stat-label">Time</span>
          </div>
          <div className="stat">
            <span className="stat-value">
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
            <span className="stat-label">Difficulty</span>
          </div>
          <div className="stat">
            <span className="stat-value">{mistakes}</span>
            <span className="stat-label">Mistakes</span>
          </div>
          <div className="stat">
            <span className="stat-value">{hintsUsed}</span>
            <span className="stat-label">Hints</span>
          </div>
        </div>

        <button className="play-btn" onClick={onNewGame}>
          New Game
        </button>
      </div>
    </div>
  );
}

export default WinModal;
