import React from "react";
import logoIcon from "../assets/logo_final_mexico_flag.png";
import { TOOLS, PLAYLIST, PHRASES, VOCAB } from "../data";

export type BiblioTabId = "ferramentas" | "musicas" | "frases" | "vocab";

const BIBLIO_TABS: { id: BiblioTabId; label: string }[] = [
  { id: "ferramentas", label: "Ferramentas" },
  { id: "musicas", label: "Músicas" },
  { id: "frases", label: "Frases" },
  { id: "vocab", label: "Vocab" },
];

interface TabBibliotecaProps {
  biblioTab: BiblioTabId;
  setBiblioTab: (tab: BiblioTabId) => void;
  checkedCount: number;
  total: number;
  daysDoneCount: number;
  currentStreak: number;
}

export function TabBiblioteca({ biblioTab, setBiblioTab, checkedCount, total, daysDoneCount, currentStreak }: TabBibliotecaProps) {
  const totalSongs = PLAYLIST.reduce((acc, t) => acc + t.songs.length, 0);

  return (
    <div className="grid lg:grid-cols-[220px_1fr_300px] gap-6 items-start">
      <div className="rounded-[18px] p-3 h-fit lg:sticky lg:top-[84px]" style={{ background: "#FFFEFA", border: "1px solid #E8DCC3" }}>
        {BIBLIO_TABS.map(it => (
          <button
            key={it.id}
            onClick={() => setBiblioTab(it.id)}
            className={`w-full text-left px-3 py-2.5 rounded-full text-[13px] font-bold mb-1 transition ${biblioTab === it.id ? "text-white" : ""}`}
            style={{ background: biblioTab === it.id ? "#1A1A1A" : "transparent", color: biblioTab === it.id ? "#fff" : "#6E6350" }}
          >
            {it.label}
          </button>
        ))}
        <div className="mt-4 p-3 rounded-xl" style={{ background: "#FDF6E3", border: "1px dashed #E8DCC3" }}>
          <div className="text-[11px] font-bold tracking-widest" style={{ color: "#6E6350" }}>DICA</div>
          <div className="text-[12px] mt-1 leading-snug">Todo recurso aqui abre em nova aba, direto pra prática.</div>
        </div>
      </div>

      <div className="rounded-[18px] p-5 md:p-6 min-h-[420px]" style={{ background: "#FFFEFA", border: "1px solid #E8DCC3" }}>
        {biblioTab === "ferramentas" && (
          <>
            <div className="fraunces font-extrabold text-[20px]">Caixa de Ferramentas</div>
            <div className="text-[13px] mt-1" style={{ color: "#6E6350" }}>{TOOLS.length} recursos gratuitos, um clique de distância</div>
            <div id="tools" className="grid md:grid-cols-2 gap-3 mt-5">
              {TOOLS.map(t => (
                <a
                  key={t.name}
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl p-3.5 block cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5"
                  style={{ background: "#FDF6E3", border: "1px solid #E8DCC3" }}
                >
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-[13px]">{t.name}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "#E8F5E9", color: "#006847" }}>grátis</span>
                  </div>
                  <div className="text-[10px] tracking-widest font-bold mt-1" style={{ color: "#6E6350" }}>{t.type}</div>
                  <div className="text-[12px] mt-1.5" style={{ color: "#6E6350" }}>{t.desc}</div>
                  <div className="text-[12px] font-bold mt-2" style={{ color: "#2757A6" }}>Acessar →</div>
                </a>
              ))}
            </div>
          </>
        )}
        {biblioTab === "musicas" && (
          <>
            <div className="fraunces font-extrabold text-[20px]">Trilha Sonora</div>
            <div className="text-[13px] mt-1" style={{ color: "#6E6350" }}>{totalSongs} músicas anotadas por dificuldade</div>
            <div id="playlist" className="mt-5 grid gap-5">
              {PLAYLIST.map(tier => (
                <div key={tier.tier}>
                  <div className="text-[11px] font-bold tracking-widest" style={{ color: "#E86A33" }}>{tier.tier}</div>
                  <div className="mt-2 divide-y rounded-xl overflow-hidden" style={{ border: "1px solid #E8DCC3" }}>
                    {tier.songs.map(s => (
                      <a
                        key={s[0]}
                        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(s[0] + " " + s[1])}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex justify-between items-center p-3 text-[13px] bg-[#FFFEFA] cursor-pointer transition-colors hover:bg-[#FDF6E3]"
                      >
                        <span className="font-bold">🎵 {s[0]}</span>
                        <span className="text-[11px]" style={{ color: "#6E6350" }}>{s[1]}</span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {biblioTab === "frases" && (
          <>
            <div className="fraunces font-extrabold text-[20px]">Frases de Reunião</div>
            <div className="text-[13px] mt-1" style={{ color: "#6E6350" }}>{PHRASES.length} frases prontas para contexto profissional</div>
            <div id="phrases" className="mt-4 grid gap-3">
              {PHRASES.map((p, i) => (
                <div key={i} className="rounded-xl p-3.5" style={{ background: "#FDF6E3", border: "1px solid #E8DCC3" }}>
                  <div className="italic text-[14px] font-medium">"{p.es}"</div>
                  <div className="text-[11px] mt-1.5 font-bold" style={{ color: "#6E6350" }}>{p.ctx}</div>
                </div>
              ))}
            </div>
          </>
        )}
        {biblioTab === "vocab" && (
          <>
            <div className="fraunces font-extrabold text-[20px]">Vocabulário Técnico</div>
            <div className="text-[13px] mt-1" style={{ color: "#6E6350" }}>{VOCAB.length} termos comuns em reuniões de dev</div>
            <div className="mt-4 grid gap-2">
              {VOCAB.map((v, i) => (
                <div key={i} className="flex justify-between items-center rounded-xl p-3" style={{ background: "#FDF6E3", border: "1px solid #E8DCC3" }}>
                  <span className="italic text-[13px]">{v[0]}</span>
                  <span className="text-[13px] font-bold" style={{ color: "#006847" }}>{v[1]}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <aside className="flex flex-col gap-5 lg:sticky lg:top-[84px]">
        <div className="rounded-[18px] p-5 md:p-6" style={{ background: "#FFFEFA", border: "1px solid #E8DCC3" }}>
          <div className="fraunces font-extrabold text-[17px] mb-4">Sua Jornada</div>
          <div className="flex flex-col gap-3 text-[13px]">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ background: "#006847" }} />Tarefas feitas</span>
              <b>{checkedCount} / {total}</b>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ background: "#E86A33" }} />Dias completos</span>
              <b style={{ color: "#E86A33" }}>{daysDoneCount}/28</b>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ background: "#CE1126" }} />Ofensiva</span>
              <b style={{ color: "#CE1126" }}>{currentStreak} {currentStreak === 1 ? "dia" : "dias"}</b>
            </div>
          </div>
        </div>

        <div className="rounded-[18px] p-4 flex items-center gap-3" style={{ background: "#FDF6E3", border: "1px dashed #E8DCC3" }}>
          <img src={logoIcon} alt="" className="w-8 h-8 shrink-0" />
          <div className="text-[11px] leading-snug" style={{ color: "#6E6350" }}>
            Todos os recursos desta biblioteca são gratuitos e verificados.
          </div>
        </div>
      </aside>
    </div>
  );
}
