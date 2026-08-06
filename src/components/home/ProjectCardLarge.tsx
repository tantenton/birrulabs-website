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
    <div className="card group flex flex-col overflow-hidden">
      {/* Image area */}
      <div className="relative h-56 bg-surface border-b border-border-subtle overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
        <div
          className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(99,102,241,0.4), transparent)',
          }}
          aria-hidden="true"
        />
        {/* Status badge */}
        <div className="absolute top-4 left-4">
          <StatusBadge variant={variant} label={project.status} />
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex-1 flex flex-col justify-between gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-headline-sm text-text-primary">
              {project.title[locale]}
            </h3>
            <span className="font-mono text-code-label text-text-tertiary border border-border-subtle px-2 py-1 rounded whitespace-nowrap flex-shrink-0">
              {project.category}
            </span>
          </div>
          <p className="text-body-sm text-text-secondary leading-relaxed">
            {project.summary[locale]}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-4">
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
            className="inline-flex items-center gap-1 font-mono text-code-label
                       text-brand-primary hover:text-brand-primary-dim
                       transition-colors flex-shrink-0"
          >
            View project <ArrowRight className="w-3 h-3" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
