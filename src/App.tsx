import React, { useState, useEffect } from 'react';
import { WindowId, WindowState, DesktopIcon, FileItem } from './types/win98';
import { WinIcon } from './components/common/WinIcon';
import { WindowFrame } from './components/common/WindowFrame';
import { Taskbar } from './components/common/Taskbar';
import { StartMenu } from './components/common/StartMenu';
import { RunDialog } from './components/common/RunDialog';
import { ShutDownDialog } from './components/common/ShutDownDialog';
import { ShutDownScreen } from './components/common/ShutDownScreen';
import { BSOD } from './components/common/BSOD';
import { BootScreen } from './components/common/BootScreen';
import { LogonScreen } from './components/common/LogonScreen';
import { ClippyAssistant } from './components/common/ClippyAssistant';

// Apps
import { WelcomeApp } from './components/apps/WelcomeApp';
import { SystemPropertiesApp } from './components/apps/SystemPropertiesApp';
import { InternetExplorerApp } from './components/apps/InternetExplorerApp';
import { FileExplorerApp } from './components/apps/FileExplorerApp';
import { WinampApp } from './components/apps/WinampApp';
import { ImageViewerApp } from './components/apps/ImageViewerApp';
import { MinesweeperApp } from './components/apps/MinesweeperApp';
import { MarioApp } from './components/apps/MarioApp';
import { PinballApp } from './components/apps/PinballApp';
import { PaintApp } from './components/apps/PaintApp';
import { NotepadApp } from './components/apps/NotepadApp';
import { CalculatorApp } from './components/apps/CalculatorApp';
import { CmdPromptApp } from './components/apps/CmdPromptApp';
import { OutlookExpressApp } from './components/apps/OutlookExpressApp';
import { ControlPanelApp, DisplaySettings } from './components/apps/ControlPanelApp';
import { RecycleBinApp } from './components/apps/RecycleBinApp';
import { WordPadApp } from './components/apps/WordPadApp';
import { NetworkNeighborhoodApp } from './components/apps/NetworkNeighborhoodApp';

import { SoundEngine } from './services/soundEngine';

