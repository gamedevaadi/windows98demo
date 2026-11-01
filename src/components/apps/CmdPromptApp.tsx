import React, { useState, useRef, useEffect } from 'react';
import { SoundEngine } from '../../services/soundEngine';

interface CmdPromptAppProps {
  onClose?: () => void;
  onTriggerBSOD?: () => void;
}

export const CmdPromptApp: React.FC<CmdPromptAppProps> = ({ onClose, onTriggerBSOD }) => {
  const [history, setHistory] = useState<string[]>([
    'Microsoft(R) Windows 98',
    '   (C)Copyright Microsoft Corp 1981-1998.',
    '',
    'C:\\WINDOWS> echo Welcome to the Abandoned PC terminal. Type HELP for commands.',
    'Welcome to the Abandoned PC terminal. Type HELP for commands.',
    ''
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isMatrixMode]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    const parts = trimmed.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    const newHistory = [...history, `C:\\WINDOWS> ${cmd}`];

    switch (mainCmd) {
      case 'help':
        newHistory.push(
          'Supported commands:',
          '  DIR        - List files in current directory',
          '  VER        - Show Windows version',
          '  CLS        - Clear terminal screen',
          '  MATRIX     - Activate green digital rain',
          '  HACK       - Run penetration testing sequence',
          '  OPENLAKE   - Gandhi Hackathon judge Easter egg',
          '  MERAZ      - IIT Bhilai fest time capsule',
          '  CRASH      - Trigger Blue Screen of Death',
          '  FORMAT C:  - Format primary hard drive',
          '  EXIT       - Close command prompt'
        );
        SoundEngine.playDing();
        break;

      case 'dir':
        newHistory.push(
          ' Volume in drive C has no label',
          ' Volume Serial Number is 1337-1998',
          ' Directory of C:\\WINDOWS',
          '',
          '05/11/1998  08:01 PM    <DIR>          .',
          '05/11/1998  08:01 PM    <DIR>          ..',
          '05/11/1998  08:01 PM    <DIR>          SYSTEM32',
          '05/11/1998  08:01 PM    <DIR>          MY DOCUMENTS',
          '05/11/1998  08:01 PM    <DIR>          GAMES',
          '12/07/1998  10:42 PM           412,480 WORLD_CUP_1998.JPG',
          '19/12/1997  08:15 PM           388,124 TITANIC_1997.JPG',
          '14/08/1998  04:15 PM           482,100 PORTRAIT_1998.JPG',
          '02/08/2001  01:23 AM             4,280 9-11-ATTACK-PLANNING.TXT',
          '               4 File(s)        807,724 bytes',
          '               5 Dir(s)   3,412,192,256 bytes free'
        );
        SoundEngine.playDing();
        break;

      case 'ver':
        newHistory.push('Microsoft Windows 98 [Version 4.10.2222]');
        break;

      case 'cls':
        setHistory([]);
        return;

      case 'matrix':
        setIsMatrixMode(true);
        newHistory.push('Entering the Matrix... Press ANY KEY to exit.');
        SoundEngine.playChord();
        break;

      case 'mem':
        newHistory.push(
          'Memory Type        Total       Used       Free',
          '----------------  ---------  ---------  ---------',
          'Conventional        640K        42K       598K',
          'Upper                 0K         0K         0K',
          'Extended (XMS)    64,512K     3,840K    60,672K',
          '----------------  ---------  ---------  ---------',
          'Total memory      65,152K     3,882K    61,270K',
          '',
          'Total under 1 MB    640K        42K       598K',
          'Largest executable program size:       597K (611,840 bytes)'
        );
        SoundEngine.playDing();
        break;

      case 'crash':
      case 'bsod':
        if (onTriggerBSOD) {
          onTriggerBSOD();
          return;
        }
        break;

      case 'format':
      case 'format c:':
        newHistory.push(
          'WARNING: ALL DATA ON FIXED DISK DRIVE C: WILL BE LOST!',
          'Are you sure? Just kidding, your abandoned PC is safe :)'
        );
        SoundEngine.playExclamation();
        break;

      case 'exit':
        onClose?.();
        return;

      case '':
        break;

      default:
        newHistory.push(`Bad command or file name: "${cmd}"`);
        SoundEngine.playError();
        break;
    }

    setHistory(newHistory);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isMatrixMode) {
      setIsMatrixMode(false);
      return;
    }
    if (e.key === 'Enter') {
      handleCommand(inputVal);
      setInputVal('');
    }
  };

  return (
    <div
      onClick={() => isMatrixMode && setIsMatrixMode(false)}
      className="flex flex-col h-full bg-black text-green-400 font-mono text-[12px] p-2 select-text overflow-hidden"
    >
      {isMatrixMode ? (
        <div className="flex-1 overflow-hidden text-green-500 animate-pulse text-[11px] leading-tight space-y-1">
          {Array.from({ length: 22 }).map((_, i) => (
            <div key={i} className="truncate">
              {Array.from({ length: 70 })
                .map(() => String.fromCharCode(33 + Math.floor(Math.random() * 90)))
                .join('')}
            </div>
          ))}
          <div className="text-white font-bold text-center mt-4">
            [ MATRIX ACTIVE - CLICK OR PRESS KEY TO RETURN ]
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-0.5">
          {history.map((line, idx) => (
            <div key={idx} className="whitespace-pre-wrap leading-tight">
              {line}
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-1">
            <span className="text-white">C:\WINDOWS&gt;</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-green-400 outline-none border-none font-mono text-[12px] caret-green-400"
              autoFocus
            />
          </div>
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
};
