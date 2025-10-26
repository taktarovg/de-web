# Design Emotions - Web Platform

Monorepo для веб-платформы Design Emotions: публичный сайт и админ-панель.

## 📦 Структура проекта

```
apps/
├── web/          # Публичный сайт (Next.js)
└── admin/        # Админ-панель (Next.js)
packages/
├── database/     # Prisma схема и модели
└── ui/           # Shared UI компоненты
```

## 🚀 Quick Start

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка окружения

Создайте `.env` файл в корне проекта:

```bash
cp .env.example .env
```

Заполните переменные окружения:
- `DATABASE_URL` - подключение к PostgreSQL

### 3. База данных

```bash
# Генерация Prisma клиента
npm run db:generate

# Синхронизация схемы (dev)
npm run db:push

# Открыть Prisma Studio
npm run db:studio
```

### 4. Запуск для разработки

```bash
# Запустить все приложения
npm run dev

# Или отдельно
npm run dev:web      # http://localhost:3000
npm run dev:admin    # http://localhost:3001
```

## 🏗️ Сборка для production

```bash
# Собрать все приложения
npm run build

# Или отдельно
npm run build:web
npm run build:admin
```

## 📚 Технологический стек

- **Framework:** Next.js 14 (App Router)
- **UI:** React 18, TailwindCSS
- **Database:** PostgreSQL + Prisma ORM
- **Monorepo:** Turborepo
- **Language:** TypeScript

## 🌐 Деплой на Timeweb Cloud

### Вариант 1: Node.js приложение

1. Создайте проект Node.js на Timeweb Cloud
2. Подключите GitHub репозиторий
3. Настройте переменные окружения (`.env`)
4. Укажите команды:
   - Build: `npm run build:web` (или `build:admin`)
   - Start: `cd apps/web && npm start` (или `cd apps/admin && npm start`)

### Вариант 2: Static Export (рекомендуется для web)

```bash
# В next.config.js добавьте:
output: 'export'

# Соберите статику
npm run build:web

# Деплой папки apps/web/out на хостинг
```

### Вариант 3: Vercel (альтернатива)

```bash
# Установите Vercel CLI
npm i -g vercel

# Деплой
vercel --prod
```

## 🔐 Переменные окружения для production

Обязательно настройте на хостинге:

```env
DATABASE_URL=postgresql://user:password@host:5432/database
NEXT_PUBLIC_API_URL=https://yourdomain.com
NODE_ENV=production
```

## 📝 Полезные команды

```bash
# Форматирование кода
npm run format

# Линтинг
npm run lint

# Очистка кэша Turbo
rm -rf .turbo
```

## 🐛 Troubleshooting

### Ошибка подключения к БД

- Проверьте `DATABASE_URL` в `.env`
- Убедитесь, что БД доступна с вашего IP
- Проверьте timeout настройки в connection string

### Ошибки при сборке

```bash
# Очистите кэш и node_modules
rm -rf node_modules .turbo .next
npm install
```

## 📞 Контакты

**Разработчик:** Георгий Тактаров  
**Проект:** Design Emotions  
**GitHub:** https://github.com/taktarovg/de-web
