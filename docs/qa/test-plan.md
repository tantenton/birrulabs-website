# BirruLabs Website - QA Test Plan

**Version:** 1.0.0  
**Last Updated:** 2026-08-04  
**Project:** BirruLabs Official Website (birrulabs.biz.id)  
**Test Lead:** QA Engineer Agent  
**Status:** Phase 1 - Planning Complete

---

## Table of Contents
1. [Overview](#overview)
2. [Test Scope](#test-scope)
3. [Functional Testing](#functional-testing)
4. [Responsive Testing](#responsive-testing)
5. [Accessibility Testing](#accessibility-testing)
6. [SEO Testing](#seo-testing)
7. [Performance Testing](#performance-testing)
8. [Security Testing](#security-testing)
9. [Multilingual Testing](#multilingual-testing)
10. [Test Environment](#test-environment)
11. [Automated Test Suite](#automated-test-suite)
12. [Test Execution Schedule](#test-execution-schedule)
13. [Exit Criteria](#exit-criteria)

---

## Overview

This test plan defines the comprehensive quality assurance approach for the BirruLabs website. The website serves as production-ready company profile, portfolio showcase, content hub, and technical demonstration for the BirruLabs AI product lab.

### Test Objectives
- Verify all pages load correctly and navigation works
- Validate form submissions (contact, inquiries) with proper validation
- Ensure responsive design across mobile, tablet, and desktop
- Confirm WCAG 2.1 Level AA accessibility compliance
- Validate SEO elements (meta tags, schema, sitemap)
- Achieve Lighthouse scores: Performance ≥90, Accessibility ≥95
- Verify security controls (CSP, rate limiting, CSRF)
- Test bilingual content (Indonesian/English) switch functionality

---

## Test Scope

### In Scope
| Category | Items |
|----------|-------|
| **Functional** | All public pages, forms, navigation, search, newsletter |
| **Responsive** | Mobile (320px-767px), Tablet (768px-1023px), Desktop (1024px+) |
| **Accessibility** | Keyboard navigation, screen reader support, WCAG AA |
| **SEO** | Meta tags, Open Graph, Twitter Cards, Schema.org, Sitemap |
| **Performance** | Lighthouse audit, Core Web Vitals, bundle size |
| **Security** | Headers, CSRF, rate limiting, input validation |
| **Multilingual** | ID/EN language switch, content localization |

### Out of Scope
- Backend database operations (tested separately)
- Admin panel authentication flow (separate QA effort)
- Third-party service API integration (external team responsibility)
- Mobile app compilation/deployment (separate iOS/Android builds)

---

## Functional Testing

### Test Matrix

| Page | Test Cases | Priority | Manual/Auto |
|------|------------|----------|-------------|
| Home (ID/EN) | Load, hero CTA, scroll, newsletter form submit | P0 | Auto |
| About (ID/EN) | Load, team grid, mission cards, values display | P0 | Auto |
| Products (ID/EN) | Load, project cards, service list | P0 | Auto |
| Projects (ID/EN) | Load, filter, project detail modal | P0 | Auto |
| Blog/Articles (ID/EN) | Load, article list, pagination, detail view | P0 | Auto |
| Contact (ID/EN) | Load, form fields, validation, submission | P0 | Auto |
| Startup Profile (ID/EN) | Load, case studies grid, filter | P1 | Auto |
| Privacy Policy (ID/EN) | Load, legal content display | P1 | Auto |
| Terms of Service (ID/EN) | Load, legal content display | P1 | Auto |
| Careers (ID/EN) | Load, job listings (if any), CTA | P2 | Auto |

### Functional Test Cases (AUTOMATED)

#### Test Suite: `tests/unit/pages.test.ts`
```typescript
// Verify all routes are functional
it('Home page renders correctly (ID)', async () => {
  const { getByText } = render(<Home locale="id" />);
  expect(getByText(/Membangun solusi berbasis AI/i)).toBeInTheDocument();
});

it('Home page renders correctly (EN)', async () => {
  const { getByText } = render(<Home locale="en" />);
  expect(getByText(/Building human-centered AI/i)).toBeInTheDocument();
});

it('Contact form submits successfully', async () => {
  const { getByPlaceholderText, getByText } = render(<ContactForm />);
  fireEvent.input(getByPlaceholderText(/Nama lengkap/i), { target: { value: 'Test User' } });
  fireEvent.input(getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });
  fireEvent.input(getByPlaceholderText(/Pesan/i), { target: { value: 'Test message' } });
  fireEvent.click(getByText(/Kirim/i));
  await waitFor(() => {
    expect(getByText(/Pesan terkirim/i)).toBeInTheDocument();
  });
});
```

### Functional Test Cases (MANUAL)

#### Password Protected Admin Area
1. Navigate to `/admin`
2. Verify redirects to login page
3. Enter valid credentials
4. Verify access granted and admin dashboard loads

---

## Responsive Testing

### Breakpoints

| Device | Width | Height | Test Focus |
|--------|-------|--------|------------|
| Mobile (Portrait) | 320px - 480px | 568px - 896px | Touch targets, collapsible nav, form fields |
| Mobile (Landscape) | 481px - 767px | 320px - 568px | Orientation handling |
| Tablet (Portrait) | 768px | 1024px | Card grid, sidebar layout |
| Tablet (Landscape) | 1023px | 768px | Two-column layouts |
| Desktop | 1024px - 1440px+ | 768px+ | Full nav, hover states |

### Responsive Test Matrix

| Component | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| Header | Hamburger menu, logo, theme toggle | Hamburger menu, logo, theme toggle | Full nav, logo, theme toggle |
| Navigation | Bottom tab bar (primary pages) | Hamburger dropdown | Horizontal dropdown menu |
| Hero section | Full-width image, centered CTA | Full-width image, centered CTA | Full-width image, centered CTA |
| Project cards | 1 column (stacked) | 2 columns | 3 columns |
| Form fields | 48px height touch targets | 44px height | Standard desktop height |
| Footer | Collapsible sections | Collapsible sections | Full width |
| Buttons | 48x48px minimum | 44x44px minimum | Standard size |
| Touch targets | 48x48px preferred | 44x44px minimum | 44x44px minimum |

### Responsive Test Cases (AUTOMATED)

#### Test Suite: `tests/unit/responsive.test.ts`
```typescript
// Viewport testing with Playwright
const testCases = [
  { name: 'Mobile', width: 375, height: 667 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Desktop', width: 1280, height: 800 }
];

testCases.forEach(({ name, width, height }) => {
  test(`Homepage loads with correct layout on ${name}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    
    // Verify hamburger exists on mobile/tablet
    if (width < 1024) {
      await expect(page.getByRole('button', { name: /Menu/i })).toBeVisible();
    } else {
      await expect(page.getByRole('navigation')).toBeVisible();
    }
    
    // Verify hero section is present
    await expect(page.getByRole('main')).toBeVisible();
  });
});
```

---

## Accessibility Testing

### WCAG 2.1 Level AA Compliance

| Guideline | Success Criteria | Test Method | Status |
|-----------|------------------|-------------|--------|
| 1.1.1 Non-text Content | ARIA labels, alt text | Automated + Manual | In Progress |
| 1.3.1 Info & Relationships | Semantic HTML, proper ARIA | Automated | In Progress |
| 1.3.2 Meaningful Sequence | DOM order matches visual | Manual review | In Progress |
| 1.4.1 Use of Color | Color not sole indicator | Manual + axe-core | In Progress |
| 2.1.1 Keyboard | All functions keyboard-accessible | Keyboard nav test | In Progress |
| 2.1.2 No Keyboard Trap | Focus can leave modals | Keyboard nav test | In Progress |
| 2.4.1 Bypass Blocks | Skip link present | Automated | In Progress |
| 2.4.2 Page Titled | Unique, descriptive titles | axe-core + Manual | In Progress |
| 2.4.3 Focus Order | Logical tab order | Keyboard nav test | In Progress |
| 2.4.4 Link Purpose | Descriptive link text | Manual review | In Progress |
| 3.2.1 On Focus | No unexpected context change | Manual test | In Progress |
| 3.2.2 On Input | No auto-submit, no context change | Manual test | In Progress |
| 4.1.2 Name, Role, Value | Proper ARIA roles & states | Automated | In Progress |
| 4.1.3 Status Messages | aria-live regions for updates | axe-core | In Progress |

### Accessibility Test Matrix

| Element | Requirement | Validation Tool |
|---------|-------------|-----------------|
| `<html>` | `lang` attribute | W3C Validator |
| `<meta charset>` | UTF-8 declared | W3C Validator |
| Skip main nav link | First in DOM, visible on focus | axe-core |
| `<h1>` | Single per page, descriptive | axe-core |
| `<h2>`-`<h6>` | Hierarchical, no skipped levels | axe-core |
| Images | Alt text present | axe-core |
| Buttons | Visible text OR aria-label | axe-core |
| Form inputs | Label with `for` OR wrapped | axe-core |
| Focus indicators | Visible 2px outline | Manual + axe |
| Modal dialogs | `aria-modal="true"`, focus trap | axe-core |
| Toast notifications | `role="status"`, `aria-live` | axe-core |

### Accessibility Test Cases (AUTOMATED)

#### Test Suite: `tests/unit/accessibility.test.ts`
```typescript
// axe-core accessibility tests
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Accessibility', () => {
  test('Homepage has no accessibility violations', async () => {
    const { container } = render(<Home />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  test('Contact form is accessible', async () => {
    const { container } = render(<ContactForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Accessibility Test Cases (MANUAL)

#### Keyboard Navigation Test
1. **Tab Order**: Tab through page - verify logical flow: Logo → Nav → Main → Footer
2. **Skip Link**: Shift+Tab after page load - verify skip link appears
3. **Modal**: Open any modal, verify focus trapped inside
4. **Form**: Navigate to form, fill with keyboard, submit with Enter
5. **Theme Toggle**: Tab to theme button, press Enter, verify change

#### Screen Reader Test
1. **VoiceOver (iOS)**: Announce headings, links, form fields
2. **Narrator (Windows)**: Announce navigation structure
3. **NVDA + Firefox**: Test alternate text for images

---

## SEO Testing

### On-Page SEO Elements

| Element | Page | Requirement | Validation |
|---------|------|-------------|------------|
| `<title>` | All | Page-specific, ~60 chars | W3C |
| `<meta name="description">` | All | ~150-160 chars, unique | W3C |
| `<link rel="canonical">` | All | Self-referential | W3C |
| `<link rel="hreflang">` | ID/EN pairs | Correct pairs | W3C |
| Open Graph | All | Title, description, image, URL | Facebook Debugger |
| Twitter Card | All | Summary card with image | Twitter Card Validator |
| Schema.org | Home, Articles, Projects | Organization, Article, BreadcrumbList | Schema.org Validator |

### SEO Test Matrix

| Page Type | SEO Elements | Priority |
|-----------|--------------|----------|
| Home | Title, description, OG, Twitter, Schema.org, hreflang | P0 |
| Article | Title, description, OG, Twitter, Article schema, hreflang | P0 |
| Project | Title, description, OG, Project schema, hreflang | P0 |
| About | Title, description, OG, hreflang | P1 |
| Contact | Title, description, OG, hreflang | P1 |

### SEO Test Cases (AUTOMATED)

#### Test Suite: `tests/unit/seo.test.ts`
```typescript
// Verify SEO elements
test('Homepage has correct SEO structure', async () => {
  const { getById } = render(<Home />);
  
  expect(getByTagName('title').textContent).toMatch(/BirruLabs/i);
  expect(getByName('description').content).toHaveLength(150, 160);
  expect(getByName('og:title').content).toMatch(/BirruLabs/i);
  expect(getByName('og:url').content).toContain('birrulabs.biz.id');
  expect(getByName('twitter:card').content).toBe('summary_large_image');
  expect(getByType('application/ld+json')).not.toBeNull();
});

test('Article pagination has proper hreflang links', async () => {
  const { getElementsByTagName } = render(<ArticleList />);
  const links = getElementsByTagName('link');
  const hreflangs = links
    .filter(l => l.getAttribute('rel') === 'hreflang')
    .map(l => ({ hreflang: l.getAttribute('hreflang'), href: l.getAttribute('href') }));
  
  expect(hreflangs).toContainEqual({ hreflang: 'id', href: expect.stringContaining('/id/artikel') });
  expect(hreflangs).toContainEqual({ hreflang: 'en', href: expect.stringContaining('/en/articles') });
});
```

---

## Performance Testing

### Performance Targets (Lighthouse)

| Metric | Target | Threshold |
|--------|--------|-----------|
| Performance Score | ≥90 | ≥50 |
| Accessibility Score | ≥95 | ≥90 |
| Best Practices Score | ≥95 | ≥90 |
| SEO Score | ≥95 | ≥90 |
| Largest Contentful Paint (LCP) | ≤1.8s | ≤2.5s |
| First Input Delay (FID) | ≤100ms | ≤300ms |
| Cumulative Layout Shift (CLS) | ≤0.1 | ≤0.25 |
| Time to Interactive (TTI) | ≤3.2s | ≤6.0s |

### Performance Budget

| Resource Type | Size Limit | Rule |
|---------------|------------|------|
| HTML | 50KB | Compressed |
| CSS | 100KB | Critical CSS inlined |
| JS | 300KB | Code splitting, lazy loading |
| Images | 200KB | Next.js Image optimization, WebP |
| Fonts | 100KB | Font-display: swap |

### Performance Test Cases (AUTOMATED)

#### Test Suite: `tests/unit/performance.test.ts`
```typescript
// Lighthouse CI parsing
import { readFileSync } from 'fs';

test('Performance metrics meet targets', () => {
  const report = JSON.parse(readFileSync('.lhr.json', 'utf-8'));
  
  expect(report.categories.performance.score).toBeGreaterThanOrEqual(0.9);
  expect(report.categories.accessibility.score).toBeGreaterThanOrEqual(0.95);
  expect(report.categories['best-practices'].score).toBeGreaterThanOrEqual(0.95);
  
  expect(report.audits['largest-contentful-paint'].numericValue).toBeLessThanOrEqual(1800);
  expect(report.audits['total-blocking-time'].numericValue).toBeLessThanOrEqual(300);
  expect(report.audits['cumulative-layout-shift'].numericValue).toBeLessThanOrEqual(0.1);
});
```

#### Test Suite: `tests/unit/bundle-size.test.ts`
```typescript
// Bundle size check
import { bundleAnalyzer } from './utils/bundle-analyzer';

test('Bundle sizes within budget', async () => {
  const stats = await bundleAnalyzer();
  
  expect(stats.html).toBeLessThan(50 * 1024);  // 50KB
  expect(stats.css()).toBeLessThan(100 * 1024); // 100KB
  expect(stats.javascript()).toBeLessThan(300 * 1024); // 300KB
  expect(stats.fonts()).toBeLessThan(100 * 1024); // 100KB
  expect(stats.images).toBeLessThan(200 * 1024); // 200KB
});
```

---

## Security Testing

### Security Headers Check

| Header | Value | Required | Verify Method |
|--------|-------|----------|---------------|
| Strict-Transport-Security | max-age=31536000; includeSubDomains | Yes | curl |
| X-Content-Type-Options | nosniff | Yes | curl |
| X-Frame-Options | DENY | Yes | curl |
| X-XSS-Protection | 1; mode=block | Yes | curl |
| Referrer-Policy | strict-origin-when-cross-origin | Yes | curl |
| Permissions-Policy | geolocation=(), microphone=(), camera=() | Yes | curl |
| Content-Security-Policy | See CSS/CSP | Yes | curl |

### Security Test Matrix

| Test Category | Tests | Priority |
|---------------|-------|----------|
| **CSP Headers** | Verify CSP directive values, no inline scripts | P0 |
| **HSTS** | Verify max-age and includeSubDomains | P0 |
| **Frame Options** | Verify DENY or SAMEORIGIN | P0 |
| **Rate Limiting** | `/api/contact` limit 10/hr, `/api/login` limit 5/min | P0 |
| **CSRF Protection** | Form tokens valid, rejected without token | P0 |
| **Input Validation** | Empty fields, XSS attempts, SQL injection attempts | P0 |
| **Password Security** | Hashed with bcrypt, minimum 12 chars | P1 |

### Security Test Cases (AUTOMATED)

#### Test Suite: `tests/unit/security.test.ts`
```typescript
// Security header validation
import { exec } from 'child_process';

describe('Security Headers', () => {
  test('CSP header present', (done) => {
    exec('curl -sI https://localhost:3000', (error, stdout) => {
      expect(stdout).toMatch(/Content-Security-Policy:/);
      done();
    });
  });
  
  test('HSTS header present', (done) => {
    exec('curl -sI https://localhost:3000', (error, stdout) => {
      expect(stdout).toMatch(/Strict-Transport-Security:/);
      done();
    });
  });
  
  test('Rate limit on contact form', async () => {
    const axios = require('axios');
    for (let i = 0; i < 15; i++) {
      await axios.post('http://localhost:3000/api/contact', {
        name: 'Test',
        email: 'test@example.com',
        message: 'Test message'
      }).catch(() => {}); // Ignore errors after rate limit
    }
    
    // 15th request should be 429
    const response = await axios.post('http://localhost:3000/api/contact', {
      name: 'Test',
      email: 'test@example.com',
      message: 'Test message'
    }).catch(e => e.response);
    
    expect(response.status).toBe(429);
  });
});
```

---

## Multilingual Testing

### Language Support

| Language | Code | Main | RTL | Status |
|----------|------|------|-----|--------|
| Indonesian | id | Yes | No | P0 |
| English | en | Yes | No | P0 |

### Multilingual Test Matrix

| Test | Test (ID) | Test (EN) | Status |
|------|-----------|-----------|--------|
| Language switcher works | ✓ | ✓ | P0 |
| URL structure correct | `/id/...` | `/en/...` | P0 |
| Contentlocalized | ✓ | ✓ | P0 |
| CTA buttons localized | ✓ | ✓ | P0 |
| Form labels localized | ✓ | ✓ | P0 |
| Meta tags different per language | ✓ | ✓ | P0 |
| SEO hreflang correct | ✓ | ✓ | P0 |

### Multilingual Test Cases (AUTOMATED)

#### Test Suite: `tests/unit/i18n.test.ts`
```typescript
// Internationalization testing
import { getTranslation } from '@/lib/i18n';

describe('i18n', () => {
  test(' Indonesian translations exist', () => {
    const t = getTranslation('id');
    expect(t('hero.title')).toBeDefined();
    expect(t('hero.subtitle')).toBeDefined();
    expect(t('nav.contact')).toBe('Kontak');
  });
  
  test(' English translations exist', () => {
    const t = getTranslation('en');
    expect(t('hero.title')).toBeDefined();
    expect(t('hero.subtitle')).toBeDefined();
    expect(t('nav.contact')).toBe('Contact');
  });
  
  test('Missing translations are caught', () => {
    const t = getTranslation('id');
    // Should not throw
    expect(() => t('nonexistent.key')).not.toThrow();
  });
});
```

---

## Test Environment

### Environments

| Environment | URL | Purpose |
|-------------|-----|---------|
| Development | http://localhost:3000 | Local testing, active development |
| Staging | https://staging.birrulabs.biz.id | QA validation, UAT |
| Production | https://birrulabs.biz.id | Final release |

### Test Data Requirements

| Test Type | Data Source |
|-----------|-------------|
| Unit tests | Mock data, test fixtures |
| Integration tests | In-memory database |
| E2E tests | Real API, Production-like data |
| Performance | Production snapshot data |

---

## Automated Test Suite

### Test Framework

| Layer | Framework | Run Command |
|-------|-----------|-------------|
| Unit | Vitest | `npm run test:unit` |
| Integration | Playwright | `npm run test:integration` |
| E2E | Playwright | `npm run test:e2e` |
| Accessibility | jest-axe | `npm run test:a11y` |
| Performance | Lighthouse CI | `npm run test:perf` |
| Security | Custom scripts | `npm run test:security` |

### Test Structure

```
tests/
├── unit/               # Unit tests
│   ├── pages.test.ts   # Page rendering
│   ├── i18n.test.ts    # Internationalization
│   ├── responsive.test.ts  # Responsive layouts
│   ├── accessibility.test.ts  # WCAG compliance
│   ├── seo.test.ts     # SEO elements
│   ├── security.test.ts  # Security headers
│   └── bundle-size.test.ts  # Bundle budgets
├── integration/        # Integration tests
│   ├── api.test.ts     # API routes
│   ├── forms.test.ts   # Form submissions
│   └── navigation.test.ts  # Navigation
└── e2e/                # End-to-end tests
    ├── full-flow.test.ts  # User journeys
    ├── contact-form.test.ts  # Contact submission
    └── lang-switch.test.ts  # Language switching
```

### CI/CD Integration

```yaml
# .github/workflows/ci.yml
name: QA Pipeline

on:
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm run test:unit
      
      - name: Run accessibility tests
        run: npm run test:a11y
      
      - name: Run bundle size check
        run: npm run test:bundle
      
      - name: Run e2e tests
        run: npm run test:e2e
      
      - name: Run Lighthouse CI
        run: npm run test:perf
```

---

## Test Execution Schedule

### Phase 1: Unit & Integration (Daily)
- Run on every commit to PR branch
- Coverage target: ≥80% of new code
- Fail build if critical tests fail

### Phase 2: E2E & Accessibility (Pre-merge)
- Run after integration tests pass
- Verify full user journeys
- WCAG 2.1 AA compliance check

### Phase 3: Performance & Security (Pre-release)
- Run on Staging environment
- Lighthouse audit
- Security header verification
- Rate limiting validation

### Phase 4: Manual QA (Sprint Review)
- Manual test suite review
- Browser compatibility (Chrome, Firefox, Safari, Edge)
- Mobile testing (iOS Safari, Chrome Android)

---

## Exit Criteria

### Minimum Requirements
- [ ] Lighthouse scores: Performance ≥90, Accessibility ≥95
- [ ] All P0 automated tests passing (99% uptime)
- [ ] No critical accessibility violations (axe-core)
- [ ] Security headers verified via automated checks
- [ ] All forms submit successfully (ID and EN)
- [ ] Performance budget met (CSS ≤100KB, JS ≤300KB)
- [ ] Mobile touch targets ≥44x44px
- [ ] All SEO elements present on public pages

### Hard Constraints
- [ ] No XSS vulnerabilities detected
- [ ] No CSRF exploitation possible
- [ ] Rate limiting reuses valid tokens
- [ ] CSP prevents script injection
- [ ] No sensitive data in client-side code

### Quality Gates
1. **Unit Tests**:Pass | → Integration Tests
2. **Integration Tests**: Pass | → E2E Tests
3. **E2E Tests**: Pass | → Accessibility Audit
4. **Accessibility**: Pass | → Performance Audit
5. **Performance**: Pass | → Security Audit
6. **Security**: Pass | → Manual QA
7. **Manual QA**: Approve | → Deploy to Production

---

## Test Deliverables

| Deliverable | Location | Owner | Due |
|-------------|----------|-------|-----|
| Test plan | `docs/qa/test-plan.md` | QA Engineer | Complete |
| Test cases | `docs/qa/test-cases/` | QA Engineer | Per sprint |
| Test reports | `docs/qa/reports/` | CI/CD | After each run |
| Accessibility report | `docs/qa/a11y-report.md` | QA Engineer | Pre-release |
| Security scan report | `docs/qa/security-report.md` | QA Engineer | Pre-release |

---

## Known Limitations

1. **Mobile browser testing**: Requires physical devices or BrowserStack/Sauce Labs subscription
2. **Screen reader testing**: Manual testing only (VoiceOver, Narrator, NVDA)
3. **Performance on low-end devices**: Requires device testing, not emulated
4. **Real-world network conditions**: Requires WebPageTest or similar

---

## Contact

**QA Lead**: Hermes Agent (QA Engineer)  
**Email**: qa@birrulabs.biz.id  
**Slack**: #qa-birrulabs  

---