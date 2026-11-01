import React from 'react';
import { SoundEngine } from '../../services/soundEngine';

interface ShutDownScreenProps {
  onPowerOn: () => void;
}

export const ShutDownScreen: React.FC<ShutDownScreenProps> = ({ onPowerOn }) => {
  return (
    <div className="fixed inset-0 z-[100000] bg-black flex flex-col items-center justify-center p-6 text-center select-none font-sans">
      <div className="max-w-xl space-y-6">
        {/* Iconic Windows 98 Orange Shut Down Text */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#ff8000] tracking-wide drop-shadow-[0_2px_4px_rgba(255,128,0,0.4)]">
          It&apos;s now safe to turn off your computer.
        </h1>

        <p className="text-gray-400 text-sm font-mono">
          System halted · Quantum Bigfoot 4.3GB drive parked · 64MB RAM cleared
        </p>

        <div className="pt-8">
          <button
            onClick={() => {
              SoundEngine.playStartup();
              onPowerOn();
            }}
            className="win98-btn px-6 py-2.5 bg-[#c0c0c0] text-black font-bold text-sm shadow-2xl active:translate-y-1 hover:bg-white transition-all flex items-center gap-2 mx-auto"
          >
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <span>⚡ Push Power Button to Boot</span>
          </button>
        </div>
      </div>
    </div>
  );
};
