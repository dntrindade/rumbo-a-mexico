import React from "react";
import { WEEKS } from "../data";
import { TabId } from "./TabsNav";

interface TabTrilhaProps {
  todayIndex: number;
  daysDoneArray: boolean[];
  progress: Record<string, boolean>;
  clickTick: number;
  setClickTick: React.Dispatch<React.SetStateAction<number>>;
  setLastAction: (msg: string) => void;
  setTodayIndex: (i: number) => void;
  setActiveTab: (tab: TabId) => void;
}

export function TabTrilha({
  todayIndex, daysDoneArray, progress, clickTick, setClickTick,
  setLastAction, setTodayIndex, setActiveTab,
}: TabTrilhaProps) {
  const daysDoneCount = daysDoneArray.filter(Boolean).length;

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">
      <div className="rounded-[18px] p-5 md:p-6" style={{ background: "#FFFEFA", border: "1px solid #E8DCC3" }}>
        <div className="flex items-start justify-between flex-wrap gap-3 mb-1">
          <div>
            <div className="fraunces font-extrabold text-[20px]">Trilha do Aprendizado</div>
            <div className="text-[13px] mt-1" style={{ color: "#6E6350" }}>Navegue pelas 28 pedras do deserto rumo à fluência</div>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-bold" style={{ color: "#6E6350" }}>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: "#006847" }} />completo</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: "#E86A33" }} />hoje</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full border" style={{ background: "#FDF6E3", borderColor: "#E8DCC3" }} />futuro</span>
          </div>
        </div>

        {/* Caminho sinuoso */}
        <div className="relative mt-8 mx-auto max-w-[720px]">
          <svg viewBox="0 0 400 680" className="absolute inset-0 w-full h-full pointer-events-none">
            <path d="M 200 20 C 80 80, 320 140, 200 200 C 80 260, 320 320, 200 380 C 80 440, 320 500, 200 560 C 80 620, 200 660, 200 660" fill="none" stroke="#E8DCC3" strokeWidth="3" strokeDasharray="10 12" />
          </svg>
          <div className="relative grid gap-[18px]">
            {Array.from({ length: 28 }).map((_, i) => {
              const isDone = daysDoneArray[i];
              const isToday = i === todayIndex;
              const offset = Math.sin(i * 0.9) * 46;
              return (
                <div key={i} className="flex items-center" style={{ transform: `translateX(${offset}px)`, justifyContent: i % 2 === 0 ? "flex-start" : "flex-end" }}>
                  <button
                    onClick={() => { setTodayIndex(i); setClickTick(c => c + 1); setActiveTab('hoje'); setLastAction(`Indo para Dia ${i + 1} • ${clickTick + 1}`); }}
                    className={`group relative w-[54px] h-[54px] rounded-full grid place-items-center font-bold text-[13px] border-2 transition-all hover:scale-[1.05] active:scale-[0.97] ${isToday ? "animate-[pulse_1.8s_infinite]" : ""}`}
                    style={{
                      background: isDone ? "#006847" : isToday ? "#E86A33" : "#FDF6E3",
                      borderColor: isDone ? "#006847" : isToday ? "#E86A33" : "#E8DCC3",
                      color: isDone || isToday ? "#fff" : "#6E6350",
                      boxShadow: isToday ? "0 0 0 6px rgba(232,106,51,0.18)" : isDone ? "0 2px 8px rgba(0,104,71,0.25)" : "none",
                    }}
                  >
                    {isDone ? "🌵" : i + 1}
                    {isDone && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white border grid place-items-center text-[10px]" style={{ borderColor: "#006847" }}>✓</span>}
                    {isToday && <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap" style={{ background: "#E86A33", color: "#fff" }}>HOJE</span>}
                  </button>
                  <div className="ml-3 mr-3 text-[11px] leading-tight max-w-[160px]" style={{ color: "#6E6350" }}>
                    <div className="font-bold" style={{ color: "#1A1A1A" }}>Dia {i + 1}</div>
                    <div>{isDone ? "completo" : isToday ? "hoje • bora!" : "5 tarefas"}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {/* MÉTRICAS DE CONQUISTA (mesma linguagem visual da aba Hoje) */}
        <div className="rounded-[18px] p-5 md:p-6" style={{ background: "#FFFEFA", border: "1px solid #E8DCC3" }}>
          <div className="fraunces font-extrabold text-[18px] mb-4">Métricas de Conquista</div>
          <div className="flex flex-col gap-3 text-[13px]">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ background: "#E86A33" }} />Trilha Geral</span>
              <b style={{ color: "#E86A33" }}>{Math.round(100 * daysDoneCount / 28)}% (Dia {daysDoneCount}/28)</b>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ background: "#006847" }} />Dias completos</span>
              <b style={{ color: "#006847" }}>{daysDoneCount}/28</b>
            </div>
          </div>
        </div>

        <div className="rounded-[18px] p-5 md:p-6" style={{ background: "#FFFEFA", border: "1px solid #E8DCC3" }}>
          <div className="fraunces font-extrabold text-[17px]">Mapa de calor</div>
          <div className="text-[12px] mt-1" style={{ color: "#6E6350" }}>Intensidade de prática por dia • estilo GitHub</div>
          <div className="grid grid-cols-7 gap-2 mt-4">
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
                <div key={idx} title={`Dia ${idx + 1}: ${count}/5`} className="aspect-square rounded-[6px] grid place-items-center text-[10px] font-bold border transition" style={{ background: bg, borderColor: "#E8DCC3", color: count >= 4 ? "#fff" : "#6E6350" }}>
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

        <div className="rounded-[18px] p-5 md:p-6" style={{ background: "#FFFEFA", border: "1px solid #E8DCC3" }}>
          <div className="fraunces font-extrabold text-[17px] mb-3">Progresso por semana</div>
          <div className="grid gap-3">
            {WEEKS.map((w, wi) => {
              let wTotal = 0, wChecked = 0;
              for (let pi = 0; pi < 5; pi++) for (let d = 0; d < 7; d++) { wTotal++; if (progress[`w${wi}-p${pi}-d${d}`]) wChecked++; }
              const pctW = Math.round(100 * wChecked / wTotal);
              const barColor = wi === 0 ? "#006847" : wi === 1 ? "#E86A33" : wi === 2 ? "#CE1126" : "#8A7F68";
              return (
                <div key={wi}>
                  <div className="flex justify-between text-[12px]"><span className="font-bold">{w.tag}</span><span style={{ color: "#6E6350" }}>{pctW}%</span></div>
                  <div className="h-1.5 rounded-full mt-1" style={{ background: "#F1EAD9" }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${pctW}%`, background: barColor }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
