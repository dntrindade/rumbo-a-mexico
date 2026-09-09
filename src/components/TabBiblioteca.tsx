import React from "react";
import { TOOLS, PLAYLIST, PHRASES, VOCAB } from "../data";

export type BiblioTabId = "ferramentas" | "musicas" | "frases" | "vocab";

const BIBLIO_TABS: { id: BiblioTabId; label: string }[] = [
  { id: "ferramentas", label: "Ferramentas" },
  { id: "musicas", label: "Músicas" },
  { id: "frases", label: "Frases" },
  { id: "vocab", label: "Vocab" },
];

const HEADLINES: Record<BiblioTabId, { title: string; accent: string; sub: string }> = {
  ferramentas: { title: "Caixa de Ferramentas", accent: "seu arsenal gratuito", sub: `${TOOLS.length} recursos gratuitos, um clique de distância` },
  musicas: { title: "Trilha Sonora", accent: "suas músicas favoritas", sub: `${PLAYLIST.reduce((a, t) => a + t.songs.length, 0)} músicas anotadas por dificuldade` },
  frases: { title: "Frases de Reunião", accent: "prontas pra usar", sub: `${PHRASES.length} frases para contexto profissional` },
  vocab: { title: "Vocabulário Técnico", accent: "termos essenciais", sub: `${VOCAB.length} termos comuns em reuniões de dev` },
};

interface TabBibliotecaProps {
  biblioTab: BiblioTabId;
  setBiblioTab: (tab: BiblioTabId) => void;
  checkedCount: number;
  total: number;
  daysDoneCount: number;
  currentStreak: number;
}

