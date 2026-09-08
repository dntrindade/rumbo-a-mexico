import React, { useEffect, useState } from "react";
import { useProgress } from "./hooks/useProgress";
import { GLOBAL_STYLE } from "./theme";
import { Header } from "./components/Header";
import { TabsNav, TabId } from "./components/TabsNav";
import { TabHoje } from "./components/TabHoje";
import { TabTrilha } from "./components/TabTrilha";
import { TabBiblioteca, BiblioTabId } from "./components/TabBiblioteca";
import { CertModal } from "./components/CertModal";
import { Footer } from "./components/Footer";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('trilha');
  const [biblioTab, setBiblioTab] = useState<BiblioTabId>('ferramentas');
  const [todayIndex, setTodayIndex] = useState(11); // Dia 12 como exemplo aprovado
  const [lastAction, setLastAction] = useState<string>("");
  const [clickTick, setClickTick] = useState(0);
  const [showCert, setShowCert] = useState(false);
  const [hasCelebrated, setHasCelebrated] = useState(false);

  const {
    progress, updateProgress, total, checkedCount, pct,
    daysDoneArray, daysDoneCount, currentStreak, bestStreak,
    minutesToday, minutesWeek,
  } = useProgress(todayIndex);

  // auto select todayIndex como primeiro incompleto, só se já houver progresso
  useEffect(() => {
    if (Object.keys(progress).length === 0) return;
    const firstIncomplete = daysDoneArray.findIndex(v => !v);
    if (firstIncomplete >= 0 && firstIncomplete !== todayIndex) setTodayIndex(firstIncomplete);
    else if (daysDoneArray.length === 28 && daysDoneArray.every(Boolean)) setTodayIndex(27);
  }, [daysDoneArray, progress]);

  // celebrar 100%
  useEffect(() => {
    if (pct === 100 && !hasCelebrated) {
      setShowCert(true);
      setHasCelebrated(true);
    }
  }, [pct, hasCelebrated]);

  const wi = Math.floor(todayIndex / 7);
  const d = todayIndex % 7;

  const downloadCert = () => {
    const content = `RUMBO A MÉXICO - CERTIFICADO\n\n¡Felicidades! Você completou 28 dias.\nProgresso: ${pct}% - ${daysDoneCount}/28 dias\nData: ${new Date().toLocaleDateString('pt-BR')}\n\nSelo: 28 pedras do deserto conquistadas 🌵\n\nPróximos desafios: 8, 12, 16 semanas e outros idiomas em breve em espanhol.dotapps.com.br`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'certificado-rumbo-mexico-28-dias.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen" style={{ background: "#FDF6E3", color: "#1A1A1A" }}>
      <style>{GLOBAL_STYLE}</style>

      <Header
        currentStreak={currentStreak}
        bestStreak={bestStreak}
        minutesToday={minutesToday}
        pct={pct}
        daysDoneCount={daysDoneCount}
        minutesWeek={minutesWeek}
        todayIndex={todayIndex}
      />

      <TabsNav activeTab={activeTab} onChange={setActiveTab} />

      {/* feedback global sempre visível para validação e UX */}
      {lastAction && (
        <div className="max-w-[1180px] mx-auto px-4 md:px-6 mt-3">
          <div className="text-[11px] font-bold px-3 py-1.5 rounded-full inline-flex" style={{ background: "#E8F5E9", border: "1px solid #A5D6A7", color: "#006847" }}>✓ {lastAction}</div>
        </div>
      )}

      <main className="max-w-[1180px] mx-auto px-4 md:px-6 pb-24 mt-6">
        {activeTab === "hoje" && (
          <TabHoje
            todayIndex={todayIndex}
            wi={wi}
            d={d}
            pct={pct}
            daysDoneArray={daysDoneArray}
            progress={progress}
            updateProgress={updateProgress}
            clickTick={clickTick}
            setClickTick={setClickTick}
            lastAction={lastAction}
            setLastAction={setLastAction}
            setTodayIndex={setTodayIndex}
            minutesToday={minutesToday}
            checkedCount={checkedCount}
            total={total}
          />
        )}

        {activeTab === "trilha" && (
          <TabTrilha
            todayIndex={todayIndex}
            daysDoneArray={daysDoneArray}
            progress={progress}
            clickTick={clickTick}
            setClickTick={setClickTick}
            setLastAction={setLastAction}
            setTodayIndex={setTodayIndex}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === "biblioteca" && (
          <TabBiblioteca
            biblioTab={biblioTab}
            setBiblioTab={setBiblioTab}
            checkedCount={checkedCount}
            total={total}
            daysDoneCount={daysDoneCount}
            currentStreak={currentStreak}
          />
        )}
      </main>

      <Footer />

      {showCert && (
        <CertModal
          daysDoneCount={daysDoneCount}
          onDownload={downloadCert}
          onClose={() => setShowCert(false)}
        />
      )}
    </div>
  );
}
