# 🏗️ ESTRUTURA TÉCNICA - Rumbo a México

Documentação detalhada da arquitetura e como estender o projeto.

---

## 📚 Arquitetura

### Pattern: Modular Singleton

Cada módulo é um objeto com métodos públicos:

```javascript
const Storage = {
  STORAGE_KEY: 'chave',
  getState() { ... },
  setState(state) { ... }
};

const Utils = {
  $(selector) { ... },
  on(el, event, callback) { ... }
};

// Uso:
Storage.get('chave-específica');
Utils.$('#elemento');
```

### Fluxo de Dados

```
[Usuário clica checkbox]
        ↓
[events.js setupCheckboxes]
        ↓
[progress.js setTaskCompleted]
        ↓
[storage.js set/remove]
        ↓
[localStorage atualiza]
        ↓
[ui.js updateProgress]
        ↓
[DOM re-renderiza]
```

---

## 🔌 Módulos

### 1. Storage Module (`js/modules/storage.js`)

**Função:** Abstração de localStorage

**Métodos principais:**
```javascript
Storage.getState()           // Objeto completo
Storage.get(key)             // Valor específico
Storage.set(key, value)      // Salvar
Storage.remove(key)          // Deletar
Storage.clear()              // Limpar tudo
```

**Exemplo:**
```javascript
// Salvar dia 1 da semana 0 pillar 0
Storage.set('w0-p0-d0', true);

// Recuperar
const done = Storage.get('w0-p0-d0');  // true
```

---

### 2. Utils Module (`js/modules/utils.js`)

**Função:** Funções auxiliares DOM e gerais

**Categorias:**

#### DOM
```javascript
Utils.$(selector)           // querySelector
Utils.$$(selector)          // querySelectorAll
Utils.createElement(tag)    // Criar elemento
Utils.on(el, event, fn)     // Adicionar evento
Utils.addClass(el, cls)     // Toggle classe
```

#### Strings & Números
```javascript
Utils.toPercent(0.5)        // "50%"
Utils.formatDate(date)      // "01/01/2026"
Utils.getTime()             // "14:30:45"
```

#### Utilitários
```javascript
Utils.isValidEmail(str)
Utils.isValidURL(str)
Utils.copyToClipboard(text)
Utils.isMobile()
```

---

### 3. Progress Module (`js/modules/progress.js`)

**Função:** Cálculo de progresso do desafio

**Métodos principais:**
```javascript
Progress.getStatus()        // {daysDone, progress, ...}
Progress.getDaysDone()      // Número 0-28
Progress.getTotalProgress() // Decimal 0-1
Progress.getMilestone()     // null ou {emoji, msg}

Progress.setTaskCompleted(w, p, d, completed)
Progress.getWeekProgress(weekIndex)
```

**Exemplo:**
```javascript
const status = Progress.getStatus();
console.log(`${status.daysDone}/28 dias completos`);
console.log(`${status.progressPercent}% do desafio`);
```

---

### 4. UI Module (`js/modules/ui.js`)

**Função:** Renderização de elementos

**Dados Estáticos:**
```javascript
UI.PILLARS        // 5 pilares
UI.WEEKS          // 4 semanas
UI.TOOLS          // 8+ ferramentas
UI.PLAYLIST       // Músicas
UI.PHRASES        // Frases-chave
```

**Métodos:**
```javascript
UI.renderPillars()          // Grid de pilares
UI.renderWeeks()            // Cards de semanas
UI.renderTools()            // Lista de ferramentas
UI.updateProgress()         // Atualiza barras
UI.updateCertificado()      // Certificado
```

**Exemplo:**
```javascript
// Adicionar nova ferramenta
UI.TOOLS.push({
  name: 'Meu App',
  type: 'App',
  desc: 'Descrição incrível'
});

UI.renderTools();  // Re-renderizar
```

---

### 5. Events Module (`js/modules/events.js`)

**Função:** Orquestrar eventos e interações

**Setup:**
```javascript
Events.init()               // Inicializar todos listeners

Events.setupCheckboxes()    // Monitorar checkboxes
Events.setupThemeToggle()   // Toggle tema light/dark
Events.setupTabs()          // Navegação entre abas
Events.setupPremiumButton() // Botão premium
```

**Método de Help:**
```javascript
Events.switchTab(tabName)   // Mudar aba
Events.applyTheme(theme)    // Aplicar tema
```

---

### 6. App Module (`js/app.js`)

**Função:** Orquestração geral

**Lifecycle:**
```javascript
App.init()          // Chamado ao carregar
  → checkRequirements()
  → render()
  → Events.init()
```

**Comandos Debug (console):**
```javascript
Rumbo.status()      // Ver status
Rumbo.reset()       // Reset progresso
Rumbo.export()      // Export JSON
Rumbo.help()        // Listar comandos
```

---

## 🎨 CSS Architecture

### Organização

```
css/
├── style.css       # Globais, layout, componentes básicos
├── components.css  # Botões, cards, alerts
└── theme.css       # Dark/light mode
```

### Variáveis CSS

```css
/* Cores */
--color-verde, --color-branco, --color-vermelho
--color-accent, --color-success

/* Tipografia */
--font-serif, --font-sans

/* Espaçamento */
--spacing-xs, --spacing-sm, --spacing-md, ...

/* Outros */
--shadow-sm, --shadow-md, --shadow-lg
--radius-sm, --radius-md, --radius-lg
```

### Utilities

Há classes auxiliares em `components.css`:

