import React, { useState } from 'react';
import { GUIDE_SECTIONS } from '../data/pythonCode';
import { CheckCircle2, ChevronRight, BookOpen, Lightbulb } from 'lucide-react';

export const LearningGuide: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState<string>('componentes');

  const currentSection = GUIDE_SECTIONS.find((s) => s.id === activeSectionId) || GUIDE_SECTIONS[0];

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-5 h-5 text-sky-700" />
          <h2 className="text-base font-bold text-slate-900">
            Parte 2: Guia de Entendimento da Aplicação (Para o Seu Desafio)
          </h2>
        </div>
        <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
          Este guia foi estruturado com base nas 4 perguntas fundamentais sobre como interfaces gráficas funcionam na prática:
          componentes, eventos, processamento de cálculo e blindagem contra erros.
        </p>
      </div>

      {/* Navigation Tabs between the 4 Core Questions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {GUIDE_SECTIONS.map((section) => {
          const isActive = section.id === activeSectionId;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSectionId(section.id)}
              className={`p-4 rounded-xl border text-left transition-all ${
                isActive
                  ? 'bg-sky-50/80 border-sky-300 ring-1 ring-sky-300 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-mono font-bold text-sky-700">
                  MÓDULO {section.number}
                </span>
                <ChevronRight
                  className={`w-3.5 h-3.5 transition-transform ${
                    isActive ? 'text-sky-700 rotate-90' : 'text-slate-400'
                  }`}
                />
              </div>
              <h3 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                {section.title}
              </h3>
            </button>
          );
        })}
      </div>

      {/* Selected Module Detail */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-mono font-semibold text-sky-700 uppercase">
            Módulo {currentSection.number}
          </span>
          <h3 className="text-lg font-bold text-slate-900 mt-1">
            {currentSection.title}
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            {currentSection.summary}
          </p>
        </div>

        <div className="space-y-6 divide-y divide-slate-100">
          {currentSection.concepts.map((concept, index) => (
            <div key={index} className={index > 0 ? 'pt-6' : ''}>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-md bg-sky-100 text-sky-800 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <div className="flex-1 space-y-2">
                  <h4 className="text-sm font-bold text-slate-900">
                    {concept.name}
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {concept.description}
                  </p>

                  {/* Code snippet */}
                  <div className="p-3 rounded-lg bg-slate-900 text-slate-100 font-mono text-[11px] overflow-x-auto shadow-2xs">
                    <pre>
                      <code>{concept.codeSnippet}</code>
                    </pre>
                  </div>

                  {/* Teacher tip */}
                  <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/60 text-amber-900 text-[11.5px] leading-relaxed">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-amber-950">Por que isso importa: </span>
                      <span>{concept.tips}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Synthesis Checklist for the student */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
          Checklist do Aluno para a Apresentação do Desafio
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
          <div className="flex items-start gap-2 bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900 block">Saber apontar os Widgets:</span>
              <span>Identificar na janela onde estão o Tk(), os dois Entry, os 4 Buttons e o Label de resultado.</span>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900 block">Explicar o papel do .get():</span>
              <span>Demonstrar que campos de texto devolvem texto (str) e que é obrigatório converter para float().</span>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900 block">Demonstrar a divisão por zero:</span>
              <span>Digitar qualquer número dividido por 0 e mostrar que o programa não trava, exibindo mensagem amigável.</span>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900 block">Explicar o mainloop():</span>
              <span>Explicar que sem o loop de eventos a janela fecharia antes mesmo do usuário enxergar os botões.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
