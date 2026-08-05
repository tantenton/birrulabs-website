export interface Article {
  id: string;
  slug: string;
  title: {
    id: string;
    en: string;
  };
  excerpt: {
    id: string;
    en: string;
  };
  content: {
    id: string;
    en: string;
  };
  author: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  featured?: boolean;
}

export const ARTICLES: Article[] = [
  {
    id: '1',
    slug: 'why-ai-agents-need-orchestration',
    title: {
      id: 'Mengapa AI Agents Butuh Orchestration, Bukan Hanya Prompts',
      en: 'Why AI Agents Need Orchestration, Not Just Prompts',
    },
    excerpt: {
      id: 'Prompt engineering saja tidak cukup untuk sistem multi-agent yang reliable. Ini kenapa orchestration penting.',
      en: 'Prompt engineering alone is not enough for reliable multi-agent systems. Here is why orchestration matters.',
    },
    content: {
      id: `# Mengapa AI Agents Butuh Orchestration

Ketika kami mulai membangun sistem multi-agent untuk social media automation, kami belajar pelajaran penting: prompt engineering yang bagus saja tidak cukup.

## Masalah dengan Prompt-Only Approach

Single-agent dengan prompt yang bagus bisa menghasilkan output berkualitas. Tapi begitu kamu punya 5+ agents yang harus bekerja bersama, kamu butuh lebih dari sekadar prompt.

Yang kami hadapi:
- Agent A menulis konten, Agent B review, tapi tidak ada protokol retry ketika review reject
- Tidak ada prioritization — semua task diperlakukan sama pentingnya
- Tidak ada feedback loop — agent tidak belajar dari hasil
- Race condition ketika 2 agents edit resource yang sama

## Apa Itu Orchestration?

Orchestration adalah layer koordinasi di atas agents. CEO agent kami bertindak sebagai orchestrator yang:

1. Membagi task besar jadi subtask
2. Assign subtask ke specialized agents
3. Mengelola execution order dan dependencies
4. Handle retry, fallback, dan error recovery
5. Aggregate hasil dari multiple agents

## Pola yang Kami Gunakan

**CEO → Workers pattern:**
- CEO agent menerima goal high-level
- CEO breakdown jadi concrete tasks
- CEO assign ke Research, Creative, QC, Publishing agents
- CEO aggregate hasil dan verify completion

**Consensus mechanism:**
- Multiple agents vote untuk keputusan penting
- Threshold voting untuk quality gate
- Tie-breaker logic ketika vote split

**State machine:**
- Task punya status: pending → assigned → in_progress → review → done
- State transition yang jelas dan auditable
- Rollback mechanism ketika task fail

## Hasil Setelah Orchestration

Sebelum orchestration:
- Success rate ~60%
- Manual intervention setiap hari
- Debugging chaos

Setelah orchestration:
- Success rate ~92%
- Manual intervention cuma untuk edge case
- Clear audit trail

## Takeaway

Jika kamu build single-agent app, prompt engineering cukup. Tapi untuk multi-agent systems yang production-ready, kamu butuh orchestration layer.

Build the infrastructure first, optimize prompts second.`,
      en: `# Why AI Agents Need Orchestration

When we started building multi-agent systems for social media automation, we learned an important lesson: good prompt engineering alone is not enough.

## The Problem with Prompt-Only Approach

A single agent with a good prompt can produce quality output. But once you have 5+ agents that need to work together, you need more than just prompts.

What we faced:
- Agent A writes content, Agent B reviews, but no retry protocol when review rejects
- No prioritization — all tasks treated equally
- No feedback loop — agents don't learn from results
- Race conditions when 2 agents edit the same resource

## What is Orchestration?

Orchestration is a coordination layer on top of agents. Our CEO agent acts as orchestrator that:

1. Breaks large tasks into subtasks
2. Assigns subtasks to specialized agents
3. Manages execution order and dependencies
4. Handles retry, fallback, and error recovery
5. Aggregates results from multiple agents

## Patterns We Use

**CEO → Workers pattern:**
- CEO agent receives high-level goal
- CEO breaks down into concrete tasks
- CEO assigns to Research, Creative, QC, Publishing agents
- CEO aggregates results and verifies completion

**Consensus mechanism:**
- Multiple agents vote on important decisions
- Threshold voting for quality gates
- Tie-breaker logic when votes split

**State machine:**
- Tasks have status: pending → assigned → in_progress → review → done
- Clear and auditable state transitions
- Rollback mechanism when task fails

## Results After Orchestration

Before orchestration:
- ~60% success rate
- Manual intervention every day
- Debugging chaos

After orchestration:
- ~92% success rate
- Manual intervention only for edge cases
- Clear audit trail

## Takeaway

If you're building a single-agent app, prompt engineering is enough. But for production-ready multi-agent systems, you need an orchestration layer.

Build the infrastructure first, optimize prompts second.`,
    },
    author: 'BirruLabs Team',
    category: 'AI Agents',
    tags: ['multi-agent', 'orchestration', 'automation'],
    publishedAt: '2026-07-15',
    readingTime: 8,
    featured: true,
  },
  {
    id: '2',
    slug: 'building-human-in-the-loop',
    title: {
      id: 'Membangun Human-in-the-Loop Content Automation',
      en: 'Building a Human-in-the-Loop Content Automation System',
    },
    excerpt: {
      id: 'AI generates content, humans approve. Ini cara kami membangun approval workflow yang scalable.',
      en: 'AI generates content, humans approve. How we built a scalable approval workflow.',
    },
    content: {
      id: `# Membangun Human-in-the-Loop Content Automation

Automation penuh tidak selalu jawaban terbaik. Untuk content yang customer-facing, kami pakai human-in-the-loop.

## Kenapa Human-in-the-Loop?

Alasan kami tidak full-auto:
- Brand voice perlu konsisten — AI kadang melenceng
- Fact-checking critical untuk credibility
- Edge case yang AI tidak handle dengan baik
- Regulatory requirement di beberapa industry

## Approval Workflow Design

**Draft → Review → Approve/Reject → Publish**

1. AI generate draft
2. Draft masuk approval queue
3. Human review dan bisa edit inline
4. Approve → schedule publish
5. Reject → feedback masuk training loop

## Challenge dan Solusi

**Challenge:** Bottleneck di approval queue  
**Solusi:** Priority scoring — urgent content di-review dulu

**Challenge:** Reviewer tidak tahu konteks  
**Solusi:** Draft comes with metadata: topic, target audience, keyword focus

**Challenge:** Feedback tidak actionable  
**Solusi:** Structured feedback form dengan category

## Metrics

Yang kami track:
- Draft-to-publish conversion rate
- Average review time
- Rejection reason breakdown
- Post-publish performance vs AI confidence score

## Hasil

70% draft approved tanpa edit signifikan. 20% approved dengan minor edit. 10% rejected dan re-generated.

Human-in-the-loop menambah latency, tapi worth it untuk quality dan brand safety.`,
      en: `# Building a Human-in-the-Loop Content Automation System

Full automation is not always the best answer. For customer-facing content, we use human-in-the-loop.

## Why Human-in-the-Loop?

Why we don't go full-auto:
- Brand voice needs consistency — AI sometimes drifts
- Fact-checking is critical for credibility
- Edge cases AI doesn't handle well
- Regulatory requirements in some industries

## Approval Workflow Design

**Draft → Review → Approve/Reject → Publish**

1. AI generates draft
2. Draft enters approval queue
3. Human reviews and can edit inline
4. Approve → schedule publish
5. Reject → feedback enters training loop

## Challenges and Solutions

**Challenge:** Bottleneck in approval queue  
**Solution:** Priority scoring — urgent content reviewed first

**Challenge:** Reviewers lack context  
**Solution:** Draft comes with metadata: topic, target audience, keyword focus

**Challenge:** Feedback not actionable  
**Solution:** Structured feedback form with categories

## Metrics

What we track:
- Draft-to-publish conversion rate
- Average review time
- Rejection reason breakdown
- Post-publish performance vs AI confidence score

## Results

70% drafts approved without significant edits. 20% approved with minor edits. 10% rejected and re-generated.

Human-in-the-loop adds latency, but worth it for quality and brand safety.`,
    },
    author: 'BirruLabs Team',
    category: 'Automation',
    tags: ['content-automation', 'workflow', 'quality-control'],
    publishedAt: '2026-07-22',
    readingTime: 6,
    featured: true,
  },
];
