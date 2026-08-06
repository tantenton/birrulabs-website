'use client';

import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

interface StaggerProps {
  children: React.ReactNode[];
  className?: string;
  staggerMs?: number;
  direction?: 'up' | 'none';
}

/**
 * Stagger animation for card groups.
 * Each child gets progressively longer delay.
 */
export default function Stagger({
  children,
  className,
  staggerMs = 80,
  direction = 'up',
}: StaggerProps) {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className={cn(className)}>
      {children.map((child, i) => (
        <div
          key={i}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView
              ? 'none'
              : direction === 'up' ? 'translateY(16px)' : 'none',
            transition: `opacity 0.45s cubic-bezier(0.16,1,0.3,1) ${i * staggerMs}ms, transform 0.45s cubic-bezier(0.16,1,0.3,1) ${i * staggerMs}ms`,
            willChange: inView ? 'auto' : 'opacity, transform',
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
