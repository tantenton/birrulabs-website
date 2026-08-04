# Navigation Architecture

**Project:** BirruLabs Official Website  
**Design Principle:** Mobile-first, progressive enhancement, bilingual (ID/EN) support

---

## Overview

BirruLabs website navigation follows a progressive disclosure pattern:
- **Mobile (≤768px):** Hamburger menu, simplified top navigation, quick-actions bar
- **Tablet (769-1024px):** Expanded sidebar, breadcrumb navigation, language toggle
- **Desktop (≥1025px):** Full top navigation with dropdowns, secondary navigation, contextual actions

---

## Mobile Navigation (≤768px)

### Top Bar (Fixed)
| Element | Description |
|---------|-------------|
| `☰ Menu` | Hamburger icon opens main navigation drawer |
| `birrulabs` | Logo/link to home |
| `ID` / `EN` | Language toggle (primary/secondary indicator) |
| `▾` | Language dropdown (toggles between ID/EN) |

### Navigation Drawer (Slide-in from left)
**Header:**
- User status (if authenticated): "Halo, [name]" or "Sign in"
- Quick actions: "Post case study" (CTA)

**Primary Navigation:**
```
☰ Tentang (About)
☰ Produk (Products)
☰ Proyek (Projects)
☰ Artikel (Articles)
☰ Profil Startup (Startup Profile)
☰ Kontak (Contact)
```

**Secondary Navigation:**
```
 Careers
 Privacy Policy
 Terms of Service
```

**Footer Actions:**
- `Hubungi kami` (Contact us) - opens form modal
- `Daftar startup` (Join startup program) - CTA button

---

## Tablet Navigation (769-1024px)

### Top Bar (Fixed)
| Element | Description |
|---------|-------------|
| `←` | Back button (when navigating sub-pages) |
| `birrulabs` | Logo/link to home |
| `ID` / `EN` | Language toggle |

### Left Sidebar (Collapsible)
**Main Links:**
```
🏠 Beranda (Home)
ℹ️ Tentang (About)
📦 Produk (Products)
📂 Proyek (Projects)
📝 Artikel (Articles)
🚀 Profil Startup (Startup Profile)
✉️ Kontak (Contact)
```

**Additional:**
```
📋 Karir (Careers)
🔒 Kebijakan Privasi (Privacy)
📄 Syarat & Ketentuan (Terms)
```

---

## Desktop Navigation (≥1025px)

### Top Navigation Bar (Fixed)
```
birrulabs | Tentang | Produk | Proyek | Artikel | Profil Startup | Kontak
          [ dropdown: Tentang → About Us, Mission, Team, Contact, Careers ]
          [ dropdown: Produk   → AI Credits, Agent Systems, Automation ]
          [ dropdown: Proyek   → Portfolio, Case Studies, Success Stories ]
          [ dropdown: Artikel  → Blog, Insights, Resources ]
```

**Right Side:**
- `Language: ID | EN` (dropdown)
- `Sign in` / `Sign up` (auth state dependent)
- `Post Case Study` (CTA button)

### Secondary Navigation (Contextual)
Appears on content pages:
```
Home → Proyek → AI Agents → Sub-page
```

---

## Bilingual Navigation Strategy

### URL Structure
| Language | Path Prefix |
|----------|-------------|
| Indonesian (primary) | `/id/*` |
| English (secondary) | `/en/*` |
| Default | `/id/*` (redirect from root) |

### Language Detection
1. URL prefix present → use that language
2. Cookie: `preferred_language=...`
3. Browser Accept-Language header
4. Fallback: Indonesian

### Content Sync
All bilingual pages must be:
- Versioned together
- Linked via `hreflang` in `<head>`
- Update simultaneously when content changes

---

## Navigation Component API

```typescript
interface NavLink {
  label: string;
  path: string;
  lang?: 'id' | 'en';
  isActive?: boolean;
  children?: NavLink[];
}

interface NavigationConfig {
  mobile: NavLink[];
  tablet: NavLink[];
  desktop: NavLink[];
}
```

---

## Accessibility Requirements

- All navigation must be keyboard-navigable (Tab, Arrow keys)
- Active state must be visually distinct (color, bold, underline)
- Language toggle must announce current language and available options
- Skip-to-content link on first tab (for screen readers)

---

## Responsive Breakpoints

| Breakpoint | Width | Navigation Style |
|------------|-------|------------------|
| Mobile | ≤768px | Drawer-based, hamburger menu |
| Tablet | 769-1024px | Sidebar navigation |
| Desktop | ≥1025px | Top dropdown navigation |

---

## Future Enhancements

- [ ] Multi-level dropdowns for complex sections
- [ ] Search integration (global search modal)
- [ ] Sticky navigation on scroll (reveal on scroll-up)
- [ ] Dark mode navigation toggle
- [ ] Voice navigation (for accessibility)
