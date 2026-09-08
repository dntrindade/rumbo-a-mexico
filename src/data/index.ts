// --- DADOS DA LÓGICA ORIGINAL (preservados 100% do App_FULL_ORIGINAL.tsx) ---

export const PILLARS = [
  { code: "O", title: "Ouvir", time: "15 min", full: "Ouvir", desc: "Input em vídeo, sem cobrança de entender tudo." },
  { code: "E", title: "Estrutura falada", time: "20-25 min", full: "Estrutura", desc: "Language Transfer — fala junto em voz alta." },
  { code: "M", title: "Música", time: "15 min", full: "Música", desc: "Canta, toca e treina o ouvido com ritmo." },
  { code: "C", title: "Conversa real", time: "10-20 min", full: "Conversa", desc: "Voz real com parceiro mexicano, sem custo." },
  { code: "V", title: "Vocabulário", time: "10 min", full: "Vocabulário", desc: "Termos técnicos e frases de reunião." },
];

export const WEEKS = [
  {
    tag: "Semana 1",
    title: "Ouvido e base",
    focus:
      "Nada de gramática pesada ainda. O objetivo é acostumar o ouvido com o espanhol mexicano e destravar a fala com repetição guiada.",
    tasks: [
      "Assista a vídeos <b>Dreaming Spanish — nível Superbeginner</b> no YouTube. Só escute, sem se cobrar entender tudo.",
      "<b>Language Transfer</b> (app/podcast grátis), curso de Espanhol — lições 1 a 5 essa semana. Fale em voz alta junto com o áudio, sempre.",
      "<b>LyricsTraining</b> (grátis), modo Fácil — Marcos Witt (\"Renuévame\") ou Jesús Adrián Romero (\"Tu Fidelidad\"). Depois cante a música inteira uma vez.",
      "Ainda sem parceiro: grave um áudio de 1 min se apresentando em espanhol e ouça de volta.",
      "Monte no Anki/Quizlet (grátis) um baralho <b>\"Apresentação pessoal\"</b> com 15 frases básicas.",
    ],
  },
  {
    tag: "Semana 2",
    title: "Primeiras conversas",
    focus: "Hora de sair da teoria e falar com gente de verdade. Vai errar muito — isso é esperado.",
    tasks: [
      "<b>Dreaming Spanish — nível Beginner</b> + 1 vídeo do canal <b>Easy Spanish</b> (entrevistas de rua) por dia.",
      "<b>Language Transfer</b>, lições 6 a 14.",
      "<b>LyricsTraining</b> nível Médio — Miel San Marcos ou Christine D'Clario. Escolha uma música da semana pra decorar as 2 primeiras estrofes.",
      "Crie conta no <b>HelloTalk</b> e/ou <b>Tandem</b> (grátis), filtre parceiros no México. Um áudio ou chamada curta por dia.",
      "Baralho <b>\"Tecnologia básica\"</b> — 15 termos (código, prueba, servidor, base de datos...).",
    ],
  },
  {
    tag: "Semana 3",
    title: "Fluência técnica",
    focus: "Agora o foco é a reunião de trabalho de verdade: vocabulário de dev e simulação de perguntas.",
    tasks: [
      "Canal <b>Superholly</b> (gírias mexicanas) + podcast <b>Español Automático</b> (histórias narradas devagar).",
      "<b>Language Transfer</b>, lições 15 a 24 — revise as anteriores em dobro de velocidade.",
      "Suba pro nível Difícil no LyricsTraining. Ouça <b>Redimi2</b> (rap cristão, fala mais rápida) só pra afinar o ouvido.",
      "2 chamadas de voz por dia no HelloTalk/Tandem. Em uma delas, treine responder <i>\"cuéntame sobre tu último proyecto\"</i>.",
      "Baralho <b>\"Entrevista técnica\"</b> — decore as frases-chave da seção Frases.",
    ],
  },
  {
    tag: "Semana 4",
    title: "Simulação real",
    focus: "Última milha: juntar tudo numa simulação completa de entrevista e reunião em espanhol.",
    tasks: [
      "Vídeos do <b>Butterfly Spanish</b> focados em <i>entrevista de trabajo</i> e <i>reunión de equipo</i>.",
      "<b>Language Transfer</b>, lições 25+ ou revisão livre das mais difíceis.",
      "Pegue o violão e cante uma música inteira em espanhol de cabeça — teste de produção livre.",
      "Peça ao parceiro do HelloTalk pra simular uma pequena entrevista técnica, ou use o <b>modo de voz do ChatGPT</b> (grátis).",
      "Revisão geral de todos os baralhos anteriores — sem cards novos essa semana.",
    ],
  },
];

