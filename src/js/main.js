// Main entry point
import { i18n } from './i18n.js';
import { UIManager } from './ui.js';
import { Analytics } from './analytics.js';
import { renderRelatedCases } from './caseData.js';

// Initialize application
async function init() {
  try {
    // Initialize i18n
    await i18n.init();

    // Initialize UI
    new UIManager();

    // Initialize analytics
    new Analytics();

    // Initialize related cases (on case pages)
    const relatedContainer = document.getElementById('related-cases');
    if (relatedContainer) {
      const currentSlug = relatedContainer.getAttribute('data-current');
      if (currentSlug) {
        renderRelatedCases(currentSlug, i18n.currentLang);
        // Re-render on language change
        i18n.subscribe((lang) => renderRelatedCases(currentSlug, lang));
      }
    }
  } catch (error) {
    console.error('Failed to initialize application:', error);
  }
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Hot Module Replacement for Vite
if (import.meta.hot) {
  import.meta.hot.accept();
}
