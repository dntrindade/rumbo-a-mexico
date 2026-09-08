import React from "react";
import logoIcon from "../assets/logo_final_mexico_flag.png";

interface HeaderProps {
  currentStreak: number;
  bestStreak: number;
  minutesToday: number;
  pct: number;
  daysDoneCount: number;
  minutesWeek: number;
  todayIndex: number;
  onPremiumClick: () => void;
}

export function Header({
  currentStreak,
  bestStreak,
  minutesToday,
  pct,
  daysDoneCount,
  minutesWeek,
  todayIndex,
  onPremiumClick,
}: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-30 backdrop-blur-xl border-b"
      style={{ background: "rgba(255,254,250,0.9)", borderColor: "#E8DCC3" }}
    >
      <div className="max-w-[1180px] mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={logoIcon}
            alt="Logo México"
            className="w-9 h-9 rounded-xl object-contain bg-white shadow-sm border"
            style={{ borderColor: "#E8DCC3" }}
          />
          <div className="flex items-baseline gap-1.5">
            <span className="fraunces font-extrabold tracking-tight text-[18px] md:text-[20px]" style={{ color: "#006847" }}>RUMBO</span>
            <span className="fraunces font-extrabold tracking-tight text-[18px] md:text-[20px]" style={{ color: "#CE1126" }}>A MÉXICO</span>
            <span className="hidden md:inline ml-2 text-[11px] font-bold tracking-widest px-2 py-0.5 rounded-full" style={{ background: "#FDF6E3", color: "#6E6350", border: "1px solid #E8DCC3" }}>GYM DESERTO</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-3 mr-2">
            <div className="text-right leading-none">
              <div className="text-[11px] tracking-widest font-bold" style={{ color: "#6E6350" }}>SEQUÊNCIA</div>
              <div className="fraunces font-bold text-[16px]">{currentStreak} dias</div>
            </div>
            <div className="w-px h-8" style={{ background: "#E8DCC3" }} />
            <div className="text-right leading-none">
              <div className="text-[11px] tracking-widest font-bold" style={{ color: "#6E6350" }}>MELHOR</div>
              <div className="fraunces font-bold text-[16px]">{bestStreak}</div>
            </div>
          </div>
          <button
            onClick={onPremiumClick}
            className="px-4 py-2 rounded-full text-white text-[13px] font-bold tracking-wide hover:brightness-110 active:scale-[0.98] transition"
            style={{ background: "#006847" }}
          >
            Premium
          </button>
        </div>
      </div>

      {/* HERO COM 3 ANÉIS APPLE WATCH */}
      <div className="max-w-[1180px] mx-auto px-4 md:px-6 pb-5 pt-2">
        <div
          className="rounded-[20px] p-4 md:p-6 flex flex-col md:flex-row gap-6 items-center md:items-end justify-between shadow-[0_1px_2px_rgba(33,27,20,.06),0_8px_24px_-10px_rgba(33,27,20,.15)]"
          style={{ background: "#FFFEFA", border: "1px solid #E8DCC3" }}
        >
          <div className="flex gap-5 items-center w-full md:w-auto">
            {/* Rings */}
            <div className="relative w-[112px] h-[112px] shrink-0">
              <svg viewBox="0 0 120 120" className="w-full h-full">
                <circle cx="60" cy="60" r="52" className="ring-bg" />
                <circle cx="60" cy="60" r="40" className="ring-bg" />
                <circle cx="60" cy="60" r="28" className="ring-bg" />
                <circle cx="60" cy="60" r="52" className="ring-fg" style={{ stroke: "#006847", strokeDasharray: `${2 * Math.PI * 52}`, strokeDashoffset: `${2 * Math.PI * 52 * (1 - Math.min(minutesToday / 60, 1))}` }} />
                <circle cx="60" cy="60" r="40" className="ring-fg" style={{ stroke: "#E86A33", strokeDasharray: `${2 * Math.PI * 40}`, strokeDashoffset: `${2 * Math.PI * 40 * (1 - pct / 100)}` }} />
                <circle cx="60" cy="60" r="28" className="ring-fg" style={{ stroke: "#CE1126", strokeDasharray: `${2 * Math.PI * 28}`, strokeDashoffset: `${2 * Math.PI * 28 * (1 - Math.min(currentStreak / 7, 1))}` }} />
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <img src={logoIcon} alt="" className="w-7 h-7 rounded-full" />
              </div>
            </div>
            <div>
              <div className="text-[11px] font-bold tracking-[0.14em] mb-1" style={{ color: "#E86A33" }}>DESAFIO 28 DIAS • HOJE É DIA {todayIndex + 1}</div>
              <div className="fraunces font-extrabold text-[22px] leading-tight">Rumbo a México — GYM Deserto</div>
              <div className="text-[13px] mt-1 max-w-[42ch]" style={{ color: "#6E6350" }}>28 dias de espanhol falado para entrevista e projeto com a equipe mexicana — foco 100% fala.</div>
              <div className="flex gap-2 mt-3 flex-wrap">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ background: "#E8F5E9", color: "#006847", border: "1px solid #C8E6C9" }}>
                  <span className="w-2 h-2 rounded-full" style={{ background: "#006847" }} />{minutesToday} / 60 min hoje
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ background: "#FFF1E6", color: "#E86A33", border: "1px solid #FFD6BA" }}>
                  <span className="w-2 h-2 rounded-full" style={{ background: "#E86A33" }} />{pct}% total
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ background: "#FFEBEE", color: "#CE1126", border: "1px solid #FFCDD2" }}>
                  <span className="w-2 h-2 rounded-full" style={{ background: "#CE1126" }} />{currentStreak} streak
                </span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto grid grid-cols-3 gap-3 md:flex md:gap-5">
            <div className="rounded-xl p-3 min-w-[92px] text-center md:text-left" style={{ background: "#FDF6E3", border: "1px solid #E8DCC3" }}>
              <div id="pct" className="fraunces font-extrabold text-[24px] leading-none">{pct}%</div>
              <div className="text-[10px] font-bold tracking-widest mt-1" style={{ color: "#6E6350" }}>PROGRESSO</div>
              <div className="h-1.5 rounded-full mt-2 overflow-hidden" style={{ background: "#E8DCC3" }}>
                <div id="barTotal" className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: "#E86A33" }} />
              </div>
            </div>
            <div className="rounded-xl p-3 min-w-[92px] text-center md:text-left" style={{ background: "#FDF6E3", border: "1px solid #E8DCC3" }}>
              <div id="daysDone" className="fraunces font-extrabold text-[24px] leading-none">{daysDoneCount}<span className="text-[14px] font-medium" style={{ color: "#6E6350" }}>/28</span></div>
              <div className="text-[10px] font-bold tracking-widest mt-1" style={{ color: "#6E6350" }}>DIAS</div>
              <div className="text-[11px] mt-1" style={{ color: "#6E6350" }}>{minutesWeek} min semana</div>
            </div>
            <div className="rounded-xl p-3 min-w-[92px] text-center md:text-left md:hidden" style={{ background: "#FDF6E3", border: "1px solid #E8DCC3" }}>
              <div className="fraunces font-extrabold text-[24px] leading-none">{currentStreak}</div>
              <div className="text-[10px] font-bold tracking-widest mt-1" style={{ color: "#6E6350" }}>STREAK</div>
              <div className="text-[11px] mt-1" style={{ color: "#6E6350" }}>melhor {bestStreak}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
