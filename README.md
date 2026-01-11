# Saikal Kaparbekova - Portfolio Website

Personal portfolio website for UX/UI designer Saikal Kaparbekova, built with modern web technologies.

## 🚀 Tech Stack

- **Build Tool**: Vite 5.0
- **Templating**: Handlebars
- **Internationalization**: Custom i18n system with JSON files
- **Styling**: CSS with modern features
- **JavaScript**: ES Modules

## 📁 Project Structure

```
.
├── public/                 # Static assets (images, fonts, etc.)
│   └── assets/
│       └── images/
├── src/                    # Source files
│   ├── components/         # Reusable UI components
│   ├── js/                 # JavaScript modules
│   │   ├── main.js        # Entry point
│   │   ├── i18n.js        # Internationalization system
│   │   └── ui.js          # UI utilities
│   ├── locales/           # Translation files
│   │   ├── en.json
│   │   └── ru.json
│   ├── partials/          # Handlebars partials
│   │   ├── header.hbs
│   │   └── footer.hbs
│   └── styles/            # CSS files
│       ├── normalize.css
│       ├── grid.css
│       └── style.css
├── index.html             # Main page
├── about.html             # About page
├── package.json
├── vite.config.js
└── README.md
```

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development Server

```bash
# Start dev server with hot reload
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
# Build optimized production bundle
npm run build
```

### Preview Production Build

```bash
# Preview production build locally
npm run preview
```

## 🌐 Deployment

### GitHub Pages

```bash
# Build and deploy to GitHub Pages
npm run deploy
```

This will:
1. Build the production bundle
2. Deploy to `gh-pages` branch
3. Make it available at your GitHub Pages URL

### Manual Deployment

After running `npm run build`, the `dist/` folder contains the production-ready files that can be deployed to any static hosting service.

## ✨ Features

### Internationalization (i18n)

The site supports Russian and English languages:

- Translations stored in JSON files (`src/locales/`)
- Automatic language detection from browser
- Persistent language selection in localStorage
- Easy to add new languages

To add a new language:
1. Create `src/locales/[lang].json` with translations
2. Update `i18n.js` to include the new language

### Component-Based Architecture

- Reusable header and footer components using Handlebars
- Modular JavaScript with ES6 modules
- Separation of concerns (UI, i18n, utilities)

### Performance Optimizations

- Lazy loading for images
- Minified CSS/JS
- Tree-shaking for unused code
- Optimized asset loading

### SEO & Accessibility

- Semantic HTML
- ARIA labels
- Meta tags
- Alt text for images
- Proper heading hierarchy

## 📝 Adding New Pages

1. Create new HTML file in root (e.g., `new-page.html`)
2. Add page to `vite.config.js` in `rollupOptions.input`
3. Use Handlebars partials for header/footer:
   ```html
   {{> header}}
   <!-- Your content -->
   {{> footer}}
   ```
4. Include main script: `<script type="module" src="/src/js/main.js"></script>`

## 🎨 Styling

CSS is organized into:
- `normalize.css` - CSS reset
- `grid.css` - Grid system
- `style.css` - Main styles

You can add Sass/SCSS by:
1. Installing: `npm install -D sass`
2. Renaming `.css` to `.scss`
3. Updating imports in HTML

## 🔧 Configuration

### Vite Config (`vite.config.js`)

Key configurations:
- **Base URL**: Set `base` for deployment path
- **Build Options**: Minification, code splitting
- **Plugins**: Handlebars, HTML optimization

### Package.json Scripts

- `dev` - Start development server
- `build` - Build for production
- `preview` - Preview production build
- `deploy` - Deploy to GitHub Pages

## 📦 Dependencies

### Production
- `i18next` - Internationalization (if needed for advanced features)

### Development
- `vite` - Build tool
- `vite-plugin-handlebars` - Handlebars templating
- `vite-plugin-html` - HTML optimization
- `vite-imagetools` - Image optimization
- `gh-pages` - GitHub Pages deployment
- `sass` - CSS preprocessor (optional)

## 🐛 Troubleshooting

### Dev server won't start
- Check if port 5173 is available
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Images not loading
- Ensure images are in `public/assets/images/`
- Use absolute paths starting with `/`

### Translations not working
- Check JSON syntax in locale files
- Ensure `data-lang` attributes match translation keys

## 📄 License

Private portfolio project - All rights reserved

## 👤 Author

**Saikal Kaparbekova**
- Email: kaparbekovasaikal@gmail.com
- Telegram: [@ambr0se_spellman](https://t.me/ambr0se_spellman)
- Behance: [saikalkaparbekova](https://www.behance.net/saikalkaparbekova)
- LinkedIn: [saikal-kaparbekova](https://www.linkedin.com/in/saikal-kaparbekova-18416313a/)

---

Built with ❤️ using Vite


