// --- DADOS DA LÓGICA ORIGINAL (preservados 100% do App_FULL_ORIGINAL.tsx) ---

export const PILLARS = [
  { code: "O", title: "Ouvir", time: "15 min", full: "Ouvir", desc: "Input em vídeo, sem cobrança de entender tudo." },
  { code: "E", title: "Estrutura falada", time: "20-25 min", full: "Estrutura", desc: "Fala junto em voz alta — treino de pronúncia e ritmo." },
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
      { desc: "Assista a vídeos <b>Dreaming Spanish — nível Superbeginner</b> no YouTube. Só escute, sem se cobrar entender tudo.", url: "https://app.dreaming.com/spanish/browse?level=superbeginner" },
      { desc: "<b>Superholly</b> (YouTuber mexicana) — vídeos de 5-10 min sobre estrutura e gírias mexicanas. Fale em voz alta repetindo as frases.", url: "https://www.youtube.com/@superholly" },
      { desc: "<b>LyricsTraining</b> (grátis), modo Fácil — Marcos Witt (\"Renuévame\") ou Jesús Adrián Romero (\"Tu Fidelidad\"). Depois cante a música inteira uma vez.", url: "https://www.youtube.com/results?search_query=Renu%C3%A9vame+Marcos+Witt+letra" },
      { desc: "Ainda sem parceiro: grave um áudio de 1 min se apresentando em espanhol e ouça de volta.", url: "https://vocaroo.com/" },
      { desc: "Monte no Anki/Quizlet (grátis) um baralho <b>\"Apresentação pessoal\"</b> com 15 frases básicas.", url: "https://apps.ankiweb.net/" },
    ],
  },
  {
    tag: "Semana 2",
    title: "Primeiras conversas",
    focus: "Hora de sair da teoria e falar com gente de verdade. Vai errar muito — isso é esperado.",
    tasks: [
      { desc: "<b>Dreaming Spanish — nível Beginner</b> + 1 vídeo do canal <b>Easy Spanish</b> (entrevistas de rua) por dia.", url: "https://app.dreaming.com/spanish/browse?level=beginner" },
      { desc: "<b>Español Automático</b> (podcast em espanhol), episódios 1 a 10. Histórias narradas devagar com sotaque claro.", url: "https://www.espanolautomatico.com/" },
      { desc: "<b>LyricsTraining</b> nível Médio — Miel San Marcos ou Christine D'Clario. Escolha uma música da semana pra decorar as 2 primeiras estrofes.", url: "https://www.youtube.com/results?search_query=Reyes+y+Sacerdotes+Miel+San+Marcos+letra" },
      { desc: "Crie conta no <b>HelloTalk</b> e/ou <b>Tandem</b> (grátis), filtre parceiros no México. Um áudio ou chamada curta por dia.", url: "https://www.hellotalk.com/" },
      { desc: "Baralho <b>\"Tecnologia básica\"</b> — 15 termos (código, prueba, servidor, base de datos...).", url: "https://apps.ankiweb.net/" },
    ],
  },
  {
    tag: "Semana 3",
    title: "Fluência técnica",
    focus: "Agora o foco é a reunião de trabalho de verdade: vocabulário de dev e simulação de perguntas.",
    tasks: [
      { desc: "Canal <b>Superholly</b> (gírias mexicanas) + podcast <b>Español Automático</b> (histórias narradas devagar).", url: "https://www.youtube.com/@superholly" },
      { desc: "<b>Butterfly Spanish</b> (YouTuber nativa), vídeos de estrutura gramatical e conversação. Repita em voz alta junto.", url: "https://www.youtube.com/@ButterflySpanish" },
      { desc: "Suba pro nível Difícil no LyricsTraining. Ouça <b>Redimi2</b> (rap cristão, fala mais rápida) só pra afinar o ouvido.", url: "https://www.youtube.com/results?search_query=Abre+los+Cielos+Redimi2+letra" },
      { desc: "2 chamadas de voz por dia no HelloTalk/Tandem. Em uma delas, treine responder <i>\"cuéntame sobre tu último proyecto\"</i>.", url: "https://www.hellotalk.com/" },
      { desc: "Baralho <b>\"Entrevista técnica\"</b> — decore as frases-chave da seção Frases.", url: "https://apps.ankiweb.net/" },
    ],
  },
  {
    tag: "Semana 4",
    title: "Simulação real",
    focus: "Última milha: juntar tudo numa simulação completa de entrevista e reunião em espanhol.",
    tasks: [
      { desc: "Vídeos do <b>Butterfly Spanish</b> focados em <i>entrevista de trabajo</i> e <i>reunión de equipo</i>.", url: "https://www.youtube.com/@ButterflySpanish" },
      { desc: "<b>Easy Spanish</b> (YouTube) — revise vídeos antigos e foque em diálogos de entrevista. Pause e repita as falas naturais.", url: "https://www.youtube.com/@EasySpanish" },
      { desc: "Pegue o violão e cante uma música inteira em espanhol de cabeça — teste de produção livre.", url: "https://www.cifraclub.com.br/" },
      { desc: "Peça ao parceiro do HelloTalk pra simular uma pequena entrevista técnica, ou use o <b>modo de voz do ChatGPT</b> (grátis).", url: "https://chatgpt.com/" },
      { desc: "Revisão geral de todos os baralhos anteriores — sem cards novos essa semana.", url: "https://apps.ankiweb.net/" },
    ],
  },
];

