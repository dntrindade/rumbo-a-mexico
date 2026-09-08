import React from "react";
import { WEEKS } from "../data";
import { TabId } from "./TabsNav";
import trailBackground from "../assets/trail_background.jpg";

interface TabTrilhaProps {
  todayIndex: number;
  daysDoneArray: boolean[];
  progress: Record<string, boolean>;
  clickTick: number;
  setClickTick: React.Dispatch<React.SetStateAction<number>>;
  setLastAction: (msg: string) => void;
  setTodayIndex: (i: number) => void;
  setActiveTab: (tab: TabId) => void;
  currentStreak: number;
}

// Posições orgânicas dos 28 marcos (x em %, y em px) — traçado sinuoso desenhado à mão
const TRAIL_POINTS = [
  { x: 52, y: 40 }, { x: 24, y: 125 }, { x: 66, y: 210 }, { x: 28, y: 300 },
  { x: 60, y: 385 }, { x: 30, y: 470 }, { x: 64, y: 560 }, { x: 26, y: 650 },
  { x: 58, y: 740 }, { x: 32, y: 830 }, { x: 62, y: 920 }, { x: 24, y: 1010 },
  { x: 56, y: 1100 }, { x: 34, y: 1190 }, { x: 64, y: 1280 }, { x: 28, y: 1370 },
  { x: 58, y: 1460 }, { x: 30, y: 1550 }, { x: 60, y: 1640 }, { x: 32, y: 1730 },
  { x: 56, y: 1820 }, { x: 36, y: 1910 }, { x: 62, y: 2000 }, { x: 30, y: 2090 },
  { x: 54, y: 2180 }, { x: 34, y: 2270 }, { x: 58, y: 2360 }, { x: 44, y: 2450 },
];

function buildPath(points: { x: number; y: number }[]): string {
  if (!points.length) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1], curr = points[i];
    const midX = (prev.x + curr.x) / 2;
    d += ` C ${midX} ${prev.y + 40}, ${midX} ${curr.y - 40}, ${curr.x} ${curr.y}`;
  }
  return d;
}

