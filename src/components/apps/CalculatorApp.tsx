import React, { useState } from 'react';
import { SoundEngine } from '../../services/soundEngine';

export const CalculatorApp: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory, setMemory] = useState<number>(0);

  const inputDigit = (digit: string) => {
    SoundEngine.playDing();
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDot = () => {
    SoundEngine.playDing();
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setWaitingForOperand(false);
    SoundEngine.playDing();
  };

  const clearEntry = () => {
    setDisplay('0');
    setWaitingForOperand(false);
    SoundEngine.playDing();
  };

  const performOperation = (nextOp: string) => {
    SoundEngine.playDing();
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operation) {
      const currentVal = prevValue || 0;
      let result = 0;
      switch (operation) {
        case '+': result = currentVal + inputValue; break;
        case '-': result = currentVal - inputValue; break;
        case '*': result = currentVal * inputValue; break;
        case '/': result = inputValue !== 0 ? currentVal / inputValue : 0; break;
        default: result = inputValue;
      }
      setPrevValue(result);
      setDisplay(String(result));
    }

    setWaitingForOperand(true);
    setOperation(nextOp);
  };

  const handleEquals = () => {
    SoundEngine.playDing();
    if (!operation || prevValue === null) return;
    const inputValue = parseFloat(display);
    let result = 0;
    switch (operation) {
      case '+': result = prevValue + inputValue; break;
      case '-': result = prevValue - inputValue; break;
      case '*': result = prevValue * inputValue; break;
      case '/': result = inputValue !== 0 ? prevValue / inputValue : 0; break;
      default: result = inputValue;
    }
    setDisplay(String(result));
    setPrevValue(null);
    setOperation(null);
    setWaitingForOperand(true);
  };

  const handleSqrt = () => {
    const val = parseFloat(display);
    if (val >= 0) {
      setDisplay(String(Math.sqrt(val)));
      setWaitingForOperand(true);
      SoundEngine.playDing();
    } else {
      SoundEngine.playError();
      setDisplay('Invalid input');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0] text-black text-[11px] select-none font-sans p-2 items-center justify-center">
      <div className="w-64 win98-box-raised p-2 bg-[#c0c0c0]">
        {/* LCD Display */}
        <div className="win98-box-sunken p-1.5 mb-2 bg-white text-right font-mono text-lg font-bold truncate">
          {display}
        </div>

        {/* Memory Bar */}
        <div className="flex justify-between items-center mb-2 px-1 text-[10px]">
          <div className="win98-box-sunken w-6 h-5 flex items-center justify-center font-bold text-gray-700 bg-[#dfdfdf]">
            {memory !== 0 ? 'M' : ''}
          </div>
          <div className="flex gap-1">
            <button onClick={clearEntry} className="win98-btn px-2 py-0.5 text-red-700 font-bold">
              CE
            </button>
            <button onClick={clearAll} className="win98-btn px-2 py-0.5 text-red-700 font-bold">
              C
            </button>
          </div>
        </div>

        {/* Calculator Keypad */}
        <div className="grid grid-cols-5 gap-1 text-[11px]">
          <button onClick={() => { setMemory(0); SoundEngine.playDing(); }} className="win98-btn py-1 font-bold text-red-700">MC</button>
          <button onClick={() => inputDigit('7')} className="win98-btn py-1 font-bold text-blue-900">7</button>
          <button onClick={() => inputDigit('8')} className="win98-btn py-1 font-bold text-blue-900">8</button>
          <button onClick={() => inputDigit('9')} className="win98-btn py-1 font-bold text-blue-900">9</button>
          <button onClick={() => performOperation('/')} className="win98-btn py-1 font-bold text-red-700">/</button>

          <button onClick={() => { setDisplay(String(memory)); setWaitingForOperand(true); SoundEngine.playDing(); }} className="win98-btn py-1 font-bold text-red-700">MR</button>
          <button onClick={() => inputDigit('4')} className="win98-btn py-1 font-bold text-blue-900">4</button>
          <button onClick={() => inputDigit('5')} className="win98-btn py-1 font-bold text-blue-900">5</button>
          <button onClick={() => inputDigit('6')} className="win98-btn py-1 font-bold text-blue-900">6</button>
          <button onClick={() => performOperation('*')} className="win98-btn py-1 font-bold text-red-700">*</button>

          <button onClick={() => { setMemory(parseFloat(display)); SoundEngine.playDing(); }} className="win98-btn py-1 font-bold text-red-700">MS</button>
          <button onClick={() => inputDigit('1')} className="win98-btn py-1 font-bold text-blue-900">1</button>
          <button onClick={() => inputDigit('2')} className="win98-btn py-1 font-bold text-blue-900">2</button>
          <button onClick={() => inputDigit('3')} className="win98-btn py-1 font-bold text-blue-900">3</button>
          <button onClick={() => performOperation('-')} className="win98-btn py-1 font-bold text-red-700">-</button>

          <button onClick={() => { setMemory(m => m + parseFloat(display)); SoundEngine.playDing(); }} className="win98-btn py-1 font-bold text-red-700">M+</button>
          <button onClick={() => inputDigit('0')} className="win98-btn py-1 font-bold text-blue-900">0</button>
          <button onClick={() => setDisplay(d => d.startsWith('-') ? d.slice(1) : '-' + d)} className="win98-btn py-1 font-bold">+/-</button>
          <button onClick={inputDot} className="win98-btn py-1 font-bold">.</button>
          <button onClick={() => performOperation('+')} className="win98-btn py-1 font-bold text-red-700">+</button>
        </div>

        {/* Bottom Equaler & Functions */}
        <div className="grid grid-cols-2 gap-1 mt-1">
          <button onClick={handleSqrt} className="win98-btn py-1 font-bold text-blue-800">
            sqrt
          </button>
          <button onClick={handleEquals} className="win98-btn py-1 font-bold text-red-700 bg-yellow-100">
            =
          </button>
        </div>
      </div>
    </div>
  );
};
