import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { ARTICLES } from '@/data/articles';
import type { Locale } from '@/lib/translations';
import { getT } from '@/lib/translations';

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

  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F0F2F5]">

      {/* BREADCRUMB */}
      <section className="px-4 py-6 border-b border-[#2D3036]">
        <div className="max-w-3xl mx-auto">
          <Link
            href={`/${l}/articles`}
            className="inline-flex items-center gap-2 text-[#A3A6AC] hover:text-[#F0F2F5] text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            {l === 'id' ? 'Kembali ke Artikel' : 'Back to Articles'}
          </Link>
        </div>
      </section>

      {/* HEADER */}
      <article className="px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-6 text-sm text-[#6C6F75]">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              {new Date(article.publishedAt).toLocaleDateString(l === 'id' ? 'id-ID' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" aria-hidden="true" />
              {article.readingTime} {l === 'id' ? 'menit' : 'min'}
            </span>
            <span className="px-2 py-1 rounded bg-[#1A1D23] text-xs">{article.category}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{article.title[l]}</h1>
          <p className="text-xl text-[#A3A6AC] leading-relaxed mb-8">{article.excerpt[l]}</p>
          <div className="text-sm text-[#6C6F75] mb-10">
            {l === 'id' ? 'Oleh' : 'By'} {article.author}
          </div>

          {/* CONTENT */}
          <div className="prose prose-invert prose-indigo max-w-none">
            <div
              className="text-[#A3A6AC] leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: article.content[l].replace(/\n/g, '<br />') }}
            />
          </div>

          {/* TAGS */}
          <div className="mt-12 pt-8 border-t border-[#2D3036]">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-[#16191F] border border-[#2D3036] text-sm text-[#6C6F75]">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* RELATED */}
      <section className="px-4 py-12 bg-[#16191F] border-t border-[#2D3036]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-6">
            {l === 'id' ? 'Artikel Lainnya' : 'Other Articles'}
          </h2>
          <div className="space-y-4">
            {ARTICLES.filter((a) => a.id !== article.id)
              .slice(0, 2)
              .map((a) => (
                <Link
                  key={a.id}
                  href={`/${l}/articles/${a.slug}`}
                  className="block p-4 rounded-lg bg-[#0F1115] border border-[#2D3036] hover:border-indigo-500/40 transition-all"
                >
                  <h3 className="font-semibold mb-2 hover:text-indigo-400 transition-colors">{a.title[l]}</h3>
                  <p className="text-sm text-[#A3A6AC] leading-relaxed">{a.excerpt[l]}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>

    </div>
  );
}
