import { test, expect } from '@playwright/test';

test.describe('Language Switcher', () => {
  test('Switches between Indonesian and English', async ({ page }) => {
    // Start with Indonesian (default)
    await page.goto('/id');
    await expect(page.getByText(/Membangun solusi berbasis AI/i)).toBeVisible();
    
    // Switch to English
    await page.getByRole('button', { name: /English/i }).click();
    await expect(page.getByText(/Building human-centered AI/i)).toBeVisible();
    
    // Verify URL changed
    await expect(page).toHaveURL(/\/en/);
  });

  test('Preserves page state during language switch', async ({ page }) => {
    await page.goto('/id/projects');
    await expect(page).toHaveURL('/id/projects');
    
    await page.getByRole('button', { name: /English/i }).click();
    await expect(page).toHaveURL('/en/projects');
  });
});

test.describe('Multilingual SEO', () => {
  test('Has correct hreflang tags', async ({ page }) => {
    await page.goto('/id');
    
    const hreflangs = await page $$('link[rel="hreflang"]');
    expect(hreflangs).toHaveLength(3); // id, en, x-default
    
    const hreflangValues = await Promise.all(hreflangs.map(link => link.getAttribute('hreflang')));
    expect(hreflangValues).toContain('id');
    expect(hreflangValues).toContain('en');
    expect(hreflangValues).toContain('x-default');
  });
});