export const TOOLS = [
  { name: "Language Transfer", type: "App / Podcast", desc: "Método auditivo, sem escrita — ativa a fala rápido.", url: "https://www.languagetransfer.org/", emoji: "🎧", gradient: "from-[#FF8A50] via-[#FFC876] to-[#FFF0C8]", accent: "#FF6B30" },
  { name: "Dreaming Spanish", type: "YouTube", desc: "Input compreensível por nível, treina o ouvido.", url: "https://www.dreamingspanish.com/", emoji: "📺", gradient: "from-[#FF4D4D] via-[#FF8A6B] to-[#FFE5D4]", accent: "#FF3B3B" },
  { name: "HelloTalk", type: "App", desc: "Conversa por texto e voz com nativos mexicanos.", url: "https://www.hellotalk.com/", emoji: "💬", gradient: "from-[#7ED957] via-[#A8E6A0] to-[#E8F5E9]", accent: "#006847" },
  { name: "Tandem", type: "App", desc: "Alternativa ao HelloTalk, mesma lógica de intercâmbio.", url: "https://www.tandem.net/", emoji: "👥", gradient: "from-[#6ECBFF] via-[#9AD7FF] to-[#E6F4FF]", accent: "#2A7FFF" },
  { name: "LyricsTraining", type: "Site / App", desc: "Completa a letra da música enquanto ouve.", url: "https://lyricstraining.com/", emoji: "🎵", gradient: "from-[#B07CFF] via-[#E2B6FF] to-[#F6E8FF]", accent: "#8B4DFF" },
  { name: "Superholly", type: "YouTube", desc: "Gírias e cultura mexicana, sotaque autêntico.", url: "https://www.youtube.com/@superholly", emoji: "🌵", gradient: "from-[#4ADE80] via-[#A7F3D0] to-[#FEF6DE]", accent: "#006847" },
  { name: "Butterfly Spanish", type: "YouTube", desc: "Conversação clara em espanhol latino.", url: "https://www.youtube.com/@ButterflySpanish", emoji: "🦋", gradient: "from-[#FF7EAA] via-[#FFB6D0] to-[#FFF0F5]", accent: "#FF4D8D" },
  { name: "Easy Spanish", type: "YouTube", desc: "Entrevistas de rua em várias regiões.", url: "https://www.youtube.com/@EasySpanish", emoji: "🎤", gradient: "from-[#FFC24C] via-[#FFE082] to-[#FFF8E1]", accent: "#FF8C00" },
  { name: "Español Automático", type: "Podcast", desc: "Histórias narradas devagar, boa transição.", url: "https://www.espanolautomatico.com/", emoji: "🎙️", gradient: "from-[#FFB86B] via-[#FFD9A0] to-[#FFF4E0]", accent: "#FF6B30" },
  { name: "ChatGPT (voz)", type: "App / Web", desc: "Treino de conversa ilimitado, sem julgamento.", url: "https://chatgpt.com/", emoji: "🤖", gradient: "from-[#0A5C36] via-[#2E8B57] to-[#A8E6A0]", accent: "#006847" },
  { name: "Anki / Quizlet", type: "App", desc: "Flashcards de vocabulário, repetição espaçada.", url: "https://apps.ankiweb.net/", emoji: "🗂️", gradient: "from-[#7DD3D0] via-[#B2E8E6] to-[#E6FFFE]", accent: "#1A8A88" },
  { name: "Duolingo", type: "App", desc: "10 min/dia de reforço de vocabulário (complementar).", url: "https://www.duolingo.com/", emoji: "🦉", gradient: "from-[#7ED957] via-[#BEF264] to-[#F0FAD0]", accent: "#58CC02" },
];

