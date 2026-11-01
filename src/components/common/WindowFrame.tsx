import React, { useState, useRef, useEffect, useCallback } from 'react';
import { WindowState } from '../../types/win98';
import { WinIcon } from './WinIcon';

interface WindowFrameProps {
  window: WindowState;
  isActive: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onUpdatePosition?: (x: number, y: number) => void;
  onUpdateSize?: (width: number, height: number) => void;
  children: React.ReactNode;
  menuItems?: { label: string; action?: () => void }[];
  statusText?: string;
  hasHelpBtn?: boolean;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({
  window,
  isActive,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onUpdatePosition,
  onUpdateSize,
  children,
  menuItems,
  statusText = 'Ready',
  hasHelpBtn = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; posX: number; posY: number }>({ startX: 0, startY: 0, posX: 0, posY: 0 });
  const resizeRef = useRef<{ startX: number; startY: number; startW: number; startH: number }>({ startX: 0, startY: 0, startW: 0, startH: 0 });

  // Handle Dragging
  const handleMouseDownTitle = (e: React.MouseEvent) => {
    if (window.isMaximized) return;
    onFocus();
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: window.position.x,
      posY: window.position.y,
    };
  };

  // Handle Resizing
  const handleMouseDownResize = (e: React.MouseEvent) => {
    if (window.isMaximized) return;
    e.stopPropagation();
    onFocus();
    setIsResizing(true);
    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startW: window.size.width,
      startH: window.size.height,
    };
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      const newX = Math.max(0, Math.min(dragRef.current.posX + dx, globalThis.window.innerWidth - 100));
      const newY = Math.max(0, Math.min(dragRef.current.posY + dy, globalThis.window.innerHeight - 80));
      onUpdatePosition?.(newX, newY);
    } else if (isResizing) {
      const dw = e.clientX - resizeRef.current.startX;
      const dh = e.clientY - resizeRef.current.startY;
      const newW = Math.max(260, Math.min(resizeRef.current.startW + dw, globalThis.window.innerWidth));
      const newH = Math.max(160, Math.min(resizeRef.current.startH + dh, globalThis.window.innerHeight - 40));
      onUpdateSize?.(newW, newH);
    }
  }, [isDragging, isResizing, onUpdatePosition, onUpdateSize]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isDragging || isResizing) {
      globalThis.window.addEventListener('mousemove', handleMouseMove);
      globalThis.window.addEventListener('mouseup', handleMouseUp);
      return () => {
        globalThis.window.removeEventListener('mousemove', handleMouseMove);
        globalThis.window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

  if (!window.isOpen || window.isMinimized) {
    return null;
  }

  const style: React.CSSProperties = window.isMaximized
    ? {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 30px)',
        zIndex: window.zIndex,
      }
    : {
        position: 'absolute',
        left: `${window.position.x}px`,
        top: `${window.position.y}px`,
        width: `${window.size.width}px`,
        height: `${window.size.height}px`,
        zIndex: window.zIndex,
      };

  return (
    <div
      style={style}
      onMouseDown={onFocus}
      className="win98-box-raised flex flex-col select-none text-[12px] shadow-xl overflow-hidden font-sans"
    >
      {/* Titlebar */}
      <div
        onMouseDown={handleMouseDownTitle}
        onDoubleClick={onMaximize}
        className={`px-1 py-0.5 flex items-center justify-between select-none cursor-default ${
          isActive ? 'win98-title-active' : 'win98-title-inactive'
        }`}
      >
        <div className="flex items-center gap-1.5 overflow-hidden pr-2">
          <WinIcon name={window.icon} size={16} className="shrink-0" />
          <span className="font-bold tracking-tight text-[11px] truncate text-white leading-none">
            {window.title}
          </span>
        </div>

        {/* Window Chrome Buttons */}
        <div className="flex items-center gap-[2px] shrink-0" onMouseDown={(e) => e.stopPropagation()}>
          {hasHelpBtn && (
            <button
              onClick={() => alert(`Help for ${window.title}: Abandoned Computer restored in 2026 for Gandhi Hackathon.`)}
              className="win98-btn w-[15px] h-[14px] flex items-center justify-center font-bold text-[10px] leading-none text-black"
              title="Help"
            >
              ?
            </button>
          )}
          <button
            onClick={onMinimize}
            className="win98-btn w-[15px] h-[14px] flex items-center justify-center font-bold text-[10px] leading-none text-black pb-1"
            title="Minimize"
          >
            _
          </button>
          <button
            onClick={onMaximize}
            className="win98-btn w-[15px] h-[14px] flex items-center justify-center font-bold text-[9px] leading-none text-black"
            title={window.isMaximized ? 'Restore' : 'Maximize'}
          >
            {window.isMaximized ? '❐' : '□'}
          </button>
          <button
            onClick={onClose}
            className="win98-btn w-[15px] h-[14px] flex items-center justify-center font-bold text-[10px] leading-none text-black"
            title="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Menu Bar if present */}
      {menuItems && menuItems.length > 0 && (
        <div className="bg-[#c0c0c0] border-b border-[#808080] flex items-center px-1 py-0.5 gap-3 text-[11px] text-black">
          {menuItems.map((item, idx) => (
            <span
              key={idx}
              onClick={item.action}
              className="cursor-pointer hover:bg-[#000080] hover:text-white px-1 leading-tight select-none"
            >
              <span className="underline">{item.label[0]}</span>
              {item.label.slice(1)}
            </span>
          ))}
        </div>
      )}

      {/* Window Body */}
      <div className="flex-1 flex flex-col min-h-0 bg-[#c0c0c0] p-[3px] overflow-hidden relative">
        {children}
      </div>

      {/* Status Bar */}
      {statusText && (
        <div className="bg-[#c0c0c0] px-1 py-0.5 border-t border-[#808080] flex items-center gap-2 text-[11px] text-black shrink-0">
          <div className="win98-box-sunken-gray flex-1 px-1 py-[1px] truncate text-[10px]">
            {statusText}
          </div>
          <div className="win98-box-sunken-gray w-20 px-1 py-[1px] text-right text-[10px]">
            100%
          </div>
        </div>
      )}

      {/* Resize Grip (bottom right corner) */}
      {!window.isMaximized && (
        <div
          onMouseDown={handleMouseDownResize}
          className="absolute bottom-0 right-0 w-3 h-3 cursor-nwse-resize z-50 flex items-end justify-end p-[1px]"
        >
          <svg width="6" height="6" viewBox="0 0 6 6">
            <line x1="5" y1="1" x2="1" y2="5" stroke="#808080" />
            <line x1="5" y1="3" x2="3" y2="5" stroke="#808080" />
            <line x1="5" y1="5" x2="5" y2="5" stroke="#808080" />
          </svg>
        </div>
      )}
    </div>
  );
};
