# 🇲🇽 RUMBO A MÉXICO v1.5

Aprenda espanhol em 28 dias com disciplina, força de vontade e resiliência.

**URL:** https://espanhol.dotapps.com.br/  
**Versão:** 1.5.0  
**Status:** ✅ Pronto para Produção

---

## 📋 Sumário

- [Visão Geral](#visão-geral)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Como Usar](#como-usar)
- [Desenvolvimento](#desenvolvimento)
- [Manutenção](#manutenção)
- [Deploy](#deploy)
- [Comandos Debug](#comandos-debug)

---

## 🎯 Visão Geral

Este é um site de aprendizagem de espanhol estruturado em:

- **5 Pilares Diários**: Repetição, Conversação, Escuta, Vocabulário, Imersão
- **4 Semanas**: Fundações → Cotidiano → Profissional → Consolidação
- **28 Dias**: Rastreamento de progresso com checkboxes
- **Ferramentas Integradas**: Playlist, Frases, Biblioteca de afiliados
- **Monetização**: Premium, Afiliados, Certificado

---

## 📂 Estrutura de Pastas

```
rumbo-a-mexico-v1.5/
├── index.html                  # Página principal
│
├── css/
│   ├── style.css              # Estilos globais e layout
│   ├── components.css         # Componentes reutilizáveis
│   └── theme.css              # Temas light/dark
│
├── js/
│   ├── app.js                 # Inicialização da aplicação
│   └── modules/
│       ├── storage.js         # Gerenciar localStorage
│       ├── utils.js           # Funções utilitárias
│       ├── progress.js        # Cálculo de progresso
│       ├── ui.js              # Renderização de interface
│       └── events.js          # Gerenciamento de eventos
│
├── assets/
│   ├── img/
│   │   ├── logo_final_mexico_flag.png      # Ícone 3 arcos
│   │   └── logo_mexico_flag_full.png       # Logo completo
│   └── icons/
│       └── favicon.ico                      # Favicon
│
├── README.md                  # Este arquivo
├── ESTRUTURA.md              # Documentação técnica
└── favicon.ico               # Favicon raiz
```

---

## 🚀 Como Usar

### 1. **Deploy Local (Teste)**

```bash
# Abrir em navegador (não precisa servidor)
# Firefox/Chrome: Abrir arquivo index.html
open index.html

# Ou servir com Python
python -m http.server 8000

# Ou com Node
npx http-server
```

### 2. **Deploy em Produção**

```bash
# Fazer upload de todos os arquivos para:
# https://espanhol.dotapps.com.br/

# Estrutura esperada:
/
├── index.html
├── css/
├── js/
├── assets/
└── favicon.ico
```

### 3. **Usar o Site**

1. Acesse a página
2. Veja os 5 pilares do dia
3. Clique nos checkboxes para marcar tarefas completas
4. Progresso é salvo automaticamente em localStorage
5. Explore abas: Ferramentas, Playlist, Frases, Biblioteca

---

## 💻 Desenvolvimento

### Arquitetura Modular

O código está organizado em 5 módulos JavaScript:

| Módulo | Função | Arquivo |
|--------|--------|---------|
| **Storage** | localStorage | `js/modules/storage.js` |
| **Utils** | Funções auxiliares | `js/modules/utils.js` |
| **Progress** | Cálculo de progresso | `js/modules/progress.js` |
| **UI** | Renderização | `js/modules/ui.js` |
| **Events** | Eventos e interações | `js/modules/events.js` |

### Como Editar

#### 1. Adicionar novo pillar
```javascript
// Edite em js/modules/ui.js
UI.PILLARS = [
  // ... existentes
  { code: '6', title: 'Novo Pilar', time: '20 min', icon: '🆕' }
];
```

#### 2. Adicionar ferramenta
```javascript
// Edite em js/modules/ui.js
UI.TOOLS = [
  // ... existentes
  { name: 'Nova Ferramenta', type: 'Web', desc: 'Descrição' }
];
```

#### 3. Customizar cores
```css
/* Edite em css/style.css */
:root {
  --color-verde: #006847;    /* Mude para sua cor */
  --color-vermelho: #CE1126; /* Mude para sua cor */
  /* ... etc */
}
```

#### 4. Adicionar nova aba
```html
<!-- Adicione em index.html -->
<button class="tab-btn" data-tab="nova-aba">🆕 Nova</button>

<!-- Conteúdo -->
<div class="tab-pane" id="nova-aba-pane">
  <!-- ... seu conteúdo -->
</div>

<!-- Renderize em js/modules/ui.js -->
renderNovaAba() {
  // ... lógica
}
```

---

## 🔧 Manutenção

### Limpar Cache

```bash
# Ctrl+Shift+Delete (Chrome, Firefox)
# Cmd+Shift+Delete (Mac)
```

### Resetar Progresso (Usuário)

No console do navegador (F12 > Console):
```javascript
Rumbo.reset();  // Reseta tudo
```

### Exportar/Importar Dados

```javascript
// Exportar
Rumbo.export();  // Salva JSON

// Importar
// Vem com UI no modal de certificado
```

### Debug

Abra console (F12) e use:
```javascript
Rumbo.help()              // Lista de comandos
Rumbo.status()            // Ver status atual
Rumbo.Storage.getState()  // Ver dados completos
```

---

## 📦 Deploy

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy
```

### cPanel / FTP

1. FTP para `espanhol.dotapps.com.br`
2. Upload todos os arquivos
3. Arquivos deve estar em `/public_html` ou raiz

### GitHub Pages

```bash
git push origin main
# Site será publicado automaticamente
```

---

## 🐛 Troubleshooting

### Progresso não salva
```javascript
// Verificar localStorage disponível
Storage.isAvailable()

// Limpar dados antigas
localStorage.clear()
```

### Tema não muda
```javascript
// Reset tema
document.documentElement.setAttribute('data-theme', 'light')
```

### Abas não funcionam
```javascript
// No console, verificar:
Events.setupTabs()
```

---

## 📊 Estrutura de Dados

### localStorage
```javascript
{
  "w0-p0-d0": true,    // Semana 0, Pilar 0, Dia 0
  "w0-p0-d1": false,   // Não completo
  "w1-p2-d3": true,    // Semana 1, Pilar 2, Dia 3
  // ... 140 tarefas totais (4 semanas × 5 pilares × 7 dias)
}
```

### Progresso
```javascript
{
  daysDone: 7,           // Dias completos
  progress: 0.25,        // 0-1
  progressPercent: 25,   // 0-100
  completed: false,      // Desafio completo?
  completedTasks: 35,    // Tarefas feitas
  totalTasks: 140        // Total de tarefas
}
```

---

## 🎨 Customização

### Paleta de Cores

```css
/* Cores da bandeira mexicana */
--color-verde: #006847;      /* Verde oficial */
--color-branco: #FFFFFF;     /* Branco */
--color-vermelho: #CE1126;   /* Vermelho oficial */
--color-areia: #FDF6E3;      /* Fundo claro */
--color-terracota: #E86A33;  /* Acentos */
```

### Tipografia

```css
--font-serif: 'Fraunces', Georgia, serif;
--font-sans: 'Karla', sans-serif;
```

### Espaçamento

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
```

---

## 🚦 Checklist Deploy

- [ ] Testar localStorage em DevTools
- [ ] Verificar responsividade mobile
- [ ] Validar links afiliados
- [ ] Testar dark mode
- [ ] Verificar favicon
- [ ] Lighthouse score > 80
- [ ] Sem console errors
- [ ] Performance < 2s load

---

## 📞 Suporte

Para problemas ou dúvidas:

1. Abra console (F12)
2. Verifique erros vermelhos
3. Execute `Rumbo.help()`
4. Compartilhe output

---

## 📄 Licença

Propriedade de DevWeb (Cakto)  
Desenvolvido em 2026

---

## 🎉 Changelog

### v1.5.0
- ✨ Logo bandeira mexicana
- ✨ Monetização (Premium + Afiliados + Certificado)
- ✨ Sistema de abas
- 🔧 Código refatorado em módulos
- 📦 Projeto organizado em pastas

### v1.0.0
- ✅ Funcionalidade base de 28 dias
- ✅ 5 pilares diários
- ✅ localStorage tracking
- ✅ Theme light/dark

---

**Desenvolvido com ❤️ para aprender espanhol**
