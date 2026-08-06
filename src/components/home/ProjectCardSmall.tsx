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
    <div className="card group flex flex-col overflow-hidden flex-1">
      {/* Image area */}
      <div className="relative h-28 bg-surface border-b border-border-subtle overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
        <div
          className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(99,102,241,0.5), transparent)',
          }}
          aria-hidden="true"
        />
        <div className="absolute top-3 left-3">
          <StatusBadge variant={variant} label={project.status} />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-body-lg font-semibold text-text-primary">
            {project.title[locale]}
          </h3>
          <p className="text-body-sm text-text-secondary line-clamp-2">
            {project.summary[locale]}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-status-label text-text-tertiary">
            {project.category}
          </span>
          <Link
            href={`/${locale}/projects/${project.slug}`}
            className="text-brand-primary hover:text-brand-primary-dim transition-colors"
            aria-label={`View ${project.title[locale]}`}
          >
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
