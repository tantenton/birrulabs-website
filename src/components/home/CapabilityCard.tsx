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
    <div className="group relative p-8 rounded-xl overflow-hidden
                    bg-[#161920] border border-[rgba(255,255,255,0.07)]
                    hover:border-[rgba(255,255,255,0.14)]
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]">

      {/* Top glow on hover */}
      <div className="absolute inset-x-0 top-0 h-px
                      bg-gradient-to-r from-transparent via-[rgba(99,102,241,0)] to-transparent
                      group-hover:via-[rgba(99,102,241,0.45)]
                      transition-all duration-500"
           aria-hidden="true" />

      {/* Ambient bg glow */}
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full
                      opacity-0 group-hover:opacity-100 blur-2xl
                      transition-opacity duration-500 pointer-events-none"
           style={{ background: iconBg.replace('bg-', '').includes('rgba') ? iconBg : '' }}
           aria-hidden="true"
      />

      <div className="relative">
        {/* Icon */}
        <div className={cn(
          'inline-flex p-3 rounded-xl mb-6 transition-transform duration-300 group-hover:scale-110',
          iconBg
        )}>
          <Icon className={cn('w-6 h-6', iconColor)} aria-hidden="true" />
        </div>

        {/* Content */}
        <h3 className="text-[20px] leading-[1.3] tracking-[-0.015em] font-semibold
                       text-[#e2e2e8] mb-3
                       group-hover:text-white transition-colors duration-200">
          {title}
        </h3>
        <p className="text-[14px] leading-[1.65] text-[#908fa0]
                      group-hover:text-[#c7c4d7] transition-colors duration-200">
          {description}
        </p>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5
                      bg-gradient-to-r from-transparent via-[rgba(99,102,241,0.4)] to-transparent
                      translate-y-full group-hover:translate-y-0
                      transition-transform duration-300"
           aria-hidden="true" />
    </div>
  );
}
