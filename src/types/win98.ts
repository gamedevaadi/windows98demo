export type WindowId = 
  | 'welcome'
  | 'system_properties'
  | 'my_computer'
  | 'my_documents'
  | 'internet_explorer'
  | 'recycle_bin'
  | 'notepad'
  | 'paint'
  | 'calculator'
  | 'cmd'
  | 'minesweeper'
  | 'mario'
  | 'pinball'
  | 'winamp'
  | 'outlook'
  | 'image_viewer'
  | 'control_panel'
  | 'run_dialog'
  | 'dialup'
  | 'wordpad'
  | 'network_neighborhood';

export interface WindowState {
  id: WindowId;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  extraData?: any;
}

export interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'text' | 'image' | 'audio' | 'app' | 'system';
  icon: string;
  size?: string;
  date?: string;
  content?: string;
  imageUrl?: string;
  appTarget?: WindowId;
  children?: FileItem[];
}

export interface DesktopIcon {
  id: string;
  title: string;
  icon: string;
  action: () => void;
  x?: number;
  y?: number;
}
