# BirruLabs Accessibility Guidelines

**Version:** 1.0.0 | **Last Updated:** 2026-08-04  
**Compliance Target:** WCAG 2.1 Level AA  
**Contrast Target:** 4.5:1 (text), 3:1 (UI components)

---

## Accessibility Standards

### WCAG 2.1 Level AA Compliance

| Guideline | Requirement | BirruLabs Implementation |
|-----------|-------------|--------------------------|
| 1.1.1 Non-text Content | All images have alt text | Required via content workflow |
| 1.3.1 Info and Relationships | Semantic HTML + ARIA | Use semantic tags + correct ARIA |
| 1.3.2 Meaningful Sequence | Logical reading order | Visual order matches DOM order |
| 1.3.3 Sensory Characteristics | No reliance on sensory traits | Instructions include non-sensory cues |
| 1.4.1 Use of Color | Color not sole indicator | Icons + text + color |
| 1.4.2 Audio Control | Auto-playing audio controlled | No auto-play, easily disableable |
| 2.1.1 Keyboard | All functionality keyboard-accessible | Full keyboard navigation |
| 2.1.2 No Keyboard Trap | Users can navigate away | Focus management |
| 2.4.1 Bypass Blocks | Skip links for navigation | Skip main navigation |
| 2.4.2 Page Titled | Descriptive page titles | Template + context |
| 2.4.3 Focus Order | Logical focus sequence | Tab order follows visual flow |
| 2.4.4 Link Purpose | Link purpose in context | Descriptive link text |
| 3.1.1 Language of Page | `lang` attribute | `lang="en"` (primary) |
| 3.2.1 On Focus | No unexpected context change | Inputs update, no auto-submit |
| 3.2.2 On Input | No unexpected context change | Manual submit only |
| 4.1.2 Name, Role, Value | ARIA for dynamic content | Proper role + states |
| 4.1.3 Status Messages | Status updates via aria-live | Announced for important changes |

---

## Color Contrast

### Minimum Contrast Ratios

| Element | Normal Text | Large Text | UI Components |
|---------|-------------|------------|---------------|
| Normal | 4.5:1 | 3:1 | 3:1 |
| Large (18pt+, 14pt bold) | 3:1 | 2:1 | 2:1 |

### BirruLabs Color Palette Contrast

| Pair | Ratio | Passes AA? |
|------|-------|------------|
| `brand-primary` on `bg-surface` | 5.8:1 | ✓ Yes |
| `text-primary` on `bg-surface` | 16.1:1 | ✓ Yes |
| `text-secondary` on `bg-surface` | 5.0:1 | ✓ Yes |
| `brand-accent` on `bg-surface` | 3.9:1 | ✓ AA Large only |
| `brand-danger` on `bg-surface` | 4.6:1 | ✓ Yes |
| `brand-warning` on `bg-surface` | 2.4:1 | ✗ No (use only for UI, not text) |

### Text Alternatives

| Element | Alt Text Requirement |
|---------|---------------------|
| Decorative image | `alt=""` |
| Functional image | `alt="Description of action"` |
| Logo | `alt="BirruLabs logo"` |
| Icon (standalone) | `aria-label="Describe function"` |
| Icon (inline) | `aria-hidden="true"` + visible text |

---

## Touch Targets

### WCAG 2.1 Touch Target Requirement

| Screen Size | Minimum Touch Target | BirruLabs Target |
|-------------|---------------------|------------------|
| Any | 44x44px | **48x48px** (preferred) |

### Implementation

```css
/* Minimum touch target: 48px (44px + 2px padding each side) */
.touch-target {
  min-width: 48px;
  min-height: 48px;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Touch Target Sizes by Component

| Component | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| Button (primary) | 48x48px | 56x56px | 64x64px |
| Button (icon) | 48x48px | 56x56px | 64x64px |
| Tab bar item | 48x48px | 56x56px | 64x64px |
| Card (interactive) | 44x80px | 56x90px | 64x100px |
| Input field | 44x48px | 56x56px | 64x64px |
| Checkbox/Radio | 44x44px | 48x48px | 56x56px |
| Modal close | 44x44px | 48x48px | 56x56px |

### Interactive Element Spacing

| Gap | Minimum | Recommended |
|-----|---------|-------------|
| Between touch targets | 8px (spacer-2) | 16px (spacer-4) |
| Edge to first element | 16px (spacer-4) | 24px (spacer-6) |

---

## Keyboard Navigation

### Tab Order

1. **Primary navigation**
2. **Page content**
3. **Secondary navigation**
4. **Footer**

### Focus Management

| Behavior | Implementation |
|----------|----------------|
| Visible focus | `2px solid brand-primary`, 4px offset |
| Skip links | First in DOM, visible on focus |
| Modal trap | `aria-modal="true"`, focus return |
| Focus ring | Never remove (only replace with custom) |
| Hover/focus coexistence | Both states visible simultaneously |

### Keyboard Shortcuts

| Action | Key | Context |
|--------|-----|---------|
| Skip main nav | `Tab` | Page load |
| Back | `Escape` or `ArrowLeft` (mobile) | Any page |
| Refresh | `R` (requires focus) | Page content |
| Toggle theme | `T` | Global (Ctrl+Shift+T on desktop) |
| Search | `/` | Page with search |

### Focus States

```css
/* Custom focus ring */
.focus-ring {
  outline: 2px solid #6366F1;
  outline-offset: 4px;
  border-radius: 4px;
}

