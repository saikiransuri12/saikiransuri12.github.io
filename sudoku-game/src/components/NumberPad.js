import React from 'react';

function NumberPad({ onNumber, numberCounts }) {
  return (
    <div className="number-pad">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => {
        const isComplete = numberCounts[n] >= 9;
        return (
          <button
            key={n}
            className={`num-btn ${isComplete ? 'complete' : ''}`}
            onClick={() => !isComplete && onNumber(n)}
            disabled={isComplete}
          >
            <span className="num-value">{n}</span>
            <span className="num-count">{9 - numberCounts[n]}</span>
          </button>
        );
      })}
    </div>
  );
}

export default NumberPad;
