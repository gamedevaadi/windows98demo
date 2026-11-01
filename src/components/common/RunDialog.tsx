import React, { useState } from 'react';
import { WinIcon } from './WinIcon';
import { SoundEngine } from '../../services/soundEngine';
import { WindowId } from '../../types/win98';

interface RunDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (appId: WindowId) => void;
  onTriggerBSOD: () => void;
}

export const RunDialog: React.FC<RunDialogProps> = ({
  isOpen,
  onClose,
  onOpenApp,
  onTriggerBSOD,
}) => {
  const [command, setCommand] = useState('calc');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = command.trim().toLowerCase();

    if (cmd === 'calc' || cmd === 'calculator') onOpenApp('calculator');
    else if (cmd === 'notepad') onOpenApp('notepad');
    else if (cmd === 'mspaint' || cmd === 'paint') onOpenApp('paint');
    else if (cmd === 'cmd' || cmd === 'command') onOpenApp('cmd');
    else if (cmd === 'winamp') onOpenApp('winamp');
    else if (cmd === 'iexplore' || cmd === 'ie') onOpenApp('internet_explorer');
    else if (cmd === 'winmine' || cmd === 'minesweeper') onOpenApp('minesweeper');
    else if (cmd === 'mario' || cmd === 'supermario' || cmd === 'super mario') onOpenApp('mario');
    else if (cmd === 'wordpad' || cmd === 'write') onOpenApp('wordpad');
    else if (cmd === 'pinball') onOpenApp('pinball');
    else if (cmd === 'crash' || cmd === 'bsod') onTriggerBSOD();
    else {
      SoundEngine.playError();
      return;
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20">
      <div className="win98-box-raised bg-[#c0c0c0] w-96 p-1 text-[11px] font-sans shadow-2xl">
        {/* Title Bar */}
        <div className="win98-title-active px-2 py-0.5 flex items-center justify-between">
          <span className="font-bold text-white text-[11px]">Run</span>
          <button onClick={onClose} className="win98-btn w-4 h-4 text-[9px] font-bold text-black flex items-center justify-center">
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-3 space-y-3">
          <div className="flex gap-3">
            <WinIcon name="cmd" size={32} className="shrink-0" />
            <div className="text-[11px] leading-relaxed text-gray-800">
              Type the name of a program, folder, document, or Internet resource, and Windows will open it for you.
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-700">Open:</span>
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="e.g. calc, notepad, cmd, winamp, bsod"
              className="flex-1 win98-box-sunken px-2 py-0.5 bg-white text-[11px] outline-none"
              autoFocus
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-[#808080]">
            <button type="submit" className="win98-btn px-4 py-1 font-bold text-[11px]">
              OK
            </button>
            <button type="button" onClick={onClose} className="win98-btn px-4 py-1 text-[11px]">
              Cancel
            </button>
            <button
              type="button"
              onClick={() => { setCommand('winamp'); }}
              className="win98-btn px-3 py-1 text-[11px]"
            >
              Browse...
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
