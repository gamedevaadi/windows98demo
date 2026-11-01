import React from 'react';

interface WinIconProps {
  name: string;
  size?: number;
  className?: string;
}

const EXTRACTED_ICON_MAP: Record<string, string> = {
  my_computer: '/assets/icons/my_computer.png',
  computer: '/assets/icons/my_computer.png',
  windows_explorer: '/assets/icons/windows_explorer.png',
  my_documents: '/assets/icons/my_documents.png',
  notepad: '/assets/icons/notepad.png',
  internet_explorer: '/assets/icons/internet_explorer.png',
  ie: '/assets/icons/internet_explorer.png',
  paint: '/assets/icons/paint.png',
  network_neighborhood: '/assets/icons/network_neighborhood.png',
  calculator: '/assets/icons/calculator.png',
  calc: '/assets/icons/calculator.png',
  recycle_bin: '/assets/icons/recycle_bin.png',
  recycle_bin_full: '/assets/icons/recycle_bin.png',
  minesweeper: '/assets/icons/minesweeper.png',
  mine: '/assets/icons/minesweeper.png',
  outlook: '/assets/icons/outlook.png',
  wordpad: '/assets/icons/wordpad.png',
};

export const WinIcon: React.FC<WinIconProps> = ({ name, size = 32, className = '' }) => {
  const s = size;

  // Check if we have the authentic extracted PNG icon from the user's screenshot
  if (EXTRACTED_ICON_MAP[name]) {
    return (
      <img
        src={EXTRACTED_ICON_MAP[name]}
        alt={name}
        width={s}
        height={s}
        style={{
          imageRendering: 'pixelated',
          objectFit: 'contain',
        }}
        className={`select-none pointer-events-none shrink-0 ${className}`}
        loading="eager"
      />
    );
  }

  // Fallback authentic SVG pixel icons for system/accessories
  switch (name) {
    case 'mario':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          {/* Mario Cap */}
          <rect x="8" y="4" width="16" height="6" fill="#e52521" />
          <rect x="18" y="6" width="8" height="4" fill="#e52521" />
          {/* Face */}
          <rect x="8" y="10" width="14" height="6" fill="#fccc98" />
          <rect x="18" y="10" width="4" height="3" fill="#6b4423" />
          <rect x="14" y="13" width="10" height="3" fill="#6b4423" />
          {/* Overalls & Shirt */}
          <rect x="6" y="16" width="18" height="8" fill="#e52521" />
          <rect x="10" y="18" width="10" height="6" fill="#0026ff" />
          <circle cx="12" cy="20" r="1" fill="#ffeb3b" />
          <circle cx="18" cy="20" r="1" fill="#ffeb3b" />
          {/* Shoes */}
          <rect x="6" y="24" width="8" height="4" fill="#6b4423" />
          <rect x="16" y="24" width="8" height="4" fill="#6b4423" />
        </svg>
      );

    case 'folder':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          <path d="M4 6H12L15 9H28V26H4V6Z" fill="#ffcc00" stroke="#806000" strokeWidth="1" />
          <rect x="7" y="8" width="18" height="10" fill="#ffffff" stroke="#808080" strokeWidth="1" />
          <polygon points="3,12 29,12 26,27 3,27" fill="#ffdd33" stroke="#806000" strokeWidth="1" />
          <line x1="5" y1="13" x2="27" y2="13" stroke="#fff8a0" strokeWidth="1" />
        </svg>
      );

    case 'cmd':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          <rect x="4" y="5" width="24" height="20" fill="#000000" stroke="#808080" strokeWidth="1" />
          <rect x="4" y="5" width="24" height="4" fill="#808080" />
          <text x="6" y="8" fontSize="3" fill="#ffffff" fontFamily="monospace">MS-DOS</text>
          <text x="7" y="14" fontSize="4" fill="#00ff00" fontFamily="monospace">C:\&gt;_</text>
        </svg>
      );

    case 'solitaire':
    case 'cards':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          <rect x="5" y="8" width="16" height="20" rx="1" fill="#ffffff" stroke="#000" strokeWidth="1" />
          <rect x="11" y="4" width="16" height="20" rx="1" fill="#ffffff" stroke="#000" strokeWidth="1" />
          <path d="M19 11C17 9 15 11 19 15C23 11 21 9 19 11Z" fill="#ff0000" />
          <text x="13" y="10" fontSize="5" fill="#ff0000" fontWeight="bold">A</text>
        </svg>
      );

    case 'winamp':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          <rect x="4" y="6" width="24" height="20" fill="#2d2d2d" stroke="#000" strokeWidth="1" />
          <polygon points="17,8 10,18 16,18 14,24 23,13 17,13" fill="#f5b300" stroke="#d09000" strokeWidth="0.5" />
        </svg>
      );

    case 'pinball':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          <rect x="5" y="4" width="22" height="24" fill="#101030" stroke="#c0c0c0" strokeWidth="1" />
          <circle cx="16" cy="12" r="4" fill="#ff0055" stroke="#ffff00" strokeWidth="1" />
          <circle cx="11" cy="20" r="3" fill="#00ccff" />
          <circle cx="21" cy="20" r="3" fill="#00ccff" />
          <line x1="12" y1="24" x2="15" y2="25" stroke="#ffff00" strokeWidth="2" />
          <line x1="20" y1="24" x2="17" y2="25" stroke="#ffff00" strokeWidth="2" />
        </svg>
      );

    case 'help':
    case 'welcome':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          <path d="M6 7C6 7 11 5 16 7C21 5 26 7 26 7V25C26 25 21 23 16 25C11 23 6 25 6 25V7Z" fill="#ffffcc" stroke="#806000" strokeWidth="1" />
          <line x1="16" y1="7" x2="16" y2="25" stroke="#806000" />
          <text x="16" y="19" fontSize="11" fontWeight="bold" fill="#000080" textAnchor="middle">?</text>
        </svg>
      );

    case 'system_properties':
    case 'settings':
    case 'control_panel':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          <rect x="4" y="6" width="18" height="14" fill="#008080" stroke="#000" strokeWidth="1" />
          <rect x="7" y="20" width="12" height="3" fill="#c0c0c0" stroke="#000" strokeWidth="1" />
          <circle cx="21" cy="20" r="6" fill="#808080" stroke="#000" strokeWidth="1" />
          <circle cx="21" cy="20" r="2.5" fill="#ffffff" />
        </svg>
      );

    case 'windows_flag':
    case 'start':
      return (
        <svg width={s} height={s} viewBox="0 0 16 16" fill="none" className={className}>
          <path d="M1 2.5L7 1.5V7.5L1 7.5V2.5Z" fill="#ff4b2b" />
          <path d="M8 1.4L15 0.5V7.5L8 7.5V1.4Z" fill="#28b463" />
          <path d="M1 8.5L7 8.5V14.5L1 13.5V8.5Z" fill="#1e90ff" />
          <path d="M8 8.5L15 8.5V15.5L8 14.5V8.5Z" fill="#f4d03f" />
        </svg>
      );

    case 'drive':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          <rect x="4" y="10" width="24" height="12" fill="#c0c0c0" stroke="#000" strokeWidth="1" />
          <line x1="8" y1="16" x2="20" y2="16" stroke="#000" strokeWidth="1.5" />
          <circle cx="23" cy="16" r="1.5" fill="#00ff00" />
        </svg>
      );

    case 'floppy':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          <rect x="6" y="5" width="20" height="22" fill="#101010" stroke="#808080" strokeWidth="1" />
          <rect x="10" y="5" width="12" height="9" fill="#c0c0c0" stroke="#404040" strokeWidth="1" />
          <rect x="9" y="17" width="14" height="9" fill="#ffffff" />
        </svg>
      );

    case 'cd':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          <circle cx="16" cy="16" r="12" fill="#d8e8f8" stroke="#808080" strokeWidth="1" />
          <circle cx="16" cy="16" r="4" fill="#ffffff" stroke="#808080" strokeWidth="1" />
        </svg>
      );

    case 'image':
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          <rect x="4" y="5" width="24" height="22" fill="#ffffff" stroke="#808080" strokeWidth="1" />
          <rect x="6" y="7" width="20" height="15" fill="#80a0ff" />
          <circle cx="11" cy="11" r="2" fill="#ffdd00" />
          <polygon points="7,20 12,14 17,18 21,13 25,20" fill="#208030" />
        </svg>
      );

    default:
      return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none" className={className}>
          <rect x="6" y="5" width="20" height="22" fill="#ffffff" stroke="#808080" strokeWidth="1" />
          <line x1="10" y1="10" x2="22" y2="10" stroke="#808080" />
          <line x1="10" y1="14" x2="22" y2="14" stroke="#808080" />
        </svg>
      );
  }
};
