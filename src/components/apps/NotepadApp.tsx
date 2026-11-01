import React, { useState } from 'react';
import { SoundEngine } from '../../services/soundEngine';

interface NotepadAppProps {
  initialContent?: string;
  initialFileName?: string;
}

export const NotepadApp: React.FC<NotepadAppProps> = ({
  initialContent = '',
  initialFileName = 'Untitled.txt',
}) => {
  const [content, setContent] = useState(initialContent);
  const [wordWrap, setWordWrap] = useState(true);
  const [fileName, setFileName] = useState(initialFileName);

  const handleSave = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
    SoundEngine.playDing();
  };

  const lineCount = content.split('\n').length;
  const charCount = content.length;

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0] text-black text-[11px] select-none font-sans">
      {/* Menu Bar */}
      <div className="bg-[#c0c0c0] border-b border-[#808080] flex items-center px-1 py-0.5 gap-3 text-[11px]">
        <button
          onClick={() => { setContent(''); setFileName('Untitled.txt'); SoundEngine.playDing(); }}
          className="hover:bg-[#000080] hover:text-white px-1 leading-tight"
        >
          <u>N</u>ew
        </button>
        <button
          onClick={handleSave}
          className="hover:bg-[#000080] hover:text-white px-1 leading-tight font-bold"
        >
          <u>S</u>ave
        </button>
        <button
          onClick={() => setWordWrap(!wordWrap)}
          className="hover:bg-[#000080] hover:text-white px-1 leading-tight"
        >
          Word <u>W</u>rap ({wordWrap ? 'ON' : 'OFF'})
        </button>
      </div>

      {/* Text Area */}
      <div className="flex-1 win98-box-sunken bg-white p-1">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          wrap={wordWrap ? 'soft' : 'off'}
          className="w-full h-full p-2 outline-none border-none font-mono text-[12px] resize-none leading-relaxed text-black bg-white"
          placeholder="Type here..."
          autoFocus
        />
      </div>

      {/* Status Bar */}
      <div className="bg-[#c0c0c0] px-2 py-0.5 border-t border-[#808080] flex items-center justify-between text-[10px] text-gray-700 shrink-0">
        <div>{fileName}</div>
        <div className="flex gap-4">
          <div>Lines: {lineCount}</div>
          <div>Chars: {charCount}</div>
        </div>
      </div>
    </div>
  );
};
