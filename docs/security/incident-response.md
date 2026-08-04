# BirruLabs Website Incident Response Plan

**Document Version:** 1.0  
**Date:** 2026-08-04  
**Project:** BirruLabs Official Website (birrulabs.biz.id)

---

## Overview

This incident response plan defines the procedures for detecting, responding to, and recovering from security incidents affecting the BirruLabs website.

---

## Incident Classification

| Severity | Description | Response Time |
|----------|-------------|---------------|
| **Critical** | Admin account compromise, data breach, defacement | 15 minutes |
| **High** | DDoS attack, XSS exploit, unauthorized content change | 1 hour |
| **Medium** | Form spam surge, brute force attempt, bot attack | 4 hours |
| **Low** | CSP violation, API abuse, security scan | 24 hours |

---

## Incident Response Team

| Role | Responsibility | Alternate |
|------|----------------|-----------|
| **Incident Commander** | Overall response coordination | Engineering Lead |
| **Security Lead** | Technical analysis, containment | DevOps Engineer |
| **Communications** | External/internal messaging | Marketing Lead |
| **Operations** | Service restoration, monitoring | Backend Engineer |

**Current Team:**
- Incident Commander: Hermes Agent (Orchestrator)
- Security Lead: Security Engineer
- Communications: Development Team
- Operations: DevOps Engineer

---

## Contact Information

| Purpose | Contact | Location |
|---------|---------|----------|
| Security Incident | security@birrulabs.biz.id | Email |
| Emergency | +62 XXX XXXX XXXX | Phone (CEO) |
| CDN Blocking | Cloudflare Support | Dashboard |

---

## Detection & Triage

### Automated Detection

| Signal | Tool | Alert Channel |
|--------|------|---------------|
|异常 login attempts | Auth logs | Slack #security |
| Form spam surge | Analytics | Slack #alerts |
| HTTP 5xx spike | Uptime monitor | PagerDuty |
| CSP violation | Browser console | Daily report |
| Dependency vuln | npm audit | GitHub PR |

### Manual Reporting

Reports can be submitted through:
- Email: security@birrulabs.biz.id
- Website contact form (marked "Security Issue")
- Direct message to Hermes Agent

---

## ResponseProcedure

### Phase 1: Identification (0-15 minutes)

1. **Triage the incident**
   - Collect evidence (logs, screenshots, affected endpoints)
   - Classify severity
   - Assign incident commander

2. **Initial containment**
   - Assess scope (what is affected?)
   - Determine if active compromise
   - Document timeline

3. **Create incident channel**
   - Slack channel: `#incident-[date]-[severity]`
   - Create issue: `SEC-[YYYYMMDD]-NNN`

### Phase 2: Containment (15-60 minutes)

#### Short-term Containment

```bash
# Block suspicious IP range
iptables -A INPUT -s 192.0.2.0/24 -j DROP

# Rate limit specific endpoint
nginx: limit_req zone=contact limit=1r/s;

# Revoke compromised tokens
node scripts/revoke-tokens.js --user admin@example.com
```

#### Long-term Containment

- Disable affected functionality if necessary
- Enable maintenance mode
- Activate additional monitoring

### Phase 3: Eradication (1-4 hours)

1. **Identify root cause**
   - Vulnerable code or configuration
   - Compromised credentials
   - Exploitable flaw in dependencies

2. **Remove attack vector**
   - Patch vulnerability
   - Rotate credentials
   - Update dependencies

3. **Remove persistence mechanisms**
   - Backdoors
   - Malicious code
   - Unauthorized admin accounts

### Phase 4: Recovery (2-24 hours)

1. **Restore from backup** if necessary
2. **Verify system integrity**
3. **Gradual revenue restoration**
4. **Monitor for recurrence**

### Phase 5: Post-Incident (24-72 hours)

1. **Incident report**
   - Timeline of events
   - Root cause analysis
   - Lessons learned
   - Preventive measures

2. **Team review**
   - Retrospective meeting
   - Update response procedures
   - Update documentation

