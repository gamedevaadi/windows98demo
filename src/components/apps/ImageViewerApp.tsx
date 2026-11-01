import React, { useState } from 'react';

interface ImageViewerAppProps {
  initialImageUrl?: string;
  initialTitle?: string;
}

const GALLERY = [
  {
    title: 'portrait_punk_1998.jpg',
    url: '/assets/aistudio/Screenshot_2026-11-01_155733_aa9ad62e.png',
    desc: 'Personal Archives: Vintage 1998 color photograph scan. Scanned at 300 DPI.',
    date: '14/08/1998'
  },
  {
    title: 'mugshot_archive_record.jpg',
    url: '/assets/aistudio/Screenshot_2026-11-01_155851_7b8a0f3a.png',
    desc: 'Records Department: Archival case photograph, September 1998.',
    date: '28/09/1998'
  },
  {
    title: 'world_cup_1998.jpg',
    url: '/src/assets/images/world_cup_1998_1793527136275.jpg',
    desc: 'Stade de France, Paris - 12 July 1998. France defeats Brazil 3-0 to lift the World Cup trophy amid celebratory confetti.',
    date: '12/07/1998'
  },
  {
    title: 'titanic_1997.jpg',
    url: '/src/assets/images/titanic_1997_1793527135472.jpg',
    desc: 'Titanic (1997) movie still. Jack & Rose standing on the ship bow during sunset.',
    date: '19/12/1997'
  },
  {
    title: 'family_vacation_1999.jpg',
    url: '/src/assets/images/family_vacation_1999_1793527136797.jpg',
    desc: 'Yellowstone Summer Vacation 1999. Family station wagon and 35mm film print.',
    date: '22/07/1999'
  },
  {
    title: 'counter_strike_lan.jpg',
    url: '/src/assets/images/counter_strike_lan_1793527137609.jpg',
    desc: 'Basement LAN Party October 2000. Beige CRT monitors and classic PC gaming setup.',
    date: '14/10/2000'
  }
];

export const ImageViewerApp: React.FC<ImageViewerAppProps> = ({
  initialImageUrl,
  initialTitle,
}) => {
  const initialIndex = GALLERY.findIndex(g => g.url === initialImageUrl || g.title === initialTitle);
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [zoom, setZoom] = useState(1);

  const currentItem = GALLERY[currentIndex];

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % GALLERY.length);
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + GALLERY.length) % GALLERY.length);
  };

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0] text-black text-[11px] select-none font-sans">
      {/* Toolbar */}
      <div className="p-1 border-b border-[#808080] flex items-center gap-1 bg-[#c0c0c0] shrink-0">
        <button
          onClick={handlePrev}
          className="win98-btn px-2 py-0.5 flex items-center gap-1 text-[11px]"
        >
          <span>◄</span> Previous
        </button>
        <button
          onClick={handleNext}
          className="win98-btn px-2 py-0.5 flex items-center gap-1 text-[11px]"
        >
          <span>►</span> Next
        </button>
        <div className="h-4 w-[1px] bg-gray-400 mx-1" />
        <button
          onClick={() => setZoom(z => Math.min(z + 0.25, 2.5))}
          className="win98-btn px-2 py-0.5 text-[11px]"
        >
          🔍 Zoom In
        </button>
        <button
          onClick={() => setZoom(z => Math.max(z - 0.25, 0.5))}
          className="win98-btn px-2 py-0.5 text-[11px]"
        >
          🔎 Zoom Out
        </button>
        <button
          onClick={() => setZoom(1)}
          className="win98-btn px-2 py-0.5 text-[11px]"
        >
          1:1
        </button>
        <div className="ml-auto text-gray-700 text-[10px]">
          Image {currentIndex + 1} of {GALLERY.length}
        </div>
      </div>

      {/* Main Image Display */}
      <div className="flex-1 bg-[#808080] win98-box-sunken p-2 overflow-auto flex items-center justify-center relative">
        <img
          src={currentItem.url}
          alt={currentItem.title}
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
          className="max-h-full max-w-full object-contain shadow-2xl transition-transform duration-150 border-2 border-black bg-black"
        />
      </div>

      {/* Info Card at bottom */}
      <div className="p-2 border-t border-[#808080] bg-[#dfdfdf] flex flex-col gap-0.5 text-[11px]">
        <div className="flex items-center justify-between font-bold text-[#000080]">
          <span>{currentItem.title}</span>
          <span className="text-gray-600 font-normal">{currentItem.date}</span>
        </div>
        <div className="text-gray-800 text-[10px] leading-relaxed">
          {currentItem.desc}
        </div>
      </div>
    </div>
  );
};
