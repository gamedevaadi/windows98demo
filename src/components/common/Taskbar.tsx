import React, { useState, useEffect } from 'react';
import { WinIcon } from './WinIcon';
import { WindowState } from '../../types/win98';
import { SoundEngine } from '../../services/soundEngine';

interface TaskbarProps {
  isStartOpen: boolean;
  onToggleStart: () => void;
  openWindows: WindowState[];
  activeWindowId: string | null;
  onSelectWindow: (id: any) => void;
  onShowDesktop: () => void;
  onOpenApp: (id: any) => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  isStartOpen,
  onToggleStart,
  openWindows,
  activeWindowId,
  onSelectWindow,
  onShowDesktop,
  onOpenApp,
}) => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const minStr = minutes < 10 ? '0' + minutes : minutes;
      setCurrentTime(`${hours}:${minStr} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[30px] bg-[#c0c0c0] border-t-2 border-[#ffffff] flex items-center justify-between px-1 z-[9999] select-none font-sans text-[11px] shadow">
      {/* Left Area: Start Button + Quick Launch */}
      <div className="flex items-center gap-1.5 h-full py-0.5">
        {/* Start Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            SoundEngine.playDing();
            onToggleStart();
          }}
          className={`win98-btn h-full px-2 flex items-center gap-1.5 font-bold text-[11px] ${
            isStartOpen ? 'win98-btn-pressed bg-[#dfdfdf]' : ''
          }`}
        >
          <WinIcon name="start" size={16} />
          <span className="tracking-tight text-black">Start</span>
        </button>

        {/* Vertical divider */}
        <div className="h-5 w-[2px] border-l border-[#808080] border-r border-[#ffffff] mx-0.5" />

        {/* Quick Launch Icons */}
        <div className="flex items-center gap-1">
          <button
            onClick={onShowDesktop}
            className="win98-btn w-5 h-5 flex items-center justify-center p-0.5 hover:bg-white"
            title="Show Desktop"
          >
            <WinIcon name="computer" size={14} />
          </button>
          <button
            onClick={() => onOpenApp('internet_explorer')}
            className="win98-btn w-5 h-5 flex items-center justify-center p-0.5 hover:bg-white"
            title="Launch Internet Explorer"
          >
            <WinIcon name="ie" size={14} />
          </button>
          <button
            onClick={() => onOpenApp('outlook')}
            className="win98-btn w-5 h-5 flex items-center justify-center p-0.5 hover:bg-white"
            title="Launch Outlook Express"
          >
            <WinIcon name="outlook" size={14} />
          </button>
        </div>

        {/* Vertical divider */}
        <div className="h-5 w-[2px] border-l border-[#808080] border-r border-[#ffffff] mx-0.5" />
      </div>

      {/* Middle Area: Open Window Tabs */}
      <div className="flex-1 flex items-center gap-1 px-1 h-full py-0.5 overflow-x-auto">
        {openWindows.map((win) => {
          const isActive = activeWindowId === win.id && !win.isMinimized;
          return (
            <button
              key={win.id}
              onClick={() => onSelectWindow(win.id)}
              className={`h-full min-w-[120px] max-w-[160px] px-2 flex items-center gap-1.5 text-left truncate text-[11px] ${
                isActive
                  ? 'win98-btn-pressed bg-[#e0e0e0] font-bold border-t-2 border-l-2 border-black'
                  : 'win98-btn font-normal bg-[#c0c0c0]'
              }`}
            >
              <WinIcon name={win.icon} size={14} className="shrink-0" />
              <span className="truncate">{win.title}</span>
            </button>
          );
        })}
      </div>

      {/* Right Area: System Tray (Notification Area) */}
      <div className="win98-box-sunken-gray h-[24px] px-2 flex items-center gap-2 bg-[#c0c0c0] shrink-0 text-black">
        {/* Connection status */}
        <span title="Dial-up Connection: 56,600 bps" className="cursor-pointer text-[10px]">
          🌐
        </span>

        {/* Speaker Volume */}
        <button
          onClick={() => {
            SoundEngine.playDing();
            alert('Master Volume: 80% (Sound Blaster Live!)');
          }}
          className="cursor-pointer text-[11px]"
          title="Volume Control"
        >
          🔊
        </button>

        {/* Task Scheduler */}
        <span title="Task Scheduler: Y2K Bug Monitoring Active" className="cursor-pointer text-[10px]">
          🕒
        </span>

        {/* Digital Clock */}
        <span
          className="font-sans text-[11px] tracking-tight ml-1"
          title="Sunday, 1 November 2026 - Gandhi Hackathon Day"
        >
          {currentTime || '5:03 PM'}
        </span>
      </div>
    </div>
  );
};
