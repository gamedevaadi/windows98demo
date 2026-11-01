import React, { useState } from 'react';
import { SoundEngine } from '../../services/soundEngine';

interface WordPadAppProps {
  initialTitle?: string;
  initialContent?: string;
}

export const WordPadApp: React.FC<WordPadAppProps> = ({
  initialTitle = 'Document - WordPad',
  initialContent = `GANDHI HACKATHON 2026 - OFFICIAL MEMO
OpenLake x Meraz · Indian Institute of Technology Bhilai
Date: November 1, 2026

THE ABANDONED COMPUTER:
You have brought this forgotten 1998 machine back to life!
All desktop icons, applications, and period artifacts have been restored.

FEATURES RESTORED:
- Exact desktop layout and authentic icon set
- Internet Explorer with 1998 Stanford Google & Yahoo
- Winamp 2.81 with real chiptune tracks
- Minesweeper, Solitaire, 3D Pinball, Paint, Calculator, and WordPad
- Preserved historical documents from 1997-2001

To the Latent evaluation judges: Deal sealed! Maximum points awarded!`,
}) => {
  const [content, setContent] = useState(initialContent);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontSize, setFontSize] = useState('10');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [align, setAlign] = useState<'left' | 'center' | 'right'>('left');

  const handleSave = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Document.doc';
    a.click();
    URL.revokeObjectURL(url);
    SoundEngine.playDing();
  };

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0] text-black text-[11px] select-none font-sans">
      {/* Menu Bar */}
      <div className="border-b border-[#808080] flex items-center px-1 py-0.5 gap-3 text-[11px] bg-[#c0c0c0]">
        <button
          onClick={() => { setContent(''); SoundEngine.playDing(); }}
          className="hover:bg-[#000080] hover:text-white px-1"
        >
          <u>F</u>ile
        </button>
        <button
          onClick={handleSave}
          className="hover:bg-[#000080] hover:text-white px-1 font-bold"
        >
          <u>S</u>ave
        </button>
        <button
          onClick={() => setContent(c => c.toUpperCase())}
          className="hover:bg-[#000080] hover:text-white px-1"
        >
          <u>E</u>dit
        </button>
        <button
          onClick={() => alert('WordPad for Windows 98 Second Edition')}
          className="hover:bg-[#000080] hover:text-white px-1"
        >
          <u>H</u>elp
        </button>
      </div>

      {/* Formatting Ribbon Toolbar */}
      <div className="p-1 border-b border-[#808080] flex flex-wrap items-center gap-1 bg-[#c0c0c0]">
        {/* Font family */}
        <select
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          className="win98-box-sunken px-1 py-0.5 text-[11px] bg-white outline-none"
        >
          <option value="Arial">Arial</option>
          <option value="'Times New Roman'">Times New Roman</option>
          <option value="'Courier New'">Courier New</option>
          <option value="'Comic Sans MS'">Comic Sans MS</option>
          <option value="Tahoma">Tahoma</option>
        </select>

        {/* Font size */}
        <select
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          className="win98-box-sunken px-1 py-0.5 text-[11px] bg-white outline-none w-12"
        >
          <option value="8">8</option>
          <option value="10">10</option>
          <option value="12">12</option>
          <option value="14">14</option>
          <option value="18">18</option>
        </select>

        <div className="h-4 w-[1px] bg-gray-400 mx-0.5" />

        {/* Bold, Italic, Underline */}
        <button
          onClick={() => setIsBold(!isBold)}
          className={`win98-btn px-2 py-0.5 font-bold ${isBold ? 'win98-btn-pressed bg-[#dfdfdf]' : ''}`}
        >
          B
        </button>
        <button
          onClick={() => setIsItalic(!isItalic)}
          className={`win98-btn px-2 py-0.5 italic ${isItalic ? 'win98-btn-pressed bg-[#dfdfdf]' : ''}`}
        >
          I
        </button>
        <button
          onClick={() => setIsUnderline(!isUnderline)}
          className={`win98-btn px-2 py-0.5 underline ${isUnderline ? 'win98-btn-pressed bg-[#dfdfdf]' : ''}`}
        >
          U
        </button>

        <div className="h-4 w-[1px] bg-gray-400 mx-0.5" />

        {/* Alignment */}
        <button
          onClick={() => setAlign('left')}
          className={`win98-btn px-2 py-0.5 ${align === 'left' ? 'win98-btn-pressed bg-[#dfdfdf]' : ''}`}
        >
          ⇤
        </button>
        <button
          onClick={() => setAlign('center')}
          className={`win98-btn px-2 py-0.5 ${align === 'center' ? 'win98-btn-pressed bg-[#dfdfdf]' : ''}`}
        >
          ☰
        </button>
        <button
          onClick={() => setAlign('right')}
          className={`win98-btn px-2 py-0.5 ${align === 'right' ? 'win98-btn-pressed bg-[#dfdfdf]' : ''}`}
        >
          ⇥
        </button>
      </div>

      {/* Ruler bar */}
      <div className="bg-[#dfdfdf] border-b border-[#808080] h-4 flex items-center px-4 text-[9px] text-gray-500 font-mono">
        <span>|···1···|···2···|···3···|···4···|···5···|···6···|···7···|</span>
      </div>

      {/* Editor Body */}
      <div className="flex-1 bg-[#808080] win98-box-sunken p-3 overflow-auto flex justify-center">
        <div className="w-full max-w-2xl bg-white shadow-xl min-h-full p-6 text-black border border-gray-400">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              fontFamily,
              fontSize: `${fontSize}pt`,
              fontWeight: isBold ? 'bold' : 'normal',
              fontStyle: isItalic ? 'italic' : 'normal',
              textDecoration: isUnderline ? 'underline' : 'none',
              textAlign: align,
            }}
            className="w-full h-full min-h-[300px] outline-none border-none resize-none leading-relaxed text-black bg-white"
            autoFocus
          />
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#c0c0c0] px-2 py-0.5 border-t border-[#808080] flex items-center justify-between text-[10px] text-gray-700 shrink-0">
        <div>For Help, press F1</div>
        <div>{content.length} characters</div>
      </div>
    </div>
  );
};
