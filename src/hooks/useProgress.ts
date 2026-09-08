import { useEffect, useMemo, useState } from "react";
import { PILLARS, STORE_KEY, getPillarMinutes } from "../data";

/**
 * Hook que encapsula toda a lógica de progresso do desafio 28 dias.
 * Lógica idêntica à do App_FULL_ORIGINAL.tsx — apenas extraída para cá.
 */
export function useProgress(todayIndex: number) {
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setProgress(parsed);
      }
    } catch {}
  }, []);

  // Save
  const updateProgress = (key: string, checked: boolean) => {
    setProgress(prev => {
      const next = { ...prev, [key]: checked };
      try {
        localStorage.setItem(STORE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Derived stats
  const stats = useMemo(() => {
    const totalBoxes = 4 * 5 * 7;

    const checked = Object.values(progress).filter(Boolean).length;

    // daysDone
    const daysArr: boolean[] = [];
    for (let wi = 0; wi < 4; wi++) {
      for (let d = 0; d < 7; d++) {
        let full = true;
        for (let pi = 0; pi < 5; pi++) {
          if (!progress[`w${wi}-p${pi}-d${d}`]) { full = false; break; }
        }
        daysArr.push(full);
      }
    }
    const daysDone = daysArr.filter(Boolean).length;

    // streaks
    let best = 0, cur = 0, curStreak = 0;
    let run = 0;
    for (let i = 0; i < daysArr.length; i++) {
      if (daysArr[i]) { run++; best = Math.max(best, run); } else { run = 0; }
    }
    for (let i = daysArr.length - 1; i >= 0; i--) {
      if (daysArr[i]) curStreak++; else if (curStreak > 0) break;
    }
    if (curStreak === 0 && daysDone > 0) {
      let lastTrue = daysArr.lastIndexOf(true);
      if (lastTrue >= 0) {
        for (let i = lastTrue; i >= 0; i--) {
          if (daysArr[i]) cur++; else break;
        }
        curStreak = cur;
      }
    }

    // minutes today
    const wiToday = Math.floor(todayIndex / 7);
    const dToday = todayIndex % 7;
    let minToday = 0;
    for (let pi = 0; pi < 5; pi++) {
      if (progress[`w${wiToday}-p${pi}-d${dToday}`]) minToday += getPillarMinutes(PILLARS[pi].code);
    }
    // minutes week
    let minWeek = 0;
    for (let d = 0; d < 7; d++) {
      for (let pi = 0; pi < 5; pi++) {
        if (progress[`w${wiToday}-p${pi}-d${d}`]) minWeek += getPillarMinutes(PILLARS[pi].code);
      }
    }

    return {
      total: totalBoxes,
      checkedCount: checked,
      pct: Math.round(100 * checked / totalBoxes),
      daysDoneArray: daysArr,
      daysDoneCount: daysDone,
      currentStreak: curStreak,
      bestStreak: best,
      minutesToday: minToday,
      minutesWeek: minWeek,
    };
  }, [progress, todayIndex]);

  return { progress, updateProgress, ...stats };
}
