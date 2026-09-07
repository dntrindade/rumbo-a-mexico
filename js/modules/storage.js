/**
 * STORAGE MODULE
 * Gerencia localStorage para progresso
 */

const Storage = {
  STORAGE_KEY: 'rumbo_a_mexico_progress_v1.5',
  THEME_KEY: 'rumbo_a_mexico_theme',
  
  getState() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error('Erro ao carregar progresso:', error);
      return {};
    }
  },

  get(key) {
    const state = this.getState();
    return state[key] || null;
  },

  getTheme() {
    try {
      return localStorage.getItem(this.THEME_KEY) || 'light';
    } catch {
      return 'light';
    }
  },

  setState(state) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
      return true;
    } catch (error) {
      console.error('Erro ao salvar:', error);
      return false;
    }
  },

  set(key, value) {
    const state = this.getState();
    state[key] = value;
    return this.setState(state);
  },

  setTheme(theme) {
    try {
      localStorage.setItem(this.THEME_KEY, theme);
      return true;
    } catch {
      return false;
    }
  },

  remove(key) {
    const state = this.getState();
    delete state[key];
    return this.setState(state);
  },

  clear() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      return true;
    } catch {
      return false;
    }
  }
};
console.log('✓ Storage Module carregado');
