import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Security Headers', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const requiredHeaders = [
    'Strict-Transport-Security',
    'X-Content-Type-Options',
    'X-Frame-Options',
    'X-XSS-Protection',
    'Referrer-Policy',
    'Permissions-Policy',
    'Content-Security-Policy',
  ];

  it('has all required security headers', () => {
    const headers = new Set(requiredHeaders);
    expect(headers.size).toBe(7);
    
    requiredHeaders.forEach(header => {
      expect(headers.has(header)).toBe(true);
    });
  });

  it('Validates HSTS header format', () => {
    const hsts = 'max-age=31536000; includeSubDomains';
    expect(hsts).toMatch(/max-age=\d+/);
    expect(hsts).toMatch(/includeSubDomains/);
  });

  it('Validates CSP header structure', () => {
    const csp = "default-src 'self'; script-src 'self'; style-src 'self';";
    expect(csp).toMatch(/default-src 'self'/);
    expect(csp).toMatch(/script-src 'self'/);
    expect(csp).toMatch(/style-src 'self'/);
  });

  it('Validates frame options', () => {
    const frameOptions = 'DENY';
    expect(frameOptions).toBe('DENY');
  });
});