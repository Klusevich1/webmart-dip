'use client'

import Link from 'next/link'

const vacancies = [
  {
    title: 'Менеджер по контекстной рекламе',
    department: 'Контекстная реклама',
    type: 'Офис / Удалёнка',
    description: 'Настройка и ведение кампаний в Google Ads и Яндекс.Директ. Работа с семантикой, аналитикой и отчётностью.',
  },
  {
    title: 'SEO-специалист',
    department: 'SEO',
    type: 'Офис / Гибрид',
    description: 'Продвижение сайтов в поисковых системах. Работа с контентом, технической оптимизацией и ссылочным профилем.',
  },
  {
    title: 'Специалист по маркетплейсам',
    department: 'Маркетплейсы',
    type: 'Офис',
    description: 'Продвижение товаров на Wildberries и Ozon. Оптимизация карточек, аналитика, реклама внутри площадок.',
  },
  {
    title: 'Таргетолог',
    department: 'Таргетированная реклама',
    type: 'Офис / Удалёнка',
    description: 'Настройка рекламы в соцсетях: Facebook, Instagram, ВКонтакте, TikTok. Создание креативов и аудиторий.',
  },
  {
    title: 'Дизайнер',
    department: 'Дизайн',
    type: 'Офис / Удалёнка',
    description: 'Создание рекламных креативов, баннеров, motion-видео. UX/UI для сайтов и приложений.',
  },
  {
    title: 'Менеджер проектов',
    department: 'Управление',
    type: 'Офис',
    description: 'Ведение проектов, коммуникация с клиентами, координация команды, контроль сроков и качества.',
  },
]

export default function VacanciesPage() {
  return (
    <div className="pt-16 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Вакансии
          </h1>
          <p className="text-xl text-white text-opacity-80 max-w-2xl mx-auto">
            Присоединяйтесь к команде WEBMART — агентства №1 по контекстной рекламе в Беларуси
          </p>
        </div>

        <div className="mb-12 card">
          <h2 className="text-2xl font-bold text-white mb-4">Почему WEBMART?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-white border-opacity-20 p-6">
              <div className="text-webmart-accent font-bold mb-2">01</div>
              <h3 className="text-white font-semibold mb-2">Сильная команда</h3>
              <p className="text-white text-opacity-80 text-sm">
                Работаем с 2011 года. Экспертиза в контексте, SEO, дизайне и маркетплейсах.
              </p>
            </div>
            <div className="border border-white border-opacity-20 p-6">
              <div className="text-webmart-accent font-bold mb-2">02</div>
              <h3 className="text-white font-semibold mb-2">Интересные проекты</h3>
              <p className="text-white text-opacity-80 text-sm">
                Крупные бренды, стартапы, e-commerce. Разнообразие задач и возможностей для роста.
              </p>
            </div>
            <div className="border border-white border-opacity-20 p-6">
              <div className="text-webmart-accent font-bold mb-2">03</div>
              <h3 className="text-white font-semibold mb-2">Гибкий формат</h3>
              <p className="text-white text-opacity-80 text-sm">
                Офис в Минске, удалённая работа или гибрид. Удобный график.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Открытые позиции</h2>
          {vacancies.map((v, i) => (
            <div
              key={i}
              className="card group hover:border-webmart-accent transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-webmart-accent transition-colors">
                    {v.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-webmart-accent text-sm">{v.department}</span>
                    <span className="text-white text-opacity-60 text-sm">•</span>
                    <span className="text-white text-opacity-80 text-sm">{v.type}</span>
                  </div>
                  <p className="text-white text-opacity-80">
                    {v.description}
                  </p>
                </div>
                <Link
                  href={`mailto:ad@webmart.by?subject=Отклик на вакансию: ${v.title}`}
                  className="shrink-0 px-6 py-3 border border-white border-opacity-40 hover:border-webmart-accent hover:bg-white hover:bg-opacity-5 transition-colors text-white text-sm lowercase"
                >
                  откликнуться
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center card">
          <h2 className="text-3xl font-bold text-white mb-4">
            Не нашли подходящую вакансию?
          </h2>
          <p className="text-white text-opacity-80 mb-6 max-w-md mx-auto">
            Отправьте резюме — мы рассмотрим его и свяжемся, когда появится подходящая позиция
          </p>
          <a
            href="mailto:ad@webmart.by?subject=Резюме"
            className="btn-primary"
          >
            Отправить резюме
          </a>
        </div>
      </div>
    </div>
  )
}