export default function App() {
  // System display settings
  const [settings, setSettings] = useState<DisplaySettings>({
    wallpaper: 'teal',
    enableCrtOverlay: false,
    enableSounds: true,
  });

  // Windows management state
  const [windows, setWindows] = useState<Record<WindowId, WindowState>>({
    welcome: {
      id: 'welcome',
      title: 'Welcome to Windows 98',
      icon: 'welcome',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: { x: 80, y: 50 },
      size: { width: 560, height: 420 },
      extraData: {},
    },
    system_properties: {
      id: 'system_properties',
      title: 'System Properties',
      icon: 'system_properties',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 9,
      position: { x: 120, y: 70 },
      size: { width: 440, height: 430 },
      extraData: {},
    },
    my_computer: {
      id: 'my_computer',
      title: 'My Computer',
      icon: 'computer',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 8,
      position: { x: 100, y: 60 },
      size: { width: 500, height: 360 },
      extraData: { folderId: 'root' },
    },
    my_documents: {
      id: 'my_documents',
      title: 'My Documents',
      icon: 'my_documents',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 7,
      position: { x: 140, y: 80 },
      size: { width: 540, height: 380 },
      extraData: { folderId: 'my_documents' },
    },
    internet_explorer: {
      id: 'internet_explorer',
      title: 'Microsoft Internet Explorer',
      icon: 'ie',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 6,
      position: { x: 60, y: 40 },
      size: { width: 680, height: 480 },
      extraData: {},
    },
    recycle_bin: {
      id: 'recycle_bin',
      title: 'Recycle Bin',
      icon: 'recycle_bin',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 5,
      position: { x: 160, y: 100 },
      size: { width: 480, height: 340 },
      extraData: {},
    },
    winamp: {
      id: 'winamp',
      title: 'Winamp',
      icon: 'winamp',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 15,
      position: { x: 260, y: 90 },
      size: { width: 320, height: 420 },
      extraData: {},
    },
    image_viewer: {
      id: 'image_viewer',
      title: 'Windows Imaging',
      icon: 'image',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 14,
      position: { x: 180, y: 70 },
      size: { width: 560, height: 440 },
      extraData: {},
    },
    minesweeper: {
      id: 'minesweeper',
      title: 'Minesweeper',
      icon: 'mine',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 13,
      position: { x: 220, y: 80 },
      size: { width: 250, height: 330 },
      extraData: {},
    },
    mario: {
      id: 'mario',
      title: 'Super Mario Bros.',
      icon: 'mario',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 12,
      position: { x: 120, y: 50 },
      size: { width: 520, height: 460 },
      extraData: {},
    },
    pinball: {
      id: 'pinball',
      title: '3D Pinball for Windows - Space Cadet',
      icon: 'pinball',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 16,
      position: { x: 160, y: 30 },
      size: { width: 420, height: 530 },
      extraData: {},
    },
    paint: {
      id: 'paint',
      title: 'untitled - Paint',
      icon: 'paint',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 11,
      position: { x: 110, y: 50 },
      size: { width: 600, height: 440 },
      extraData: {},
    },
    notepad: {
      id: 'notepad',
      title: 'Untitled - Notepad',
      icon: 'notepad',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: { x: 180, y: 90 },
      size: { width: 500, height: 360 },
      extraData: { content: '', fileName: 'Untitled.txt' },
    },
    calculator: {
      id: 'calculator',
      title: 'Calculator',
      icon: 'calc',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: { x: 250, y: 120 },
      size: { width: 280, height: 290 },
      extraData: {},
    },
    cmd: {
      id: 'cmd',
      title: 'MS-DOS Prompt',
      icon: 'cmd',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: { x: 130, y: 70 },
      size: { width: 580, height: 360 },
      extraData: {},
    },
    outlook: {
      id: 'outlook',
      title: 'Outlook Express',
      icon: 'outlook',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: { x: 90, y: 50 },
      size: { width: 620, height: 420 },
      extraData: {},
    },
    control_panel: {
      id: 'control_panel',
      title: 'Display Properties',
      icon: 'settings',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: { x: 150, y: 80 },
      size: { width: 440, height: 460 },
      extraData: {},
    },
    run_dialog: {
      id: 'run_dialog',
      title: 'Run',
      icon: 'cmd',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 100,
      position: { x: 200, y: 200 },
      size: { width: 360, height: 180 },
      extraData: {},
    },
    dialup: {
      id: 'dialup',
      title: 'Dial-Up Connection',
      icon: 'ie',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 50,
      position: { x: 200, y: 150 },
      size: { width: 360, height: 220 },
      extraData: {},
    },
    wordpad: {
      id: 'wordpad',
      title: 'Document - WordPad',
      icon: 'wordpad',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: { x: 140, y: 70 },
      size: { width: 580, height: 440 },
      extraData: {},
    },
    network_neighborhood: {
      id: 'network_neighborhood',
      title: 'Network Neighborhood',
      icon: 'network_neighborhood',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      position: { x: 160, y: 80 },
      size: { width: 520, height: 380 },
      extraData: {},
    },
  });

  const [topZ, setTopZ] = useState(20);
  const [activeWindowId, setActiveWindowId] = useState<WindowId | null>(null);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [selectedDesktopIcon, setSelectedDesktopIcon] = useState<string | null>(null);
  const [showRunDialog, setShowRunDialog] = useState(false);
  const [showShutDownDialog, setShowShutDownDialog] = useState(false);
  const [isShutDown, setIsShutDown] = useState(false);
  const [isBSOD, setIsBSOD] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [isLoggingOn, setIsLoggingOn] = useState(false);
  const [desktopContextMenu, setDesktopContextMenu] = useState<{ x: number; y: number } | null>(null);

  // Bring window to focus
  const focusWindow = (id: WindowId) => {
    const nextZ = topZ + 1;
    setTopZ(nextZ);
    setWindows(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: true,
        isMinimized: false,
        zIndex: nextZ,
      },
    }));
    setActiveWindowId(id);
    setIsStartOpen(false);
  };

  // Open / Toggle Window
  const openApp = (id: WindowId, extraData?: any) => {
    const nextZ = topZ + 1;
    setTopZ(nextZ);
    setWindows(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: true,
        isMinimized: false,
        zIndex: nextZ,
        extraData: extraData || prev[id].extraData,
      },
    }));
    setActiveWindowId(id);
    setIsStartOpen(false);
    SoundEngine.playDing();
  };

  const closeWindow = (id: WindowId) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false },
    }));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const minimizeWindow = (id: WindowId) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true },
    }));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const toggleMaximizeWindow = (id: WindowId) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMaximized: !prev[id].isMaximized },
    }));
  };

  const handleOpenFile = (file: FileItem) => {
    if (file.type === 'image') {
      openApp('image_viewer', { title: file.name, url: file.imageUrl });
    } else if (file.type === 'audio') {
      openApp('winamp');
    } else if (file.type === 'text') {
      openApp('notepad', { content: file.content || '', fileName: file.name });
    } else if (file.appTarget) {
      openApp(file.appTarget);
    } else {
      SoundEngine.playDing();
    }
  };

  // Desktop Icons List - Exact copy from screenshot
  const desktopIcons: DesktopIcon[] = [
    // Column 1 (from screenshot)
    { id: 'my_computer', title: 'My Computer', icon: 'my_computer', action: () => openApp('my_computer', { folderId: 'root' }) },
    { id: 'my_documents', title: 'My Documents', icon: 'my_documents', action: () => openApp('my_documents', { folderId: 'my_documents' }) },
    { id: 'internet_explorer', title: 'Internet Explorer', icon: 'internet_explorer', action: () => openApp('internet_explorer') },
    { id: 'network_neighborhood', title: 'Network Neighborhood', icon: 'network_neighborhood', action: () => openApp('network_neighborhood') },
    { id: 'recycle_bin', title: 'Recycle Bin', icon: 'recycle_bin', action: () => openApp('recycle_bin') },
    { id: 'outlook', title: 'Outlook', icon: 'outlook', action: () => openApp('outlook') },

    // Column 2 (from screenshot)
    { id: 'windows_explorer', title: 'Windows Explorer', icon: 'windows_explorer', action: () => openApp('my_computer', { folderId: 'root' }) },
    { id: 'notepad', title: 'Notepad', icon: 'notepad', action: () => openApp('notepad') },
    { id: 'paint', title: 'Paint', icon: 'paint', action: () => openApp('paint') },
    { id: 'calculator', title: 'Calculator', icon: 'calculator', action: () => openApp('calculator') },
    { id: 'minesweeper', title: 'Minesweeper', icon: 'minesweeper', action: () => openApp('minesweeper') },
    { id: 'wordpad', title: 'WordPad', icon: 'wordpad', action: () => openApp('wordpad') },

    // Column 3 (Additional restored system & entertainment tools)
    { id: 'welcome', title: 'Welcome to Windows 98', icon: 'welcome', action: () => openApp('welcome') },
    { id: 'system_properties', title: 'System Properties', icon: 'system_properties', action: () => openApp('system_properties') },
    { id: 'winamp', title: 'Winamp', icon: 'winamp', action: () => openApp('winamp') },
    { id: 'mario', title: 'Super Mario Bros.', icon: 'mario', action: () => openApp('mario') },
    { id: 'cmd', title: 'MS-DOS Prompt', icon: 'cmd', action: () => openApp('cmd') },
  ];

  const openWindowsList = Object.values(windows).filter(w => w.isOpen);

  // Background styling
  const getDesktopBg = () => {
    switch (settings.wallpaper) {
      case 'clouds': return 'bg-[#2b7fb5]';
      case 'matrix': return 'bg-[#021808]';
      case 'space': return 'bg-[#100c28]';
      case 'vintage_beige': return 'bg-[#4a4439]';
      default: return 'bg-[#008080]';
    }
  };

  return (
    <div
      onClick={() => {
        setIsStartOpen(false);
        setSelectedDesktopIcon(null);
        setDesktopContextMenu(null);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        setDesktopContextMenu({ x: e.clientX, y: e.clientY });
      }}
      className={`fixed inset-0 select-none overflow-hidden font-sans text-black ${getDesktopBg()}`}
    >
      {/* Optional CRT Scanline Overlay */}
      {settings.enableCrtOverlay && <div className="crt-overlay" />}

      {/* Blue Screen of Death Easter Egg */}
      {isBSOD && <BSOD onDismiss={() => setIsBSOD(false)} />}

      {/* Authentic Shut Down Screen */}
      {isShutDown && (
        <ShutDownScreen
          onPowerOn={() => {
            setIsShutDown(false);
            setIsBooting(true);
          }}
        />
      )}

      {/* Authentic Microsoft Windows 98 Boot & Loading Screen */}
      {isBooting && (
        <BootScreen
          onBootComplete={() => {
            setIsBooting(false);
            setIsLoggingOn(true);
          }}
        />
      )}

      {/* Authentic Windows 98 Logon Dialog */}
      {isLoggingOn && (
        <LogonScreen
          onLogon={() => {
            setIsLoggingOn(false);
            openApp('welcome');
          }}
        />
      )}

      {/* Desktop Icons - Exact 2 Columns from User Screenshot + Column 3 Extra */}
      <div className="absolute top-2 left-2 flex flex-row items-start gap-3 pointer-events-auto z-0 p-1">
        {/* Column 1 (from screenshot) */}
        <div className="flex flex-col gap-4 w-[84px]">
          {desktopIcons.slice(0, 6).map((item) => {
            const isSelected = selectedDesktopIcon === item.id;
            return (
              <div
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDesktopIcon(item.id);
                  setDesktopContextMenu(null);
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  item.action();
                }}
                className={`w-full flex flex-col items-center justify-start p-1 cursor-pointer text-center group ${
                  isSelected ? 'bg-[#000080]/90 border border-dotted border-white/70' : 'hover:bg-white/10'
                }`}
              >
                <WinIcon name={item.icon} size={32} />
                <span
                  className={`text-[11px] mt-1 break-words line-clamp-2 leading-tight px-1 font-sans ${
                    isSelected ? 'bg-[#000080] text-white' : 'text-white drop-shadow-[0_1px_1px_rgba(0,0,0,1)]'
                  }`}
                >
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Column 2 (from screenshot) */}
        <div className="flex flex-col gap-4 w-[84px]">
          {desktopIcons.slice(6, 12).map((item) => {
            const isSelected = selectedDesktopIcon === item.id;
            return (
              <div
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDesktopIcon(item.id);
                  setDesktopContextMenu(null);
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  item.action();
                }}
                className={`w-full flex flex-col items-center justify-start p-1 cursor-pointer text-center group ${
                  isSelected ? 'bg-[#000080]/90 border border-dotted border-white/70' : 'hover:bg-white/10'
                }`}
              >
                <WinIcon name={item.icon} size={32} />
                <span
                  className={`text-[11px] mt-1 break-words line-clamp-2 leading-tight px-1 font-sans ${
                    isSelected ? 'bg-[#000080] text-white' : 'text-white drop-shadow-[0_1px_1px_rgba(0,0,0,1)]'
                  }`}
                >
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Column 3 (Additional Restored Rig Applications) */}
        <div className="flex flex-col gap-4 w-[84px] hidden sm:flex">
          {desktopIcons.slice(12).map((item) => {
            const isSelected = selectedDesktopIcon === item.id;
            return (
              <div
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDesktopIcon(item.id);
                  setDesktopContextMenu(null);
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  item.action();
                }}
                className={`w-full flex flex-col items-center justify-start p-1 cursor-pointer text-center group ${
                  isSelected ? 'bg-[#000080]/90 border border-dotted border-white/70' : 'hover:bg-white/10'
                }`}
              >
                <WinIcon name={item.icon} size={32} />
                <span
                  className={`text-[11px] mt-1 break-words line-clamp-2 leading-tight px-1 font-sans ${
                    isSelected ? 'bg-[#000080] text-white' : 'text-white drop-shadow-[0_1px_1px_rgba(0,0,0,1)]'
                  }`}
                >
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop Context Menu (Right Click) */}
      {desktopContextMenu && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ top: `${desktopContextMenu.y}px`, left: `${desktopContextMenu.x}px` }}
          className="fixed z-[9500] win98-box-raised bg-[#c0c0c0] w-44 py-1 text-[11px] text-black shadow-2xl space-y-0.5 font-sans select-none"
        >
          <div
            onClick={() => { setDesktopContextMenu(null); SoundEngine.playDing(); }}
            className="px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer"
          >
            Arrange <u>I</u>cons
          </div>
          <div
            onClick={() => { setDesktopContextMenu(null); SoundEngine.playDing(); }}
            className="px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer"
          >
            Line <u>u</u>p Icons
          </div>
          <div
            onClick={() => { setDesktopContextMenu(null); SoundEngine.playDing(); }}
            className="px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer"
          >
            <u>R</u>efresh
          </div>
          <div className="border-t border-[#808080] my-1" />
          <div
            onClick={() => { openApp('notepad', { content: '', fileName: 'New Text Document.txt' }); setDesktopContextMenu(null); }}
            className="px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer"
          >
            <u>N</u>ew Text Document
          </div>
          <div className="border-t border-[#808080] my-1" />
          <div
            onClick={() => { openApp('control_panel'); setDesktopContextMenu(null); }}
            className="px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer font-bold"
          >
            P<u>r</u>operties
          </div>
        </div>
      )}

      {/* Windows Layer */}
      {windows.welcome.isOpen && (
        <WindowFrame
          window={windows.welcome}
          isActive={activeWindowId === 'welcome'}
          onFocus={() => focusWindow('welcome')}
          onClose={() => closeWindow('welcome')}
          onMinimize={() => minimizeWindow('welcome')}
          onMaximize={() => toggleMaximizeWindow('welcome')}
          onUpdatePosition={(x, y) => setWindows(w => ({ ...w, welcome: { ...w.welcome, position: { x, y } } }))}
          onUpdateSize={(width, height) => setWindows(w => ({ ...w, welcome: { ...w.welcome, size: { width, height } } }))}
          statusText="Welcome to Windows 98 Second Edition"
          hasHelpBtn
        >
          <WelcomeApp
            onOpenApp={openApp}
            onClose={() => closeWindow('welcome')}
          />
        </WindowFrame>
      )}

      {windows.system_properties.isOpen && (
        <WindowFrame
          window={windows.system_properties}
          isActive={activeWindowId === 'system_properties'}
          onFocus={() => focusWindow('system_properties')}
          onClose={() => closeWindow('system_properties')}
          onMinimize={() => minimizeWindow('system_properties')}
          onMaximize={() => toggleMaximizeWindow('system_properties')}
          onUpdatePosition={(x, y) => setWindows(w => ({ ...w, system_properties: { ...w.system_properties, position: { x, y } } }))}
          onUpdateSize={(width, height) => setWindows(w => ({ ...w, system_properties: { ...w.system_properties, size: { width, height } } }))}
          statusText="GenuineIntel Pentium II 350MHz · 64MB RAM"
        >
          <SystemPropertiesApp onClose={() => closeWindow('system_properties')} />
        </WindowFrame>
      )}

      {windows.my_computer.isOpen && (
        <WindowFrame
          window={windows.my_computer}
          isActive={activeWindowId === 'my_computer'}
          onFocus={() => focusWindow('my_computer')}
          onClose={() => closeWindow('my_computer')}
          onMinimize={() => minimizeWindow('my_computer')}
          onMaximize={() => toggleMaximizeWindow('my_computer')}
          onUpdatePosition={(x, y) => setWindows(w => ({ ...w, my_computer: { ...w.my_computer, position: { x, y } } }))}
          onUpdateSize={(width, height) => setWindows(w => ({ ...w, my_computer: { ...w.my_computer, size: { width, height } } }))}
          statusText="My Computer · FAT32 File System"
        >
          <FileExplorerApp
            initialFolderId={windows.my_computer.extraData?.folderId || 'root'}
            onOpenFile={handleOpenFile}
            onOpenApp={openApp}
          />
        </WindowFrame>
      )}

      {windows.my_documents.isOpen && (
        <WindowFrame
          window={windows.my_documents}
          isActive={activeWindowId === 'my_documents'}
          onFocus={() => focusWindow('my_documents')}
          onClose={() => closeWindow('my_documents')}
          onMinimize={() => minimizeWindow('my_documents')}
          onMaximize={() => toggleMaximizeWindow('my_documents')}
          onUpdatePosition={(x, y) => setWindows(w => ({ ...w, my_documents: { ...w.my_documents, position: { x, y } } }))}
          onUpdateSize={(width, height) => setWindows(w => ({ ...w, my_documents: { ...w.my_documents, size: { width, height } } }))}
          statusText="C:\My Documents · Memories & Historical Events"
        >
          <FileExplorerApp
            initialFolderId="my_documents"
            onOpenFile={handleOpenFile}
            onOpenApp={openApp}
          />
        </WindowFrame>
      )}

      {windows.internet_explorer.isOpen && (
        <WindowFrame
          window={windows.internet_explorer}
          isActive={activeWindowId === 'internet_explorer'}
          onFocus={() => focusWindow('internet_explorer')}
          onClose={() => closeWindow('internet_explorer')}
          onMinimize={() => minimizeWindow('internet_explorer')}
          onMaximize={() => toggleMaximizeWindow('internet_explorer')}
          onUpdatePosition={(x, y) => setWindows(w => ({ ...w, internet_explorer: { ...w.internet_explorer, position: { x, y } } }))}
          onUpdateSize={(width, height) => setWindows(w => ({ ...w, internet_explorer: { ...w.internet_explorer, size: { width, height } } }))}
          statusText="Internet Explorer 5 · Connected at 56,600 bps"
        >
          <InternetExplorerApp />
        </WindowFrame>
      )}

      {windows.winamp.isOpen && (
        <WindowFrame
          window={windows.winamp}
          isActive={activeWindowId === 'winamp'}
          onFocus={() => focusWindow('winamp')}
          onClose={() => closeWindow('winamp')}
          onMinimize={() => minimizeWindow('winamp')}
          onMaximize={() => toggleMaximizeWindow('winamp')}
          onUpdatePosition={(x, y) => setWindows(w => ({ ...w, winamp: { ...w.winamp, position: { x, y } } }))}
          onUpdateSize={(width, height) => setWindows(w => ({ ...w, winamp: { ...w.winamp, size: { width, height } } }))}
          statusText="Winamp 2.81 · Nullsoft"
        >
          <WinampApp />
        </WindowFrame>
      )}

      {windows.image_viewer.isOpen && (
        <WindowFrame
          window={windows.image_viewer}
          isActive={activeWindowId === 'image_viewer'}
          onFocus={() => focusWindow('image_viewer')}
          onClose={() => closeWindow('image_viewer')}
          onMinimize={() => minimizeWindow('image_viewer')}
          onMaximize={() => toggleMaximizeWindow('image_viewer')}
          onUpdatePosition={(x, y) => setWindows(w => ({ ...w, image_viewer: { ...w.image_viewer, position: { x, y } } }))}
          onUpdateSize={(width, height) => setWindows(w => ({ ...w, image_viewer: { ...w.image_viewer, size: { width, height } } }))}
          statusText="Windows Imaging Preview"
        >
          <ImageViewerApp
            initialImageUrl={windows.image_viewer.extraData?.url}
            initialTitle={windows.image_viewer.extraData?.title}
          />
        </WindowFrame>
      )}

      {windows.minesweeper.isOpen && (
        <WindowFrame
          window={windows.minesweeper}
          isActive={activeWindowId === 'minesweeper'}
          onFocus={() => focusWindow('minesweeper')}
          onClose={() => closeWindow('minesweeper')}
          onMinimize={() => minimizeWindow('minesweeper')}
          onMaximize={() => toggleMaximizeWindow('minesweeper')}
          onUpdatePosition={(x, y) => setWindows(w => ({ ...w, minesweeper: { ...w.minesweeper, position: { x, y } } }))}
          onUpdateSize={(width, height) => setWindows(w => ({ ...w, minesweeper: { ...w.minesweeper, size: { width, height } } }))}
          statusText="Minesweeper · Beginner: 10 Mines"
        >
          <MinesweeperApp />
        </WindowFrame>
      )}

      {windows.mario.isOpen && (
        <WindowFrame
          window={windows.mario}
          isActive={activeWindowId === 'mario'}
          onFocus={() => focusWindow('mario')}
          onClose={() => closeWindow('mario')}
          onMinimize={() => minimizeWindow('mario')}
          onMaximize={() => toggleMaximizeWindow('mario')}
          onUpdatePosition={(x, y) => setWindows(w => ({ ...w, mario: { ...w.mario, position: { x, y } } }))}
          onUpdateSize={(width, height) => setWindows(w => ({ ...w, mario: { ...w.mario, size: { width, height } } }))}
          statusText="Super Mario Bros. (1985) · Arrow keys / WASD to move & jump, Shift to run"
        >
          <MarioApp />
        </WindowFrame>
      )}

      {windows.pinball.isOpen && (
        <WindowFrame
          window={windows.pinball}
          isActive={activeWindowId === 'pinball'}
          onFocus={() => focusWindow('pinball')}
          onClose={() => closeWindow('pinball')}
          onMinimize={() => minimizeWindow('pinball')}
          onMaximize={() => toggleMaximizeWindow('pinball')}
          onUpdatePosition={(x, y) => setWindows(w => ({ ...w, pinball: { ...w.pinball, position: { x, y } } }))}
          onUpdateSize={(width, height) => setWindows(w => ({ ...w, pinball: { ...w.pinball, size: { width, height } } }))}
          statusText="Space Cadet 3D Pinball · Z and / for flippers, Space to launch"
        >
          <PinballApp />
        </WindowFrame>
      )}

      {windows.paint.isOpen && (
        <WindowFrame
          window={windows.paint}
          isActive={activeWindowId === 'paint'}
          onFocus={() => focusWindow('paint')}
          onClose={() => closeWindow('paint')}
          onMinimize={() => minimizeWindow('paint')}
          onMaximize={() => toggleMaximizeWindow('paint')}
          onUpdatePosition={(x, y) => setWindows(w => ({ ...w, paint: { ...w.paint, position: { x, y } } }))}
          onUpdateSize={(width, height) => setWindows(w => ({ ...w, paint: { ...w.paint, size: { width, height } } }))}
          statusText="For Help, click Help Topics on the Help Menu."
        >
          <PaintApp />
        </WindowFrame>
      )}

      {windows.notepad.isOpen && (
        <WindowFrame
          window={windows.notepad}
          isActive={activeWindowId === 'notepad'}
          onFocus={() => focusWindow('notepad')}
          onClose={() => closeWindow('notepad')}
          onMinimize={() => minimizeWindow('notepad')}
          onMaximize={() => toggleMaximizeWindow('notepad')}
          onUpdatePosition={(x, y) => setWindows(w => ({ ...w, notepad: { ...w.notepad, position: { x, y } } }))}
          onUpdateSize={(width, height) => setWindows(w => ({ ...w, notepad: { ...w.notepad, size: { width, height } } }))}
          statusText="Notepad"
        >
          <NotepadApp
            initialContent={windows.notepad.extraData?.content}
            initialFileName={windows.notepad.extraData?.fileName}
          />
        </WindowFrame>
      )}

      {windows.calculator.isOpen && (
        <WindowFrame
          window={windows.calculator}
          isActive={activeWindowId === 'calculator'}
          onFocus={() => focusWindow('calculator')}
          onClose={() => closeWindow('calculator')}
          onMinimize={() => minimizeWindow('calculator')}
          onMaximize={() => toggleMaximizeWindow('calculator')}
          onUpdatePosition={(x, y) => setWindows(w => ({ ...w, calculator: { ...w.calculator, position: { x, y } } }))}
          onUpdateSize={(width, height) => setWindows(w => ({ ...w, calculator: { ...w.calculator, size: { width, height } } }))}
          statusText="Standard Calculator"
        >
          <CalculatorApp />
        </WindowFrame>
      )}

      {windows.cmd.isOpen && (
        <WindowFrame
          window={windows.cmd}
          isActive={activeWindowId === 'cmd'}
          onFocus={() => focusWindow('cmd')}
          onClose={() => closeWindow('cmd')}
          onMinimize={() => minimizeWindow('cmd')}
          onMaximize={() => toggleMaximizeWindow('cmd')}
          onUpdatePosition={(x, y) => setWindows(w => ({ ...w, cmd: { ...w.cmd, position: { x, y } } }))}
          onUpdateSize={(width, height) => setWindows(w => ({ ...w, cmd: { ...w.cmd, size: { width, height } } }))}
          statusText="MS-DOS Prompt (80x25)"
        >
          <CmdPromptApp
            onClose={() => closeWindow('cmd')}
            onTriggerBSOD={() => setIsBSOD(true)}
          />
        </WindowFrame>
      )}

      {windows.outlook.isOpen && (
        <WindowFrame
          window={windows.outlook}
          isActive={activeWindowId === 'outlook'}
          onFocus={() => focusWindow('outlook')}
          onClose={() => closeWindow('outlook')}
          onMinimize={() => minimizeWindow('outlook')}
          onMaximize={() => toggleMaximizeWindow('outlook')}
          onUpdatePosition={(x, y) => setWindows(w => ({ ...w, outlook: { ...w.outlook, position: { x, y } } }))}
          onUpdateSize={(width, height) => setWindows(w => ({ ...w, outlook: { ...w.outlook, size: { width, height } } }))}
          statusText="Outlook Express · 3 unread messages"
        >
          <OutlookExpressApp />
        </WindowFrame>
      )}

      {windows.control_panel.isOpen && (
        <WindowFrame
          window={windows.control_panel}
          isActive={activeWindowId === 'control_panel'}
          onFocus={() => focusWindow('control_panel')}
          onClose={() => closeWindow('control_panel')}
          onMinimize={() => minimizeWindow('control_panel')}
          onMaximize={() => toggleMaximizeWindow('control_panel')}
          onUpdatePosition={(x, y) => setWindows(w => ({ ...w, control_panel: { ...w.control_panel, position: { x, y } } }))}
          onUpdateSize={(width, height) => setWindows(w => ({ ...w, control_panel: { ...w.control_panel, size: { width, height } } }))}
          statusText="Display Properties"
        >
          <ControlPanelApp
            settings={settings}
            onUpdateSettings={(newS) => setSettings(s => ({ ...s, ...newS }))}
            onClose={() => closeWindow('control_panel')}
          />
        </WindowFrame>
      )}

      {windows.recycle_bin.isOpen && (
        <WindowFrame
          window={windows.recycle_bin}
          isActive={activeWindowId === 'recycle_bin'}
          onFocus={() => focusWindow('recycle_bin')}
          onClose={() => closeWindow('recycle_bin')}
          onMinimize={() => minimizeWindow('recycle_bin')}
          onMaximize={() => toggleMaximizeWindow('recycle_bin')}
          onUpdatePosition={(x, y) => setWindows(w => ({ ...w, recycle_bin: { ...w.recycle_bin, position: { x, y } } }))}
          onUpdateSize={(width, height) => setWindows(w => ({ ...w, recycle_bin: { ...w.recycle_bin, size: { width, height } } }))}
          statusText="Recycle Bin"
        >
          <RecycleBinApp onOpenFile={handleOpenFile} />
        </WindowFrame>
      )}

      {windows.wordpad.isOpen && (
        <WindowFrame
          window={windows.wordpad}
          isActive={activeWindowId === 'wordpad'}
          onFocus={() => focusWindow('wordpad')}
          onClose={() => closeWindow('wordpad')}
          onMinimize={() => minimizeWindow('wordpad')}
          onMaximize={() => toggleMaximizeWindow('wordpad')}
          onUpdatePosition={(x, y) => setWindows(w => ({ ...w, wordpad: { ...w.wordpad, position: { x, y } } }))}
          onUpdateSize={(width, height) => setWindows(w => ({ ...w, wordpad: { ...w.wordpad, size: { width, height } } }))}
          statusText="WordPad · Rich Text Editor"
        >
          <WordPadApp />
        </WindowFrame>
      )}

      {windows.network_neighborhood.isOpen && (
        <WindowFrame
          window={windows.network_neighborhood}
          isActive={activeWindowId === 'network_neighborhood'}
          onFocus={() => focusWindow('network_neighborhood')}
          onClose={() => closeWindow('network_neighborhood')}
          onMinimize={() => minimizeWindow('network_neighborhood')}
          onMaximize={() => toggleMaximizeWindow('network_neighborhood')}
          onUpdatePosition={(x, y) => setWindows(w => ({ ...w, network_neighborhood: { ...w.network_neighborhood, position: { x, y } } }))}
          onUpdateSize={(width, height) => setWindows(w => ({ ...w, network_neighborhood: { ...w.network_neighborhood, size: { width, height } } }))}
          statusText="Network Neighborhood"
        >
          <NetworkNeighborhoodApp />
        </WindowFrame>
      )}

      {/* Floating Clippy Assistant Easter Egg */}
      <ClippyAssistant
        onOpenApp={openApp}
        onTriggerBSOD={() => setIsBSOD(true)}
      />

      {/* Run Dialog */}
      <RunDialog
        isOpen={showRunDialog}
        onClose={() => setShowRunDialog(false)}
        onOpenApp={openApp}
        onTriggerBSOD={() => setIsBSOD(true)}
      />

      {/* Shut Down Dialog */}
      <ShutDownDialog
        isOpen={showShutDownDialog}
        onClose={() => setShowShutDownDialog(false)}
        onConfirmShutDown={() => {
          setShowShutDownDialog(false);
          setIsShutDown(true);
        }}
        onRestart={() => {
          setShowShutDownDialog(false);
          setIsBooting(true);
        }}
      />

      {/* Start Menu */}
      <StartMenu
        isOpen={isStartOpen}
        onClose={() => setIsStartOpen(false)}
        onOpenApp={openApp}
        onOpenShutDown={() => setShowShutDownDialog(true)}
        onOpenRun={() => setShowRunDialog(true)}
      />

      {/* Bottom Taskbar */}
      <Taskbar
        isStartOpen={isStartOpen}
        onToggleStart={() => setIsStartOpen(!isStartOpen)}
        openWindows={openWindowsList}
        activeWindowId={activeWindowId}
        onSelectWindow={(id) => {
          if (activeWindowId === id && !windows[id as WindowId].isMinimized) {
            minimizeWindow(id as WindowId);
          } else {
            focusWindow(id as WindowId);
          }
        }}
        onShowDesktop={() => {
          setWindows(prev => {
            const next = { ...prev };
            Object.keys(next).forEach(k => {
              next[k as WindowId] = { ...next[k as WindowId], isMinimized: true };
            });
            return next;
          });
          setActiveWindowId(null);
        }}
        onOpenApp={openApp}
      />
    </div>
  );
}
