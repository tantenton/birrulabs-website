# BirruLabs Website Security Controls

**Document Version:** 1.0  
**Date:** 2026-08-04  
**Project:** BirruLabs Official Website (birrulabs.biz.id)

---

## Overview

This document specifies the security controls implemented on the BirruLabs website. Controls are organized by category with implementation details, configuration, and verification procedures.

---

## 1. Content Security Policy (CSP)

### Policy

```
Content-Security-Policy: default-src 'self'; 
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net;
  img-src 'self' data: https:; 
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://analytics.example.com;
  frame-ancestors 'self';
  frame-src 'none';
  base-uri 'self';
  form-action 'self';
  media-src 'self';
  object-src 'none';
  upgrade-insecure-requests;
```

### Implementation (Next.js)

```javascript
// next.config.js
const nextConfig = {
  security: {
    cspHeader: true,
    cspMode: 'report',
    cspReportOnly: false,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'self'; form-action 'self'; object-src 'none'; base-uri 'self';",
          },
        ],
      },
    ];
  },
};
```

### Verification

```bash
curl -I https://birrulabs.biz.id | grep -i "content-security-policy"
```

### Monitoring

Use browser console or reporting API to detect CSP violations.

---

## 2. Secure HTTP Headers

### Required Headers

| Header | Value | Purpose |
|--------|-------|---------|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` | SSL/TLS enforcement |
| `X-Content-Type-Options` | `nosniff` | MIME type sniffing prevention |
| `X-Frame-Options` | `DENY` | Clickjacking prevention |
| `X-XSS-Protection` | `1; mode=block` | XSS filter (legacy) |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Referrer leakage control |
| `Permissions-Policy` | `geolocation=(), microphone=(), camera=()` | Feature restriction |
| `Cache-Control` | `no-store, no-cache, must-revalidate` | Sensitive data protection |

### Implementation (Next.js)

```javascript
// next.config.js
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains; preload',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'geolocation=(), microphone=(), camera=()',
        },
        {
          key: 'Cache-Control',
          value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      ],
    },
  ];
}
```

### Verification

```bash
curl -I https://birrulabs.biz.id | grep -E "(Strict-Transport|X-Content-Type|X-Frame|X-XSS|Referrer|Permissions)"
```

---

## 3. Rate Limiting

### Endpoints Requiring Rate Limiting

| Endpoint | Limit | Window |	Action on Exceed |
|----------|-------|--------|-----------------|
| `/api/contact` | 10/hour | Hourly | 429 response |
| `/api/login` | 5/minute | Minute | Captcha challenge |
| `/api/admin/*` | 20/hour | Hourly | IP block (30 min) |
| `/blog/rss` | 100/hour | Hourly | Throttle response |

### Implementation (Next.js API Routes)

```typescript
// lib/rateLimit.ts
export function createRateLimiter(options: {
  windowMs: number;
  max: number;
}) {
  const points: { [key: string]: number[] } = {};
  
  return (req: NextRequest, res: NextResponse) => {
    const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    
    if (!points[ip]) {
      points[ip] = [];
    }
    
    points[ip] = points[ip].filter(
      (timestamp) => now - timestamp < options.windowMs
    );
    
    if (points[ip].length >= options.max) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }
    
    points[ip].push(now);
    return null; // Continue
  };
}
```

### Cloudflare Rate Limiting (Alternative)

```json
{
  "rule": {
    "description": "Contact form rate limit",
    "action": "challenge",
    "expression": "(http.request.method eq \"POST\" and http.request.uri.path contains \"/api/contact\")",
    "limit": "10r1h",
    "measure": "requests",
    "period": "3600"
  }
}
```

### Verification

```bash
# Test rate limiting
for i in {1..15}; do curl -s -o /dev/null -w "%{http_code}\n" -X POST https://birrulabs.biz.id/api/contact; done
```

---

## 4. Input Validation

### Client-Side Validation

```typescript
// utils/validation.ts
export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});

export const adminSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(12, "Password must be at least 12 characters"),
});
```

### Server-Side Validation

```typescript
// app/api/contact/route.ts
import { contactSchema } from '@/utils/validation';

export async function POST(request: Request) {
  const body = await request.json();
  
  const validation = contactSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { errors: validation.error.errors },
      { status: 400 }
    );
  }
  
  // Sanitize inputs
  const sanitized = {
    name: sanitizeHtml(body.name, { allowedTags: [], allowedAttributes: {} }),
    email: body.email.toLowerCase().trim(),
    message: sanitizeHtml(body.message, { allowedTags: ['b', 'i', 'u', 'em', 'strong'] }),
  };
  
  // Rate limiting check here
  // ... proceed with processing
}
```

### Allowed HTML Tags for User Content

Only safe tags are allowed in user-submitted content:
- Text formatting: `b`, `i`, `u`, `em`, `strong`, `a`, `br`
- Attributes: `href` (HTTPS only), `title`
- All other tags stripped
- Event handlers removed

---

## 5. CSRF Protection

### Implementation

```typescript
//lib/csrf.ts
import crypto from 'crypto';

export function generateCsrfToken() {
  return crypto.randomNodeKey(32).toString('hex');
}

export function validateCsrfToken(token: string, stored: string): boolean {
  return token && stored && token === stored;
}
```

### Form Token Pattern

```tsx
// components/ContactForm.tsx
export default function ContactForm() {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    fetch('/api/csrf-token')
      .then(r => r.json())
      .then(data => setCsrfToken(data.token));
  }, []);

  return (
    <form method="POST" action="/api/contact">
      <input type="hidden" name="csrfToken" value={csrfToken} />
      {/* ... form fields */}
    </form>
  );
}
```

### API Protection

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  if (request.method === 'POST') {
    const token = request.headers.get('x-csrf-token');
    const stored = request.cookies.get('csrf');
    
    if (!token || !stored || token !== stored) {
      return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
    }
  }
  
  return NextResponse.next();
}
```

