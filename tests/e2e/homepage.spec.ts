import { test, expect } from '@playwright/test';

test.describe('Homepage E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Page loads successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/BirruLabs/i);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('Hero section is visible', async ({ page }) => {
    await expect(page.getByRole('main')).toBeVisible();
    await expect(page.getByRole('link', { name: /projects/i })).toBeVisible();
  });

  test('Navigation links work', async ({ page }) => {
    await page.getByRole('link', { name: /about/i }).click();
    await expect(page).toHaveURL(/\/about/i);
  });

  test('Footer contains expected links', async ({ page }) => {
    await expect(page.getByRole('contentinfo')).toBeVisible();
  });
});

test.describe('Contact Form E2E', () => {
  test('Form submits successfully', async ({ page }) => {
    await page.goto('/contact');
    
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'This is a test message.');
    
    await page.click('button[type="submit"]');
    
    await expect(page.getByText(/message sent/i)).toBeVisible();
  });

  test('Form validates required fields', async ({ page }) => {
    await page.goto('/contact');
    
    await page.click('button[type="submit"]');
    
    await expect(page.getByText(/required/i)).toBeVisible();
  });
});