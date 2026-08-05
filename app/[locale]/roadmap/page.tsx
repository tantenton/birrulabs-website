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
  done: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
  active: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400',
  planned: 'bg-[#1A1D23] border-[#2D3036] text-[#6C6F75]',
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
    <div className="min-h-screen bg-[#0F1115] text-[#F0F2F5]">
      <section className="px-4 py-20 border-b border-[#2D3036]">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Roadmap</h1>
          <p className="text-xl text-[#A3A6AC]">
            {isID
              ? 'Milestone yang sudah selesai dan yang akan datang. Semua status adalah faktual.'
              : 'Completed milestones and upcoming ones. All statuses are factual.'}
          </p>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="max-w-3xl mx-auto space-y-8">
          {ROADMAP[l].map((phase) => (
            <div key={phase.quarter} className="relative pl-8 border-l-2 border-[#2D3036]">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#0F1115] border-2 border-[#2D3036]" />
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="text-sm font-mono text-[#6C6F75]">{phase.quarter}</span>
                <h2 className="text-xl font-semibold">{phase.title}</h2>
                <span className={`text-xs px-2 py-1 rounded-full border font-medium ${STATUS_STYLE[phase.status]}`}>
                  {STATUS_LABEL[l][phase.status]}
                </span>
              </div>
              <ul className="space-y-2">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[#A3A6AC]">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${phase.status === 'done' ? 'bg-emerald-400' : phase.status === 'active' ? 'bg-indigo-400' : 'bg-[#2D3036]'}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-3xl mx-auto mt-12 p-4 rounded-lg bg-[#16191F] border border-[#2D3036]">
          <p className="text-sm text-[#6C6F75]">
            {isID
              ? '⚠️ Roadmap ini bersifat aspirasional. Tidak ada jaminan timeline. BirruLabs adalah solo project yang building in public.'
              : '⚠️ This roadmap is aspirational. No timeline guarantees. BirruLabs is a solo project building in public.'}
          </p>
        </div>
      </section>
    </div>
  );
}
