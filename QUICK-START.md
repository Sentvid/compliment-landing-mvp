# 🚀 БЫСТРЫЙ СТАРТ - ПОШАГОВАЯ ИНСТРУКЦИЯ

## ⚡ Что делать прямо сейчас:

### 1. СКАЧАТЬ ПРОЕКТ (2 минуты)
```bash
# Открыть терминал и выполнить:
git clone https://github.com/Sentvid/compliment-landing-mvp.git
cd compliment-landing-mvp
npm install
```

### 2. СКОПИРОВАТЬ ВСЕ ФАЙЛЫ ИЗ ЧАТА (10 минут)
**ВАЖНО**: Все файлы созданы в этом чате. Нужно скопировать их в проект:

#### Создать структуру папок:
```bash
mkdir -p src/{components/{sections,ui},hooks,lib,pages,styles,types}
```

#### Скопировать файлы из чата в соответствующие папки:

**Конфигурационные файлы (в корень проекта):**
- `vite.config.ts`
- `tsconfig.json` 
- `tsconfig.node.json`
- `tailwind.config.js`
- `postcss.config.js`
- `index.html`
- `.env.example`

**Основные файлы приложения:**
- `src/main.tsx`
- `src/App.tsx`
- `src/types/index.ts`
- `src/lib/supabase.ts`
- `src/lib/store.ts`
- `src/lib/utils.ts`
- `src/lib/constants.ts`
- `src/styles/globals.css`

**Компоненты:**
- `src/components/sections/Header.tsx`
- `src/components/sections/Hero.tsx`
- `src/components/sections/VideoSection.tsx`
- `src/components/sections/WishlistSection.tsx`
- `src/components/sections/FAQPreview.tsx`
- `src/components/sections/Footer.tsx`
- `src/components/ui/Button.tsx`
- `src/components/ui/Input.tsx`
- `src/components/ui/Modal.tsx`
- `src/components/ui/TechnologyCard.tsx`

**Страницы:**
- `src/pages/FAQPage.tsx`
- `src/pages/NDAPage.tsx`
- `src/pages/GlossaryPage.tsx`

**Хуки:**
- `src/hooks/useAuth.ts`
- `src/hooks/useKeyboardNavigation.ts`

### 3. НАСТРОИТЬ SUPABASE (5 минут)
1. Зайти на [supabase.com](https://supabase.com)
2. Создать новый проект
3. Скопировать URL и API Key
4. Заполнить `.env` файл
5. Выполнить SQL схему (из чата)

### 4. ЗАПУСТИТЬ ПРОЕКТ (1 минута)
```bash
npm run dev
```

## 🆘 ЕСЛИ ЧТО-ТО НЕ РАБОТАЕТ:

### Проблема: "Файлы не найдены"
**Решение**: Скопируйте все файлы из этого чата вручную

### Проблема: "Ошибки импорта"
**Решение**: Убедитесь что все файлы скопированы в правильные папки

### Проблема: "Supabase не работает"
**Решение**: Проверьте `.env` файл и настройки Supabase

## 🎯 РЕЗУЛЬТАТ:
После выполнения этих шагов у вас будет полностью рабочий лендинг!

## 📞 ПОДДЕРЖКА:
Создайте Issue в репозитории с описанием проблемы.

---

**ВАЖНО**: Этот файл - временная инструкция. После настройки проекта можете его удалить.
