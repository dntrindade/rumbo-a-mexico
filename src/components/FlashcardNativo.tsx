import React, { useMemo, useState } from "react";
import { VOCABULARIO_COMPLETO } from "../dados/exercicios-28dias";
import { speakSpanish, scoreColor, recordAndScore } from "../utils/audioPratica";

interface FlashcardNativoProps {
  /** Dia da trilha, 1 a 28. */
  day: number;
  onComplete?: () => void;
}

/**
 * Tarefa "Vocabulário" — substitui o redirecionamento pro Anki por flashcards
 * nativos dentro do app: ouvir a palavra, repetir, receber score.
 */
export function FlashcardNativo({ day, onComplete }: FlashcardNativoProps) {
  const palavrasDoDia = useMemo(
    () => VOCABULARIO_COMPLETO.filter((v: any) => v.day === day),
    [day]
  );

  const [index, setIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [result, setResult] = useState<{ text: string; score: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const palavra = palavrasDoDia[index];

  if (!palavra) {
    return (
      <div className="text-[13px] p-3" style={{ color: "#8A7F68" }}>
        Sem vocabulário cadastrado para o dia {day}.
      </div>
    );
  }

  const handlePraticar = () => {
    setError(null);
    recordAndScore(palavra.es, {
      onStart: () => { setIsRecording(true); setResult(null); },
      onResult: (r) => setResult(r),
      onError: (msg) => setError(msg),
      onEnd: () => setIsRecording(false),
    });
  };

  const handleProxima = () => {
    setResult(null);
    setError(null);
    if (index < palavrasDoDia.length - 1) {
      setIndex(index + 1);
    } else {
      onComplete?.();
    }
  };

  return (
    <div className="rounded-[16px] p-4" style={{ background: "#FDF6E3", border: "1px solid #E8DCC3" }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-full" style={{ background: "#FFF1E6", color: "#C9701E" }}>
          {palavra.cat}
        </span>
        <span className="text-[11px]" style={{ color: "#8A7F68" }}>
          Palavra {index + 1}/{palavrasDoDia.length}
        </span>
      </div>

      <div className="text-center py-4">
        <div className="fraunces font-extrabold text-[26px]">{palavra.es}</div>
        <div className="text-[14px] mt-1" style={{ color: "#006847" }}>{palavra.pt}</div>
        {palavra.exemplo && (
          <div className="mt-3 text-[12px] italic mx-auto max-w-[320px] rounded-[10px] px-3 py-2" style={{ background: "#FFFEFA", border: "1px solid #E8DCC3", color: "#6E6350" }}>
            "{palavra.exemplo}"
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 justify-center mt-2">
        <button
          onClick={() => speakSpanish(palavra.es)}
          className="h-9 px-4 rounded-full text-[12.5px] font-bold flex items-center gap-1.5"
          style={{ background: "#E8F5E9", color: "#006847", border: "1px solid #C8E6C9" }}
        >
          🔊 Ouvir
        </button>
        <button
          onClick={handlePraticar}
          disabled={isRecording}
          className="h-9 px-4 rounded-full text-[12.5px] font-bold flex items-center gap-1.5"
          style={{
            background: isRecording ? "#CE1126" : "#FFEDEE",
            color: isRecording ? "#fff" : "#B0182A",
            border: "1px solid #F5C2C2",
          }}
        >
          {isRecording ? "🔴 Gravando..." : "🎤 Repetir"}
        </button>
      </div>

      {error && (
        <div className="mt-3 text-[12px] font-semibold text-center" style={{ color: "#CE1126" }}>{error}</div>
      )}

      {result && (
        <div
          className="mt-3 rounded-[12px] p-3 flex items-center justify-between gap-3"
          style={{ background: scoreColor(result.score).bg, border: `1px solid ${scoreColor(result.score).border}` }}
        >
          <div className="min-w-0">
            <div className="text-[11px] font-bold tracking-wide" style={{ color: scoreColor(result.score).fg }}>VOCÊ DISSE</div>
            <div className="text-[13px] italic truncate" style={{ color: "#4A4A4A" }}>"{result.text || "(não captado)"}"</div>
          </div>
          <div
            className="shrink-0 w-11 h-11 rounded-full grid place-items-center font-extrabold text-[14px]"
            style={{ background: "#FFFEFA", color: scoreColor(result.score).fg, border: `2px solid ${scoreColor(result.score).fg}` }}
          >
            {result.score}
          </div>
        </div>
      )}

      <button
        onClick={handleProxima}
        className="mt-4 w-full h-10 rounded-full text-[13px] font-bold text-white"
        style={{ background: "#E86A33" }}
      >
        {index < palavrasDoDia.length - 1 ? "Próxima palavra →" : "✓ Concluir tarefa de hoje"}
      </button>
    </div>
  );
}
