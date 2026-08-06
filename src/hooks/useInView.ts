'use client';

import { useState, useEffect, useRef, type RefObject } from 'react';

/**
 * Lightweight IntersectionObserver hook.
 * Returns [ref, isInView] — once in view, stays true.
 * No-ops when prefers-reduced-motion is set (always returns true).
 */
export function useInView<T extends Element>(
  options: IntersectionObserverInit = { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // If user prefers reduced motion, skip animation — show content immediately
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setInView(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return [ref, inView];
}
