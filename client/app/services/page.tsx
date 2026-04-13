"use client";

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { apiClient, ServiceCategory } from '../../lib/api'

export default function ServicesPage() {
  const [category, setCategory] = useState<ServiceCategory | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDesignCategory = async () => {
      try {
        const data = await apiClient.getCategory('design')
        setCategory(data)
      } catch (err) {
        console.error('Failed to fetch design services:', err)
        setError('Не удалось загрузить услуги')
      } finally {
        setLoading(false)
      }
    }

    fetchDesignCategory()
  }, [])

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Загрузка...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    )
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 pb-2">
            Дизайн-услуги
          </h1>
          <p className="text-xl text-white text-opacity-80 max-w-2xl mx-auto">
            Креативы, motion, UX/UI — дизайн для рекламы, сайтов и брендинга
          </p>
        </div>

        {/* Design Services */}
        {category && (
          <div className="space-y-16">
            <div id={category.slug} className="scroll-mt-24">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {category.name}
                </h2>
                <p className="text-white text-opacity-80">
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services?.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="card group hover:scale-105 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start gap-3 mb-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-webmart-accent transition-colors min-w-0 flex-1">
                        {service.name}
                      </h3>
                      <span className="text-webmart-accent font-semibold text-sm whitespace-nowrap shrink-0">
                        {service.packages?.[0]?.price || 'Цена по запросу'}
                      </span>
                    </div>

                    <p className="text-white text-opacity-80 mb-4">
                      {service.shortDescription}
                    </p>

                    <div className="text-webmart-accent group-hover:text-white transition-colors font-medium">
                      Подробнее →
                    </div>
                  </Link>
                )) || []}
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-16 py-12 card">
          <h2 className="text-3xl font-bold text-white mb-4">
            Нужен другой формат дизайна?
          </h2>
          <p className="text-white text-opacity-80 mb-6 max-w-md mx-auto">
            Расскажите о задаче — подберём решение под ваш проект
          </p>
          <Link href="/contacts" className="btn-primary">
            Оставить заявку
          </Link>
        </div>
      </div>
    </div>
  )
}


