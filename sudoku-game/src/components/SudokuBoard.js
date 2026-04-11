import React from 'react';

const SudokuBoard = ({
  board,
  initialBoard,
  solution,
  notes,
  selectedCell,
  onCellClick,
  conflicts,
}) => {
  const selectedVal =
    selectedCell && board[selectedCell.row]?.[selectedCell.col];

  return (
    <div className="board-wrapper">
      <div className="board">
        {board.map((row, r) =>
          row.map((cell, c) => {
            const isGiven = initialBoard[r][c] !== 0;
            const isSelected =
              selectedCell && selectedCell.row === r && selectedCell.col === c;

            // Highlight all cells with the same number (value or note)
            const cellNotes = notes[r]?.[c] || new Set();
            const isSameNumber =
              selectedVal && selectedVal !== 0 && cell === selectedVal && !isSelected;
            const hasMatchingNote =
              selectedVal && selectedVal !== 0 && cell === 0 && cellNotes.has(selectedVal);

            const isConflict = conflicts.includes(`${r}-${c}`);
            const isWrong =
              cell !== 0 && !isGiven && cell !== solution[r][c];

            let className = 'cell';
            if (isSelected) className += ' selected';
            if (isSameNumber) className += ' same-number';
            if (hasMatchingNote) className += ' has-matching-note';
            if (isConflict) className += ' conflict';
            if (isWrong) className += ' wrong';
            if (isGiven) className += ' given';

            // Border classes for 3x3 subgrid
            if (r % 3 === 0) className += ' border-top';
            if (c % 3 === 0) className += ' border-left';
            if (r === 8) className += ' border-bottom';
            if (c === 8) className += ' border-right';

            return (
              <div
                key={`${r}-${c}`}
                className={className}
                onClick={() => onCellClick(r, c)}
              >
                {cell !== 0 ? (
                  <span className="cell-value">{cell}</span>
                ) : cellNotes.size > 0 ? (
                  <div className="cell-notes">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                      <span
                        key={n}
                        className={`note ${cellNotes.has(n) ? 'visible' : ''} ${
                          cellNotes.has(n) && selectedVal && selectedVal === n ? 'note-match' : ''
                        }`}
                      >
                        {cellNotes.has(n) ? n : ''}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SudokuBoard;
