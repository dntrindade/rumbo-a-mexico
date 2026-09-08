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
}

export function Header({ currentStreak, bestStreak }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-30 backdrop-blur-xl border-b"
      style={{ background: "rgba(255,254,250,0.92)", borderColor: "#E8DCC3" }}
    >
      <div className="max-w-[1180px] mx-auto px-4 md:px-6 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={logoIcon}
            alt="Logo México"
            className="w-9 h-9 rounded-xl object-contain bg-white shadow-sm border"
            style={{ borderColor: "#E8DCC3" }}
          />
          <div className="fraunces font-extrabold tracking-tight text-[17px] md:text-[19px] flex items-baseline gap-2">
            <span style={{ color: "#1A1A1A" }}>RUMBO A MÉXICO</span>
            <span className="text-[13px] font-bold" style={{ color: "#6E6350" }}>• 28 DIAS</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5 text-[12px] font-bold px-3 py-1.5 rounded-full" style={{ background: "#FFF1E6", color: "#C9701E" }}>
            🔥 Streak atual: {currentStreak} {currentStreak === 1 ? "dia" : "dias"}
          </span>
          <span className="hidden md:inline text-[12px] font-bold" style={{ color: "#6E6350" }}>
            Melhor streak: {bestStreak} {bestStreak === 1 ? "dia" : "dias"}
          </span>
        </div>
      </div>
    </header>
  );
}
