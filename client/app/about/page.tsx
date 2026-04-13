export default function AboutPage() {
  return (
    <div className="pt-16 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            О компании Webmart
          </h1>
          <p className="text-xl text-white text-opacity-80 max-w-2xl mx-auto">
            Мы создаем эффективные маркетинговые решения для роста вашего бизнеса
          </p>
        </div>

        {/* Mission Section */}
        <div className="card mb-16">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Наша миссия
          </h2>
          <p className="text-lg text-white text-opacity-80 leading-relaxed text-center max-w-3xl mx-auto">
            Помогать бизнесу достигать новых высот через современные маркетинговые технологии и креативные решения.
            Мы верим, что каждый бизнес заслуживает эффективного продвижения и роста.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {[
            { number: '500+', label: 'Проектов' },
            { number: '3 года', label: 'Опыта' },
            { number: '50+', label: 'Клиентов' },
            { number: '300%', label: 'Средний рост показателей' }
          ].map((stat, index) => (
            <div key={index} className="text-center card">
              <div className="text-4xl md:text-5xl font-bold text-webmart-accent mb-2">
                {stat.number}
              </div>
              <div className="text-white text-opacity-80">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Наши ценности
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Качество',
                description: 'Мы стремимся к совершенству в каждой задаче и гарантируем высокий уровень исполнения'
              },
              {
                title: 'Инновации',
                description: 'Используем современные технологии и подходы для достижения лучших результатов'
              },
              {
                title: 'Партнерство',
                description: 'Работаем в тесном сотрудничестве с клиентами, как с надежными партнерами'
              }
            ].map((value, index) => (
              <div key={index} className="card text-center">
                <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-white text-opacity-80">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Наша команда
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Александр Петров',
                position: 'Генеральный директор',
                experience: '8 лет в маркетинге'
              },
              {
                name: 'Мария Иванова',
                position: 'Руководитель отдела SMM',
                experience: '6 лет в социальных сетях'
              },
              {
                name: 'Дмитрий Соколов',
                position: 'SEO специалист',
                experience: '5 лет в поисковой оптимизации'
              }
            ].map((member, index) => (
              <div key={index} className="card text-center">
                <div className="w-20 h-20 bg-webmart-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                <p className="text-webmart-accent mb-2">{member.position}</p>
                <p className="text-white text-opacity-70 text-sm">{member.experience}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Approach Section */}
        <div className="card mb-16">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Наш подход к работе
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Анализ</h3>
              <p className="text-white text-opacity-80 mb-4">
                Глубокий анализ вашего бизнеса, конкурентов и рынка для понимания текущей ситуации.
              </p>
              <ul className="space-y-2 text-white text-opacity-80">
                <li>• Анализ конкурентов</li>
                <li>• Исследование аудитории</li>
                <li>• Оценка текущих показателей</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">Стратегия</h3>
              <p className="text-white text-opacity-80 mb-4">
                Разработка индивидуальной маркетинговой стратегии с учетом ваших целей и бюджета.
              </p>
              <ul className="space-y-2 text-white text-opacity-80">
                <li>• Определение целей</li>
                <li>• Выбор каналов продвижения</li>
                <li>• Планирование бюджета</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">Реализация</h3>
              <p className="text-white text-opacity-80 mb-4">
                Профессиональная реализация запланированных мероприятий с контролем качества.
              </p>
              <ul className="space-y-2 text-white text-opacity-80">
                <li>• Создание контента</li>
                <li>• Настройка рекламы</li>
                <li>• Техническая реализация</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">Аналитика</h3>
              <p className="text-white text-opacity-80 mb-4">
                Постоянный мониторинг результатов и оптимизация кампаний для достижения лучших показателей.
              </p>
              <ul className="space-y-2 text-white text-opacity-80">
                <li>• Отчетность</li>
                <li>• A/B тестирование</li>
                <li>• Масштабирование</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center card">
          <h2 className="text-3xl font-bold text-white mb-4">
            Готовы работать вместе?
          </h2>
          <p className="text-white text-opacity-80 mb-6 max-w-md mx-auto">
            Свяжитесь с нами для обсуждения вашего проекта и начала плодотворного сотрудничества
          </p>
          <a href="/contacts" className="btn-primary">
            Связаться с нами
          </a>
        </div>
      </div>
    </div>
  )
}



