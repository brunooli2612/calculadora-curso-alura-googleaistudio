import React, { useState } from 'react';
import { ArrowRight, MousePointerClick, FileText, CheckCircle2, RefreshCw } from 'lucide-react';

interface FlowStep {
  step: number;
  title: string;
  subtitle: string;
  icon: string;
  pythonEquivalent: string;
  detail: string;
}

export const EventFlowDiagram: React.FC = () => {
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);

  const steps: FlowStep[] = [
    {
      step: 1,
      title: 'Ação do Usuário',
      subtitle: 'Entrada de dados e clique',
      icon: 'click',
      pythonEquivalent: `btn_soma = tk.Button(..., command=lambda: calcular('+'))`,
      detail: 'O usuário digita números nas caixas de texto (Entry) e pressiona o botão de operação. O sistema operacional detecta a colisão do cursor do mouse com o botão e gera um evento de clique no Tkinter.'
    },
    {
      step: 2,
      title: 'Disparo do Comando',
      subtitle: 'Execução da função lambda',
      icon: 'arrow',
      pythonEquivalent: `def calcular(operacao): # Recebe '+' como argumento`,
      detail: 'O Tkinter chama a função callback vinculada ao parâmetro command=. Como usamos uma função anônima lambda, o símbolo da operação clicada é passado diretamente para o parâmetro "operacao".'
    },
    {
      step: 3,
      title: 'Captura via .get()',
      subtitle: 'Extração dos textos brutos',
      icon: 'code',
      pythonEquivalent: `texto1 = entrada_num1.get().strip().replace(',', '.')
texto2 = entrada_num2.get().strip().replace(',', '.')`,
      detail: 'A aplicação consulta os campos de texto. .get() recupera as strings digitadas. Tratamos espaços acidentais com .strip() e trocamos vírgula por ponto para suportar a notação brasileira de decimais.'
    },
    {
      step: 4,
      title: 'Validação e Conversão',
      subtitle: 'Proteção contra erros (try/except)',
      icon: 'shield',
      pythonEquivalent: `try:
    num1 = float(texto1)
    num2 = float(texto2)
except ValueError:
    rotulo_resultado.config(text="Erro: Digite apenas números!")`,
      detail: 'O computador tenta transformar as strings em números reais float(). Se o usuário tiver digitado letras ou caracteres especiais, o Python dispara um ValueError. O bloco try/except intercepta a falha antes que ela cause travamento.'
    },
    {
      step: 5,
      title: 'Processamento Lógico',
      subtitle: 'Condicionais e regra de divisão',
      icon: 'calc',
      pythonEquivalent: `if operacao == '/':
    if num2 == 0:
        rotulo_resultado.config(text="Erro: Divisão por zero!")
        return
    resultado = num1 / num2`,
      detail: 'A estrutura condicional if/elif decide qual conta matemática realizar. Caso a operação seja divisão (/), há uma checagem preventiva: se o segundo número for zero, o programa avisa o usuário e interrompe a função com "return".'
    },
    {
      step: 6,
      title: 'Atualização Visual',
      subtitle: 'Redesenho do componente na tela',
      icon: 'screen',
      pythonEquivalent: `rotulo_resultado.config(
    text=f"Resultado: {resultado_formatado}",
    fg="#059669"
)`,
      detail: 'O método .config() atualiza a propriedade "text" e "fg" (cor da fonte) do Label. O Tkinter redesenha apenas aquela área da tela dentro do loop principal (mainloop), exibindo a resposta instantaneamente.'
    }
  ];

  const current = steps[selectedStepIndex];

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <RefreshCw className="w-5 h-5 text-sky-700" />
          <h2 className="text-base font-bold text-slate-900">
            Ciclo de Execução: A Jornada de um Clique em Interface Gráfica
          </h2>
        </div>
        <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
          Entenda passo a passo o que acontece na memória do computador e no código Python desde o momento em que você clica no botão até a resposta aparecer no visor.
        </p>
      </div>

      {/* Horizontal Flow Steps Indicator */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
        {steps.map((st, idx) => {
          const isSelected = selectedStepIndex === idx;
          return (
            <button
              key={st.step}
              onClick={() => setSelectedStepIndex(idx)}
              className={`p-3 rounded-lg border text-left transition-all relative ${
                isSelected
                  ? 'bg-sky-50 border-sky-400 ring-1 ring-sky-400 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold flex items-center justify-center font-mono">
                  {st.step}
                </span>
                {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />}
              </div>
              <div className="text-xs font-bold text-slate-900 leading-tight">
                {st.title}
              </div>
              <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                {st.subtitle}
              </div>
            </button>
          );
        })}
      </div>

      {/* Step Detail Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-mono text-xs font-bold">
              Etapa {current.step} de 6
            </span>
            <h3 className="text-base font-bold text-slate-900">
              {current.title}
            </h3>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline">
            {current.subtitle}
          </span>
        </div>

        <p className="text-xs text-slate-700 leading-relaxed">
          {current.detail}
        </p>

        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
            <FileText className="w-3.5 h-3.5 text-sky-600" />
            <span>Trecho correspondente no script Python:</span>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto shadow-2xs">
            <pre>
              <code>{current.pythonEquivalent}</code>
            </pre>
          </div>
        </div>

        {/* Navigation buttons between steps */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            disabled={selectedStepIndex === 0}
            onClick={() => setSelectedStepIndex((prev) => Math.max(0, prev - 1))}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition"
          >
            ← Etapa Anterior
          </button>
          <button
            disabled={selectedStepIndex === steps.length - 1}
            onClick={() => setSelectedStepIndex((prev) => Math.min(steps.length - 1, prev + 1))}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <span>Próxima Etapa</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Visual Analogy for Beginners */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-3">
        <MousePointerClick className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-900 block mb-0.5">Analogia Didática:</span>
          <span>
            Pense no Tkinter como um garçom atencioso: ele fica aguardando (o <code className="font-mono bg-white px-1 rounded border border-slate-200">mainloop</code>). Quando você clica em um botão, você está chamando o garçom com um pedido. Ele vai até as gavetas (campos <code className="font-mono bg-white px-1 rounded border border-slate-200">Entry</code>), recolhe os números, confere se os ingredientes são válidos (não são letras e não divide por zero) na cozinha (<code className="font-mono bg-white px-1 rounded border border-slate-200">calcular()</code>), e traz o prato pronto escrevendo na lousa do restaurante (o <code className="font-mono bg-white px-1 rounded border border-slate-200">Label</code>).
          </span>
        </div>
      </div>
    </div>
  );
};
