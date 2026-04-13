'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { apiClient, BlogArticle } from '@/lib/api'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function ArticlePage() {
  const params = useParams()
  const slug = params.slug as string
  const [article, setArticle] = useState<BlogArticle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await apiClient.getBlogArticle(slug)
        setArticle(data)
      } catch {
        setError('Статья не найдена')
      } finally {
        setLoading(false)
      }
    }
    fetchArticle()
  }, [slug])

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Загрузка...</div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="card text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Статья не найдена</h1>
          <Link href="/blog" className="btn-primary">Вернуться в блог</Link>
        </div>
      </div>
    )
  }

  const paragraphs = article.content.split(/\n\n+/).filter(Boolean)

  return (
    <div className="pt-16 min-h-screen">
      <article className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="mb-8">
          <Link href="/blog" className="text-webmart-accent hover:text-white transition-colors text-sm">
            ← Блог
          </Link>
        </div>

        <header className="mb-10">
          <time className="text-webmart-text-muted text-sm block mb-2">
            {formatDate(article.createdAt)}
          </time>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {article.title}
          </h1>
          <p className="text-xl text-white text-opacity-80">
            {article.excerpt}
          </p>
        </header>

        {article.imageUrl && (
          <div className="aspect-video mb-10 overflow-hidden rounded-lg">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="prose prose-invert max-w-none">
          {paragraphs.map((block, i) => {
            if (block.startsWith('## ')) {
              return (
                <h2 key={i} className="text-2xl font-bold text-white mt-10 mb-4">
                  {block.replace(/^## /, '')}
                </h2>
              )
            }
            const parts = block.split(/(\*\*[^*]+\*\*)/g)
            return (
              <p key={i} className="text-white text-opacity-90 leading-relaxed mb-4">
                {parts.map((part, j) =>
                  /^\*\*[^*]+\*\*$/.test(part) ? (
                    <strong key={j} className="text-white font-semibold">{part.slice(2, -2)}</strong>
                  ) : (
                    part
                  )
                )}
              </p>
            )
          })}
        </div>

        <div className="mt-12 pt-8 border-t border-white border-opacity-20">
          <Link href="/blog" className="text-webmart-accent hover:text-white transition-colors font-medium">
            ← Все статьи
          </Link>
        </div>
      </article>
    </div>
  )
}
