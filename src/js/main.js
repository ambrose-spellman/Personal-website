// Main entry point
import { i18n } from './i18n.js';
import { UIManager } from './ui.js';

// Initialize application
async function init() {
  try {
    // Initialize i18n
    await i18n.init();
    
    // Initialize UI
    new UIManager();

    console.log('Application initialized successfully');
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


