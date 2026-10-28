/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Header } from './components/Header';
import { TkinterSimulator } from './components/TkinterSimulator';
import { KeypadSimulator } from './components/KeypadSimulator';
import { CodeViewer } from './components/CodeViewer';
import { LearningGuide } from './components/LearningGuide';
import { EventFlowDiagram } from './components/EventFlowDiagram';
import { PracticeQuiz } from './components/PracticeQuiz';
import { HowToRunModal } from './components/HowToRunModal';
import { PYTHON_CODE_TWO_INPUTS } from './data/pythonCode';
import { Terminal, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('simulador');
  const [simulatorMode, setSimulatorMode] = useState<'two_inputs' | 'keypad'>('two_inputs');
  const [isHowToRunOpen, setIsHowToRunOpen] = useState<boolean>(false);

  const handleDownloadPy = () => {
    const blob = new Blob([PYTHON_CODE_TWO_INPUTS], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'calculadora_tkinter.py';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Top Bar Header Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onDownloadPy={handleDownloadPy}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-800">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                <span>Aula Prática de Programação para Iniciantes</span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-500">Python 3 & Tkinter</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
                Calculadora Gráfica em Python: Código, Eventos e Lógica
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                Aprenda como transformar lógica de programação em uma aplicação visual real.
                Teste o funcionamento ao vivo no simulador, inspecione cada linha de código e domine a conexão entre botões, eventos e tratamento de erros.
              </p>
            </div>

            <div className="flex sm:flex-col gap-2 shrink-0">
              <button
                onClick={() => setIsHowToRunOpen(true)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold transition shadow-xs"
              >
                <Terminal className="w-4 h-4 text-sky-700" />
                <span>Como Rodar no seu PC</span>
              </button>
              <button
                onClick={() => setActiveTab('guia')}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-bold transition border border-sky-200/80"
              >
                <BookOpen className="w-4 h-4 text-sky-700" />
                <span>Guia do Desafio</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'simulador' && (
          <div className="space-y-6">
            {/* Mode Switcher for the Simulator */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
              <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                <span className="text-slate-500 font-normal">Estilo visual:</span>
                <div className="flex items-center p-1 bg-slate-100 rounded-lg">
                  <button
                    onClick={() => setSimulatorMode('two_inputs')}
                    className={`px-3 py-1 rounded-md text-xs transition ${
                      simulatorMode === 'two_inputs'
                        ? 'bg-white text-slate-900 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Modelo Dois Campos (Recomendado)
                  </button>
                  <button
                    onClick={() => setSimulatorMode('keypad')}
                    className={`px-3 py-1 rounded-md text-xs transition ${
                      simulatorMode === 'keypad'
                        ? 'bg-white text-slate-900 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Modelo Teclado Numérico (Grade)
                  </button>
                </div>
              </div>

              <div className="text-xs text-slate-500">
                {simulatorMode === 'two_inputs'
                  ? 'Foco didático: Entrada 1 + Entrada 2 + Operação + Tratamento'
                  : 'Foco prático: Display único com grade numérica 0 a 9'}
              </div>
            </div>

            {/* Active Simulator */}
            {simulatorMode === 'two_inputs' ? (
              <TkinterSimulator onNavigateToCode={() => setActiveTab('codigo')} />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-6 flex justify-center">
                  <KeypadSimulator />
                </div>
                <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs text-xs text-slate-700 leading-relaxed">
                  <h4 className="text-sm font-bold text-slate-900">
                    Como Funciona o Modelo de Grade Numérica
                  </h4>
                  <p>
                    Neste segundo estilo, em vez de campos separados, usamos uma variável especial do Tkinter chamada <code className="font-mono bg-slate-100 px-1 rounded text-slate-800">tk.StringVar()</code> conectada ao visor.
                  </p>
                  <p>
                    Cada botão numérico de 0 a 9 concatena seu caractere à expressão atual. Ao clicar em <strong className="text-slate-900">=</strong>, a expressão matemática é avaliada e o visor exibe o resultado formatado.
                  </p>
                  <div className="p-3 bg-sky-50 border border-sky-200 rounded-lg text-sky-900">
                    <span className="font-bold block mb-1">Dica Pedagógica:</span>
                    Para quem está começando em programação e precisa apresentar um desafio escolar ou acadêmico, o <strong>Modelo com Dois Campos</strong> é o mais didático porque separa claramente a entrada dos dados, a escolha do operador e a exibição do resultado!
                  </div>
                  <button
                    onClick={() => setSimulatorMode('two_inputs')}
                    className="w-full py-2 px-3 rounded-lg bg-sky-600 text-white font-semibold text-xs hover:bg-sky-700 transition"
                  >
                    Voltar ao Modelo Dois Campos
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'codigo' && (
          <CodeViewer onDownloadPy={handleDownloadPy} />
        )}

        {activeTab === 'guia' && (
          <LearningGuide />
        )}

        {activeTab === 'fluxo' && (
          <EventFlowDiagram />
        )}

        {activeTab === 'desafios' && (
          <PracticeQuiz />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span>Prof. Python · Guia Didático de Tkinter para Iniciantes</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsHowToRunOpen(true)}
              className="hover:text-slate-900 transition"
            >
              Instruções de Instalação
            </button>
            <span>·</span>
            <button
              onClick={handleDownloadPy}
              className="text-sky-700 hover:text-sky-900 font-semibold transition"
            >
              Baixar Código .py
            </button>
          </div>
        </div>
      </footer>

      {/* How to Run Modal */}
      <HowToRunModal
        isOpen={isHowToRunOpen}
        onClose={() => setIsHowToRunOpen(false)}
        onDownloadPy={handleDownloadPy}
      />
    </div>
  );
}
