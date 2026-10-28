import React, { useState } from 'react';
import { Play, RotateCcw, AlertTriangle, CheckCircle2, XCircle, Terminal, HelpCircle, Code2 } from 'lucide-react';

interface TkinterSimulatorProps {
  onSelectCodeLines?: (lines: number[]) => void;
  onNavigateToCode?: () => void;
}

interface ExecutionStep {
  id: string;
  stage: string;
  code: string;
  detail: string;
  status: 'info' | 'success' | 'error' | 'warning';
}

export const TkinterSimulator: React.FC<TkinterSimulatorProps> = ({
  onNavigateToCode,
}) => {
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [activeOp, setActiveOp] = useState<string | null>(null);
  const [resultText, setResultText] = useState<string>('Digite os números e clique em uma operação');
  const [resultColor, setResultColor] = useState<'neutral' | 'success' | 'error' | 'warning'>('neutral');
  const [history, setHistory] = useState<ExecutionStep[]>([]);
  const [activeWidgetHighlight, setActiveWidgetHighlight] = useState<string | null>(null);

  const handleCalculate = (operacao: '+' | '-' | '*' | '/') => {
    setActiveOp(operacao);
    const steps: ExecutionStep[] = [];

    // Step 1: Event trigger
    steps.push({
      id: '1',
      stage: 'Evento Disparado',
      code: `btn_${operacao === '+' ? 'soma' : operacao === '-' ? 'sub' : operacao === '*' ? 'mult' : 'div'}.config(command=lambda: calcular('${operacao}'))`,
      detail: `O usuário clicou no botão '${operacao}'. A função anônima lambda chamou calcular('${operacao}').`,
      status: 'info'
    });

    // Step 2: Capture strings
    const str1 = num1.trim().replace(',', '.');
    const str2 = num2.trim().replace(',', '.');

    steps.push({
      id: '2',
      stage: 'Captura via .get()',
      code: `texto1 = entrada_num1.get() -> "${str1}"\ntexto2 = entrada_num2.get() -> "${str2}"`,
      detail: 'O Tkinter leu o texto bruto armazenado nos campos de entrada Entry.',
      status: 'info'
    });

    // Check empty
    if (!str1 || !str2) {
      setResultText('Aviso: Digite os dois números!');
      setResultColor('warning');
      steps.push({
        id: '3',
        stage: 'Validação de Entrada',
        code: `if not texto1 or not texto2:`,
        detail: 'Um ou ambos os campos estão vazios. A execução foi interrompida com aviso amigável.',
        status: 'warning'
      });
      setHistory(steps);
      return;
    }

    // Step 3: Type conversion
    const n1 = Number(str1);
    const n2 = Number(str2);

    if (isNaN(n1) || isNaN(n2)) {
      setResultText('Erro: Digite apenas números válidos!');
      setResultColor('error');
      steps.push({
        id: '3',
        stage: 'Exceção Interceptada (ValueError)',
        code: `except ValueError:\n  rotulo_resultado.config(text="Erro: Digite apenas números válidos!")`,
        detail: `Tentativa de converter valor não-numérico via float(). O bloco try/except interceptou o erro e protegeu a aplicação.`,
        status: 'error'
      });
      setHistory(steps);
      return;
    }

    steps.push({
      id: '3',
      stage: 'Conversão para float',
      code: `num1 = float("${str1}") -> ${n1}\nnum2 = float("${str2}") -> ${n2}`,
      detail: 'Strings convertidas com sucesso para números decimais de ponto flutuante.',
      status: 'success'
    });

    // Step 4: Division by zero check
    if (operacao === '/' && n2 === 0) {
      setResultText('Erro: Divisão por zero!');
      setResultColor('error');
      steps.push({
        id: '4',
        stage: 'Prevenção de Divisão por Zero',
        code: `if operacao == '/' and num2 == 0:\n  rotulo_resultado.config(text="Erro: Divisão por zero!", fg="#dc2626")\n  return`,
        detail: 'Divisão por zero detectada preventivamente antes do cálculo. Erro fatal evitado!',
        status: 'error'
      });
      setHistory(steps);
      return;
    }

    // Step 5: Calculation
    let calc = 0;
    let mathExpr = '';
    if (operacao === '+') {
      calc = n1 + n2;
      mathExpr = `${n1} + ${n2} = ${calc}`;
    } else if (operacao === '-') {
      calc = n1 - n2;
      mathExpr = `${n1} - ${n2} = ${calc}`;
    } else if (operacao === '*') {
      calc = n1 * n2;
      mathExpr = `${n1} × ${n2} = ${calc}`;
    } else if (operacao === '/') {
      calc = n1 / n2;
      mathExpr = `${n1} ÷ ${n2} = ${calc}`;
    }

    // Formatting
    const formatted = Number.isInteger(calc) ? calc.toString() : parseFloat(calc.toFixed(4)).toString();

    steps.push({
      id: '4',
      stage: 'Processamento Matemático',
      code: mathExpr,
      detail: `Operação condicional '${operacao}' executada. Resultado calculado: ${formatted}`,
      status: 'success'
    });

    // Step 6: Visual update
    steps.push({
      id: '5',
      stage: 'Atualização do Rótulo (.config)',
      code: `rotulo_resultado.config(text="Resultado: ${formatted}", fg="#059669")`,
      detail: 'O componente tk.Label teve sua propriedade de texto e cor atualizada na interface.',
      status: 'success'
    });

    setResultText(`Resultado: ${formatted}`);
    setResultColor('success');
    setHistory(steps);
  };

  const handleClear = () => {
    setNum1('');
    setNum2('');
    setActiveOp(null);
    setResultText('Digite os números e clique em uma operação');
    setResultColor('neutral');
    setHistory([
      {
        id: 'clear',
        stage: 'Comando Limpar Executado',
        code: `entrada_num1.delete(0, tk.END)\nentrada_num2.delete(0, tk.END)\nrotulo_resultado.config(text="...")`,
        detail: 'Os campos de texto foram esvaziados e o foco retornou ao primeiro campo com .focus_set().',
        status: 'info'
      }
    ]);
  };

  const handlePreset = (val1: string, val2: string, op: '+' | '-' | '*' | '/') => {
    setNum1(val1);
    setNum2(val2);
    setTimeout(() => {
      handleCalculateWithValues(val1, val2, op);
    }, 100);
  };

  const handleCalculateWithValues = (val1: string, val2: string, operacao: '+' | '-' | '*' | '/') => {
    setActiveOp(operacao);
    const steps: ExecutionStep[] = [];
    const str1 = val1.trim().replace(',', '.');
    const str2 = val2.trim().replace(',', '.');

    steps.push({
      id: '1',
      stage: 'Evento Disparado',
      code: `command=lambda: calcular('${operacao}')`,
      detail: `Botão '${operacao}' clicado com valores de teste predefinidos.`,
      status: 'info'
    });

    const n1 = Number(str1);
    const n2 = Number(str2);

    if (isNaN(n1) || isNaN(n2)) {
      setResultText('Erro: Digite apenas números válidos!');
      setResultColor('error');
      steps.push({
        id: '2',
        stage: 'Exceção Interceptada (ValueError)',
        code: `except ValueError:\n  rotulo_resultado.config(text="Erro: Digite apenas números válidos!")`,
        detail: `Entrada "${val1}" ou "${val2}" contém caracteres não numéricos. Interceptado com sucesso!`,
        status: 'error'
      });
      setHistory(steps);
      return;
    }

    if (operacao === '/' && n2 === 0) {
      setResultText('Erro: Divisão por zero!');
      setResultColor('error');
      steps.push({
        id: '2',
        stage: 'Prevenção de Divisão por Zero',
        code: `if operacao == '/' and num2 == 0:\n  rotulo_resultado.config(text="Erro: Divisão por zero!")`,
        detail: 'Divisão por zero tratada com segurança! Nenhuma falha fatal no aplicativo.',
        status: 'error'
      });
      setHistory(steps);
      return;
    }

    let calc = 0;
    if (operacao === '+') calc = n1 + n2;
    if (operacao === '-') calc = n1 - n2;
    if (operacao === '*') calc = n1 * n2;
    if (operacao === '/') calc = n1 / n2;

    const formatted = Number.isInteger(calc) ? calc.toString() : parseFloat(calc.toFixed(4)).toString();
    setResultText(`Resultado: ${formatted}`);
    setResultColor('success');

    steps.push({
      id: '2',
      stage: 'Cálculo e Exibição',
      code: `${n1} ${operacao} ${n2} = ${formatted}`,
      detail: `Resultado atualizado no rótulo da interface.`,
      status: 'success'
    });

    setHistory(steps);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Simulated Desktop Window (Tkinter) */}
      <div className="lg:col-span-6 flex flex-col items-center">
        <div className="w-full max-w-[420px]">
          {/* Section explanation kicker */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-3 px-1">
            <span className="font-semibold text-slate-700">Simulador de Janela Tkinter</span>
            <span>Interface nativa reproduzida fielmente</span>
          </div>

          {/* Simulated OS Window Frame */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-300 overflow-hidden transition-all duration-200">
            {/* Desktop Window Title Bar */}
            <div className="bg-slate-800 text-white px-3.5 py-2.5 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
                <span className="ml-2 text-xs font-medium text-slate-200 truncate">
                  Calculadora Básica - Python Tkinter
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">380x440</span>
            </div>

            {/* Tkinter Window Canvas (bg="#f8fafc") */}
            <div className="p-6 bg-slate-50 space-y-4">
              {/* Window Header (tk.Label) */}
              <div
                className={`text-center py-1 transition-all ${
                  activeWidgetHighlight === 'titulo' ? 'ring-2 ring-sky-500 rounded-md bg-sky-50/50' : ''
                }`}
                onMouseEnter={() => setActiveWidgetHighlight('titulo')}
                onMouseLeave={() => setActiveWidgetHighlight(null)}
              >
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  Calculadora Básica
                </h3>
                <span className="text-[11px] text-slate-500 font-mono">tk.Label(text="Calculadora Básica")</span>
              </div>

              {/* Input 1 (tk.Entry) */}
              <div
                className={`space-y-1 transition-all p-1.5 rounded-lg ${
                  activeWidgetHighlight === 'num1' ? 'ring-2 ring-sky-500 bg-sky-50/50' : ''
                }`}
                onMouseEnter={() => setActiveWidgetHighlight('num1')}
                onMouseLeave={() => setActiveWidgetHighlight(null)}
              >
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="sim-num1" className="font-semibold text-slate-700">Primeiro Número:</label>
                  <span className="text-[10px] text-slate-400 font-mono">entrada_num1 (tk.Entry)</span>
                </div>
                <input
                  id="sim-num1"
                  type="text"
                  value={num1}
                  onChange={(e) => setNum1(e.target.value)}
                  placeholder="Ex: 25 ou 12.5"
                  className="w-full px-3 py-2 text-center text-slate-900 font-mono bg-white border border-slate-300 rounded-md shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600 transition"
                />
              </div>

              {/* Input 2 (tk.Entry) */}
              <div
                className={`space-y-1 transition-all p-1.5 rounded-lg ${
                  activeWidgetHighlight === 'num2' ? 'ring-2 ring-sky-500 bg-sky-50/50' : ''
                }`}
                onMouseEnter={() => setActiveWidgetHighlight('num2')}
                onMouseLeave={() => setActiveWidgetHighlight(null)}
              >
                <div className="flex justify-between items-center text-xs">
                  <label htmlFor="sim-num2" className="font-semibold text-slate-700">Segundo Número:</label>
                  <span className="text-[10px] text-slate-400 font-mono">entrada_num2 (tk.Entry)</span>
                </div>
                <input
                  id="sim-num2"
                  type="text"
                  value={num2}
                  onChange={(e) => setNum2(e.target.value)}
                  placeholder="Ex: 5 ou 0"
                  className="w-full px-3 py-2 text-center text-slate-900 font-mono bg-white border border-slate-300 rounded-md shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600 transition"
                />
              </div>

              {/* Operation Buttons (frame_botoes with 4 tk.Buttons) */}
              <div
                className={`space-y-1.5 transition-all p-1.5 rounded-lg ${
                  activeWidgetHighlight === 'operacoes' ? 'ring-2 ring-sky-500 bg-sky-50/50' : ''
                }`}
                onMouseEnter={() => setActiveWidgetHighlight('operacoes')}
                onMouseLeave={() => setActiveWidgetHighlight(null)}
              >
                <div className="flex justify-between items-center text-[11px] text-slate-500">
                  <span className="font-medium text-slate-600">Escolha a Operação:</span>
                  <span className="font-mono text-[10px] text-slate-400">tk.Frame com 4 botões</span>
                </div>
                <div className="grid grid-cols-4 gap-2.5">
                  <button
                    onClick={() => handleCalculate('+')}
                    className={`py-2.5 px-3 rounded-md text-lg font-bold text-white transition-all shadow-xs active:scale-95 ${
                      activeOp === '+' ? 'bg-sky-700 ring-2 ring-sky-300' : 'bg-sky-600 hover:bg-sky-700'
                    }`}
                    title="Somar (+)"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleCalculate('-')}
                    className={`py-2.5 px-3 rounded-md text-lg font-bold text-white transition-all shadow-xs active:scale-95 ${
                      activeOp === '-' ? 'bg-sky-700 ring-2 ring-sky-300' : 'bg-sky-600 hover:bg-sky-700'
                    }`}
                    title="Subtrair (-)"
                  >
                    −
                  </button>
                  <button
                    onClick={() => handleCalculate('*')}
                    className={`py-2.5 px-3 rounded-md text-lg font-bold text-white transition-all shadow-xs active:scale-95 ${
                      activeOp === '*' ? 'bg-sky-700 ring-2 ring-sky-300' : 'bg-sky-600 hover:bg-sky-700'
                    }`}
                    title="Multiplicar (×)"
                  >
                    ×
                  </button>
                  <button
                    onClick={() => handleCalculate('/')}
                    className={`py-2.5 px-3 rounded-md text-lg font-bold text-white transition-all shadow-xs active:scale-95 ${
                      activeOp === '/' ? 'bg-sky-700 ring-2 ring-sky-300' : 'bg-sky-600 hover:bg-sky-700'
                    }`}
                    title="Dividir (÷)"
                  >
                    ÷
                  </button>
                </div>
              </div>

              {/* Clear Button */}
              <button
                onClick={handleClear}
                className="w-full py-2 px-4 rounded-md text-xs font-semibold text-slate-700 bg-slate-200 hover:bg-slate-300 transition-colors flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Limpar Campos (Reset)</span>
              </button>

              {/* Result Area (tk.Label inside frame_resultado) */}
              <div
                className={`p-3.5 rounded-lg border text-center transition-all ${
                  resultColor === 'success'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : resultColor === 'error'
                    ? 'bg-rose-50 border-rose-200 text-rose-800'
                    : resultColor === 'warning'
                    ? 'bg-amber-50 border-amber-200 text-amber-800'
                    : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  {resultColor === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  {resultColor === 'error' && <XCircle className="w-4 h-4 text-rose-600" />}
                  {resultColor === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                  <span className="text-xs uppercase font-semibold tracking-wider text-slate-500">
                    Área do Resultado
                  </span>
                </div>
                <div className="text-base font-bold tracking-tight break-words">
                  {resultText}
                </div>
              </div>
            </div>
          </div>

          {/* Quick presets for pedagogical test cases */}
          <div className="mt-5 p-3.5 bg-white border border-slate-200 rounded-lg shadow-xs">
            <span className="text-xs font-semibold text-slate-700 block mb-2">
              Testes Rápidos de Aprendizado:
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => handlePreset('10', '0', '/')}
                className="p-2 text-left bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 rounded-md transition"
              >
                <span className="font-bold block">10 ÷ 0 (Divisão por zero)</span>
                <span className="text-[11px] text-rose-600">Testa a proteção de divisão</span>
              </button>
              <button
                onClick={() => handlePreset('abc', '5', '+')}
                className="p-2 text-left bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 rounded-md transition"
              >
                <span className="font-bold block">'abc' + 5 (Inválido)</span>
                <span className="text-[11px] text-amber-600">Testa o try/except ValueError</span>
              </button>
              <button
                onClick={() => handlePreset('12.5', '4', '*')}
                className="p-2 text-left bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-800 rounded-md transition"
              >
                <span className="font-bold block">12.5 × 4 (Decimais)</span>
                <span className="text-[11px] text-sky-600">Testa float e formatação</span>
              </button>
              <button
                onClick={() => handlePreset('15', '40', '-')}
                className="p-2 text-left bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 rounded-md transition"
              >
                <span className="font-bold block">15 − 40 (Negativo)</span>
                <span className="text-[11px] text-slate-600">Testa subtração e sinal</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Real-time Execution & Event Inspector */}
      <div className="lg:col-span-6 space-y-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-sky-700" />
              <h4 className="text-sm font-bold text-slate-900">
                Inspetor de Execução do Python
              </h4>
            </div>
            {onNavigateToCode && (
              <button
                onClick={onNavigateToCode}
                className="flex items-center gap-1 text-xs text-sky-700 hover:text-sky-800 font-semibold"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Ver Código Completo</span>
              </button>
            )}
          </div>

          <div className="text-xs text-slate-500 mt-2 mb-4">
            Acompanhe o que o Python executa nos bastidores a cada interação na tela:
          </div>

          {history.length === 0 ? (
            <div className="py-8 px-4 text-center border border-dashed border-slate-200 rounded-lg text-slate-400 text-xs">
              <Play className="w-6 h-6 mx-auto mb-2 text-slate-300" />
              Digite valores na janela ao lado e clique em um botão (+, -, *, /) para inspecionar os passos de execução.
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((step, idx) => (
                <div
                  key={step.id + idx}
                  className={`p-3 rounded-lg border text-xs transition-all ${
                    step.status === 'error'
                      ? 'bg-rose-50/60 border-rose-200'
                      : step.status === 'warning'
                      ? 'bg-amber-50/60 border-amber-200'
                      : step.status === 'success'
                      ? 'bg-emerald-50/60 border-emerald-200'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-white border border-slate-300 flex items-center justify-center text-[10px] font-mono text-slate-700 shadow-2xs">
                        {idx + 1}
                      </span>
                      {step.stage}
                    </span>
                    <span
                      className={`text-[10px] font-semibold uppercase ${
                        step.status === 'error'
                          ? 'text-rose-700'
                          : step.status === 'warning'
                          ? 'text-amber-700'
                          : step.status === 'success'
                          ? 'text-emerald-700'
                          : 'text-slate-600'
                      }`}
                    >
                      {step.status}
                    </span>
                  </div>

                  <pre className="p-2 rounded bg-slate-900 text-slate-100 font-mono text-[11px] overflow-x-auto my-1.5">
                    <code>{step.code}</code>
                  </pre>

                  <p className="text-slate-600 leading-relaxed text-[11.5px]">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Didactic Tip Card */}
        <div className="bg-sky-50/70 border border-sky-100 rounded-xl p-4 text-xs text-sky-900 flex items-start gap-3">
          <HelpCircle className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold block text-sky-950">Dica do Professor:</span>
            <p className="text-sky-800 leading-relaxed">
              Em programação orientada a eventos, seu código não roda do início ao fim em linha reta.
              Ele fica <em>adormecido</em> dentro do <code className="font-mono bg-sky-100/70 px-1 rounded">mainloop()</code> aguardando que o usuário clique em algo. Quando o clique ocorre, o Tkinter "acorda" e executa a função atribuída em <code className="font-mono bg-sky-100/70 px-1 rounded">command=</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
