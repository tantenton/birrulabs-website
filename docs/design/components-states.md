# BirruLabs Component States

**Version:** 1.0.0 | **Last Updated:** 2026-08-04  
**Framework:** Tailwind-based (CSS custom properties)  
**Responsive:** Mobile-first (320px base)

---

## Button Components

### Default State

| Platform | Dark Mode | Light Mode |
|----------|-----------|------------|
| Primary | `bg-brand-primary text-white` | `bg-brand-primary text-white` |
| Secondary | `bg-transparent border border-default text-primary hover:border-brand-primary` | `bg-transparent border border-default text-primary hover:border-brand-primary` |
| Ghost | `bg-transparent text-primary hover:bg-surface-elevated` | `bg-transparent text-primary hover:bg-surface-elevated` |

### Hover State

| Button Type | Visual Change | Animation | Interaction |
|-------------|---------------|-----------|-------------|
| Primary | `10% darker` | `transition: background-color 150ms ease-smooth` | Cursor: pointer |
| Secondary | `border-color: brand-primary` | `transition: border-color 200ms ease-smooth` | Cursor: pointer |
| Ghost | `bg-overlay` | `transition: background-color 150ms ease-smooth` | Cursor: pointer |

### Focus State (Keyboard Nav)

| Property | Value | Shadow |
|----------|-------|--------|
| Outline | `2px solid brand-primary` | `ring-brand-primary` |
| Offset | 4px | `ring-offset-2` |
| Visible | Always | `focus:ring-2 focus:outline-none` |

### Active/Pressed State

| Platform | State | Animation |
|----------|-------|-----------|
| Mobile | `touch active` | `scale: 0.96` duration: 150ms |
| Desktop | `mousedown` | `scale: 0.98` duration: 100ms |

### Disabled State

| Property | Value |
|----------|-------|
| Opacity | `0.5` |
| Pointer Events | `none` |
| Cursor | `not-allowed` |

### Loading State

```
┌─────────────────────────────┐
│  [Spinner] Loading...       │
└─────────────────────────────┘
```

| Component | Behavior |
|-----------|----------|
| Spinner | Inline, rotate animation, 20px size |
| Text | `opacity: 0.8`, left-aligned |
| Width | Fixed (not expanded) |

---

## Input Components

### Default State

| Element | Dark Mode | Light Mode |
|---------|-----------|------------|
| Background | `bg-surface-inset` | `bg-surface-inset` |
| Border | `border border-default` | `border border-default` |
| Text | `text-primary` | `text-primary` |
| Placeholder | `text-tertiary` | `text-tertiary` |

### Focus State

| Property | Value |
|----------|-------|
| Border | `2px solid brand-primary` |
| Shadow | `ring-brand-primary` (4px) |
| Background | `bg-surface` |

### Error State

| Property | Value |
|----------|-------|
| Border | `2px solid brand-danger` |
| Background | `bg-error-bg` |
| Helper Text | `text-brand-danger` |
| Icon | `brand-danger` |

### Disabled State

| Property | Value |
|----------|-------|
| Background | `bg-surface-inset` (90% opacity) |
| Text | `text-disabled` |
| Border | `border-default` |

### Success State

| Property | Value |
|----------|-------|
| Border | `2px solid brand-accent` |
| Background | `bg-success-bg` |
| Icon | `brand-accent` |

---

## Card Components

### Default Card

```
┌─────────────────────────────────┐
│                                 │
│  [Content area]                 │
│                                 │
└─────────────────────────────────┘
```

| State | Behavior |
|-------|----------|
| Background | `bg-surface-elevated` |
| Border | `border border-default` |
| Border Radius | `radius-lg` (12px) |
| Padding | `spacer-6` (24px) |
| Shadow | `shadow-md` |

### Hover State (Desktop)

| Property | Value |
|----------|-------|
| Shadow | `shadow-lg` |
| Transform | `translateY(-4px)` |
| Transition | `ease-smooth 300ms` |

### Active State (Clickable)

| Property | Value |
|----------|-------|
| Background | `bg-surface` |
| Border | `border-brand-primary` |
| Text | `text-brand-primary` |

### Loading Skeleton

