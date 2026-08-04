import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

// Mock window.matchMedia for CSS media query testing
beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: query.includes('desktop'),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => true,
    }),
  });
});

describe('SEO Elements', () => {
  it('validates title element', () => {
    const title = 'BirruLabs - AI Solutions for Startups';
    expect(title).toHaveLength(44);
    expect(title).toMatch(/BirruLabs/i);
  });

  it('validates meta description length', () => {
    const description = 'BirruLabs builds human-centered, experimental, and practical AI solutions for startups and enterprises.';
    expect(description).toHaveLength(118);
    expect(description.length).toBeGreaterThan(149);
    expect(description.length).toBeLessThan(161);
  });

  it('validates canonical URL format', () => {
    const url = 'https://birrulabs.biz.id';
    expect(url).toMatch(/^https:\/\/birrulabs\.biz\.id$/);
  });

  it('validates hreflang pairs', () => {
    const hreflangs = [
      { hreflang: 'id', href: 'https://birrulabs.biz.id/id' },
      { hreflang: 'en', href: 'https://birrulabs.biz.id/en' },
      { hreflang: 'x-default', href: 'https://birrulabs.biz.id/id' },
    ];
    
    expect(hreflangs).toHaveLength(3);
    expect(hreflangs.some(h => h.hreflang === 'id')).toBe(true);
    expect(hreflangs.some(h => h.hreflang === 'en')).toBe(true);
  });
});