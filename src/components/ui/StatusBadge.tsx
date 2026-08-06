import { cn } from '@/lib/utils';

export type StatusVariant =
  | 'alpha'
  | 'live'
  | 'prototype'
  | 'development'
  | 'research'
  | 'pilot'
  | 'experimental';

const VARIANT_STYLES: Record<StatusVariant, string> = {
  live:         'bg-brand-accent/10 text-brand-accent border-brand-accent/20',
  alpha:        'bg-brand-accent/10 text-brand-accent border-brand-accent/20',
  prototype:    'bg-brand-warning/10 text-brand-warning border-brand-warning/20',
  development:  'bg-blue-500/10 text-blue-400 border-blue-500/20',
  research:     'bg-purple-500/10 text-purple-400 border-purple-500/20',
  pilot:        'bg-orange-500/10 text-orange-400 border-orange-500/20',
  experimental: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
};

const DOT_COLORS: Record<StatusVariant, string> = {
  live:         'bg-brand-accent animate-pulse-dot',
  alpha:        'bg-brand-accent animate-pulse-dot',
  prototype:    'bg-brand-warning',
  development:  'bg-blue-400',
  research:     'bg-purple-400',
  pilot:        'bg-orange-400',
  experimental: 'bg-pink-400',
};

interface StatusBadgeProps {
  variant: StatusVariant;
  label: string;
  className?: string;
}

export default function StatusBadge({ variant, label, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'status-badge',
        VARIANT_STYLES[variant],
        className,
      )}
    >
      <span
        className={cn('h-1.5 w-1.5 rounded-full flex-shrink-0', DOT_COLORS[variant])}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}
