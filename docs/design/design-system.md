# BirruLabs Design System

**Version:** 1.0.0 | **Last Updated:** 2026-08-04  
**License:** Proprietary — BirruLabs Internal Use

---

## Typography

### Type Scale (Mobile-First)

| Token | Mobile | Tablet | Desktop |
|-------|--------|--------|---------|
| `text-xs` | 12px (18px line) | 12px (18px line) | 12px (18px line) |
| `text-sm` | 14px (21px line) | 14px (21px line) | 14px (21px line) |
| `text-base` | 16px (24px line) | 16px (24px line) | 16px (24px line) |
| `text-lg` | 18px (27px line) | 20px (30px line) | 20px (30px line) |
| `text-xl` | 20px (30px line) | 24px (36px line) | 24px (36px line) |
| `text-2xl` | 24px (36px line) | 32px (48px line) | 32px (48px line) |
| `text-3xl` | 28px (42px line) | 40px (60px line) | 40px (60px line) |
| `text-4xl` | 36px (54px line) | 48px (72px line) | 48px (72px line) |
| `text-5xl` | 48px (72px line) | 64px (96px line) | 64px (96px line) |

### Font Stack

| Token | Mobile | Tablet/Desktop |
|-------|--------|----------------|
| `font-sans` | Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif | Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif |
| `font-mono` | "JetBrains Mono", "Fira Code", Menlo, Monaco, Consolas, monospace | "JetBrains Mono", "Fira Code", Menlo, Monaco, Consolas, monospace |
| `font-display` | "IBM Plex Sans", "Inter Display", system-ui, sans-serif | "IBM Plex Sans", "Inter Display", system-ui, sans-serif |

### Weights

| Token | Usage |
|-------|-------|
| `font-light` | Captions, helper text |
| `font-normal` | Body text |
| `font-medium` | Labels, menu items |
| `font-semibold` | Headings, key primary text |
| `font-bold` | Highlights, accents |
| `font-black` | Display headlines |

### Line Heights

| Token | Value |
|-------|-------|
| `leading-tight` | 1.25 |
| `leading-snug` | 1.375 |
| `leading-normal` | 1.5 |
| `leading-relaxed` | 1.625 |
| `leading-loose` | 2.0 |

---

## Color Palette

### Core Palette (Dark-First Adaptive)

#### Background

| Token | Dark Mode | Light Mode | Usage |
|-------|-----------|------------|-------|
| `bg-surface` | `\#0F1115` | `\#FFFFFF` | Main surface |
| `bg-surface-elevated` | `\#16191F` | `\#F8F9FC` | Cards, modals |
| `bg-surface-inset` | `\#1A1D23` | `\#F0F2F5` | Inputs, code blocks |
| `bg-overlay` | `rgba(15, 17, 21, 0.7)` | `rgba(255, 255, 255, 0.7)` | Backdrop overlays |

#### Text

| Token | Dark Mode | Light Mode | Usage |
|-------|-----------|------------|-------|
| `text-primary` | `\#F0F2F5` | `\#0F1115` | Headings, body |
| `text-secondary` | `\#A3A6AC` | `\#525458` | Subheadings, metadata |
| `text-tertiary` | `\#6C6F75` | `\#787B7F` | helper text, placeholders |
| `text-disabled` | `\#3A3D42` | `\#C9CACE` | Disabled states |

#### Accent

| Token | Dark Mode | Light Mode | Usage |
|-------|-----------|------------|-------|
| `brand-primary` | `\#6366F1` | `\#6366F1` | Primary actions, links |
| `brand-primary-dark` | `\#4F46E5` | `\#4338CA` | Primary hover |
| `brand-accent` | `\#10B981` | `\#10B981` | Success, affirmations |
| `brand-warning` | `\#F59E0B` | `\#F59E0B` | Warnings, highlights |
| `brand-danger` | `\#EF4444` | `\#EF4444` | Errors, destructive |

#### Border

| Token | Dark Mode | Light Mode | Usage |
|-------|-----------|------------|-------|
| `border-default` | `\#2D3036` | `\#E4E6EB` | Dividers, input borders |
| `border-focus` | `\#6366F1` | `\#6366F1` | Focus rings |
| `border-error` | `\#EF4444` | `\#EF4444` | Error states |

#### Utility

