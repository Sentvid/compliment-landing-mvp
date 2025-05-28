# 🚀 БЫСТРЫЙ ЗАПУСК ПРОЕКТА - 2 МИНУТЫ

## ⚡ ЭКСТРЕННЫЙ ЗАПУСК ДЛЯ ДЕМО

### Шаг 1: Установка зависимостей (30 секунд)
```bash
npm install
```

### Шаг 2: Настройка переменных среды (60 секунд)
```bash
# .env файл уже создан с демо-ключами
# Для полной функциональности замените на реальные ключи:

# 1. Supabase (КРИТИЧНО для auth и форм)
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# 2. YouTube API (для видео)
VITE_YOUTUBE_API_KEY=your-youtube-api-key

# 3. hCaptcha (для защиты форм)
VITE_HCAPTCHA_SITE_KEY=your-hcaptcha-site-key
```

### Шаг 3: Запуск (30 секунд)
```bash
npm run dev
```

**🎯 Открыть:** http://localhost:5173

---

## 🔧 НАСТРОЙКА SUPABASE (15 минут)

### 1. Создать проект Supabase
1. Перейти на [supabase.com](https://supabase.com)
2. Создать новый проект
3. Скопировать URL и anon key из Settings > API

### 2. Применить схему базы данных
```sql
-- Выполнить SQL из файла supabase-schema.sql в SQL Editor
-- Или выполнить команду:
```

### 3. Настроить Auth
- В Authentication > Settings > Site URL добавить: `http://localhost:5173`
- Включить email confirmations (опционально)

---

## 📹 НАСТРОЙКА YOUTUBE API (10 минут)

### 1. Google Cloud Console
1. Перейти на [console.developers.google.com](https://console.developers.google.com)
2. Создать новый проект или выбрать существующий
3. Включить YouTube Data API v3
4. Создать API Key в Credentials

### 2. Настроить плейлист
```javascript
// В src/lib/constants.ts обновить:
export const YOUTUBE_VIDEOS = [
  'JyENjwMuMGA', // Ваш demo video ID
  // Добавить больше видео
];
```

---

## 🛡️ ЗАЩИТА ФОРМ - hCaptcha (5 минут)

### 1. Создать аккаунт
1. Перейти на [hcaptcha.com](https://hcaptcha.com)
2. Зарегистрироваться
3. Получить Site Key

### 2. Для демо использовать тестовый ключ:
```
VITE_HCAPTCHA_SITE_KEY=10000000-ffff-ffff-ffff-000000000001
```

---

## ✅ ПРОВЕРКА ГОТОВНОСТИ

### Критичные функции работают:
- ✅ Страница загружается без ошибок
- ✅ Navigation работает
- ✅ Technology Cards раскрываются
- ✅ Анимации плавные
- ✅ Responsive дизайн

### Для investor demo нужно:
- 🔧 Supabase настроен (auth + forms)
- 🔧 YouTube видео загружается
- 🔧 Wishlist форма сохраняет email
- 🔧 NDA workflow работает

---

## 🚨 ЧАСТЫЕ ПРОБЛЕМЫ И РЕШЕНИЯ

### Ошибка импорта TechnologyCard
```bash
# Перезапустить dev server
npm run dev
```

### Ошибки TypeScript
```bash
# Проверить типы
npm run build
```

### Проблемы с Supabase
- Проверить URL и ключи в .env
- Убедиться что таблицы созданы
- Проверить RLS policies

### YouTube не загружается
- Проверить API ключ
- Убедиться что YouTube Data API включен
- Проверить video ID в консоли

---

## 🎯 ГОТОВ К INVESTOR DEMO

### Финальная проверка:
1. ✅ `npm run dev` запускается без ошибок
2. ✅ Все секции видны и работают
3. ✅ Формы принимают данные
4. ✅ Анимации smooth на разных устройствах
5. ✅ NDA workflow функционален

### Для production:
```bash
npm run build
npm run preview
```

**🚀 Проект готов к демо для инвесторов!**
