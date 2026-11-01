import React, { useEffect } from 'react';
import { SoundEngine } from '../../services/soundEngine';

interface BSODProps {
  onDismiss: () => void;
}

export const BSOD: React.FC<BSODProps> = ({ onDismiss }) => {
  useEffect(() => {
    SoundEngine.playError();
    const handleKeyDown = () => onDismiss();
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onDismiss]);

  return (
    <div
      onClick={onDismiss}
      className="fixed inset-0 z-[100000] bg-[#0000aa] text-white font-mono p-8 md:p-16 select-none cursor-pointer flex flex-col justify-center text-sm md:text-base leading-relaxed"
    >
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="bg-[#a8a8a8] text-[#0000aa] font-bold px-2 py-0.5 inline-block">
          Windows
        </div>

        <p>
          A fatal exception 0E has occurred at 0028:C0011E36 in VXD VMM(01) +
          00010E36. The current application will be terminated.
        </p>

        <ul className="list-disc pl-6 space-y-1 text-gray-200">
          <li>Press any key to terminate the current application.</li>
          <li>
            Press CTRL+ALT+DEL again to restart your computer. You will lose any
            unsaved information in all applications.
          </li>
        </ul>

        <div className="pt-6 text-center animate-pulse font-bold text-yellow-300">
          Press any key or click anywhere to continue _
        </div>
      </div>
    </div>
  );
};
