'use client';

import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  once?: boolean;
}

/**
 * Lightweight fade-in wrapper using IntersectionObserver.
 * Respects prefers-reduced-motion — skips animation entirely.
 */
export default function FadeIn({
  children,
  className,
  delay = 0,
  direction = 'up',
}: FadeInProps) {
  const [ref, inView] = useInView<HTMLDivElement>();

  const translateMap = {
    up:    'translateY(20px)',
    down:  'translateY(-20px)',
    left:  'translateX(20px)',
    right: 'translateX(-20px)',
    none:  'none',
  };

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : translateMap[direction],
        transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: inView ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
