import React, { useState } from 'react';
import { Copy, Check, Download, GitBranch, Terminal, ExternalLink } from 'lucide-react';
import { README_MARKDOWN } from '../data/pythonCode';

interface ReadmeViewerProps {
  onDownloadReadme: () => void;
}

export const ReadmeViewer: React.FC<ReadmeViewerProps> = ({ onDownloadReadme }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'preview' | 'raw'>('preview');

  const handleCopy = () => {
    navigator.clipboard.writeText(README_MARKDOWN);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Action Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <GitBranch className="w-4 h-4 text-sky-700" />
            <h3 className="text-sm font-bold text-slate-900">
              README.md para o Repositório no GitHub
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Documentação completa com badges, guia de instalação, arquitetura de componentes e instruções de execução.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Switcher */}
          <div className="flex items-center p-1 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1.5 rounded-md transition ${
                viewMode === 'preview'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Visualização Renderizada
            </button>
            <button
              onClick={() => setViewMode('raw')}
              className={`px-3 py-1.5 rounded-md transition ${
                viewMode === 'raw'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Markdown Puro (.md)
            </button>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition"
            title="Copiar texto do README"
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
            onClick={onDownloadReadme}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar README.md</span>
          </button>
        </div>
      </div>

      {/* GitHub Push Guide Banner */}
      <div className="p-4 bg-slate-900 text-slate-200 rounded-xl border border-slate-800 text-xs space-y-2">
        <div className="flex items-center justify-between text-slate-300 font-semibold">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-sky-400" />
            <span>Como Enviar para o seu GitHub pelo Terminal:</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">Git workflow</span>
        </div>
        <div className="bg-slate-950 p-3 rounded-lg font-mono text-[11.5px] text-sky-300 space-y-1 overflow-x-auto">
          <div><span className="text-slate-500"># 1. Adicione os arquivos calculadora.py e README.md</span></div>
          <div>git add README.md calculadora.py</div>
          <div><span className="text-slate-500"># 2. Faça o commit</span></div>
          <div>git commit -m &quot;feat: adiciona calculadora tkinter e documentacao readme&quot;</div>
          <div><span className="text-slate-500"># 3. Envie para o GitHub</span></div>
          <div>git push origin main</div>
        </div>
      </div>

      {/* Content Container */}
      {viewMode === 'raw' ? (
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 font-mono text-xs text-slate-200 overflow-x-auto max-h-[700px] leading-relaxed select-text">
          <pre>{README_MARKDOWN}</pre>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-xs max-w-4xl mx-auto space-y-6 text-slate-800">
          {/* Header Title & Badges */}
          <div className="border-b border-slate-200 pb-5 space-y-3">
            <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <span>🧮</span>
              <span>Calculadora Gráfica em Python com Tkinter</span>
            </h1>
            <p className="text-sm text-slate-600 italic">
              Projeto didático de calculadora com interface gráfica de usuário (GUI) desenvolvida em <strong>Python 3</strong> utilizando exclusivamente a biblioteca nativa <strong>Tkinter</strong>.
            </p>
            <div className="flex flex-wrap gap-2 pt-1 text-xs font-mono">
              <span className="px-2.5 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold">Python 3.8+</span>
              <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">GUI Tkinter Nativa</span>
              <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold">Licença MIT</span>
              <span className="px-2.5 py-0.5 rounded bg-sky-100 text-sky-800 font-semibold">Status: Concluído</span>
            </div>
          </div>

          {/* Section: Sobre */}
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-1">
              📌 Sobre o Projeto
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed">
              Este projeto foi desenvolvido com foco pedagógico para <strong>iniciantes em programação</strong>, demonstrando na prática como conectar a lógica matemática de um script Python a uma <strong>interface visual amigável e interativa</strong>.
            </p>
            <p className="text-xs text-slate-700 leading-relaxed">
              Diferente de scripts executados exclusivamente em linha de comando (terminal), esta aplicação cria uma janela do sistema operacional que reage a cliques do mouse e digitação de dados, aplicando conceitos fundamentais de <strong>programação orientada a eventos</strong> e <strong>tratamento robusto de exceções</strong>.
            </p>
          </div>

          {/* Section: Funcionalidades */}
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-1">
              ✨ Funcionalidades
            </h2>
            <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-5">
              <li><strong>Adição (+)</strong>, <strong>Subtração (−)</strong>, <strong>Multiplicação (×)</strong> e <strong>Divisão (÷)</strong>.</li>
              <li><strong>Tratamento de Divisão por Zero:</strong> Validação preventiva que impede travamento do programa caso o divisor seja <code className="font-mono bg-slate-100 px-1 rounded">0</code>.</li>
              <li><strong>Validação de Entradas Inválidas:</strong> Bloco <code className="font-mono bg-slate-100 px-1 rounded">try ... except ValueError</code> que intercepta letras ou campos vazios, emitindo alerta amigável.</li>
              <li><strong>Suporte a Vírgula e Ponto:</strong> Converte automaticamente vírgula decimal brasileira (<code className="font-mono bg-slate-100 px-1 rounded">3,5</code>) para ponto internacional (<code className="font-mono bg-slate-100 px-1 rounded">3.5</code>).</li>
              <li><strong>Botão de Limpeza:</strong> Reseta os campos de entrada e retorna o foco ao primeiro campo.</li>
              <li><strong>Formatação Inteligente:</strong> Exibe números inteiros sem sufixo <code className="font-mono bg-slate-100 px-1 rounded">.0</code> e formata números decimais de forma limpa.</li>
            </ul>
          </div>

          {/* Section: Componentes */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-1">
              🛠️ Principais Componentes do Tkinter
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-lg">
                <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                  <tr>
                    <th className="p-2.5 font-bold">Componente</th>
                    <th className="p-2.5 font-bold font-mono">Classe Tkinter</th>
                    <th className="p-2.5 font-bold">Finalidade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-2.5 font-semibold text-slate-900">Janela Raiz</td>
                    <td className="p-2.5 font-mono text-sky-700">tk.Tk()</td>
                    <td className="p-2.5 text-slate-600">Cria a janela principal e configura dimensões com <code className="font-mono bg-slate-100 px-1 rounded">.geometry()</code></td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-slate-900">Campos de Entrada</td>
                    <td className="p-2.5 font-mono text-sky-700">tk.Entry()</td>
                    <td className="p-2.5 text-slate-600">Caixas de texto editáveis lidas via <code className="font-mono bg-slate-100 px-1 rounded">.get()</code></td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-slate-900">Botões de Operação</td>
                    <td className="p-2.5 font-mono text-sky-700">tk.Button()</td>
                    <td className="p-2.5 text-slate-600">Dispara <code className="font-mono bg-slate-100 px-1 rounded">command=lambda: calcular(op)</code> no clique</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-slate-900">Rótulo de Resultado</td>
                    <td className="p-2.5 font-mono text-sky-700">tk.Label()</td>
                    <td className="p-2.5 text-slate-600">Exibe a resposta atualizada dinamicamente com <code className="font-mono bg-slate-100 px-1 rounded">.config()</code></td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-slate-900">Loop de Eventos</td>
                    <td className="p-2.5 font-mono text-sky-700">janela.mainloop()</td>
                    <td className="p-2.5 text-slate-600">Mantém a janela aberta e responsiva aos cliques do usuário</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section: Execução */}
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-1">
              🚀 Como Executar
            </h2>
            <p className="text-xs text-slate-700">
              No terminal, dentro da pasta do projeto, execute:
            </p>
            <div className="p-3 bg-slate-900 text-slate-100 font-mono text-xs rounded-lg">
              <div><span className="text-slate-500"># Windows:</span></div>
              <div className="text-sky-300">python calculadora.py</div>
              <div className="mt-2"><span className="text-slate-500"># macOS ou Linux:</span></div>
              <div className="text-sky-300">python3 calculadora.py</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
