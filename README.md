# Webmart - Digital Marketing Agency

Полнофункциональное веб-приложение для digital-агентства Webmart с комплексным маркетинговым сопровождением бизнеса.

## 🚀 Быстрый запуск

### Требования
- Docker
- Docker Compose

### Запуск в один клик
```bash
./start-all.sh
```

Это запустит:
- Frontend (Next.js) на http://localhost:3000
- Backend API (NestJS) на http://localhost:3001
- SQLite базу данных (в Docker volume)

## 📋 Возможности

### Frontend
- Адаптивный дизайн
- Интерактивный маркетинговый квиз
- Каталог услуг (35+ услуг)
- Формы обратной связи
- Чат-виджет

### Backend API
- REST API для всех функций
- SQLite база данных
- Email интеграция
- Управление услугами и категориями

## 🏗️ Архитектура

Проект разделён на две части:
- **client/** — Next.js 14 с TypeScript, Tailwind CSS
- **server/** — NestJS с TypeORM, REST API

Сборка в Docker для простоты развёртывания:
- **Client**: Next.js 14 с TypeScript
- **Server**: NestJS с TypeORM
- **Database**: SQLite / PostgreSQL
- **Styling**: Tailwind CSS

## 🛠️ Разработка

### Локальный запуск (без Docker)
```bash
# Установка зависимостей
npm install

# Запуск server
npm run dev:server

# Запуск client (в другом терминале)
npm run dev:client
```

### Сборка и запуск в Docker
```bash
# Сборка образа
docker build -t webmart .

# Запуск
docker-compose up -d

# Или через скрипт
./start-all.sh
```

## 📊 API Endpoints

- `GET /health` - Проверка здоровья сервиса
- `GET /services/categories` - Категории услуг
- `GET /services/categories/:slug/services` - Услуги по категории
- `GET /services/:slug` - Детали услуги
- `POST /quiz-submissions` - Отправка результатов квиза
- `POST /contact-requests` - Заявки на контакт
- `POST /chat-requests` - Сообщения чата

## 🗂️ Структура услуг

Приложение включает полный каталог услуг:

1. **Контекстная реклама** - Яндекс.Директ, Google Ads, аудит, автоплатежи
2. **Маркетплейсы** - Wildberries, Ozon
3. **ASO** - Оптимизация приложений Google Play
4. **SEO** - Поисковое продвижение (Google, Яндекс, трафик, позиции, лиды и т.д.)
5. **Таргетированная реклама** - Facebook, Instagram, TikTok, Одноклассники, ВКонтакте
6. **Дизайн** - Motion-дизайн, рекламные креативы, UX/UI дизайн
7. **Создание сайтов** - Разработка под ключ

## 🔧 Управление

```bash
# Просмотр логов
docker-compose logs -f

# Остановка
docker-compose down

# Перезапуск
docker-compose restart

# Очистка (включая volumes)
docker-compose down -v
```

## 📝 О проекте

Digital-агентство WEBMART – команда профессионалов с мощным портфолио успешных кейсов, широкой экспертизой в интернет-маркетинге, креативе и аналитике.

**Ключевые преимущества:**
- **Экспертиза**: 2011 года на рынке
- **Процессы**: Регламентированные цепочки взаимодействия
- **Вовлеченность**: Полное погружение в проекты
- **Ответственность**: Доверие как основная ценность

## 📞 Контакты

Проект разработан для демонстрации полного цикла создания веб-приложения для маркетингового агентства.