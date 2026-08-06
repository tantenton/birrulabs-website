import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';
import TechChip from '@/components/ui/TechChip';
import type { Project } from '@/data/projects';
import type { Locale } from '@/lib/translations';

interface ProjectCardLargeProps {
  project: Project;
  locale: Locale;
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

export default function ProjectCardLarge({ project, locale }: ProjectCardLargeProps) {
  const variant = STATUS_MAP[project.status] ?? 'development';

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl h-full
                    bg-[#161920] border border-[rgba(255,255,255,0.07)]
                    hover:border-[rgba(99,102,241,0.3)]
                    transition-all duration-300
                    hover:shadow-[0_8px_40px_rgba(99,102,241,0.12)]">

      {/* Top glow on hover */}
      <div className="absolute inset-x-0 top-0 h-px
                      bg-gradient-to-r from-transparent via-[rgba(99,102,241,0)] to-transparent
                      group-hover:via-[rgba(99,102,241,0.5)]
                      transition-all duration-500"
           aria-hidden="true" />

      {/* Image area */}
      <div className="relative h-56 bg-[#0F1215] border-b border-[rgba(255,255,255,0.06)] overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
        <div
          className="absolute inset-0 transition-opacity duration-500
                     opacity-20 group-hover:opacity-40"
          style={{
            background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(99,102,241,0.5), transparent)',
          }}
          aria-hidden="true"
        />
        {/* Animated scan line */}
        <div
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[rgba(99,102,241,0.4)] to-transparent
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ top: '40%' }}
          aria-hidden="true"
        />
        <div className="absolute top-4 left-4">
          <StatusBadge variant={variant} label={project.status} />
        </div>
        {/* Category tag top right */}
        <div className="absolute top-4 right-4">
          <span className="font-mono text-[11px] text-[#908fa0] bg-[rgba(10,12,16,0.8)]
                           px-2.5 py-1 rounded border border-[rgba(255,255,255,0.08)]">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-7 flex-1 flex flex-col justify-between gap-5">
        <div className="flex flex-col gap-3">
          <h3 className="text-[22px] leading-[1.25] tracking-[-0.015em] font-semibold
                         text-[#e2e2e8] group-hover:text-white transition-colors duration-200">
            {project.title[locale]}
          </h3>
          <p className="text-[14px] leading-[1.65] text-[#c7c4d7]">
            {project.summary[locale]}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-4 pt-4
                        border-t border-[rgba(255,255,255,0.06)]">
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 3).map((tech) => (
              <TechChip key={tech} label={tech} />
            ))}
            {project.techStack.length > 3 && (
              <TechChip label={`+${project.techStack.length - 3}`} />
            )}
          </div>
          <Link
            href={`/${locale}/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 font-mono text-[12px] tracking-[0.03em]
                       text-[#6366F1] hover:text-[#c0c1ff]
                       transition-colors duration-200 flex-shrink-0 group/link"
          >
            View project
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
