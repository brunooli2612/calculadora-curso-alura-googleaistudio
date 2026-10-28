import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, Layers, Info } from 'lucide-react';
import { PYTHON_CODE_TWO_INPUTS, PYTHON_CODE_KEYPAD } from '../data/pythonCode';

interface CodeViewerProps {
  onDownloadPy: () => void;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ onDownloadPy }) => {
  const [selectedVersion, setSelectedVersion] = useState<'two_inputs' | 'keypad'>('two_inputs');
  const [copied, setCopied] = useState<boolean>(false);
  const [activeAnnotation, setActiveAnnotation] = useState<string | null>(null);

  const currentCode = selectedVersion === 'two_inputs' ? PYTHON_CODE_TWO_INPUTS : PYTHON_CODE_KEYPAD;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeLines = currentCode.trim().split('\n');

  return (
    <div className="space-y-6">
      {/* Version Selector Tabs & Action Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileCode className="w-4 h-4 text-sky-700" />
            <h3 className="text-sm font-bold text-slate-900">
              Código-Fonte em Python (Comentado e Didático)
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Utiliza exclusivamente a biblioteca nativa <code className="font-mono bg-slate-100 px-1 rounded text-slate-800">tkinter</code> (sem necessidade de instalar nada).
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Version Switcher */}
          <div className="flex items-center p-1 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setSelectedVersion('two_inputs')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                selectedVersion === 'two_inputs'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Modelo Didático (2 Campos)
            </button>
            <button
              onClick={() => setSelectedVersion('keypad')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                selectedVersion === 'keypad'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Modelo Grade (0-9)
            </button>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition"
            title="Copiar código para a área de transferência"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar</span>
              </>
            )}
          </button>

          {/* Download Button */}
          <button
            onClick={onDownloadPy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Salvar .py</span>
          </button>
        </div>
      </div>

      {/* Code Explanatory Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div
          onClick={() => setActiveAnnotation(activeAnnotation === 'tk' ? null : 'tk')}
          className={`p-3 rounded-lg border cursor-pointer transition text-xs ${
            activeAnnotation === 'tk'
              ? 'bg-sky-50 border-sky-300 ring-1 ring-sky-300'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
            <Layers className="w-3.5 h-3.5 text-sky-600" />
            <span>1. Inicialização Tkinter</span>
          </div>
          <p className="text-[11px] text-slate-500">
            <code className="font-mono">tk.Tk()</code>, <code className="font-mono">.title()</code>, <code className="font-mono">.geometry()</code>
          </p>
        </div>

        <div
          onClick={() => setActiveAnnotation(activeAnnotation === 'inputs' ? null : 'inputs')}
          className={`p-3 rounded-lg border cursor-pointer transition text-xs ${
            activeAnnotation === 'inputs'
              ? 'bg-sky-50 border-sky-300 ring-1 ring-sky-300'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
            <Layers className="w-3.5 h-3.5 text-sky-600" />
            <span>2. Widgets de Entrada</span>
          </div>
          <p className="text-[11px] text-slate-500">
            <code className="font-mono">tk.Entry()</code> e método <code className="font-mono">.get()</code>
          </p>
        </div>

        <div
          onClick={() => setActiveAnnotation(activeAnnotation === 'events' ? null : 'events')}
          className={`p-3 rounded-lg border cursor-pointer transition text-xs ${
            activeAnnotation === 'events'
              ? 'bg-sky-50 border-sky-300 ring-1 ring-sky-300'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
            <Layers className="w-3.5 h-3.5 text-sky-600" />
            <span>3. Botões e Lambda</span>
          </div>
          <p className="text-[11px] text-slate-500">
            <code className="font-mono">command=lambda: ...</code> para passagem de parâmetro
          </p>
        </div>

        <div
          onClick={() => setActiveAnnotation(activeAnnotation === 'errors' ? null : 'errors')}
          className={`p-3 rounded-lg border cursor-pointer transition text-xs ${
            activeAnnotation === 'errors'
              ? 'bg-sky-50 border-sky-300 ring-1 ring-sky-300'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
            <Layers className="w-3.5 h-3.5 text-sky-600" />
            <span>4. Tratamento de Erros</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Divisão por zero preventiva e <code className="font-mono">try/except ValueError</code>
          </p>
        </div>
      </div>

      {/* Code Container with Line Numbers */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-md">
        <div className="bg-slate-950 px-4 py-2.5 flex items-center justify-between text-xs text-slate-400 border-b border-slate-800">
          <div className="flex items-center gap-2 font-mono">
            <span className="text-sky-400 font-semibold">calculadora_{selectedVersion}.py</span>
            <span className="text-slate-600">·</span>
            <span>{codeLines.length} linhas</span>
            <span className="text-slate-600">·</span>
            <span>Python 3.x</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <Info className="w-3.5 h-3.5 text-sky-400" />
            <span>Pronto para copiar e colar no VS Code ou IDLE</span>
          </div>
        </div>

        <div className="overflow-x-auto max-h-[620px] p-4 text-xs font-mono leading-relaxed select-text">
          <table className="w-full border-collapse">
            <tbody>
              {codeLines.map((line, index) => {
                const lineNum = index + 1;
                const isComment = line.trim().startsWith('#') || line.trim().startsWith('"""');
                const isImport = line.trim().startsWith('import') || line.trim().startsWith('from');
                const isDef = line.trim().startsWith('def ') || line.trim().startsWith('class ');

                return (
                  <tr key={index} className="hover:bg-slate-800/50 transition-colors">
                    <td className="w-10 pr-4 text-right text-slate-600 select-none font-mono text-[11px]">
                      {lineNum}
                    </td>
                    <td
                      className={`whitespace-pre ${
                        isComment
                          ? 'text-slate-500 italic'
                          : isImport
                          ? 'text-pink-400 font-semibold'
                          : isDef
                          ? 'text-yellow-300 font-semibold'
                          : 'text-slate-200'
                      }`}
                    >
                      {line}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
