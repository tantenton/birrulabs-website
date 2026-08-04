# Rollback Guide - BirruLabs Website

**Recovery procedures for failed deployments**

---

## Rollback Overview

This guide covers rollback procedures for the BirruLabs website when a deployment fails or introduces critical issues.

---

## When to Rollback

Trigger rollback when:
- Deployment fails and doesn't recover
- Critical bugs introduced in production
- Database migrations fail
- Security vulnerability discovered
- Service unavailable or degraded
- Data corruption detected
- Performance degradation (>500ms avg response time)

---

## Immediate Actions

1. **Assess the Issue**
   - Check Vercel deployment status
   - Review error logs
   - Identify affected users/features
   - Determine rollback urgency

2. ** Communicate**
   - Notify team via Slack/email
   - Update status page if applicable
   - Document incident timeline

3. **Prepare Rollback**
   - Identify target deployment version
   - Gather necessary credentials
   - Prepare rollback checklist

---

## Rollback Methods

### Method 1: Vercel Rollback (Recommended)

Vercel maintains deployment history for easy rollback.

#### Via Vercel Dashboard

1. Navigate to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select project: BirruLabs Website
3. Go to **Deployments** tab
4. Find target deployment (before issue)
5. Click **•••** menu → **Rollback**

#### Via Vercel CLI

```bash
# List deployments
vercel ls --prod

# Rollback to specific deployment
vercel rollback <deployment-id> --prod

# Rollback to last stable deployment
vercel rollback --prod
```

#### Via GitHub Actions

Trigger the rollback workflow:
1. Go to Actions tab
2. Select "Rollback Deployment" workflow
3. Provide deployment ID
4. Confirm rollback

---

### Method 2: Docker Rollback (VPS)

If deployed via Docker on VPS:

```bash
# List previous images
docker images | grep birrulabs-website

# Stop current container
docker stop birrulabs-website

# Start previous version
docker run -d \
  -p 3000:3000 \
  -e NEXT_PUBLIC_ENV=production \
  --name birrulabs-website \
  birrulabs-website:<previous-tag>
```

---

### Method 3: Git Revert

If rollback requires code changes:

```bash
# Find commit before issue
git log --oneline --graph

# Revert to specific commit
git revert <commit-hash>

# Push changes
git push origin main
```

---

## Rollback Checklist

### Pre-Rollback

- [ ] Confirm rollback is necessary
- [ ] Identify target deployment version
- [ ] Note current deployment ID for reference
- [ ] Notify team
- [ ] Prepare monitoring dashboard

### During Rollback

- [ ] Pause any dependent services
- [ ] Execute rollback procedure
- [ ] Monitor deployment status
- [ ] Verify service availability
- [ ] Test critical user flows

### Post-Rollback

- [ ] Confirm all endpoints working
- [ ] Check database connections
- [ ] Verify SSL certificates
- [ ] Monitor error rates
- [ ] Update incident documentation
- [ ] Notify stakeholders

---

## Database Rollback

### Rollback Migrations

```bash
# Via Supabase dashboard
# Settings > Database > Migration

# Rollback last migration
supabase migration down

# Or via CLI
psql $DATABASE_URL -c "SELECT * FROM supabase_migrations LIMIT 1;"
```

### Restore from Backup

```bash
# Stop application
vercel stop --prod

# Restore database
pg_restore -h localhost -U postgres -d birrulabs backup.sql

# Restart application
vercel start --prod
```

---

## Automated Rollback Configuration

### Vercel Auto-Rollback

Vercel automatically rolls back failed deployments. Configure:

```json
// vercel.json
{
  "regions": ["sfo1"],
  "github": {
    "autoJobStop": true
  }
}
```

### GitHub Actions Auto-Rollback

Create workflow for automatic rollback on failure:

```yaml
# .github/workflows/rollback.yml
name: Auto Rollback

on:
  workflow_run:
    workflows: ["Deploy to Vercel (Production)"]
    types:
      - requested
    branches: [main]

jobs:
  auto-rollback:
    if: ${{ github.event.workflow_run.conclusion == 'failure' }}
    runs-on: ubuntu-latest
    steps:
      - name: Rollback to previous deployment
        run: |
          curl -X POST \
            -H "Authorization: Bearer ${{ secrets.VERCEL_TOKEN }}" \
            https://api.vercel.com/v13/now/deployments \
            -d '{"name":"birrulabs-website","target":"production","production":true}'
```

---

## Rollback Verification

### Basic Checks

```bash
# Verify deployment status
vercel ls --prod

# Check deployment health
curl -I https://birrulabs.biz.id

# View deployment info
vercel info --prod
```

### Health Verification

1. Access main page: `https://birrulabs.biz.id`
2. Check API endpoints: `https://birrulabs.biz.id/api/health`
3. Test user authentication
4. Verify form submissions
5. Check media assets load

### Monitoring During Rollback

- Watch error logs: `vercel logs --prod --follow`
- Check Vercel dashboard metrics
- Monitor database connections
- Track response times

---

## Rollback Scenarios

### Scenario 1: Failed Build

**Symptoms:** Deployment fails during build phase

**Solution:**
```bash
# Re-deploy previous successful build
vercel --prod --yes
```

### Scenario 2: Runtime Error

**Symptoms:** Deployment succeeds, but app crashes

**Solution:**
1. Identify failed deployment ID
2. Rollback to previous:
   ```bash
   vercel rollback <deployment-id> --prod
   ```

### Scenario 3: Database Migration Failure

**Symptoms:** App starts but database errors

**Solution:**
1. Rollback database migration
2. Rollback application deployment
3. Verify data integrity

### Scenario 4: Security Vulnerability

**Symptoms:** Vulnerability detected in deployed code

**Solution:**
1. Immediately rollback deployment
2. Rotate all affected credentials
3. Patch vulnerability
4. Redeploy with fix

---

## Post-Rollback Actions

### Incident Review

1. Document what went wrong
2. Identify root cause
3. Document lessons learned
4. Update deployment procedures
5. Schedule follow-up review

### Fix Deployment

1. Fix identified issues
2. Test in staging environment
3. Deploy to staging
4. Monitor staging for 24 hours
5. Deploy to production

### Communication

1. Update status page
2. Notify users (if affected)
3. Close incident ticket
4. Send post-mortem if significant

---

## Rollback Tips

### Proactive Measures

- Always test in staging first
- Use feature flags for new features
- Implement canary deployments
- Set up monitoring before deploying
- Keep rollback documentation current

### Best Practices

- Don't rollback during peak hours
- Always verify after rollback
- Keep rollback procedure documented
- Practice rollback regularly
- Have rollback runbook accessible

### Common Pitfalls

- Rolling back to incompatible database
- Forgetting to update environment variables
- Not checking dependent services
- Not verifying rollback success
- Not documenting the incident

---

## Emergency Contacts

- **DevOps:** [Your contact]
- **Backend:** [Your contact]
- **Frontend:** [Your contact]
- **Database Admin:** [Your contact]

### Out of Hours

For urgent issues outside business hours:
- Call: [On-call number]
- Slack: #incidents channel
- Email: devops@birrulabs.biz.id
