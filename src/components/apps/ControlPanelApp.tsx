import React from 'react';
import { WinIcon } from '../common/WinIcon';
import { SoundEngine } from '../../services/soundEngine';

export interface DisplaySettings {
  wallpaper: string;
  enableCrtOverlay: boolean;
  enableSounds: boolean;
}

interface ControlPanelAppProps {
  settings: DisplaySettings;
  onUpdateSettings: (newSettings: Partial<DisplaySettings>) => void;
  onClose: () => void;
}

const WALLPAPERS = [
  { id: 'teal', name: 'Windows 98 Classic Teal', color: '#008080' },
  { id: 'clouds', name: 'Windows Clouds', color: '#2b7fb5' },
  { id: 'matrix', name: 'Matrix Digital Rain', color: '#021808' },
  { id: 'space', name: 'Space Cadet Galaxy', color: '#100c28' },
  { id: 'vintage_beige', name: 'Beige Hardware 1998', color: '#4a4439' },
];

export const ControlPanelApp: React.FC<ControlPanelAppProps> = ({
  settings,
  onUpdateSettings,
  onClose,
}) => {
  return (
    <div className="flex flex-col h-full bg-[#c0c0c0] text-black text-[11px] select-none font-sans p-2">
      {/* Title info */}
      <div className="flex items-center gap-2 mb-3 border-b border-[#808080] pb-2">
        <WinIcon name="settings" size={32} />
        <div>
          <div className="font-bold text-xs text-[#000080]">Display Properties &amp; System Configuration</div>
          <div className="text-[10px] text-gray-600">Customize desktop wallpaper, CRT monitor effects, and audio</div>
        </div>
      </div>

      {/* Monitor Preview Box */}
      <div className="flex flex-col items-center justify-center p-3 mb-3 win98-box-sunken bg-[#555]">
        <div className="w-48 h-32 bg-black border-4 border-[#c0c0c0] rounded-sm p-1 flex items-center justify-center relative shadow-lg">
          <div
            style={{ backgroundColor: WALLPAPERS.find(w => w.id === settings.wallpaper)?.color || '#008080' }}
            className="w-full h-full border border-gray-600 flex flex-col justify-between p-1 overflow-hidden"
          >
            {/* Mini faux desktop preview */}
            <div className="flex flex-col gap-1">
              <div className="w-2 h-2 bg-white/60" />
              <div className="w-2 h-2 bg-white/60" />
            </div>
            <div className="w-full h-2 bg-[#c0c0c0] border-t border-white text-[6px] text-black flex items-center px-1">
              Start
            </div>
          </div>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="flex-1 space-y-3">
        {/* Wallpaper Picker */}
        <div>
          <label className="font-bold block mb-1">Select Desktop Wallpaper:</label>
          <div className="win98-box-sunken bg-white p-1 max-h-28 overflow-y-auto space-y-0.5">
            {WALLPAPERS.map((wp) => (
              <div
                key={wp.id}
                onClick={() => {
                  onUpdateSettings({ wallpaper: wp.id });
                  SoundEngine.playDing();
                }}
                className={`px-2 py-1 cursor-pointer flex items-center justify-between text-[11px] ${
                  settings.wallpaper === wp.id ? 'bg-[#000080] text-white font-bold' : 'hover:bg-gray-100'
                }`}
              >
                <span>{wp.name}</span>
                <div
                  style={{ backgroundColor: wp.color }}
                  className="w-4 h-3 border border-black"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CRT Scanline Toggle */}
        <div className="win98-box-sunken p-2 bg-[#dfdfdf] space-y-2">
          <label className="flex items-center gap-2 cursor-pointer font-bold">
            <input
              type="checkbox"
              checked={settings.enableCrtOverlay}
              onChange={(e) => {
                onUpdateSettings({ enableCrtOverlay: e.target.checked });
                SoundEngine.playDing();
              }}
            />
            <span>Enable Retro CRT Monitor Scanlines &amp; Glare</span>
          </label>
          <p className="text-[10px] text-gray-600 pl-5">
            Simulates the authentic phosphor scanline glow of a late-90s Sony Trinitron CRT monitor.
          </p>
        </div>

        {/* Audio Toggle */}
        <div className="win98-box-sunken p-2 bg-[#dfdfdf] space-y-2">
          <label className="flex items-center gap-2 cursor-pointer font-bold">
            <input
              type="checkbox"
              checked={settings.enableSounds}
              onChange={(e) => {
                onUpdateSettings({ enableSounds: e.target.checked });
                if (e.target.checked) SoundEngine.playStartup();
              }}
            />
            <span>Enable 16-bit Sound Blaster Emulation (Web Audio API)</span>
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2 pt-2 border-t border-[#808080]">
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
