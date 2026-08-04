# Operations Guide - BirruLabs Website

**Monitoring, maintenance, and operational procedures**

---

## Monitoring Setup

### Vercel Analytics

- View: `https://vercel.com/dashboard/analytics`
- Track: Page views, clicks, performance metrics
- Set up alerts for anomalies

### Vercel Logs

- Real-time logs: `vercel logs <project>`
- Filter by environment: `vercel logs --prod`
- Search: `vercel logs --search "error"`

### Database Monitoring

```bash
# Supabase dashboard
https://app.supabase.com/project/<project-id>/database

# Monitor:
# - Connection pool usage
# - Query performance
# - Storage usage
# - Row counts
```

### Application Monitoring

```bash
# Check logs
vercel logs --prod

# View recent deployments
vercel ls --prod

# Check environment variables
vercel env ls --prod
```

---

## Health Check Endpoints

Create `/src/app/api/health/route.ts`:

```typescript
export async function GET() {
  return Response.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NEXT_PUBLIC_ENV,
    services: {
      database: 'healthy',
      storage: 'healthy'
    }
  });
}
```

---

## Daily Operations

### Morning Checks

1. Review Vercel deployment status
2. Check error logs: `vercel logs --prod --since 24h`
3. Monitor database connection pool
4. Verify backups completed
5. Check SSL certificate expiry

### Weekly Tasks

1. Review application performance metrics
2. Analyze user behavior reports
3. Check storage usage trends
4. Update dependencies (if needed)
5. Review and clean up staging environment

### Monthly Tasks

1. Full security audit
2. Database backup verification
3. Performance regression testing
4. Environment variable rotation (if applicable)
5. Documentation review

---

## Log Access

### Production Logs

```bash
# Via Vercel CLI
vercel logs birrulabs-website --prod

# Stream logs
vercel logs birrulabs-website --prod --follow

# Filter by time
vercel logs birrulabs-website --prod --since 1h
```

### Docker Logs (if deployed on VPS)

```bash
# View container logs
docker logs -f birrulabs-website

# View last 100 lines
docker logs --tail 100 birrulabs-website

# Follow logs
docker logs -f birrulabs-website
```

---

## Database Operations

### Backup Database

```bash
# Via Supabase dashboard
# Settings > Database > Backup

# Or via CLI (if using PostgreSQL directly)
pg_dump -h localhost -U postgres -d birrulabs > backup.sql
```

### Restore Database

```bash
# Via Supabase dashboard
# Settings > Database > Restore

# Or via CLI
psql -h localhost -U postgres -d birrulabs < backup.sql
```

### Run Migrations

```bash
# Via Supabase dashboard
# Settings > Database > Migration

# Or manually
supabase migration up
```

---

## Cache Management

### Clear Vercel Cache

```bash
# Via Vercel dashboard
# Project Settings > Clear Cache

# Or via API
curl -X POST \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  https://api.vercel.com/v6/projects/$PROJECT_ID/cache
```

### Clear CDN Cache

```bash
# Vercel auto-clears on deploy
# Manual clear if needed
vercel clear
```

---

## Environment Variable Management

### List Current Variables

```bash
# Production
vercel env ls --prod

# Staging
vercel env ls --staging
```

### Add New Variable

```bash
# Production
vercel env add DATABASE_URL --prod

# Staging
vercel env add DATABASE_URL --staging
```

### Remove Variable

```bash
# Remove from production
vercel env rm DATABASE_URL --prod
```

### Rotate Secrets

1. Generate new secret value
2. Add new value via `vercel env add`
3. Update in all environments
4. Remove old value after verification
5. Rotate across services

---

## Scaling

### Vercel Auto-Scaling

Vercel handles scaling automatically. Monitor:

- Cold start times
- Request latency
- Concurrent connection limits
- Build minutes usage

### Docker Scaling (VPS)

```bash
# Scale container replicas
docker service scale birrulabs-website=3

# Or manually run multiple containers
docker run -d --name birrulabs-website-2 -p 3001:3000 birrulabs-website
```

---

## Alerting

### Vercel Alerts

Configure in Vercel dashboard:
- Deployment failures
- Error rate spikes
- Performance degradation
- SSL certificate expiry

### Log-Based Alerts

```bash
# Example: Alert on 500 errors
vercel logs --prod | grep "500" | tail -10
```

### Database Alerts

Monitor Supabase dashboard for:
- Connection pool exhaustion
- Slow queries
- Storage quota warnings
- Row count anomalies

---

## Backup Strategy

### Automated Backups (Supabase)

1. Configure in Supabase dashboard
2. Set daily backup schedule
3. Enable point-in-time recovery
4. Verify backup integrity weekly

### Manual Backups

```bash
# Backup database
pg_dump -h localhost -U postgres birrulabs > backup_$(date +%Y%m%d).sql

# Backup storage
tar -czf storage_backup_$(date +%Y%m%d).tar.gz public/uploads/
```

---

## Performance Optimization

### Vercel Optimizations

1. Enable Image Optimization
2. Configure Edge Middleware
3. Use ISR for static content
4. Set up rewrites for API routes

### Database Optimization

1. Add proper indexes
2. Monitor slow queries
3. Use connection pooling
4. Optimize storage usage

### Monitoring Commands

```bash
# Check deployment performance
vercel inspect --prod

# View bundle size
vercel build --prod

# Test edge caching
curl -I https://birrulabs.biz.id --head
```

---

## Incident Response

### Service Degradation

1. Check Vercel status page
2. Review recent deployments
3. Check error logs
4. Verify environment variables
5. Rollback if necessary (see rollback.md)

### Data Corruption

1. Stop new writes immediately
2. Identify affected data
3. Restore from backup
4. Verify data integrity
5. Document incident

### Security Breach

1. Rotate all secrets immediately
2. Revoke compromised tokens
3. Review access logs
4. Update security policies
5. Notify affected users

---

## Maintenance Windows

### Scheduled Maintenance

Plan for maintenance during low-traffic hours:
- Time: 02:00-06:00 WIB
- Duration: 2-4 hours
- Notice: 48 hours in advance

### Maintenance Tasks

1. Database vacuum and analyze
2. Log rotation
3. Certificate renewal
4. Dependency updates
5. Security patches