export function TabTrilha({
  todayIndex, daysDoneArray, progress, clickTick, setClickTick,
  setLastAction, setTodayIndex, setActiveTab, currentStreak,
}: TabTrilhaProps) {
  const daysDoneCount = daysDoneArray.filter(Boolean).length;
  const fullPath = buildPath(TRAIL_POINTS);
  const trailHeight = TRAIL_POINTS[TRAIL_POINTS.length - 1].y + 120;

  return (
    <div className="rounded-[22px] overflow-hidden" style={{ background: "#FFFEFA", border: "1px solid #E8DCC3" }}>
      {/* HEADER DA TRILHA */}
      <div className="px-5 md:px-8 pt-6 pb-5 border-b flex flex-wrap items-start justify-between gap-4" style={{ borderColor: "#F1EAD9" }}>
        <div>
          <div className="fraunces font-extrabold text-[22px] md:text-[26px] leading-tight">
            Trilha 28 pedras <span className="font-bold" style={{ color: "#8A7F68" }}>• deserto sinuoso</span>
          </div>
          <div className="flex items-center gap-4 mt-3 flex-wrap">
            <span className="flex items-center gap-1.5 text-[12px] font-bold" style={{ color: "#6E6350" }}>
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#006847" }} />completo
            </span>
            <span className="flex items-center gap-1.5 text-[12px] font-bold" style={{ color: "#6E6350" }}>
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#E86A33" }} />hoje
            </span>
            <span className="flex items-center gap-1.5 text-[12px] font-bold" style={{ color: "#6E6350" }}>
              <span className="w-2.5 h-2.5 rounded-full border" style={{ background: "#FDF6E3", borderColor: "#E8DCC3" }} />futuro
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full px-4 py-2" style={{ background: "#FDF6E3", border: "1px solid #E8DCC3" }}>
          <span className="w-2 h-2 rounded-full" style={{ background: "#006847" }} />
          <span className="text-[13px] font-bold">{daysDoneCount} / 28 completos</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.6fr_1fr]">
        {/* TRAÇADO SINUOSO */}
        <div
          className="relative overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(255,253,245,0.6), rgba(255,253,245,0.6)), url(${trailBackground})`,
            backgroundSize: "100% auto",
            backgroundPosition: "top center",
            backgroundRepeat: "repeat-y",
          }}
        >
          {/* textura de pontinhos removida em favor da imagem de fundo */}

          <div className="relative mx-auto max-w-[560px] px-2 py-8" style={{ height: trailHeight + 60 }}>
            <svg viewBox={`0 0 100 ${trailHeight}`} className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" style={{ top: 32 }}>
              <path d={fullPath} fill="none" stroke="#E8DCC3" strokeWidth="2.4" strokeDasharray="8 10" strokeLinecap="round" />
            </svg>

            <div className="relative" style={{ height: trailHeight, marginTop: 32 }}>
              {TRAIL_POINTS.map((pt, i) => {
                const isDone = daysDoneArray[i];
                const isToday = i === todayIndex;
                const labelRight = pt.x < 45;
                return (
                  <div key={i} className="absolute" style={{ left: `${pt.x}%`, top: pt.y, transform: "translate(-50%, -50%)" }}>
                    <button
                      onClick={() => { setTodayIndex(i); setClickTick(c => c + 1); setActiveTab('hoje'); setLastAction(`Indo para Dia ${i + 1} • ${clickTick + 1}`); }}
                      aria-label={`Dia ${i + 1}`}
                      className="group relative w-[52px] h-[52px] rounded-full grid place-items-center font-bold text-[14px] transition-all hover:scale-[1.06] active:scale-[0.96]"
                      style={{
                        background: isDone ? "#006847" : isToday ? "#E86A33" : "#FFFEFA",
                        color: isDone || isToday ? "#fff" : "#8A7F68",
                        border: isDone ? "3px solid #FFD23F" : isToday ? "4px solid #fff" : "1.5px solid #E8DCC3",
                        boxShadow: isDone ? "0 6px 16px rgba(0,104,71,0.28)" : isToday ? "0 8px 20px rgba(232,106,51,0.4)" : "0 2px 8px rgba(0,0,0,0.03)",
                        animation: isToday ? "pulseGlowTrail 2.2s ease-in-out infinite" : undefined,
                      }}
                    >
                      {isDone ? "🌵" : i + 1}
                      {isDone && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full grid place-items-center text-[10px]" style={{ background: "#FFD23F", border: "2px solid #fff", color: "#1A1A1A" }}>✓</span>
                      )}
                      {isToday && (
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap" style={{ background: "#FFF1E6", color: "#C9701E", border: "1px solid #FFD6BA" }}>HOJE</span>
                      )}
                    </button>
                    <div
                      className="absolute top-1/2 -translate-y-1/2 pointer-events-none max-w-[130px]"
                      style={labelRight ? { left: 62 } : { right: 62, textAlign: "right" }}
                    >
                      <div className="inline-block rounded-[10px] px-2.5 py-1.5" style={{ background: "rgba(255,254,250,0.9)", border: "1px solid #F1EAD9" }}>
                        <div className="font-bold text-[11px]" style={{ color: isToday ? "#1A1A1A" : isDone ? "#006847" : "#8A7F68" }}>Dia {i + 1}</div>
                        <div className="text-[10px]" style={{ color: "#8A7F68" }}>
                          {isDone ? "5 tarefas • concluído" : isToday ? "5 tarefas • em andamento" : "5 tarefas"}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* marco de chegada */}
              <div className="absolute flex flex-col items-center" style={{ left: "44%", top: trailHeight - 30, transform: "translate(-50%, -50%)" }}>
                <div className="w-11 h-11 rounded-full grid place-items-center text-[18px]" style={{ background: "#006847", border: "3px solid #FFD23F" }}>🏁</div>
                <div className="mt-2 text-[10px] font-bold px-2.5 py-1 rounded-full text-white" style={{ background: "#006847" }}>META FINAL</div>
              </div>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="p-5 md:p-6 flex flex-col gap-5 border-t lg:border-t-0 lg:border-l" style={{ borderColor: "#F1EAD9" }}>
          {/* Sua jornada */}
          <div className="rounded-[18px] p-5 relative overflow-hidden" style={{ background: "#006847", color: "#fff" }}>
            <div className="fraunces font-extrabold text-[17px]">Sua Jornada</div>
            <div className="grid grid-cols-3 gap-2.5 mt-4">
              <div className="rounded-[12px] p-2.5 text-center" style={{ background: "rgba(255,255,255,0.12)" }}>
                <div className="font-black text-[19px] leading-none">{currentStreak}🔥</div>
                <div className="text-[10px] opacity-85 mt-1 leading-tight">seguidos</div>
              </div>
              <div className="rounded-[12px] p-2.5 text-center" style={{ background: "rgba(255,255,255,0.12)" }}>
                <div className="font-black text-[19px] leading-none">{daysDoneCount}</div>
                <div className="text-[10px] opacity-85 mt-1 leading-tight">completos</div>
              </div>
              <div className="rounded-[12px] p-2.5 text-center" style={{ background: "rgba(255,255,255,0.12)" }}>
                <div className="font-black text-[19px] leading-none">{28 - daysDoneCount}</div>
                <div className="text-[10px] opacity-85 mt-1 leading-tight">faltam</div>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('hoje')}
              className="w-full mt-4 py-2.5 rounded-full text-[12px] font-bold transition hover:brightness-110"
              style={{ background: "#E86A33" }}
            >
              Continuar de onde parei →
            </button>
          </div>

          {/* Mapa de calor */}
          <div className="rounded-[18px] p-5" style={{ background: "#FFFEFA", border: "1px solid #E8DCC3" }}>
            <div className="flex items-center justify-between">
              <div className="fraunces font-extrabold text-[16px]">Mapa de calor</div>
              <span className="text-[14px]">📅</span>
            </div>
            <div className="text-[11px] mt-0.5" style={{ color: "#6E6350" }}>estilo GitHub • constância diária</div>
            <div className="grid grid-cols-7 gap-[6px] mt-4">
              {Array.from({ length: 28 }).map((_, idx) => {
                const wi = Math.floor(idx / 7);
                const d = idx % 7;
                let count = 0;
                for (let pi = 0; pi < 5; pi++) if (progress[`w${wi}-p${pi}-d${d}`]) count++;
                let bg = "#FFFEFA";
                if (count === 1) bg = "#C6E8D0";
                else if (count === 2) bg = "#8FCC9E";
                else if (count === 3) bg = "#5AB070";
                else if (count === 4) bg = "#2E8A4A";
                else if (count === 5) bg = "#006847";
                return (
                  <div key={idx} title={`Dia ${idx + 1}: ${count}/5`} className="aspect-square rounded-[7px] grid place-items-center text-[10px] font-bold border transition hover:scale-110" style={{ background: bg, borderColor: "#E8DCC3", color: count >= 4 ? "#fff" : "#6E6350" }}>
                    {count === 5 ? "✓" : count > 0 ? count : ""}
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-1 mt-3 justify-end text-[10px]" style={{ color: "#6E6350" }}>
              <span>menos</span>
              <span className="w-3 h-3 rounded-[3px] border" style={{ background: "#FFFEFA", borderColor: "#E8DCC3" }} />
              <span className="w-3 h-3 rounded-[3px]" style={{ background: "#C6E8D0" }} />
              <span className="w-3 h-3 rounded-[3px]" style={{ background: "#8FCC9E" }} />
              <span className="w-3 h-3 rounded-[3px]" style={{ background: "#006847" }} />
              <span>mais</span>
            </div>
          </div>

          {/* Progresso por semana */}
          <div className="rounded-[18px] p-5" style={{ background: "#FFFEFA", border: "1px solid #E8DCC3" }}>
            <div className="fraunces font-extrabold text-[16px]">Progresso por semana</div>
            <div className="text-[11px] mt-0.5 mb-3" style={{ color: "#6E6350" }}>resumo da sua trilha</div>
            <div className="grid gap-3">
              {WEEKS.map((w, wi) => {
                let wTotal = 0, wChecked = 0;
                for (let pi = 0; pi < 5; pi++) for (let d = 0; d < 7; d++) { wTotal++; if (progress[`w${wi}-p${pi}-d${d}`]) wChecked++; }
                const pctW = Math.round(100 * wChecked / wTotal);
                const barColor = wi === 0 ? "#006847" : wi === 1 ? "#E86A33" : wi === 2 ? "#CE1126" : "#8A7F68";
                return (
                  <div key={wi}>
                    <div className="flex justify-between text-[12px]"><span className="font-bold">{w.tag}</span><span style={{ color: "#6E6350" }}>{pctW}%</span></div>
                    <div className="text-[10px] -mt-0.5" style={{ color: "#8A7F68" }}>{w.title}</div>
                    <div className="h-[7px] rounded-full mt-1.5" style={{ background: "#F1EAD9" }}>
                      <div className="h-full rounded-full transition-all" style={{ width: `${pctW}%`, background: barColor }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dica */}
          <div className="rounded-[14px] px-4 py-3 flex gap-3" style={{ background: "#FFF1E6", border: "1px solid #FFD6BA" }}>
            <span className="text-[16px]">💡</span>
            <p className="text-[11.5px] leading-[1.5]" style={{ color: "#6E6350" }}>
              <b style={{ color: "#1A1A1A" }}>Dica do deserto:</b> toque em qualquer pedra pra ir direto pra tarefa daquele dia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
