const Utils = {
  $(selector) { return document.querySelector(selector); },
  $$(selector) { return document.querySelectorAll(selector); },
  on(el, event, cb) { if (typeof el === 'string') el = this.$(el); if (el) el.addEventListener(event, cb); },
  onAll(sel, evt, cb) { this.$$(sel).forEach(el => this.on(el, evt, cb)); },
  addClass(el, cls) { if (el) el.classList.add(cls); },
  removeClass(el, cls) { if (el) el.classList.remove(cls); },
  toggleClass(el, cls) { if (el) el.classList.toggle(cls); }
};
console.log('✓ Utils Module carregado');
