# User Flow Architectures

**Project:** BirruLabs Official Website  
**Users:** Startup Reviewers, Clients, Partners, Job Candidates

---

## User Personas

| Persona | Goals | Key Motivations | Frequency |
|---------|-------|-----------------|-----------|
| **Startup Reviewer** | Evaluate BirruLabs for partnership/investment | Credibility, portfolio depth, technical capability | Weekly |
| **Client** | Solve business problem with AI/automation | Value demonstration, case studies, support | Bi-weekly |
| **Partner** | Explore integration/integration opportunities | API docs, technical specs, success metrics | Monthly |
| **Job Candidate** | Assess company culture, growth potential | Team profiles, mission, values, Stack | Ad-hoc |

---

## User Flow 1: Startup Reviewer

### Goal: Evaluate BirruLabs for partnership/investment decision

```
┌─────────────────────────────────────────────────────────────────────────┐
│ Flow: Startup Reviewer Journey                                          │
├─────────────────────────────────────────────────────────────────────────┤
│ 1. Accidental discovery → Homepage (birrulabs.biz.id)                  │
│ 2. Scan value props, brand voice                                         │
│ 3. Navigate: Profil Startup → Akcelera ID / Helostech                  │
│ 4. Read case studies → success metrics                                   │
│ 5. Check technical stack → "AI-native, multi-agent" claims              │
│ 6. Review publications → Articles section                                │
│ 7. Contact → inquiry form or email                                       │
└─────────────────────────────────────────────────────────────────────────┘
```

### Critical Touchpoints

| Page | Action | Success Metric |
|------|--------|----------------|
| Home | Scroll to case studies section | >50% scroll depth |
| Projects | Click "View details" | CTR > 15% |
| Case Study | Read → Contact CTA | Conversion > 5% |
| Contact | Submit form / Email | Response rate > 80% |

### Bilingual Flow

```
ID Path (primary):
  /id → Profil Startup → Akcelera-ID
EN Path (secondary):
  /en → Startup Profile → Akcelera-ID
```

---

## User Flow 2: Client

### Goal: Understand_services and initiate engagement

```
┌─────────────────────────────────────────────────────────────────────────┐
│ Flow: Client Engagement Journey                                         │
├─────────────────────────────────────────────────────────────────────────┤
│ 1. Search "AI automation for SME" → birrulabs.biz.id                    │
│ 2. Articles → "Panduan AI untuk UMUK" (Indonesian)                      │
│ 3. Products → AI Credits, Agent Systems                                 │
│ 4. Proyek → Filter by industry                                          │
│ 5. Contact → booking form (Calendly integration)                        │
└─────────────────────────────────────────────────────────────────────────┘
```

### Decision Path
- **Content-first**: Reads articles before contacting
- **Trust-building**: Case studies > pricing page
- **Low-friction**: Booking form > email inquiry

### Success Criteria
- Time to "Contact" action: < 3 minutes
- Form completion rate: > 65%
- Booking appointment attendance: > 75%

---

## User Flow 3: Partner

### Goal: Technical due diligence and integration scoping

```
┌─────────────────────────────────────────────────────────────────────────┐
│ Flow: Partner Technical Due Diligence                                   │
├─────────────────────────────────────────────────────────────────────────┤
│ 1. Click partnership link in email / conference                         │
│ 2. Navigate: Products → Agent Systems API docs                          │
│ 3. Review API specification → authentication, endpoints                 │
│ 4. Check developer docs → SDKs, examples                                │
│ 5. Contact → technical inquiry (pre-sales)                              │
└─────────────────────────────────────────────────────────────────────────┘
```

### Technical Pages Required
- `/products/api-docs` - API reference
- `/products/sdks` - SDK documentation
- `/articles/technical-overview` - System architecture

### Partner-Focused Content
- Integration timeline estimates
- SLA guarantees
- Custom development capabilities

---

## User Flow 4: Job Candidate

### Goal: Assess culture, role fit, and application

```
┌─────────────────────────────────────────────────────────────────────────┐
│ Flow: Job Candidate Journey                                             │
├─────────────────────────────────────────────────────────────────────────┤
│ 1.LinkedIn job post → click "Learn more"                                │
│ 2.Homepage → read mission, values                                       │
│ 3.Tentang → Team profiles, company culture                              │
│ 4.Karir → open roles, benefits                                          │
│ 5.Apply → LinkedIn profile upload / email                               │
└─────────────────────────────────────────────────────────────────────────┘
```

### Key Pages
- `/id/karir` - Open positions (ID only, localized)
- `/tentang/tim` - Team bios
- `/tentang/budaya` - Culture & values

---

## Path-Specific Flows

### Mobile-First Optimal Path
```
Hamburger Menu → Proyek → Select Case Study → Contact Modal
                 ↓
            < 60 seconds to CTA
```

### Desktop Deep Dive Path
```
Home → Scroll → Articles → Filter → Case Study → Download PDF → Contact
                  ↓
              3-5 minutes investment
```

### Bilingual.path Strategy
```typescript
// Pseudocode for language detection and flow routing
function getUserFlow(user) {
  const lang = detectLanguage(user);
  if (lang === 'id') {
    return {
      start: '/id',
      primaryPath: 'tentang/profil-startup',
      contact: '/id/kontak'
    };
  } else {
    return {
      start: '/en',
      primaryPath: 'en/startup-profile',
      contact: '/en/contact'
    };
  }
}
```

---

## Conversion Funnel

### Top of Funnel (Awareness)
```
Homepage Visit →
  ├─ Scroll to case study: 45%
  ├─ Click "Products": 30%
  └─ Click "Contact": 15%
```

### Middle of Funnel (Consideration)
```
Click "Contact" →
  ├─ Submit inquiry: 40%
  ├─ Book discovery call: 25%
  └─ Download case study: 20%
```

### Bottom of Funnel (Decision)
```
Discovery Call →
  ├─ Proposal sent: 60%
  ├─ Contract signed: 30%
  └─ Pilot started: 20%
```

---

## User State Transitions

```
┌──────────────┐     ┌────────────────┐     ┌──────────────┐
│  New Visitor │────▶│  Returning     │────▶│  Returning   │
│              │     │  Reader        │     │  Engaged     │
└──────────────┘     └────────────────┘     └──────────────┘
                         │                        │
                         ▼                        ▼
                   ┌──────────────┐     ┌──────────────┐
                   │ converted     │     │  converted   │
                   │  lead        │     │  customer    │
                   └──────────────┘     └──────────────┘
```

---

## Error States & Recovery

| Scenario | User Impact | Recovery |
|----------|--------------|----------|
| Language not supported | Confusion | Show fallback to ID, prompt to switch |
| Contact form submission fails | Frustration | Preserve form data, show retry |
| API docs 404 | Blocked | Link to GitHub repo, contact support |
| Case study image missing | Distrust | Show placeholder, emphasize text content |

---

## Analytics Tracking Points

| Event | Category | Action | Label |
|-------|----------|--------|-------|
| Home page view | navigation | page_view | home |
| Case study view | content | case_study_view | [case-study-id] |
| Contact form submit | conversion | contact_submit | [form-type] |
| Language switch | ui | language_change | [from]-[to] |
| Download case study | content | download | [file-id] |

---

## A/B Test Opportunities

1. **CTA button text**: "Hubungi Kami" vs "Pelajari Lebih Lanjut"
2. **Home hero image**: Team photo vs product dashboard
3. **Contact form length**: 5 fields vs 3 fields (name, email, message only)
4. **Case study preview**: Excerpt vs card grid layout