export function TabBiblioteca({ biblioTab, setBiblioTab, checkedCount, total, daysDoneCount, currentStreak }: TabBibliotecaProps) {
  const headline = HEADLINES[biblioTab];

  return (
    <div className="relative rounded-[22px] overflow-hidden" style={{ background: "#FFFEFA", border: "1px solid #E8DCC3" }}>
      {/* fundo decorativo sutil: pontinhos + curvas topográficas */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{ backgroundImage: "radial-gradient(#F1EAD9 1.6px, transparent 1.6px)", backgroundSize: "24px 24px" }}
      />
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 1000 700" preserveAspectRatio="none">
        <path d="M-50 90 Q 150 60,300 100 T 600 90 T 900 80 T 1200 100" fill="none" stroke="#E8DCC3" strokeWidth="1.2" />
        <path d="M-50 180 Q 180 150,350 190 T 650 180 T 950 170 T 1200 190" fill="none" stroke="#E8DCC3" strokeWidth="1.2" />
        <path d="M-50 270 Q 200 240,400 280 T 700 270 T 1000 260 T 1200 280" fill="none" stroke="#DCE8DC" strokeWidth="1" />
      </svg>

      <div className="relative grid lg:grid-cols-[220px_1fr_300px] gap-6 p-5 md:p-6">
        {/* FILTROS */}
        <div className="flex flex-col gap-4">
          <div className="rounded-[18px] p-4" style={{ background: "#FFFEFA", border: "1px solid #E8DCC3" }}>
            <div className="fraunces font-extrabold text-[15px] mb-3">Filtros</div>
            <div className="flex flex-col gap-1.5">
              {BIBLIO_TABS.map(it => (
                <button
                  key={it.id}
                  onClick={() => setBiblioTab(it.id)}
                  className={`text-left px-4 py-2.5 rounded-full text-[13px] font-bold transition flex items-center justify-between ${biblioTab === it.id ? "text-white" : ""}`}
                  style={{ background: biblioTab === it.id ? "#1A1A1A" : "#FDF6E3", color: biblioTab === it.id ? "#fff" : "#8A7F68", border: biblioTab === it.id ? "none" : "1px solid #E8DCC3" }}
                >
                  {it.label}
                  {biblioTab === it.id && <span>●</span>}
                </button>
              ))}
            </div>

            <div className="mt-4 rounded-[14px] p-3.5" style={{ background: "#FDF6E3", border: "1px dashed #E8DCC3" }}>
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full grid place-items-center text-[13px] shrink-0" style={{ background: "#FFFEFA", border: "1px solid #E8DCC3" }}>💡</div>
                <div>
                  <div className="text-[11px] font-bold tracking-widest" style={{ color: "#006847" }}>DICA</div>
                  <div className="text-[12px] mt-1 leading-[1.45]" style={{ color: "#6E6350" }}>
                    Use 1 recurso por dia. Menos é mais pra criar hábito.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block rounded-[16px] p-4" style={{ background: "#FFFEFA", border: "1px solid #E8DCC3" }}>
            <div className="text-[10px] font-bold tracking-widest" style={{ color: "#8A7F68" }}>ARSENAL</div>
            <div className="fraunces font-bold text-[14px] mt-1">{TOOLS.length} recursos gratuitos</div>
            <div className="mt-2.5 h-1.5 w-full rounded-full overflow-hidden" style={{ background: "#F1EAD9" }}>
              <div className="h-full rounded-full" style={{ width: "35%", background: "#006847" }} />
            </div>
          </div>
        </div>

        {/* CONTEÚDO PRINCIPAL */}
        <div>
          <div className="mb-5">
            <div className="fraunces font-extrabold text-[26px] md:text-[30px] leading-[1.05] tracking-tight">
              {headline.title} <span style={{ color: "#006847" }}>•</span> <span className="font-normal italic">{headline.accent}</span>
            </div>
            <div className="mt-2 text-[14px] font-medium" style={{ color: "#6E6350" }}>{headline.sub}</div>
          </div>

          {biblioTab === "ferramentas" && (
            <div className="grid sm:grid-cols-2 gap-4">
              {TOOLS.map(t => (
                <a
                  key={t.name}
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-[20px] overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: "#FFFEFA", border: "1.5px solid #E8DCC3", boxShadow: "0 6px 20px rgba(0,0,0,0.04)" }}
                >
                  <div className={`relative h-[140px] w-full bg-gradient-to-br ${t.gradient} overflow-hidden`}>
                    <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full" style={{ background: "rgba(255,255,255,0.3)" }} />
                    <div className="absolute -left-8 -bottom-8 w-28 h-28 rounded-full" style={{ background: "rgba(0,0,0,0.04)" }} />
                    <div className="absolute inset-0 grid place-items-center text-[56px] transition-transform duration-500 group-hover:scale-110" style={{ filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.12))" }}>
                      {t.emoji}
                    </div>
                    <span className="absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-1 rounded-full" style={{ background: "#E8F5E9", color: "#006847", border: "1px solid #C8E6C9" }}>grátis</span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#9A9A9A" }}>{t.type}</div>
                        <div className="fraunces font-extrabold text-[16px] mt-0.5 truncate">{t.name}</div>
                        <div className="text-[12px] mt-1.5 leading-[1.45]" style={{ color: "#6E6350" }}>{t.desc}</div>
                      </div>
                      <div
                        className="shrink-0 w-9 h-9 rounded-full grid place-items-center font-bold text-[15px] transition-all duration-300 group-hover:-rotate-12"
                        style={{ background: "#E8F5E9", color: "#006847", border: "1px solid #C8E6C9" }}
                      >
                        →
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[12px] font-bold" style={{ color: "#006847" }}>Acessar →</span>
                      <span className="flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: "#9A9A9A" }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: t.accent }} />verificado
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}

          {biblioTab === "musicas" && (
            <div className="grid gap-5">
              {PLAYLIST.map(tier => (
                <div key={tier.tier}>
                  <div className="text-[11px] font-bold tracking-widest" style={{ color: "#E86A33" }}>{tier.tier}</div>
                  <div className="mt-2 divide-y rounded-[16px] overflow-hidden" style={{ border: "1px solid #E8DCC3" }}>
                    {tier.songs.map(s => (
                      <a
                        key={s[0]}
                        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(s[0] + " " + s[1])}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex justify-between items-center p-3.5 text-[13px] bg-[#FFFEFA] cursor-pointer transition-colors hover:bg-[#FDF6E3]"
                      >
                        <span className="font-bold">🎵 {s[0]}</span>
                        <span className="text-[11px]" style={{ color: "#6E6350" }}>{s[1]}</span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {biblioTab === "frases" && (
            <div className="grid gap-3">
              {PHRASES.map((p, i) => (
                <div key={i} className="rounded-[16px] p-4" style={{ background: "#FDF6E3", border: "1px solid #E8DCC3" }}>
                  <div className="italic text-[14px] font-medium">"{p.es}"</div>
                  <div className="text-[11px] mt-1.5 font-bold" style={{ color: "#6E6350" }}>{p.ctx}</div>
                </div>
              ))}
            </div>
          )}

          {biblioTab === "vocab" && (
            <div className="grid gap-2">
              {VOCAB.map((v, i) => (
                <div key={i} className="flex justify-between items-center rounded-[14px] p-3.5" style={{ background: "#FDF6E3", border: "1px solid #E8DCC3" }}>
                  <span className="italic text-[13px]">{v[0]}</span>
                  <span className="text-[13px] font-bold" style={{ color: "#006847" }}>{v[1]}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SIDEBAR DIREITA */}
        <div className="flex flex-col gap-5">
          <div className="rounded-[18px] p-5" style={{ background: "#FFFEFA", border: "1px solid #E8DCC3" }}>
            <div className="fraunces font-extrabold text-[16px] mb-4">Sua Jornada</div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2.5 text-[13px] font-medium">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#2ECC71", boxShadow: "0 0 0 4px #E8F5E9" }} />
                  Tarefas feitas
                </span>
                <span className="text-[13px] font-bold" style={{ color: "#6E6350" }}>{checkedCount}/{total}</span>
              </div>
              <div className="h-px" style={{ background: "#F1EAD9" }} />
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2.5 text-[13px] font-medium">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#E86A33", boxShadow: "0 0 0 4px #FFE8D0" }} />
                  Dias completos
                </span>
                <span className="text-[13px] font-bold" style={{ color: "#6E6350" }}>{daysDoneCount}/28</span>
              </div>
              <div className="h-px" style={{ background: "#F1EAD9" }} />
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2.5 text-[13px] font-medium">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#CE1126", boxShadow: "0 0 0 4px #FFD6D6" }} />
                  Ofensiva
                </span>
                <span className="text-[13px] font-bold" style={{ color: "#6E6350" }}>{currentStreak} {currentStreak === 1 ? "dia" : "dias"}</span>
              </div>
            </div>
          </div>

          <div className="rounded-[18px] p-4 flex items-center gap-3" style={{ background: "#FDF6E3", border: "1px dashed #E8DCC3" }}>
            <div className="w-9 h-9 rounded-full grid place-items-center text-[16px]" style={{ background: "#FFFEFA", border: "1px solid #E8DCC3" }}>🏆</div>
            <div className="leading-tight">
              <div className="text-[12px] font-bold">Nível Iniciante</div>
              <div className="text-[11px]" style={{ color: "#8A7F68" }}>Continue explorando</div>
            </div>
          </div>

          <div className="rounded-[18px] p-5" style={{ background: "#006847", color: "#fff" }}>
            <div className="text-[11px] font-bold tracking-widest uppercase" style={{ opacity: 0.8 }}>México te espera</div>
            <div className="fraunces font-bold text-[16px] mt-2 leading-tight">Pronto para usar seu arsenal?</div>
            <div className="text-[12px] mt-2 leading-[1.5]" style={{ opacity: 0.85 }}>
              Escolha um recurso e dê seu primeiro clique rumbo a México.
            </div>
            <div className="mt-3 h-1 w-full rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.2)" }}>
              <div className="h-full rounded-full" style={{ width: `${Math.round(100 * checkedCount / total)}%`, background: "#E86A33" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
