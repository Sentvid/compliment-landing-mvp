# 🚀 QUICK START - COMPLIMENT LANDING MVP

## ЗАПУСК ЗА 5 МИНУТ

### 1. Клонирование и установка
```bash
git clone https://github.com/Sentvid/compliment-landing-mvp.git
cd compliment-landing-mvp
npm install
```

### 2. Настройка Environment Variables
```bash
# Скопировать template для локальной разработки
cp .env.local .env

# Файл .env уже содержит mock значения для быстрого старта
```

### 3. Запуск в режиме разработки
```bash
npm run dev
```

**🎉 ГОТОВО!** Приложение запустится на http://localhost:5173

---

## 🔥 РЕЖИМЫ РАБОТЫ

### РЕЖИМ 1: MOCK DATA (По умолчанию)
- ✅ **Работает сразу** без настройки внешних сервисов
- ✅ **Все функции демонстрируются** с имитацией данных
- ✅ **Идеально для презентаций** инвесторам
- ⚠️ Данные не сохраняются, используются моки

### РЕЖИМ 2: FULL PRODUCTION (Требует настройки)
- 🔧 Требует создания Supabase проекта
- 🔧 Требует настройки YouTube API и hCaptcha
- ✅ Полная функциональность с сохранением данных

---

## ⚡ БЫСТРЫЙ ТЕСТ ФУНКЦИЙ

После запуска `npm run dev` протестируйте:

1. **Hero Section** - Прокрутите до Technology Cards
2. **Technology Cards** - Нажимайте на карточки для раскрытия
3. **Video Section** - YouTube видео должно загружаться
4. **Wishlist Form** - Введите email и нажмите Join Wishlist
5. **FAQ Preview** - Нажмите на question stone
6. **Footer** - Попробуйте Send Feedback и Accept NDA
7. **Navigation** - Переходы на /faq, /nda, /glossary

**Все должно работать с mock данными!**

---

## 🎯 ДЛЯ PRODUCTION (ИНВЕСТОРСКИХ ДЕМО)

### Настройка Supabase (30 минут)
1. Создайте проект на [supabase.com](https://supabase.com)
2. Перейдите в Settings → API
3. Скопируйте URL и anon key в `.env`:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```
4. Выполните SQL из файла `supabase-schema.sql` в SQL Editor
5. Перезапустите `npm run dev`

### Дополнительные API (опционально)
- **YouTube API**: [console.developers.google.com](https://console.developers.google.com)
- **hCaptcha**: [hcaptcha.com](https://hcaptcha.com)

---

## 🛠 КОМАНДЫ РАЗРАБОТКИ

```bash
npm run dev          # Запуск в режиме разработки
npm run build        # Сборка для production
npm run preview      # Просмотр production сборки
npm run lint         # Проверка кода с ESLint
```

---

## ✅ ПРОВЕРКА ГОТОВНОСТИ

Убедитесь что работает:
- [ ] Страница загружается без ошибок
- [ ] Technology Cards интерактивны
- [ ] Wishlist форма принимает email
- [ ] Переходы между страницами работают
- [ ] Анимации плавные
- [ ] Mobile версия корректна

---

## 🆘 РЕШЕНИЕ ПРОБЛЕМ

### Ошибка при `npm install`
```bash
rm -rf node_modules package-lock.json
npm install
```

### Ошибки TypeScript
```bash
npm run build
# Исправьте показанные ошибки типов
```

### Проблемы с алиасами `@/`
- Проверьте что `vite.config.ts` содержит правильные алиасы
- Перезапустите dev server

### Ошибки Supabase
- Проверьте правильность URL и ключей в `.env`
- В mock режиме Supabase ошибки не критичны

---

## 🎨 ТЕХНИЧЕСКИЕ ДЕТАЛИ

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS + Custom CSS
- **Animations**: Framer Motion
- **3D Graphics**: Three.js + React Three Fiber
- **Backend**: Supabase (Auth + Database)
- **Forms**: React Hook Form + Zod
- **State**: Zustand

---

## 📞 ПОДДЕРЖКА

Если возникли проблемы:
1. Check console для ошибок JavaScript
2. Убедитесь что все зависимости установлены
3. Попробуйте `npm run build` для проверки TypeScript ошибок
4. В крайнем случае - очистите node_modules и переустановите

**ПРОЕКТ ГОТОВ К DEMO ЗА 5 МИНУТ!** 🚀
