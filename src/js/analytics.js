// Detailed analytics tracking for portfolio pages

export class Analytics {
  constructor() {
    this.scrollThresholds = [25, 50, 75, 100];
    this.firedScrollEvents = new Set();
    this.startTime = Date.now();
    this.init();
  }

  init() {
    this.trackScrollDepth();
    this.trackSectionVisibility();
    this.trackRelatedCaseClicks();
    this.trackTimeOnPage();
  }

  sendEvent(eventName, params = {}) {
    if (typeof gtag === 'function') {
      gtag('event', eventName, {
        page_path: window.location.pathname,
        ...params,
      });
    }
  }

  trackScrollDepth() {
    window.addEventListener('scroll', () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);

      for (const threshold of this.scrollThresholds) {
        if (scrollPercent >= threshold && !this.firedScrollEvents.has(threshold)) {
          this.firedScrollEvents.add(threshold);
          this.sendEvent('scroll_depth', { depth: `${threshold}%` });
        }
      }
    }, { passive: true });
  }

  trackSectionVisibility() {
    const sections = document.querySelectorAll('[data-analytics]');
    if (sections.length === 0) return;

    const observed = new Set();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionName = entry.target.getAttribute('data-analytics');
          if (!observed.has(sectionName)) {
            observed.add(sectionName);
            this.sendEvent('section_view', { section: sectionName });
          }
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(section => observer.observe(section));
  }

  trackRelatedCaseClicks() {
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.related-case-card');
      if (!card) return;

      const fromSlug = document.querySelector('#related-cases')?.getAttribute('data-current') || 'unknown';
      const toSlug = card.getAttribute('data-case-slug') || 'unknown';

      this.sendEvent('related_case_click', {
        from_case: fromSlug,
        to_case: toSlug,
      });
    });
  }

  trackTimeOnPage() {
    window.addEventListener('beforeunload', () => {
      const seconds = Math.round((Date.now() - this.startTime) / 1000);
      this.sendEvent('time_on_page', { seconds });
    });
  }
}
