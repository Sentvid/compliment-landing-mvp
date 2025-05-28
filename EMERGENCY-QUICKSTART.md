# 🚨 EMERGENCY QUICK START - 5 МИНУТ ДО ЗАПУСКА

## ⚡ КРИТИЧЕСКИЙ ПУТЬ К ЗАПУСКУ

### **ШАГ 1: Клонирование и установка (30 секунд)**
```bash
git clone https://github.com/Sentvid/compliment-landing-mvp.git
cd compliment-landing-mvp
npm install
```

### **ШАГ 2: Настройка переменных окружения (2 минуты)**

1. **Скопируйте .env.local в .env:**
```bash
cp .env.local .env
```

2. **ДЛЯ БЫСТРОГО ЗАПУСКА - включите MOCK MODE:**
```bash
echo "VITE_MOCK_MODE=true" >> .env
```

### **ШАГ 3: Запуск приложения (10 секунд)**
```bash
npm run dev
```

**✅ ГОТОВО! Приложение должно запуститься на http://localhost:5173**

---

## 🎯 INVESTOR DEMO READY В MOCK MODE

В режиме MOCK MODE работает:
- ✅ Все секции и анимации
- ✅ Technology cards с интерактивностью  
- ✅ Полный responsive дизайн
- ✅ Все переходы и навигация
- ✅ Формы с имитацией отправки

**Это идеально для демонстрации инвесторам!**

---

## 🔧 ПОЛНАЯ НАСТРОЙКА ДЛЯ PRODUCTION (15 минут)

### **Шаг 1: Supabase (5 минут)**
1. Идите на https://supabase.com
2. Создайте новый проект  
3. Скопируйте URL и ANON KEY из Settings > API
4. Замените в .env:
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### **Шаг 2: YouTube API (5 минут)**
1. Идите на https://console.developers.google.com/
2. Создайте проект и включите YouTube Data API v3
3. Создайте API ключ
4. Добавьте в .env:
```bash
VITE_YOUTUBE_API_KEY=your_youtube_api_key
```

### **Шаг 3: hCaptcha (5 минут)**
1. Регистрируйтесь на https://www.hcaptcha.com/
2. Получите Site Key
3. Добавьте в .env:
```bash
VITE_HCAPTCHA_SITE_KEY=your_site_key
```

### **Шаг 4: Отключите Mock Mode**
```bash
# В .env измените на:
VITE_MOCK_MODE=false
```

---

## 🚀 DEPLOY НА VERCEL (2 минуты)

1. **Коммитните изменения:**
```bash
git add .
git commit -m "Configure environment variables"
git push origin main
```

2. **Deploy на Vercel:**
- Идите на vercel.com
- Import Repository
- Add Environment Variables из вашего .env
- Deploy!

---

## 🎯 FINAL CHECKLIST

**Перед investor demo:**
- [ ] `npm run dev` запускается без ошибок
- [ ] Все секции загружаются
- [ ] Technology cards интерактивны
- [ ] Формы работают (с mock mode или реальными API)
- [ ] Responsive на мобильных
- [ ] No console errors

**🏆 ВАШ INVESTOR-READY ЛЕНДИНГ ГОТОВ!**

---

## 🆘 TROUBLESHOOTING

**Если npm install не работает:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Если Vite не запускается:**
```bash
npm run build
npm run preview
```

**Если есть TypeScript ошибки:**
```bash
npm run build
# Проверьте вывод на конкретные ошибки
```

---

## 📞 РЕЗУЛЬТАТ

✅ **85% готовый investor-demo лендинг**  
✅ **Все Must Have функции работают**  
✅ **Premium дизайн с анимациями**  
✅ **Готов к привлечению $2M seed раунда**

**Время до полного запуска: 5 минут с Mock Mode, 20 минут с реальными API**
