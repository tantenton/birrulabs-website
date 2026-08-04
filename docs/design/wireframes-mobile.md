# BirruLabs Mobile Wireframes

**Version:** 1.0.0 | **Last Updated:** 2026-08-04  
**Baseline:** Mobile-first (320px viewport)  
**Orientation:** Portrait (landscape secondary)

---

## Overview

**Grid System:** 12-column fluid grid  
**Touch Target Minimum:** 44x44px  
**Safe Areas:** Notch-compliant (iOS/Android)  
**Navigation:** Bottom tab bar on mobile, hamburger on non-home

---

## 1. Home Screen

```
[STATUS BAR: 24px]

[HEADER]
┌────────────────────────────────────────┐
│ ☰  BirruLabs                     🔍  🌗 │  ←(hamburger)  ←(search)  ←(theme toggle)
└────────────────────────────────────────┘

[HERO SECTION - 30% viewport]
┌────────────────────────────────────────┐
│                                        │
│    AI-NATIVE AUTOMATION                │
│    FOR STARTUPS & ENTERPRISES          │
│                                        │
│    BirruLabs builds intelligent       │
│    multi-agent systems that scale     │
│    with your growth.                  │
│                                        │
│    [Get Started]    [View Projects]   │  ←(primary, secondary buttons)
│                                        │
└────────────────────────────────────────┘

[HIGHLIGHTS CAROUSEL (horizontal scroll)]
┌────────────────────────────────────────┐
│  ┌────┐  ┌────┐  ┌────┐  ┌────┐       │
│  │120 │  │ 85 │  │ 42 │  │  9 │       │
│  │+   │  │+   │  │+   │  │+   │       │
│  │active││cases││partners││years│      │
│  │systems││studies││hips││history│     │
│  └────┘  └────┘  └────┘  └────┘       │
└────────────────────────────────────────┘

[FEATURED SERVICES]
┌────────────────────────────────────────┐
│  🔹 Sprite AI Agent                   │
│     Intelligent orchestration for      │
│     startup scaling                    │
│                                       │
│  🔹 Multi-Agent Workflow              │
│     Distributed cognitive automation   │
│     pipeline                           │
│                                       │
│  🔹 Technical Audit                   │
│     System security & architecture     │
│     review                             │
└────────────────────────────────────────┘

[RECENT ARTICLES]
┌────────────────────────────────────────┐
│  [Latest]                              │
│                                        │
│  ▢ AI Infrastructure Trends 2026      │
│    How we architected our agent       │
│    fleet for 10x scaling              │
│                                        │
│  ▢ Particle教研 Net: Next-Gen         │
│    LLM Training Pipeline              │
│    From data curation to inference    │
│                                        │
│  ▢ Building Autonomy: Lessons from    │
│    Production Multi-Agent Systems     │
└────────────────────────────────────────┘

[FOOTER TOP]
┌────────────────────────────────────────┐
│  🌟 Join Our Newsletter                 │
│                                         │
│  Get monthly insights on AI automation  │
│  and startup scaling.                   │
│                                         │
│  [Email input____________] [Subscribe] │  ←(44x44px)
│                                         │
└────────────────────────────────────────┘

[BOTTOM NAV (active: Home)]
┌────────────────────────────────────────┐
│  ☰  ▢  📂  📞                         │  ←(32px icons, 48px tap target)
│  Home ProjectBlogContact               │
└────────────────────────────────────────┘
```

---

## 2. About Screen

