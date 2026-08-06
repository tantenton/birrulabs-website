# Known Issues — BirruLabs Web v1.0 RC

**Date:** 2026-08-06  
**Branch:** redesign/stitch-v1

## Open Issues

### High Priority
None blocking production.

### Medium Priority

1. **Contact form — no real API**  
   Form validates client-side and simulates success.  
   Action needed: Wire to real endpoint (Supabase, Resend, or Formspree).

2. **Privacy / Terms / Security pages — stub**  
   Pages exist and render but content is placeholder layout.  
   Action needed: Add real legal content before public launch.

3. **OG image — text only**  
   No branded OG image. Social shares show text metadata only.  
   Action needed: Generate static OG image (1200×630) and add to root metadata.

### Low Priority

4. **sharp CVE-2026-33327/33328/35590/35591**  
   Transitive dependency via Next.js imageOptimizer.  
   No image upload/processing in this site — attack surface not applicable.  
   Resolution: Wait for Next.js patch or upgrade to Next.js 16 when stable.

5. **Command palette mobile trigger**  
   Search button hidden on mobile. Users must use desktop or know Ctrl+K.  
   Action needed: Add search icon to mobile burger menu.

6. **Lighthouse score not measured**  
   Requires Vercel preview environment.  
   Action needed: Run lighthouse-ci after first preview deploy.

7. **project-detail mobile cold-load timeout**  
   First navigation to project detail on cold dev server may timeout.  
   Not reproducible in production build.

## Resolved Issues

- Double `<main>` tag — fixed (pt-16 wrapper in layout)
- Navbar sticky overlap — fixed (global offset)
- `@apply` with nested tokens — fixed (CSS vars direct)
- dev server ENOENT vendor-chunks — fixed (clean rebuild)
- useInView TypeScript RefObject type error — fixed
