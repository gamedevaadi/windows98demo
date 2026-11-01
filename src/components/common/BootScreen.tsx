import React, { useEffect, useState } from 'react';

interface BootScreenProps {
  onBootComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onBootComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onBootComplete, 300);
          return 100;
        }
        return p + 4;
      });
    }, 90);

    return () => clearInterval(interval);
  }, [onBootComplete]);

  return (
    <div
      onClick={onBootComplete}
      className="fixed inset-0 z-[200000] bg-[#008080] flex flex-col justify-between select-none cursor-pointer overflow-hidden font-sans"
    >
      {/* Top area */}
      <div className="pt-8 px-8 flex justify-between items-start text-white/50 text-[11px] font-mono">
        <div>Windows 98 Second Edition</div>
        <div className="hover:text-white">[Click anywhere to skip]</div>
      </div>

      {/* Center Windows 98 Splash Graphics */}
      <div className="flex flex-col items-center justify-center my-auto">
        <div className="relative flex flex-col items-center bg-white/95 px-12 py-8 rounded shadow-2xl border-2 border-white/80 max-w-lg w-full text-center">
          {/* Subtle clouds background banner */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#e8f3fb] via-[#cfe5f6] to-[#b3d7f0] rounded -z-10" />

          {/* Microsoft wordmark */}
          <div className="text-gray-700 italic font-serif text-lg tracking-wide self-start pl-4 mb-1">
            Microsoft®
          </div>

          {/* Windows Flag + Title */}
          <div className="flex items-center gap-4 my-2">
            {/* Authentic 4-color waving flag */}
            <svg width="72" height="72" viewBox="0 0 64 64" fill="none" className="drop-shadow-md">
              {/* Red top-left */}
              <path d="M6 14C12 10 20 18 28 14V34C20 38 12 30 6 34V14Z" fill="#ff4336" />
              {/* Green top-right */}
              <path d="M32 13C40 9 48 17 56 13V33C48 37 40 29 32 33V13Z" fill="#4caf50" />
              {/* Blue bottom-left */}
              <path d="M6 37C12 33 20 41 28 37V57C20 61 12 53 6 57V37Z" fill="#2196f3" />
              {/* Yellow bottom-right */}
              <path d="M32 36C40 32 48 40 56 36V56C48 60 40 52 32 56V36Z" fill="#ffeb3b" />
            </svg>

            <div className="text-left">
              <div className="text-4xl md:text-5xl font-black tracking-tight text-[#111166] font-sans drop-shadow">
                Windows<span className="text-[#3b82f6] text-3xl md:text-4xl ml-1">98</span>
              </div>
              <div className="text-xs tracking-wider text-gray-600 font-semibold uppercase mt-0.5">
                Second Edition
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Progress Bar: Authentic Windows 98 animated marquee */}
      <div className="w-full bg-black h-12 flex flex-col justify-center px-4 border-t-2 border-[#1a1a1a]">
        <div className="flex justify-between text-[11px] text-[#00ffcc] font-mono mb-1 px-1">
          <span>Starting Windows 98...</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-3 bg-[#111] border border-[#444] rounded-none overflow-hidden relative">
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-[#0033cc] via-[#00aaff] to-[#ffffff] transition-all duration-100 shadow-[0_0_8px_#00aaff]"
          />
        </div>
      </div>
    </div>
  );
};
