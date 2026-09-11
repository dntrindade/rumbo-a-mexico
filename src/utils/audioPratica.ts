// ═══════════════════════════════════════════════════════════════════════════
// Utilitários de áudio nativo, gravação de voz e score de pronúncia.
// Extraído de TabBiblioteca.tsx para ser reaproveitado também nas tarefas
// diárias (Estrutura Falada, Conversa Real, Vocabulário) sem duplicar código.
// Zero custo, zero backend — usa apenas APIs nativas do navegador.
// ═══════════════════════════════════════════════════════════════════════════

/** Toca um texto em voz alta, em espanhol mexicano, direto no navegador. */
export function speakSpanish(text: string) {
  try {
    window.speechSynthesis.cancel(); // corta qualquer fala anterior antes de começar uma nova
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-MX";
    utterance.rate = 0.92;
    window.speechSynthesis.speak(utterance);
  } catch {
    // navegador sem suporte a speechSynthesis — falha silenciosa, não quebra a página
  }
}

/** Distância de Levenshtein entre duas strings (número de edições pra transformar uma na outra). */
function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

/** Normaliza texto pra comparação tolerante (minúsculas, sem acento, sem pontuação). */
function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?¡!.,]/g, "")
    .trim();
}

/** Compara o texto esperado com o texto falado e devolve um score de 0 a 10. */
export function scoreFromTexts(expected: string, spoken: string): number {
  const a = normalize(expected);
  const b = normalize(spoken);
  if (!b) return 0;
  const dist = levenshtein(a, b);
  const maxLen = Math.max(a.length, b.length) || 1;
  const similarity = 1 - dist / maxLen;
  return Math.max(0, Math.min(10, Math.round(similarity * 10)));
}

/** Cores (fundo/texto/borda) de acordo com a faixa do score, pro medidor visual. */
export function scoreColor(score: number): { bg: string; fg: string; border: string } {
  if (score <= 3) return { bg: "#FDE8E8", fg: "#CE1126", border: "#F5C2C2" };
  if (score <= 6) return { bg: "#FFF1E0", fg: "#E86A33", border: "#F5D9B8" };
  if (score <= 8) return { bg: "#FFF9DB", fg: "#B8960C", border: "#F0E4A8" };
  return { bg: "#E8F5E9", fg: "#006847", border: "#C8E6C9" };
}

export interface RecordResult {
  text: string;
  score: number;
}

/**
 * Inicia a captura de voz do usuário (Web Speech Recognition), transcreve e
 * calcula o score contra o texto esperado. Chama os callbacks fornecidos.
 * Não grava nem armazena áudio em nenhum lugar — tudo em memória, some ao
 * sair da página ou ao chamar de novo (o resultado anterior é substituído).
 */
export function recordAndScore(
  expectedText: string,
  callbacks: {
    onStart?: () => void;
    onResult: (result: RecordResult) => void;
    onError?: (message: string) => void;
    onEnd?: () => void;
  }
) {
  const RecognitionAPI: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!RecognitionAPI) {
    callbacks.onError?.("Seu navegador não suporta gravação de voz. Tente no Chrome.");
    return;
  }

  callbacks.onStart?.();

  const recognition = new RecognitionAPI();
  recognition.lang = "es-MX";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event: any) => {
    const spokenText = event.results?.[0]?.[0]?.transcript || "";
    const score = scoreFromTexts(expectedText, spokenText);
    callbacks.onResult({ text: spokenText, score });
  };

  recognition.onerror = () => {
    callbacks.onError?.("Não foi possível captar o áudio. Tente novamente.");
  };

  recognition.onend = () => {
    callbacks.onEnd?.();
  };

  recognition.start();
}
