import { cn } from '@/lib/utils';

interface TechChipProps {
  label: string;
  className?: string;
}

export default function TechChip({ label, className }: TechChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-1 rounded',
        'bg-surface-container border border-border-subtle',
        'font-mono text-status-label text-text-secondary',
        className,
      )}
    >
      {label}
    </span>
  );
}
