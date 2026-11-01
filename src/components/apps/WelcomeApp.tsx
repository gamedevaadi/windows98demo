import React, { useState } from 'react';
import { WinIcon } from '../common/WinIcon';

interface WelcomeAppProps {
  onOpenApp: (appId: any, extraData?: any) => void;
  onClose: () => void;
}

export const WelcomeApp: React.FC<WelcomeAppProps> = ({ onOpenApp, onClose }) => {
  const [activeTab, setActiveTab] = useState<'welcome' | 'register' | 'connect' | 'discover' | 'maintain'>('welcome');

  return (
    <div className="flex flex-col h-full bg-[#dfdfdf] text-black text-[11px] p-2 select-none font-sans">
      {/* Top Banner */}
      <div className="flex items-center gap-3 border-b-2 border-[#808080] pb-2 mb-2 bg-gradient-to-r from-[#000080] to-[#1084d0] p-2 text-white">
        <WinIcon name="welcome" size={32} />
        <div>
          <div className="font-bold text-sm tracking-wide">Microsoft Windows 98</div>
          <div className="text-[10px] text-blue-200">Welcome to the Computer Desktop</div>
        </div>
      </div>

      {/* Main Split */}
      <div className="flex-1 flex gap-2 overflow-hidden">
        {/* Left Sidebar Menu */}
        <div className="w-48 bg-[#c0c0c0] win98-box-sunken p-2 flex flex-col gap-1.5 shrink-0">
          <div className="font-bold text-[10px] text-[#000080] uppercase tracking-wider mb-1">
            CONTENTS
          </div>
          <button
            onClick={() => setActiveTab('welcome')}
            className={`text-left px-2 py-1 flex items-center gap-1.5 text-[11px] ${
              activeTab === 'welcome' ? 'bg-[#000080] text-white font-bold' : 'hover:bg-[#dfdfdf]'
            }`}
          >
            <span className="text-blue-500 font-serif">■</span> Welcome
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`text-left px-2 py-1 flex items-center gap-1.5 text-[11px] ${
              activeTab === 'register' ? 'bg-[#000080] text-white font-bold' : 'hover:bg-[#dfdfdf]'
            }`}
          >
            <span className="text-green-500 font-serif">■</span> Register Now
          </button>
          <button
            onClick={() => setActiveTab('connect')}
            className={`text-left px-2 py-1 flex items-center gap-1.5 text-[11px] ${
              activeTab === 'connect' ? 'bg-[#000080] text-white font-bold' : 'hover:bg-[#dfdfdf]'
            }`}
          >
            <span className="text-red-500 font-serif">■</span> Connect to the Internet
          </button>
          <button
            onClick={() => setActiveTab('discover')}
            className={`text-left px-2 py-1 flex items-center gap-1.5 text-[11px] ${
              activeTab === 'discover' ? 'bg-[#000080] text-white font-bold' : 'hover:bg-[#dfdfdf]'
            }`}
          >
            <span className="text-yellow-600 font-serif">■</span> Discover Windows 98
          </button>
          <button
            onClick={() => setActiveTab('maintain')}
            className={`text-left px-2 py-1 flex items-center gap-1.5 text-[11px] ${
              activeTab === 'maintain' ? 'bg-[#000080] text-white font-bold' : 'hover:bg-[#dfdfdf]'
            }`}
          >
            <span className="text-purple-600 font-serif">■</span> Maintain Your Computer
          </button>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 bg-white win98-box-sunken p-3 overflow-y-auto text-black flex flex-col justify-between">
          {activeTab === 'welcome' && (
            <div>
              <h2 className="text-base font-bold text-[#000080] mb-2 border-b border-[#c0c0c0] pb-1">
                Welcome to Windows 98
              </h2>
              <p className="mb-2 leading-relaxed text-[12px]">
                Welcome to the exciting new world of Windows 98, where your computer desktop meets the Internet!
              </p>
              <p className="text-[11px] text-[#404040] leading-relaxed mb-3">
                Sit back and relax as you take a brief tour of the options available on this computer. If you want to explore an option, just click it.
              </p>
              <div className="bg-[#f0f8ff] border border-[#b0c4de] p-2.5 text-[11px] space-y-1">
                <strong className="text-[#000080]">What&apos;s New in Second Edition:</strong>
                <ul className="list-disc pl-4 space-y-0.5 text-gray-700">
                  <li>Internet Connection Sharing (ICS)</li>
                  <li>DirectX 6.1 with accelerated 3D graphics</li>
                  <li>Universal Serial Bus (USB) improved support</li>
                  <li>Windows Media Player &amp; NetMeeting</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'register' && (
            <div>
              <h2 className="text-base font-bold text-[#000080] mb-2 border-b border-[#c0c0c0] pb-1">
                Register Windows 98
              </h2>
              <p className="mb-2">
                Registration details from Microsoft Product Identification:
              </p>
              <div className="space-y-1 bg-[#f0f0f0] p-2 border border-[#808080] text-[11px] font-mono">
                <div>Operating System: Microsoft Windows 98 Second Edition</div>
                <div>OEM License ID: 04214-OEM-0070115-69847</div>
                <div>Product Key: J3QQ4-H7H2V-2HCH4-M3HK8-6M8VW</div>
                <div>Status: Activated &amp; Verified</div>
              </div>
              <p className="mt-3 text-[11px] text-green-700 font-semibold">
                ✓ Your copy of Windows 98 is registered and in good standing.
              </p>
            </div>
          )}

          {activeTab === 'connect' && (
            <div>
              <h2 className="text-base font-bold text-[#000080] mb-2 border-b border-[#c0c0c0] pb-1">
                Connect to the Internet
              </h2>
              <p className="mb-2">
                Windows 98 makes it easier than ever to get on the World Wide Web.
              </p>
              <ul className="list-disc pl-5 space-y-1 mb-3 text-[11px]">
                <li>MSN Internet Access with 56k V.90 dial-up</li>
                <li>Internet Explorer 5 with Outlook Express email</li>
                <li>Search engines: Google Stanford Beta and Yahoo! Directory</li>
                <li>Personal homepages on GeoCities</li>
              </ul>
              <button
                onClick={() => onOpenApp('internet_explorer')}
                className="win98-btn px-3 py-1 font-bold text-[#000080] flex items-center gap-1.5"
              >
                <WinIcon name="ie" size={16} /> Launch Internet Explorer
              </button>
            </div>
          )}

          {activeTab === 'discover' && (
            <div>
              <h2 className="text-base font-bold text-[#000080] mb-2 border-b border-[#c0c0c0] pb-1">
                Discover Entertainment &amp; Games
              </h2>
              <p className="mb-2">
                Enjoy classic entertainment titles and multimedia tools:
              </p>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <button
                  onClick={() => onOpenApp('mario')}
                  className="win98-btn p-1.5 text-left flex items-center gap-2"
                >
                  <WinIcon name="mario" size={20} />
                  <span className="font-bold text-red-700">Super Mario Bros.</span>
                </button>
                <button
                  onClick={() => onOpenApp('minesweeper')}
                  className="win98-btn p-1.5 text-left flex items-center gap-2"
                >
                  <WinIcon name="minesweeper" size={20} />
                  <span>Minesweeper</span>
                </button>
                <button
                  onClick={() => onOpenApp('pinball')}
                  className="win98-btn p-1.5 text-left flex items-center gap-2"
                >
                  <WinIcon name="pinball" size={20} />
                  <span>3D Pinball</span>
                </button>
                <button
                  onClick={() => onOpenApp('winamp')}
                  className="win98-btn p-1.5 text-left flex items-center gap-2"
                >
                  <WinIcon name="winamp" size={20} />
                  <span>Winamp Player</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'maintain' && (
            <div>
              <h2 className="text-base font-bold text-[#000080] mb-2 border-b border-[#c0c0c0] pb-1">
                Maintain Your Computer
              </h2>
              <p className="mb-2">
                Windows 98 includes automated tools to tune and optimize your system:
              </p>
              <div className="space-y-1.5 text-[11px]">
                <div className="p-1.5 bg-[#f5f5f5] border border-[#c0c0c0]">
                  <strong>Disk Defragmenter:</strong> Local Disk (C:) fragmentation is low.
                </div>
                <div className="p-1.5 bg-[#f5f5f5] border border-[#c0c0c0]">
                  <strong>ScanDisk:</strong> FAT32 file allocation tables verified.
                </div>
                <div className="p-1.5 bg-[#f5f5f5] border border-[#c0c0c0]">
                  <strong>Maintenance Wizard:</strong> Scheduled tune-up active.
                </div>
              </div>
            </div>
          )}

          {/* Bottom Action */}
          <div className="flex items-center justify-between border-t border-[#c0c0c0] pt-2 mt-2">
            <label className="flex items-center gap-1.5 text-[10px] text-gray-700 cursor-pointer">
              <input type="checkbox" defaultChecked />
              Show this screen each time Windows 98 starts.
            </label>
            <button
              onClick={onClose}
              className="win98-btn px-4 py-1 text-[11px] font-bold"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
