import type { Metadata } from 'next';
import Link from 'next/link';
import { PROJECTS } from '@/data/projects';
import { getT } from '@/lib/translations';
import type { Locale } from '@/lib/translations';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = getT(locale as Locale);
  return {
    title: `${t.projects.title} | BirruLabs`,
    description: t.projects.subtitle,
  };
}

const STATUS_COLORS: Record<string, string> = {
  'Internal Alpha': 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  'Prototype': 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
  'In Development': 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  'Research': 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
  'Pilot': 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
  'Experimental': 'bg-pink-500/10 text-pink-400 border border-pink-500/20',
};

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const t = getT(l);

  const categories = ['All', ...Array.from(new Set(PROJECTS.map((p) => p.category)))];

  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F0F2F5]">

      {/* HEADER */}
      <section className="px-4 py-20 md:py-24 border-b border-[#2D3036]">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.projects.title}</h1>
          <p className="text-xl text-[#A3A6AC]">{t.projects.subtitle}</p>
        </div>
      </section>

      {/* CATEGORY FILTER (static — no JS needed) */}
      <section className="px-4 py-6 border-b border-[#2D3036] sticky top-16 z-10 bg-[#0F1115]/90 backdrop-blur">
        <div className="max-w-5xl mx-auto flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {categories.map((cat) => (
            <span
              key={cat}
              className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm border border-[#2D3036] text-[#A3A6AC] bg-[#16191F] cursor-default"
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section className="px-4 py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p) => (
            <Link
              key={p.id}
              href={`/${l}/projects/${p.slug}`}
              className="group flex flex-col p-6 rounded-xl bg-[#16191F] border border-[#2D3036] hover:border-indigo-500/40 transition-all hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4 gap-2 flex-wrap">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_COLORS[p.status] || 'bg-gray-500/10 text-gray-400'}`}>
                  {p.status}
                </span>
                <span className="text-xs text-[#6C6F75] px-2 py-1 rounded-full bg-[#1A1D23]">{p.category}</span>
              </div>
              <h2 className="font-semibold text-lg mb-2 group-hover:text-indigo-400 transition-colors">
                {p.title[l]}
              </h2>
              <p className="text-[#A3A6AC] text-sm leading-relaxed mb-4 flex-1">
                {p.summary[l]}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {p.techStack.slice(0, 4).map((tech) => (
                  <span key={tech} className="text-xs px-2 py-0.5 rounded bg-[#1A1D23] text-[#6C6F75]">
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm text-[#6C6F75] border border-[#2D3036] rounded-lg px-4 py-3 bg-[#16191F]">
            {l === 'id'
              ? 'Semua proyek menampilkan status yang akurat. Tidak ada klaim palsu tentang pengguna, revenue, atau partnership.'
              : 'All projects display accurate status. No false claims about users, revenue, or partnerships.'}
          </p>
        </div>
      </section>

    </div>
  );
}
