import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, Clock, Share2, Link2 } from 'lucide-react';
import { ARTICLES } from '@/data/articles';
import type { Locale } from '@/lib/translations';
import { getT } from '@/lib/translations';
import ReadingProgress from '@/components/article/ReadingProgress';
import ShareButton from '@/components/article/ShareButton';

export async function generateStaticParams() {
  const locales = ['id', 'en'] as const;
  const paths: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const article of ARTICLES) {
      paths.push({ locale, slug: article.slug });
    }
  }
  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const l = locale as Locale;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return { title: 'Article Not Found' };
  return {
    title: `${article.title[l]} | BirruLabs`,
    description: article.excerpt[l],
    openGraph: {
      title: article.title[l],
      description: article.excerpt[l],
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author],
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const l = locale as Locale;
  const t = getT(l);
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = ARTICLES.filter((a) => a.id !== article.id);
  const currentIdx = ARTICLES.findIndex((a) => a.slug === slug);
  const prevArticle = currentIdx > 0 ? ARTICLES[currentIdx - 1] : null;
  const nextArticle = currentIdx < ARTICLES.length - 1 ? ARTICLES[currentIdx + 1] : null;

  const baseUrl = 'https://birrulabs.biz.id';
  const articleUrl = `${baseUrl}/${l}/articles/${slug}`;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title[l],
    description: article.excerpt[l],
    author: { '@type': 'Person', name: article.author },
    publisher: {
      '@type': 'Organization',
      name: 'BirruLabs',
      url: baseUrl,
    },
    datePublished: article.publishedAt,
    url: articleUrl,
    inLanguage: l === 'id' ? 'id-ID' : 'en-US',
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${baseUrl}/${l}` },
      { '@type': 'ListItem', position: 2, name: l === 'id' ? 'Artikel' : 'Articles', item: `${baseUrl}/${l}/articles` },
      { '@type': 'ListItem', position: 3, name: article.title[l], item: articleUrl },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0A0C10] text-[#e2e2e8]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <ReadingProgress />

      {/* BREADCRUMB */}
      <div className="border-b border-[rgba(255,255,255,0.06)]">
        <div className="section-container py-4">
          <Link
            href={`/${l}/articles`}
            className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.03em]
                       text-[#908fa0] hover:text-[#e2e2e8] transition-colors duration-150"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            {l === 'id' ? 'Kembali ke Artikel' : 'Back to Articles'}
          </Link>
        </div>
      </div>

      {/* ARTICLE HEADER */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" aria-hidden="true" />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(99,102,241,0.08), transparent)' }}
          aria-hidden="true"
        />
        <div className="relative section-container py-16 md:py-20 max-w-3xl">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded font-mono text-[11px]
                             border border-[rgba(99,102,241,0.2)]
                             bg-[rgba(99,102,241,0.06)] text-[#6366F1]">
              {article.category}
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#908fa0]">
              <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
              {new Date(article.publishedAt).toLocaleDateString(l === 'id' ? 'id-ID' : 'en-US', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#908fa0]">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              {article.readingTime} {l === 'id' ? 'menit baca' : 'min read'}
            </span>
          </div>

          <h1 className="text-[36px] md:text-[48px] leading-[1.1] tracking-[-0.02em]
                         font-bold text-[#e2e2e8] mb-6">
            {article.title[l]}
          </h1>

          <p className="text-[20px] leading-[1.65] text-[#c7c4d7] mb-8">
            {article.excerpt[l]}
          </p>

          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-[13px] text-[#908fa0]">
              {l === 'id' ? 'Oleh' : 'By'}{' '}
              <span className="text-[#e2e2e8]">{article.author}</span>
            </span>
            <ShareButton locale={l} title={article.title[l]} />
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="section-container py-12 md:py-16">
        <div className="max-w-3xl mx-auto">

          {/* Article body */}
          <article
            className="prose-birrulabs"
            dangerouslySetInnerHTML={{
              __html: article.content[l]
                .replace(/\n\n/g, '</p><p>')
                .replace(/\n/g, '<br />')
                .replace(/^/, '<p>')
                .replace(/$/, '</p>')
                .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                .replace(/`(.+?)`/g, '<code>$1</code>')
                .replace(/#{3}\s(.+)/g, '<h3>$1</h3>')
                .replace(/#{2}\s(.+)/g, '<h2>$1</h2>')
            }}
          />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.06)]">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded font-mono text-[12px]
                             text-[#908fa0] bg-[rgba(255,255,255,0.04)]
                             border border-[rgba(255,255,255,0.07)]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Prev / Next */}
          <nav className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.06)]
                          grid grid-cols-1 sm:grid-cols-2 gap-4"
               aria-label="Article navigation">
            {prevArticle ? (
              <Link
                href={`/${l}/articles/${prevArticle.slug}`}
                className="group flex flex-col gap-1 p-5 rounded-xl
                           bg-[#161920] border border-[rgba(255,255,255,0.07)]
                           hover:border-[rgba(99,102,241,0.3)]
                           transition-all duration-200"
              >
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#908fa0] mb-1">
                  <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  {l === 'id' ? 'Sebelumnya' : 'Previous'}
                </span>
                <span className="text-[14px] font-semibold text-[#e2e2e8]
                                 group-hover:text-white transition-colors line-clamp-2">
                  {prevArticle.title[l]}
                </span>
              </Link>
            ) : <div />}
            {nextArticle ? (
              <Link
                href={`/${l}/articles/${nextArticle.slug}`}
                className="group flex flex-col gap-1 p-5 rounded-xl text-right
                           bg-[#161920] border border-[rgba(255,255,255,0.07)]
                           hover:border-[rgba(99,102,241,0.3)]
                           transition-all duration-200"
              >
                <span className="flex items-center justify-end gap-1.5 font-mono text-[11px] text-[#908fa0] mb-1">
                  {l === 'id' ? 'Selanjutnya' : 'Next'}
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
                <span className="text-[14px] font-semibold text-[#e2e2e8]
                                 group-hover:text-white transition-colors line-clamp-2">
                  {nextArticle.title[l]}
                </span>
              </Link>
            ) : <div />}
          </nav>
        </div>
      </div>

      {/* RELATED */}
      <section className="border-t border-[rgba(255,255,255,0.06)] bg-[#0F1215]">
        <div className="section-container py-16">
          <h2 className="text-[22px] font-semibold text-[#e2e2e8] mb-8">
            {l === 'id' ? 'Artikel Lainnya' : 'Other Articles'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
            {related.slice(0, 2).map((a) => (
              <Link
                key={a.id}
                href={`/${l}/articles/${a.slug}`}
                className="group p-6 rounded-xl
                           bg-[#161920] border border-[rgba(255,255,255,0.07)]
                           hover:border-[rgba(99,102,241,0.25)]
                           transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-[11px] text-[#6366F1]">{a.category}</span>
                  <span className="font-mono text-[11px] text-[#908fa0]">· {a.readingTime} min</span>
                </div>
                <h3 className="text-[15px] font-semibold text-[#e2e2e8]
                               group-hover:text-white transition-colors line-clamp-2 mb-2">
                  {a.title[l]}
                </h3>
                <p className="text-[13px] leading-[1.6] text-[#908fa0] line-clamp-2">
                  {a.excerpt[l]}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
