import React, { useState } from 'react';
import { FileItem, WindowId } from '../../types/win98';
import { WinIcon } from '../common/WinIcon';
import { INITIAL_FILESYSTEM } from '../../services/fileSystem';
import { SoundEngine } from '../../services/soundEngine';

interface FileExplorerAppProps {
  initialFolderId?: string;
  onOpenFile: (file: FileItem) => void;
  onOpenApp: (appId: WindowId, extraData?: any) => void;
}

export const FileExplorerApp: React.FC<FileExplorerAppProps> = ({
  initialFolderId = 'root',
  onOpenFile,
  onOpenApp,
}) => {
  const [currentFolderId, setCurrentFolderId] = useState<string>(initialFolderId);
  const [history, setHistory] = useState<string[]>([initialFolderId]);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'large' | 'details'>('large');

  // Helper to find folder by id
  const findFolder = (node: FileItem, id: string): FileItem | null => {
    if (node.id === id) return node;
    if (node.children) {
      for (const child of node.children) {
        const found = findFolder(child, id);
        if (found) return found;
      }
    }
    return null;
  };

  // Helper to get path string
  const getPath = (node: FileItem, targetId: string, currentPath: string[] = []): string[] | null => {
    if (node.id === targetId) return [...currentPath, node.name];
    if (node.children) {
      for (const child of node.children) {
        const p = getPath(child, targetId, [...currentPath, node.name]);
        if (p) return p;
      }
    }
    return null;
  };

  const currentFolder = findFolder(INITIAL_FILESYSTEM, currentFolderId) || INITIAL_FILESYSTEM;
  const pathParts = getPath(INITIAL_FILESYSTEM, currentFolderId) || ['My Computer'];
  const pathString = pathParts.join('\\');

  const navigateTo = (folderId: string) => {
    SoundEngine.playDing();
    setHistory(prev => [...prev, folderId]);
    setCurrentFolderId(folderId);
    setSelectedFileId(null);
  };

  const handleBack = () => {
    if (history.length > 1) {
      const prev = history[history.length - 2];
      setHistory(h => h.slice(0, -1));
      setCurrentFolderId(prev);
      setSelectedFileId(null);
    }
  };

  const handleUp = () => {
    // Find parent
    const findParent = (node: FileItem, targetId: string, parent: FileItem | null = null): FileItem | null => {
      if (node.id === targetId) return parent;
      if (node.children) {
        for (const child of node.children) {
          const res = findParent(child, targetId, node);
          if (res) return res;
        }
      }
      return null;
    };
    const parent = findParent(INITIAL_FILESYSTEM, currentFolderId);
    if (parent) {
      navigateTo(parent.id);
    }
  };

  const handleItemClick = (file: FileItem) => {
    setSelectedFileId(file.id);
  };

  const handleItemDoubleClick = (file: FileItem) => {
    if (file.type === 'folder' || file.type === 'system') {
      if (file.id === 'drive_a') {
        SoundEngine.playError();
        alert('A:\\ is not accessible.\nThe device is not ready. Please insert a floppy disk.');
        return;
      }
      navigateTo(file.id);
    } else if (file.appTarget) {
      onOpenApp(file.appTarget);
    } else {
      onOpenFile(file);
    }
  };

  const files = currentFolder.children || [];

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0] text-black text-[11px] select-none font-sans">
      {/* Standard Toolbar */}
      <div className="p-1 border-b border-[#808080] flex items-center gap-1 bg-[#c0c0c0] shrink-0 overflow-x-auto">
        <button
          onClick={handleBack}
          disabled={history.length <= 1}
          className="win98-btn px-2 py-0.5 flex items-center gap-1 text-[11px] disabled:opacity-50"
        >
          <span>◄</span> Back
        </button>
        <button
          onClick={handleUp}
          disabled={currentFolderId === 'root'}
          className="win98-btn px-2 py-0.5 flex items-center gap-1 text-[11px] disabled:opacity-50"
        >
          <span>▲</span> Up
        </button>
        <div className="h-4 w-[1px] bg-gray-400 mx-1" />
        <button
          onClick={() => setViewMode(viewMode === 'large' ? 'details' : 'large')}
          className="win98-btn px-2 py-0.5 text-[11px] flex items-center gap-1"
        >
          <span>▤</span> {viewMode === 'large' ? 'Details' : 'Large Icons'}
        </button>
      </div>

      {/* Address Bar */}
      <div className="px-1 py-1 border-b border-[#808080] flex items-center gap-2 bg-[#c0c0c0] shrink-0">
        <span className="text-[11px] text-gray-700">Address:</span>
        <div className="flex-1 win98-box-sunken px-2 py-0.5 text-[11px] font-sans bg-white truncate">
          {pathString}
        </div>
      </div>

      {/* Main Files View */}
      <div className="flex-1 bg-white win98-box-sunken p-2 overflow-y-auto">
        {files.length === 0 ? (
          <div className="text-gray-500 italic p-4 text-center">This folder is empty.</div>
        ) : viewMode === 'large' ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {files.map((file) => {
              const isSelected = selectedFileId === file.id;
              return (
                <div
                  key={file.id}
                  onClick={() => handleItemClick(file)}
                  onDoubleClick={() => handleItemDoubleClick(file)}
                  className={`flex flex-col items-center p-1.5 cursor-pointer rounded-none text-center ${
                    isSelected ? 'bg-[#000080] text-white' : 'hover:bg-blue-50 text-black'
                  }`}
                >
                  <WinIcon name={file.icon} size={32} />
                  <span className="text-[11px] mt-1 break-words line-clamp-2 max-w-[85px] leading-tight select-none">
                    {file.name}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            <div className="grid grid-cols-12 font-bold text-[10px] text-gray-600 pb-1 border-b border-gray-300">
              <span className="col-span-6">Name</span>
              <span className="col-span-3">Size</span>
              <span className="col-span-3">Type</span>
            </div>
            {files.map((file) => {
              const isSelected = selectedFileId === file.id;
              return (
                <div
                  key={file.id}
                  onClick={() => handleItemClick(file)}
                  onDoubleClick={() => handleItemDoubleClick(file)}
                  className={`grid grid-cols-12 items-center py-1 px-1 cursor-pointer text-[11px] ${
                    isSelected ? 'bg-[#000080] text-white' : 'hover:bg-blue-50 text-black'
                  }`}
                >
                  <div className="col-span-6 flex items-center gap-1.5 truncate">
                    <WinIcon name={file.icon} size={16} />
                    <span className="truncate">{file.name}</span>
                  </div>
                  <div className="col-span-3 text-gray-500 truncate">{file.size || '--'}</div>
                  <div className="col-span-3 text-gray-500 uppercase truncate text-[10px]">{file.type}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="px-2 py-0.5 border-t border-[#808080] flex items-center justify-between text-[10px] bg-[#c0c0c0] text-black shrink-0">
        <div>{files.length} object(s)</div>
        <div>
          {selectedFileId
            ? files.find(f => f.id === selectedFileId)?.size || 'Selected'
            : '0 bytes'}
        </div>
      </div>
    </div>
  );
};
