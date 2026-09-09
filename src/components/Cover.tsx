import React from "react";
import logoIcon from "../assets/logo_final_mexico_flag.png";

interface CoverProps {
  onStart: () => void;
}

export function Cover({ onStart }: CoverProps) {
  return (
    <div className="min-h-screen w-full relative overflow-x-hidden" style={{ background: "#FDF6E3", color: "#1A1A1A" }}>
      {/* fundo: pontinhos + círculos concêntricos tracejados, tela inteira */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 30%, rgba(232,220,195,0.8) 1.4px, transparent 1.6px), radial-gradient(circle at 80% 70%, rgba(232,220,195,0.6) 1.4px, transparent 1.6px)",
          backgroundSize: "48px 48px, 64px 64px",
        }}
      />
      <div className="fixed pointer-events-none z-0 opacity-[0.38]" style={{ inset: "-10%" }}>
        <svg viewBox="0 0 1200 800" className="w-full h-full">
          <circle cx="600" cy="400" r="160" fill="none" stroke="#E8DCC3" strokeWidth="1.3" strokeDasharray="7 9" opacity="0.6" />
          <circle cx="600" cy="400" r="300" fill="none" stroke="#E8DCC3" strokeWidth="1.2" strokeDasharray="7 11" opacity="0.45" />
          <circle cx="600" cy="400" r="460" fill="none" stroke="#E8DCC3" strokeWidth="1" strokeDasharray="6 14" opacity="0.3" />
        </svg>
      </div>

      {/* TOPBAR */}
      <div className="sticky top-0 z-20 backdrop-blur-xl border-b" style={{ background: "rgba(255,254,250,0.85)", borderColor: "#E8DCC3" }}>
        <div className="max-w-[1240px] mx-auto px-4 md:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoIcon} alt="Logo" className="w-9 h-9 rounded-xl object-contain bg-white shadow-sm border" style={{ borderColor: "#E8DCC3" }} />
            <div className="fraunces font-extrabold text-[16px]">
              RUMBO A MÉXICO <span style={{ color: "#E86A33" }}>• 28 DIAS</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:block text-[10px] font-bold tracking-wide uppercase px-3 py-1.5 rounded-full" style={{ border: "1.5px solid #E8DCC3", background: "#FFFEFA", color: "#8A7F68" }}>
              Trilha Deserta • Espanhol Mexicano
            </div>
            <div className="text-[10px] font-bold tracking-wide uppercase px-3 py-1.5 rounded-full" style={{ border: "1.5px solid #E8DCC3", background: "#FFFEFA", color: "#8A7F68" }}>
              100% Conversação
            </div>
          </div>
        </div>
      </div>

      {/* HERO */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-4 md:px-6 pt-7 grid lg:grid-cols-[1.15fr_0.95fr] gap-8 lg:gap-0 pb-28 lg:pb-16">
        {/* ESQUERDA */}
        <div className="flex flex-col justify-center lg:pr-9">
          <div className="inline-flex items-center gap-2 text-white text-[11px] font-extrabold tracking-wide uppercase px-4 py-2.5 rounded-full mb-4 w-fit" style={{ background: "#1A1A1A" }}>
            <span className="w-[7px] h-[7px] rounded-full" style={{ background: "#E86A33", boxShadow: "0 0 0 4px rgba(232,106,51,0.2)" }} />
            Não é Duolingo • Não é gramática • Não personaliza trajetória
          </div>

          <h1 className="fraunces font-[900] leading-[0.95] tracking-tight mb-4" style={{ fontSize: "clamp(32px, 5vw, 52px)" }}>
            Você tem{" "}
            <span className="relative" style={{ color: "#E86A33" }}>
              30 dias
              <span className="absolute left-0 bottom-1 w-full h-2 -z-10 rounded" style={{ background: "rgba(232,106,51,0.18)" }} />
            </span>{" "}
            até o México. O espanhol não pode te travar.
          </h1>

          <p className="text-[16px] md:text-[18px] leading-[1.55] mb-5 max-w-[560px]" style={{ color: "#3A3A3A" }}>
            Se sua <b style={{ color: "#006847" }}>viagem, entrevista, reunião ou conferência</b> é nos próximos 30 dias, você não precisa de conjugação.
            Você precisa <b style={{ color: "#006847" }}>entender e ser entendido sem travar</b> numa roda de conversa real.
          </p>

          {/* URGÊNCIA */}
          <div className="rounded-[20px] p-5 mb-5 relative overflow-hidden" style={{ background: "#006847", color: "#E8F5E9", border: "1.5px solid #005538" }}>
            <div className="text-[12px] font-extrabold tracking-wide uppercase mb-3 flex items-center gap-2 opacity-95">
              📍 Feito para quem tem data marcada
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                ["✈️", "Viagem agendada pro México nos próximos 30 dias"],
                ["💼", "Entrevista de emprego em espanhol em 4 semanas"],
                ["💻", "Reunião / vídeo com clientes que falam espanhol"],
                ["🎤", "Conferência ou treinamento no México, Espanha ou América do Sul"],
              ].map(([icon, text]) => (
                <div key={text} className="rounded-xl p-3 flex gap-2.5 text-[13.5px] leading-[1.35]" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                  <span>{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* PILARES */}
          <div className="grid sm:grid-cols-3 gap-3 mb-6">
            {[
              { icon: "👂", bg: "#FFF4E8", border: "#FFD8B8", title: "Afina o Ouvido", desc: "Reportagens, músicas e entrevistas 100% em espanhol mexicano. Adapta, familiariza e afina seu ouvido." },
              { icon: "🗣️", bg: "#E8F5E9", border: "#B8DCC0", title: "Treina a Boca", desc: "Fala guiada com áudio nativo + diagnóstico de pronúncia. Sem julgamento, só prática de diálogo." },
              { icon: "🔥", bg: "#FFE8D9", border: "#FFD0B0", title: "28 Dias Direto", desc: "60min/dia, sem interrupção, sem pular. Desafio real. Se parar, recomeça. Como uma viagem marcada." },
            ].map(p => (
              <div key={p.title} className="rounded-[18px] p-4" style={{ background: "#FFFEFA", border: "1.5px solid #E8DCC3", boxShadow: "0 8px 24px rgba(0,0,0,0.05)" }}>
                <div className="w-9 h-9 rounded-[10px] grid place-items-center text-[18px] mb-2" style={{ background: p.bg, border: `1px solid ${p.border}` }}>{p.icon}</div>
                <h4 className="text-[13.5px] font-extrabold mb-1">{p.title}</h4>
                <p className="text-[12.5px] leading-[1.4]" style={{ color: "#6B6B6B" }}>{p.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA desktop */}
          <div className="hidden lg:flex flex-wrap gap-3 items-center">
            <button
              onClick={onStart}
              className="inline-flex items-center gap-2.5 text-white font-extrabold text-[16px] px-8 py-4 rounded-[14px] transition-all hover:-translate-y-0.5"
              style={{ background: "#E86A33", boxShadow: "0 10px 24px rgba(232,106,51,0.35)" }}
            >
              Começar o Desafio de 28 Dias →
            </button>
            <button onClick={onStart} className="text-[13px] underline underline-offset-4" style={{ color: "#6B6B6B", textDecorationStyle: "dashed" }}>
              ver como funciona a trilha
            </button>
          </div>

          <div className="mt-4 text-[12.5px] leading-[1.5] rounded-xl p-3.5" style={{ color: "#8A7D5A", background: "#FFFBF0", border: "1px dashed #E8D8B0" }}>
            <b style={{ color: "#006847" }}>Gramática não te salva numa roda no México. Conversação sim.</b>{" "}
            Não importa leitura, escrita ou regras. Aqui é só diálogo real para você participar de forma natural, sem travar, e chamar atenção de forma positiva pelo diálogo.
          </div>
        </div>

        {/* DIREITA */}
        <div className="rounded-[28px] overflow-hidden flex flex-col" style={{ background: "linear-gradient(180deg, #FFFEFA 0%, #FFFBF0 100%)", border: "1.5px solid #E8DCC3", boxShadow: "0 16px 48px rgba(0,0,0,0.08)", minHeight: 560 }}>
          <div className="p-5 border-b" style={{ borderColor: "#F5ECD0" }}>
            <div className="text-[11px] font-extrabold tracking-wide uppercase mb-1.5" style={{ color: "#8A7D5A" }}>Como funciona o treino</div>
            <div className="fraunces font-extrabold text-[20px]">Só ouvido e boca. Nada de gramática.</div>
            <div className="text-[13px] mt-1 leading-[1.4]" style={{ color: "#6B6B6B" }}>
              Reportagens, músicas e entrevistas 100% em espanhol para você ouvir e falar como no dia a dia mexicano.
            </div>
          </div>

          <div className="p-4 md:p-5 flex-1 flex flex-col justify-center" style={{ background: "linear-gradient(180deg, #FFFEFA 0%, #FDF6E3 100%)" }}>
            <div className="rounded-[20px] p-4 md:p-5" style={{ background: "#FFFEFA", border: "1.5px solid #E8DCC3", boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}>
              <div className="text-[11px] font-extrabold tracking-wide uppercase" style={{ color: "#8A7D5A" }}>O ciclo diário • 60 min</div>

              <div className="flex items-center justify-center gap-4 my-4">
                <div className="w-[70px] h-[70px] rounded-[20px] grid place-items-center text-[32px]" style={{ background: "#FFF4E8", border: "1.5px solid #FFD0B0", boxShadow: "0 6px 18px rgba(0,0,0,0.06)" }}>👂</div>
                <div className="flex gap-1.5 items-center">
                  {[20, 32, 44, 32, 20].map((h, i) => (
                    <span
                      key={i}
                      className="w-[5px] rounded"
                      style={{
                        height: h,
                        background: "linear-gradient(180deg, #E86A33, #006847)",
                        animation: `soundWave 1.1s ${i * 0.1}s infinite ease-in-out`,
                      }}
                    />
                  ))}
                </div>
                <div className="w-[70px] h-[70px] rounded-[20px] grid place-items-center text-[32px]" style={{ background: "#E8F5E9", border: "1.5px solid #B8DCC0", boxShadow: "0 6px 18px rgba(0,0,0,0.06)" }}>🗣️</div>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  ["📰 Reportagens reais", "#FFE8D9", "#B03A0A", "#FFC9A8"],
                  ["🎵 Músicas mexicanas", "#E8F5E9", "#006847", "#B8DCC0"],
                  ["🎤 Entrevistas de rua", "#E8F5E9", "#006847", "#B8DCC0"],
                  ["⏱️ 60min/dia", "#FDF6E3", "#8A7D5A", "#E8DCC3"],
                  ["📅 28 dias direto", "#FDF6E3", "#8A7D5A", "#E8DCC3"],
                  ["🚫 Zero gramática", "#FFE8D9", "#B03A0A", "#FFC9A8"],
                ].map(([label, bg, color, border]) => (
                  <span key={label} className="text-[11px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full" style={{ background: bg, color, border: `1.5px solid ${border}` }}>
                    {label}
                  </span>
                ))}
              </div>

              <div className="mt-3.5 rounded-[14px] p-3.5 flex gap-3" style={{ background: "#006847", color: "#E8F5E9" }}>
                <div className="w-9 h-9 rounded-[10px] grid place-items-center shrink-0" style={{ background: "rgba(255,255,255,0.12)" }}>🎯</div>
                <div>
                  <div className="font-extrabold text-[13px] mb-0.5">Objetivo final</div>
                  <div className="text-[12.5px] leading-[1.4] opacity-90">Entrar numa roda de conversa no México sem travar e chamar atenção positivamente pelo diálogo natural.</div>
                </div>
              </div>
            </div>

            <div className="mt-3.5 grid grid-cols-2 gap-2.5">
              <div className="rounded-[14px] p-3 flex gap-2.5 items-center" style={{ background: "#FFFEFA", border: "1.5px solid #E8DCC3" }}>
                <div className="w-8 h-8 rounded-lg grid place-items-center" style={{ background: "#FFF4E8" }}>🔊</div>
                <div>
                  <div className="font-bold text-[12px]">Escuta Ativa</div>
                  <div className="text-[11px]" style={{ color: "#6B6B6B" }}>5 min • diálogo real</div>
                </div>
              </div>
              <div className="rounded-[14px] p-3 flex gap-2.5 items-center" style={{ background: "#FFFEFA", border: "1.5px solid #E8DCC3" }}>
                <div className="w-8 h-8 rounded-lg grid place-items-center" style={{ background: "#E8F5E9" }}>🎙️</div>
                <div>
                  <div className="font-bold text-[12px]">Fala Guiada</div>
                  <div className="text-[11px]" style={{ color: "#6B6B6B" }}>5 min • com correção</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center text-[11px] pb-8" style={{ color: "#8A7D5A" }}>
        Rumbo a México — Desafio 28 Dias • Imersão de Conversação • Não é Duolingo • Biblioteca com 12 recursos gratuitos
      </div>

      {/* CTA STICKY MOBILE */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 backdrop-blur-xl border-t" style={{ background: "rgba(255,254,250,0.92)", borderColor: "#E8DCC3", padding: "12px 16px calc(12px + env(safe-area-inset-bottom))" }}>
        <button
          onClick={onStart}
          className="w-full inline-flex items-center justify-center gap-2 text-white font-extrabold text-[16px] py-4 rounded-[14px]"
          style={{ background: "#E86A33", boxShadow: "0 10px 24px rgba(232,106,51,0.35)" }}
        >
          Começar o Desafio de 28 Dias →
        </button>
      </div>
    </div>
  );
}
