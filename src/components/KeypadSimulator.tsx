import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

export const KeypadSimulator: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [expression, setExpression] = useState<string>('');
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);

  const handleDigit = (val: string) => {
    if (hasCalculated) {
      setDisplay(val);
      setExpression(val);
      setHasCalculated(false);
      return;
    }
    if (display === '0' && val !== '.') {
      setDisplay(val);
      setExpression(val);
    } else {
      setDisplay((prev) => prev + val);
      setExpression((prev) => prev + val);
    }
  };

  const handleOperator = (op: string) => {
    setHasCalculated(false);
    if (expression === '' && display !== '0') {
      setExpression(display + op);
      setDisplay((prev) => prev + op);
      return;
    }
    setExpression((prev) => prev + op);
    setDisplay((prev) => prev + op);
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
    setHasCalculated(false);
  };

  const handleEquals = () => {
    try {
      if (expression.includes('/0')) {
        setDisplay('Erro: Divisão por zero!');
        setExpression('');
        setHasCalculated(true);
        return;
      }
      // Clean arithmetic evaluation
      // eslint-disable-next-line no-eval
      const result = Function(`'use strict'; return (${expression})`)();
      if (!isFinite(result)) {
        setDisplay('Erro: Divisão por zero!');
        setExpression('');
      } else {
        const formatted = Number.isInteger(result) ? result.toString() : parseFloat(result.toFixed(4)).toString();
        setDisplay(formatted);
        setExpression(formatted);
      }
    } catch {
      setDisplay('Erro de sintaxe');
      setExpression('');
    }
    setHasCalculated(true);
  };

  const keypadButtons = [
    { label: 'C', action: handleClear, color: 'bg-rose-600 hover:bg-rose-700 text-white' },
    { label: '÷', action: () => handleOperator('/'), color: 'bg-sky-600 hover:bg-sky-700 text-white' },
    { label: '×', action: () => handleOperator('*'), color: 'bg-sky-600 hover:bg-sky-700 text-white' },
    { label: '−', action: () => handleOperator('-'), color: 'bg-sky-600 hover:bg-sky-700 text-white' },

    { label: '7', action: () => handleDigit('7'), color: 'bg-slate-700 hover:bg-slate-600 text-white' },
    { label: '8', action: () => handleDigit('8'), color: 'bg-slate-700 hover:bg-slate-600 text-white' },
    { label: '9', action: () => handleDigit('9'), color: 'bg-slate-700 hover:bg-slate-600 text-white' },
    { label: '+', action: () => handleOperator('+'), color: 'bg-sky-600 hover:bg-sky-700 text-white' },

    { label: '4', action: () => handleDigit('4'), color: 'bg-slate-700 hover:bg-slate-600 text-white' },
    { label: '5', action: () => handleDigit('5'), color: 'bg-slate-700 hover:bg-slate-600 text-white' },
    { label: '6', action: () => handleDigit('6'), color: 'bg-slate-700 hover:bg-slate-600 text-white' },
    { label: '=', action: handleEquals, color: 'bg-emerald-600 hover:bg-emerald-700 text-white' },

    { label: '1', action: () => handleDigit('1'), color: 'bg-slate-700 hover:bg-slate-600 text-white' },
    { label: '2', action: () => handleDigit('2'), color: 'bg-slate-700 hover:bg-slate-600 text-white' },
    { label: '3', action: () => handleDigit('3'), color: 'bg-slate-700 hover:bg-slate-600 text-white' },
    { label: '0', action: () => handleDigit('0'), color: 'bg-slate-700 hover:bg-slate-600 text-white' },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[340px] bg-slate-900 rounded-xl shadow-lg border border-slate-700 overflow-hidden">
        {/* Title Bar */}
        <div className="bg-slate-950 px-3 py-2 flex items-center justify-between text-slate-300 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
            <span className="ml-2 font-medium text-[11px]">Calculadora Clássica (Grid)</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">320x420</span>
        </div>

        {/* Display */}
        <div className="p-4 bg-slate-900">
          <div className="bg-slate-800 rounded-lg p-3 text-right border border-slate-700">
            <span className="text-[10px] font-mono text-slate-400 block mb-0.5">
              textvariable = variavel_tela
            </span>
            <div className="text-2xl font-mono font-bold text-sky-400 overflow-x-auto whitespace-nowrap">
              {display}
            </div>
          </div>
        </div>

        {/* Keypad Grid */}
        <div className="p-4 pt-0 grid grid-cols-4 gap-2">
          {keypadButtons.map((btn, i) => (
            <button
              key={i}
              onClick={btn.action}
              className={`h-12 rounded-lg font-bold text-base transition active:scale-95 shadow-xs ${btn.color}`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <div className="p-3 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Grade 4x4 com tk.Button</span>
          <button
            onClick={handleClear}
            className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
