import React from "react";
import logoIcon from "../assets/logo_final_mexico_flag.png";
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
  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-6">
      <div className="rounded-[22px] p-6 md:p-8" style={{ background: "#FFFEFA", border: "1px solid #E8DCC3" }}>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="fraunces font-extrabold text-[20px]">Trilha 28 pedras • deserto sinuoso</div>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full" style={{ background: "#006847" }} /> completo</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full animate-pulse" style={{ background: "#E86A33" }} /> hoje</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full border" style={{ background: "#FDF6E3", borderColor: "#E8DCC3" }} /> futuro</span>
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
              const offset = Math.sin(i * 0.9) * 46; // sinuoso
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
                  </button>
                  <div className="ml-3 mr-3 text-[11px] leading-tight max-w-[160px]" style={{ color: "#6E6350" }}>
                    <div className="font-bold" style={{ color: "#1A1A1A" }}>Dia {i + 1}</div>
                    <div>{isDone ? "completo" : isToday ? "hoje • bora!" : `${5 - (Object.keys(progress).filter(k => k.includes(`-d${i % 7}`) && k.startsWith(`w${Math.floor(i / 7)}-`)).length > 0 ? 1 : 0)} tarefas`}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <img src={logoIcon} alt="cacto" className="w-10 h-10 opacity-80" />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="rounded-[18px] p-5" style={{ background: "#FFFEFA", border: "1px solid #E8DCC3" }}>
          <div className="fraunces font-bold text-[16px]">Mapa de calor 4x7 • GitHub style</div>
          <div className="text-[11px] mt-1" style={{ color: "#6E6350" }}>verde claro → verde México #006847</div>
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

        <div className="rounded-[18px] p-5" style={{ background: "#1A1A1A", color: "#FFFEFA" }}>
          <div className="fraunces font-bold">Progresso por semana</div>
          <div className="grid gap-3 mt-3">
            {WEEKS.map((w, wi) => {
              let wTotal = 0, wChecked = 0;
              for (let pi = 0; pi < 5; pi++) for (let d = 0; d < 7; d++) { wTotal++; if (progress[`w${wi}-p${pi}-d${d}`]) wChecked++; }
              const pctW = Math.round(100 * wChecked / wTotal);
              return (
                <div key={wi}>
                  <div className="flex justify-between text-[12px]"><span className="font-bold">{w.tag}</span><span style={{ color: "#E8DCC3" }}>{pctW}%</span></div>
                  <div className="h-1.5 rounded-full mt-1" style={{ background: "#2A2A2A" }}>
                    <div className="h-full rounded-full" style={{ width: `${pctW}%`, background: wi === 0 ? "#006847" : wi === 1 ? "#E86A33" : wi === 2 ? "#CE1126" : "#FDF6E3" }} />
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
