import React, { useMemo, useState } from "react";
import { FRASES_REPETICAO } from "../dados/exercicios-28dias";
import { speakSpanish, scoreColor, recordAndScore } from "../utils/audioPratica";

interface RepeticaoGuiadaProps {
  /** Dia da trilha, 1 a 28. */
  day: number;
  /** Chamado quando o usuário conclui a prática do dia (opcional). */
  onComplete?: () => void;
}

/**
 * Tarefa "Estrutura Falada" — substitui o redirecionamento externo por um
 * exercício de repetição guiada dentro do próprio app: ouvir a frase do dia,
 * repetir em voz alta, e receber um score de 0 a 10.
 */
export function RepeticaoGuiada({ day, onComplete }: RepeticaoGuiadaProps) {
  const frasesDoDia = useMemo(
    () => FRASES_REPETICAO.filter((f: any) => f.day === day),
    [day]
  );

  const [index, setIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [result, setResult] = useState<{ text: string; score: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const frase = frasesDoDia[index];

  if (!frase) {
    return (
      <div className="text-[13px] p-3" style={{ color: "#8A7F68" }}>
        Sem frases cadastradas para o dia {day}.
      </div>
    );
  }

  const handlePraticar = () => {
    setError(null);
    recordAndScore(frase.es, {
      onStart: () => { setIsRecording(true); setResult(null); },
      onResult: (r) => setResult(r),
      onError: (msg) => setError(msg),
      onEnd: () => setIsRecording(false),
    });
  };

  const handleProxima = () => {
    setResult(null);
    setError(null);
    if (index < frasesDoDia.length - 1) {
      setIndex(index + 1);
    } else {
      onComplete?.();
    }
  };

  return (
    <div className="rounded-[16px] p-4" style={{ background: "#FDF6E3", border: "1px solid #E8DCC3" }}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-full" style={{ background: "#FFF1E6", color: "#C9701E" }}>
          {frase.cat}
        </span>
        <span className="text-[11px]" style={{ color: "#8A7F68" }}>
          Frase {index + 1}/{frasesDoDia.length}
        </span>
      </div>

      <div className="italic fraunces font-bold text-[17px] leading-[1.35] mb-1">"{frase.es}"</div>
      <div className="text-[13px] mb-1" style={{ color: "#6E6350" }}>↳ {frase.pt}</div>
      {frase.ctx && (
        <div className="text-[11px] font-bold mb-3" style={{ color: "#8A7F68" }}>{frase.ctx}</div>
      )}

      <div className="flex flex-wrap gap-2 mt-3">
        <button
          onClick={() => speakSpanish(frase.es)}
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
        <div className="mt-3 text-[12px] font-semibold" style={{ color: "#CE1126" }}>{error}</div>
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
        {index < frasesDoDia.length - 1 ? "Próxima frase →" : "✓ Concluir tarefa de hoje"}
      </button>
    </div>
  );
}
