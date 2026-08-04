import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Accessibility', () => {
  const accessibleComponent = () => (
    <main>
      <h1>Accessible Page</h1>
      <p>Content with proper accessibility</p>
      <button aria-label="Click me">Button</button>
    </main>
  );

  it('has proper heading structure', () => {
    render(accessibleComponent());
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Accessible Page');
  });

  it('has accessible button with aria-label', () => {
    render(accessibleComponent());
    expect(screen.getByRole('button', { name: /Click me/i })).toBeInTheDocument();
  });
});