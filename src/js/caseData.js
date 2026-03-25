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
  'yoshop-restaurant': {
    title: { en: 'YoShop', ru: 'YoShop' },
    description: { en: 'POS and inventory system — retail stores, restaurants, 3 platforms', ru: 'POS-система и учёт товаров — магазины, рестораны, 3 платформы' },
    tags: ['retail', 'restaurant', 'fintech', 'POS', 'web-app'],
    url: '/yoshop-restaurant-case.html',
    thumbnail: '/assets/yoshop/yoshopCase.png',
    role: 'UX/UI Designer',
  },
  'vixco': {
    title: { en: 'Vixco Store', ru: 'Vixco Store' },
    description: { en: 'E-commerce mobile app — buy and sell clothing, cosmetics, and home goods', ru: 'Мобильный маркетплейс — одежда, косметика, товары для дома' },
    tags: ['mobile', 'e-commerce', 'marketplace', 'startup'],
    url: '/vixco-case.html',
    thumbnail: '/assets/vixco-preview.png',
    role: 'UX/UI Designer',
  },
  'chocofood': {
    title: { en: 'ChocoFood', ru: 'ChocoFood' },
    description: { en: 'UX research for a food delivery app — interviews, usability tests, CJM', ru: 'UX-исследование для сервиса доставки еды — интервью, тесты, CJM' },
    tags: ['ux-research', 'mobile', 'food', 'usability'],
    url: '/chocofood-case.html',
    thumbnail: '/assets/choco/research1.webp',
    role: 'UX Researcher',
  },
  'geon': {
    title: { en: 'G-Eon', ru: 'G-Eon' },
    description: { en: 'Mobile streaming platform — live streams, AR, wallet, tournaments', ru: 'Мобильная стриминговая платформа — прямые эфиры, AR, кошелёк, турниры' },
    tags: ['mobile', 'streaming', 'startup', 'AR', 'iOS', 'Android'],
    url: '/g-eon-case.html',
    thumbnail: '/assets/geon/geon-case.png',
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

  const grid = container.querySelector('.related-cases-grid');
  if (grid) {
    grid.innerHTML = html;
  } else {
    container.innerHTML = `<div class="related-cases-grid">${html}</div>`;
  }
}
