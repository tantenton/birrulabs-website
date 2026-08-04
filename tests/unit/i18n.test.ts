import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

// Mock translations
const translations = {
  id: {
    'hero.title': 'Membangun solusi berbasis AI',
    'hero.subtitle': 'Mengutamakan manusia, eksperimental, dan practical',
    'nav.contact': 'Kontak',
    'nav.projects': 'Projects',
    'cta.getStarted': 'Mulai Proyek',
  },
  en: {
    'hero.title': 'Building human-centered AI',
    'hero.subtitle': 'Experimental, and practical solutions',
    'nav.contact': 'Contact',
    'nav.projects': 'Projects',
    'cta.getStarted': 'Get Started',
  },
};

describe('i18n', () => {
  describe('Indonesian translations', () => {
    it('has required translation keys', () => {
      const t = translations.id;
      expect(t['hero.title']).toBeDefined();
      expect(t['hero.subtitle']).toBeDefined();
      expect(t['nav.contact']).toBe('Kontak');
    });
  });

  describe('English translations', () => {
    it('has required translation keys', () => {
      const t = translations.en;
      expect(t['hero.title']).toBeDefined();
      expect(t['hero.subtitle']).toBeDefined();
      expect(t['nav.contact']).toBe('Contact');
    });
  });
});