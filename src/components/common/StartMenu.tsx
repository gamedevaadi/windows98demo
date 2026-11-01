import React, { useState } from 'react';
import { WinIcon } from './WinIcon';
import { WindowId } from '../../types/win98';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenApp: (appId: WindowId, extraData?: any) => void;
  onOpenShutDown: () => void;
  onOpenRun: () => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({
  isOpen,
  onClose,
  onOpenApp,
  onOpenShutDown,
  onOpenRun,
}) => {
  const [activeSubmenu, setActiveSubmenu] = useState<'programs' | 'documents' | 'settings' | null>(null);

  if (!isOpen) return null;

  const handleItemClick = (action: () => void) => {
    action();
    onClose();
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed bottom-[30px] left-0 z-[9000] win98-box-raised bg-[#c0c0c0] flex shadow-2xl font-sans text-[11px] select-none"
    >
      {/* Vertical Blue Windows 98 Branding Banner */}
      <div className="w-8 bg-gradient-to-t from-[#000080] via-[#1040a0] to-[#1084d0] flex items-end justify-center p-1 relative">
        <span className="text-white font-bold tracking-widest text-sm -rotate-90 origin-bottom-left absolute bottom-3 left-6 whitespace-nowrap drop-shadow">
          <span className="font-light">Windows</span><span className="font-extrabold ml-1">98</span>
        </span>
      </div>

      {/* Main Items List */}
      <div className="w-48 py-1 flex flex-col relative text-black">
        {/* Programs with Submenu */}
        <div
          onMouseEnter={() => setActiveSubmenu('programs')}
          className={`flex items-center justify-between px-3 py-1.5 cursor-pointer ${
            activeSubmenu === 'programs' ? 'bg-[#000080] text-white' : 'hover:bg-[#000080] hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <WinIcon name="folder" size={20} />
            <span><u>P</u>rograms</span>
          </div>
          <span className="text-[9px]">►</span>
        </div>

        {/* Documents with Submenu */}
        <div
          onMouseEnter={() => setActiveSubmenu('documents')}
          className={`flex items-center justify-between px-3 py-1.5 cursor-pointer ${
            activeSubmenu === 'documents' ? 'bg-[#000080] text-white' : 'hover:bg-[#000080] hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <WinIcon name="my_documents" size={20} />
            <span><u>D</u>ocuments</span>
          </div>
          <span className="text-[9px]">►</span>
        </div>

        {/* Settings with Submenu */}
        <div
          onMouseEnter={() => setActiveSubmenu('settings')}
          className={`flex items-center justify-between px-3 py-1.5 cursor-pointer ${
            activeSubmenu === 'settings' ? 'bg-[#000080] text-white' : 'hover:bg-[#000080] hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <WinIcon name="settings" size={20} />
            <span><u>S</u>ettings</span>
          </div>
          <span className="text-[9px]">►</span>
        </div>

        <div
          onMouseEnter={() => setActiveSubmenu(null)}
          onClick={() => handleItemClick(() => onOpenApp('my_documents'))}
          className="flex items-center gap-2 px-3 py-1.5 cursor-pointer hover:bg-[#000080] hover:text-white"
        >
          <WinIcon name="folder" size={20} />
          <span><u>F</u>ind</span>
        </div>

        <div
          onMouseEnter={() => setActiveSubmenu(null)}
          onClick={() => handleItemClick(() => onOpenApp('welcome'))}
          className="flex items-center gap-2 px-3 py-1.5 cursor-pointer hover:bg-[#000080] hover:text-white"
        >
          <WinIcon name="help" size={20} />
          <span><u>H</u>elp &amp; Tour</span>
        </div>

        <div
          onMouseEnter={() => setActiveSubmenu(null)}
          onClick={() => handleItemClick(onOpenRun)}
          className="flex items-center gap-2 px-3 py-1.5 cursor-pointer hover:bg-[#000080] hover:text-white"
        >
          <WinIcon name="cmd" size={20} />
          <span><u>R</u>un...</span>
        </div>

        <div className="border-t border-[#808080] my-1" />

        <div
          onMouseEnter={() => setActiveSubmenu(null)}
          onClick={() => handleItemClick(() => alert('Logged off Windows User.'))}
          className="flex items-center gap-2 px-3 py-1.5 cursor-pointer hover:bg-[#000080] hover:text-white"
        >
          <span className="text-base">👤</span>
          <span>Log <u>O</u>ff Windows User...</span>
        </div>

        <div
          onMouseEnter={() => setActiveSubmenu(null)}
          onClick={onOpenShutDown}
          className="flex items-center gap-2 px-3 py-1.5 cursor-pointer hover:bg-[#000080] hover:text-white font-bold"
        >
          <span className="text-base">🔌</span>
          <span>Sh<u>u</u>t Down...</span>
        </div>
      </div>

      {/* Submenu: Programs */}
      {activeSubmenu === 'programs' && (
        <div
          onMouseLeave={() => setActiveSubmenu(null)}
          className="absolute left-[224px] bottom-0 win98-box-raised bg-[#c0c0c0] w-52 py-1 text-black shadow-2xl space-y-0.5"
        >
          <div
            onClick={() => handleItemClick(() => onOpenApp('internet_explorer'))}
            className="flex items-center gap-2 px-3 py-1 cursor-pointer hover:bg-[#000080] hover:text-white"
          >
            <WinIcon name="ie" size={18} />
            <span>Internet Explorer</span>
          </div>

          <div
            onClick={() => handleItemClick(() => onOpenApp('outlook'))}
            className="flex items-center gap-2 px-3 py-1 cursor-pointer hover:bg-[#000080] hover:text-white"
          >
            <WinIcon name="outlook" size={18} />
            <span>Outlook Express</span>
          </div>

          <div
            onClick={() => handleItemClick(() => onOpenApp('winamp'))}
            className="flex items-center gap-2 px-3 py-1 cursor-pointer hover:bg-[#000080] hover:text-white"
          >
            <WinIcon name="winamp" size={18} />
            <span>Winamp</span>
          </div>

          <div
            onClick={() => handleItemClick(() => onOpenApp('cmd'))}
            className="flex items-center gap-2 px-3 py-1 cursor-pointer hover:bg-[#000080] hover:text-white"
          >
            <WinIcon name="cmd" size={18} />
            <span>MS-DOS Prompt</span>
          </div>

          <div className="border-t border-[#808080] my-1" />

          {/* Games Category */}
          <div className="px-3 py-0.5 text-[10px] font-bold text-gray-600 uppercase">Games</div>
          <div
            onClick={() => handleItemClick(() => onOpenApp('mario'))}
            className="flex items-center gap-2 px-3 py-1 cursor-pointer hover:bg-[#000080] hover:text-white font-bold text-red-700"
          >
            <WinIcon name="mario" size={18} />
            <span>Super Mario Bros.</span>
          </div>
          <div
            onClick={() => handleItemClick(() => onOpenApp('minesweeper'))}
            className="flex items-center gap-2 px-3 py-1 cursor-pointer hover:bg-[#000080] hover:text-white"
          >
            <WinIcon name="mine" size={18} />
            <span>Minesweeper</span>
          </div>
          <div
            onClick={() => handleItemClick(() => onOpenApp('pinball'))}
            className="flex items-center gap-2 px-3 py-1 cursor-pointer hover:bg-[#000080] hover:text-white"
          >
            <WinIcon name="pinball" size={18} />
            <span>Space Cadet Pinball</span>
          </div>

          <div className="border-t border-[#808080] my-1" />

          {/* Accessories Category */}
          <div className="px-3 py-0.5 text-[10px] font-bold text-gray-600 uppercase">Accessories</div>
          <div
            onClick={() => handleItemClick(() => onOpenApp('paint'))}
            className="flex items-center gap-2 px-3 py-1 cursor-pointer hover:bg-[#000080] hover:text-white"
          >
            <WinIcon name="paint" size={18} />
            <span>Paint</span>
          </div>
          <div
            onClick={() => handleItemClick(() => onOpenApp('notepad'))}
            className="flex items-center gap-2 px-3 py-1 cursor-pointer hover:bg-[#000080] hover:text-white"
          >
            <WinIcon name="notepad" size={18} />
            <span>Notepad</span>
          </div>
          <div
            onClick={() => handleItemClick(() => onOpenApp('wordpad'))}
            className="flex items-center gap-2 px-3 py-1 cursor-pointer hover:bg-[#000080] hover:text-white"
          >
            <WinIcon name="wordpad" size={18} />
            <span>WordPad</span>
          </div>
          <div
            onClick={() => handleItemClick(() => onOpenApp('calculator'))}
            className="flex items-center gap-2 px-3 py-1 cursor-pointer hover:bg-[#000080] hover:text-white"
          >
            <WinIcon name="calc" size={18} />
            <span>Calculator</span>
          </div>
        </div>
      )}

      {/* Submenu: Documents */}
      {activeSubmenu === 'documents' && (
        <div
          onMouseLeave={() => setActiveSubmenu(null)}
          className="absolute left-[224px] bottom-16 win98-box-raised bg-[#c0c0c0] w-56 py-1 text-black shadow-2xl space-y-0.5"
        >
          <div
            onClick={() => handleItemClick(() => onOpenApp('image_viewer', { title: 'portrait_punk_1998.jpg', url: '/assets/aistudio/Screenshot_2026-11-01_155733_aa9ad62e.png' }))}
            className="flex items-center gap-2 px-3 py-1 cursor-pointer hover:bg-[#000080] hover:text-white"
          >
            <WinIcon name="image" size={16} />
            <span className="truncate">portrait_punk_1998.jpg</span>
          </div>
          <div
            onClick={() => handleItemClick(() => onOpenApp('image_viewer', { title: 'mugshot_archive_record.jpg', url: '/assets/aistudio/Screenshot_2026-11-01_155851_7b8a0f3a.png' }))}
            className="flex items-center gap-2 px-3 py-1 cursor-pointer hover:bg-[#000080] hover:text-white"
          >
            <WinIcon name="image" size={16} />
            <span className="truncate">mugshot_archive_record.jpg</span>
          </div>
          <div
            onClick={() => handleItemClick(() => onOpenApp('image_viewer', { title: 'world_cup_1998.jpg' }))}
            className="flex items-center gap-2 px-3 py-1 cursor-pointer hover:bg-[#000080] hover:text-white"
          >
            <WinIcon name="image" size={16} />
            <span className="truncate">world_cup_1998.jpg</span>
          </div>
          <div
            onClick={() => handleItemClick(() => onOpenApp('notepad'))}
            className="flex items-center gap-2 px-3 py-1 cursor-pointer hover:bg-[#000080] hover:text-white"
          >
            <WinIcon name="text" size={16} />
            <span className="truncate">diary_1999_y2k_panic.txt</span>
          </div>
        </div>
      )}

      {/* Submenu: Settings */}
      {activeSubmenu === 'settings' && (
        <div
          onMouseLeave={() => setActiveSubmenu(null)}
          className="absolute left-[224px] bottom-10 win98-box-raised bg-[#c0c0c0] w-48 py-1 text-black shadow-2xl space-y-0.5"
        >
          <div
            onClick={() => handleItemClick(() => onOpenApp('control_panel'))}
            className="flex items-center gap-2 px-3 py-1 cursor-pointer hover:bg-[#000080] hover:text-white"
          >
            <WinIcon name="settings" size={16} />
            <span>Control Panel</span>
          </div>
          <div
            onClick={() => handleItemClick(() => onOpenApp('system_properties'))}
            className="flex items-center gap-2 px-3 py-1 cursor-pointer hover:bg-[#000080] hover:text-white"
          >
            <WinIcon name="computer" size={16} />
            <span>System Properties</span>
          </div>
        </div>
      )}
    </div>
  );
};