```html
<!-- Margens -->
<div class="mt-lg mb-md">Content</div>

<!-- Text -->
<p class="text-muted text-bold">Muted bold text</p>

<!-- Display -->
<div class="d-flex gap-lg">Flex layout</div>

<!-- Responsividade -->
<div class="hidden-mobile">Desktop only</div>
```

---

## 🔄 Fluxo de Dados localStorage

### Estrutura

```javascript
{
  "w<0-3>-p<0-4>-d<0-6>": true/false
}
```

Exemplo completo (4 semanas × 5 pilares × 7 dias = 140 tarefas):
```javascript
{
  // Semana 0
  "w0-p0-d0": true,   // Semana 0, Pilar 0, Dia 0 ✓
  "w0-p0-d1": false,  // Semana 0, Pilar 0, Dia 1 ✗
  "w0-p1-d0": true,   // Semana 0, Pilar 1, Dia 0 ✓
  // ... mais 137 entradas
}
```

### Operações

```javascript
// Salvar checkbox marcado
Storage.set('w0-p0-d0', true);

// Verificar se completo
Progress.isTaskCompleted(0, 0, 0);  // boolean

// Calcular progresso
Progress.getStatus();  // {daysDone: 1, progress: 0.007, ...}
```

---

## 🎯 Casos de Uso

### 1. Adicionar Nova Semana

```javascript
// 1. Edite UI.WEEKS em ui.js
UI.WEEKS.push({
  tag: 'SEMANA 5',
  title: 'Conversação Avançada',
  emoji: '🎤',
  focus: '...',
  tasks: [...]
});

// 2. Atualize TOTAL_WEEKS em progress.js
TOTAL_WEEKS: 5,

// 3. Re-renderize
UI.renderWeeks();
```

### 2. Adicionar Nova Ferramenta

```javascript
// Simplesmente adicione em UI.TOOLS
UI.TOOLS.push({
  name: 'Meu App',
  type: 'App',
  desc: 'Descrição aqui'
});

// A renderização é feita automáticamente ao mudar de aba
```

### 3. Customizar Cores

```css
/* Edite em css/style.css */
:root {
  --color-verde: #00ff00;     /* Novo verde */
  --color-vermelho: #ff0000;  /* Novo vermelho */
}

/* O dark mode herda automaticamente */
```

### 4. Adicionar Evento Customizado

```javascript
// Emitir
Utils.emit('meu-evento', { dados: 'aqui' });

// Escutar
Utils.listen('meu-evento', (detail) => {
  console.log(detail);  // { dados: 'aqui' }
});
```

---

## 📱 Responsividade

### Breakpoints

```css
/* Mobile: < 480px */
@media (max-width: 480px) {
  /* Ajustes para mobile */
}

/* Tablet: 480px - 768px */
@media (max-width: 768px) {
  .layout {
    grid-template-columns: 1fr;  /* Stack vertical */
  }
}

/* Desktop: > 768px */
/* Layout padrão */
```

### Testing

```javascript
// Verificar dispositivo
Utils.getDevice();      // 'mobile', 'tablet', 'desktop'
Utils.isMobile();       // boolean
```

---

## 🚀 Performance

### Otimizações

1. **Lazy Rendering**: Abas renderizam sob demanda
2. **Event Delegation**: Eventos em elementos pai
3. **CSS Variables**: Tema muda sem reflow
4. **localStorage**: Dados persistidos, sem API

### Metrics

```javascript
// Tamanho do storage
Storage.getSize();      // "2.5 KB"

// Status da aplicação
App.ready;              // boolean
```

---

## 🔐 Segurança

### localStorage
- ✅ Dados locais do usuário
- ✅ Sem informações sensíveis
- ✅ Isolado por domínio

### XSS Protection
- ✅ Sem innerHTML direto com input
- ✅ Usando textContent quando possível
- ✅ Sanitizar dados externo

### CORS
- ✅ Links afiliados com target="_blank"
- ✅ rel="noopener noreferrer"

---

## 🧪 Testando

### Manual

```javascript
// Console - Testar funcionalidades

// 1. Storage
Storage.set('teste', 'valor');
Storage.get('teste');
Storage.getSize();

// 2. Progress
Progress.getStatus();
Progress.getDaysDone();

// 3. Utils
Utils.$('.tab-btn');
Utils.toPercent(0.5);

// 4. UI
UI.renderTools();
UI.updateProgress();
```

### Cheklist

- [ ] Checkboxes marcam/desmarcam
- [ ] localStorage persiste refresh
- [ ] Dark mode funciona
- [ ] Abas trocam conteúdo
- [ ] Responsivo em mobile
- [ ] Sem console errors
- [ ] Milestones aparecem

---

## 📖 Exemplo: Estender Funcionalidade

Adicionar contador de tempo gasto:

```javascript
// 1. Adicionar em storage
// Tempo em ms por tarefa
Storage.set('w0-p0-d0-time', 1200000);

// 2. Criar método em Progress
getTimeSpent(weekIndex) {
  let total = 0;
  // ... loop through e somar
  return total;
}

// 3. Renderizar em UI
UI.renderWeeks() {
  // Adicionar span com tempo
  el.innerHTML += `<span>${timeSpent}</span>`;
}

// 4. Atualizar em Events
Events.setupCheckboxes() {
  // Registrar timestamp
  const startTime = Date.now();
  checkbox.addEventListener('change', () => {
    Storage.set(`${key}-time`, Date.now() - startTime);
  });
}
```

---

## 🎓 Referências

- localStorage API: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- CSS Variables: https://developer.mozilla.org/en-US/docs/Web/CSS/--*
- Event Listeners: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

---

**Última atualização:** Setembro 2026  
**Versão:** 1.5.0