| Token | Dark Mode | Light Mode | Usage |
|-------|-----------|------------|-------|
| `success-bg` | `rgba(16, 185, 129, 0.1)` | `rgba(16, 185, 129, 0.08)` | Success backgrounds |
| `warning-bg` | `rgba(245, 158, 11, 0.1)` | `rgba(245, 158, 11, 0.08)` | Warning backgrounds |
| `error-bg` | `rgba(239, 68, 68, 0.1)` | `rgba(239, 68, 68, 0.08)` | Error backgrounds |
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.2)` | `0 1px 2px rgba(0,0,0,0.08)` | Subtle elevation |
| `shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.2)` | `0 4px 6px -1px rgba(0,0,0,0.08)` | Cards, dropdowns |
| `shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.3)` | `0 10px 15px -3px rgba(0,0,0,0.1)` | Modals, overlays |
| `shadow-inset` | `inset 0 1px 3px rgba(0,0,0,0.2)` | `inset 0 1px 3px rgba(0,0,0,0.08)` | Input fields |

---

## Spacing

### Base Unit: 8px

| Token | Value | Use Case |
|-------|-------|----------|
| `spacer-1` | 4px | Tight spacing, icon margins |
| `spacer-2` | 8px | Inline spacing, small gaps |
| `spacer-3` | 12px | Compact spacing, pills |
| `spacer-4` | 16px | Standard container padding |
| `spacer-5` | 20px | Card body padding |
| `spacer-6` | 24px | Section spacing, card headers |
| `spacer-8` | 32px | Section gaps, layout gutters |
| `spacer-10` | 40px | Large section spacing |
| `spacer-12` | 48px | Hero sections |
| `spacer-16` | 64px | Full-width section margins |
| `spacer-20` | 80px | Grid column gaps |

### Responsive Variants

| Screen | Container Width | Horizontal Padding | Max Width |
|--------|-----------------|-------------------|-----------|
| Mobile | 100% (auto scroll) | `spacer-4` (16px) | 100% |
| Tablet | Auto (max 768px) | `spacer-6` (24px) | 768px |
| Desktop | Auto (max 1200px) | `spacer-8` (32px) | 1200px |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 4px | Small buttons, badges |
| `radius-md` | 8px | Standard buttons, cards |
| `radius-lg` | 12px | Modals, cards, sheets |
| `radius-xl` | 16px | Full-page modals |
| `radius-2xl` | 24px | Large modals |
| `radius-full` | 9999px | Pills, circular avatars |

---

## Shadows

| Token | Dark Mode | Light Mode | Usage |
|-------|-----------|------------|-------|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.2)` | `0 1px 2px rgba(0,0,0,0.08)` | Input borders, subtle elevation |
| `shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.2)` | `0 4px 6px -1px rgba(0,0,0,0.08)` | Cards, dropdowns |
| `shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.3)` | `0 10px 15px -3px rgba(0,0,0,0.1)` | Modals, popovers |
| `shadow-lg-day` | `0 20px 25px -5px rgba(0,0,0,0.4)` | `0 20px 25px -5px rgba(0,0,0,0.15)` | Deep elevation |

---

## Icons

### Standard Sizes

| Token | Size | Use Case |
|-------|------|----------|
| `icon-sm` | 16px | Inline icons, badges |
| `icon-md` | 20px | Technical specs, metadata |
| `icon-lg` | 24px | Primary interactions |
| `icon-xl` | 32px | Feature highlights |
| `icon-2xl` | 48px | Hero sections, empty states |
| `icon-3xl` | 64px | Full-screen illustrations |

### Stroke Width
| Token | Value | Usage |
|-------|-------|-------|
| `stroke-thin` | 1.5px | Detailed icons |
| `stroke-default` | 2px | Standard icons |
| `stroke-bold` | 3px | Bold system icons |

---

## Duration & Easing

### Animation Speeds

| Token | Duration | Use Case |
|-------|----------|----------|
| `duration-fast` | 150ms | Button clicks, toggles |
| `duration-normal` | 300ms | Dialogs, panels |
| `duration-slow` | 500ms | Page transitions, large modals |

### Easing Curves

| Token | Value | Use Case |
|-------|-------|----------|
| `ease-smooth` | `cubic-bezier(0.4, 0, 0.2, 1)` | UI transitions |
| `ease-elastic` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Attention-grabbing |
| `ease-gentle` | `cubic-bezier(0.4, 0, 0.6, 1)` | Scroll-to, pagination |

---

## Z-Index Scale

| Token | Value | Usage |
|-------|-------|-------|
| `z-dropdown` | 1000 | Dropdown menus |
| `z-sticky` | 1020 | Sticky headers, nav |
| `z-fixed` | 1030 | Fixed position elements |
| `z-modal-backdrop` | 1040 | Modal overlays |
| `z-modal` | 1050 | Modal content |
| `z-popover` | 1060 | Tooltips, popovers |
| `z-toast` | 1070 | Notification toasts |

---

## Accessibility

### Focus States

| Token | Value |
|-------|-------|
| `focus-ring` | 2px solid `brand-primary`, 4px offset |
| `focus-ring-outline` | 2px solid `text-primary`, 2px offset |
| `focus-ring-error` | 2px solid `brand-danger`, 2px offset |

### Minimum Touch Targets

| Token | Size | Requirement |
|-------|------|-------------|
| `touch-target` | 44x44px | WCAG 2.1 AA compliant |
| `touch-target-large` | 48x48px | Preferred for primary actions |

---

## Dark Mode Toggle Behavior

- Default: **Dark mode** for technical品牌 (AI, automation, developer)
- System preference detection: **Enabled**
- User preference persistence: **localStorage**
- Theme switch animation: **300ms ease-smooth**
