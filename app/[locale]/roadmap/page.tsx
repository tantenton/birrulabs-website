import type { Metadata } from 'next';
import type { Locale } from '@/lib/translations';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Roadmap | BirruLabs',
    description: 'BirruLabs development roadmap and upcoming milestones.',
  };
}

const ROADMAP: Record<Locale, { quarter: string; title: string; items: string[]; status: 'done' | 'active' | 'planned' }[]> = {
  id: [
    {
      quarter: 'Q3 2026',
      title: 'Foundation',
      status: 'done',
      items: [
        'Launch website resmi birrulabs.biz.id',
        'Affiloom Internal Alpha',
        'Social Media AI Manager Internal Alpha',
        'BirruHealthOS Prototype',
        'Creative Factory In Development',
      ],
    },
    {
      quarter: 'Q4 2026',
      title: 'Alpha Release',
      status: 'active',
      items: [
        'Affiloom Beta — expand ke lebih banyak platform',
        'BirruHealthOS Beta — cloud sync feature',
        'Content automation pipeline live',
        'Admin panel + approval workflow',
        'Analytics integration',
      ],
    },
    {
      quarter: 'Q1 2027',
      title: 'Public Launch',
      status: 'planned',
      items: [
        'Affiloom public launch',
        'BirruHealthOS public launch',
        'Case studies published',
        'Partnership program launch',
        'Startup program applications',
      ],
    },
    {
      quarter: 'Q2 2027',
      title: 'Scale',
      status: 'planned',
      items: [
        'Creative Factory public beta',
        'API platform untuk third-party integration',
        'Mobile app companion',
        'Enterprise pilot programs',
      ],
    },
  ],
  en: [
    {
      quarter: 'Q3 2026',
      title: 'Foundation',
      status: 'done',
      items: [
        'Launch official website birrulabs.biz.id',
        'Affiloom Internal Alpha',
        'Social Media AI Manager Internal Alpha',
        'BirruHealthOS Prototype',
        'Creative Factory In Development',
      ],
    },
    {
      quarter: 'Q4 2026',
      title: 'Alpha Release',
      status: 'active',
      items: [
        'Affiloom Beta — expand to more platforms',
        'BirruHealthOS Beta — cloud sync feature',
        'Content automation pipeline live',
        'Admin panel + approval workflow',
        'Analytics integration',
      ],
    },
    {
      quarter: 'Q1 2027',
      title: 'Public Launch',
      status: 'planned',
      items: [
        'Affiloom public launch',
        'BirruHealthOS public launch',
        'Case studies published',
        'Partnership program launch',
        'Startup program applications',
      ],
    },
    {
      quarter: 'Q2 2027',
      title: 'Scale',
      status: 'planned',
      items: [
        'Creative Factory public beta',
        'API platform for third-party integration',
        'Mobile app companion',
        'Enterprise pilot programs',
      ],
    },
  ],
};

const STATUS_STYLE = {
  done: 'bg-[#161920] border-[rgba(99,102,241,0.3)] text-[#10b981]',
  active: 'bg-[#161920] border-[rgba(99,102,241,0.3)] text-[#6366F1]',
  planned: 'bg-[#161920] border-[rgba(255,255,255,0.07)] text-[#908fa0]',
};

const STATUS_LABEL: Record<Locale, Record<string, string>> = {
  id: { done: 'Selesai', active: 'Aktif', planned: 'Direncanakan' },
  en: { done: 'Done', active: 'Active', planned: 'Planned' },
};

export default async function RoadmapPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const isID = l === 'id';

  return (
    <div className="min-h-screen bg-[#0A0C10] text-[#e2e2e8]">
      <section className="px-4 py-20 border-b border-[rgba(255,255,255,0.07)]" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(99,102,241,0.1), transparent)' }}>
        <div className="max-w-[1120px] mx-auto px-5 md:px-12">
          <h1 className="text-[40px] md:text-[56px] leading-[1.05] tracking-[-0.02em] font-bold mb-4">Roadmap</h1>
          <p className="text-xl text-[#c7c4d7]">
            {isID
              ? 'Milestone yang sudah selesai dan yang akan datang. Semua status adalah faktual.'
              : 'Completed milestones and upcoming ones. All statuses are factual.'}
          </p>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="max-w-[1120px] mx-auto px-5 md:px-12 space-y-8">
          {ROADMAP[l].map((phase) => (
            <div key={phase.quarter} className="relative pl-8 border-l-2 border-[rgba(255,255,255,0.07)]">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#0A0C10] border-2 border-[rgba(255,255,255,0.07)]" />
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="font-mono text-[11px] tracking-[0.03em] text-[#908fa0]">{phase.quarter}</span>
                <h2 className="text-[32px] md:text-[40px] leading-[1.15] tracking-[-0.015em] font-semibold">{phase.title}</h2>
                <span className={`text-[11px] px-3 py-1 rounded-full border font-medium uppercase tracking-[0.12em] ${STATUS_STYLE[phase.status]}`}>
                  {STATUS_LABEL[l][phase.status]}
                </span>
              </div>
              <ul className="space-y-2">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[#c7c4d7]">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${phase.status === 'done' ? 'bg-[#10b981]' : phase.status === 'active' ? 'bg-[#6366F1]' : 'bg-[rgba(255,255,255,0.07)]'}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-[1120px] mx-auto px-5 md:px-12 mt-12 p-6 rounded-xl bg-[#161920] border border-[rgba(255,255,255,0.07)]">
          <p className="text-sm text-[#908fa0]">
            {isID
              ? '⚠️ Roadmap ini bersifat aspirasional. Tidak ada jaminan timeline. BirruLabs adalah solo project yang building in public.'
              : '⚠️ This roadmap is aspirational. No timeline guarantees. BirruLabs is a solo project building in public.'}
          </p>
        </div>
      </section>
    </div>
  );
}
