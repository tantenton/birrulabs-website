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
      <div className="section-container py-20 md:py-28">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="label-mono mb-3">Internal Lab</p>
            <h2 className="text-headline-lg text-text-primary">
              {t.projects.title}
            </h2>
          </div>
          <Link
            href={`/${locale}/projects`}
            className="hidden md:inline-flex items-center gap-1.5
                       font-mono text-code-label text-text-secondary
                       hover:text-text-primary transition-colors"
          >
            {t.projects.view_all}
            <ArrowRight className="w-3 h-3" aria-hidden="true" />
          </Link>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Large card — 8 cols */}
          {large && (
            <div className="lg:col-span-8">
              <ProjectCardLarge project={large} locale={locale} />
            </div>
          )}

          {/* Small cards column — 4 cols */}
          {smalls.length > 0 && (
            <div className="lg:col-span-4 flex flex-col gap-gutter">
              {smalls.map((p) => (
                <ProjectCardSmall key={p.id} project={p} locale={locale} />
              ))}
            </div>
          )}
        </div>

        {/* Mobile view all */}
        <div className="mt-8 md:hidden">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-1.5
                       font-mono text-code-label text-brand-primary"
          >
            {t.projects.view_all}
            <ArrowRight className="w-3 h-3" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
