const Events = {
  init() {
    this.setupCheckboxes();
    this.setupThemeToggle();
    this.setupTabs();
  },

  setupCheckboxes() {
    Utils.onAll('input[type="checkbox"][data-w]', 'change', (e) => {
      const w = parseInt(e.target.dataset.w);
      const p = parseInt(e.target.dataset.p);
      const d = parseInt(e.target.dataset.d);
      Progress.setTaskCompleted(w, p, d, e.target.checked);
      UI.updateProgress();
    });
  },

  setupThemeToggle() {
    const btn = Utils.$('#theme-toggle');
    if (!btn) return;
    const saved = Storage.getTheme();
    this.applyTheme(saved);
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'light' ? 'dark' : 'light';
      this.applyTheme(next);
    });
  },

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    Storage.setTheme(theme);
    const btn = Utils.$('#theme-toggle');
    if (btn) btn.textContent = theme === 'light' ? '🌙' : '☀️';
  },

  setupTabs() {
    Utils.onAll('.tab-btn', 'click', (e) => {
      const tabName = e.target.dataset.tab;
      this.switchTab(tabName);
    });
  },

  switchTab(tabName) {
    Utils.$$('.tab-btn').forEach(btn => Utils.removeClass(btn, 'active'));
    Utils.$$('.tab-pane').forEach(pane => pane.style.display = 'none');
    
    const activeBtn = Utils.$(`[data-tab="${tabName}"]`);
    const activePane = Utils.$(`#${tabName}-pane`);
    
    if (activeBtn) Utils.addClass(activeBtn, 'active');
    if (activePane) activePane.style.display = 'block';
    
    if (tabName === 'tools') UI.renderTools();
  }
};
console.log('✓ Events Module carregado');