/* For dark mode */
[data-theme="dark"] .focus-ring {
  outline-color: #6366F1;
}
```

---

## Screen Reader Support

### ARIA Roles

| Component | ARIA Role | States |
|-----------|-----------|--------|
| Navigation | `role="navigation"` + `aria-label` | - |
| Main content | `role="main"` | - |
| Header | `role="banner"` | - |
| Footer | `role="contentinfo"` | - |
| Search | `role="search"` | - |
| Modal | `role="dialog"`, `aria-modal="true"` | `aria-labelledby`, `aria-describedby` |
| Toast | `role="status"`, `aria-live="polite"` | - |
| Error | `role="alert"`, `aria-live="assertive"` | - |

### Labeling

| Element | Requirement |
|---------|-------------|
| Form inputs | `aria-label` or `aria-labelledby` + `<label>` |
| Buttons | Visible text OR `aria-label` |
| Links | Descriptive link text |
| Icons | `aria-label` or visible text + `aria-hidden="true"` |
| Images | `alt` text OR `role="presentation"` |

###live Regions

| Region | Politeness | Usage |
|--------|------------|-------|
| Success messages | `polite` | Non-urgent updates |
| Error messages | `assertive` | Critical errors |
| Loading states | `polite` | Background updates |

```html
<!-- Example: Success toast -->
<div role="status" aria-live="polite" class="toast toast-success">
  ✓ Changes saved successfully
</div>

<!-- Example: Error alert -->
<div role="alert" aria-live="assertive" class="toast toast-error">
  ✗ Error saving changes
