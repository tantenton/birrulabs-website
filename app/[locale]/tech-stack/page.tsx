import type { Metadata } from 'next';
import type { Locale } from '@/lib/translations';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Technology Stack | BirruLabs',
    description: 'Technologies and tools used by BirruLabs.',
  };
}

const STACK = [
  {
    category_id: 'Frontend',
    category_en: 'Frontend',
    items: [
      { name: 'Next.js 15', desc_id: 'App Router, SSG, SSR', desc_en: 'App Router, SSG, SSR' },
      { name: 'TypeScript', desc_id: 'Strict mode di semua project', desc_en: 'Strict mode across all projects' },
      { name: 'Tailwind CSS', desc_id: 'Mobile-first, dark-first', desc_en: 'Mobile-first, dark-first' },
      { name: 'React 19', desc_id: 'Server components, use() hook', desc_en: 'Server components, use() hook' },
    ],
  },
  {
    category_id: 'Backend',
    category_en: 'Backend',
    items: [
      { name: 'FastAPI', desc_id: 'Python API services', desc_en: 'Python API services' },
      { name: 'Prisma 7', desc_id: 'ORM untuk PostgreSQL & SQLite', desc_en: 'ORM for PostgreSQL & SQLite' },
      { name: 'PostgreSQL', desc_id: 'Production database', desc_en: 'Production database' },
      { name: 'SQLite', desc_id: 'Local-first offline database', desc_en: 'Local-first offline database' },
    ],
  },
  {
    category_id: 'AI & Automation',
    category_en: 'AI & Automation',
    items: [
      { name: 'Hermes Agent', desc_id: 'CEO orchestrator & agent runtime', desc_en: 'CEO orchestrator & agent runtime' },
      { name: 'BullMQ', desc_id: 'Distributed task queue (Redis)', desc_en: 'Distributed task queue (Redis)' },
      { name: 'Redis', desc_id: 'Queue backend & caching', desc_en: 'Queue backend & caching' },
      { name: 'FAL.ai', desc_id: 'Image & video generation', desc_en: 'Image & video generation' },
      { name: 'Replicate', desc_id: 'ML model inference', desc_en: 'ML model inference' },
    ],
  },
  {
    category_id: 'Infrastructure',
    category_en: 'Infrastructure',
    items: [
      { name: 'Vercel', desc_id: 'Frontend hosting & edge functions', desc_en: 'Frontend hosting & edge functions' },
      { name: 'Supabase', desc_id: 'Database, storage, auth', desc_en: 'Database, storage, auth' },
      { name: 'GitHub Actions', desc_id: 'CI/CD pipeline', desc_en: 'CI/CD pipeline' },
      { name: 'Docker', desc_id: 'Self-hosted deployment option', desc_en: 'Self-hosted deployment option' },
    ],
  },
  {
    category_id: 'Tools',
    category_en: 'Tools',
    items: [
      { name: 'Zod', desc_id: 'Schema validation', desc_en: 'Schema validation' },
      { name: 'ESLint + Prettier', desc_id: 'Code quality', desc_en: 'Code quality' },
      { name: 'npm audit', desc_id: 'Dependency scanning', desc_en: 'Dependency scanning' },
      { name: 'Lucide React', desc_id: 'Icon library', desc_en: 'Icon library' },
    ],
  },
];

export default async function TechStackPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const isID = l === 'id';

  return (
    <div className="min-h-screen bg-[#0A0C10] text-[#e2e2e8]">
      <section
        className="relative overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(99,102,241,0.1), transparent)' }}
      >
        <div className="absolute inset-0 bg-grid opacity-25" aria-hidden="true" />
        <div className="relative section-container py-20 md:py-28">
          <h1 className="text-[40px] md:text-[56px] leading-[1.05] tracking-[-0.02em] font-bold text-[#e2e2e8] mb-4">
            {isID ? 'Tech Stack' : 'Technology Stack'}
          </h1>
          <p className="text-[20px] leading-[1.65] text-[#c7c4d7] max-w-2xl">
            {isID
              ? 'Tools dan teknologi yang kami gunakan di BirruLabs.'
              : 'Tools and technologies we use at BirruLabs.'}
          </p>
        </div>
      </section>

      <section className="section-container py-16 md:py-20">
        <div className="max-w-4xl mx-auto space-y-12">
          {STACK.map((cat) => (
            <div key={cat.category_en}>
              <h2 className="text-[20px] font-semibold text-[#e2e2e8] mb-6 flex items-center gap-2">
                <span className="font-mono text-[11px] text-[#6366F1] tracking-[0.03em] uppercase">
                  0{STACK.indexOf(cat) + 1}
                </span>
                {isID ? cat.category_id : cat.category_en}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cat.items.map((item) => (
                  <div
                    key={item.name}
                    className="rounded-xl bg-[#161920] border border-[rgba(255,255,255,0.07)]
                              hover:border-[rgba(99,102,241,0.3)] transition-all duration-300 p-5"
                  >
                    <h3 className="font-semibold text-[#e2e2e8] mb-2">{item.name}</h3>
                    <p className="text-[13px] leading-[1.6] text-[#c7c4d7]">
                      {isID ? item.desc_id : item.desc_en}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="rounded-xl bg-[#161920] border border-[rgba(255,255,255,0.07)]
                            hover:border-[rgba(99,102,241,0.3)] transition-all duration-300 p-6">
            <h3 className="font-semibold text-[#e2e2e8] mb-4">Prinsip Pemilihan Tech Stack</h3>
            <ul className="space-y-3">
              {(isID ? [
                'Audit semua dependency sebelum dipakai',
                'Preferensi package dengan maintenance aktif',
                'Minimal dependency — jangan tambah yang tidak perlu',
                'Versi yang stable dan production-ready',
                'Security-first: tidak ada package dengan known vulnerabilities kritis',
              ] : [
                'Audit all dependencies before use',
                'Prefer packages with active maintenance',
                'Minimal dependencies — do not add what is not needed',
                'Stable, production-ready versions',
                'Security-first: no packages with critical known vulnerabilities',
              ]).map((p) => (
                <li key={p} className="flex items-start gap-3 text-[14px] text-[#c7c4d7]">
                  <span className="text-[#6366F1] mt-0.5 flex-shrink-0" aria-hidden="true">✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