```
┌─────────────────────────────────┐
│ ┌─────────┐                     │
│ │███████  │  Title...           │
│ └─────────┘                     │
│                                 │
│  ┌──────────────────────────┐   │
│  │█████████████████████     │   │
│  └──────────────────────────┘   │
│                                 │
│  ┌────────┐ ┌────────┐          │
│  │█████   │ │█████   │          │
│  └────────┘ └────────┘          │
└─────────────────────────────────┘
```

| Element | Skeleton Color |
|---------|----------------|
| Images | `bg-surface-elevated` with shimmer |
| Headings | `bg-surface-elevated` |
| Body | `bg-surface-elevated` |
| Animation | `infinite` 1.5s duration |

### Error State

```
┌─────────────────────────────────┐
│  ⚠️  Something went wrong       │
│                                 │
│  [Error message]                │
│                                 │
│  [Retry]                        │
└─────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Border | `2px solid brand-danger` |
| Icon | `brand-danger` |
| Background | `bg-error-bg` |

---

## Navigation Components

### Menu Item

| State | Visual | Interaction |
|-------|--------|-------------|
| Default | `text-primary` | Hover: `bg-surface-elevated`, `text-brand-primary` |
| Active | `text-brand-primary font-semibold` | Pill indicator: `bg-brand-primary` |
| Focus | `ring-brand-primary` (2px) | Keyboard nav |
| Disabled | `opacity: 0.5` | `pointer-events: none` |

### Bottom Navigation Tab

| State | Icon | Label |
|-------|------|-------|
| Inactive | `text-tertiary` | `text-tertiary` |
| Active | `text-brand-primary` | `text-brand-primary font-medium` |
| Focus | `ring-2 ring-brand-primary` (48x48px) | WCAG compliant |

---

## Toast Notification

### Success Toast

```
┌─────────────────────────────────┐
│  ✓ Success!                     │
│  Your changes were saved.       │
│  [Dismiss]                      │
└─────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Background | `bg-success-bg` |
| Border | `border border-brand-accent` |
| Border Radius | `radius-md` |
| Animation | `slide-in right 300ms ease-smooth` |

### Error Toast

```
┌─────────────────────────────────┐
│  ✗ Error                        │
│  Could not save your changes.   │
│  [Dismiss] [Retry]              │
└─────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Background | `bg-error-bg` |
| Border | `border border-brand-danger` |
| Border Radius | `radius-md` |
| Animation | `slide-in right 300ms ease-smooth` |

### Info Toast

```
┌─────────────────────────────────┐
│  ℹ️  Information                 │
│  System maintenance scheduled.  │
│  [Dismiss]                      │
└─────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Background | `bg-surface-elevated` |
| Border | `border border-default` |
| Border Radius | `radius-md` |
| Animation | `slide-in right 300ms ease-smooth` |

---

## Modal/Dialog

### Default Modal

```
┌───────────────────────────────────┐
│  ┌─────────────────────────────┐  │
│  │  Title              [×]    │  │
│  │  ─────────────────────────  │  │
│  │                             │  │
│  │  [Main content]             │  │
│  │                             │  │
│  │  ─────────────────────────  │  │
│  │                             │  │
│  │  [Cancel] [Confirm]        │  │  ←(secondary, primary)
│  │                             │  │
│  └─────────────────────────────┘  │
└───────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Overlay | `bg-overlay` (70% opacity) |
| Backdrop Filter | `blur(2px)` |
| Modal Border Radius | `radius-xl` (16px) |
| Animation | `scale 300ms ease-smooth` |
| Padding | `spacer-6` (24px) |
| Close Button | `44x44px` touch target |

### Error Modal

```
┌───────────────────────────────────┐
│  ⚠️  Fatal Error                  │
│                                   │
│  [Error message in code block]    │
│                                   │
│  [Report] [Cancel] [Try Again]    │
└───────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Icon | `brand-danger` |
| Border | `4px solid brand-danger` |
| Background | `bg-surface-elevated` |

---

## Loading Indicators

### Spinner

```
┌─────────┐
│  ( Rotating )  │
└─────────┘
```

