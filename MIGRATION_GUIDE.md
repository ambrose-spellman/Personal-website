# Руководство по миграции Case Study страниц

## Текущее состояние

Основные страницы (`index.html` и `about.html`) успешно мигрированы на Vite с использованием:
- ✅ Handlebars компонентов (header, footer)
- ✅ Модульного JavaScript (ES6 modules)
- ✅ Улучшенной системы i18n с JSON файлами
- ✅ Оптимизированной структуры проекта

**Case study страницы** пока ссылаются на старые версии из папки `saikalkaparbekova.me/`.

## Как мигрировать case study страницу

### Шаг 1: Скопировать контент

Из старой версии (например, `saikalkaparbekova.me/yoshop-restaurant-case.html`) скопируйте основной контент между `<body>` тегами, исключая header и footer.

### Шаг 2: Создать новый файл

Создайте новый файл в корне проекта с такой структурой:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Favicons -->
    <link rel="icon" type="image/png" href="/assets/images/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="/assets/images/favicon.svg" />
    <link rel="shortcut icon" href="/assets/images/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/apple-touch-icon.png" />
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
    
    <!-- Styles -->
    <link rel="stylesheet" href="/src/styles/normalize.css" />
    <link rel="stylesheet" href="/src/styles/grid.css" />
    <link rel="stylesheet" href="/src/styles/style.css" />
    <link rel="stylesheet" href="/src/styles/case.css">
    
    <title>Your Case Title</title>
</head>

<body>
    {{> header}}
    
    <!-- ВАША КОНТЕНТ ЗДЕСЬ -->
    
    {{> footer}}
    
    <script type="module" src="/src/js/main.js"></script>
</body>
</html>
```

### Шаг 3: Обновить пути к изображениям

Замените все пути к изображениям:

**Было:**
```html
<img src="assets/images/hero.png" />
```

**Стало:**
```html
<img src="/assets/images/hero.png" loading="lazy" />
```

Добавьте `loading="lazy"` для оптимизации загрузки.

### Шаг 4: Добавить переводы (если нужно)

Если на странице есть текст с атрибутом `data-lang`, добавьте переводы в:
- `src/locales/en.json`
- `src/locales/ru.json`

### Шаг 5: Удалить дублирующиеся теги

Удалите из контента:
- `<header>` блоки (используем `{{> header}}`)
- `<footer>` блоки (используем `{{> footer}}`)  
- Старые `<script>` теги (используем модульный `/src/js/main.js`)

### Шаг 6: Проверить

```bash
npm run dev
```

Откройте страницу в браузере и проверьте:
- ✅ Header и footer отображаются корректно
- ✅ Все изображения загружаются
- ✅ Переключение языков работает
- ✅ Навигация работает
- ✅ Нет ошибок в консоли

## Приоритет миграции

1. **yoshop-restaurant-case.html** - основной case, много изображений
2. **creatego-case.html** - второй по важности
3. **ronto-tech-case.html** - средний приоритет
4. **yoshop-kiosk.html** - низкий приоритет

## Пример миграции

### Было (старая версия):

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="assets/styles/style.css" />
</head>
<body>
    <header class="header">...</header>
    
    <div class="case-content">
        <img src="assets/images/case.png" />
    </div>
    
    <footer>...</footer>
    <script src="main.js"></script>
</body>
</html>
```

### Стало (новая версия):

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="/src/styles/normalize.css" />
    <link rel="stylesheet" href="/src/styles/style.css" />
    <title>Case Study</title>
</head>
<body>
    {{> header}}
    
    <div class="case-content">
        <img src="/assets/images/case.png" loading="lazy" alt="Case study" />
    </div>
    
    {{> footer}}
    <script type="module" src="/src/js/main.js"></script>
</body>
</html>
```

## Чек-лист перед коммитом

- [ ] Header и footer используют Handlebars partials (`{{> header}}`, `{{> footer}}`)
- [ ] Все пути к ассетам начинаются с `/`
- [ ] Добавлен `loading="lazy"` к изображениям
- [ ] Добавлены alt текстыко изображениям
- [ ] Использован модульный скрипт: `<script type="module" src="/src/js/main.js"></script>`
- [ ] Страница добавлена в `vite.config.js` в `rollupOptions.input`
- [ ] Проверена работа в dev режиме
- [ ] Проверена работа после build

## Добавление новой страницы в Vite config

Откройте `vite.config.js` и добавьте новую страницу:

```javascript
rollupOptions: {
  input: {
    main: resolve(__dirname, 'index.html'),
    about: resolve(__dirname, 'about.html'),
    'your-new-case': resolve(__dirname, 'your-new-case.html'), // ← ДОБАВИТЬ
  },
}
```

## Полезные команды

```bash
# Разработка
npm run dev

# Сборка
npm run build

# Превью продакшн версии
npm run preview

# Деплой
npm run deploy
```

## Помощь

Если возникли проблемы:
1. Проверьте консоль браузера на ошибки
2. Убедитесь, что пути к файлам корректные
3. Проверьте, что страница добавлена в vite.config.js
4. Перезапустите dev сервер

---

После полной миграции всех case study страниц можно будет удалить папку `saikalkaparbekova.me/`.


