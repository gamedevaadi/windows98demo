import React, { useRef, useEffect, useState, useCallback } from 'react';
import { SoundEngine } from '../../services/soundEngine';

export const MarioApp: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [lives, setLives] = useState(3);
  const [world] = useState('1-1');
  const [timeLeft, setTimeLeft] = useState(300);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'gameover'>('playing');

  // Key state tracking
  const keysRef = useRef<{ left: boolean; right: boolean; up: boolean; run: boolean }>({
    left: false,
    right: false,
    up: false,
    run: false,
  });

  // Sound effects synthesizer
  const playMarioSound = (type: 'jump' | 'coin' | 'stomp' | 'powerup' | 'die' | 'win') => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      if (type === 'jump') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.16);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.16);
      } else if (type === 'coin') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(987.77, now); // B5
        osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'stomp') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.12);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.13);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.14);
      } else if (type === 'win') {
        [523.25, 659.25, 783.99, 1046.5].forEach((f, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(f, now + idx * 0.1);
          gain.gain.setValueAtTime(0.1, now + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.1 + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.1);
          osc.stop(now + idx * 0.1 + 0.26);
        });
      } else if (type === 'die') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.linearRampToValueAtTime(150, now + 0.4);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.45);
      }
    } catch {
      // Audio not initialized or permitted
    }
  };

  // Game restart
  const restartGame = useCallback(() => {
    setScore(0);
    setCoins(0);
    setLives(3);
    setTimeLeft(300);
    setGameState('playing');
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keysRef.current.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keysRef.current.right = true;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === ' ' || e.code === 'Space') keysRef.current.up = true;
      if (e.key === 'Shift') keysRef.current.run = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keysRef.current.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keysRef.current.right = false;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === ' ' || e.code === 'Space') keysRef.current.up = false;
      if (e.key === 'Shift') keysRef.current.run = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Timer countdown
  useEffect(() => {
    if (gameState !== 'playing') return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setGameState('gameover');
          playMarioSound('die');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState]);

  // Main Canvas Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    // World & Mario setup
    const mario = {
      x: 50,
      y: 280,
      vx: 0,
      vy: 0,
      w: 16,
      h: 24,
      isGrounded: false,
      facing: 'right' as 'left' | 'right',
      isDead: false,
    };

    let cameraX = 0;

    // Blocks in World 1-1
    type Block = { x: number; y: number; w: number; h: number; type: 'ground' | 'brick' | 'question' | 'empty' | 'pipe'; hasCoin?: boolean };
    const blocks: Block[] = [
      // Ground platforms
      { x: 0, y: 320, w: 750, h: 60, type: 'ground' },
      { x: 800, y: 320, w: 500, h: 60, type: 'ground' },
      { x: 1360, y: 320, w: 900, h: 60, type: 'ground' },

      // Pipes
      { x: 260, y: 270, w: 32, h: 50, type: 'pipe' },
      { x: 380, y: 250, w: 32, h: 70, type: 'pipe' },
      { x: 600, y: 230, w: 32, h: 90, type: 'pipe' },
      { x: 1100, y: 270, w: 32, h: 50, type: 'pipe' },

      // Blocks cluster 1
      { x: 160, y: 220, w: 20, h: 20, type: 'question', hasCoin: true },
      { x: 200, y: 220, w: 20, h: 20, type: 'brick' },
      { x: 220, y: 220, w: 20, h: 20, type: 'question', hasCoin: true },
      { x: 240, y: 220, w: 20, h: 20, type: 'brick' },
      { x: 220, y: 150, w: 20, h: 20, type: 'question', hasCoin: true },

      // Blocks cluster 2
      { x: 680, y: 220, w: 20, h: 20, type: 'brick' },
      { x: 700, y: 220, w: 20, h: 20, type: 'question', hasCoin: true },
      { x: 720, y: 220, w: 20, h: 20, type: 'brick' },

      // Stairs toward flagpole
      { x: 1500, y: 300, w: 20, h: 20, type: 'brick' },
      { x: 1520, y: 280, w: 20, h: 40, type: 'brick' },
      { x: 1540, y: 260, w: 20, h: 60, type: 'brick' },
      { x: 1560, y: 240, w: 20, h: 80, type: 'brick' },
    ];

    // Goombas (enemies)
    type Goomba = { x: number; y: number; vx: number; isAlive: boolean; squishTimer: number };
    const goombas: Goomba[] = [
      { x: 320, y: 304, vx: -1, isAlive: true, squishTimer: 0 },
      { x: 500, y: 304, vx: -1, isAlive: true, squishTimer: 0 },
      { x: 920, y: 304, vx: -1, isAlive: true, squishTimer: 0 },
      { x: 1020, y: 304, vx: 1, isAlive: true, squishTimer: 0 },
      { x: 1420, y: 304, vx: -1, isAlive: true, squishTimer: 0 },
    ];

    // Floating coin animations
    type FloatingCoin = { x: number; y: number; vy: number; life: number };
    const floatingCoins: FloatingCoin[] = [];

    // Flagpole at x = 1680
    const flagpoleX = 1680;

    const gameLoop = () => {
      if (gameState === 'playing' && !mario.isDead) {
        // Player Input & Physics
        const speed = keysRef.current.run ? 3.5 : 2.5;

        if (keysRef.current.left) {
          mario.vx = -speed;
          mario.facing = 'left';
        } else if (keysRef.current.right) {
          mario.vx = speed;
          mario.facing = 'right';
        } else {
          mario.vx *= 0.7; // friction
          if (Math.abs(mario.vx) < 0.1) mario.vx = 0;
        }

        // Jump
        if (keysRef.current.up && mario.isGrounded) {
          mario.vy = -8.5;
          mario.isGrounded = false;
          playMarioSound('jump');
        }

        // Gravity
        mario.vy += 0.45;
        if (mario.vy > 10) mario.vy = 10;

        // Move X & Block Collisions
        mario.x += mario.vx;
        blocks.forEach((b) => {
          if (
            mario.x < b.x + b.w &&
            mario.x + mario.w > b.x &&
            mario.y < b.y + b.h &&
            mario.y + mario.h > b.y
          ) {
            if (mario.vx > 0) mario.x = b.x - mario.w;
            else if (mario.vx < 0) mario.x = b.x + b.w;
          }
        });

        // Move Y & Block Collisions
        mario.y += mario.vy;
        mario.isGrounded = false;
        blocks.forEach((b) => {
          if (
            mario.x < b.x + b.w &&
            mario.x + mario.w > b.x &&
            mario.y < b.y + b.h &&
            mario.y + mario.h > b.y
          ) {
            // Landing on block
            if (mario.vy > 0 && mario.y + mario.h - mario.vy <= b.y + 8) {
              mario.y = b.y - mario.h;
              mario.vy = 0;
              mario.isGrounded = true;
            }
            // Hitting block from below
            else if (mario.vy < 0) {
              mario.y = b.y + b.h;
              mario.vy = 0;
              if (b.type === 'question' && b.hasCoin) {
                b.hasCoin = false;
                b.type = 'empty';
                setCoins((c) => c + 1);
                setScore((s) => s + 200);
                playMarioSound('coin');
                floatingCoins.push({ x: b.x + 4, y: b.y - 10, vy: -5, life: 25 });
              }
            }
          }
        });

        // Fall in pit
        if (mario.y > 400) {
          mario.isDead = true;
          playMarioSound('die');
          setLives((l) => {
            if (l <= 1) {
              setGameState('gameover');
              return 0;
            }
            // Respawn
            setTimeout(() => {
              mario.x = 50;
              mario.y = 280;
              mario.vx = 0;
              mario.vy = 0;
              mario.isDead = false;
            }, 1000);
            return l - 1;
          });
        }

        // Flagpole victory
        if (mario.x >= flagpoleX) {
          setGameState('won');
          setScore((s) => s + 5000);
          playMarioSound('win');
        }

        // Camera follow
        if (mario.x - cameraX > 220) {
          cameraX = mario.x - 220;
        }

        // Goombas update
        goombas.forEach((g) => {
          if (!g.isAlive) {
            if (g.squishTimer > 0) g.squishTimer--;
            return;
          }
          g.x += g.vx;
          // Reverse direction at obstacles or edges
          blocks.forEach((b) => {
            if (g.x < b.x + b.w && g.x + 16 > b.x && g.y < b.y + b.h && g.y + 16 > b.y) {
              g.vx = -g.vx;
            }
          });

          // Mario vs Goomba collision
          if (
            mario.x < g.x + 16 &&
            mario.x + mario.w > g.x &&
            mario.y < g.y + 16 &&
            mario.y + mario.h > g.y
          ) {
            // Mario jumps on top of Goomba
            if (mario.vy > 0 && mario.y + mario.h - mario.vy <= g.y + 8) {
              g.isAlive = false;
              g.squishTimer = 30;
              mario.vy = -6;
              setScore((s) => s + 100);
              playMarioSound('stomp');
            } else {
              // Mario hit from side
              mario.isDead = true;
              playMarioSound('die');
              setLives((l) => {
                if (l <= 1) {
                  setGameState('gameover');
                  return 0;
                }
                setTimeout(() => {
                  mario.x = 50;
                  mario.y = 280;
                  mario.vx = 0;
                  mario.vy = 0;
                  mario.isDead = false;
                }, 1000);
                return l - 1;
              });
            }
          }
        });

        // Floating coins animation
        for (let i = floatingCoins.length - 1; i >= 0; i--) {
          const fc = floatingCoins[i];
          fc.y += fc.vy;
          fc.vy += 0.3;
          fc.life--;
          if (fc.life <= 0) floatingCoins.splice(i, 1);
        }
      }

      // RENDER CANVAS
      // Sky blue background
      ctx.fillStyle = '#5c94fc';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(-cameraX, 0);

      // Clouds & Bushes
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < 15; i++) {
        const cx = i * 280 + 80;
        ctx.beginPath();
        ctx.arc(cx, 70, 18, 0, Math.PI * 2);
        ctx.arc(cx + 20, 60, 24, 0, Math.PI * 2);
        ctx.arc(cx + 45, 70, 18, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Blocks
      blocks.forEach((b) => {
        if (b.type === 'ground') {
          // Ground tiles
          ctx.fillStyle = '#d88b28';
          ctx.fillRect(b.x, b.y, b.w, b.h);
          ctx.fillStyle = '#00a800'; // Grass top strip
          ctx.fillRect(b.x, b.y, b.w, 4);
          ctx.strokeStyle = '#000000';
          ctx.strokeRect(b.x, b.y, b.w, b.h);
        } else if (b.type === 'brick') {
          // Orange Brick block
          ctx.fillStyle = '#b84418';
          ctx.fillRect(b.x, b.y, b.w, b.h);
          ctx.strokeStyle = '#000000';
          ctx.strokeRect(b.x, b.y, b.w, b.h);
          ctx.strokeRect(b.x, b.y + 10, b.w, 1);
        } else if (b.type === 'question') {
          // Golden Question block
          ctx.fillStyle = '#fcb040';
          ctx.fillRect(b.x, b.y, b.w, b.h);
          ctx.strokeStyle = '#000000';
          ctx.strokeRect(b.x, b.y, b.w, b.h);
          ctx.fillStyle = '#b84418';
          ctx.font = 'bold 13px monospace';
          ctx.fillText('?', b.x + 5, b.y + 15);
        } else if (b.type === 'empty') {
          // Used block
          ctx.fillStyle = '#8b5a2b';
          ctx.fillRect(b.x, b.y, b.w, b.h);
          ctx.strokeStyle = '#000000';
          ctx.strokeRect(b.x, b.y, b.w, b.h);
        } else if (b.type === 'pipe') {
          // Green Warp Pipe
          ctx.fillStyle = '#00a800';
          ctx.fillRect(b.x, b.y, b.w, b.h);
          ctx.fillStyle = '#007800';
          ctx.fillRect(b.x + 24, b.y, 8, b.h);
          ctx.fillRect(b.x - 2, b.y, b.w + 4, 12);
          ctx.strokeStyle = '#000000';
          ctx.strokeRect(b.x, b.y, b.w, b.h);
          ctx.strokeRect(b.x - 2, b.y, b.w + 4, 12);
        }
      });

      // Draw Flagpole
      ctx.fillStyle = '#000000';
      ctx.fillRect(flagpoleX, 100, 4, 220);
      ctx.fillStyle = '#00a800'; // Flag
      ctx.beginPath();
      ctx.moveTo(flagpoleX - 25, 110);
      ctx.lineTo(flagpoleX, 110);
      ctx.lineTo(flagpoleX, 130);
      ctx.fill();
      ctx.fillStyle = '#fcb040'; // Finial ball
      ctx.beginPath();
      ctx.arc(flagpoleX + 2, 98, 6, 0, Math.PI * 2);
      ctx.fill();

      // Draw Castle at finish
      ctx.fillStyle = '#b84418';
      ctx.fillRect(flagpoleX + 50, 220, 100, 100);
      ctx.fillStyle = '#000000';
      ctx.fillRect(flagpoleX + 85, 270, 30, 50);

      // Draw Goombas
      goombas.forEach((g) => {
        if (!g.isAlive && g.squishTimer > 0) {
          // Flat squished goomba
          ctx.fillStyle = '#b84418';
          ctx.fillRect(g.x, g.y + 10, 16, 6);
        } else if (g.isAlive) {
          // Mushroom cap
          ctx.fillStyle = '#a83400';
          ctx.beginPath();
          ctx.arc(g.x + 8, g.y + 7, 8, Math.PI, 0);
          ctx.fill();
          // Stem & eyes
          ctx.fillStyle = '#fce4a0';
          ctx.fillRect(g.x + 3, g.y + 7, 10, 9);
          ctx.fillStyle = '#000000';
          ctx.fillRect(g.x + 4, g.y + 8, 2, 4);
          ctx.fillRect(g.x + 10, g.y + 8, 2, 4);
        }
      });

      // Draw Floating Coins
      floatingCoins.forEach((fc) => {
        ctx.fillStyle = '#fce4a0';
        ctx.beginPath();
        ctx.ellipse(fc.x + 6, fc.y, 5, 8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#b8860b';
        ctx.stroke();
      });

      // Draw Mario Sprite (Pixel Art style)
      if (!mario.isDead) {
        // Red Cap
        ctx.fillStyle = '#e52521';
        ctx.fillRect(mario.facing === 'right' ? mario.x + 3 : mario.x + 1, mario.y, 11, 5);

        // Face / Skin
        ctx.fillStyle = '#fccc98';
        ctx.fillRect(mario.x + 3, mario.y + 5, 10, 6);

        // Mustache & Eye
        ctx.fillStyle = '#6b4423';
        const eyeX = mario.facing === 'right' ? mario.x + 9 : mario.x + 4;
        ctx.fillRect(eyeX, mario.y + 6, 2, 2);
        const stacheX = mario.facing === 'right' ? mario.x + 7 : mario.x + 3;
        ctx.fillRect(stacheX, mario.y + 9, 6, 2);

        // Red Shirt
        ctx.fillStyle = '#e52521';
        ctx.fillRect(mario.x + 2, mario.y + 11, 12, 6);

        // Blue Overalls
        ctx.fillStyle = '#0026ff';
        ctx.fillRect(mario.x + 3, mario.y + 14, 10, 6);
        ctx.fillRect(mario.x + 3, mario.y + 20, 4, 4);
        ctx.fillRect(mario.x + 9, mario.y + 20, 4, 4);

        // Brown Shoes
        ctx.fillStyle = '#6b4423';
        ctx.fillRect(mario.x + 1, mario.y + 22, 6, 3);
        ctx.fillRect(mario.x + 9, mario.y + 22, 6, 3);
      }

      ctx.restore();

      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animId);
  }, [gameState]);

  return (
    <div className="flex flex-col h-full bg-[#000000] text-white text-[11px] select-none font-mono items-center justify-between">
      {/* Top Retro HUD */}
      <div className="w-full bg-[#000000] px-4 py-1.5 flex items-center justify-between text-xs tracking-wider border-b border-[#333]">
        <div>
          <div className="text-white font-bold">MARIO</div>
          <div className="text-yellow-300 font-bold">{String(score).padStart(6, '0')}</div>
        </div>
        <div>
          <div className="text-yellow-400">COINS</div>
          <div className="text-white font-bold">🪙 x{String(coins).padStart(2, '0')}</div>
        </div>
        <div>
          <div className="text-gray-400">WORLD</div>
          <div className="text-white font-bold">{world}</div>
        </div>
        <div>
          <div className="text-gray-400">TIME</div>
          <div className="text-white font-bold">{timeLeft}</div>
        </div>
        <div>
          <div className="text-red-400">LIVES</div>
          <div className="text-white font-bold">❤️ x{lives}</div>
        </div>
      </div>

      {/* Main Game Screen */}
      <div className="relative border-4 border-[#333] shadow-2xl overflow-hidden">
        <canvas ref={canvasRef} width={500} height={340} className="block bg-[#5c94fc]" />

        {/* Win Screen */}
        {gameState === 'won' && (
          <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-4 text-center">
            <h2 className="text-xl font-bold text-yellow-300 mb-2">COURSE CLEAR! 🚩</h2>
            <p className="text-sm text-white mb-3">Thank you Mario! Your quest is complete.</p>
            <p className="text-xs text-green-400 mb-4">Total Score: {score}</p>
            <button
              onClick={restartGame}
              className="win98-btn px-4 py-1 text-black font-bold font-sans text-xs bg-yellow-300"
            >
              Play Again
            </button>
          </div>
        )}

        {/* Game Over Screen */}
        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-4 text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-2">GAME OVER</h2>
            <p className="text-xs text-gray-300 mb-4">Final Score: {score}</p>
            <button
              onClick={restartGame}
              className="win98-btn px-4 py-1 text-black font-bold font-sans text-xs bg-white"
            >
              Restart Game
            </button>
          </div>
        )}
      </div>

      {/* Retro Gamepad Controls & Instructions */}
      <div className="w-full bg-[#111] p-2 flex items-center justify-between text-[11px] text-gray-300 border-t border-[#333]">
        <div className="flex gap-1.5 items-center">
          <button
            onMouseDown={() => { keysRef.current.left = true; }}
            onMouseUp={() => { keysRef.current.left = false; }}
            onTouchStart={() => { keysRef.current.left = true; }}
            onTouchEnd={() => { keysRef.current.left = false; }}
            className="win98-btn px-2.5 py-1 text-black font-bold font-sans text-xs active:bg-gray-300"
          >
            ◀ Left
          </button>
          <button
            onMouseDown={() => { keysRef.current.right = true; }}
            onMouseUp={() => { keysRef.current.right = false; }}
            onTouchStart={() => { keysRef.current.right = true; }}
            onTouchEnd={() => { keysRef.current.right = false; }}
            className="win98-btn px-2.5 py-1 text-black font-bold font-sans text-xs active:bg-gray-300"
          >
            Right ▶
          </button>
          <button
            onMouseDown={() => { keysRef.current.up = true; }}
            onMouseUp={() => { keysRef.current.up = false; }}
            onTouchStart={() => { keysRef.current.up = true; }}
            onTouchEnd={() => { keysRef.current.up = false; }}
            className="win98-btn px-3 py-1 text-black font-bold font-sans text-xs bg-red-200 active:bg-red-300"
          >
            [A] Jump
          </button>
        </div>

        <div className="hidden sm:block text-[10px] text-gray-400 font-sans">
          Keys: <strong>Arrow Keys</strong> or <strong>A / D</strong> to run, <strong>Space / Up</strong> to jump
        </div>

        <button
          onClick={restartGame}
          className="win98-btn px-3 py-0.5 text-black font-bold font-sans text-[11px]"
        >
          Reset
        </button>
      </div>
    </div>
  );
};