| Property | Value |
|----------|-------|
| Size | 20px-48px (configurable) |
| Border Width | 3px |
| Color | `text-brand-primary` (dark mode) |
| Animation | `cubic-bezier(0.8, 0.2, 0.4, 0.6)` |
| Rotation | 360° in 1s |

### Progress Bar

```
┌─────────────────────────────┐
│  ██████████░░░░░░░░░░       │
└─────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Background | `bg-surface-inset` |
| Fill | `bg-brand-primary` |
| Height | 4px |
| Border Radius | `radius-full` |
| Animation | `linear` |

---

## Empty States

### Default Empty

```
┌─────────────────────────────────┐
│                                 │
│      [Illustration]             │
│                                 │
│  No items found                 │
│                                 │
│  [Create New] [Try Again]       │
└─────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Icon Size | `icon-xl` (32px) |
| Text | `text-secondary` |
| Background | `bg-surface-inset` (optional) |

### Error Empty State

```
┌─────────────────────────────────┐
│      [Error Icon]               │
│                                 │
│  Failed to load                 │
│                                 │
│  [Retry] [Contact Support]      │
└─────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Icon | `brand-danger` |
| Text | `text-primary` |
| Actions | `primary, secondary button` |

---

## Form Components

### Checkbox

```
┌────────────────────────────────────┐
│  [✓]  Label text                   │
│      Subtext                       │
└────────────────────────────────────┘
```

| State | Visual |
|-------|--------|
| Unchecked | Empty box with border |
| Checked | `brand-primary` fill + white checkmark |
| Indeterminate | `brand-primary` fill with minus sign |
| Focus | `ring-brand-primary` (4px) |

### Radio Button

```
┌────────────────────────────────────┐
│  (•)  Option A                     │
│  (○)  Option B                     │
│  (○)  Option C                     │
└────────────────────────────────────┘
```

| State | Visual |
|-------|--------|
| Unselected | Empty circle with border |
| Selected | `brand-primary` fill |
| Focus | `ring-brand-primary` (4px) |

### Dropdown

```
┌─────────────────────────────┐
│  ▼ Select option            │  ←(label)
├─────────────────────────────┤
│                             │
│  [Option 1]                 │
│  [Option 2]                 │
│  [Option 3]                 │
│                             │
└─────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Chevron | `text-secondary` |
| Menu Background | `bg-surface-elevated` |
| Border | `border border-default` |
| Shadow | `shadow-lg` |
| Border Radius | `radius-lg` |

---

## Avatar Components

### Default Avatar

```
┌──────┐
│      │
│  📷  │
│      │
└──────┘
```

| Size | Dimensions | Border Radius |
|------|------------|---------------|
| `sm` | 32px | `radius-full` |
| `md` | 40px | `radius-full` |
| `lg` | 48px | `radius-full` |
| `xl` | 64px | `radius-full` |
| `2xl` | 80px | `radius-full` |

### Avatar with Status

```
┌────────┐
│        │
│  📷  ● │  ←(status indicator)
│        │
└────────┘
```

| Status | Color |
|--------|-------|
| Online | `brand-accent` |
| Offline | `text-tertiary` |
| Busy | `brand-danger` |
| Away | `brand-warning` |

---

## Badge Components

### Label Badge

```
┌────────┐
│ New    │  ←(pill shape)
└────────┘
```

| Variant | Background | Text |
|---------|------------|------|
| Primary | `bg-brand-primary` | `text-white` |
| Success | `bg-success-bg` | `text-brand-accent` |
| Warning | `bg-warning-bg` | `text-brand-warning` |
| Danger | `bg-error-bg` | `text-brand-danger` |
| Neutral | `bg-surface-inset` | `text-primary` |

| Property | Value |
|----------|-------|
| Font Size | `text-xs` (12px) |
| Padding | `2px 8px` |
| Border Radius | `radius-full` |
| Font Weight | `font-semibold` |

---

## Timeline Component

```
│  ● 2026-08-01  Project Launch
│     │
│  ● 2026-07-15  Research Phase
│     │
│  ● 2026-06-01  Design Sprint
└─────────────────────────────
```

