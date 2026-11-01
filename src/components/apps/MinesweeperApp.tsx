import React, { useState, useEffect, useCallback } from 'react';
import { SoundEngine } from '../../services/soundEngine';

type CellState = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
};

export const MinesweeperApp: React.FC = () => {
  const ROWS = 9;
  const COLS = 9;
  const MINES = 10;

  const [grid, setGrid] = useState<CellState[][]>([]);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'won' | 'lost'>('idle');
  const [mineCount, setMineCount] = useState(MINES);
  const [seconds, setSeconds] = useState(0);
  const [isFlagMode, setIsFlagMode] = useState(false);

  // Initialize Board
  const initBoard = useCallback(() => {
    const newGrid: CellState[][] = [];
    for (let r = 0; r < ROWS; r++) {
      const row: CellState[] = [];
      for (let c = 0; c < COLS; c++) {
        row.push({
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          neighborMines: 0,
        });
      }
      newGrid.push(row);
    }

    // Place 10 mines randomly
    let placed = 0;
    while (placed < MINES) {
      const r = Math.floor(Math.random() * ROWS);
      const c = Math.floor(Math.random() * COLS);
      if (!newGrid[r][c].isMine) {
        newGrid[r][c].isMine = true;
        placed++;
      }
    }

    // Count neighbors
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (!newGrid[r][c].isMine) {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = r + dr;
              const nc = c + dc;
              if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && newGrid[nr][nc].isMine) {
                count++;
              }
            }
          }
          newGrid[r][c].neighborMines = count;
        }
      }
    }

    setGrid(newGrid);
    setGameState('idle');
    setMineCount(MINES);
    setSeconds(0);
  }, [ROWS, COLS, MINES]);

  useEffect(() => {
    initBoard();
  }, [initBoard]);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === 'playing') {
      interval = setInterval(() => {
        setSeconds((s) => Math.min(s + 1, 999));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState]);

  // Reveal Flood Fill
  const revealCell = (r: number, c: number, currentGrid: CellState[][]) => {
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
    const cell = currentGrid[r][c];
    if (cell.isRevealed || cell.isFlagged) return;

    cell.isRevealed = true;
    if (cell.neighborMines === 0 && !cell.isMine) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          revealCell(r + dr, c + dc, currentGrid);
        }
      }
    }
  };

  const handleCellClick = (r: number, c: number) => {
    if (gameState === 'won' || gameState === 'lost') return;

    if (isFlagMode) {
      handleCellRightClick(r, c);
      return;
    }

    const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
    const cell = newGrid[r][c];
    if (cell.isFlagged || cell.isRevealed) return;

    if (gameState === 'idle') {
      setGameState('playing');
    }

    if (cell.isMine) {
      // Game Over
      cell.isRevealed = true;
      // reveal all mines
      newGrid.forEach((row) =>
        row.forEach((c) => {
          if (c.isMine) c.isRevealed = true;
        })
      );
      setGrid(newGrid);
      setGameState('lost');
      SoundEngine.playError();
      return;
    }

    revealCell(r, c, newGrid);
    SoundEngine.playDing();

    // Check Win
    let won = true;
    for (let row of newGrid) {
      for (let c of row) {
        if (!c.isMine && !c.isRevealed) {
          won = false;
          break;
        }
      }
    }

    if (won) {
      setGameState('won');
      SoundEngine.playChord();
    }

    setGrid(newGrid);
  };

  const handleCellRightClick = (r: number, c: number, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (gameState === 'won' || gameState === 'lost') return;

    const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
    const cell = newGrid[r][c];
    if (cell.isRevealed) return;

    if (!cell.isFlagged) {
      cell.isFlagged = true;
      setMineCount((m) => m - 1);
    } else {
      cell.isFlagged = false;
      setMineCount((m) => m + 1);
    }
    setGrid(newGrid);
  };

  const getNumberColor = (num: number) => {
    switch (num) {
      case 1: return 'text-blue-700';
      case 2: return 'text-green-700';
      case 3: return 'text-red-700';
      case 4: return 'text-indigo-900';
      case 5: return 'text-red-900';
      case 6: return 'text-teal-700';
      case 7: return 'text-black';
      case 8: return 'text-gray-600';
      default: return 'text-black';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 bg-[#c0c0c0] select-none text-[12px] font-sans h-full">
      <div className="win98-box-raised p-2 bg-[#c0c0c0] flex flex-col items-center">
        {/* Header Display */}
        <div className="win98-box-sunken-gray w-full p-1.5 mb-2 flex items-center justify-between bg-[#c0c0c0]">
          {/* Mine Counter LCD */}
          <div className="bg-black text-red-600 font-mono text-xl font-bold px-1.5 py-0.5 tracking-wider border border-[#808080]">
            {String(mineCount).padStart(3, '0')}
          </div>

          {/* Smiley Face Button */}
          <button
            onClick={initBoard}
            className="win98-btn w-7 h-7 flex items-center justify-center text-lg active:translate-y-0.5"
            title="Restart Game"
          >
            {gameState === 'won' ? '😎' : gameState === 'lost' ? '😵' : '🙂'}
          </button>

          {/* Timer LCD */}
          <div className="bg-black text-red-600 font-mono text-xl font-bold px-1.5 py-0.5 tracking-wider border border-[#808080]">
            {String(seconds).padStart(3, '0')}
          </div>
        </div>

        {/* Board Grid */}
        <div className="win98-box-sunken p-1 bg-[#808080]">
          <div
            className="grid gap-[1px] bg-[#808080]"
            style={{ gridTemplateColumns: `repeat(${COLS}, 22px)` }}
          >
            {grid.map((row, r) =>
              row.map((cell, c) => {
                if (cell.isRevealed) {
                  return (
                    <div
                      key={`${r}-${c}`}
                      className="w-[22px] h-[22px] bg-[#c0c0c0] border border-[#7b7b7b] flex items-center justify-center font-bold text-xs"
                    >
                      {cell.isMine ? (
                        '💣'
                      ) : cell.neighborMines > 0 ? (
                        <span className={getNumberColor(cell.neighborMines)}>
                          {cell.neighborMines}
                        </span>
                      ) : null}
                    </div>
                  );
                } else {
                  return (
                    <button
                      key={`${r}-${c}`}
                      onClick={() => handleCellClick(r, c)}
                      onContextMenu={(e) => handleCellRightClick(r, c, e)}
                      className="w-[22px] h-[22px] win98-btn flex items-center justify-center font-bold text-[11px]"
                    >
                      {cell.isFlagged ? '🚩' : ''}
                    </button>
                  );
                }
              })
            )}
          </div>
        </div>

        {/* Mobile / Click Flag Toggle Helper */}
        <div className="mt-2 flex items-center justify-between w-full text-[10px] text-gray-700">
          <button
            onClick={() => setIsFlagMode(!isFlagMode)}
            className={`win98-btn px-2 py-0.5 font-bold ${
              isFlagMode ? 'bg-yellow-200 win98-btn-pressed' : ''
            }`}
          >
            {isFlagMode ? '🚩 Flag Mode ON' : '⛏ Dig Mode'}
          </button>
          <span>Tip: Right-click to flag</span>
        </div>
      </div>
    </div>
  );
};