export const PLAYLIST = [
  {
    tier: "Fácil — dicção clara e lenta",
    songs: [
      { title: "Renuévame", artist: "Marcos Witt", gradient: "from-[#FF6B30] to-[#FFB86A]", emoji: "🎧" },
      { title: "Tu Fidelidad", artist: "Jesús Adrián Romero", gradient: "from-[#6B4EFF] to-[#FF8AC6]", emoji: "🎵" },
      { title: "Cuán Grande es Él", artist: "Danilo Montero", gradient: "from-[#0A5C36] to-[#2ECC71]", emoji: "✨" },
    ],
  },
  {
    tier: "Médio",
    songs: [
      { title: "Reyes y Sacerdotes", artist: "Miel San Marcos", gradient: "from-[#FF4E50] to-[#F9D423]", emoji: "👑" },
      { title: "Puedo Ver", artist: "Christine D'Clario", gradient: "from-[#4776E6] to-[#8E54E9]", emoji: "👁️" },
    ],
  },
  {
    tier: "Louvor animado — ainda claro",
    songs: [
      { title: "Cambia mi Corazón", artist: "Marcos Witt", gradient: "from-[#00C9FF] to-[#92FE9D]", emoji: "💚" },
      { title: "Alfa y Omega", artist: "Barak", gradient: "from-[#1A1A1A] to-[#4A4A4A]", emoji: "🔥" },
    ],
  },
  {
    tier: "Avançado — mais rápido",
    songs: [
      { title: "Abre los Cielos", artist: "Redimi2 (feat. Miel San Marcos)", gradient: "from-[#FF416C] to-[#FF4B2B]", emoji: "☁️" },
    ],
  },
];

export const PHRASES = [
  // AEROPORTO
  { es: "¿Dónde está la salida de migraciones?", pt: "Onde fica a saída de imigração?", ctx: "Aeroporto - entrada/saída", cat: "Aeroporto", icon: "✈️" },
  { es: "Necesito ir a la zona de recogida de equipaje.", pt: "Preciso ir à área de retirada de malas.", ctx: "Aeroporto - bagagem", cat: "Aeroporto", icon: "🧳" },
  { es: "¿Dónde puedo encontrar un taxi o Uber?", pt: "Onde posso encontrar um táxi ou Uber?", ctx: "Aeroporto - transporte", cat: "Aeroporto", icon: "🚕" },
  
  // HOTEL
  { es: "Tengo una reserva a nombre de Daniel.", pt: "Tenho uma reserva em nome de Daniel.", ctx: "Hotel - check-in", cat: "Hotel", icon: "🏨" },
  { es: "¿A qué hora es el desayuno?", pt: "A que horas é o café da manhã?", ctx: "Hotel - informações", cat: "Hotel", icon: "🍳" },
  { es: "La llave no funciona, ¿puedes ayudarme?", pt: "A chave não funciona, você pode me ajudar?", ctx: "Hotel - problemas", cat: "Hotel", icon: "🔑" },
  
  // RESTAURANTE
  { es: "Una mesa para dos, por favor.", pt: "Uma mesa para dois, por favor.", ctx: "Restaurante - chegada", cat: "Restaurante", icon: "🍽️" },
  { es: "¿Cuál es el platillo típico de aquí?", pt: "Qual é o prato típico daqui?", ctx: "Restaurante - pedido", cat: "Restaurante", icon: "🍲" },
  { es: "La cuenta, por favor.", pt: "A conta, por favor.", ctx: "Restaurante - pagamento", cat: "Restaurante", icon: "💳" },
  
  // TAXI / UBER
  { es: "Llévame al hotel Palacio, por favor.", pt: "Leve-me ao hotel Palácio, por favor.", ctx: "Taxi - destino", cat: "Taxi/Uber", icon: "🚕" },
  { es: "¿Cuál es el precio aproximado?", pt: "Qual é o preço aproximado?", ctx: "Taxi - tarifa", cat: "Taxi/Uber", icon: "💵" },
  
  // PADARIA
  { es: "Dos panes de dulce y un café, por favor.", pt: "Dois pães doces e um café, por favor.", ctx: "Padaria - pedido", cat: "Padaria", icon: "🥐" },
  { es: "¿Cuánto cuesta?", pt: "Quanto custa?", ctx: "Padaria - preço", cat: "Padaria", icon: "🏷️" },
  
  // LOJA
  { es: "¿Tienes esto en talla M?", pt: "Você tem isso no tamanho M?", ctx: "Loja - roupas", cat: "Loja", icon: "👕" },
  { es: "¿Aceptan tarjeta de crédito?", pt: "Vocês aceitam cartão de crédito?", ctx: "Loja - pagamento", cat: "Loja", icon: "💳" },
  
  // RUA / INFORMAÇÕES
  { es: "Disculpa, ¿cómo llego a la plaza mayor?", pt: "Desculpa, como eu chego à praça principal?", ctx: "Rua - direção", cat: "Rua/Informações", icon: "🗺️" },
  { es: "¿Es seguro este barrio de noche?", pt: "É seguro este bairro à noite?", ctx: "Rua - segurança", cat: "Rua/Informações", icon: "🚨" },
  
  // PONTOS TURÍSTICOS
  { es: "¿Cuál es el horario de atención del museo?", pt: "Qual é o horário de funcionamento do museu?", ctx: "Turismo - horários", cat: "Pontos Turísticos", icon: "🏛️" },
  { es: "¿Cuánto cuesta la entrada?", pt: "Quanto custa a entrada?", ctx: "Turismo - preço", cat: "Pontos Turísticos", icon: "🎫" },
  
  // IGREJA
  { es: "¿A qué hora es la misa?", pt: "A que horas é a missa?", ctx: "Igreja - informações", cat: "Igreja", icon: "⛪" },
  { es: "¿Es permitido tomar fotos aquí?", pt: "É permitido tirar fotos aqui?", ctx: "Igreja - regras", cat: "Igreja", icon: "📸" },
  
  // FESTA / VIDA NOTURNA
  { es: "¿Dónde hay un bar o discoteca cerca?", pt: "Onde tem um bar ou discoteca perto?", ctx: "Diversão - localização", cat: "Festa", icon: "🎉" },
  { es: "Una cerveza fría, por favor.", pt: "Uma cerveja gelada, por favor.", ctx: "Diversão - bebida", cat: "Festa", icon: "🍺" },
];

