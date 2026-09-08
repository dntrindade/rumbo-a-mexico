// --- DESIGN TOKENS (cores e valores extraídos do original, centralizados) ---
// Alterar aqui reflete em todo o app.

export const COLORS = {
  areia: "#FDF6E3",       // fundo geral
  branco: "#FFFEFA",      // cards
  linha: "#E8DCC3",       // bordas
  texto: "#1A1A1A",       // texto principal
  textoMuted: "#6E6350",  // texto secundário

  verdeMexico: "#006847", // cor primária / progresso
  vermelho: "#CE1126",    // streak / acento
  terracota: "#E86A33",   // progresso total / acento secundário

  verdeClaroBg: "#E8F5E9",
  verdeClaroBorda: "#A5D6A7",
  terracotaClaraBg: "#FFF1E6",
  terracotaClaraBorda: "#FFD6BA",
  vermelhoClaraBg: "#FFEBEE",
  vermelhoClaraBorda: "#FFCDD2",

  escuro: "#1A1A1A", // footer / cards escuros / botão ativo
} as const;

export const HEATMAP_SCALE = [
  { min: 0, bg: "#FFFEFA" },
  { min: 1, bg: "#C6E8D0" },
  { min: 2, bg: "#8FCC9E" },
  { min: 3, bg: "#5AB070" },
  { min: 4, bg: "#2E8A4A" },
  { min: 5, bg: "#006847" },
];

export function heatmapColor(count: number) {
  if (count >= 5) return "#006847";
  if (count === 4) return "#2E8A4A";
  if (count === 3) return "#5AB070";
  if (count === 2) return "#8FCC9E";
  if (count === 1) return "#C6E8D0";
  return "#FFFEFA";
}

export const GLOBAL_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700;9..144,800&family=Karla:wght@400;500;700&display=swap');
  *{font-family:'Karla',system-ui,sans-serif}
  h1,h2,h3,.fraunces{font-family:'Fraunces',serif}
  .ring-bg{fill:none;stroke:#E8DCC3;stroke-width:8}
  .ring-fg{fill:none;stroke-width:8;stroke-linecap:round;transform:rotate(-90deg);transform-origin:50% 50%;transition:stroke-dashoffset .6s ease}
  @keyframes pulseGlowTrail {
    0%, 100% { box-shadow: 0 0 0 0 rgba(232,106,51,0.35), 0 8px 24px rgba(232,106,51,0.3); }
    50% { box-shadow: 0 0 0 10px rgba(232,106,51,0.12), 0 10px 28px rgba(232,106,51,0.4); }
  }
`;
