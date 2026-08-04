# BirruLabs Website - Acceptance Criteria

**Version:** 1.0.0  
**Last Updated:** 2026-08-04  
**Project:** BirruLabs Official Website (birrulabs.biz.id)

---

## Table of Contents
1. [Overview](#overview)
2. [Acceptance Criteria by Feature](#acceptance-criteria-by-feature)
3. [Non-Functional Requirements](#non-functional-requirements)
4. [Deploys & Environment](#deploys--environment)
5. [Exit Checklist](#exit-checklist)

---

## Overview

This document defines the acceptance criteria for the BirruLabs website. Acceptance criteria specify the conditions that must be met for a feature to be considered complete and ready for production.

### Acceptance Criteria Format
- **ID:** Unique identifier
- **Feature:** Parent feature name
- **Title:** Brief description
- **Criteria:** Specific, testable conditions
- **Priority:** P0 (Blocker) | P1 (High) | P2 (Medium) | P3 (Low)
- **Test Type:** Unit | Integration | E2E | Manual

---

## Acceptance Criteria by Feature

### 1. User Interface

#### 1.1 Homepage
| ID | Feature | Title | Criteria | Priority | Test Type |
|----|---------|-------|----------|----------|-----------|
| AC-UI-001 | Homepage | Page loads | Page renders without errors within 3 seconds | P0 | E2E |
| AC-UI-002 | Homepage | Hero section | Hero banner displays with CTA buttons | P0 | E2E |
| AC-UI-003 | Homepage | Navigation | Primary navigation visible with all links | P0 | E2E |
| AC-UI-004 | Homepage | Footer | Footer contains copyright, links, social | P1 | E2E |
| AC-UI-005 | Homepage | Theme toggle | Dark/light mode switch works | P1 | Manual |
| AC-UI-006 | Homepage | Language switcher | ID/EN switch visible and functional | P0 | E2E |

#### 1.2 About Page
| AC-UI-007 | About | Page loads | Page renders without errors | P0 | E2E |
| AC-UI-008 | About | Team grid | Team members display in responsive grid | P1 | E2E |
| AC-UI-009 | About | Mission cards | Mission and values display correctly | P1 | E2E |

#### 1.3 Projects Page
| AC-UI-010 | Projects | Page loads | Page renders without errors | P0 | E2E |
| AC-UI-011 | Projects | Project cards | Projects display with images, titles, descriptions | P0 | E2E |
| AC-UI-012 | Projects | Filters | Category filters work correctly | P2 | E2E |

#### 1.4 Content Pages
| AC-UI-013 | Content | Blog listing | Articles display with excerpts | P0 | E2E |
| AC-UI-014 | Content | Blog detail | Article detail page renders correctly | P0 | E2E |
| AC-UI-015 | Content | Project detail | Project detail page renders correctly | P0 | E2E |

---

### 2. Forms & Submissions

#### 2.1 Contact Form
| AC-FORM-001 | Contact Form | Required fields | Name, email, message fields present | P0 | Unit |
| AC-FORM-002 | Contact Form | Validation | Email format validation works | P0 | Unit |
| AC-FORM-003 | Contact Form | Submission | Form submits successfully | P0 | E2E |
| AC-FORM-004 | Contact Form | Success message | Success confirmation displays after submit | P0 | E2E |
| AC-FORM-005 | Contact Form | Error handling | Errors display inline for invalid input | P1 | Integration |
| AC-FORM-006 | Contact Form | CSRF protection | Token validation required | P0 | Integration |
| AC-FORM-007 | Contact Form | Rate limiting | 10 submissions/hour/IP limit enforced | P0 | Integration |

#### 2.2 Newsletter Form
| AC-FORM-008 | Newsletter | Subscription | Email subscription works | P1 | E2E |
| AC-FORM-009 | Newsletter | Success state | Confirmation displays after subscribe | P1 | E2E |

---

### 3. Responsive Design

#### 3.1 Mobile (320px - 767px)
| AC-RESP-001 | Mobile | Touch targets | All interactive elements ≥44x44px | P0 | Manual |
| AC-RESP-002 | Mobile | Navigation | Hamburger menu functional | P0 | E2E |
| AC-RESP-003 | Mobile | Forms | Input fields ≥48px height | P0 | Manual |
| AC-RESP-004 | Mobile | Layout | Single-column layout installs | P1 | E2E |
| AC-RESP-005 | Mobile | Images | Images scale properly | P1 | E2E |

#### 3.2 Tablet (768px - 1023px)
| AC-RESP-006 | Tablet | Navigation | Hamburger menu functional | P0 | E2E |
| AC-RESP-007 | Tablet | Layout | 2-column grid for cards | P1 | E2E |
| AC-RESP-008 | Tablet | Forms | Input fields ≥44px height | P1 | Manual |

#### 3.3 Desktop (1024px+)
| AC-RESP-009 | Desktop | Navigation | Full horizontal navigation visible | P0 | E2E |
| AC-RESP-010 | Desktop | Layout | Multi-column grid (3-4 columns) | P1 | E2E |
| AC-RESP-011 | Desktop | Hover states | Hover effects visible on interactive elements | P2 | Manual |
| AC-RESP-012 | Desktop | Jump links | Anchor navigation works | P2 | Manual |

---

### 4. Accessibility (WCAG 2.1 Level AA)

#### 4.1 Keyboard Navigation
| AC-A11Y-001 | Keyboard | Tab order | Logical focus order: Logo → Nav → Main → Footer | P0 | Manual |
| AC-A11Y-002 | Keyboard | Skip link | Skip main navigation link present | P0 | E2E |
| AC-A11Y-003 | Keyboard | No trap | Focus can escape modals with Escape key | P0 | Manual |
| AC-A11Y-004 | Keyboard | Focus visible | Focus indicator (2px outline) visible | P0 | Manual |
| AC-A11Y-005 | Keyboard | Full access | All functionality accessible without mouse | P1 | Manual |

#### 4.2 Screen Reader Support
| AC-A11Y-006 | Screen Reader | Page titles | Unique, descriptive page titles | P0 | Manual |
| AC-A11Y-007 | Screen Reader | Headings | Proper h1-h6 hierarchy, no skipped levels | P0 | Manual |
| AC-A11Y-008 | Screen Reader | Images | All images have descriptive alt text | P0 | Manual |
| AC-A11Y-009 | Screen Reader | Forms | Labels associated with inputs | P0 | Manual |
| AC-A11Y-010 | Screen Reader | Live regions | Status updates announced via aria-live | P1 | Manual |

#### 4.3 Color & Contrast
| AC-A11Y-011 | Color | Text contrast | Text ≥4.5:1 contrast ratio | P0 | Manual |
| AC-A11Y-012 | Color | Color not sole indicator | Icons accompanied by text labels | P0 | Manual |
| AC-A11Y-013 | Color | Link styling | Links distinguishable from text | P1 | Manual |
| AC-A11Y-014 | Color | Error states | Errors indicated with color + text | P1 | Manual |

#### 4.4 Semantics & ARIA
| AC-A11Y-015 | Semantics | Proper HTML | Semantic tags (header, nav, main, footer) | P0 | Unit |
| AC-A11Y-016 | Semantics | Landmarks | ARIA landmarks present (banner, navigation, main, contentinfo) | P0 | Manual |
| AC-A11Y-017 | Semantics | Button roles | All clickable elements use `<button>` or proper ARIA | P0 | Unit |
| AC-A11Y-018 | Semantics | Modal dialogs | `aria-modal="true"`, `role="dialog"` | P1 | Unit |

---

### 5. SEO

#### 5.1 Meta Tags
| AC-SEO-001 | SEO | Page title | Unique, ≤60 characters, includes brand | P0 | Unit |
| AC-SEO-002 | SEO | Meta description | ≤160 characters, unique per page | P0 | Unit |
| AC-SEO-003 | SEO | Canonical URL | Self-referential canonical link | P0 | Unit |
| AC-SEO-004 | SEO | Robots meta | Proper index/follow directives | P1 | Unit |

#### 5.2 Open Graph
| AC-SEO-005 | SEO | OG Title | Presence on all pages | P0 | Unit |
| AC-SEO-006 | SEO | OG Description | Presence on all pages | P0 | Unit |
| AC-SEO-007 | SEO | OG Image | Presence on public pages | P1 | Unit |
| AC-SEO-008 | SEO | OG URL | Correct canonical URL | P1 | Unit |

#### 5.3 Twitter Cards
| AC-SEO-009 | SEO | Twitter card | Summary card with image | P0 | Unit |
| AC-SEO-010 | SEO | Twitter site | @birrulabs handle linked | P2 | Unit |

#### 5.4 Schema.org
| AC-SEO-011 | SEO | Organization schema | Present on homepage | P0 | Unit |
| AC-SEO-012 | SEO | Article schema | Present on article pages | P0 | Unit |
| AC-SEO-013 | SEO | Breadcrumbs | Present on nested pages | P2 | Unit |

#### 5.5 hreflang
| AC-SEO-014 | SEO | hreflang pairs | ID/EN language pairs present | P0 | Unit |
| AC-SEO-015 | SEO | x-default | Correct x-default hreflang | P1 | Unit |

---

### 6. Performance

#### 6.1 Lighthouse Scores
| AC-PERF-001 | Performance | Performance score | ≥90 | P0 | E2E |
| AC-PERF-002 | Performance | Accessibility score | ≥95 | P0 | E2E |
| AC-PERF-003 | Performance | Best Practices score | ≥95 | P0 | E2E |
| AC-PERF-004 | Performance | SEO score | ≥95 | P0 | E2E |

#### 6.2 Core Web Vitals
| AC-PERF-005 | Performance | LCP | ≤1.8 seconds | P0 | E2E |
| AC-PERF-006 | Performance | FID | ≤100ms | P0 | E2E |
| AC-PERF-007 | Performance | CLS | ≤0.1 | P0 | E2E |
| AC-PERF-008 | Performance | TTI | ≤3.2 seconds | P1 | E2E |

#### 6.3 Bundle Size
| AC-PERF-009 | Bundle | HTML | ≤50KB uncompressed | P0 | Unit |
| AC-PERF-010 | Bundle | CSS | ≤100KB uncompressed | P0 | Unit |
| AC-PERF-011 | Bundle | JavaScript | ≤300KB uncompressed | P0 | Unit |
| AC-PERF-012 | Bundle | Fonts | ≤100KB | P1 | Unit |
| AC-PERF-013 | Bundle | Images | ≤200KB per image | P1 | Unit |

#### 6.4 Loading
| AC-PERF-014 | Loading | First paint | ≤1.5 seconds | P1 | E2E |
| AC-PERF-015 | Loading | Interactive | ≤3.5 seconds | P1 | E2E |

---

### 7. Security

#### 7.1 Security Headers
| AC-SEC-001 | Headers | HSTS | Present, max-age ≥31536000 | P0 | Integration |
| AC-SEC-002 | Headers | CSP | Present, restrictive policy | P0 | Integration |
| AC-SEC-003 | Headers | X-Content-Type-Options | nosniff | P0 | Integration |
| AC-SEC-004 | Headers | X-Frame-Options | DENY | P0 | Integration |
| AC-SEC-005 | Headers | X-XSS-Protection | 1; mode=block | P1 | Integration |
| AC-SEC-006 | Headers | Referrer-Policy | strict-origin-when-cross-origin | P1 | Integration |
| AC-SEC-007 | Headers | Permissions-Policy | Geolocation, mic, camera restricted | P2 | Integration |

#### 7.2 Input Validation
| AC-SEC-008 | Validation | Empty fields | Rejected with error | P0 | Unit |
| AC-SEC-009 | Validation | XSS attempts | Sanitized or rejected | P0 | Integration |
| AC-SEC-010 | Validation | SQL injection | Rejected | P0 | Integration |
| AC-SEC-011 | Validation | Email format | Validated against pattern | P0 | Unit |
| AC-SEC-012 | Validation | Message length | Min 10, max 1000 chars | P1 | Unit |

#### 7.3 CSRF Protection
| AC-SEC-013 | CSRF | Token generation | CSRF token generated | P0 | Unit |
| AC-SEC-014 | CSRF | Token validation | Invalid tokens rejected | P0 | Integration |
| AC-SEC-015 | CSRF | Same-site cookies | Session cookies set sameSite=Strict | P0 | Integration |

#### 7.4 Rate Limiting
| AC-SEC-016 | Rate Limit | Contact form | 10 requests/hour/IP enforced | P0 | Integration |
| AC-SEC-017 | Rate Limit | Login | 5 requests/minute/IP enforced | P1 | Integration |
| AC-SEC-018 | Rate Limit | API | General API endpoints limited | P2 | Integration |

---

### 8. Multilingual (ID/EN)

#### 8.1 Language Switching
| AC-I18N-001 | Language | Switcher visible | Language switcher present in header | P0 | E2E |
| AC-I18N-002 | Language | ID default | Default language is Indonesian | P0 | E2E |
| AC-I18N-003 | Language | URL structure | /id/ and /en/ routes work | P0 | E2E |
| AC-I18N-004 | Language | Content localized | All text translated correctly | P0 | Manual |
| AC-I18N-005 | Language | CTA buttons | Buttons localized | P0 | E2E |
| AC-I18N-006 | Language | Forms | Labels and validation localized | P0 | E2E |

#### 8.2 hreflang Implementation
| AC-I18N-007 | hreflang | Pairs | ID/EN pairs present on all pages | P0 | Unit |
| AC-I18N-008 | hreflang | x-default | x-default hreflang present | P1 | Unit |
| AC-I18N-009 | hreflang | canonical | Language-specific canonical URLs | P1 | Unit |

#### 8.3 SEO (Per Language)
| AC-I18N-010 | SEO | Meta tags | Unique per language | P0 | Unit |
| AC-I18N-011 | SEO | sitemap | Language-specific sitemap entries | P1 | Unit |

---

### 9. Content

#### 9.1 Homepage Content
| AC-CONTENT-001 | Content | Hero title | "Membangun solusi berbasis AI" (ID) / "Building human-centered AI" (EN) | P0 | Manual |
| AC-CONTENT-002 | Content | Hero subtitle | AI solutions for startups content | P0 | Manual |
| AC-CONTENT-003 | Content | Projects section | 6+ projects displayed | P1 | Manual |
| AC-CONTENT-004 | Content | Capabilities | 4 capabilities displayed | P1 | Manual |
| AC-CONTENT-005 | Content | Testimonials | 3 testimonials with real quotes | P2 | Manual |

#### 9.2 Project Content
| AC-CONTENT-006 | Content | Project title | Present in both languages | P0 | Manual |
| AC-CONTENT-007 | Content | Project description | Detailed service description | P0 | Manual |
| AC-CONTENT-008 | Content | Project metadata | Service type, date, tech stack | P1 | Manual |

#### 9.3 Article Content
| AC-CONTENT-009 | Content | Article title | Present in both languages | P0 | Manual |
| AC-CONTENT-010 | Content | Article metadata | Author, date, read time | P1 | Manual |
| AC-CONTENT-011 | Content | Article body | Formatted content, images | P0 | Manual |

---

### 10. Navigation

#### 10.1 Global Navigation
| AC-NAV-001 | Nav | PrimaryLinks | Home, About, Services, Projects, Articles, Contact | P0 | E2E |
| AC-NAV-002 | Nav | FooterLinks | Privacy, Terms, Social links | P0 | E2E |
| AC-NAV-003 | Nav | BreadCrumbs | Present on nested pages | P2 | E2E |

#### 10.2 Mobile Navigation
| AC-NAV-004 | Nav | HamburgerMenu | Toggles drawer | P0 | E2E |
| AC-NAV-005 | Nav | CloseMenu | Close via X or back button | P1 | E2E |
| AC-NAV-006 | Nav | BottomNav | Primary tabs on mobile | P1 | E2E |

#### 10.3 Internal Links
| AC-NAV-007 | Nav | RelativeLinks | Relative URLs used internally | P1 | Unit |
| AC-NAV-008 | Nav | BrokenLinks | No 404 errors on internal links | P0 | E2E |
| AC-NAV-009 | Nav | ExternalLinks | External links open in new tab | P2 | E2E |

---

### 11. Forms & User Experience

#### 11.1 Form Validation
| AC-FORM-X-001 | UX | Real-time | Email validation as user types | P2 | E2E |
| AC-FORM-X-002 | UX | Inline errors | Errors display next to fields | P0 | E2E |
| AC-FORM-X-003 | UX | Loading state | Loading indicator during submission | P1 | E2E |

#### 11.2 Error Handling
| AC-FORM-X-004 | UX | Network errors | Graceful error message | P1 | E2E |
| AC-FORM-X-005 | UX | Server errors | User-friendly error message | P0 | E2E |
| AC-FORM-X-006 | UX | Form reset | Success state clears form | P1 | E2E |

---

### 12. Dark Mode

#### 12.1 Theme System
| AC-THEME-001 | Theme | Toggle | Theme toggle present and functional | P1 | E2E |
| AC-THEME-002 | Theme | Persistence | Theme preference saved to localStorage | P1 | Unit |
| AC-THEME-003 | Theme | System detection | Respects prefers-color-scheme | P2 | Unit |

#### 12.2 Contrast (Dark Mode)
| AC-THEME-004 | Theme | Text contrast | ≥4.5:1 contrast in dark mode | P0 | Manual |
| AC-THEME-005 | Theme | Link visibility | Links distinguishable in dark mode | P0 | Manual |

---

## Non-Functional Requirements

### Performance
| NFR-PERF-001 | Response | Page load | < 3 seconds on 3G | P0 |
| NFR-PERF-002 | Response | API calls | < 500ms (p95) | P0 |
| NFR-PERF-003 | Scalability | Concurrent users | 1000+ simultaneous requests | P1 |
| NFR-PERF-004 | Availability | Uptime | 99.9% monthly uptime | P0 |

### Accessibility
| NFR-A11Y-001 | WCAG | Level AA | No violations on manual audit | P0 |
| NFR-A11Y-002 | Keyboard | Full access | All features accessible | P0 |
| NFR-A11Y-003 | Screen Reader | VoiceOver, NVDA | Compatible with主流 screen readers | P1 |

### Security
| NFR-SEC-001 | OWASP | Top 10 | No critical vulnerabilities | P0 |
| NFR-SEC-002 | TLS | HTTPS | All traffic HTTPS, HSTS enabled | P0 |
| NFR-SEC-003 | Data | No PII | No personal data stored client-side | P0 |

### Compatibility
| NFR-COMP-001 | Browser | Modern | Chrome, Firefox, Safari, Edge latest 2 versions | P0 |
| NFR-COMP-002 | Mobile | iOS/Android | Safari iOS, Chrome Android | P0 |
| NFR-COMP-003 | Device | Apple/Windows | No platform-specific bugs | P1 |

---

## Deploys & Environment

### Pre-Deploy Checklist
- [ ] All P0 acceptance criteria passing
- [ ] Lighthouse scores ≥ required thresholds
- [ ] No axe-core accessibility violations
- [ ] Security audit passed
- [ ] Bundle sizes within budget
- [ ] Dark mode tested
- [ ] Mobile touch targets verified

### Deployment
- [ ] Staging environment tested (same as production)
- [ ] Database migrations applied (if any)
- [ ] Environment variables configured
- [ ] CDN cache cleared
- [ ] Analytics verified

### Rollback Plan
- [ ] Git tag created for each release
- [ ] GitHub release notes published
- [ ] Rollback procedure documented
- [ ] Rollback tested in staging

---

## Exit Checklist

### Production Release
| Step | Requirement | Sign-off |
|------|-------------|----------|
| 1 | All P0 acceptance criteria | QA Lead |
| 2 | Lighthouse scores ≥ target | QA Lead |
| 3 | Accessibility audit passed | QA Lead |
| 4 | Security scan passed | DevOps |
| 5 | Performance budget met | QA Lead |
| 6 | Dark mode verified | QA Lead |
| 7 | Multilingual tested | QA Lead |
| 8 | Browser compatibility | QA Lead |
| 9 | Mobile device tested | QA Lead |
| 10 | Production build deployed | DevOps |

### Post-Deploy Verification
- [ ] Homepage loads on production
- [ ] All public pages accessible
- [ ] All forms functional
- [ ] Analytics tracking working
- [ ] Social sharing cards render correctly
- [ ] Mobile first viewport correct
- [ ] Dark mode toggle functional

---

## Priority Definitions

| Priority | Description | Impact if not met |
|----------|-------------|-------------------|
| P0 | Blocker | Cannot deploy to production |
| P1 | High | Production ready with caveats |
| P2 | Medium |nice to have, deferrable |
| P3 | Low | Enhancements, future iterations |

---

## Test Coverage Requirements

| Test Type | Coverage Target |
|-----------|-----------------|
| Unit Tests | ≥80% of new code |
| Integration Tests | All critical paths |
| E2E Tests | All user journeys |

---

*Acceptance criteria subject to update during development. Last validated: 2026-08-04.*