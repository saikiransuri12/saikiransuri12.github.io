import React, { useState, useEffect, useCallback, useRef } from 'react';
import StartScreen from './components/StartScreen';
import SudokuBoard from './components/SudokuBoard';
import NumberPad from './components/NumberPad';
import Toolbar from './components/Toolbar';
import GameHeader from './components/GameHeader';
import WinModal from './components/WinModal';
import GameOverModal from './components/GameOverModal';
import {
  generateSolvedBoard,
  createPuzzle,
  getAutoNotes,
  isBoardComplete,
  getConflicts,
} from './utils';
import './App.css';

const DIFFICULTIES = ['easy', 'medium', 'hard', 'expert', 'master'];

function App() {
  // Game state
  const [gameState, setGameState] = useState('menu'); // menu | playing | won | gameover
  const MAX_MISTAKES = 3;
  const [difficulty, setDifficulty] = useState('medium');
  const [board, setBoard] = useState([]);
  const [solution, setSolution] = useState([]);
  const [initialBoard, setInitialBoard] = useState([]);
  const [notes, setNotes] = useState(
    Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => new Set()))
  );
  const [selectedCell, setSelectedCell] = useState(null);
  const [isNotesMode, setIsNotesMode] = useState(false);
  const [isFastPencil, setIsFastPencil] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [maxHints] = useState(2);
  const [mistakes, setMistakes] = useState(0);
  const [history, setHistory] = useState([]);

  // Timer
  const [seconds, setSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  // Start timer
  useEffect(() => {
    if (gameState === 'playing' && !isPaused) {
      timerRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [gameState, isPaused]);

  // Start new game
  const startGame = useCallback((diff) => {
    setDifficulty(diff);
    const sol = generateSolvedBoard();
    const puzzle = createPuzzle(sol, diff);
    setSolution(sol);
    setBoard(puzzle.map((r) => [...r]));
    setInitialBoard(puzzle.map((r) => [...r]));
    setNotes(
      Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, () => new Set())
      )
    );
    setSelectedCell(null);
    setIsNotesMode(false);
    setIsFastPencil(false);
    setHintsUsed(0);
    setMistakes(0);
    setHistory([]);
    setSeconds(0);
    setIsPaused(false);
    setGameState('playing');
  }, []);

  // Save state to history for undo
  const pushHistory = useCallback(() => {
    setHistory((h) => [
      ...h.slice(-50),
      {
        board: board.map((r) => [...r]),
        notes: notes.map((r) => r.map((s) => new Set(s))),
      },
    ]);
  }, [board, notes]);

  // Undo last action
  const handleUndo = useCallback(() => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setBoard(prev.board);
    setNotes(prev.notes);
    setHistory((h) => h.slice(0, -1));
  }, [history]);

  // Place a number
  const handleNumberInput = useCallback(
    (num) => {
      if (!selectedCell || gameState !== 'playing') return;
      const { row, col } = selectedCell;
      if (initialBoard[row][col] !== 0) return; // Can't edit given cells

      pushHistory();

      if (isNotesMode) {
        // Toggle note
        const newNotes = notes.map((r) => r.map((s) => new Set(s)));
        if (newNotes[row][col].has(num)) {
          newNotes[row][col].delete(num);
        } else {
          newNotes[row][col].add(num);
        }
        setNotes(newNotes);
      } else {
        // Place number
        const newBoard = board.map((r) => [...r]);
        newBoard[row][col] = num;
        setBoard(newBoard);

        // Clear notes for this cell, and remove this number from
        // notes in the same row, column, and 3x3 box
        const newNotes = notes.map((r) => r.map((s) => new Set(s)));
        newNotes[row][col] = new Set();

        if (num === solution[row][col]) {
          const boxR = Math.floor(row / 3) * 3;
          const boxC = Math.floor(col / 3) * 3;
          for (let i = 0; i < 9; i++) {
            newNotes[row][i].delete(num); // same row
            newNotes[i][col].delete(num); // same col
          }
          for (let r2 = boxR; r2 < boxR + 3; r2++) {
            for (let c2 = boxC; c2 < boxC + 3; c2++) {
              newNotes[r2][c2].delete(num); // same box
            }
          }
        }
        setNotes(newNotes);

        // Check for mistake
        if (num !== solution[row][col]) {
          const newMistakes = mistakes + 1;
          setMistakes(newMistakes);
          if (newMistakes >= MAX_MISTAKES) {
            setGameState('gameover');
            clearInterval(timerRef.current);
            return;
          }
        }

        // Check win
        if (isBoardComplete(newBoard, solution)) {
          setGameState('won');
          clearInterval(timerRef.current);
        }
      }
    },
    [selectedCell, gameState, initialBoard, isNotesMode, board, notes, solution, mistakes, MAX_MISTAKES, pushHistory]
  );

  // Erase cell
  const handleErase = useCallback(() => {
    if (!selectedCell || gameState !== 'playing') return;
    const { row, col } = selectedCell;
    if (initialBoard[row][col] !== 0) return;

    pushHistory();

    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = 0;
    setBoard(newBoard);

    const newNotes = notes.map((r) => r.map((s) => new Set(s)));
    newNotes[row][col] = new Set();
    setNotes(newNotes);
  }, [selectedCell, gameState, initialBoard, board, notes, pushHistory]);

  // Hint
  const handleHint = useCallback(() => {
    if (hintsUsed >= maxHints || gameState !== 'playing') return;
    if (!selectedCell) return;
    const { row, col } = selectedCell;
    if (initialBoard[row][col] !== 0 && board[row][col] === solution[row][col])
      return;

    pushHistory();

    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = solution[row][col];
    setBoard(newBoard);

    const newNotes = notes.map((r) => r.map((s) => new Set(s)));
    newNotes[row][col] = new Set();
    setNotes(newNotes);

    setHintsUsed((h) => h + 1);

    if (isBoardComplete(newBoard, solution)) {
      setGameState('won');
      clearInterval(timerRef.current);
    }
  }, [hintsUsed, maxHints, gameState, selectedCell, initialBoard, board, solution, notes, pushHistory]);

  // FastPencil - auto-fill all notes
  const handleFastPencil = useCallback(() => {
    if (gameState !== 'playing') return;
    setIsFastPencil((f) => !f);
    if (!isFastPencil) {
      const autoNotes = getAutoNotes(board);
      // Merge auto notes with existing - only for empty cells
      const newNotes = notes.map((r, ri) =>
        r.map((s, ci) => {
          if (board[ri][ci] === 0) {
            return autoNotes[ri][ci];
          }
          return new Set();
        })
      );
      setNotes(newNotes);
    }
  }, [gameState, isFastPencil, board, notes]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState !== 'playing') return;

      if (e.key >= '1' && e.key <= '9') {
        handleNumberInput(parseInt(e.key));
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        handleErase();
      } else if (e.key === 'n' || e.key === 'N') {
        setIsNotesMode((m) => !m);
      } else if (e.key === 'z' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleUndo();
      } else if (e.key === 'ArrowUp' && selectedCell) {
        e.preventDefault();
        setSelectedCell((s) => ({
          row: Math.max(0, s.row - 1),
          col: s.col,
        }));
      } else if (e.key === 'ArrowDown' && selectedCell) {
        e.preventDefault();
        setSelectedCell((s) => ({
          row: Math.min(8, s.row + 1),
          col: s.col,
        }));
      } else if (e.key === 'ArrowLeft' && selectedCell) {
        e.preventDefault();
        setSelectedCell((s) => ({
          row: s.row,
          col: Math.max(0, s.col - 1),
        }));
      } else if (e.key === 'ArrowRight' && selectedCell) {
        e.preventDefault();
        setSelectedCell((s) => ({
          row: s.row,
          col: Math.min(8, s.col + 1),
        }));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, selectedCell, handleNumberInput, handleErase, handleUndo]);

  // Get conflicts for display
  const conflicts = [];
  if (selectedCell && board[selectedCell.row]?.[selectedCell.col]) {
    const val = board[selectedCell.row][selectedCell.col];
    if (val !== 0) {
      getConflicts(board, selectedCell.row, selectedCell.col, val).forEach(
        ([r, c]) => conflicts.push(`${r}-${c}`)
      );
    }
  }

  // Count how many of each number are placed
  const numberCounts = {};
  for (let n = 1; n <= 9; n++) numberCounts[n] = 0;
  board.forEach((r) => r.forEach((v) => { if (v > 0) numberCounts[v]++; }));

  if (gameState === 'menu') {
    return (
      <StartScreen
        difficulties={DIFFICULTIES}
        onStart={startGame}
      />
    );
  }

  return (
    <div className="game-container">
      <GameHeader
        difficulty={difficulty}
        seconds={seconds}
        isPaused={isPaused}
        mistakes={mistakes}
        onPause={() => setIsPaused((p) => !p)}
        onNewGame={() => setGameState('menu')}
      />

      {isPaused ? (
        <div className="paused-overlay">
          <div className="paused-content">
            <div className="paused-icon">| |</div>
            <p>Game Paused</p>
            <button className="resume-btn" onClick={() => setIsPaused(false)}>
              Resume
            </button>
          </div>
        </div>
      ) : (
        <>
          <SudokuBoard
            board={board}
            initialBoard={initialBoard}
            solution={solution}
            notes={notes}
            selectedCell={selectedCell}
            onCellClick={(row, col) => setSelectedCell({ row, col })}
            conflicts={conflicts}
          />

          <Toolbar
            isNotesMode={isNotesMode}
            isFastPencil={isFastPencil}
            hintsUsed={hintsUsed}
            maxHints={maxHints}
            historyLength={history.length}
            onToggleNotes={() => setIsNotesMode((m) => !m)}
            onFastPencil={handleFastPencil}
            onErase={handleErase}
            onHint={handleHint}
            onUndo={handleUndo}
          />

          <NumberPad
            onNumber={handleNumberInput}
            numberCounts={numberCounts}
          />
        </>
      )}

      {gameState === 'won' && (
        <WinModal
          seconds={seconds}
          difficulty={difficulty}
          mistakes={mistakes}
          hintsUsed={hintsUsed}
          onNewGame={() => setGameState('menu')}
        />
      )}

      {gameState === 'gameover' && (
        <GameOverModal
          difficulty={difficulty}
          onNewGame={() => setGameState('menu')}
          onRetry={() => startGame(difficulty)}
        />
      )}
    </div>
  );
}

export default App;
