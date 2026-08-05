import type { Metadata } from 'next';
import Link from 'next/link';
import { PROJECTS } from '@/data/projects';
import { getT } from '@/lib/translations';
import type { Locale } from '@/lib/translations';
import { Layers, ArrowUpRight, ShieldCheck } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = getT(locale as Locale);
  return {
    title: `${t.projects.title} | BirruLabs AI Product Lab`,
    description: t.projects.subtitle,
  };
}

const STATUS_COLORS: Record<string, string> = {
  'Internal Alpha': 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm shadow-emerald-500/10',
  'Prototype': 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-sm shadow-amber-500/10',
  'In Development': 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm shadow-cyan-500/10',
  'Research': 'bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-sm shadow-purple-500/10',
  'Pilot': 'bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-sm shadow-orange-500/10',
  'Experimental': 'bg-pink-500/10 text-pink-400 border border-pink-500/20 shadow-sm shadow-pink-500/10',
};

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const t = getT(l);

  const categories = ['All', ...Array.from(new Set(PROJECTS.map((p) => p.category)))];

  return (
    <div className="relative min-h-screen bg-[#0B0D13] text-[#F3F4F6] selection:bg-indigo-500/30 selection:text-white">

      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-radial-glow pointer-events-none z-0" />

      {/* HEADER */}
      <section className="relative z-10 px-4 sm:px-6 pt-24 pb-16 md:pt-32 md:pb-20 border-b border-white/10 max-w-7xl mx-auto">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
            <Layers className="w-3.5 h-3.5" />
            <span>{l === 'id' ? 'Katalog Produk & Riset AI' : 'AI Product & Research Portfolio'}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">{t.projects.title}</h1>
          <p className="text-gray-400 text-lg sm:text-xl leading-relaxed">{t.projects.subtitle}</p>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section className="sticky top-20 z-40 px-4 sm:px-6 py-4 border-b border-white/10 bg-[#0B0D13]/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex gap-2.5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {categories.map((cat, idx) => (
            <span
              key={cat}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                idx === 0 
                  ? 'bg-indigo-600/30 border-indigo-500/50 text-white shadow-sm shadow-indigo-500/20' 
                  : 'bg-white/[0.03] border-white/10 text-gray-400 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section className="relative z-10 px-4 sm:px-6 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((p) => (
            <Link
              key={p.id}
              href={`/${l}/projects/${p.slug}`}
              className="group relative rounded-2xl p-[1px] bg-white/10 hover:bg-gradient-to-b hover:from-indigo-500/40 hover:to-cyan-500/20 transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col"
            >
              <div className="h-full bg-[#121520] rounded-[15px] p-7 flex flex-col justify-between space-y-6">
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${STATUS_COLORS[p.status] || 'bg-gray-500/10 text-gray-400'}`}>
                      {p.status}
                    </span>
                    <span className="text-xs text-gray-400 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/5 font-mono">
                      {p.category}
                    </span>
                  </div>

                  <h2 className="font-bold text-xl text-white group-hover:text-indigo-300 transition-colors flex items-center justify-between">
                    <span>{p.title[l]}</span>
                    <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h2>

                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {p.summary[l]}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2 mt-auto">
                  {p.techStack.slice(0, 4).map((tech) => (
                    <span key={tech} className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] text-gray-300 font-mono border border-white/[0.05]">
                      {tech}
                    </span>
                  ))}
                </div>

              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PUBLIC TRANSPARENCY DISCLAIMER */}
      <section className="relative z-10 px-4 sm:px-6 pb-20 max-w-7xl mx-auto">
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center gap-4 text-xs text-gray-400">
          <ShieldCheck className="w-5 h-5 text-indigo-400 flex-shrink-0" />
          <p className="leading-relaxed">
            {l === 'id'
              ? 'Semua status proyek diperbarui secara transparan. BirruLabs berkomitmen pada transparansi publik tanpa klaim pengguna atau kemitraan yang belum terverifikasi.'
              : 'All project statuses are transparently updated. BirruLabs commits to public build integrity without unverified metric claims.'}
          </p>
        </div>
      </section>

    </div>
  );
}

