import { notFound } from 'next/navigation'

interface Article {
  title: string
  content: string
  date: string
}

async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articles: Record<string, Article> = {
    'getting-started': {
      title: 'Getting Started',
      content: '# Welcome to our blog\n\nThis is the getting started article.',
      date: '2026-08-01',
    },
    'another-article': {
      title: 'Another Article',
      content: '# Another piece of content\n\nMore details here.',
      date: '2026-08-03',
    },
  }

  return articles[slug] || null
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <time dateTime={article.date} className="block text-sm text-gray-500 mb-4">
        {article.date}
      </time>
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">{article.title}</h1>
      <div className="prose prose-sm sm:prose max-w-none">
        {article.content}
      </div>
    </article>
  )
}
