import { test, expect } from '@playwright/test';

test.describe('Mobile Responsive', () => {
  test('Mobile navigation uses hamburger menu', async ({ page }) => {
    // iPhone 13
    const iphone13 = test.devices['iPhone 13'];
    await page.viewportSize(iphone13.viewport);
    await page.goto('/');
    
    await expect(page.getByRole('button', { name: /Menu/i })).toBeVisible();
    await expect(page.getByRole('navigation')).toHaveAttribute('aria-label');
  });

  test('Touch targets are at least 44x44px', async ({ page }) => {
    await page.goto('/');
    
    const buttons = await page.getByRole('button').all();
    for (const button of buttons) {
      const box = await button.boundingBox();
      if (box) {
        expect(box.width).toBeGreaterThanOrEqual(44);
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }
  });

  test('Form fields have adequate touch targets', async ({ page }) => {
    await page.goto('/contact');
    
    const inputs = await page $$('input, textarea');
    for (const input of inputs) {
      const box = await input.boundingBox();
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }
  });
});

test.describe('Tablet Responsive', () => {
  test('Tablet layout shows two-column grid', async ({ page }) => {
    // iPad Pro
    const iPadPro = test.devices['iPad Pro'];
    await page.viewportSize(iPadPro.viewport);
    await page.goto('/');
    
    const cards = await page $$('[data-layout="grid"]');
    expect(cards).toHaveLength(2);
  });
});

test.describe('Desktop Responsive', () => {
  test('Desktop shows full navigation', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.getByRole('button', { name: /Menu/i })).not.toBeVisible();
  });

  test('Projects display in three-column grid', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/projects');
    
    const columns = await page $$('[data-columns="3"]');
    expect(columns).toBeGreaterThan(0);
  });
});