```
[STATUS BAR: 24px]

[HEADER]
┌────────────────────────────────────────┐
│  ←  About BirruLabs                🌗 │  ←(back button)  ←(theme toggle)
└────────────────────────────────────────┘

[ABOUT HERO]
┌────────────────────────────────────────┐
│                                        │
│    WHO WE ARE                         │
│    AND WHY WE BUILD                   │
│                                        │
│    We’re a founder-led team of         │
│    engineers and AI researchers        │
│    building practical automation       │
│    for real-world challenges.          │
│                                        │
└────────────────────────────────────────┘

[MISSION CARDS]
┌────────────────────────────────────────┐
│  ┌──────────────────────────────────┐  │
│  │  🎯 Mission                      │  │
│  │  To democratize AI automation    │  │
│  │  for startups through practical  │  │
│  │ , portfolio-focused solutions.   │  │
│  └──────────────────────────────────┘  │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │  🛠️ Values                      │  │
│  │  • Technical excellence          │  │
│  │  • Founder empathy               │  │
│  │  • Real results                  │  │
│  │  • Open collaboration            │  │
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘

[TEAM GRID (2-column)]
┌────────────────────────────────────────┐
│  Team Leads                            │
│                                        │
│  ┌────────┐  ┌────────┐               │
│  │ Avatar │  │ Avatar │               │
│  │        │  │        │               │
│  │ CEO    │  │ CTO    │               │
│  │Founder │  │Engineer│               │
│  │        │  │        │               │
│  └────────┘  └────────┘               │
│                                        │
│  ┌────────┐  ┌────────┐               │
│  │ Avatar │  │ Avatar │               │
│  │        │  │        │               │
│  │ Head   │  │ AI     │               │
│  │Ops      │  │Research│               │
│  │        │  │        │               │
│  └────────┘  └────────┘               │
└────────────────────────────────────────┘

[STATS BANNER]
┌────────────────────────────────────────┐
│  ┌──────┬──────┬──────┬──────┐        │
│  │ 120  │  85  │  42  │  9   │        │
│  │active│cases │夥伴  │ years│        │
│  │systems│studies│       │history │    │
│  └──────┴──────┴──────┴──────┘        │
└────────────────────────────────────────┘
```

---

## 3. Project Detail Screen

```
[STATUS BAR: 24px]

[HEADER]
┌────────────────────────────────────────┐
│  ←  Particle教研 Net                🌗 │
│     Multi-Agent Training Pipeline      │
└────────────────────────────────────────┘

[FEATURED IMAGE]
┌────────────────────────────────────────┐
│                                        │
│  [Full-width technical diagram/image]  │
│                                        │
└────────────────────────────────────────┘

[PROJECT METADATA]
┌────────────────────────────────────────┐
│  🔹 Service: AI Infrastructure         │
│  📅 Date: 2026-07-15                   │
│  🏷️ Type: Research & Development      │
└────────────────────────────────────────┘

[ABOUT PROJECT]
┌────────────────────────────────────────┐
│  Overview                              │
│                                         │
│  Particle教研 Net is our approach to    │
│  distributed LLM training using multi- │
│  agent peer review and consensus-      │
│  based quality filtering. This project  │
│  demonstrates our capability in AI     │
│  infrastructure design.                 │
│                                         │
│  Results achieved:                      │
│  • 40% reduction in training overhead   │
│  • 28% improvement in output quality    │
│  • Real-time agent coordination across  │
│    15 distributed nodes                 │
└────────────────────────────────────────┘

[TECH STACK CARDS]
┌────────────────────────────────────────┐
│  ┌──────────────────────────────────┐  │
│  │  🔒 Security Layer               │  │
│  │  • Zero-knowledge proofs         │  │
│  │  • End-to-end encryption         │  │
│  │  • Runtime isolation             │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │  ⚡ Performance Layer             │  │
│  │  • Async task queuing            │  │
│  │  • Resource pooling              │  │
│  │  • Auto-scaling                  │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │  🤖 Agent Layer                  │  │
│  │  • Multi-agent consensus         │  │
│  │  • Peer evaluation               │  │
│  │  • Feedback loops                │  │
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘

[PHOTO GALLERY (horizontal scroll)]
┌────────────────────────────────────────┐
│  [Screenshot 1][Screenshot 2][Screenshot │
│   3][Deadline][Team Photo]             │
└────────────────────────────────────────┘

[CTA SECTION]
┌────────────────────────────────────────┐
│  📧 Need a similar solution?           │
│                                         │
│  [Contact us for project inquiry]      │  ←(primary button)
│                                         │
└────────────────────────────────────────┘
```

