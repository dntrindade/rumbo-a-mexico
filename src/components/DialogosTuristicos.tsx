import React, { useMemo, useState } from "react";
import { DIALOGOS } from "../dados/exercicios-28dias";
import { speakSpanish, scoreColor, recordAndScore } from "../utils/audioPratica";

interface DialogosTuristicosProps {
  /** Dia da trilha, 1 a 28. */
  day: number;
  onComplete?: () => void;
}

/**
 * Tarefa "Conversa Real" — substitui o redirecionamento pro HelloTalk por um
 * diálogo turístico guiado: o app "fala" a linha dele, o usuário responde no
 * papel dele, e recebe um retorno de aproximação (score) por turno.
 */
export function DialogosTuristicos({ day, onComplete }: DialogosTuristicosProps) {
  const dialogo = useMemo(
    () => DIALOGOS.find((d: any) => d.day === day),
    [day]
  );

  const [turnIndex, setTurnIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [result, setResult] = useState<{ text: string; score: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!dialogo) {
    return (
      <div className="text-[13px] p-3" style={{ color: "#8A7F68" }}>
        Sem diálogo cadastrado para o dia {day}.
      </div>
    );
  }

  const turn = dialogo.turns[turnIndex];
  const isUserTurn = turn?.speaker === "user";
  const isLastTurn = turnIndex === dialogo.turns.length - 1;

  const handlePraticar = () => {
    if (!isUserTurn) return;
    setError(null);
    // pontua contra a primeira alternativa esperada, só como referência de aproximação
    const alvo = turn.expected?.[0] || "";
    recordAndScore(alvo, {
      onStart: () => { setIsRecording(true); setResult(null); },
      onResult: (r) => {
        // considera acerto também se qualquer palavra-chave esperada aparecer na fala
        const spokenNorm = r.text.toLowerCase();
        const bateuPalavraChave = (turn.expected || []).some((w: string) => spokenNorm.includes(w.toLowerCase()));
        setResult(bateuPalavraChave ? { ...r, score: Math.max(r.score, 7) } : r);
      },
      onError: (msg) => setError(msg),
      onEnd: () => setIsRecording(false),
    });
  };

  const handleProximo = () => {
    setResult(null);
    setError(null);
    if (!isLastTurn) {
      setTurnIndex(turnIndex + 1);
    } else {
      onComplete?.();
    }
  };

  return (
    <div className="rounded-[16px] p-4" style={{ background: "#FDF6E3", border: "1px solid #E8DCC3" }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-full" style={{ background: "#FFF1E6", color: "#C9701E" }}>
          {dialogo.category}
        </span>
        <span className="text-[11px]" style={{ color: "#8A7F68" }}>
          Turno {turnIndex + 1}/{dialogo.turns.length}
        </span>
      </div>

      <div className="fraunces font-extrabold text-[16px] mb-3">{dialogo.title}</div>

      {/* Histórico curto dos turnos já passados, pra dar contexto sem poluir */}
      <div className="flex flex-col gap-2 mb-3">
        {dialogo.turns.slice(0, turnIndex + 1).map((t: any, i: number) => (
          <div
            key={i}
            className="rounded-[12px] p-3"
            style={{
              background: t.speaker === "app" ? "#FFFEFA" : "#E8F5E9",
              border: `1px solid ${t.speaker === "app" ? "#E8DCC3" : "#C8E6C9"}`,
              opacity: i === turnIndex ? 1 : 0.7,
            }}
          >
            <div className="text-[10px] font-bold mb-1" style={{ color: t.speaker === "app" ? "#8A7F68" : "#006847" }}>
              {t.speaker === "app" ? "🗣️ Atendente" : "🙋 Você"}
            </div>
            {t.speaker === "app" ? (
              <>
                <div className="italic text-[14px]">"{t.es}"</div>
                <div className="text-[12px] mt-1" style={{ color: "#6E6350" }}>↳ {t.pt}</div>
                {i === turnIndex && (
                  <button
                    onClick={() => speakSpanish(t.es)}
                    className="mt-2 h-8 px-3 rounded-full text-[12px] font-bold"
                    style={{ background: "#E8F5E9", color: "#006847", border: "1px solid #C8E6C9" }}
                  >
                    🔊 Ouvir
                  </button>
                )}
              </>
            ) : (
              <div className="text-[12px]" style={{ color: "#6E6350" }}>
                💡 {t.hint}
              </div>
            )}
          </div>
        ))}
      </div>

      {isUserTurn && (
        <>
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
            {isRecording ? "🔴 Gravando..." : "🎤 Responder"}
          </button>

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
        </>
      )}

      <button
        onClick={handleProximo}
        className="mt-4 w-full h-10 rounded-full text-[13px] font-bold text-white"
        style={{ background: "#E86A33" }}
      >
        {!isLastTurn ? "Próximo turno →" : "✓ Concluir diálogo de hoje"}
      </button>
    </div>
  );
}
