import React from "react";
import { PILLARS, WEEKS } from "../data";
import { RepeticaoGuiada } from './RepeticaoGuiada';
import { DialogosTuristicos } from './DialogosTuristicos';
import { FlashcardNativo } from './FlashcardNativo';
import { TabBiblioteca } from './TabBiblioteca';

interface TabHojeProps {
  todayIndex: number;
  wi: number;
  d: number;
  pct: number;
  daysDoneArray: boolean[];
  progress: Record<string, boolean>;
  updateProgress: (key: string, checked: boolean) => void;
  clickTick: number;
  setClickTick: React.Dispatch<React.SetStateAction<number>>;
  lastAction: string;
  setLastAction: (msg: string) => void;
  setTodayIndex: (i: number) => void;
  minutesToday: number;
  checkedCount: number;
  total: number;
  currentStreak: number;
}

const PILLAR_ICON: Record<string, string> = {
  O: "🎧",
  E: "🗣️",
  M: "🎵",
  C: "💬",
  V: "📚",
};

// Pilares que agora têm exercício interativo dentro do app (sem redirecionar)
const INTERACTIVE_PILLARS = ["E", "C", "V"];

export function TabHoje({
  todayIndex, wi, d, pct, progress, updateProgress,
  minutesToday, checkedCount, total, currentStreak,
}: TabHojeProps) {
  // Pilar ativo = primeiro não concluído hoje. Se todos concluídos, mostra o último como revisão.
  const activeIndex = PILLARS.findIndex((_, pi) => !progress[`w${wi}-p${pi}-d${d}`]);
  const allDone = activeIndex === -1;
  const heroIndex = allDone ? PILLARS.length - 1 : activeIndex;
  const heroPillar = PILLARS[heroIndex];
  const heroTask = WEEKS[wi]?.tasks[heroIndex];
  const heroIsInteractive = INTERACTIVE_PILLARS.includes(heroPillar.code);

  // Dia da trilha em base 1 (1 a 28), pra bater com os dados de exercicios-28dias.ts
  const currentDay = todayIndex + 1;

  // Renderiza o exercício interativo certo de acordo com o código do pilar (E, C ou V)
  const renderExercicioInterativo = (pillarCode: string, key: string) => {
    const onComplete = () => updateProgress(key, true);
    if (pillarCode === "E") return <RepeticaoGuiada day={currentDay} onComplete={onComplete} />;
    if (pillarCode === "C") return <DialogosTuristicos day={currentDay} onComplete={onComplete} />;
    if (pillarCode === "V") return <FlashcardNativo day={currentDay} onComplete={onComplete} />;
    return null;
  };

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">
      <div className="min-w-0 flex flex-col gap-6">
        {/* TAREFA ATIVA DO DIA */}
        <div className="rounded-[18px] p-5 md:p-6" style={{ background: "#FFFEFA", border: "2px solid #E86A33" }}>
          <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
            <div className="flex items-center gap-2 text-[12px] font-bold tracking-wide" style={{ color: "#E86A33" }}>
              <span className="text-[16px]">{heroPillar.full === "Ouvir" ? "👂" : PILLAR_ICON[heroPillar.code]}</span>
              {allDone ? `DIA ${todayIndex + 1} CONCLUÍDO` : `TAREFA ATIVA DO DIA ${todayIndex + 1}`}
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ background: "#FFF1E6", color: "#C9701E" }}>
              {allDone ? "COMPLETO ✓" : "EM ANDAMENTO"}
            </span>
          </div>
          <div className="fraunces font-extrabold text-[24px] leading-tight mb-2">{heroPillar.title}</div>
          <div className="text-[14px] leading-[1.6] mb-4" style={{ color: "#4A4A4A" }} dangerouslySetInnerHTML={{ __html: heroTask?.desc || "" }} />

          {/* NOVO: se o pilar ativo é E, C ou V, mostra o exercício interativo dentro do card */}
          {heroIsInteractive ? (
            <div className="mt-2">
              {renderExercicioInterativo(heroPillar.code, `w${wi}-p${heroIndex}-d${d}`)}
              {!allDone && (
                <span className="block mt-3 text-[12px]" style={{ color: "#6E6350" }}>
                  {checkedCount}/{total} tarefas do desafio concluídas
                </span>
              )}
            </div>
          ) : (
            heroTask?.url && (
              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href={heroTask.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[14px] font-bold px-5 py-2.5 rounded-full text-white transition-all hover:brightness-105 active:scale-[0.98]"
                  style={{ background: "#E86A33" }}
                >
                  ▶ Praticar agora ({heroPillar.time})
                </a>
                {!allDone && (
                  <span className="text-[12px]" style={{ color: "#6E6350" }}>
                    {checkedCount}/{total} tarefas do desafio concluídas
                  </span>
                )}
              </div>
            )
          )}
        </div>

        {/* SEU BARALHO DE HOJE */}
        <div>
          <div className="fraunces font-extrabold text-[19px] mb-3">Seu baralho de hoje • Dia {todayIndex + 1}</div>
          <div className="flex flex-col gap-3">
            {PILLARS.map((pillar, pi) => {
              const key = `w${wi}-p${pi}-d${d}`;
              const checked = !!progress[key];
              const isActive = pi === heroIndex && !allDone;
              const task = WEEKS[wi]?.tasks[pi];
              const borderColor = checked ? "#006847" : isActive ? "#E86A33" : "#E8DCC3";
              const bg = checked ? "#F0F9F1" : "#FFFEFA";
              const isInteractive = INTERACTIVE_PILLARS.includes(pillar.code);

              return (
                <div
                  key={pi}
                  className="rounded-[16px] p-4 md:p-5 relative transition-all"
                  style={{ background: bg, border: `${isActive ? "2px" : "1px"} solid ${borderColor}` }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[18px]">{PILLAR_ICON[pillar.code]}</span>
                      <div>
                        <div className="font-bold text-[15px]">{pillar.title}</div>
                        <div className="text-[11px] flex items-center gap-1" style={{ color: "#6E6350" }}>
                          🕐 {pillar.time}
                        </div>
                      </div>
                    </div>

                    {checked ? (
                      <button
                        onClick={() => updateProgress(key, false)}
                        aria-label="Marcar como não concluído"
                        className="w-7 h-7 rounded-full grid place-items-center text-white text-[13px] font-bold shrink-0"
                        style={{ background: "#006847" }}
                      >
                        ✓
                      </button>
                    ) : (
                      <button
                        onClick={() => updateProgress(key, true)}
                        className="text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-full shrink-0 transition hover:brightness-95"
                        style={{
                          background: isActive ? "#FFF1E6" : "#F1EAD9",
                          color: isActive ? "#C9701E" : "#8A7F68",
                        }}
                      >
                        {isActive ? "ATIVO" : "PENDENTE"}
                      </button>
                    )}
                  </div>

                  <div className="text-[13px] mt-2 leading-[1.5]" style={{ color: "#4A4A4A" }} dangerouslySetInnerHTML={{ __html: task?.desc || "" }} />

                  {/* NOVO: exercício interativo embutido no card do baralho, só quando ativo e não concluído */}
                  {!checked && isInteractive && isActive && (
                    <div className="mt-3">
                      {renderExercicioInterativo(pillar.code, key)}
                    </div>
                  )}

                  {/* Link externo continua existindo para O (Ouvir) e M (Música), e como fallback quando não é o card ativo */}
                  {!checked && task?.url && (!isInteractive || !isActive) && (
                    isActive ? (
                      <a
                        href={task.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center mt-3 text-[13px] font-bold py-2 rounded-full text-white transition-all hover:brightness-105"
                        style={{ background: "#E86A33" }}
                      >
                        Praticar agora
                      </a>
                    ) : (
                      <a
                        href={task.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-[12px] font-bold"
                        style={{ color: "#2757A6" }}
                      >
                        Praticar agora →
                      </a>
                    )
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* MÉTRICAS DE CONQUISTA */}
      <aside className="lg:sticky lg:top-[84px] self-start w-full">
        <div className="rounded-[18px] p-5 md:p-6" style={{ background: "#FFFEFA", border: "1px solid #E8DCC3" }}>
          <div className="fraunces font-extrabold text-[18px] mb-4">Métricas de Conquista</div>

          <div className="flex items-center gap-4 mb-5">
            <div className="relative w-[86px] h-[86px] shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#E8DCC3" strokeWidth="10" />
                <circle
                  cx="50" cy="50" r="42" fill="none" stroke="#E86A33" strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 42}
                  strokeDashoffset={2 * Math.PI * 42 * (1 - pct / 100)}
                  style={{ transition: "stroke-dashoffset .6s ease" }}
                />
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center leading-none">
                  <div className="fraunces font-extrabold text-[20px]">{pct}%</div>
                </div>
              </div>
            </div>
            <div className="text-[11px] font-bold tracking-wide" style={{ color: "#6E6350" }}>CONCLUÍDO</div>
          </div>

          <div className="flex flex-col gap-3 text-[13px]">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ background: "#006847" }} />Meta Diária</span>
              <b>{minutesToday} / 60 min</b>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ background: "#E86A33" }} />Trilha Geral</span>
              <b style={{ color: "#E86A33" }}>{pct}% (Dia {todayIndex + 1}/28)</b>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ background: "#CE1126" }} />Ofensiva</span>
              <b style={{ color: "#CE1126" }}>{currentStreak} {currentStreak === 1 ? "dia" : "dias"}</b>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
