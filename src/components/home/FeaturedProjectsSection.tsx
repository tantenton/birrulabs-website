import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PROJECTS } from '@/data/projects';
import ProjectCardLarge from './ProjectCardLarge';
import ProjectCardSmall from './ProjectCardSmall';
import type { Locale } from '@/lib/translations';
import { getT } from '@/lib/translations';

interface FeaturedProjectsSectionProps {
  locale: Locale;
}

export default function FeaturedProjectsSection({ locale }: FeaturedProjectsSectionProps) {
  const t = getT(locale);
  const featured = PROJECTS.filter((p) => p.featured).slice(0, 3);
  const [large, ...smalls] = featured;

  return (
    <section className="section-divider">
      <div className="section-container py-24 md:py-32">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="label-mono mb-4">Internal Lab</p>
            <h2 className="text-[32px] md:text-[40px] leading-[1.15] tracking-[-0.015em]
                           font-semibold text-[#e2e2e8] mb-3">
              {t.projects.title}
            </h2>
            <p className="text-[16px] leading-[1.6] text-[#c7c4d7] max-w-lg">
              {t.projects.subtitle}
            </p>
          </div>
          <Link
            href={`/${locale}/projects`}
            className="hidden md:inline-flex items-center gap-1.5
                       font-mono text-[12px] tracking-[0.05em] text-[#c7c4d7]
                       hover:text-[#e2e2e8] transition-colors flex-shrink-0"
          >
            {t.projects.view_all}
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Large card — 8 cols */}
          {large && (
            <div className="lg:col-span-8">
              <ProjectCardLarge project={large} locale={locale} />
            </div>
          )}

          {/* Small cards column — 4 cols */}
          {smalls.length > 0 && (
            <div className="lg:col-span-4 flex flex-col gap-6">
              {smalls.map((p) => (
                <ProjectCardSmall key={p.id} project={p} locale={locale} />
              ))}
            </div>
          )}
        </div>

        {/* Mobile view all */}
        <div className="mt-8 md:hidden text-center">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-1.5
                       font-mono text-[12px] tracking-[0.05em] text-[#6366F1]
                       hover:text-[#c0c1ff] transition-colors"
          >
            {t.projects.view_all}
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
