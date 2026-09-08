import React from "react";
import logoIcon from "../assets/logo_final_mexico_flag.png";
import logoFull from "../assets/logo_mexico_flag_full.png";
import { TOOLS, PLAYLIST, PHRASES, VOCAB, STORE_KEY } from "../data";

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
  return (
    <div className="grid lg:grid-cols-[220px_1fr_300px] gap-6">
      <div className="rounded-[18px] p-3 h-fit sticky top-[148px]" style={{ background: "#FFFEFA", border: "1px solid #E8DCC3" }}>
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
          <div className="text-[11px] font-bold tracking-widest" style={{ color: "#6E6350" }}>DICA GYM DESERTO</div>
          <div className="text-[12px] mt-1 leading-snug">Use o ícone <img src={logoIcon} alt="" className="inline w-4 h-4" /> em loading / empty states — já aplicado.</div>
        </div>
      </div>

      <div className="rounded-[18px] p-5 md:p-6 min-h-[420px]" style={{ background: "#FFFEFA", border: "1px solid #E8DCC3" }}>
        {biblioTab === "ferramentas" && (
          <>
            <div className="fraunces font-extrabold text-[20px]">Caixa de ferramentas • tudo grátis</div>
            <div className="text-[12px] mt-1" style={{ color: "#6E6350" }}>Baixe no domingo antes de começar • IDs preservados weeks, tools, playlist, phrases, vocab</div>
            <div id="tools" className="grid md:grid-cols-2 gap-3 mt-5">
              {TOOLS.map(t => (
                <a
                  key={t.name}
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl p-3 block cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5"
                  style={{ background: "#FDF6E3", border: "1px solid #E8DCC3" }}
                >
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-[13px]">{t.name} ↗</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "#E8F5E9", color: "#006847" }}>grátis</span>
                  </div>
                  <div className="text-[10px] tracking-widest font-bold mt-1" style={{ color: "#6E6350" }}>{t.type}</div>
                  <div className="text-[12px] mt-1" style={{ color: "#6E6350" }}>{t.desc}</div>
                </a>
              ))}
            </div>
          </>
        )}
        {biblioTab === "musicas" && (
          <>
            <div className="fraunces font-extrabold text-[20px]">Trilha sonora</div>
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
                        className="flex justify-between p-2.5 text-[13px] bg-[#FFFEFA] cursor-pointer transition-colors hover:bg-[#FDF6E3]"
                      >
                        <span className="font-medium">{s[0]} ↗</span><span className="text-[11px]" style={{ color: "#6E6350" }}>{s[1]}</span>
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
            <div className="fraunces font-extrabold text-[20px]">Frases de reunião</div>
            <div id="phrases" className="mt-4 divide-y" style={{ borderColor: "#E8DCC3" }}>
              {PHRASES.map((p, i) => (
                <div key={i} className="py-3">
                  <div className="italic text-[13.5px]">"{p.es}"</div>
                  <div className="text-[11px] mt-1" style={{ color: "#6E6350" }}>{p.ctx}</div>
                </div>
              ))}
            </div>
          </>
        )}
        {biblioTab === "vocab" && (
          <>
            <div className="fraunces font-extrabold text-[20px]">Vocabulário técnico</div>
            <table id="vocab" className="w-full mt-4 text-[13px]">
              <tbody>
                {VOCAB.map((v, i) => (
                  <tr key={i} className="border-t" style={{ borderColor: "#E8DCC3" }}>
                    <td className="py-2 italic">{v[0]}</td><td className="py-2 text-right" style={{ color: "#6E6350" }}>{v[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <div className="rounded-[18px] p-5" style={{ background: "#FFFEFA", border: "1px solid #E8DCC3" }}>
          <div className="fraunces font-bold">Resumo rápido</div>
          <div className="text-[12px] mt-2 space-y-1" style={{ color: "#6E6350" }}>
            <div>• {checkedCount} / {total} tarefas</div>
            <div>• {daysDoneCount}/28 dias completos</div>
            <div>• Streak atual {currentStreak} dias</div>
            <div>• Key localStorage: {STORE_KEY}</div>
          </div>
          <img src={logoFull} alt="logo full" className="mt-4 w-full rounded-xl border p-2 bg-white" style={{ borderColor: "#E8DCC3" }} />
        </div>
      </div>
    </div>
  );
}