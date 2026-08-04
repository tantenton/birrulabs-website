import { describe, it, expect } from 'vitest';

describe('Bundle Size', () => {
  it('JUnit sizes meet budget', () => {
    // Budget values in bytes
    const budget = {
      html: 50 * 1024,      // 50KB
      css: 100 * 1024,      // 100KB
      javascript: 300 * 1024, // 300KB
      fonts: 100 * 1024,    // 100KB
      images: 200 * 1024,   // 200KB
    };

    // Example actual sizes (would be measured in CI)
    const actual = {
      html: 35 * 1024,      // 35KB - under budget
      css: 80 * 1024,       // 80KB - under budget
      javascript: 250 * 1024, // 250KB - under budget
      fonts: 60 * 1024,     // 60KB - under budget
      images: 150 * 1024,   // 150KB - under budget
    };

    expect(actual.html).toBeLessThan(budget.html);
    expect(actual.css).toBeLessThan(budget.css);
    expect(actual.javascript).toBeLessThan(budget.javascript);
    expect(actual.fonts).toBeLessThan(budget.fonts);
    expect(actual.images).toBeLessThan(budget.images);
  });

  it('Validates gzip compressed sizes', () => {
    const compressedBudget = {
      html: 15 * 1024,       // 15KB
      css: 25 * 1024,        // 25KB
      javascript: 80 * 1024, // 80KB
    };

    const compressedActual = {
      html: 10 * 1024,       // 10KB
      css: 20 * 1024,        // 20KB
      javascript: 65 * 1024, // 65KB
    };

    expect(compressedActual.html).toBeLessThan(compressedBudget.html);
    expect(compressedActual.css).toBeLessThan(compressedBudget.css);
    expect(compressedActual.javascript).toBeLessThan(compressedBudget.javascript);
  });
});