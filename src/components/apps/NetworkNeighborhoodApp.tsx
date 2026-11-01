import React, { useState } from 'react';
import { WinIcon } from '../common/WinIcon';
import { SoundEngine } from '../../services/soundEngine';

interface NetworkNode {
  id: string;
  name: string;
  comment: string;
  icon: string;
  shares: string[];
}

const NODES: NetworkNode[] = [
  {
    id: 'desktop_pentium2',
    name: 'DESKTOP-P2',
    comment: 'Windows 98 Second Edition (This Computer)',
    icon: 'my_computer',
    shares: ['C$ (Default Drive)', 'My Documents (Shared)', 'Printers']
  },
  {
    id: 'server_winnt',
    name: 'SERVER-NT4',
    comment: 'Windows NT Server 4.0 Domain Controller',
    icon: 'computer',
    shares: ['Public Share', 'Software Archives', 'Netlogon']
  },
  {
    id: 'gateway_router',
    name: 'DIALUP-GATEWAY',
    comment: 'Internet Connection Sharing (ICS) Gateway',
    icon: 'network_neighborhood',
    shares: ['Internet Gateway (56,600 bps)', 'DNS Relay']
  },
  {
    id: 'hp_laserjet',
    name: 'HP-LASERJET-6L',
    comment: 'Shared Office Laser Printer',
    icon: 'settings',
    shares: ['HP LaserJet 6L (Ready, Spooling active)']
  }
];

export const NetworkNeighborhoodApp: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [activeShareView, setActiveShareView] = useState<NetworkNode | null>(null);

  const handleNodeClick = (node: NetworkNode) => {
    setSelectedNodeId(node.id);
  };

  const handleNodeDoubleClick = (node: NetworkNode) => {
    SoundEngine.playDing();
    setActiveShareView(node);
  };

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0] text-black text-[11px] select-none font-sans">
      {/* Toolbar */}
      <div className="p-1 border-b border-[#808080] flex items-center gap-1 bg-[#c0c0c0] shrink-0">
        <button
          onClick={() => { setActiveShareView(null); SoundEngine.playDing(); }}
          disabled={!activeShareView}
          className="win98-btn px-2 py-0.5 flex items-center gap-1 text-[11px] disabled:opacity-50"
        >
          <span>◄</span> Back
        </button>
        <button
          onClick={() => { setActiveShareView(null); SoundEngine.playDing(); }}
          disabled={!activeShareView}
          className="win98-btn px-2 py-0.5 flex items-center gap-1 text-[11px] disabled:opacity-50"
        >
          <span>▲</span> Up
        </button>
        <div className="h-4 w-[1px] bg-gray-400 mx-1" />
        <span className="font-bold text-[#000080]">Workgroup: WORKGROUP</span>
      </div>

      {/* Address Bar */}
      <div className="px-1 py-1 border-b border-[#808080] flex items-center gap-2 bg-[#c0c0c0] shrink-0">
        <span className="text-[11px] text-gray-700">Address:</span>
        <div className="flex-1 win98-box-sunken px-2 py-0.5 text-[11px] font-sans bg-white truncate">
          {activeShareView ? `\\\\${activeShareView.name}` : 'Network Neighborhood\\Entire Network\\WORKGROUP'}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white win98-box-sunken p-3 overflow-y-auto">
        {activeShareView ? (
          <div>
            <div className="flex items-center gap-2 mb-3 border-b border-gray-300 pb-2">
              <WinIcon name={activeShareView.icon} size={32} />
              <div>
                <div className="font-bold text-sm text-[#000080]">{activeShareView.name}</div>
                <div className="text-[10px] text-gray-600">{activeShareView.comment}</div>
              </div>
            </div>
            <div className="text-[11px] font-bold text-gray-700 mb-2">Shared Resources:</div>
            <div className="space-y-1.5">
              {activeShareView.shares.map((share, idx) => (
                <div
                  key={idx}
                  onClick={() => SoundEngine.playDing()}
                  className="flex items-center gap-2 p-1.5 hover:bg-blue-50 cursor-pointer border border-transparent hover:border-blue-300"
                >
                  <WinIcon name="folder" size={20} />
                  <span className="font-semibold">{share}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {NODES.map((node) => {
              const isSelected = selectedNodeId === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => handleNodeClick(node)}
                  onDoubleClick={() => handleNodeDoubleClick(node)}
                  className={`flex flex-col items-center p-2 cursor-pointer text-center rounded-none ${
                    isSelected ? 'bg-[#000080] text-white' : 'hover:bg-blue-50 text-black'
                  }`}
                >
                  <WinIcon name={node.icon} size={32} />
                  <span className="text-[11px] font-bold mt-1 break-words leading-tight">
                    {node.name}
                  </span>
                  <span className={`text-[9px] mt-0.5 leading-tight ${isSelected ? 'text-blue-200' : 'text-gray-500'}`}>
                    {node.comment}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="px-2 py-0.5 border-t border-[#808080] flex items-center justify-between text-[10px] bg-[#c0c0c0] text-black shrink-0">
        <div>{NODES.length} computer(s) online in workgroup</div>
        <div>TCP/IP Network (10/100 Mbps)</div>
      </div>
    </div>
  );
};