export const VOCAB = [
  { es: "código heredado / legado", fon: "/ˈko.di.ɣo e.reˈða.ðo/", pt: "código legado", cat: "Arquitetura", color: "#006847", exemplo: "Tenemos mucho código heredado que refactorizar antes del deploy." },
  { es: "pruebas automatizadas", fon: "/ˈpɾwe.βas au.to.ma.tiˈθa.ðas/", pt: "testes automatizados", cat: "Testes", color: "#B7791F", exemplo: "Necesitamos aumentar la cobertura de pruebas automatizadas al 80%." },
  { es: "control de versiones", fon: "/konˈtɾol de βerˈsjo.nes/", pt: "controle de versão", cat: "Versionamento", color: "#2757A6", exemplo: "Usamos Git como control de versiones en todo el equipo." },
  { es: "integración continua", fon: "/in.te.ɣɾaˈsjon konˈti.nwa/", pt: "integração contínua", cat: "DevOps", color: "#7C3AED", exemplo: "La integración continua nos avisa si algo rompe el build." },
  { es: "arquitectura", fon: "/ar.ki.tekˈtu.ɾa/", pt: "arquitetura", cat: "Arquitetura", color: "#006847", exemplo: "Debemos repensar la arquitectura para soportar más tráfico." },
  { es: "depuración", fon: "/de.pu.ɾaˈsjon/", pt: "depuração / debug", cat: "Debug", color: "#CE1126", exemplo: "La depuración de este microservicio nos tomó toda la tarde." },
  { es: "revisión de código", fon: "/re.βiˈsjon de ˈko.di.ɣo/", pt: "code review", cat: "Processo", color: "#006847", exemplo: "Dejé algunos comentarios en tu revisión de código." },
  { es: "implementar / desplegar", fon: "/im.ple.menˈtar / des.pleˈɣar/", pt: "implementar / fazer deploy", cat: "Deploy", color: "#E86A33", exemplo: "Vamos a desplegar a producción esta noche a las 22h." },
  { es: "requisitos", fon: "/re.kiˈsi.tos/", pt: "requisitos", cat: "Produto", color: "#B7791F", exemplo: "Los requisitos cambiaron después de la reunión con el cliente." },
  { es: "tablero / panel", fon: "/taˈβle.ɾo / paˈnel/", pt: "quadro / board", cat: "Gestão", color: "#2757A6", exemplo: "Actualicé el tablero de Jira con las tareas del sprint." },
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
