import React from "react";
import logoIcon from "../assets/logo_final_mexico_flag.png";
import logoFull from "../assets/logo_mexico_flag_full.png";
import { PILLARS, WEEKS, STORE_KEY } from "../data";

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
}

export function TabHoje({
  todayIndex, wi, d, pct, daysDoneArray, progress, updateProgress,
  clickTick, setClickTick, lastAction, setLastAction, setTodayIndex,
  minutesToday, checkedCount, total,
}: TabHojeProps) {
  return (
    <div className="grid lg:grid-cols-[1fr_340px] gap-6 items-start">
      <div>
        {/* Caminho tracejado com cactozinho */}
        <div className="rounded-[18px] p-5 mb-5" style={{ background: "#FFFEFA", border: "1px solid #E8DCC3" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="fraunces font-bold text-[18px]">Dia {todayIndex + 1} • {WEEKS[wi]?.tag} — {WEEKS[wi]?.title}</div>
            <div className="text-[11px] font-bold tracking-widest px-2 py-1 rounded-full" style={{ background: "#FDF6E3", border: "1px solid #E8DCC3", color: "#6E6350" }}>{WEEKS[wi]?.focus.slice(0, 28)}...</div>
          </div>
          {/* desert trail */}
          <div className="relative h-[56px] rounded-xl flex items-center px-3" style={{ background: "linear-gradient(90deg,#FDF6E3 0%,#FFFEFA 100%)", border: "1px dashed #E8DCC3" }}>
            <div className="absolute left-3 right-3 top-1/2 h-0 border-t-[3px] border-dashed" style={{ borderColor: "#E8DCC3" }} />
            <div className="absolute top-1/2 -translate-y-1/2 transition-all duration-700" style={{ left: `calc(${Math.max(6, Math.min(92, pct))}% )`, transform: "translate(-50%,-50%)" }}>
              <div className="w-8 h-8 rounded-full grid place-items-center text-[18px] shadow" style={{ background: "#FFFEFA", border: "1px solid #E8DCC3" }}>🌵</div>
            </div>
            <div className="flex justify-between w-full relative z-10">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full" style={{ background: pct > i * 20 ? "#006847" : "#E8DCC3" }} />
              ))}
            </div>
          </div>
          {/* day selector */}
          <div className="flex gap-1.5 mt-4 overflow-x-auto pb-1">
            {Array.from({ length: 28 }).map((_, i) => {
              const isDone = daysDoneArray[i];
              const isToday = i === todayIndex;
              return (
                <button
                  key={i}
                  onClick={() => { setTodayIndex(i); setClickTick(c => c + 1); setLastAction(`Dia ${i + 1} selecionado • clique ${clickTick + 1}`); }}
                  className={`shrink-0 w-9 h-9 rounded-full grid place-items-center text-[12px] font-bold border transition ${isToday ? "text-white" : ""}`}
                  style={{
                    background: isDone ? "#006847" : isToday ? "#E86A33" : "#FFFEFA",
                    color: isDone || isToday ? "#fff" : "#6E6350",
                    borderColor: isDone ? "#006847" : isToday ? "#E86A33" : "#E8DCC3",
                    boxShadow: isToday ? "0 0 0 3px #FFD6BA" : "none",
                  }}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          {lastAction && <div className="mt-2 text-[11px] font-bold" style={{ color: "#006847" }}>{lastAction}</div>}
        </div>

        {/* 5 cards O E M C V */}
        <div className="grid gap-4">
          {PILLARS.map((pillar, pi) => {
            const key = `w${wi}-p${pi}-d${d}`;
            const checked = !!progress[key];
            const taskHtml = WEEKS[wi]?.tasks[pi] || "";
            return (
              <div key={pi} className="rounded-[18px] p-4 md:p-5 flex gap-4 items-start transition" style={{ background: checked ? "#E8F5E9" : "#FFFEFA", border: `1px solid ${checked ? "#A5D6A7" : "#E8DCC3"}`, boxShadow: "0 1px 2px rgba(33,27,20,.04)" }}>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-9 h-9 rounded-[10px] grid place-items-center fraunces font-extrabold text-[15px]" style={{ background: checked ? "#006847" : "#FDF6E3", color: checked ? "#fff" : "#1A1A1A", border: "1px solid #E8DCC3" }}>{pillar.code}</div>
                  <button aria-label={`Marcar ${pillar.title}`} onClick={() => updateProgress(key, !checked)} className="w-8 h-8 rounded-[10px] grid place-items-center border-2 transition-all active:scale-95" style={{ background: checked ? "#006847" : "#FFFEFA", borderColor: checked ? "#006847" : "#E8DCC3", width: "32px", height: "32px" }}>
                    {checked && <span className="text-white text-[16px] font-bold">✓</span>}
                  </button>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <div className="fraunces font-bold text-[16px]">{pillar.title}</div>
                    <div className="text-[11px] font-bold tracking-wide px-2 py-0.5 rounded-full" style={{ background: "#FDF6E3", border: "1px solid #E8DCC3", color: "#6E6350" }}>{pillar.time}</div>
                    {checked && <span className="text-[11px] font-bold" style={{ color: "#006847" }}>• feito</span>}
                  </div>
                  <div className="text-[13.5px] mt-1.5 leading-[1.5]" style={{ color: "#1A1A1A" }} dangerouslySetInnerHTML={{ __html: taskHtml }} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-[12px] text-center" style={{ color: "#6E6350" }}>
          Progresso salvo automaticamente em <code className="px-1.5 py-0.5 rounded" style={{ background: "#FFFEFA", border: "1px solid #E8DCC3" }}>{STORE_KEY}</code> • {checkedCount}/{total} tarefas
        </div>
      </div>

      {/* Sidebar afiliados + resumo */}
      <aside className="flex flex-col gap-5">
        <div className="rounded-[18px] p-5" style={{ background: "#FFFEFA", border: "1px solid #E8DCC3" }}>
          <div className="fraunces font-bold text-[16px]">Hoje • minutos</div>
          <div className="text-[12px] mt-1" style={{ color: "#6E6350" }}>Meta Apple Watch: 60 min</div>
          <div className="mt-3 h-2 rounded-full overflow-hidden" style={{ background: "#E8DCC3" }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(100, (minutesToday / 60) * 100)}%`, background: "#006847" }} />
          </div>
          <div className="text-[12px] mt-2 font-bold" style={{ color: "#006847" }}>{minutesToday} min feitos hoje</div>
        </div>

        <div className="rounded-[18px] p-4 flex gap-3 items-center" style={{ background: "#1A1A1A", color: "#FFFEFA" }}>
          <img src={logoFull} alt="Logo completo" className="w-14 h-14 object-contain rounded-xl bg-white p-1" />
          <div className="text-[12px] leading-tight">
            <b>GYM Deserto</b> • espanhol.dotapps.com.br
          </div>
        </div>
      </aside>
    </div>
  );
}
