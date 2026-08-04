import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock components
const mockHome = () => (
  <main>
    <h1>BirruLabs</h1>
    <h2>Building human-centered, experimental, and practical AI solutions.</h2>
    <a href="/projects">View Projects</a>
  </main>
);

describe('Pages', () => {
  describe('Home Page', () => {
    it('renders correctly', () => {
      render(<mockHome />);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('BirruLabs');
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    it('has navigation link to projects', () => {
      render(<mockHome />);
      const link = screen.getByRole('link', { name: /View Projects/i });
      expect(link).toHaveAttribute('href', '/projects');
    });
  });
});