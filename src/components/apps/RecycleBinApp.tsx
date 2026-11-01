import React, { useState } from 'react';
import { FileItem } from '../../types/win98';
import { RECYCLE_BIN_ITEMS } from '../../services/fileSystem';
import { WinIcon } from '../common/WinIcon';
import { SoundEngine } from '../../services/soundEngine';

interface RecycleBinAppProps {
  onOpenFile: (file: FileItem) => void;
}

export const RecycleBinApp: React.FC<RecycleBinAppProps> = ({ onOpenFile }) => {
  const [items, setItems] = useState<FileItem[]>(RECYCLE_BIN_ITEMS);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleEmptyBin = () => {
    if (items.length === 0) return;
    if (confirm('Are you sure you want to permanently delete these items?')) {
      SoundEngine.playTrash();
      setItems([]);
      setSelectedId(null);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0] text-black text-[11px] select-none font-sans">
      {/* Toolbar */}
      <div className="p-1 border-b border-[#808080] flex items-center gap-2 bg-[#c0c0c0] shrink-0">
        <button
          onClick={handleEmptyBin}
          disabled={items.length === 0}
          className="win98-btn px-2 py-0.5 font-bold flex items-center gap-1 disabled:opacity-50"
        >
          <span>🗑</span> Empty Recycle Bin
        </button>
        <button
          onClick={() => {
            setItems(RECYCLE_BIN_ITEMS);
            SoundEngine.playDing();
          }}
          className="win98-btn px-2 py-0.5"
        >
          Restore All Items
        </button>
      </div>

      {/* Main Files View */}
      <div className="flex-1 bg-white win98-box-sunken p-2 overflow-y-auto">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 italic p-4">
            <WinIcon name="recycle_bin_empty" size={48} className="opacity-60 mb-2" />
            <div>The Recycle Bin is empty.</div>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {items.map((file) => {
              const isSelected = selectedId === file.id;
              return (
                <div
                  key={file.id}
                  onClick={() => setSelectedId(file.id)}
                  onDoubleClick={() => onOpenFile(file)}
                  className={`flex flex-col items-center p-1.5 cursor-pointer text-center ${
                    isSelected ? 'bg-[#000080] text-white' : 'hover:bg-blue-50 text-black'
                  }`}
                >
                  <WinIcon name={file.icon} size={32} />
                  <span className="text-[11px] mt-1 break-words line-clamp-2 max-w-[90px] leading-tight">
                    {file.name}
                  </span>
                  <span className="text-[9px] text-gray-500 mt-0.5">{file.size}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="px-2 py-0.5 border-t border-[#808080] flex items-center justify-between text-[10px] bg-[#c0c0c0] text-black shrink-0">
        <div>{items.length} object(s)</div>
        <div>{items.length > 0 ? 'Trash contents preserved from 1998' : 'Empty'}</div>
      </div>
    </div>
  );
};
