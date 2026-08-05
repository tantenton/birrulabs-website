import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { ARTICLES } from '@/data/articles';
import { getT } from '@/lib/translations';
import type { Locale } from '@/lib/translations';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = getT(locale as Locale);
  return {
    title: `${t.articles.title} | BirruLabs`,
    description: t.articles.subtitle,
  };
}

export default async function ArticlesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const t = getT(l);

  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F0F2F5]">

      {/* HEADER */}
      <section className="px-4 py-20 md:py-24 border-b border-[#2D3036]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.articles.title}</h1>
          <p className="text-xl text-[#A3A6AC]">{t.articles.subtitle}</p>
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section className="px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {ARTICLES.map((article) => (
            <Link
              key={article.id}
              href={`/${l}/articles/${article.slug}`}
              className="group block p-6 rounded-xl bg-[#16191F] border border-[#2D3036] hover:border-indigo-500/40 transition-all"
            >
              <div className="flex items-center gap-4 mb-4 text-sm text-[#6C6F75]">
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
                <span className="px-2 py-0.5 rounded bg-[#1A1D23] text-xs">{article.category}</span>
              </div>
              <h2 className="text-2xl font-semibold mb-3 group-hover:text-indigo-400 transition-colors">
                {article.title[l]}
              </h2>
              <p className="text-[#A3A6AC] leading-relaxed mb-4">{article.excerpt[l]}</p>
              <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium">
                {t.articles.read_more}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
