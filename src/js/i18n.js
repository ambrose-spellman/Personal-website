// Simplified i18n system
class I18n {
  constructor() {
    this.currentLang = this.getInitialLanguage();
    this.translations = {};
    this.observers = [];
  }

  getInitialLanguage() {
    // Check localStorage first
    const saved = localStorage.getItem('language');
    if (saved) return saved;

    // Check browser language
    const browserLang = navigator.language.slice(0, 2).toLowerCase();
    return ['ru', 'en'].includes(browserLang) ? browserLang : 'ru';
  }

  async loadTranslations(lang) {
    try {
      const response = await fetch(`/src/locales/${lang}.json`);
      this.translations[lang] = await response.json();
    } catch (error) {
      console.error(`Failed to load ${lang} translations:`, error);
    }
  }

  async init() {
    await Promise.all([
      this.loadTranslations('en'),
      this.loadTranslations('ru')
    ]);
    this.applyTranslations();
    this.setupLanguageButtons();
  }

  setLanguage(lang) {
    if (!['ru', 'en'].includes(lang)) return;
    
    this.currentLang = lang;
    localStorage.setItem('language', lang);
    this.applyTranslations();
    this.notifyObservers();
  }

  applyTranslations() {
    const elements = document.querySelectorAll('[data-lang]');
    const translations = this.translations[this.currentLang] || {};

    elements.forEach(element => {
      const key = element.getAttribute('data-lang');
      if (translations[key]) {
        element.textContent = translations[key];
      }
    });

    // Update page title if exists
    const titleElement = document.querySelector('title[data-lang]');
    if (titleElement && translations[titleElement.getAttribute('data-lang')]) {
      document.title = translations[titleElement.getAttribute('data-lang')];
    }
  }

  setupLanguageButtons() {
    const buttons = document.querySelectorAll('[data-btn]');
    
    buttons.forEach(button => {
      const lang = button.getAttribute('data-btn');
      
      // Set initial active state
      if (lang === this.currentLang) {
        button.classList.add('active-lang-btn');
      }

      button.addEventListener('click', () => {
        this.setLanguage(lang);
        
        // Update button states
        buttons.forEach(btn => btn.classList.remove('active-lang-btn'));
        button.classList.add('active-lang-btn');
      });
    });
  }

  subscribe(callback) {
    this.observers.push(callback);
  }

  notifyObservers() {
    this.observers.forEach(callback => callback(this.currentLang));
  }

  t(key) {
    return this.translations[this.currentLang]?.[key] || key;
  }
}

// Export singleton instance
export const i18n = new I18n();


