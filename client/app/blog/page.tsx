'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { apiClient, BlogArticle } from '@/lib/api'

export default function BlogPage() {
  const [articles, setArticles] = useState<BlogArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await apiClient.getBlogArticles()
        setArticles(data)
      } catch {
        setArticles([])
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Загрузка...</div>
      </div>
    )
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Блог</h1>
          <p className="text-xl text-white text-opacity-80 max-w-2xl">
            Статьи об интернет-маркетинге, продвижении и digital-инструментах
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="card group hover:scale-[1.02] transition-transform"
            >
              {article.imageUrl && (
                <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              )}
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-webmart-accent transition-colors">
                {article.title}
              </h2>
              <p className="text-white text-opacity-80 text-sm line-clamp-3 mb-4">
                {article.excerpt}
              </p>
              <span className="text-webmart-accent text-sm font-medium group-hover:text-white transition-colors">
                Читать →
              </span>
            </Link>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-16 text-white text-opacity-80">
            Пока нет статей
          </div>
        )}
      </div>
    </div>
  )
}
