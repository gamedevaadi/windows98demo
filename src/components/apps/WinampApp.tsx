import React, { useState, useEffect } from 'react';
import { WINAMP_PLAYLIST, playWinampTrack, stopWinampMusic, WinampTrack } from '../../services/soundEngine';

export const WinampApp: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [volume, setVolume] = useState(80);
  const [eqBars, setEqBars] = useState<number[]>([40, 60, 80, 50, 70, 90, 65, 45, 85, 30]);

  const currentTrack: WinampTrack = WINAMP_PLAYLIST[currentTrackIndex];

  // Equalizer animation effect while playing
  useEffect(() => {
    let animId: number = 0;
    if (isPlaying) {
      const interval = setInterval(() => {
        setEqBars(Array.from({ length: 12 }, () => Math.floor(Math.random() * 85) + 15));
      }, 120);
      return () => clearInterval(interval);
    } else {
      setEqBars(Array.from({ length: 12 }, () => 10));
    }
    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isPlaying]);

  // Timer counter
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setSecondsElapsed(s => {
          if (s >= currentTrack.durationSec) {
            handleNext();
            return 0;
          }
          return s + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentTrack]);

  const handlePlay = (index?: number) => {
    const idx = index !== undefined ? index : currentTrackIndex;
    setCurrentTrackIndex(idx);
    setIsPlaying(true);
    setSecondsElapsed(0);
    playWinampTrack(WINAMP_PLAYLIST[idx].id, () => {
      handleNext();
    });
  };

  const handlePause = () => {
    setIsPlaying(false);
    stopWinampMusic();
  };

  const handleStop = () => {
    setIsPlaying(false);
    setSecondsElapsed(0);
    stopWinampMusic();
  };

  const handleNext = () => {
    const nextIdx = (currentTrackIndex + 1) % WINAMP_PLAYLIST.length;
    handlePlay(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (currentTrackIndex - 1 + WINAMP_PLAYLIST.length) % WINAMP_PLAYLIST.length;
    handlePlay(prevIdx);
  };

  // Format MM:SS
  const mins = Math.floor(secondsElapsed / 60);
  const secs = secondsElapsed % 60;
  const timeFormatted = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-white text-[11px] select-none font-mono p-1">
      {/* Winamp Main Chassis */}
      <div className="bg-[#2a2a2a] border-2 border-[#555] p-2 rounded-t-sm shadow-md">
        {/* LCD Display */}
        <div className="bg-black border border-[#444] p-1.5 flex items-center justify-between mb-2">
          {/* Green Digital Time */}
          <div className="text-green-500 font-mono text-xl font-bold tracking-widest px-2 bg-[#051505] border border-[#0f300f]">
            {timeFormatted}
          </div>

          {/* Equalizer Spectrum Visualizer */}
          <div className="flex items-end gap-[2px] h-8 px-2">
            {eqBars.map((height, i) => (
              <div
                key={i}
                style={{ height: `${isPlaying ? height : 10}%` }}
                className="w-1.5 bg-gradient-to-t from-green-500 via-yellow-400 to-red-500 transition-all duration-100"
              />
            ))}
          </div>

          {/* KBPS / Stereo */}
          <div className="text-[9px] text-[#00ff00] text-right font-sans">
            <div>128 kbps</div>
            <div>44 kHz Stereo</div>
          </div>
        </div>

        {/* Marquee Track Title */}
        <div className="bg-[#051505] text-[#00ff00] text-[10px] px-2 py-0.5 border border-[#0f300f] overflow-hidden truncate mb-2">
          {isPlaying ? '▶' : '■'} {currentTrackIndex + 1}. {currentTrack.artist} - {currentTrack.title} ***
        </div>

        {/* Transport Buttons */}
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              className="win98-btn px-2 py-1 text-black font-bold text-xs"
              title="Previous"
            >
              |◀
            </button>
            <button
              onClick={() => handlePlay()}
              className="win98-btn px-2 py-1 text-black font-bold text-xs"
              title="Play"
            >
              ▶
            </button>
            <button
              onClick={handlePause}
              className="win98-btn px-2 py-1 text-black font-bold text-xs"
              title="Pause"
            >
              ❚❚
            </button>
            <button
              onClick={handleStop}
              className="win98-btn px-2 py-1 text-black font-bold text-xs"
              title="Stop"
            >
              ■
            </button>
            <button
              onClick={handleNext}
              className="win98-btn px-2 py-1 text-black font-bold text-xs"
              title="Next"
            >
              ▶|
            </button>
          </div>

          {/* Volume Slider */}
          <div className="flex items-center gap-1 text-[10px] text-gray-400">
            <span>VOL</span>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-16 accent-green-500 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Winamp Playlist Window */}
      <div className="flex-1 bg-[#151515] border-2 border-t-0 border-[#555] p-2 flex flex-col justify-between mt-0.5">
        <div className="text-[10px] text-yellow-400 font-bold mb-1 border-b border-gray-700 pb-0.5 flex justify-between">
          <span>WINAMP PLAYLIST</span>
          <span className="text-gray-400 font-normal">4 Tracks [02:14]</span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-0.5">
          {WINAMP_PLAYLIST.map((track, idx) => {
            const isCur = idx === currentTrackIndex;
            return (
              <div
                key={track.id}
                onClick={() => handlePlay(idx)}
                className={`flex items-center justify-between px-2 py-1 cursor-pointer text-[10px] ${
                  isCur ? 'bg-[#000080] text-yellow-300 font-bold' : 'hover:bg-gray-800 text-gray-300'
                }`}
              >
                <div className="truncate pr-2">
                  {idx + 1}. {track.artist} - {track.title}
                </div>
                <div className="text-gray-400 shrink-0">{track.duration}</div>
              </div>
            );
          })}
        </div>

        {/* Playlist Action Bar */}
        <div className="flex items-center justify-between border-t border-gray-700 pt-1 mt-1 text-[9px] text-gray-400">
          <div className="flex gap-1">
            <span className="bg-gray-800 px-1 py-0.5 text-white">ADD</span>
            <span className="bg-gray-800 px-1 py-0.5 text-white">REM</span>
            <span className="bg-gray-800 px-1 py-0.5 text-white">SEL</span>
            <span className="bg-gray-800 px-1 py-0.5 text-white">MISC</span>
          </div>
          <span className="text-green-400 font-semibold">It really whips the llama&apos;s ass!</span>
        </div>
      </div>
    </div>
  );
};
