import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SoundEngine } from '../../services/soundEngine';

export const PinballApp: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [ballsLeft, setBallsLeft] = useState(3);
  const [rank, setRank] = useState('Cadet');
  const [isGameOver, setIsGameOver] = useState(false);

  // Ball physics state in ref for 60fps animation
  const stateRef = useRef({
    ballX: 280,
    ballY: 380,
    vx: 0,
    vy: 0,
    leftFlipperUp: false,
    rightFlipperUp: false,
    inPlunger: true,
  });

  const launchBall = useCallback(() => {
    if (stateRef.current.inPlunger && ballsLeft > 0) {
      stateRef.current.inPlunger = false;
      stateRef.current.vx = -1.5;
      stateRef.current.vy = -12;
      SoundEngine.playDing();
    }
  }, [ballsLeft]);

  // Handle Controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'z' || e.key === 'Z') {
        stateRef.current.leftFlipperUp = true;
        SoundEngine.playDing();
      }
      if (e.key === '/' || e.key === '?') {
        stateRef.current.rightFlipperUp = true;
        SoundEngine.playDing();
      }
      if (e.key === ' ' || e.code === 'Space') {
        launchBall();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'z' || e.key === 'Z') {
        stateRef.current.leftFlipperUp = false;
      }
      if (e.key === '/' || e.key === '?') {
        stateRef.current.rightFlipperUp = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [launchBall]);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const bumpers = [
      { x: 100, y: 120, r: 20, points: 500, color: '#ff0055' },
      { x: 180, y: 100, r: 22, points: 750, color: '#ffaa00' },
      { x: 140, y: 170, r: 24, points: 1000, color: '#00ddff' },
    ];

    const update = () => {
      const state = stateRef.current;

      if (!state.inPlunger && !isGameOver) {
        // Apply Gravity
        state.vy += 0.22;
        state.ballX += state.vx;
        state.ballY += state.vy;

        // Side Walls
        if (state.ballX < 20) {
          state.ballX = 20;
          state.vx = -state.vx * 0.75;
          SoundEngine.playDing();
        }
        if (state.ballX > 280) {
          state.ballX = 280;
          state.vx = -state.vx * 0.75;
          SoundEngine.playDing();
        }
        // Top Wall
        if (state.ballY < 20) {
          state.ballY = 20;
          state.vy = -state.vy * 0.75;
          SoundEngine.playDing();
        }

        // Bumper collisions
        bumpers.forEach((b) => {
          const dx = state.ballX - b.x;
          const dy = state.ballY - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < b.r + 7) {
            // bounce back
            const angle = Math.atan2(dy, dx);
            state.vx = Math.cos(angle) * 7;
            state.vy = Math.sin(angle) * 7;
            setScore((s) => s + b.points);
            SoundEngine.playChord();
          }
        });

        // Flipper hit logic
        // Left Flipper around (70, 340) to (120, 360)
        if (state.ballY > 330 && state.ballY < 360 && state.ballX > 50 && state.ballX < 130) {
          if (state.leftFlipperUp) {
            state.vy = -9;
            state.vx = 4;
            setScore((s) => s + 200);
            SoundEngine.playDing();
          }
        }

        // Right Flipper around (170, 360) to (220, 340)
        if (state.ballY > 330 && state.ballY < 360 && state.ballX > 160 && state.ballX < 240) {
          if (state.rightFlipperUp) {
            state.vy = -9;
            state.vx = -4;
            setScore((s) => s + 200);
            SoundEngine.playDing();
          }
        }

        // Drain / Bottom Out
        if (state.ballY > 410) {
          setBallsLeft((b) => {
            if (b <= 1) {
              setIsGameOver(true);
              SoundEngine.playError();
              return 0;
            } else {
              // Reset to plunger
              state.inPlunger = true;
              state.ballX = 280;
              state.ballY = 380;
              state.vx = 0;
              state.vy = 0;
              SoundEngine.playExclamation();
              return b - 1;
            }
          });
        }
      }

      // DRAW CANVAS
      ctx.fillStyle = '#0a0a20';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Stars
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < 25; i++) {
        const sx = (i * 47) % canvas.width;
        const sy = (i * 73) % canvas.height;
        ctx.fillRect(sx, sy, 1.5, 1.5);
      }

      // Outer Ramps & Rails
      ctx.strokeStyle = '#4060b0';
      ctx.lineWidth = 3;
      ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

      // Plunger Lane
      ctx.strokeStyle = '#505070';
      ctx.beginPath();
      ctx.moveTo(270, 420);
      ctx.lineTo(270, 100);
      ctx.arc(250, 100, 20, 0, Math.PI, true);
      ctx.stroke();

      // Bumpers
      bumpers.forEach((b) => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(String(b.points), b.x, b.y + 4);
      });

      // Left Flipper
      ctx.strokeStyle = state.leftFlipperUp ? '#ffff00' : '#ff4444';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(60, 345);
      ctx.lineTo(125, state.leftFlipperUp ? 330 : 365);
      ctx.stroke();

      // Right Flipper
      ctx.strokeStyle = state.rightFlipperUp ? '#ffff00' : '#ff4444';
      ctx.beginPath();
      ctx.moveTo(230, 345);
      ctx.lineTo(165, state.rightFlipperUp ? 330 : 365);
      ctx.stroke();

      // Pinball Ball (Chrome sphere)
      ctx.beginPath();
      ctx.arc(state.ballX, state.ballY, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#e0e0e0';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(state.ballX - 2, state.ballY - 2, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [isGameOver]);

  const handleRestart = () => {
    stateRef.current = {
      ballX: 280,
      ballY: 380,
      vx: 0,
      vy: 0,
      leftFlipperUp: false,
      rightFlipperUp: false,
      inPlunger: true,
    };
    setScore(0);
    setBallsLeft(3);
    setIsGameOver(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#101030] text-white text-[11px] select-none p-2 font-mono items-center justify-between">
      {/* Top Display */}
      <div className="w-full bg-[#1f1f45] win98-box-raised p-2 flex items-center justify-between text-black mb-1">
        <div>
          <span className="font-bold text-blue-900">3D PINBALL</span>
          <span className="text-gray-600 ml-2">Space Cadet</span>
        </div>
        <div className="flex gap-4">
          <div>SCORE: <strong className="font-mono text-blue-800">{score.toLocaleString()}</strong></div>
          <div>BALLS: <strong className="text-red-700">{ballsLeft}</strong></div>
          <div>RANK: <strong className="text-purple-800">{rank}</strong></div>
        </div>
      </div>

      {/* Pinball Canvas Field */}
      <div className="relative border-4 border-[#2b2b68] rounded shadow-inner">
        <canvas ref={canvasRef} width={300} height={420} className="block bg-[#0a0a20]" />
        {isGameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4">
            <div className="text-yellow-400 font-bold text-lg mb-2">GAME OVER</div>
            <div className="text-white mb-3">Final Cadet Score: {score.toLocaleString()}</div>
            <button
              onClick={handleRestart}
              className="win98-btn px-4 py-1 text-black font-bold font-sans"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      {/* Control Instruction Bar */}
      <div className="w-full mt-2 flex items-center justify-between text-[10px] text-gray-300">
        <div className="flex gap-2">
          <button
            onClick={() => {
              stateRef.current.leftFlipperUp = true;
              setTimeout(() => { stateRef.current.leftFlipperUp = false; }, 150);
            }}
            className="win98-btn px-2 py-0.5 text-black font-bold font-sans"
          >
            [Z] Left Flipper
          </button>
          <button
            onClick={() => {
              stateRef.current.rightFlipperUp = true;
              setTimeout(() => { stateRef.current.rightFlipperUp = false; }, 150);
            }}
            className="win98-btn px-2 py-0.5 text-black font-bold font-sans"
          >
            [/] Right Flipper
          </button>
        </div>
        <button
          onClick={launchBall}
          className="win98-btn px-3 py-0.5 text-black font-bold font-sans bg-yellow-200"
        >
          [SPACE] Launch Plunger
        </button>
      </div>
    </div>
  );
};
