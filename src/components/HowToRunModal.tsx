import React from 'react';
import { X, Terminal, CheckCircle2, Copy, Check } from 'lucide-react';

interface HowToRunModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadPy: () => void;
}

export const HowToRunModal: React.FC<HowToRunModalProps> = ({ isOpen, onClose, onDownloadPy }) => {
  const [copiedCmd, setCopiedCmd] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-sky-400" />
            <h3 className="text-sm font-bold">Como Rodar a Calculadora no Seu Computador</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5 text-xs text-slate-700 max-h-[80vh] overflow-y-auto">
          {/* Step 1 */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center text-[11px] font-mono">1</span>
              <span>Baixar ou Salvar o Código</span>
            </div>
            <p className="text-slate-600 pl-7">
              Salve o código com o nome <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-slate-900">calculadora.py</code> em qualquer pasta (ex: Documentos ou Área de Trabalho).
            </p>
            <div className="pl-7 pt-1">
              <button
                onClick={onDownloadPy}
                className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold transition"
              >
                Baixar calculadora.py agora
              </button>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center text-[11px] font-mono">2</span>
              <span>Abrir o Terminal ou Prompt de Comando</span>
            </div>
            <p className="text-slate-600 pl-7">
              Navegue até a pasta onde salvou o arquivo e execute o comando correspondente ao seu sistema operacional:
            </p>

            {/* Windows */}
            <div className="pl-7 space-y-2 mt-2">
              <div className="bg-slate-900 text-slate-100 p-2.5 rounded-lg font-mono flex items-center justify-between">
                <span>python calculadora.py</span>
                <button
                  onClick={() => copyCommand('python calculadora.py')}
                  className="text-slate-400 hover:text-white transition"
                  title="Copiar comando"
                >
                  {copiedCmd === 'python calculadora.py' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <span className="text-[11px] text-slate-500 block">
                Windows (Prompt de Comando, PowerShell ou Terminal do VS Code)
              </span>

              {/* Mac / Linux */}
              <div className="bg-slate-900 text-slate-100 p-2.5 rounded-lg font-mono flex items-center justify-between mt-2">
                <span>python3 calculadora.py</span>
                <button
                  onClick={() => copyCommand('python3 calculadora.py')}
                  className="text-slate-400 hover:text-white transition"
                  title="Copiar comando"
                >
                  {copiedCmd === 'python3 calculadora.py' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <span className="text-[11px] text-slate-500 block">
                macOS e distribuições Linux
              </span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center text-[11px] font-mono">3</span>
              <span>Preciso instalar alguma biblioteca com pip?</span>
            </div>
            <div className="pl-7 bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-emerald-900 leading-relaxed">
              <div className="flex items-center gap-1.5 font-bold mb-0.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Não! O Tkinter é nativo.</span>
              </div>
              O Tkinter já vem pré-instalado com o Python oficial. No Linux (Ubuntu/Debian), caso sua instalação seja mínima, basta instalar via <code className="font-mono bg-emerald-100/80 px-1 rounded">sudo apt install python3-tk</code>.
            </div>
          </div>
        </div>

        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition"
          >
            Entendido, fechar
          </button>
        </div>
      </div>
    </div>
  );
};
