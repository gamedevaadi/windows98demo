import React, { useState } from 'react';
import { WinIcon } from './WinIcon';
import { SoundEngine } from '../../services/soundEngine';

interface LogonScreenProps {
  onLogon: (username: string) => void;
}

export const LogonScreen: React.FC<LogonScreenProps> = ({ onLogon }) => {
  const [username, setUsername] = useState('Windows User');
  const [password, setPassword] = useState('••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    SoundEngine.playStartup();
    onLogon(username);
  };

  return (
    <div className="fixed inset-0 z-[150000] bg-[#008080] flex items-center justify-center p-4 select-none font-sans">
      <div className="win98-box-raised bg-[#c0c0c0] w-full max-w-[390px] shadow-2xl p-1 text-[11px] text-black">
        {/* Title Bar */}
        <div className="win98-title-active px-2 py-0.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-bold text-white text-[11px]">
            <WinIcon name="windows_flag" size={14} />
            <span>Welcome to Windows</span>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="win98-btn w-4 h-4 text-[9px] font-bold text-black flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-3 space-y-3">
          <div className="flex gap-3 items-center">
            {/* Key / PC Icon */}
            <div className="p-1 win98-box-raised bg-[#c0c0c0] shrink-0">
              <WinIcon name="my_computer" size={36} />
            </div>
            <div className="text-[11px] text-gray-900 leading-normal">
              Type a user name and password to log on to Windows.
            </div>
          </div>

          <div className="space-y-2 pt-1 border-t border-gray-400">
            <div className="flex items-center gap-3">
              <label className="w-20 text-right font-medium"><u>U</u>ser name:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex-1 win98-box-sunken px-2 py-0.5 bg-white text-[11px] outline-none"
                autoFocus
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="w-20 text-right font-medium"><u>P</u>assword:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 win98-box-sunken px-2 py-0.5 bg-white text-[11px] outline-none font-mono"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#808080]">
            <button
              type="submit"
              className="win98-btn px-5 py-1 font-bold text-[11px] min-w-[75px]"
            >
              OK
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="win98-btn px-5 py-1 text-[11px] min-w-[75px]"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
