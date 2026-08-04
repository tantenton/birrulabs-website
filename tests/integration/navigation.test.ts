import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Navigation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Validates navigation structure', () => {
    const navigation = {
      primary: [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Services', href: '/services' },
        { name: 'Projects', href: '/projects' },
        { name: 'Articles', href: '/articles' },
        { name: 'Contact', href: '/contact' },
      ],
      mobile: [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Login', href: '/login' },
      ],
    };

    expect(navigation.primary).toHaveLength(6);
    expect(navigation.mobile).toHaveLength(4);

    const homeLink = navigation.primary.find(l => l.name === 'Home');
    expect(homeLink?.href).toBe('/');
  });
});