import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';
import type { Project } from '@/data/projects';
import type { Locale } from '@/lib/translations';

const STATUS_MAP: Record<string, import('@/components/ui/StatusBadge').StatusVariant> = {
  'Internal Alpha': 'alpha',
  'Live':           'live',
  'Prototype':      'prototype',
  'In Development': 'development',
  'Research':       'research',
  'Pilot':          'pilot',
  'Experimental':   'experimental',
};

interface ProjectCardSmallProps {
  project: Project;
  locale: Locale;
}

export default function ProjectCardSmall({ project, locale }: ProjectCardSmallProps) {
  const variant = STATUS_MAP[project.status] ?? 'development';

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl flex-1
                    bg-[#161920] border border-[rgba(255,255,255,0.07)]
                    hover:border-[rgba(99,102,241,0.25)]
                    transition-all duration-300
                    hover:shadow-[0_4px_24px_rgba(99,102,241,0.10)]">

      {/* Top glow */}
      <div className="absolute inset-x-0 top-0 h-px
                      bg-gradient-to-r from-transparent via-[rgba(99,102,241,0)] to-transparent
                      group-hover:via-[rgba(99,102,241,0.4)]
                      transition-all duration-500"
           aria-hidden="true" />

      {/* Image area */}
      <div className="relative h-28 bg-[#0F1215] border-b border-[rgba(255,255,255,0.06)] overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-grid opacity-30" aria-hidden="true" />
        <div
          className="absolute inset-0 transition-opacity duration-500 opacity-10 group-hover:opacity-25"
          style={{
            background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(99,102,241,0.6), transparent)',
          }}
          aria-hidden="true"
        />
        <div className="absolute top-3 left-3">
          <StatusBadge variant={variant} label={project.status} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-[16px] leading-[1.35] font-semibold
                         text-[#e2e2e8] group-hover:text-white transition-colors duration-200">
            {project.title[locale]}
          </h3>
          <p className="text-[13px] leading-[1.55] text-[#908fa0] line-clamp-2">
            {project.summary[locale]}
          </p>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-[rgba(255,255,255,0.06)]">
          <span className="font-mono text-[11px] text-[#908fa0] tracking-[0.03em]">
            {project.category}
          </span>
          <Link
            href={`/${locale}/projects/${project.slug}`}
            className="inline-flex items-center gap-1 font-mono text-[12px]
                       text-[#6366F1] hover:text-[#c0c1ff]
                       transition-colors duration-200 group/link"
            aria-label={`View ${project.title[locale]}`}
          >
            View
            <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover/link:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