| Element | Color |
|---------|-------|
| Line | `border-default` |
| Dot (active) | `bg-brand-primary` |
| Dot (inactive) | `bg-surface-inset` |
| Text | `text-secondary` |

---

## Data Table

### Default Row

```
┌─────────────────────────────────────┐
│  [ ]  Item Name       12 Aug 2026   │
└─────────────────────────────────────┘
```

| State | Visual |
|-------|--------|
| Hover | `bg-surface-elevated` |
| Focus | `ring-brand-primary` (outline) |
| Selection | `bg-brand-primary` + `text-white` |

### Loading Row

```
┌─────────────────────────────────────┐
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
└─────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Animation | `skeleton` 1.5s duration |
| Background | `bg-surface-elevated` |

---

## Code Snippet Component

### Default State

```
┌─────────────────────────────────────┐
│  const handleLogin = async () => {  │
│    try {                            │
│      await auth.signIn();           │
│    } catch (error) {                │
│      console.error(error);          │
│    }                                │
│  };                                 │
└─────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Background | `bg-surface-inset` |
| Border | `border border-default` |
| Border Radius | `radius-md` |
| Padding | `spacer-4` (16px) |
| Font | `font-mono` |

### Error State

```
┌─────────────────────────────────────┐
│  SyntaxError: Unexpected token      │
│  Line 4, Column 12                  │
│                                     │
│  [View full error]                  │
└─────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Background | `bg-error-bg` |
| Border | `border border-brand-danger` |

---

## Interactive Feedback

### Haptic Feedback

| Action | Intensity | Duration |
|--------|-----------|----------|
| Button press | Light | 40ms |
| Scroll to bottom | Light | 40ms |
| Selection change | Medium | 60ms |
| Error | Heavy | 100ms |
| Success | Light | 40ms |

### Toast Timing

| Duration | Usage |
|----------|-------|
| 3000ms | Success/info messages |
| 5000ms | Error messages (with retry) |
| 8000ms | Important notifications |

---

## Color-Coded States Summary

| State | Color Token | Usage Context |
|-------|-------------|---------------|
| Success | `brand-accent` (`\#10B981`) | Form success, completed tasks |
| Warning | `brand-warning` (`\#F59E0B`) | Pending items, deprecation notices |
| Error | `brand-danger` (`\#EF4444`) | Form errors, system failures |
| Info | `brand-primary` (`\#6366F1`) | Notifications, guidance |
| Neutral | `text-secondary` | Default text, helper text |

---

## Animation Timings

| Element | Duration | Easing |
|---------|----------|--------|
| Transitions | 150-300ms | `ease-smooth` |
| Modals | 300ms | `ease-smooth` |
| Toasts | 300ms | `ease-smooth` |
| Loading spinners | 1000ms (infinite) | Custom cubic-bezier |
| Skeletons | 1500ms (infinite) | Linear |

---

## Keyboard Navigation

| Action | Key | Focus State |
|--------|-----|-------------|
| Navigate | `Tab` / `Shift+Tab` | `ring-brand-primary` |
| Select | `Enter` / `Space` | Button active state |
| Close | `Escape` | Modal dismiss |
| Back | `ArrowLeft` (mobile) | Route change |
| Refresh | `R` (focus required) | Reload state |

---

## Error States by Context

| Context | Error State | User Action |
|---------|-------------|-------------|
| Form input | Red border + error text below | Correct input |
| API failure | Toast notification + retry button | Retry or cancel |
| Empty state | Illustration + action button | Create or search |
| Navigation error | 404 page | Go home |
| Auth error | Modal overlay | Re-authenticate |

---

## State Transition Matrix

```
Default → Hover → Focus → Active → Loading → Error → Success → Default
        ↑────────────────────────────────────────────────────────┘
```

| Transition | Animation | Duration |
|------------|-----------|----------|
| Default → Hover | Background/border | 150ms |
| Hover → Focus | Ring + shadow | 100ms |
| Focus → Active | Scale down | 50ms |
| Active → Loading | Spinner + opacity | 200ms |
| Loading → Error/Success | Expand to full state | 300ms |
| Error → Default | Shrink colapse | 200ms |
| Success → Default | Fade out | 300ms |
