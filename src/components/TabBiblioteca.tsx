import React, { useState } from "react";
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

const MUSIC_FILTERS = [
  { id: "todos", label: "Todos", dot: "⚪" },
  { id: "Fácil — dicção clara e lenta", label: "Fácil", dot: "🟢" },
  { id: "Médio", label: "Médio", dot: "🟡" },
  { id: "Louvor animado — ainda claro", label: "Louvor animado", dot: "🔵" },
  { id: "Avançado — mais rápido", label: "Avançado", dot: "🔴" },
];

const PHRASE_CATS = ["Todos", "Abertura", "Carreira", "Travar", "Ganhar tempo", "Técnica", "Acordo"];

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

  // estado local (só desta sessão, não persiste) para as sub-abas novas
  const [musicFilter, setMusicFilter] = useState("todos");
  const [phraseCat, setPhraseCat] = useState("Todos");
  const [vocabQuery, setVocabQuery] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [savedPhrases, setSavedPhrases] = useState<number[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  };

  const copyText = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    } catch {
      showToast("Não foi possível copiar automaticamente");
    }
  };

  const filteredSongsByTier = musicFilter === "todos" ? PLAYLIST : PLAYLIST.filter(t => t.tier === musicFilter);
  const filteredPhrases = phraseCat === "Todos" ? PHRASES : PHRASES.filter(p => p.cat === phraseCat);
  const filteredVocab = VOCAB.filter(v =>
    v.es.toLowerCase().includes(vocabQuery.toLowerCase()) ||
    v.pt.toLowerCase().includes(vocabQuery.toLowerCase()) ||
    v.cat.toLowerCase().includes(vocabQuery.toLowerCase())
  );

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

          {/* ================= FERRAMENTAS — NÃO ALTERADO ================= */}
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
          {/* ================= FIM FERRAMENTAS ================= */}

          {/* ================= MÚSICAS — redesenhado ================= */}
          {biblioTab === "musicas" && (
            <div>
              {/* banner hero */}
              <div className="relative overflow-hidden rounded-[22px] mb-5" style={{ background: "linear-gradient(135deg, #E86A33, #FF8A5B, #FFB07A)" }}>
                <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full opacity-20" style={{ background: "#fff", filter: "blur(40px)" }} />
                <div className="relative p-6 md:p-7">
                  <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-wide text-white px-3.5 py-1.5 rounded-full mb-3" style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)" }}>
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />TRILHA SONORA
                  </span>
                  <div className="fraunces font-[900] text-white text-[24px] md:text-[30px] leading-[0.95]">
                    Trilha Sonora <span className="italic font-bold">• suas músicas favoritas</span>
                  </div>
                  <p className="mt-2.5 text-[13px] md:text-[14px] text-white/90 max-w-[440px]">
                    {PLAYLIST.reduce((a, t) => a + t.songs.length, 0)} músicas curadas por dificuldade — do claro e lento ao rápido mexicano. Clique pra ouvir no YouTube.
                  </p>
                </div>
              </div>

              {/* filtro por dificuldade */}
              <div className="flex gap-2 overflow-x-auto pb-3 mb-5">
                {MUSIC_FILTERS.map(f => (
                  <button
                    key={f.id}
                    onClick={() => setMusicFilter(f.id)}
                    className={`shrink-0 flex items-center gap-2 rounded-full border px-4 py-2 text-[12.5px] font-bold transition-all ${musicFilter === f.id ? "text-white" : ""}`}
                    style={{ background: musicFilter === f.id ? "#1A1A1A" : "#FFFEFA", borderColor: musicFilter === f.id ? "#1A1A1A" : "#E8DCC3", color: musicFilter === f.id ? "#fff" : "#2A2A2A" }}
                  >
                    <span>{f.dot}</span>{f.label}
                  </button>
                ))}
              </div>

              {/* grid de músicas */}
              <div className="grid sm:grid-cols-2 gap-4">
                {filteredSongsByTier.flatMap(tier => tier.songs.map(s => (
                  <a
                    key={s.title}
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(s.title + " " + s.artist)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-[20px] overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
                    style={{ background: "#FFFEFA", border: "1.5px solid #E8DCC3", boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}
                  >
                    <div className={`relative h-[130px] w-full bg-gradient-to-br ${s.gradient} overflow-hidden`}>
                      <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "18px 18px" }} />
                      <div className="absolute inset-0 grid place-items-center text-[44px] transition-transform duration-500 group-hover:scale-110" style={{ filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.2))" }}>
                        {s.emoji}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-14" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45), transparent)" }} />
                      <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-end justify-between">
                        <div>
                          <div className="text-white font-extrabold fraunces text-[15px] leading-tight" style={{ textShadow: "0 2px 6px rgba(0,0,0,0.3)" }}>{s.title}</div>
                          <div className="text-white/85 text-[11px] font-medium">{s.artist}</div>
                        </div>
                        <div className="w-8 h-8 rounded-full grid place-items-center shrink-0" style={{ background: "rgba(255,255,255,0.9)" }}>▶</div>
                      </div>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between">
                      <span className="text-[12px] font-bold" style={{ color: "#006847" }}>Ouvir no YouTube →</span>
                      <span className="text-[10.5px] font-semibold" style={{ color: "#9A9A9A" }}>{tierLabelFor(s.title)}</span>
                    </div>
                  </a>
                )))}
              </div>
            </div>
          )}
          {/* ================= FIM MÚSICAS ================= */}

          {/* ================= FRASES — redesenhado ================= */}
          {biblioTab === "frases" && (
            <>
              <div className="flex gap-2 overflow-x-auto pb-3 mb-5">
                {PHRASE_CATS.map(c => (
                  <button
                    key={c}
                    onClick={() => setPhraseCat(c)}
                    className={`shrink-0 px-4 py-2 rounded-full text-[12.5px] font-bold border transition-all ${phraseCat === c ? "text-white" : ""}`}
                    style={{ background: phraseCat === c ? "#1A1A1A" : "#FFFEFA", borderColor: phraseCat === c ? "#1A1A1A" : "#E8DCC3", color: phraseCat === c ? "#fff" : "#5A5A5A" }}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {filteredPhrases.map((p, i) => {
                  const globalIndex = PHRASES.indexOf(p);
                  const isSaved = savedPhrases.includes(globalIndex);
                  const key = `phrase-${globalIndex}`;
                  return (
                    <div
                      key={globalIndex}
                      className="rounded-[18px] p-4 md:p-5"
                      style={{ background: "#FFFEFA", border: "1.5px solid #E8DCC3", borderLeft: "4px solid #006847" }}
                    >
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full text-white text-[10px] font-bold tracking-wide uppercase" style={{ background: "#1A1A1A" }}>{p.cat}</span>
                          <span className="w-7 h-7 rounded-full grid place-items-center text-[13px]" style={{ background: "#FFF4E8" }}>{p.icon}</span>
                        </div>
                        <span className="text-[11px] font-semibold" style={{ color: "#B8AFA0" }}>#{String(i + 1).padStart(2, "0")}</span>
                      </div>

                      <div className="italic fraunces font-bold text-[16px] md:text-[17px] leading-[1.35]">"{p.es}"</div>
                      <div className="mt-2 text-[12.5px] flex gap-2" style={{ color: "#6E6350" }}>
                        <span>↳</span><span>{p.pt}</span>
                      </div>
                      <div className="mt-1.5 text-[11px] font-bold" style={{ color: "#8A7F68" }}>{p.ctx}</div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <a
                          href={`https://translate.google.com/?sl=es&tl=pt&text=${encodeURIComponent(p.es)}&op=translate`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="h-9 px-4 rounded-full text-[12.5px] font-bold flex items-center gap-1.5 transition"
                          style={{ background: "#E8F5E9", color: "#006847", border: "1px solid #C8E6C9" }}
                        >
                          🔊 Ouvir pronúncia
                        </a>
                        <button
                          onClick={() => copyText(p.es, key)}
                          className="h-9 px-4 rounded-full text-[12.5px] font-bold flex items-center gap-1.5 transition"
                          style={{ background: copiedKey === key ? "#1A1A1A" : "#FFF4E8", color: copiedKey === key ? "#fff" : "#5A4A2A", border: "1px solid #E8DCC3" }}
                        >
                          {copiedKey === key ? "✅ Copiado!" : "📋 Copiar"}
                        </button>
                        <button
                          onClick={() => setSavedPhrases(prev => prev.includes(globalIndex) ? prev.filter(x => x !== globalIndex) : [...prev, globalIndex])}
                          className="h-9 px-4 rounded-full text-[12.5px] font-bold flex items-center gap-1.5 transition"
                          style={{ background: isSaved ? "#E86A33" : "#FFFEFA", color: isSaved ? "#fff" : "#5A5A5A", border: "1px solid #E8DCC3" }}
                        >
                          {isSaved ? "⭐ Salva" : "⭐ Salvar"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {/* ================= FIM FRASES ================= */}

          {/* ================= VOCAB — redesenhado ================= */}
          {biblioTab === "vocab" && (
            <div>
              <div className="relative mb-5">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[15px]" style={{ color: "#B8AFA0" }}>🔍</span>
                <input
                  value={vocabQuery}
                  onChange={e => setVocabQuery(e.target.value)}
                  placeholder="Buscar termo... ex: deploy, pruebas, código"
                  className="w-full h-12 pl-11 pr-4 rounded-full text-[13.5px] font-medium focus:outline-none transition"
                  style={{ background: "#FDF6E3", border: "1.5px solid #E8DCC3" }}
                />
                {vocabQuery && (
                  <button onClick={() => setVocabQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full grid place-items-center text-[11px]" style={{ background: "#1A1A1A", color: "#fff" }}>✕</button>
                )}
              </div>

              <div className="grid gap-3">
                {filteredVocab.map((v, i) => {
                  const key = `vocab-${i}`;
                  return (
                    <div key={i} className="rounded-[18px] overflow-hidden md:flex" style={{ background: "#FFFEFA", border: "1.5px solid #E8DCC3" }}>
                      <div className="md:w-[42%] p-4 md:p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase" style={{ background: "#FFF4E8", border: "1px solid #E8DCC3", color: v.color }}>{v.cat}</span>
                        </div>
                        <div className="italic fraunces font-extrabold text-[15px] md:text-[16px] leading-tight">{v.es}</div>
                        <div className="mt-1.5 text-[11px] font-mono" style={{ color: "#B8AFA0" }}>{v.fon}</div>
                      </div>
                      <div className="hidden md:flex w-[52px] shrink-0 items-center justify-center">
                        <div className="w-9 h-9 rounded-full grid place-items-center text-[13px]" style={{ background: "#E8F5E9", border: "1px solid #C8E6C9" }}>↔️</div>
                      </div>
                      <div className="flex-1 p-4 md:p-5" style={{ background: "#FDF6E3" }}>
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <div className="font-extrabold text-[14px]" style={{ color: "#006847" }}>{v.pt}</div>
                            <div className="mt-2 text-[12px] italic leading-snug rounded-[10px] px-3 py-2" style={{ background: "#FFFEFA", border: "1px solid #E8DCC3", color: "#6E6350" }}>
                              "{v.exemplo}"
                            </div>
                          </div>
                          <button
                            onClick={() => copyText(v.es, key)}
                            className="shrink-0 w-9 h-9 rounded-full grid place-items-center text-[13px] transition"
                            style={{ background: copiedKey === key ? "#1A1A1A" : "#FFFEFA", color: copiedKey === key ? "#fff" : "#5A5A5A", border: "1px solid #E8DCC3" }}
                          >
                            {copiedKey === key ? "✓" : "📋"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {filteredVocab.length === 0 && (
                  <div className="text-center py-8 text-[13px]" style={{ color: "#8A7F68" }}>Nenhum termo encontrado pra "{vocabQuery}"</div>
                )}
              </div>
            </div>
          )}
          {/* ================= FIM VOCAB ================= */}
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

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <div className="px-5 py-3 rounded-full text-white text-[13px] font-semibold shadow-lg" style={{ background: "#1A1A1A" }}>{toast}</div>
        </div>
      )}
    </div>
  );
}

function tierLabelFor(title: string): string {
  for (const tier of PLAYLIST) {
    if (tier.songs.some(s => s.title === title)) {
      if (tier.tier.startsWith("Fácil")) return "🟢 Fácil";
      if (tier.tier.startsWith("Médio")) return "🟡 Médio";
      if (tier.tier.startsWith("Louvor")) return "🔵 Animado";
      if (tier.tier.startsWith("Avançado")) return "🔴 Avançado";
    }
  }
  return "";
}
