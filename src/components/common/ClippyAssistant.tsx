import React, { useState } from 'react';
import { SoundEngine } from '../../services/soundEngine';

interface ClippyAssistantProps {
  onOpenApp: (appId: any) => void;
  onTriggerBSOD: () => void;
}

export const ClippyAssistant: React.FC<ClippyAssistantProps> = ({
  onOpenApp,
  onTriggerBSOD,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    {
      text: "It looks like you're exploring Windows 98! What would you like to do today?",
      options: [
        { label: "Play Super Mario Bros.", action: () => onOpenApp('mario') },
        { label: "View Pictures in My Documents", action: () => onOpenApp('image_viewer') },
        { label: "Write a letter in WordPad", action: () => onOpenApp('wordpad') },
        { label: "Play 3D Space Cadet Pinball", action: () => onOpenApp('pinball') },
      ]
    },
    {
      text: "Tip of the Day: You can right-click the desktop at any time to customize your wallpaper or create a new document.",
      options: [
        { label: "Open Display Properties", action: () => onOpenApp('control_panel') },
        { label: "Launch Internet Explorer", action: () => onOpenApp('internet_explorer') },
        { label: "Close Assistant", action: () => setIsOpen(false) }
      ]
    },
    {
      text: "Windows 98 Second Edition includes improved USB support, Internet Connection Sharing, and DirectX 6.1.",
      options: [
        { label: "Open System Properties", action: () => onOpenApp('system_properties') },
        { label: "Listen to Winamp", action: () => onOpenApp('winamp') },
        { label: "Simulate System Crash (BSOD)", action: () => onTriggerBSOD() }
      ]
    }
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => { setIsOpen(true); SoundEngine.playDing(); }}
        className="fixed bottom-10 right-4 z-40 win98-btn p-1.5 flex items-center gap-1.5 bg-yellow-100 shadow-lg text-[11px]"
        title="Call Office Assistant"
      >
        <span>📎</span>
        <span className="font-bold">Assistant</span>
      </button>
    );
  }

  const currentMsg = messages[messageIndex % messages.length];

  return (
    <div className="fixed bottom-10 right-4 z-40 flex items-end gap-2 font-sans select-none animate-in fade-in slide-in-from-bottom-2 duration-200">
      {/* Speech Bubble */}
      <div className="win98-box-raised bg-[#ffffcc] border-2 border-black p-2.5 max-w-xs shadow-2xl text-[11px] text-black">
        <div className="flex justify-between items-start mb-1">
          <span className="font-bold text-[#000080]">Microsoft Office Assistant</span>
          <button
            onClick={() => setIsOpen(false)}
            className="win98-btn w-3.5 h-3.5 text-[8px] flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        <p className="mb-2 leading-relaxed text-[11px]">
          {currentMsg.text}
        </p>

        <div className="space-y-1">
          {currentMsg.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => {
                SoundEngine.playDing();
                opt.action();
              }}
              className="win98-btn w-full text-left px-2 py-1 text-[10px] hover:bg-yellow-200 block truncate"
            >
              • {opt.label}
            </button>
          ))}
        </div>

        <div className="mt-2 pt-1 border-t border-gray-400 flex justify-between text-[9px] text-gray-500">
          <button
            onClick={() => setMessageIndex(i => i + 1)}
            className="hover:underline text-blue-800"
          >
            Next tip »
          </button>
          <span>Windows 98 Help</span>
        </div>
      </div>

      {/* Clippy SVG Character */}
      <div
        onClick={() => { SoundEngine.playDing(); setMessageIndex(i => i + 1); }}
        className="cursor-pointer hover:scale-105 transition-transform"
        title="Click Clippy for tips"
      >
        <svg width="48" height="58" viewBox="0 0 48 58" fill="none">
          <path
            d="M16 48V16C16 10 22 6 28 6C34 6 40 10 40 16V42C40 48 35 52 30 52C25 52 20 48 20 42V18C20 14 23 11 26 11C29 11 32 14 32 18V40"
            stroke="#808080"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M16 48V16C16 10 22 6 28 6C34 6 40 10 40 16V42C40 48 35 52 30 52C25 52 20 48 20 42V18C20 14 23 11 26 11C29 11 32 14 32 18V40"
            stroke="#d8d8d8"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <ellipse cx="23" cy="20" rx="3.5" ry="5" fill="#ffffff" stroke="#000000" strokeWidth="1" />
          <ellipse cx="33" cy="20" rx="3.5" ry="5" fill="#ffffff" stroke="#000000" strokeWidth="1" />
          <circle cx="24" cy="20" r="2" fill="#000000" />
          <circle cx="34" cy="20" r="2" fill="#000000" />
          <path d="M19 13C21 11 25 11 26 13" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M30 13C32 11 36 11 38 13" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};
