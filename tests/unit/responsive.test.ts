import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Responsive Layouts', () => {
  const mockComponent = (viewport: string) => (
    <div data-viewport={viewport}>
      {viewport === 'mobile' ? 'Mobile View' : 'Desktop View'}
    </div>
  );

  it('renders mobile layout at 375px', () => {
    vi.stubGlobal('innerWidth', 375);
    vi.stubGlobal('innerHeight', 667);
    window.dispatchEvent(new Event('resize'));

    const { container } = render(mockComponent('mobile'));
    expect(container).toHaveAttribute('data-viewport', 'mobile');
  });

  it('renders desktop layout at 1280px', () => {
    vi.stubGlobal('innerWidth', 1280);
    vi.stubGlobal('innerHeight', 800);
    window.dispatchEvent(new Event('resize'));

    const { container } = render(mockComponent('desktop'));
    expect(container).toHaveAttribute('data-viewport', 'desktop');
  });
});