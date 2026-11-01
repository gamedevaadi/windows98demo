import React, { useRef, useState, useEffect } from 'react';
import { SoundEngine } from '../../services/soundEngine';

const COLORS = [
  '#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080',
  '#808040', '#004040', '#0080ff', '#004080', '#8000ff', '#804000',
  '#ffffff', '#c0c0c0', '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff',
  '#ffff80', '#00ff80', '#80ffff', '#7f7fff', '#ff0080', '#ff8040'
];

export const PaintApp: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedTool, setSelectedTool] = useState<'pencil' | 'brush' | 'eraser' | 'line' | 'rect' | 'circle'>('pencil');
  const [primaryColor, setPrimaryColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [snapshot, setSnapshot] = useState<ImageData | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: Math.floor(e.clientX - rect.left),
      y: Math.floor(e.clientY - rect.top),
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const coords = getCanvasCoords(e);
    setIsDrawing(true);
    setStartPos(coords);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setSnapshot(ctx.getImageData(0, 0, canvas.width, canvas.height));

    if (selectedTool === 'pencil' || selectedTool === 'brush' || selectedTool === 'eraser') {
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
      ctx.strokeStyle = selectedTool === 'eraser' ? '#ffffff' : primaryColor;
      ctx.lineWidth = selectedTool === 'eraser' ? 14 : selectedTool === 'brush' ? 6 : strokeWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coords = getCanvasCoords(e);

    if (selectedTool === 'pencil' || selectedTool === 'brush' || selectedTool === 'eraser') {
      ctx.strokeStyle = selectedTool === 'eraser' ? '#ffffff' : primaryColor;
      ctx.lineWidth = selectedTool === 'eraser' ? 14 : selectedTool === 'brush' ? 6 : strokeWidth;
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    } else if (snapshot) {
      // For shapes, restore snapshot then draw preview
      ctx.putImageData(snapshot, 0, 0);
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = strokeWidth;

      if (selectedTool === 'line') {
        ctx.beginPath();
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
      } else if (selectedTool === 'rect') {
        ctx.strokeRect(
          Math.min(startPos.x, coords.x),
          Math.min(startPos.y, coords.y),
          Math.abs(coords.x - startPos.x),
          Math.abs(coords.y - startPos.y)
        );
      } else if (selectedTool === 'circle') {
        const rx = Math.abs(coords.x - startPos.x) / 2;
        const ry = Math.abs(coords.y - startPos.y) / 2;
        const cx = Math.min(startPos.x, coords.x) + rx;
        const cy = Math.min(startPos.y, coords.y) + ry;
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    SoundEngine.playTrash();
  };

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0] text-black text-[11px] select-none font-sans">
      {/* Top Menu Actions */}
      <div className="p-1 border-b border-[#808080] flex items-center gap-2 bg-[#c0c0c0] shrink-0">
        <button onClick={clearCanvas} className="win98-btn px-2 py-0.5 text-[11px]">
          Clear Canvas
        </button>
        <button
          onClick={() => {
            const canvas = canvasRef.current;
            if (canvas) {
              const a = document.createElement('a');
              a.download = 'untitled.png';
              a.href = canvas.toDataURL();
              a.click();
              SoundEngine.playDing();
            }
          }}
          className="win98-btn px-2 py-0.5 text-[11px]"
        >
          Save Image
        </button>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden p-1 gap-1 bg-[#808080]">
        {/* Left Toolbox */}
        <div className="w-16 win98-box-raised p-1 flex flex-col gap-1 bg-[#c0c0c0] shrink-0">
          <div className="grid grid-cols-2 gap-1">
            <button
              onClick={() => setSelectedTool('pencil')}
              className={`win98-btn w-6 h-6 flex items-center justify-center font-bold text-xs ${
                selectedTool === 'pencil' ? 'win98-btn-pressed bg-white' : ''
              }`}
              title="Pencil"
            >
              ✏️
            </button>
            <button
              onClick={() => setSelectedTool('brush')}
              className={`win98-btn w-6 h-6 flex items-center justify-center font-bold text-xs ${
                selectedTool === 'brush' ? 'win98-btn-pressed bg-white' : ''
              }`}
              title="Brush"
            >
              🖌️
            </button>
            <button
              onClick={() => setSelectedTool('eraser')}
              className={`win98-btn w-6 h-6 flex items-center justify-center font-bold text-xs ${
                selectedTool === 'eraser' ? 'win98-btn-pressed bg-white' : ''
              }`}
              title="Eraser"
            >
              ◻
            </button>
            <button
              onClick={() => setSelectedTool('line')}
              className={`win98-btn w-6 h-6 flex items-center justify-center font-bold text-xs ${
                selectedTool === 'line' ? 'win98-btn-pressed bg-white' : ''
              }`}
              title="Line"
            >
              ╱
            </button>
            <button
              onClick={() => setSelectedTool('rect')}
              className={`win98-btn w-6 h-6 flex items-center justify-center font-bold text-xs ${
                selectedTool === 'rect' ? 'win98-btn-pressed bg-white' : ''
              }`}
              title="Rectangle"
            >
              ▭
            </button>
            <button
              onClick={() => setSelectedTool('circle')}
              className={`win98-btn w-6 h-6 flex items-center justify-center font-bold text-xs ${
                selectedTool === 'circle' ? 'win98-btn-pressed bg-white' : ''
              }`}
              title="Ellipse"
            >
              ◯
            </button>
          </div>

          {/* Stroke Width Selector */}
          <div className="win98-box-sunken-gray p-1 mt-2 flex flex-col gap-1 items-center">
            {[1, 2, 4, 8].map((w) => (
              <div
                key={w}
                onClick={() => setStrokeWidth(w)}
                className={`w-full py-1 flex items-center justify-center cursor-pointer ${
                  strokeWidth === w ? 'bg-[#000080]' : 'hover:bg-gray-300'
                }`}
              >
                <div
                  style={{ height: `${w}px` }}
                  className={`w-8 ${strokeWidth === w ? 'bg-white' : 'bg-black'}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-[#808080] win98-box-sunken p-2 overflow-auto flex items-start justify-start">
          <canvas
            ref={canvasRef}
            width={480}
            height={340}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="bg-white shadow cursor-crosshair border border-black"
          />
        </div>
      </div>

      {/* Bottom Color Palette */}
      <div className="p-1 border-t border-[#808080] flex items-center gap-2 bg-[#c0c0c0] shrink-0">
        {/* Selected Color indicator box */}
        <div className="win98-box-sunken p-1 bg-[#c0c0c0] flex items-center justify-center">
          <div
            style={{ backgroundColor: primaryColor }}
            className="w-5 h-5 border border-black"
          />
        </div>

        {/* Colors Grid */}
        <div className="grid grid-cols-14 gap-[2px] win98-box-sunken p-1 bg-white">
          {COLORS.map((color, idx) => (
            <div
              key={idx}
              onClick={() => setPrimaryColor(color)}
              style={{ backgroundColor: color }}
              className="w-3.5 h-3.5 border border-gray-400 cursor-pointer hover:scale-110 active:border-black"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
