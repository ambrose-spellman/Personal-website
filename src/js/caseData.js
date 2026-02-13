// Case study data with tags for related cases linking
export const cases = {
  'creatego': {
    title: { en: 'CreateGO', ru: 'CreateGO' },
    description: { en: 'No-code builder for designers', ru: 'No-code конструктор для дизайнеров' },
    tags: ['saas', 'no-code', 'web-app', 'startup'],
    url: '/creatego-case.html',
    thumbnail: '/assets/Creatego.png',
    role: 'UX/UI Designer',
  },
  'ronto-tech': {
    title: { en: 'Ronto Tech', ru: 'Ronto Tech' },
    description: { en: 'IT company focused on AI, blockchain, and AR', ru: 'ИТ компания в области ИИ, блокчейна и AR' },
    tags: ['blockchain', 'AI', 'AR', 'website', 'startup'],
    url: '/ronto-tech-case.html',
    thumbnail: '/assets/Ronto.png',
    role: 'UX/UI Designer',
  },
  'yoshop-restaurant': {
    title: { en: 'YoShop Restaurant', ru: 'YoShop Restaurant' },
    description: { en: 'Restaurant business automation (POS, monoblock, tablet)', ru: 'Автоматизация ресторанного бизнеса (POS, моноблок, планшет)' },
    tags: ['restaurant', 'fintech', 'POS', 'web-app'],
    url: '/yoshop-restaurant-case.html',
    thumbnail: '/assets/YoshopRestuarant.png',
    role: 'UX/UI Designer',
  },
  'yoshop-kiosk': {
    title: { en: 'YoShop Kiosk', ru: 'YoShop Kiosk' },
    description: { en: 'Restaurant business automation (Kiosk)', ru: 'Автоматизация ресторанного бизнеса (Киоск)' },
    tags: ['restaurant', 'kiosk', 'fintech'],
    url: '/yoshop-kiosk.html',
    thumbnail: '/assets/Kiosk.png',
    role: 'UX/UI Designer',
  },
};

/**
 * Get related cases based on shared tags
 * @param {string} currentSlug - current case slug to exclude
 * @param {number} limit - max number of related cases
 * @returns {Array} sorted by relevance (most shared tags first)
 */
export function getRelatedCases(currentSlug, limit = 3) {
  const currentCase = cases[currentSlug];
  if (!currentCase) return [];

  const currentTags = new Set(currentCase.tags);

  return Object.entries(cases)
    .filter(([slug]) => slug !== currentSlug)
    .map(([slug, data]) => {
      const sharedTags = data.tags.filter(tag => currentTags.has(tag));
      return { slug, ...data, sharedTags, relevance: sharedTags.length };
    })
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, limit);
}

/**
 * Render related cases section into a container element
 * @param {string} currentSlug - current case slug
 * @param {string} lang - current language ('en' or 'ru')
 */
export function renderRelatedCases(currentSlug, lang = 'en') {
  const container = document.getElementById('related-cases');
  if (!container) return;

  const related = getRelatedCases(currentSlug);
  if (related.length === 0) return;

  const html = related.map(c => `
    <a href="${c.url}" class="related-case-card" data-case-slug="${c.slug}">
      <div class="related-case-thumbnail">
        <img src="${c.thumbnail}" alt="${c.title[lang]}" loading="lazy">
      </div>
      <div class="related-case-info">
        <h3 class="related-case-title">${c.title[lang]}</h3>
        <p class="related-case-description">${c.description[lang]}</p>
        <div class="related-case-tags">
          ${c.sharedTags.map(tag => `<span class="case-tag">${tag}</span>`).join('')}
        </div>
      </div>
    </a>
  `).join('');

  container.innerHTML = html;
}
