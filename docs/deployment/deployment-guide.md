# Deployment Guide - BirruLabs Website

**Domain:** birrulabs.biz.id  
**Target:** Vercel (preferred) / VPS with Docker  
**Stack:** Next.js 15 + TypeScript + Tailwind + PostgreSQL/Supabase

---

## Overview

This document describes the deployment strategy and process for BirruLabs website, supporting multiple environments:
- **Production:** `birrulabs.biz.id`
- **Staging:** `staging.birrulabs.biz.id`
- **Development:** PR previews

---

## Architecture

```
GitHub Repository (main/develop/feature branches)
    │
    ├─> CI/CD Pipeline (GitHub Actions)
    │   ├─> Lint & Format Check
    │   ├─> TypeScript Type Check
    │   ├─> Security Audit
    │   ├─> Test Suite
    │   └─> Build (Next.js)
    │
    ├─> Production Deploy (main branch push)
    │   └─> Vercel Production
    │
    ├─> Staging Deploy (workflow_dispatch)
    │   └─> Vercel Staging
    │
    └─> Docker Image (optional fallback)
        └─> ghcr.io/tantonton/birrulabs-website
```

---

## Environment Strategy

### Environment Variables

| Variable | Production | Staging | Local |
|----------|-----------|---------|-------|
| `NEXT_PUBLIC_ENV` | production | staging | local |
| `NEXT_PUBLIC_API_URL` | `https://api.birrulabs.biz.id` | `https://api-staging.birrulabs.biz.id` | `http://localhost:3000` |
| `DATABASE_URL` | Supabase production | Supabase staging | Local PostgreSQL |
| `SUPABASE_URL` | Production URL | Staging URL | Local Supabase |
| `SUPABASE_ANON_KEY` | Production key | Staging key | Dev key |

### Branch Strategy

| Branch | Target | Deploy |
|--------|--------|--------|
| `main` | Production | Automatic via GitHub Actions |
| `develop` | Staging | Manual workflow dispatch |
| `feature/*` | PR Preview | Automatic on PR open |

---

## Vercel Deployment

### Prerequisites

1. Create a Vercel account at [vercel.com](https://vercel.com)
2. Install Vercel CLI: `npm install -g vercel@latest`
3. Link your project: `vercel login`

### Vercel Project Setup

1. Create new project in Vercel dashboard
2. Connect to `tantenton/birrulabs-website` GitHub repository
3. Configure build settings:
   - **Framework:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Node Version:** 20.x

4. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_ENV`
   - `NEXT_PUBLIC_API_URL`
   - `DATABASE_URL`
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`

### GitHub Secrets Setup

Add these secrets to GitHub repository settings:

| Secret | Description |
|--------|-------------|
| `VERCEL_TOKEN` | Vercel API token |
| `VERCEL_ORG_ID` | Vercel organization ID |
| `VERCEL_PROJECT_ID` | Vercel project ID |

Get these from Vercel dashboard > Project Settings > API Tokens.

---

## VPS Deployment (Docker)

### Prerequisites

1. Docker installed on target server
2. SSH access to server
3. Reverse proxy (nginx) configured

### Docker Deployment Steps

```bash
# Build and run
docker build -t birrulabs-website .
docker run -d \
  -p 3000:3000 \
  -e NEXT_PUBLIC_ENV=production \
  -e DATABASE_URL=${DATABASE_URL} \
  -e SUPABASE_URL=${SUPABASE_URL} \
  --name birrulabs-website \
  birrulabs-website
```

### Production Server Setup

```bash
# Example nginx configuration
server {
    listen 80;
    server_name birrulabs.biz.id;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## CI/CD Pipeline

### Automatic Deployment (Production)

When code is pushed to `main` branch:
1. GitHub Actions runs CI pipeline
2. Tests, linting, and type checks pass
3. Build artifact is created
4. Production deployment to Vercel triggers
5. Staging environment is updated

### Manual Staging Deployment

Trigger via GitHub Actions workflow:
1. Navigate to Actions tab
2. Select "Deploy to Vercel (Production)" workflow
3. Click "Run workflow"
4. Select "staging" as environment
5. View deployment in Vercel dashboard

### PR Previews

When a pull request is opened:
1. CI pipeline runs automatically
2. Vercel creates preview deployment
3. Preview URL is added as PR comment
4. Preview URL expires when PR is closed

---

## DNS Configuration

### Primary Domain (Vercel)

1. In Vercel dashboard, go to Project Settings > Domains
2. Add `birrulabs.biz.id`
3. Follow DNS configuration instructions
4. Add CNAME/ALIAS record pointing to Vercel

### Subdomain (Staging)

1. Add `staging.birrulabs.biz.id` in Vercel
2. Create separate CNAME record
3. Update DNS records accordingly

---

## Pre-Deployment Checklist

- [ ] All tests passing
- [ ] TypeScript compiles without errors
- [ ] No security vulnerabilities (npm audit)
- [ ] Environment variables configured
- [ ] DNS records updated
- [ ] SSL certificates valid
- [ ] Database migrations applied
- [ ] Backup created

---

## Post-Deployment Checklist

- [ ] Verify domain resolves correctly
- [ ] Check SSL certificate
- [ ] Test critical user flows
- [ ] Verify Lighthouse score (90+)
- [ ] Check accessibility (95+)
- [ ] Monitor error logs
- [ ] Verify backup created

---

## Troubleshooting

### Deployment Failed

1. Check GitHub Actions logs for errors
2. Verify environment variables
3. Check Vercel build logs
4. Ensure `vercel.json` exists

### Domain Not Resolving

1. Verify DNS records in registrar dashboard
2. Check Vercel domain settings
3. Wait up to 48 hours for DNS propagation
4. Verify SSL certificate status

### Build Errors

1. Check Node.js version compatibility
2. Verify all dependencies in `package.json`
3. Check for missing environment variables
4. Review Vercel build logs

---

## Rollback

See [ROLLBACK.md](./rollback.md) for rollback procedures.
