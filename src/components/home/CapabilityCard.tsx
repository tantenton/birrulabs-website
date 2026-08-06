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
    <div className="group relative p-8 rounded-xl
                    bg-[#161920] border border-[rgba(255,255,255,0.06)]
                    hover:border-[rgba(255,255,255,0.12)]
                    transition-all duration-300
                    hover:-translate-y-0.5">
      {/* Subtle glow on hover */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
                      transition-opacity duration-300 pointer-events-none"
           style={{
             background: 'radial-gradient(circle at 50% 0%, rgba(99,102,241,0.06), transparent 60%)',
           }}
           aria-hidden="true"
      />

      <div className="relative">
        {/* Icon */}
        <div className={cn('inline-flex p-3 rounded-lg mb-6', iconBg)}>
          <Icon className={cn('w-6 h-6', iconColor)} aria-hidden="true" />
        </div>

        {/* Content */}
        <h3 className="text-[20px] leading-[1.3] tracking-[-0.01em] font-semibold
                       text-[#e2e2e8] mb-3
                       group-hover:text-[#6366F1] transition-colors duration-200">
          {title}
        </h3>
        <p className="text-[14px] leading-[1.6] text-[#c7c4d7]">
          {description}
        </p>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-8 right-8 h-px
                      bg-gradient-to-r from-transparent via-[rgba(99,102,241,0.3)] to-transparent
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-300"
           aria-hidden="true"
      />
    </div>
  );
}
