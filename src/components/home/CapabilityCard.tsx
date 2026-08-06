import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface CapabilityCardProps {
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  title: string;
  description: string;
}

export default function CapabilityCard({
  icon: Icon,
  iconColor,
  iconBg,
  title,
  description,
}: CapabilityCardProps) {
  return (
    <div className="card group p-8 flex flex-col gap-6">
      {/* Icon */}
      <div className={cn('inline-flex p-2.5 rounded w-fit', iconBg)}>
        <Icon className={cn('w-5 h-5', iconColor)} aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3">
        <h3 className="text-headline-sm text-text-primary group-hover:text-brand-primary transition-colors">
          {title}
        </h3>
        <p className="text-body-sm text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>

      {/* Bottom accent line */}
      <div className={cn(
        'h-px w-0 group-hover:w-full transition-all duration-300 ease-out',
        iconColor.replace('text-', 'bg-').replace('/80', '/30').replace('/70', '/30'),
      )} aria-hidden="true" />
    </div>
  );
}
