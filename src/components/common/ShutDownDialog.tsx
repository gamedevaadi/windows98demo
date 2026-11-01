import React, { useState } from 'react';
import { WinIcon } from './WinIcon';

interface ShutDownDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmShutDown: () => void;
  onRestart: () => void;
}

export const ShutDownDialog: React.FC<ShutDownDialogProps> = ({
  isOpen,
  onClose,
  onConfirmShutDown,
  onRestart,
}) => {
  const [action, setAction] = useState<'shutdown' | 'restart' | 'dos'>('shutdown');

  if (!isOpen) return null;

  const handleOK = () => {
    if (action === 'shutdown') {
      onConfirmShutDown();
    } else if (action === 'restart') {
      onRestart();
    } else {
      alert('Entering MS-DOS mode...');
      onRestart();
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20">
      <div className="win98-box-raised bg-[#c0c0c0] w-80 p-1 text-[11px] font-sans shadow-2xl">
        {/* Title Bar */}
        <div className="win98-title-active px-2 py-0.5 flex items-center justify-between">
          <span className="font-bold text-white text-[11px]">Shut Down Windows</span>
          <button onClick={onClose} className="win98-btn w-4 h-4 text-[9px] font-bold text-black flex items-center justify-center">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-3 space-y-3">
          <div className="flex gap-3">
            <WinIcon name="computer" size={32} className="shrink-0" />
            <div className="text-[11px] font-bold text-gray-900">
              What do you want the computer to do?
            </div>
          </div>

          <div className="space-y-1.5 pl-4 text-[11px]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="shutdown_action"
                checked={action === 'shutdown'}
                onChange={() => setAction('shutdown')}
              />
              <span><u>S</u>hut down</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="shutdown_action"
                checked={action === 'restart'}
                onChange={() => setAction('restart')}
              />
              <span><u>R</u>estart</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="shutdown_action"
                checked={action === 'dos'}
                onChange={() => setAction('dos')}
              />
              <span>Restart in <u>M</u>S-DOS mode</span>
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-[#808080]">
            <button onClick={handleOK} className="win98-btn px-4 py-1 font-bold text-[11px] min-w-[65px]">
              OK
            </button>
            <button onClick={onClose} className="win98-btn px-4 py-1 text-[11px] min-w-[65px]">
              Cancel
            </button>
            <button
              onClick={() => alert('Shutting down will safely unmount the abandoned FAT32 disk image.')}
              className="win98-btn px-3 py-1 text-[11px]"
            >
              Help
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
