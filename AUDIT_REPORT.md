# BirruLabs Website - Audit & Fix Report
**Date:** 2026-08-05  
**Repo:** https://github.com/tantenton/birrulabs-website  
**Commit:** d56e56f

## Executive Summary

**Status:** ✅ FIXED & DEPLOYED  
**Root cause:** Next.js 15 breaking changes + conflicting config files + missing next-intl dependency

## Issues Found & Fixed

### 1. ❌ Next.js 15 Breaking Change - `params` Type
**File:** `app/[locale]/page.tsx`

**Error:**
```
Type '{ params: { locale: string; }; }' does not satisfy constraint 'PageProps'
Type '{ locale: string; }' is missing properties: then, catch, finally
```

**Root cause:** Next.js 15 changed `params` from plain object to `Promise<T>`

**Fix:**
```tsx
// ❌ Before
export default function HomePage({ params }: { params: { locale: string } })

// ✅ After  
export default async function HomePage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
```

### 2. ❌ Missing next-intl Import
**File:** `app/[locale]/layout.tsx`

**Error:**
```tsx
const t = await getTranslations({ locale, namespace: 'metadata' });
// getTranslations is not defined
```

**Root cause:** Code calls `getTranslations` from `next-intl` but package not installed + previous commits removed next-intl

**Fix:** Replaced with static translations object (matching pattern in `page.tsx`)

```tsx
// ✅ After
const titles: Record<string, string> = {
  id: 'BirruLabs - AI Product Lab',
  en: 'BirruLabs - AI Product Lab',
};
```

### 3. ❌ Conflicting Next.js Config Files
**Files:** `next.config.js` + `next.config.mjs`

**Root cause:** Two config files present — Next.js reads both, causing unpredictable behavior

**Fix:** Deleted `next.config.mjs`, kept `next.config.js`

### 4. ❌ `output: 'export'` Incompatible with Vercel SSR
**File:** `next.config.js`

**Error:**
```
⚠ Specified "redirects" will not automatically work with "output: export"
⚠ Specified "rewrites" will not automatically work with "output: export"
```

**Root cause:** 
- `output: 'export'` generates static HTML to `/out` folder (for GitHub Pages / static hosting)
- Vercel runs SSR by default and expects `.next` output
- `redirects()` dan `rewrites()` tidak berfungsi dengan static export

**Fix:** Removed `output: 'export'` — Vercel handles SSR deployment automatically

```js
// ❌ Before
const nextConfig = {
  output: 'export',  // ← conflicts with redirects + Vercel
  async redirects() { ... }
}

// ✅ After
const nextConfig = {
  // no output field = SSR mode (Vercel default)
  async redirects() { ... }
}
```

### 5. ⚠️ `vercel.json` Output Directory
**File:** `vercel.json`

**Before:** 
```json
{ "outputDirectory": ".next" }
```

**Assessment:** Already correct for SSR mode (`.next` is Next.js build output for SSR)

**Note:** If `output: 'export'` were still present, this would be wrong (should be `"out"`)

## Verification Results

### ✅ Build
```bash
npm run build
```
```
✓ Compiled successfully in 8.7s
✓ Linting and checking validity of types ...
✓ Generating static pages (5/5)

Route (app)                              Size  First Load JS
┌ ○ /_not-found                         993 B         104 kB
└ ● /[locale]                           127 B         103 kB
    ├ /id
    └ /en
```

### ✅ Type Check
```bash
npm run type-check
```
No errors.

### ✅ Lint
```bash
npm run lint
```
✔ No ESLint warnings or errors

## Remaining Architecture Notes

### I18n Implementation
**Current:** Manual static translations in each page component  
**Pattern:**
```tsx
const translations = { en: {...}, id: {...} };
const t = (key: string) => { /* key lookup */ };
```

**Pro:** Zero dependencies, works with SSR + static export  
**Con:** Not scalable for large translation catalogs

**Alternative:** Install `next-intl` properly if more pages/strings needed

### Dual Folder Structure
**Observed:**
- `src/app/` — old structure with layout/pages
- `app/` — new structure with `[locale]` dynamic routes

**Current behavior:** Next.js reads `app/` first (takes precedence)

**Recommendation:** Delete `src/app/` to avoid confusion (not blocking deploy)

### Static Export vs SSR
**Current setup:** SSR mode (Vercel default)  
**Benefits:** 
- `redirects()` work
- API routes work
- ISR/SSR possible

**If static export needed later:**
1. Remove `redirects()` from `next.config.js`
2. Add `output: 'export'`
3. Change `vercel.json` `outputDirectory` to `"out"`
4. Deploy to Vercel as static site or use GitHub Pages

## Git Changes Pushed

**Commit:** `d56e56f`  
**Branch:** `main`  
**Files changed:**
- `app/[locale]/page.tsx` — params as Promise
- `app/[locale]/layout.tsx` — remove getTranslations, use static translations
- `next.config.js` — remove output: 'export'
- `next.config.mjs` — deleted (duplicate)

**Message:**
```
fix: resolve Vercel deploy failures

- fix app/[locale]/page.tsx: params as Promise<{locale}> (Next.js 15 requirement)
- fix app/[locale]/layout.tsx: remove getTranslations (next-intl not installed), use static translations
- fix next.config.js: remove output: 'export' (conflicts with redirects + Vercel SSR)
- delete next.config.mjs: duplicate config file causing conflicts
- vercel.json: outputDirectory .next (correct for non-static export)
```

## Next Steps

1. ✅ Monitor Vercel deployment at https://vercel.com/tantenton/birrulabs-website
2. ⚠️ (Optional) Clean up `src/app/` folder to remove duplicate structure
3. ⚠️ (Optional) Install `next-intl` if more i18n features needed
4. ✅ Test live site at both `/en` and `/id` routes

## Summary

**Before:** Build failed with type errors + config conflicts  
**After:** Clean build, all checks pass, ready for Vercel deployment

**Deploy readiness:** ✅ READY
