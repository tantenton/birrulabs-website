import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PROJECTS } from '@/data/projects';
import { getT } from '@/lib/translations';
import type { Locale } from '@/lib/translations';
import StatusBadge from '@/components/ui/StatusBadge';
import TechChip from '@/components/ui/TechChip';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = getT(locale as Locale);
  return {
    title: `${t.projects.title} | BirruLabs`,
    description: t.projects.subtitle,
  };
}

const STATUS_MAP: Record<string, import('@/components/ui/StatusBadge').StatusVariant> = {
  'Internal Alpha': 'alpha',
  'Live':           'live',
  'Prototype':      'prototype',
  'In Development': 'development',
  'Research':       'research',
  'Pilot':          'pilot',
  'Experimental':   'experimental',
};

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const t = getT(l);

  const categories = ['All', ...Array.from(new Set(PROJECTS.map((p) => p.category)))];

  return (
    <div className="min-h-screen bg-[#0A0C10] text-[#e2e2e8]">

      {/* PAGE HEADER */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" aria-hidden="true" />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(99,102,241,0.1), transparent)' }}
          aria-hidden="true"
        />
        <div className="relative section-container py-20 md:py-28">
          <p className="label-mono mb-4">Internal Lab</p>
          <h1 className="text-[40px] md:text-[56px] leading-[1.05] tracking-[-0.02em]
                         font-bold text-[#e2e2e8] mb-5 max-w-2xl">
            {t.projects.title}
          </h1>
          <p className="text-[18px] leading-[1.65] text-[#c7c4d7] max-w-xl">
            {t.projects.subtitle}
          </p>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <div className="sticky top-16 z-10 border-b border-[rgba(255,255,255,0.06)]
                      bg-[rgba(10,12,16,0.9)] backdrop-blur-xl">
        <div className="section-container py-4">
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {categories.map((cat) => (
              <span
                key={cat}
                className="flex-shrink-0 px-4 py-1.5 rounded-full
                           font-mono text-[12px] tracking-[0.03em]
                           border border-[rgba(255,255,255,0.1)]
                           text-[#c7c4d7] bg-[#161920] cursor-default
                           hover:border-[rgba(99,102,241,0.3)] transition-colors"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* PROJECTS GRID */}
      <section className="section-container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p) => {
            const variant = STATUS_MAP[p.status] ?? 'development';
            return (
              <Link
                key={p.id}
                href={`/${l}/projects/${p.slug}`}
                className="group relative flex flex-col rounded-xl overflow-hidden
                           bg-[#161920] border border-[rgba(255,255,255,0.07)]
                           hover:border-[rgba(99,102,241,0.3)]
                           transition-all duration-300
                           hover:-translate-y-1
                           hover:shadow-[0_8px_32px_rgba(99,102,241,0.12)]"
              >
                {/* Top accent */}
                <div className="absolute inset-x-0 top-0 h-px
                                bg-gradient-to-r from-transparent via-[rgba(99,102,241,0)] to-transparent
                                group-hover:via-[rgba(99,102,241,0.5)]
                                transition-all duration-500"
                     aria-hidden="true" />

                {/* Visual area */}
                <div className="relative h-36 bg-[#0F1215] border-b border-[rgba(255,255,255,0.06)] overflow-hidden">
                  <div className="absolute inset-0 bg-grid opacity-30" aria-hidden="true" />
                  <div
                    className="absolute inset-0 opacity-10 group-hover:opacity-25 transition-opacity duration-500"
                    style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(99,102,241,0.6), transparent)' }}
                    aria-hidden="true"
                  />
                  <div className="absolute top-3 left-3">
                    <StatusBadge variant={variant} label={p.status} />
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="font-mono text-[11px] text-[#908fa0]
                                     bg-[rgba(10,12,16,0.8)] px-2 py-1 rounded
                                     border border-[rgba(255,255,255,0.08)]">
                      {p.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 gap-3">
                  <h2 className="text-[18px] leading-[1.3] font-semibold text-[#e2e2e8]
                                 group-hover:text-white transition-colors duration-200">
                    {p.title[l]}
                  </h2>
                  <p className="text-[14px] leading-[1.65] text-[#908fa0] flex-1">
                    {p.summary[l]}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {p.techStack.slice(0, 4).map((tech) => (
                      <TechChip key={tech} label={tech} />
                    ))}
                    {p.techStack.length > 4 && (
                      <TechChip label={`+${p.techStack.length - 4}`} />
                    )}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-3 mt-1
                                  border-t border-[rgba(255,255,255,0.06)]">
                    <span className="font-mono text-[11px] text-[#908fa0] tracking-[0.03em]">
                      {l === 'id' ? 'Lihat detail' : 'View details'}
                    </span>
                    <ArrowRight
                      className="w-4 h-4 text-[#6366F1]
                                 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="section-container pb-20">
        <div className="p-4 rounded-lg border border-[rgba(255,255,255,0.06)]
                        bg-[#161920] font-mono text-[12px] text-[#908fa0] tracking-[0.02em]">
          {l === 'id'
            ? '// Semua proyek menampilkan status yang akurat. Tidak ada klaim palsu tentang pengguna, revenue, atau partnership.'
            : '// All projects display accurate status. No false claims about users, revenue, or partnerships.'}
        </div>
      </section>

    </div>
  );
}