---

## 4. ArticleDetail Screen

```
[STATUS BAR: 24px]

[HEADER]
┌────────────────────────────────────────┐
│  ←  Building Autonomy               🌗 │
└────────────────────────────────────────┘

[ARTICLE HEADER]
┌────────────────────────────────────────┐
│  📚 BuildingAutonomy: Lessons from      │
│     Production Multi-Agent Systems      │
│                                         │
│  by Jane Doe | Product Lead            │
│  12 min read • August 2, 2026          │
│                                         │
│  [Share]  [Bookmark]                   │  ←(44x44px touch targets)
└────────────────────────────────────────┘

[FEATURED IMAGE]
┌────────────────────────────────────────┐
│                                        │
│  [Article main illustration]            │
│                                        │
└────────────────────────────────────────┘

[ARTICLE CONTENT]
┌────────────────────────────────────────┐
│                                       │
│  Introduction                         │
│                                       │
│  When we launched our first production │
│  multi-agent system, we expected       │
│  technical challenges. What surprised  │
│  us were the organisational lessons    │
│  that emerged.                         │
│                                       │
│  ──────────────────────────────────   │
│                                       │
│  The Autonomy Matrix                  │
│                                       │
│  We defined autonomy across three      │
│  dimensions:                          │
│                                       │
│  1. Decision Range — from reactive   │
│     to predictive                      │
│  2. Correction Cycle — human-in-loop │
│     vs fully autonomous                │
│  3. Failure Impact — containment     │
│     design                             │
│                                       │
│  ──────────────────────────────────   │
│                                       │
│  Key Takeaways                        │
│                                       │
│  • Start with guardrails, not free-   │
│    range autonomy                     │
│  • Build observable feedback loops    │
│  • Design for graceful degradation    │
│  • Document decisions, not just code  │
│                                       │
│  ──────────────────────────────────   │
│                                       │
│  Looking Ahead                        │
│                                       │
│  Our next focus is on cross-agent    │
│  communication protocols and cross-    │
│  domain knowledge transfer.            │
│                                       │
└────────────────────────────────────────┘

[ARTICLE TAGS]
┌────────────────────────────────────────┐
│  #AI #MultiAgent #Automation #TechLead │
└────────────────────────────────────────┘

[RELATED ARTICLES]
┌────────────────────────────────────────┐
│  You might also enjoy:                 │
│                                        │
│  ▢ AI Infrastructure Trends 2026      │
│  ▢ Particle教研 Net: Next-Gen LLM     │
│  ▢ Technical Audit Playbook           │
│                                        │
│  [View all articles]                   │
└────────────────────────────────────────┘

[COMMENT SECTION]
┌────────────────────────────────────────┐
│  Comments (4)                          │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │  [Ник]'s comment...              │  │
│  │  Great point about failure       │  │
│  │  modes — that's exactly what we   │  │
│  │  encountered in our last         │  │
│  │  deployment.                     │  │
│  │  ───────────────────────────────  │  │
│  │  [Like]  [Reply]  2h ago         │  │
│  └──────────────────────────────────┘  │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │  [User input...____________]      │  │
│  │                                  │  │
│  │  [Submit]                        │  │
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘
```

---

## 5. Contact Screen

