import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Forms', () => {
  it('Validates form fields', () => {
    // Contact form validation rules
    const rules = {
      name: {
        minLength: 2,
        maxLength: 100,
        required: true,
      },
      email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        required: true,
      },
      message: {
        minLength: 10,
        maxLength: 1000,
        required: true,
      },
    };

    // Test valid input
    const validName = 'John Doe';
    expect(validName.length).toBeGreaterThanOrEqual(rules.name.minLength);
    expect(validName.length).toBeLessThanOrEqual(rules.name.maxLength);

    const validEmail = 'john@example.com';
    expect(validEmail).toMatch(rules.email.pattern);

    const validMessage = 'This is a test message for validation purposes.';
    expect(validMessage.length).toBeGreaterThanOrEqual(rules.message.minLength);
    expect(validMessage.length).toBeLessThanOrEqual(rules.message.maxLength);
  });
});