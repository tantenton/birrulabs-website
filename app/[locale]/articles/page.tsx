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

const TAGS = ['All', 'AI Agents', 'Automation', 'Engineering', 'Build in Public', 'Case Study'];

export default async function ArticlesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const t = getT(l);

  return (
    <div className="min-h-screen bg-[#0A0C10] text-[#e2e2e8]">

      {/* HEADER */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-25" aria-hidden="true" />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(99,102,241,0.08), transparent)' }}
          aria-hidden="true"
        />
        <div className="relative section-container py-20 md:py-28">
          <p className="label-mono mb-4">Knowledge Hub</p>
          <h1 className="text-[40px] md:text-[56px] leading-[1.05] tracking-[-0.02em]
                         font-bold text-[#e2e2e8] mb-5 max-w-2xl">
            {t.articles.title}
          </h1>
          <p className="text-[18px] leading-[1.65] text-[#c7c4d7] max-w-xl">
            {t.articles.subtitle}
          </p>
        </div>
      </section>

      {/* TAG FILTER */}
      <div className="sticky top-16 z-10 border-b border-[rgba(255,255,255,0.06)]
                      bg-[rgba(10,12,16,0.9)] backdrop-blur-xl">
        <div className="section-container py-4">
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="flex-shrink-0 px-4 py-1.5 rounded-full
                           font-mono text-[12px] tracking-[0.03em]
                           border border-[rgba(255,255,255,0.1)]
                           text-[#c7c4d7] bg-[#161920] cursor-default
                           hover:border-[rgba(99,102,241,0.3)] transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ARTICLES */}
      <section className="section-container py-16 md:py-20">
        <div className="max-w-2xl space-y-6">
          {ARTICLES.map((article) => (
            <Link
              key={article.id}
              href={`/${l}/articles/${article.slug}`}
              className="group block p-7 rounded-xl
                         bg-[#161920] border border-[rgba(255,255,255,0.07)]
                         hover:border-[rgba(99,102,241,0.3)]
                         transition-all duration-300
                         hover:-translate-y-0.5
                         hover:shadow-[0_8px_32px_rgba(99,102,241,0.1)]"
            >
              {/* Meta */}
              <div className="flex items-center flex-wrap gap-3 mb-4">
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#908fa0]">
                  <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                  {new Date(article.publishedAt).toLocaleDateString(l === 'id' ? 'id-ID' : 'en-US', {
                    year: 'numeric', month: 'long', day: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#908fa0]">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                  {article.readingTime} {l === 'id' ? 'menit' : 'min read'}
                </span>
                <span className="px-2.5 py-1 rounded font-mono text-[11px]
                                 border border-[rgba(99,102,241,0.2)]
                                 bg-[rgba(99,102,241,0.06)] text-[#6366F1]">
                  {article.category}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-[22px] leading-[1.3] tracking-[-0.01em] font-semibold
                             text-[#e2e2e8] mb-3
                             group-hover:text-white transition-colors duration-200">
                {article.title[l]}
              </h2>

              {/* Excerpt */}
              <p className="text-[15px] leading-[1.7] text-[#908fa0] mb-5">
                {article.excerpt[l]}
              </p>

              {/* Read more */}
              <div className="inline-flex items-center gap-1.5 font-mono text-[12px]
                              text-[#6366F1] group-hover:text-[#c0c1ff]
                              transition-colors duration-200">
                {t.articles.read_more}
                <ArrowRight
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-[rgba(255,255,255,0.06)]">
                  {article.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded font-mono text-[11px]
                                 text-[#908fa0] bg-[rgba(255,255,255,0.04)]
                                 border border-[rgba(255,255,255,0.07)]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
