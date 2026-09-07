const UI = {
  PILLARS: [
    { code: '1', title: 'Repetição Espaçada', time: '20 min' },
    { code: '2', title: 'Conversação', time: '15 min' },
    { code: '3', title: 'Escuta Ativa', time: '15 min' },
    { code: '4', title: 'Vocabulário', time: '10 min' },
    { code: '5', title: 'Imersão', time: '30 min' }
  ],

  WEEKS: [
    { tag: 'SEMANA 1', title: 'Fundações', focus: 'Construir confiança básica', tasks: ['Saudar naturalmente em diferentes contextos', 'Praticar apresentação pessoal estruturada', 'Escutar 10 min de podcast lento', 'Memorizar 15 palavras de necessidades básicas', 'Assistir 1 cena de série com legendas'] },
    { tag: 'SEMANA 2', title: 'Conversas Cotidianas', focus: 'Dominar situações do dia a dia', tasks: ['Praticar diálogos de compra no mercado', 'Treinar pedir comida em restaurante', 'Escutar diálogos de viagem e transporte', 'Aprender nomes de alimentos e bebidas', 'Assistir 2 cenas de série'] },
    { tag: 'SEMANA 3', title: 'Contexto Profissional', focus: 'Preparar para ambiente corporativo', tasks: ['Praticar vocabulário técnico da sua área', 'Gravarse falando sobre seu trabalho', 'Escutar podcast de business em espanhol', 'Aprender frases para reuniões', 'Assistir 2 cenas com contexto profissional'] },
    { tag: 'SEMANA 4', title: 'Consolidação & Soltura', focus: 'Ganhar confiança conversando', tasks: ['Praticar livre com ChatGPT', 'Resumir um texto em espanhol', 'Escutar podcast sem legendas', 'Revisitar vocabulário das semanas anteriores', 'Celebrar e planejar próximos passos!'] }
  ],

  TOOLS: [
    { name: 'Forvo', type: 'Site', desc: 'Pronúncia nativa de palavras' },
    { name: 'LyricsTraining', type: 'Site/App', desc: 'Completa letras ouvindo músicas' },
    { name: 'Superholly', type: 'YouTube', desc: 'Gírias e cultura mexicana' },
    { name: 'Easy Spanish', type: 'YouTube', desc: 'Entrevistas de rua em várias regiões' },
    { name: 'ChatGPT (voz)', type: 'App/Web', desc: 'Treino ilimitado de conversa' },
    { name: 'Anki', type: 'App', desc: 'Flashcards com repetição espaçada' },
    { name: 'Duolingo', type: 'App', desc: '10 min/dia de reforço' },
    { name: 'Google Translate', type: 'Web', desc: 'Referência rápida de palavras' }
  ],

  DAY_LABELS: ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'],

  renderPillars() {
    const grid = Utils.$('#pillars-grid');
    if (!grid) return;
    grid.innerHTML = '';
    this.PILLARS.forEach(p => {
      const div = document.createElement('div');
      div.className = 'pillar';
      div.innerHTML = `<div class="pillar-chip">${p.code}</div><h4>${p.title}</h4><p>${p.time}</p>`;
      grid.appendChild(div);
    });
  },

  renderWeeks() {
    const container = Utils.$('#weeks-container');
    if (!container) return;
    container.innerHTML = '';
    this.WEEKS.forEach((week, wi) => {
      const card = document.createElement('div');
      card.className = 'week';
      let html = `
        <div class="week-head">
          <div><span class="week-tag">${week.tag}</span><h2>${week.title}</h2></div>
          <div class="week-progress"><div class="week-progress-number" id="wpct-${wi}">0%</div></div>
        </div>
        <p class="week-focus">${week.focus}</p>
      `;
      week.tasks.forEach((desc, ti) => {
        const p = this.PILLARS[ti];
        html += `
          <div class="task">
            <div class="task-head"><span class="task-chip">${p.code}</span><span class="task-title">${p.title}</span><span class="task-time">· ${p.time}</span></div>
            <p class="task-desc">${desc}</p>
            <div class="days">`;
        for (let d = 0; d < 7; d++) {
          const checked = Progress.isTaskCompleted(wi, ti, d) ? 'checked' : '';
          html += `<div class="day"><span class="day-label">${this.DAY_LABELS[d]}</span><input type="checkbox" data-w="${wi}" data-p="${ti}" data-d="${d}" ${checked}></div>`;
        }
        html += `</div></div>`;
      });
      card.innerHTML = html;
      container.appendChild(card);
    });
  },

  renderTools() {
    const list = Utils.$('#tools-list');
    if (!list) return;
    list.innerHTML = '';
    this.TOOLS.forEach(tool => {
      const div = document.createElement('div');
      div.className = 'tool-item';
      div.innerHTML = `<span class="tool-name">${tool.name}</span><span class="tool-type">${tool.type}</span><span class="tool-desc">${tool.desc}</span><span class="tag-free">grátis</span>`;
      list.appendChild(div);
    });
  },

  updateProgress() {
    const status = Progress.getStatus();
    Utils.$('#days-done').textContent = status.daysDone;
    Utils.$('#progress-pct').textContent = status.progressPercent + '%';
    const fill = Utils.$('#progress-fill');
    if (fill) fill.style.width = status.progressPercent + '%';
    
    for (let w = 0; w < 4; w++) {
      const prog = 0; // Placeholder
      Utils.$(`#wpct-${w}`).textContent = '0%';
    }
  }
};
console.log('✓ UI Module carregado');