---

## 6. Authentication & Session Security

### Session Configuration

```javascript
// Session cookie settings
{
  name: 'session',
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 3600, // 1 hour
  path: '/',
}
```

### Admin Authentication Flow

1. User submits credentials
2. Server validates against database
3. Session token generated (JWT or server-side)
4. Token stored in HTTP-only, secure cookie
5. Each admin request validates session token

### Password Requirements

- Minimum 12 characters
- Mix of uppercase, lowercase, numbers, special characters
- No password reuse (future enhancement)
- Password stored with bcrypt (cost factor: 12)

```typescript
// utils/auth.ts
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function validatePassword(
  password: string,
  hashed: string
): Promise<boolean> {
  return bcrypt.compare(password, hashed);
}
```

---

## 7. Dependency Security

### Dependency Audit Process

```bash
# Weekly audit
npm audit --recursive --audit-level=moderate

# Verify lock file
npm ci --check

# Update dependencies
npm update
```

### Automated Tools

1. **npm audit** - NPM's built-in vulnerability scanner
2. **Snyk** - Continuous vulnerability monitoring
3. **Dependabot** - Automated PRs for dependency updates

### Critical dependency policy

- Immediate update for CVEs with CVSS > 7.0
- 7-day window for CVSS 4.0-7.0
- 30-day window for CVSS < 4.0
- Security patches take priority over regular updates

---

## 8. Admin Area Security

### Access Control

| Role | Permissions |
|------|-------------|
| Admin | Full access to admin panel |
| Editor | Content creation/moderation only |
| Viewer | Read-only access to analytics |

### MFA (Multi-Factor Authentication)

- Google Authenticator / Authy supported
- Backup codes generated on MFA setup
- Recovery process documented

### IP Whitelisting (Optional)

```nginx
# nginx.conf
location /admin {
  allow 192.168.1.0/24;
  allow 10.0.0.0/8;
  deny all;
}
```

---

## 9. Content Protection

### Image Hotlink Protection

```nginx
# nginx.conf
location ~* \.(jpg|jpeg|png|gif|webp)$ {
  valid_referers birrulabs.biz.id birrulabs.com;
  if ($invalid_referer) {
    return 403;
  }
}
```

### File Upload Restrictions (Admin Only)

```typescript
// Validation for file uploads
const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const maxFileSize = 5 * 1024 * 1024; // 5MB

export function validateFile(file: File): boolean {
  if (!allowedTypes.includes(file.type)) {
    return false;
  }
  if (file.size > maxFileSize) {
    return false;
  }
  return true;
}
```

---

## 10. Third-Party Service Security

### Analytics

- Use privacy-focused analytics (first-party collection)
- Anonymize IP addresses
- No PII transmission

### CDN

- CORS properly configured
- CORS allowed origins: birrulabs.biz.id only
- CDN security headers enabled

### Fonts & Libraries

- Only from trustedCDNs (jsDelivr, unpkg, Google Fonts)
- Subresource Integrity (SRI) enabled
- ```html
<link rel="preconnect" href="https://fonts.googleapis.com" integrity="sha384..." crossorigin>

---

## Verification Checklist

| Control | Verification Method | Frequency |
|---------|---------------------|-----------|
| CSP headers | curl -I | Continuous |
| HSTS | curl -I | Continuous |
| Rate limiting | Load testing | Weekly |
| Input validation | Penetration test | Monthly |
| CSRF tokens | Code review | PR review |
| Dependency vulns | npm audit | Weekly |
| Admin auth | Access log review | Weekly |
| Session security | Cookie inspection | Monthly |

---

## Compliance Notes

- OWASP Top 10 compliance: Target
- PCI DSS: Not applicable (no payment processing)
- GDPR: Compliant (no PII collection beyond analytics)
- CCPA: Compliant (no personal data retention)
