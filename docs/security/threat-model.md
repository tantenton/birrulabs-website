# BirruLabs Website Threat Model

**Document Version:** 1.0  
**Date:** 2026-08-04  
**Project:** BirruLabs Official Website (birrulabs.biz.id)  
**Stack:** Next.js 15 + TypeScript + Tailwind + PostgreSQL/Supabase

---

## Executive Summary

This threat model identifies security risks to the BirruLabs public website and maps them to implemented security controls. The website serves as a company profile, portfolio showcase, content hub, and technical showcase with no PII collection beyond standard web analytics.

---

## Assets

| Asset | Description | Sensitivity |
|-------|-------------|-------------|
| Website content | Public-facing pages, blog posts, case studies | Low |
| Contact forms | User-submitted information | Medium |
| Admin panel | CMS/content management interface | High |
| Dependencies | npm modules, libraries | Medium |
| Infrastructure | Hosting, CDN, DNS | High |
| Authentication system | Admin login and session management | High |

---

## Threat Actors

| Actor | Motivation | Capability |
|-------|------------|------------|
| Script kiddies | Spam, defacement | Low |
| Competitors | Disruption, reputation damage | Medium |
| Malicious actors | Credential theft, data leak | Medium-High |
| Automated bots | Scraping, form spam | Low-Medium |

---

## Threat Categories & Mitigations

### 1. Form Spam / Bot Submission

**Description:** Automated bots submitting spam content through contact forms.

**Potential Impact:** Server resource exhaustion, spam in analytics, reputational damage.

**Threat Agents:** Automated bots, script kiddies.

**Attack Vectors:**
- HTTP form submission endpoints
- API routes without rate limiting
- Missing CAPTCHA or token validation

**Existing Controls:**
- Rate limiting on form submission endpoints
- Form tokens (CSRF protection)
- Bot detection via user-agent analysis
- CAPTCHA integration (optional enhancement)

**Residual Risk:** Medium - bots may evades simple checks

---

### 2. Content Injection / XSS

**Description:** Injection of malicious scripts through user inputs or content management.

**Potential Impact:** Session hijacking, credential theft, defacement, phishing.

**Threat Agents:** Malicious actors with form access, compromised admin accounts.

**Attack Vectors:**
- User-submitted comments or contact form fields
- Admin content management without proper escaping
- Dynamic component rendering with untrusted data

**Existing Controls:**
- React/Next.js automatic XSS escaping
- Content Security Policy (CSP) headers
- Input validation and sanitization
- Admin role-based access control

**Residual Risk:** Low - mitigated by framework and CSP

---

### 3. Unauthorized Admin Access

**Description:** Attackers gaining access to the admin panel without authorization.

**Potential Impact:** Content modification, data exfiltration, system compromise.

**Threat Agents:** Brute force attackers, credential stuffing, phishing victims.

**Attack Vectors:**
- Weak or reused admin passwords
- Brute force attacks on login endpoint
- Session hijacking
- Admin API exposure without authentication

**Existing Controls:**
- Strong password requirements
- Rate limiting on login attempts
- Session management with secure flags
- Admin area IP restrictions (optional)
- MFA support (recommended)

**Residual Risk:** Medium - depends on admin password hygiene

---

### 4. Dependency Vulnerabilities

**Description:** Known vulnerabilities in npm packages or frameworks.

**Potential Impact:** Remote code execution, information disclosure, DoS.

**Threat Agents:** Automated exploit scanners, targeted attackers.

**Attack Vectors:**
- Outdated dependencies with known CVEs
- Transitive vulnerabilities in sub-dependencies
- Build-time dependencies in production

**Existing Controls:**
- Regular dependency audits (npm audit)
- Dependabot/renovate for automatic updates
- Lock file enforcement

**Residual Risk:** Medium - depends on update cadence

---

### 5. DDoS / Service Disruption

**Description:** Overwhelming the website with traffic to cause denial of service.

**Potential Impact:** Website unavailable, revenue loss, reputation damage.

**Threat Agents:** Hostile actors, competitive sabotage.

**Attack Vectors:**
- HTTP flood attacks
- Amplification attacks
- Application-layer attacks targeting endpoints

**Existing Controls:**
- CDN protection (Cloudflare/AWS CloudFront)
- Rate limiting at edge
- Bot protection (optional)

**Residual Risk:** Medium - requires monitoring and scaling

---

### 6. Data Exposure

**Description:** Sensitive data exposure through misconfiguration or bugs.

**Potential Impact:** Credential leaks, internal information disclosure.

**Threat Agents:** Web scanners, curious attackers.

**Attack Vectors:**
- Exposed environment variables via client-side code
- API endpoint leaks
- Debug information in production
- S3/CDN bucket misconfiguration

**Existing Controls:**
- ENV variable separation (server-only exports)
- No PII collection beyond analytics
- Build-time leak prevention

**Residual Risk:** Low -/CNV mitigated by architecture

---

## Security Control Mapping

| Threat Category | Control | Status |
|-----------------|---------|--------|
| Form Spam | Rate Limiting | Implemented |
| Form Spam | CSRF Tokens | Implemented |
| XSS | Content Security Policy | Implemented |
| XSS | Input Validation | Implemented |
| XSS | XSS Escaping | Implemented |
| Admin Access | Authentication | Implemented |
| Admin Access | Authorization | Implemented |
| Admin Access | Session Management | Implemented |
| Dependency Vulns | Audit Process | Implemented |
| Dependency Vulns | Automatic Updates | Implemented |
| DDoS | CDN Protection | Implemented |
| DDoS | Rate Limiting | Implemented |
| Data Exposure | ENV Protection | Implemented |
| Data Exposure | PII Minimization | Implemented |

---

## Risk Matrix

| Risk | Likelihood | Impact | Score |
|------|------------|--------|-------|
| Form Spam | High | Low | 4 |
| XSS | Low | High | 3 |
| Admin Access | Medium | High | 5 |
| Dependency Vulns | Medium | High | 5 |
| DDoS | Medium | High | 5 |
| Data Exposure | Low | High | 3 |

**Overall Risk Level:** Medium

---

## Monitoring & Logging

| Event | Log Target | Alerting |
|-------|------------|----------|
| Failed login attempts | Auth logs | >5/minute |
| Form submission spikes | Analytics | Baseline deviation |
| HTTP 4xx rate | CDN metrics | Spike detection |
| Dependency vulns | Security scan | Weekly report |
| Admin access | Access logs | IP change |

---

## Review Schedule

- Threat model: Quarterly review
- Control effectiveness: Monthly audit
- Dependency scan: Weekly (automated)
- Incident simulation: Semi-annual
