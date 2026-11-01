import React, { useState } from 'react';
import { WinIcon } from '../common/WinIcon';
import { SoundEngine } from '../../services/soundEngine';

interface InternetExplorerAppProps {
  initialUrl?: string;
}

export const InternetExplorerApp: React.FC<InternetExplorerAppProps> = ({
  initialUrl = 'http://www.google.com',
}) => {
  const [url, setUrl] = useState(initialUrl);
  const [currentSite, setCurrentSite] = useState<'google' | 'yahoo' | 'geocities' | 'msn'>('google');
  const [history, setHistory] = useState<string[]>([initialUrl]);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [guestbookEntries, setGuestbookEntries] = useState<string[]>([
    'Cool webpage! Check out my DragonBall Z gif page! - Neo99',
    'Netscape 4.0 rules! - CyberSurfer',
    'Y2K is coming, back up your hard drive! - Agent_Fox'
  ]);
  const [newGuestbookMsg, setNewGuestbookMsg] = useState('');
  const [isDialing, setIsDialing] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  const navigateTo = (newUrl: string) => {
    setUrl(newUrl);
    setHistory(prev => [...prev, newUrl]);
    setHasSearched(false);

    if (newUrl.includes('google')) setCurrentSite('google');
    else if (newUrl.includes('yahoo')) setCurrentSite('yahoo');
    else if (newUrl.includes('geocities')) setCurrentSite('geocities');
    else if (newUrl.includes('msn') || newUrl.includes('microsoft')) setCurrentSite('msn');
    else setCurrentSite('google');
  };

  const handleDialUp = () => {
    setIsDialing(true);
    setIsConnected(false);
    SoundEngine.playModem(() => {
      setIsDialing(false);
      setIsConnected(true);
      SoundEngine.playDing();
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setHasSearched(true);
    SoundEngine.playDing();
  };

  const handleAddGuestbook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestbookMsg.trim()) return;
    setGuestbookEntries(prev => [newGuestbookMsg.trim(), ...prev]);
    setNewGuestbookMsg('');
    SoundEngine.playDing();
  };

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0] text-black text-[11px] select-none font-sans">
      {/* Top Navigation Toolbar */}
      <div className="p-1 border-b border-[#808080] flex flex-wrap items-center gap-1 bg-[#c0c0c0] shrink-0">
        <button
          onClick={() => {
            if (history.length > 1) {
              const prev = history[history.length - 2];
              setHistory(h => h.slice(0, -1));
              navigateTo(prev);
            }
          }}
          className="win98-btn px-2 py-0.5 flex items-center gap-1 text-[11px]"
        >
          <span>◄</span> Back
        </button>
        <button
          onClick={() => navigateTo('http://www.google.com')}
          className="win98-btn px-2 py-0.5 flex items-center gap-1 text-[11px]"
        >
          <span>►</span> Fwd
        </button>
        <button
          onClick={() => SoundEngine.playError()}
          className="win98-btn px-2 py-0.5 flex items-center gap-1 text-[11px]"
        >
          <span>✕</span> Stop
        </button>
        <button
          onClick={() => SoundEngine.playDing()}
          className="win98-btn px-2 py-0.5 flex items-center gap-1 text-[11px]"
        >
          <span>↻</span> Refresh
        </button>
        <button
          onClick={() => navigateTo('http://www.google.com')}
          className="win98-btn px-2 py-0.5 flex items-center gap-1 text-[11px]"
        >
          <span>🏠</span> Home
        </button>
        <div className="h-4 w-[1px] bg-gray-400 mx-1" />
        <button
          onClick={() => navigateTo('http://www.msn.com')}
          className="win98-btn px-2 py-0.5 text-[11px] font-bold text-[#000080]"
        >
          ★ MSN.com
        </button>
        <button
          onClick={() => navigateTo('http://www.yahoo.com')}
          className="win98-btn px-2 py-0.5 text-[11px]"
        >
          ★ Yahoo!
        </button>
        <button
          onClick={() => navigateTo('http://www.geocities.com/abandoned_pc')}
          className="win98-btn px-2 py-0.5 text-[11px]"
        >
          ★ GeoCities
        </button>
        <div className="ml-auto flex items-center gap-1">
          <button
            onClick={handleDialUp}
            disabled={isDialing}
            className="win98-btn px-2 py-0.5 text-[10px] bg-yellow-100 flex items-center gap-1"
            title="Redial 56k Modem Handshake Sound"
          >
            <span>☎</span> {isDialing ? 'Dialing 56k...' : 'Dial Modem'}
          </button>
          <div className="w-5 h-5 flex items-center justify-center win98-box-sunken bg-black">
            <span className={`text-[10px] font-bold ${isDialing ? 'text-yellow-400 animate-pulse' : 'text-green-400'}`}>
              e
            </span>
          </div>
        </div>
      </div>

      {/* Address Bar */}
      <div className="px-1 py-1 border-b border-[#808080] flex items-center gap-2 bg-[#c0c0c0] shrink-0">
        <span className="text-[11px] text-gray-700">Address:</span>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') navigateTo(url);
          }}
          className="flex-1 win98-box-sunken px-2 py-0.5 text-[11px] font-sans bg-white outline-none"
        />
        <button
          onClick={() => navigateTo(url)}
          className="win98-btn px-3 py-0.5 text-[11px] font-bold"
        >
          Go
        </button>
      </div>

      {/* Browser Viewport Area */}
      <div className="flex-1 bg-white win98-box-sunken overflow-y-auto relative text-black p-4">
        {/* Dialing Overlay */}
        {isDialing && (
          <div className="absolute inset-0 bg-[#c0c0c0]/90 z-20 flex flex-col items-center justify-center p-4">
            <div className="win98-box-raised p-4 bg-[#c0c0c0] max-w-sm w-full space-y-3">
              <div className="win98-title-active px-2 py-0.5 font-bold text-white text-[11px]">
                Connecting to MSN Internet Access...
              </div>
              <div className="p-2 space-y-2 text-[11px]">
                <div>Dialing: 1-800-555-0199...</div>
                <div className="text-blue-800 font-semibold animate-pulse">
                  Negotiating baud rate: 56,600 bps V.90...
                </div>
                <div className="win98-box-sunken-gray p-1 h-3 overflow-hidden bg-gray-200">
                  <div className="bg-[#000080] h-full w-2/3 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 1. Google 1998 Stanford Beta */}
        {currentSite === 'google' && (
          <div className="max-w-xl mx-auto flex flex-col items-center text-center font-serif py-4">
            {/* Retro 1998 Google Logo */}
            <div className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 select-none">
              <span className="text-[#1040f0]">G</span>
              <span className="text-[#ea4335]">o</span>
              <span className="text-[#fbbc05]">o</span>
              <span className="text-[#1040f0]">g</span>
              <span className="text-[#34a853]">l</span>
              <span className="text-[#ea4335]">e</span>
              <span className="text-[#1040f0]">!</span>
            </div>

            <div className="text-[12px] font-sans mb-3 text-gray-800">
              Search the web using Google!
            </div>

            <form onSubmit={handleSearchSubmit} className="w-full max-w-md flex flex-col items-center gap-2 mb-2 font-sans">
              <input
                type="text"
                value={searchQuery}
                placeholder="Search 1998 web... (try 'world cup', 'mario', 'windows 98', 'titanic')"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full win98-box-sunken px-2 py-1 text-sm outline-none border border-black bg-white"
              />
              <div className="flex items-center gap-2 text-[11px]">
                <button type="submit" className="win98-btn px-3 py-1 font-sans">
                  Google Search
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('super mario');
                    setHasSearched(true);
                  }}
                  className="win98-btn px-3 py-1 font-sans"
                >
                  I&apos;m feeling lucky
                </button>
              </div>
            </form>

            <div className="text-[11px] font-sans text-gray-700 mt-2 mb-4">
              Index contains <strong className="text-black">~25 million pages</strong> (soon to be much bigger)
            </div>

            {/* Simulated Search Results */}
            {hasSearched ? (
              <div className="w-full text-left font-sans text-[12px] space-y-3 border-t border-gray-400 pt-3">
                <div className="text-gray-500 text-[11px]">
                  Searched for <strong>&quot;{searchQuery}&quot;</strong>. Found 3 results in 0.14 seconds:
                </div>
                <div className="p-2 border-b border-gray-200">
                  <a href="#result" className="text-blue-800 font-bold underline hover:text-red-700">
                    1998 FIFA World Cup Official Archive - Stade de France
                  </a>
                  <p className="text-gray-700 text-[11px] mt-0.5">
                    France defeats Brazil 3-0 in Saint-Denis. Zinedine Zidane scores twice. Photo archives saved on local C: drive.
                  </p>
                  <span className="text-green-700 text-[10px]">http://www.fifa98.com/france/cup.html - 14k - Cached</span>
                </div>
                <div className="p-2 border-b border-gray-200">
                  <a href="#result" className="text-blue-800 font-bold underline hover:text-red-700">
                    Super Mario Bros. - Classic Nintendo Arcade Guide
                  </a>
                  <p className="text-gray-700 text-[11px] mt-0.5">
                    World 1-1 walk-through, secret 1-up mushroom locations, warp zones, and Bowser castle strategies.
                  </p>
                  <span className="text-green-700 text-[10px]">http://www.nintendo.com/games/nes/mario.html - 18k - Cached</span>
                </div>
                <div className="p-2 border-b border-gray-200">
                  <a href="#result" className="text-blue-800 font-bold underline hover:text-red-700">
                    Microsoft Windows 98 Second Edition Support Center
                  </a>
                  <p className="text-gray-700 text-[11px] mt-0.5">
                    Product release notes, Internet Explorer 5 updates, DirectX 6.1 drivers, and FAT32 disk utilities.
                  </p>
                  <span className="text-green-700 text-[10px]">http://support.microsoft.com/windows98 - 32k</span>
                </div>
              </div>
            ) : (
              <div className="font-sans text-[11px] space-y-1.5 text-blue-800 underline">
                <div><a href="#stanford" onClick={() => { setSearchQuery('Stanford Linux'); setHasSearched(true); }}>Stanford Search</a> · <a href="#linux" onClick={() => { setSearchQuery('Linux Kernel'); setHasSearched(true); }}>Linux Search</a></div>
                <div className="text-gray-600 no-underline text-[10px] mt-2">
                  Copyright ©1997-8 Stanford University
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. MSN.com (1998) */}
        {currentSite === 'msn' && (
          <div className="max-w-2xl mx-auto font-sans text-[11px]">
            <div className="bg-[#000080] text-white p-3 mb-3 border-2 border-[#c0c0c0] flex items-center justify-between">
              <div>
                <span className="text-xl font-bold tracking-tight">MSN.COM</span>
                <span className="ml-2 text-xs text-yellow-300">The Microsoft Network</span>
              </div>
              <div className="text-[10px] text-gray-200">
                Hotmail · MSNBC · Expedia · CarPoint
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="border border-gray-300 p-2 bg-[#f9f9f9]">
                <strong className="text-blue-800 underline block mb-1">MSNBC News</strong>
                <div className="text-gray-700 space-y-0.5 text-[10px]">
                  <div>• Dow Jones Industrial Average sets record high</div>
                  <div>• STS-95 Shuttle Mission with John Glenn</div>
                  <div>• International Space Station first module launches</div>
                </div>
              </div>

              <div className="border border-gray-300 p-2 bg-[#f9f9f9]">
                <strong className="text-blue-800 underline block mb-1">Computing &amp; Web</strong>
                <div className="text-gray-700 space-y-0.5 text-[10px]">
                  <div>• Download Internet Explorer 5.0</div>
                  <div>• DirectX 6.1 gaming enhancements</div>
                  <div>• Windows 98 Second Edition availability</div>
                </div>
              </div>

              <div className="border border-gray-300 p-2 bg-[#f9f9f9]">
                <strong className="text-blue-800 underline block mb-1">Entertainment</strong>
                <div className="text-gray-700 space-y-0.5 text-[10px]">
                  <div>• Box office: Titanic surpasses $1 Billion</div>
                  <div>• Gaming: Half-Life, StarCraft, Super Mario</div>
                  <div>• MTV Music Video Awards 1998</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Yahoo! 1999 Classic Directory */}
        {currentSite === 'yahoo' && (
          <div className="max-w-2xl mx-auto font-sans text-[11px]">
            <div className="bg-[#ffff00] border-2 border-red-600 p-2 text-center mb-3">
              <span className="text-2xl font-black text-red-600 tracking-tight font-serif">YAHOO!</span>
              <span className="ml-2 text-xs font-bold text-blue-800">What&apos;s New · Check Email · Yahoo! Mail</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="border border-gray-300 p-2 bg-[#f9f9f9]">
                <strong className="text-blue-800 underline block mb-1">Computers &amp; Internet</strong>
                <div className="text-gray-700 space-y-0.5 text-[10px]">
                  <div>Internet, WWW, Software, Games</div>
                  <div className="text-red-600 font-bold">Y2K Bug Resource Center</div>
                </div>
              </div>

              <div className="border border-gray-300 p-2 bg-[#f9f9f9]">
                <strong className="text-blue-800 underline block mb-1">Entertainment</strong>
                <div className="text-gray-700 space-y-0.5 text-[10px]">
                  <div>Movies, Music, Humor, Video Games</div>
                  <div>MP3 audio download directory</div>
                </div>
              </div>

              <div className="border border-gray-300 p-2 bg-[#f9f9f9]">
                <strong className="text-blue-800 underline block mb-1">News &amp; Media</strong>
                <div className="text-gray-700 space-y-0.5 text-[10px]">
                  <div>Current Events, Newspapers, TV</div>
                  <div>World Cup 1998 Coverage</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. GeoCities Personal Homepage */}
        {currentSite === 'geocities' && (
          <div className="max-w-xl mx-auto bg-black text-[#00ff00] p-4 font-mono text-[11px] border-4 border-dashed border-[#ff00ff]">
            <div className="text-center space-y-1 mb-4">
              <div className="text-lg font-black text-yellow-300 tracking-widest animate-bounce">
                🔥 ~* WELCOME TO CYBER-VAULT 1998 *~ 🔥
              </div>
              <div className="text-[10px] text-pink-400">
                [ BEST VIEWED IN NETSCAPE NAVIGATOR 4.0 OR IE 5 AT 800x600 ]
              </div>
              <div className="inline-block bg-yellow-400 text-black px-2 py-0.5 font-bold text-[10px]">
                ⚠️ UNDER CONSTRUCTION ⚠️
              </div>
            </div>

            <p className="text-cyan-300 mb-3 leading-relaxed">
              Hello fellow net-surfer! You have tapped into my Windows 98 personal homepage. I love playing Super Mario Bros, Space Cadet Pinball, listening to Winamp, and browsing the net!
            </p>

            {/* Hit Counter */}
            <div className="my-3 text-center">
              <span className="text-white text-[10px]">YOU ARE VISITOR NUMBER: </span>
              <span className="bg-black text-red-500 font-bold border border-red-500 px-2 py-0.5 text-xs">
                0004289
              </span>
            </div>

            {/* Interactive Guestbook */}
            <div className="border-t border-[#00ff00] pt-3 mt-3">
              <div className="font-bold text-yellow-300 mb-2">📜 SIGN MY WEB GUESTBOOK:</div>
              <form onSubmit={handleAddGuestbook} className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newGuestbookMsg}
                  onChange={(e) => setNewGuestbookMsg(e.target.value)}
                  placeholder="Leave a message..."
                  className="flex-1 bg-[#101010] text-[#00ff00] border border-[#00ff00] px-2 py-1 text-[11px] outline-none"
                />
                <button type="submit" className="win98-btn px-3 py-1 text-black font-bold">
                  Sign!
                </button>
              </form>

              <div className="space-y-1 max-h-36 overflow-y-auto">
                {guestbookEntries.map((entry, idx) => (
                  <div key={idx} className="text-[10px] bg-[#111] p-1 border-l-2 border-[#00ff00]">
                    &gt; {entry}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Browser Status Bar */}
      <div className="px-2 py-0.5 border-t border-[#808080] flex items-center justify-between text-[10px] bg-[#c0c0c0] text-black">
        <div className="flex items-center gap-2">
          <span>●</span>
          <span>{isConnected ? 'Internet connection active (56,600 bps)' : 'Offline / Disconnected'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="win98-box-sunken-gray px-1">Internet Zone</span>
        </div>
      </div>
    </div>
  );
};
