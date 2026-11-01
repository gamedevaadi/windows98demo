import React, { useState } from 'react';
import { WinIcon } from '../common/WinIcon';

interface SystemPropertiesAppProps {
  onClose: () => void;
}

export const SystemPropertiesApp: React.FC<SystemPropertiesAppProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'device' | 'hardware' | 'perf'>('general');

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0] text-black text-[11px] p-1 select-none font-sans">
      {/* Tabs */}
      <div className="flex items-end gap-[2px] border-b border-[#808080] px-1 pt-1">
        <button
          onClick={() => setActiveTab('general')}
          className={`px-3 py-1 text-[11px] font-sans ${
            activeTab === 'general'
              ? 'bg-[#c0c0c0] font-bold border-t-2 border-l-2 border-r-2 border-t-white border-l-white border-r-[#808080] -mb-[1px] pb-1.5'
              : 'bg-[#d4d0c8] hover:bg-[#dfdfdf] border border-b-0 border-[#808080]'
          }`}
        >
          General
        </button>
        <button
          onClick={() => setActiveTab('device')}
          className={`px-3 py-1 text-[11px] font-sans ${
            activeTab === 'device'
              ? 'bg-[#c0c0c0] font-bold border-t-2 border-l-2 border-r-2 border-t-white border-l-white border-r-[#808080] -mb-[1px] pb-1.5'
              : 'bg-[#d4d0c8] hover:bg-[#dfdfdf] border border-b-0 border-[#808080]'
          }`}
        >
          Device Manager
        </button>
        <button
          onClick={() => setActiveTab('hardware')}
          className={`px-3 py-1 text-[11px] font-sans ${
            activeTab === 'hardware'
              ? 'bg-[#c0c0c0] font-bold border-t-2 border-l-2 border-r-2 border-t-white border-l-white border-r-[#808080] -mb-[1px] pb-1.5'
              : 'bg-[#d4d0c8] hover:bg-[#dfdfdf] border border-b-0 border-[#808080]'
          }`}
        >
          Hardware Profiles
        </button>
        <button
          onClick={() => setActiveTab('perf')}
          className={`px-3 py-1 text-[11px] font-sans ${
            activeTab === 'perf'
              ? 'bg-[#c0c0c0] font-bold border-t-2 border-l-2 border-r-2 border-t-white border-l-white border-r-[#808080] -mb-[1px] pb-1.5'
              : 'bg-[#d4d0c8] hover:bg-[#dfdfdf] border border-b-0 border-[#808080]'
          }`}
        >
          Performance
        </button>
      </div>

      {/* Tab Panel */}
      <div className="flex-1 bg-[#c0c0c0] win98-box-raised p-4 mt-1 overflow-y-auto">
        {activeTab === 'general' && (
          <div className="flex gap-4">
            {/* Windows 98 Monitor Graphic */}
            <div className="flex flex-col items-center justify-start shrink-0 pt-2">
              <WinIcon name="computer" size={64} />
              <span className="text-[10px] text-gray-600 mt-2">Hewlett-Packard PC</span>
            </div>

            {/* Specs Breakdown */}
            <div className="flex-1 space-y-3">
              <div>
                <span className="font-bold">System:</span>
                <div className="pl-4 text-[11px] leading-tight text-gray-800">
                  <div>Microsoft Windows 98</div>
                  <div>Second Edition</div>
                  <div>4.10.2222 A</div>
                </div>
              </div>

              <div>
                <span className="font-bold">Registered to:</span>
                <div className="pl-4 text-[11px] leading-tight text-gray-800">
                  <div>Windows User</div>
                  <div>Home Office</div>
                  <div>04214-OEM-0070115-69847</div>
                </div>
              </div>

              <div>
                <span className="font-bold">Computer:</span>
                <div className="pl-4 text-[11px] leading-tight text-gray-800">
                  <div>GenuineIntel</div>
                  <div>Pentium(r) II Processor 350MHz</div>
                  <div>64.0MB RAM</div>
                  <div>Quantum Bigfoot 4.3GB Hard Disk</div>
                  <div>Sound Blaster 16 Compatible</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'device' && (
          <div className="space-y-2">
            <div className="text-[11px] font-bold">Hardware devices installed on this computer:</div>
            <div className="win98-box-sunken p-2 bg-white text-[11px] space-y-1 max-h-48 overflow-y-auto">
              <div>📁 CD-ROM: Creative 24x Speed IDE CD-ROM</div>
              <div>📁 Disk drives: GENERIC IDE DISK TYPE47 (4.3 GB)</div>
              <div>📁 Display adapters: 3dfx Voodoo3 2000 AGP (16MB)</div>
              <div>📁 Floppy disk controllers: Standard Floppy Disk Controller</div>
              <div>📁 Keyboard: Standard 101/102-Key or PS/2 Keyboard</div>
              <div>📁 Modem: USRobotics 56K Faxmodem V.90</div>
              <div>📁 Sound: Creative Sound Blaster Live! Value</div>
              <div>📁 System devices: Intel 440BX AGPset</div>
            </div>
          </div>
        )}

        {activeTab === 'hardware' && (
          <div className="space-y-3">
            <p className="text-[11px]">Hardware profiles provide a way for you to set up different hardware configurations.</p>
            <div className="win98-box-sunken p-2 bg-white text-[11px]">
              <div>• Original Configuration (Current)</div>
              <div>• LAN Party High Performance Profile</div>
            </div>
          </div>
        )}

        {activeTab === 'perf' && (
          <div className="space-y-2">
            <div className="font-bold text-[11px]">Performance status:</div>
            <div className="space-y-1 pl-2 text-[11px]">
              <div>Memory: 64.0 MB of RAM (94% free)</div>
              <div>System Resources: 87% free</div>
              <div>File System: 32-bit (FAT32)</div>
              <div>Virtual Memory: 32-bit</div>
              <div>Disk Compression: Not installed</div>
              <div>PC Cards (PCMCIA): No PC Card sockets are installed.</div>
            </div>
            <div className="mt-4 p-2 bg-green-50 border border-green-400 text-green-800 font-semibold text-[11px]">
              Your system is configured for optimal performance.
            </div>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2 pt-2">
        <button
          onClick={onClose}
          className="win98-btn px-4 py-1 font-bold text-[11px] min-w-[70px]"
        >
          OK
        </button>
        <button
          onClick={onClose}
          className="win98-btn px-4 py-1 text-[11px] min-w-[70px]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
