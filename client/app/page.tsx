'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Quiz from '@/components/Quiz'
import { apiClient, ServiceCategory, BlogArticle } from '@/lib/api'

type AccordionItem = {
  title: string;
  slug: string;
  description: string;
  subtitle?: string;
  ctaText?: string;
  tags?: Array<{ label: string; slug: string }>;
}

function ServicesAccordionItem({ service, isLast }: { service: AccordionItem; isLast: boolean }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`border-b border-white border-opacity-30 ${isLast ? 'border-b-0' : ''}`}>
      <div className="flex items-center justify-between py-5 px-6 hover:bg-white hover:bg-opacity-5 transition-colors group">
        <Link href={`/services/${service.slug}`} className="flex-1 text-white text-lg font-medium group-hover:text-webmart-accent transition-colors">
          {service.title}
        </Link>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-8 h-8 flex items-center justify-center text-white border border-white border-opacity-50 hover:border-webmart-accent hover:text-webmart-accent transition-colors flex-shrink-0 ml-4"
          aria-expanded={open}
        >
          <span className={`text-xl font-light transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>+</span>
        </button>
      </div>
      <div className={`overflow-hidden transition-all duration-200 ${open ? 'max-h-[500px]' : 'max-h-0'}`}>
        <div className="px-6 pb-4">
          {service.subtitle && (
            <p className="text-webmart-accent text-sm font-medium mb-2">{service.subtitle}</p>
          )}
          <p className="text-webmart-text-secondary text-sm leading-relaxed mb-3">{service.description}</p>
          {service.ctaText && (
            <p className="text-white text-sm mb-4">{service.ctaText}</p>
          )}
          {service.tags && service.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/services/${tag.slug}`}
                  className="inline-block px-4 py-2 text-sm lowercase border border-white border-opacity-40 hover:border-webmart-accent hover:text-webmart-accent transition-colors"
                >
                  {tag.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const DESIGN_SERVICE_ENRICH: Record<string, { subtitle: string; description: string; ctaText: string; tags: Array<{ label: string; slug: string }> }> = {
    'motion-design': {
      subtitle: 'Анимированные рекламные видеоролики',
      description: 'Motion-дизайн — анимированные рекламные видеоролики. Во многих роликах добавляют звук, чтобы задействовать слуховой канал восприятия. На сегодня motion — наиболее эффективный рекламный формат для привлечения внимания пользователей. Создаём анимированные логотипы, видео-презентации, интерактивные элементы и вирусный контент.',
      ctaText: 'Закажите motion-видео для рекламы и соцсетей — от 400 BYN!',
      tags: [
        { label: '2D анимация', slug: 'motion-design' },
        { label: '3D', slug: 'motion-design' },
        { label: 'видео-презентации', slug: 'motion-design' },
      ],
    },
    'advertising-creatives': {
      subtitle: 'Баннеры, статика, GIF, HTML5',
      description: 'Создаём дизайн для продукта в формате PNG или JPEG. Используем креативный подход, который вовлекает в продукт и вызывает эмоции у аудитории. GIF-баннер — анимированное изображение из нескольких кадров, более впечатляющее за счёт динамических элементов. HTML5-баннеры — адаптируются под любые устройства. Результат — проект, который привлекает внимание и конвертирует.',
      ctaText: 'Создадим креативы под вашу рекламную кампанию — от 150 BYN!',
      tags: [
        { label: 'статика', slug: 'advertising-creatives' },
        { label: 'gif-анимация', slug: 'advertising-creatives' },
        { label: 'html-баннеры', slug: 'advertising-creatives' },
      ],
    },
    'ux-ui-design': {
      subtitle: 'Интерфейсы, где удобство так же важно, как внешний вид',
      description: 'UX/UI дизайн — это проектирование пользовательских интерфейсов. Разрабатываем дизайн для сайтов различных отраслей, понимая специфику каждого. Включает исследование пользователей, создание прототипов, дизайн-систем и оптимизацию взаимодействия для максимальной конверсии.',
      ctaText: 'Спроектируем удобный интерфейс для вашего сайта или приложения!',
      tags: [
        { label: 'прототипы', slug: 'ux-ui-design' },
        { label: 'дизайн-система', slug: 'ux-ui-design' },
        { label: 'usability', slug: 'ux-ui-design' },
      ],
    },
  }

export default function Home() {
  const quizRef = useRef<HTMLElement>(null)
  const [accordionItems, setAccordionItems] = useState<AccordionItem[]>([])
  const [accordionLoading, setAccordionLoading] = useState(true)
  const [blogArticles, setBlogArticles] = useState<BlogArticle[]>([])

  useEffect(() => {
    const fetchDesignServices = async () => {
      try {
        const category = await apiClient.getCategory('design')
        if (category.services?.length) {
          setAccordionItems(
            category.services.map((s: { name: string; slug: string; shortDescription: string }) => {
              const enrich = DESIGN_SERVICE_ENRICH[s.slug]
              return {
                title: s.name,
                slug: s.slug,
                description: enrich?.description ?? s.shortDescription ?? '',
                subtitle: enrich?.subtitle,
                ctaText: enrich?.ctaText,
                tags: enrich?.tags,
              }
            })
          )
        } else {
          setAccordionItems([{
            title: category.name,
            slug: category.slug,
            description: category.description || '',
            subtitle: category.subtitle,
            ctaText: category.ctaText,
            tags: category.tags,
          }])
        }
      } catch {
        setAccordionItems([])
      } finally {
        setAccordionLoading(false)
      }
    }
    const fetchBlog = async () => {
      try {
        const data = await apiClient.getLatestArticles(3)
        setBlogArticles(data)
      } catch {
        setBlogArticles([])
      }
    }
    fetchDesignServices()
    fetchBlog()
  }, [])

  const scrollToQuiz = () => {
    quizRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-4 overflow-hidden py-16">
        {/* Main content */}
        <div className="container mx-auto text-center relative z-10">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
              <span className="gradient-text">Digital-дизайн</span>
            </h1>

            <p className="text-lg md:text-xl text-webmart-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
              Креативы, motion, UX/UI — дизайн, который решает задачи и продвигает ваш бренд
            </p>

            {/* Interactive buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
              <button
                onClick={scrollToQuiz}
                className="btn-primary text-lg px-10 py-5"
              >
                Подобрать решение
              </button>

              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({behavior: 'smooth'})}
                className="btn-secondary text-lg px-10 py-5"
              >
                Наши услуги
              </button>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="border border-white border-opacity-20 p-4">
                <div className="text-4xl font-bold text-white mb-2">500+</div>
                <div className="text-webmart-text-muted text-sm">Проектов</div>
              </div>
              <div className="border border-white border-opacity-20 p-4">
                <div className="text-4xl font-bold text-white mb-2">2011</div>
                <div className="text-webmart-text-muted text-sm">Год основания</div>
              </div>
              <div className="border border-white border-opacity-20 p-4">
                <div className="text-4xl font-bold text-white mb-2">50+</div>
                <div className="text-webmart-text-muted text-sm">Клиентов</div>
              </div>
              <div className="border border-white border-opacity-20 p-4">
                <div className="text-4xl font-bold text-white mb-2">#1</div>
                <div className="text-webmart-text-muted text-sm">В digital-дизайне</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section ref={quizRef} id="quiz" className="py-8 md:py-12 px-3 sm:px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Подберём дизайн под задачу
            </h2>
            <p className="text-xl text-white text-opacity-80 max-w-2xl mx-auto">
              Ответьте на несколько вопросов — подберём тип дизайна, формат и решение под ваш проект
            </p>
          </div>

          <Quiz />
        </div>
      </section>

      {/* Services Section - Accordion style */}
      <section id="services" className="py-16 px-4 relative">
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:gap-16">
            <div className="lg:w-1/3 mb-12 lg:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                ДИЗАЙН-УСЛУГИ
              </h2>
              <p className="text-webmart-text-secondary text-lg">
                Креативы, motion, UX/UI — дизайн для рекламы, сайтов и брендинга
              </p>
              <Link href="/services" className="btn-primary inline-block mt-8">
                Все услуги
              </Link>
            </div>

            <div className="flex-1 border border-white border-opacity-30">
              {accordionLoading ? (
                <div className="py-12 text-center text-webmart-text-secondary">Загрузка услуг...</div>
              ) : (
                accordionItems.map((service, index) => (
                  <ServicesAccordionItem key={service.slug} service={service} isLast={index === accordionItems.length - 1} />
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
                Кто мы?
              </h2>

              <div className="space-y-6 mb-8">
                <p className="text-lg text-webmart-text-secondary leading-relaxed">
                  <span className="text-webmart-accent font-semibold">WEBMART</span> — дизайн-студия с фокусом на digital. Делаем рекламные креативы, motion-видео, UX/UI для сайтов и приложений. Баннеры, инфографика, фирменный стиль — дизайн, который решает задачи и выделяет бренд.
                </p>
                <p className="text-lg text-webmart-text-secondary leading-relaxed">
                  Работаем с 2011 года. Статика и motion, продукты и здравый смысл — креативы для всех рекламных систем и платформ.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  { number: '500+', label: 'Проектов' },
                  { number: '2011', label: 'Год основания' },
                  { number: '50+', label: 'Клиентов' },
                  { number: '—', label: 'В digital-дизайне' }
                ].map((stat, index) => (
                  <div key={index} className="border border-white border-opacity-20 p-5">
                    <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-webmart-text-muted text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>

              <Link href="/about" className="btn-primary text-lg px-8 py-4">
                Узнать о нас больше
              </Link>
            </div>

            <div className="border border-white border-opacity-20 p-8 bg-webmart-bg">
              <h3 className="text-2xl font-bold text-white mb-8">
                Наши преимущества
              </h3>

              <div className="space-y-6">
                {[
                  { number: '01', title: 'Экспертиза', description: 'Работаем в digital-дизайне с 2011 года. Статика, motion, UX/UI — понимаем специфику каждой области и требования рекламных платформ.' },
                  { number: '02', title: 'Подход', description: 'Опираемся на анализ, а не личное восприятие. Изучаем продукт, используем продуктовый подход и здравый смысл — дизайн, который работает.' },
                  { number: '03', title: 'Креатив', description: 'Сближаем бизнес и людей через дизайн. Создаём запоминающиеся креативы, не боимся инноваций и сложных задач.' },
                  { number: '04', title: 'Ответственность', description: 'Ставим ваши интересы в центр. От концепции до реализации и размещения на рекламных площадках — полный цикл.' }
                ].map((advantage, index) => (
                  <div key={index} className="border-b border-white border-opacity-20 pb-6 last:border-b-0 last:pb-0">
                    <div className="flex items-start gap-4">
                      <span className="text-webmart-accent font-bold text-sm shrink-0">
                        {advantage.number}
                      </span>
                      <div>
                        <h4 className="text-white font-semibold mb-2">
                          {advantage.title}
                        </h4>
                        <p className="text-webmart-text-secondary text-sm leading-relaxed">
                          {advantage.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-10 md:py-16 px-4 relative">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 md:mb-8">
            НАШИ КЛИЕНТЫ
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4 overflow-visible">
            {Array.from({ length: 48 }, (_, i) => {
              const logoNum = i + 14;
              return (
                <div
                  key={i}
                  className="flex items-center justify-center p-3 md:p-4 border border-white border-opacity-20 hover:border-webmart-accent hover:bg-white hover:bg-opacity-5 transition-all duration-300 min-h-[100px] sm:min-h-[120px] md:min-h-[140px] overflow-visible bg-webmart-bg"
                >
                  <img
                    src={`/resources/clients/logo-${logoNum}.png`}
                    alt={`Клиент ${i + 1}`}
                    className="h-28 sm:h-36 md:h-44 lg:h-52 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                </div>
              );
            })}
          </div>
          <p className="text-center text-webmart-text-muted mt-8">
            <Link href="https://webmart.by/category/cases" target="_blank" rel="noopener noreferrer" className="text-webmart-accent hover:underline">
              И их кейсы →
            </Link>
          </p>
        </div>
      </section>

      {/* Blog Section */}
      {blogArticles.length > 0 && (
        <section className="py-16 px-4 relative">
          <div className="container mx-auto">
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                БЛОГ
              </h2>
              <Link href="/blog" className="text-webmart-accent hover:text-white transition-colors font-medium">
                Все статьи →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="card group hover:scale-[1.02] transition-transform"
                >
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-webmart-accent transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-webmart-text-secondary text-sm line-clamp-2">
                    {article.excerpt}
                  </p>
                  <span className="inline-block mt-4 text-webmart-accent text-sm font-medium group-hover:text-white transition-colors">
                    Читать →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