3. **Customer notification** (if required)
   - Transparent communication
   - No blame culture
   - Fix timeline sharing

---

## Incident Response Runbooks

### Runbook 1: Admin Account Compromise

**Severity:** Critical  
**Symptoms:** Unauthorized admin access, unexpected content changes

**Response Steps:**

1. Immediately disable compromised account:
   ```bash
   node scripts/disable-user.js --email compromised@example.com
   ```

2. Revoke all active sessions:
   ```bash
   node scripts/revoke-sessions.js --admin
   ```

3. Rotate all admin passwords (stored in 1Password):
   - Primary admin
   - Backup admin
   - Service accounts

4. Review access logs for data exfiltration:
   ```bash
   grep "admin" access.log | tail -1000
   ```

5. Enable MFA for all admin accounts

---

### Runbook 2: XSS Attack

**Severity:** High  
**Symptoms:** Browser console errors, defaced content, suspicious scripts

**Response Steps:**

1. Isolate affected page:
   - Temporarily remove/display warning
   - Disable dynamic content rendering

2. Identify injection point:
   - Review recent content changes
   - Check form inputs and API endpoints

3. Fix input validation:
   - Update sanitization rules
   - Add CSP rules

4. Purge cached content:
   ```bash
   curl -X PURGE https://birrulabs.biz.id/path
   ```

5. Update WAF rules

---

### Runbook 3: DDoS Attack

**Severity:** High  
**Symptoms:** Service unavailable, high server load, connection timeouts

**Response Steps:**

1. Enable Cloudflare DDoS protection:
   - Set "I'm Under Attack" mode
   - Enable Rate Limiting

2. Configure rate limiting:
   ```nginx
   http {
     limit_req_zone $binary_remote_addr zone=ddos:10m rate=10r/s;
   }
   ```

3.BLOCK malicious IPs:
   ```bash
   # Get popular IPs from logs
   awk '{print $1}' access.log | sort | uniq -c | sort -rn | head -20
   ```

4. Scale infrastructure if capacity permits

5. Monitor for coordinated attack sources

---

### Runbook 4: Dependency Vulnerability

**Severity:** Medium/High  
**Symptoms:** npm audit warning, CVE notification

**Response Steps:**

1. Assess exploitability:
   - Is vulnerable code in production?
   - Is endpoint exposed?

2. Check for active exploitation:
   ```bash
  grep "vulnerable-package" access.log
   ```

3. Update dependency:
   ```bash
   npm update vulnerable-package
   npm audit fix --force
   ```

4. Verify fix:
   ```bash
   npm audit --audit-level=moderate
   ```

5. Add to dependency update schedule
   - Add to automer PR queue
   - Schedule dependency review meeting

---

### Runbook 5: Form Spam Attack

**Severity:** Low/Medium  
**Symptoms:** Spam form submissions, analytics anomalies

**Response Steps:**

1. Increase rate limits:
   ```typescript
   // Increase from 10/hr to 5/hr
   ```

2. Enable CAPTCHA:
   ```tsx
   <ReCAPTCHA sitekey={process.env.RECAPTCHA_KEY} />
   ```

3. Block suspicious IPs:
   ```bash
   # block IP range if persistent
   iptables -A INPUT -s 192.0.2.0/24 -j DROP
   ```

4. Update form validation rules

5. Deploy honeypot fields

---

### Runbook 6: Brute Force Attack

**Severity:** Medium  
**Symptoms:** Multiple failed login attempts from same IP

**Response Steps:**

1. Enable account lockout:
   ```javascript
   // After 3 failed attempts, lock for 15 minutes
   ```

2. Block source IPs:
   ```bash
   iptables -A INPUT -s 192.0.2.100 -j DROP
   ```

3. Enable CAPTCHA on login form

4. Review for credential stuffing patterns:
   ```bash
   grep "login" auth.log | grep "fail" | tail -100
   ```

5. Enforce stronger password policy

---

## Communication Protocols