```
[STATUS BAR: 24px]

[HEADER]
┌────────────────────────────────────────┐
│  ←  Contact Us                     🌗 │
└────────────────────────────────────────┘

[CONTACT GRID (2-column)]
┌────────────────────────────────────────┐
│  ┌──────────────────────────────────┐  │
│  │  📍 Office                      │  │
│  │  Jl.科技 Raya No. 45            │  │
│  │  Jakarta Selatan, 12345         │  │
│  │                                 │  │
│  │  📞 Phone                       │  │
│  │  +62 21 1234 5678              │  │
│  │                                 │  │
│  │  ✉️ Email                       │  │
│  │  contact@birrulabs.biz.id      │  │
│  └──────────────────────────────────┘  │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │  🕒 Business Hours              │  │
│  │  Mon–Fri: 9:00–18:00 WIB        │  │
│  │  Sat–Sun: Closed                │  │
│  │                                 │  │
│  │  🌐 Social                      │  │
│  │  [LinkedIn] [Twitter] [GitHub]  │  │
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘

[MAP EMBED]
┌────────────────────────────────────────┐
│  [Interactive Map Placeholder]          │
│    * Tap to open in Maps app           │
└────────────────────────────────────────┘

[INQUIRY FORM]
┌────────────────────────────────────────┐
│  Tell us about your project            │
│                                         │
│  Full Name *                           │
│  [____________________________]        │
│                                         │
│  Email *                               │
│  [____________________________]        │
│                                         │
│  Company Name                          │
│  [____________________________]        │
│                                         │
│  How can we help? *                    │
│  [ ┌──────────────────────────────┐ ]  │
│  │ │ Describe your needs          │ │  │
│  │ │ (200 words max)              │ │  │
│  │ │                              │ │  │
│  │ │                              │ │  │
│  │ └──────────────────────────────┘ │  │
│  └────────────────────────────────────┘
│                                         │
│  [Submit Inquiry]                      │  ←(primary, 48px height)
│                                         │
└────────────────────────────────────────┘

[SUCCESS PANE (hidden by default)]
┌────────────────────────────────────────┐
│  ✓ Message Sent                       │
│  Your inquiry has been received. We'll │
│  respond within 24 hours.              │
│                                        │
│  [Back to top]                         │
└────────────────────────────────────────┘
```

---

## Navigation States

### Bottom Tab Bar (Mobile)

| Tab | Icon | Label | State | Action |
|-----|------|-------|-------|--------|
| Home | 🏠 | Home | Active | Navigate to /
| Project | 📂 | Project | Inactive | Navigate to /projects |
| Blog | 📝 | Article | Inactive | Navigate to /articles |
| Contact | 📞 | Contact | Inactive | Navigate to /contact |

### Hamburger Menu (Mobile)

| Action | Icon | Label | Link |
|--------|------|-------|------|
| About | ℹ️ | About | /about |
| Services | ⚡ | Services | /services |
|_case Studies | 📊 | case Studies | /case-studies |
| Pricing | 💰 | Pricing | /pricing |
| Blog | 📚 | Blog | /blog |
| Contact | 📞 | Contact | /contact |
| Login | 👤 | Login | /login |
| Sign Up | ✍️ | Sign Up | /signup |

---

## Interactive States

### Button States (Mobile-First)

| State | Visual | Touch Target | Interaction |
|-------|--------|--------------|-------------|
| Default | Primary color bg, white text | 48x48px (minimum) | `opacity: 1` |
| Hover / Pressed | 10% darker bg | 48x48px | `opacity: 0.9` |
| Focus | Primary color border (2px) | 48x48px | `border: 2px brand-primary` |
| Disabled | Grey bg, reduced opacity | 48x48px | `opacity: 0.5`, `pointer-events: none` |
| Loading | Spinner + text shift | 48x48px | `spinner inset` |

### Card States

| State | Visual | States |
|-------|--------|--------|
| Default | White/dark bg, border | Hover lift (4px) |
| Active | Border accent color | `border-left: 4px brand-primary` |
| Loading | Skeleton placeholder | `background: chrome-gradient` |
| Error | Red border, error icon | `border-left: 4px brand-danger` |

---

## Responsive Breakpoints

| Device | Width | Layout Adjustments |
|--------|-------|-------------------|
| Mobile (Portrait) | 320-599px | Single column, bottom nav |
| Mobile (Landscape) | 600-767px | Two column grid, hide bottom nav |
| Tablet | 768-1023px | Three column grid, top nav |
| Desktop | 1024px+ | Full layout, expandable sidebar |
