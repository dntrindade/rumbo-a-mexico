const App = {
  init() {
    console.log('%c=== RUMBO A MÉXICO v1.5 ===', 'color: #006847; font-weight: bold; font-size: 14px;');
    UI.renderPillars();
    UI.renderWeeks();
    Events.init();
    UI.renderTools();
    UI.updateProgress();
    console.log('✓ Aplicação inicializada');
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}