### Internal Communication

**Slack Channels:**
- `#security-announcements` - Security updates
- `#incident-[date]-[severity]` - Active incident channel
- `#security-retrospective` - Post-incident review

**Escalation Path:**
1. Security Engineer → Security Lead
2. Security Lead → Engineering Lead
3. Engineering Lead → CEO

### External Communication

**Customer Notification (if needed):**
```
Subject: Security Incident at BirruLabs - [Date]

We recently identified a security incident affecting our website. 
Here's what happened and what we're doing about it:

[Timeline]

[What we found]

[What we're doing]

[What you should do] (if applicable)

[Contact for questions]
```

**Twitter/LinkedIn (if public disclosure required):**
- Short statement
- Link to full report on website
- No speculation, only verified facts

---

## Evidence Preservation

### Log Retention

| Log Type | Retention Period | Storage Location |
|----------|------------------|------------------|
| Access logs | 90 days | S3 / Cloudflare |
| Auth logs | 1 year | Cloudflare |
| Error logs | 30 days | Vercel |
| CSP reports | 30 days | CSP report endpoint |

### Evidence Collection Checklist

- [ ] Timestamp of incident discovery
- [ ] All relevant log files
- [ ] Network captures (if available)
- [ ] Screenshots of affected pages
- [ ] Malware samples (if any)
- [ ] Chain of custody documentation

---

## Legal & Compliance

### Reporting Requirements

| Incident Type | Reporting Deadline | Authority |
|---------------|-------------------|-----------|
| Data breach | 72 hours | GDPR authorities |
| Payment card compromise | Immediate | PCI-DSS |

### Data Subject Rights

- Right to access personal data
- Right to erasure (GDPR)
- Right to data portability

---

## Testing & Exercises

### Tabletop Exercises (Quarterly)

1. Scenario: Admin account compromise
2. Scenario: XSS attack via contact form
3. Scenario: DDoS attack during launch

### Runbook Testing (Monthly)

- Select one runbook
- Execute without actual incident
- Document gaps
- Update runbook

### Full Incident Simulation (Bi-annual)

- 2-hour simulated incident
- Full response team engagement
- Communication testing
- Post-mortem documentation

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-08-04 | Security Engineer | Initial document |

---

## Appendixes

### A. Emergency Contact List

| Role | Name | Phone | Email | 2FA Method |
|------|------|-------|-------|------------|
| CEO | [Redacted] | [Redacted] | [Redacted] | Authy |
| DevOps | [Redacted] | [Redacted] | [Redacted] | Google Authenticator |
| Security | [Redacted] | [Redacted] | security@birrulabs.biz.id | YubiKey |

### B. Item Response Checklist

- [ ] Incident classified
- [ ] Team notified
- [ ] Incident channel created
- [ ] Initial logs captured
- [ ] Containment措施 implemented
- [ ] Root cause identified
- [ ] Fix deployed
- [ ] Verification complete
- [ ]Customers communicated (if needed)
- [ ] Post-mortem scheduled
- [ ] Documentation updated

### C. Post-Incident Report Template

```
# Incident Report: [YYYY-MM-DD] [Incident Type]

## Summary
[1-paragraph summary]

## Timeline
| Time (UTC) | Event |
|------------|-------|
| HH:MM | Incident discovered |
| HH:MM | Team notified |
| HH:MM | Containment started |
| HH:MM | Fix deployed |
| HH:MM | Service restored |

## Root Cause
[Detailed root cause analysis]

## Impact
- Services affected
- Data exposed (if any)
- Customer impact

## Response Actions
[Actions taken in order]

## Lessons Learned
[What worked, what didn't]

## Preventive Measures
[Action items with owners and deadlines]

## Open Questions
[Any remaining unknowns]
```

---

## References

- NIST SP 800-61r2: Computer Security Incident Handling Guide
- OWASP Incident Response
- Cloudflare Incident Response Best Practices

**Review Schedule:** Quarterly  
**Next Review:** 2026-11-04
