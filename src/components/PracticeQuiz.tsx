import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/pythonCode';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw } from 'lucide-react';

export const PracticeQuiz: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const totalAnswered = Object.keys(selectedAnswers).length;
  const isComplete = totalAnswered === QUIZ_QUESTIONS.length;

  const correctCount = QUIZ_QUESTIONS.reduce((acc, q) => {
    return selectedAnswers[q.id] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <HelpCircle className="w-5 h-5 text-sky-700" />
            <h2 className="text-base font-bold text-slate-900">
              Quiz de Fixação do Aprendizado
            </h2>
          </div>
          <p className="text-xs text-slate-600">
            Teste se você assimilou os conceitos de janelas, métodos do Tkinter, conversão de dados e tratamento de erros.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {showResults ? (
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-800">
                Acertos: {correctCount} de {QUIZ_QUESTIONS.length}
              </span>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Refazer</span>
              </button>
            </div>
          ) : (
            <button
              disabled={!isComplete}
              onClick={() => setShowResults(true)}
              className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold transition shadow-xs"
            >
              Conferir Respostas ({totalAnswered}/{QUIZ_QUESTIONS.length})
            </button>
          )}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {QUIZ_QUESTIONS.map((q, idx) => {
          const selectedOption = selectedAnswers[q.id];
          const isAnswered = selectedOption !== undefined;
          const isCorrect = selectedOption === q.correctIndex;

          return (
            <div
              key={q.id}
              className={`bg-white border rounded-xl p-5 shadow-xs transition-all ${
                showResults
                  ? isCorrect
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-rose-300 bg-rose-50/20'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <span className="text-xs font-bold text-slate-900 leading-snug">
                  <span className="text-sky-700 font-mono mr-1.5">Questão {idx + 1}:</span>
                  {q.question}
                </span>
                {showResults && (
                  <span className="shrink-0">
                    {isCorrect ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-md">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Correto
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-100/80 px-2.5 py-0.5 rounded-md">
                        <XCircle className="w-3.5 h-3.5" />
                        Incorreto
                      </span>
                    )}
                  </span>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const isThisSelected = selectedOption === optIdx;
                  const isThisCorrect = optIdx === q.correctIndex;

                  let optionStyle = 'border-slate-200 hover:border-slate-300 bg-white text-slate-700';

                  if (showResults) {
                    if (isThisCorrect) {
                      optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium ring-1 ring-emerald-500';
                    } else if (isThisSelected && !isThisCorrect) {
                      optionStyle = 'border-rose-400 bg-rose-50 text-rose-950 line-through';
                    } else {
                      optionStyle = 'border-slate-100 bg-slate-50 text-slate-400 opacity-60';
                    }
                  } else if (isThisSelected) {
                    optionStyle = 'border-sky-600 bg-sky-50 text-sky-950 font-medium ring-1 ring-sky-600';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={showResults}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`w-full text-left p-3 rounded-lg border text-xs transition flex items-center justify-between ${optionStyle}`}
                    >
                      <span>{opt}</span>
                      <span
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-3 ${
                          isThisSelected
                            ? 'border-sky-600 bg-sky-600 text-white'
                            : 'border-slate-300'
                        }`}
                      >
                        {isThisSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Didactic explanation when results shown */}
              {showResults && (
                <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-700 bg-slate-50/80 p-3 rounded-lg">
                  <span className="font-bold text-slate-900 block mb-1">Explicação do Professor:</span>
                  <p className="leading-relaxed">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
