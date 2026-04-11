// src/utils.js

// Check if placing a number is valid
export const isValid = (board, row, col, num) => {
  for (let i = 0; i < 9; i++) {
    if (i !== col && board[row][i] === num) return false;
    if (i !== row && board[i][col] === num) return false;
  }
  const sr = Math.floor(row / 3) * 3;
  const sc = Math.floor(col / 3) * 3;
  for (let i = sr; i < sr + 3; i++) {
    for (let j = sc; j < sc + 3; j++) {
      if (i !== row && j !== col && board[i][j] === num) return false;
    }
  }
  return true;
};

// Generate a fully solved board using backtracking with random shuffling
export const generateSolvedBoard = () => {
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));

  const solve = (b) => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (b[r][c] === 0) {
          const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
          for (const n of nums) {
            if (isValidZero(b, r, c, n)) {
              b[r][c] = n;
              if (solve(b)) return true;
              b[r][c] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  solve(board);
  return board;
};

// isValid for zero-based empty cells
const isValidZero = (board, row, col, num) => {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) return false;
  }
  const sr = Math.floor(row / 3) * 3;
  const sc = Math.floor(col / 3) * 3;
  for (let i = sr; i < sr + 3; i++) {
    for (let j = sc; j < sc + 3; j++) {
      if (board[i][j] === num) return false;
    }
  }
  return true;
};

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// Difficulty: cells to remove
const DIFFICULTY_MAP = {
  easy: 36,
  medium: 45,
  hard: 52,
  expert: 58,
  master: 62,
};

// Count solutions (stops at 2 — we only need to know if there's more than 1)
const countSolutions = (board, limit = 2) => {
  const b = board.map((r) => [...r]);
  let count = 0;

  const solve = () => {
    if (count >= limit) return;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (b[r][c] === 0) {
          for (let n = 1; n <= 9; n++) {
            if (isValidZero(b, r, c, n)) {
              b[r][c] = n;
              solve();
              if (count >= limit) return;
              b[r][c] = 0;
            }
          }
          return;
        }
      }
    }
    count++;
  };

  solve();
  return count;
};

// Create puzzle by removing cells, ensuring a unique solution
export const createPuzzle = (solution, difficulty) => {
  const puzzle = solution.map((r) => [...r]);
  let toRemove = DIFFICULTY_MAP[difficulty] || 45;
  const positions = shuffle(
    Array.from({ length: 81 }, (_, i) => [Math.floor(i / 9), i % 9])
  );

  for (const [r, c] of positions) {
    if (toRemove <= 0) break;
    if (puzzle[r][c] !== 0) {
      const backup = puzzle[r][c];
      puzzle[r][c] = 0;

      // Check if puzzle still has a unique solution
      if (countSolutions(puzzle) === 1) {
        toRemove--;
      } else {
        // Removing this cell creates multiple solutions — put it back
        puzzle[r][c] = backup;
      }
    }
  }
  return puzzle;
};

// Get all candidates for a cell
export const getCandidates = (board, row, col) => {
  if (board[row][col] !== 0) return [];
  const candidates = [];
  for (let n = 1; n <= 9; n++) {
    if (isValidZero(board, row, col, n)) {
      candidates.push(n);
    }
  }
  return candidates;
};

// Get all auto-pencil marks for entire board
export const getAutoNotes = (board) => {
  const notes = Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => new Set())
  );
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) {
        getCandidates(board, r, c).forEach((n) => notes[r][c].add(n));
      }
    }
  }
  return notes;
};

// Check if the board is completely and correctly filled
export const isBoardComplete = (board, solution) => {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] !== solution[r][c]) return false;
    }
  }
  return true;
};

// Find conflicts for a given cell value
export const getConflicts = (board, row, col, num) => {
  if (num === 0) return [];
  const conflicts = [];
  for (let i = 0; i < 9; i++) {
    if (i !== col && board[row][i] === num) conflicts.push([row, i]);
    if (i !== row && board[i][col] === num) conflicts.push([i, col]);
  }
  const sr = Math.floor(row / 3) * 3;
  const sc = Math.floor(col / 3) * 3;
  for (let i = sr; i < sr + 3; i++) {
    for (let j = sc; j < sc + 3; j++) {
      if (i !== row && j !== col && board[i][j] === num) {
        if (!conflicts.some(([cr, cc]) => cr === i && cc === j)) {
          conflicts.push([i, j]);
        }
      }
    }
  }
  return conflicts;
};