export const TOOLS = [
  { name: "Language Transfer", type: "App / Podcast", desc: "Método auditivo, sem escrita — ativa a fala rápido." },
  { name: "Dreaming Spanish", type: "YouTube", desc: "Input compreensível por nível, treina o ouvido." },
  { name: "HelloTalk", type: "App", desc: "Conversa por texto e voz com nativos mexicanos." },
  { name: "Tandem", type: "App", desc: "Alternativa ao HelloTalk, mesma lógica de intercâmbio." },
  { name: "LyricsTraining", type: "Site / App", desc: "Completa a letra da música enquanto ouve." },
  { name: "Superholly", type: "YouTube", desc: "Gírias e cultura mexicana, sotaque autêntico." },
  { name: "Butterfly Spanish", type: "YouTube", desc: "Conversação clara em espanhol latino." },
  { name: "Easy Spanish", type: "YouTube", desc: "Entrevistas de rua em várias regiões." },
  { name: "Español Automático", type: "Podcast", desc: "Histórias narradas devagar, boa transição." },
  { name: "ChatGPT (voz)", type: "App / Web", desc: "Treino de conversa ilimitado, sem julgamento." },
  { name: "Anki / Quizlet", type: "App", desc: "Flashcards de vocabulário, repetição espaçada." },
  { name: "Duolingo", type: "App", desc: "10 min/dia de reforço de vocabulário (complementar)." },
];

export const PLAYLIST = [
  { tier: "Fácil — dicção clara e lenta", songs: [["Renuévame","Marcos Witt"],["Tu Fidelidad","Jesús Adrián Romero"],["Cuán Grande es Él","Danilo Montero"]] as [string,string][] },
  { tier: "Médio", songs: [["Reyes y Sacerdotes","Miel San Marcos"],["Puedo Ver","Christine D'Clario"]] as [string,string][] },
  { tier: "Louvor animado — ainda claro", songs: [["Cambia mi Corazón","Marcos Witt"],["Alfa y Omega","Barak"]] as [string,string][] },
  { tier: "Avançado — mais rápido", songs: [["Abre los Cielos","Redimi2 (feat. Miel San Marcos)"]] as [string,string][] },
];

export const PHRASES = [
  { es: "Hola, mi nombre es Daniel, soy desarrollador full-stack con experiencia en Node.js, React e IA generativa.", ctx: "Abertura de apresentação" },
  { es: "Tengo más de veinte años en operaciones y hace un año me dediqué de lleno al desarrollo de software.", ctx: "Contexto de carreira" },
  { es: "Disculpa, ¿podrías repetir la pregunta, por favor?", ctx: "Pedir repetição sem travar" },
  { es: "Dame un momento para pensarlo.", ctx: "Ganhar tempo com naturalidade" },
  { es: "Voy a compartir mi pantalla.", ctx: "Reunião técnica" },
  { es: "Estoy de acuerdo, aunque también podríamos considerar…", ctx: "Concordar com ressalva" },
  { es: "No estoy seguro en este momento, pero lo voy a investigar y les aviso.", ctx: "Não saber sem travar a conversa" },
  { es: "Quedo atento a cualquier duda, ¡muchas gracias por su tiempo!", ctx: "Fechar reunião" },
];

export const VOCAB: [string,string][] = [
  ["código heredado / legado","código legado"],
  ["pruebas automatizadas","testes automatizados"],
  ["control de versiones","controle de versão"],
  ["integración continua","integração contínua"],
  ["arquitectura","arquitetura"],
  ["depuración","depuração"],
  ["revisión de código","revisão de código"],
  ["implementar / desplegar","implantar / deploy"],
  ["requisitos","requisitos"],
  ["tablero / panel","painel / dashboard"]
];

export const STORE_KEY = 'rumbo_a_mexico_progress_v1';

export function getPillarMinutes(code: string) {
  switch(code){
    case "O": return 15;
    case "E": return 22;
    case "M": return 15;
    case "C": return 15;
    case "V": return 10;
    default: return 10;
  }
}