</div>
```

---

## Motion & Animations

### Reduced Motion

| Preference | Implementation |
|------------|----------------|
| `prefers-reduced-motion: reduce` | Disable all non-essential animations |
| No animation | Keep static states only |

### Accessibility Animation Policy

```css
/* Disable animations when user prefers reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Safe Animation Practices

| Animation | Allow? | Condition |
|-----------|--------|-----------|
| Fades | ✓ Yes | Any duration |
| Slides | ✓ Yes | < 500ms |
| Scaling | ✓ Yes | < 2x scale |
| Rotating | ✓ Yes | < 360° |
| Drastic position | ✗ No | Limit to 20px |
|page transitions | ✓ Yes | Fade only, 300ms |
| Auto-playing video | ✗ No | Never auto-play |

### Parallax/Depth

| Issue | Solution |
|-------|----------|
| Motion sickness | Ensure motion is optional |
| Cognitive load | Limit simultaneous animations |
| Accessibility | Pause on focus |

---

## Semantic HTML

### Required Elements

| Element | Requirement |
|---------|-------------|
| `<html>` | `lang="en"` attribute |
| `<head>` | `<title>` + `<meta charset="UTF-8">` |
| `<body>` | Skip navigation link (first child) |
| `<header>` | Banner role, site-wide nav |
| `<nav>` | Navigation role, `aria-label` |
| `<main>` | Main content role |
| `<footer>` | Contentinfo role |
| `<button>` | For clickable actions |
| `<a>` | For navigational links |
| `<form>` | With submit handler |

### Heading Structure

```html
<!-- ✓ Correct -->
<h1>BirruLabs</h1>
<h2>Projects</h2>
<h3>Particle教研 Net</h3>
<h2>Contact</h2>

<!-- ✗ Incorrect -->
<h2>BirruLabs</h2>  <!-- Skip to h3 -->
<h4>Projects</h4>   <!-- Skip level -->
```

### Landmark Navigation

| Section | ARIA Landmark | HTML Element |
|---------|--------------|--------------|
| Site branding | `banner` | `<header>` |
| Main nav | `navigation` | `<nav>` |
| Page content | `main` | `<main>` |
| Secondary nav | `navigation` | `<nav>` |
| Footer | `contentinfo` | `<footer>` |
| Search | `search` | `<section>` with role |

---

## Form Accessibility

### Required Attributes

| Element | Attributes |
|---------|-----------|
| `<label>` | `for` matches input `id` OR wrap input |
| `<input>` | `type`, `id`, `aria-describedby` (errors) |
| `<select>` | `id`, `aria-label` or `<label>` |
| `<textarea>` | `id`, `aria-label`, `rows` |

### Error Handling

```html
<!-- ✓ Correct -->
<label for="email">Email address</label>
<input
  id="email"
  name="email"
  type="email"
  aria-describedby="email-error"
  aria-invalid="true"
>
<p id="email-error" class="error-text">
  Please enter a valid email address
</p>

<!-- ✗ Incorrect -->
<input type="email">  <!-- No label -->
<!-- Or: -->
<input type="email" aria-label="Email">  <!-- Not visible -->
```

### Fieldsets & Legends

| Case | Requirement |
|------|-------------|
| Radio group | `<fieldset>` + `<legend>` |
| Checkbox group | `<fieldset>` + `<legend>` |
| Form section | `<section>` with heading |

---

## Theme Accessibility

### Dark Mode Considerations

| Issue | Solution |
|-------|----------|
| Text contrast | Ensure 4.5:1 ratio |
| Blue light | Reduced blue in dark mode |
| Fallback | Always provide light mode option |
| System detection | Use `prefers-color-scheme` media query |

### Color Blindness Support

| Type | Recommended Palette |
|------|---------------------|
| Deuteranopia | Avoid red-green pairs |
| Protanopia | Avoid red-green pairs |
| Tritanopia | Avoid blue-yellow pairs |
| Achromatopsia | High contrast only |

### Theme Toggle

```html
<!-- ✓ Accessibility pattern -->
<button
  aria-label="Toggle dark mode"
  aria-pressed="false"
  onclick="toggleTheme()"
>
  <icon name="sun" />
</button>
```

---

## Screen Reader Testing

### Testing Checklist

| Item | Test Method |
|------|-------------|
| Skip links | Focus + Enter |
| Page title | Screen reader announcement |
| Heading structure | `H` key navigation |
| Form errors | Submit with invalid data |
| Toast notifications | `Live regions` announcement |
| Modal focus trap | Tab through modal |
| Image alt text | `ALT` + `IMG` announcement |

### Screen Readers to Test

| Platform | Screen Reader | Notes |
|----------|---------------|-------|
| iOS | VoiceOver | Built-in |
| Android | TalkBack | Built-in |
| Windows |NVDA | Free, A11y tốt |
| macOS | VoiceOver | Built-in |
| ChromeOS | ChromeVox | Built-in |

---

## Focus Visibility

### Focus Ring Design

| State | Style |
|-------|-------|
| Default | `2px solid brand-primary` |
| Dark mode | `2px solid #6366F1` |
| Light mode | `2px solid #6366F1` |
| Offset | 4px |
| Border radius | 4px |
| `!important` | Yes (override user styles) |

### Focus Prevention

| Case | Solution |
|------|----------|
| Focus hidden | `tabindex="-1"` (not `display: none`) |
| Disabled element | `disabled` + `tabindex="-1"` |
| Valid focus target | `tabindex="0"` or native interactive element |

---

## Contrast Ratios by State

### Active vs Inactive

| State | Contrast Requirement |
|-------|---------------------|
| Active tab | 4.5:1 vs inactive |
| Selected item | 4.5:1 vs unselected |
| Current page | 3:1 vs archive |

### Interactive States

| State | Color Ratio | Requirement |
|-------|-------------|-------------|
| Success (text) | 4.5:1 | ✓ |
| Error (text) | 4.5:1 | ✓ |
| Link on dark | 4.5:1 | ✓ |
| Disabled text | 3:1 | ✓ (reduced) |

---

## Responsive Accessibility

| Screen Size | Consideration |
|-------------|---------------|
| Mobile (320px) | 48px minimum touch targets |
| Tablet (768px) | 48px minimum touch targets |
| Desktop (1024px+) | 44px minimum, larger preferred |

### Mobile-Specific Issues

| Issue | Solution |
|-------|----------|
| Accidental touches | 48px minimum, 8px padding |
| Small screens | Collapsible sections |
| Touch target overlap | Increase spacing |
| Virtual keyboard | Ensure input visibility |

---

## Testing Checklist

### Automated Testing

| Tool | Target | Status |
|------|--------|--------|
| Lighthouse | 95+ accessibility | ✓ Target |
| axe-core | WCAG 2.1 AA | ✓ Automated |
| WAVE | No errors | ✓ Manual spot-check |

### Manual Testing

| Action | Verify |
|--------|--------|
| Tab navigation | Logical order |
| Focus visibility | Always visible |
| Skip links | Work on every page |
| Keyboard only | No mouse required |
| Zoom 200% | No horizontal scroll |
| High contrast | Readable text |
| Screen reader | All content announced |

---

## Accessibility Statement

### Public Version

> **BirruLabs is committed to accessibility.**
>
> We strive to ensure our website meets WCAG 2.1 Level AA standards. If you experience any accessibility barriers, please contact us at accessibility@birrulabs.biz.id.
>
> We continuously improve our site based on user feedback and automated testing.

---

## Known Limitations

| Issue | Impact | Mitigation |
|-------|--------|------------|
| Complex data tables | Screen reader navigation | Summarize key data in text |
| Custom SVG icons | May not be recognized | `aria-label` on all icons |
| Parallax effects | Motion sensitivity | `prefers-reduced-motion` |

---

## Contact

**Accessibility Lead:** engineering@birrulabs.biz.id  
**Last Updated:** 2026-08-04  
**Compliance Level:** WCAG 2.1 AA (target)
