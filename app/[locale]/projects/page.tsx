import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '@/data/projects';
import { getT } from '@/lib/translations';
import type { Locale } from '@/lib/translations';

export const metadata: Metadata = {
  title: 'Sistem & Proyek — BirruLabs',
  description: 'Portofolio sistem AI otonom, otomatisasi affiliate, dan software local-first buatan BirruLabs.',
};

const STAGE_BADGES: Record<string, string> = {
  'Internal Alpha': 'bg-amber-500/10 text-amber-300 border border-amber-500/20',
  'Prototype': 'bg-blue-500/10 text-blue-300 border border-blue-500/20',
  'In Development': 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20',
  'Research Track': 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20',
};

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;

  const featured = PROJECTS.find((p) => p.slug === 'affiloom') || PROJECTS[0];
  const activeSystems = PROJECTS.filter((p) => p.id !== featured.id);

  return (
    <div className="min-h-screen bg-[#0C0E12] text-[#F3F4F6]">
      <section className="px-4 sm:px-6 pt-20 pb-16 max-w-7xl mx-auto border-b border-white/10 space-y-4">
        <div className="text-xs font-mono uppercase tracking-widest text-indigo-400">
          Portfolio & Systems Index
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          {l === 'id' ? 'Sistem & Proyek Rekayasa' : 'Engineered Systems & Projects'}
        </h1>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed">
          {l === 'id'
            ? 'Setiap proyek merupakan bukti eksplisit bagaimana kami merancang, menguji, dan mendokumentasikan sistem AI.'
            : 'Each system represents explicit evidence of how we design, test, and document software architecture.'}
        </p>
      </section>

      <section className="px-4 sm:px-6 py-16 max-w-7xl mx-auto space-y-16">
        
        {/* 1. FEATURED SYSTEM */}
        <div className="space-y-6">
          <div className="text-xs font-mono uppercase tracking-widest text-gray-400">
            01 / Featured System
          </div>
          <div className="p-8 rounded-xl bg-[#13161F] border border-white/10 space-y-6">
            <div className="flex items-center justify-between gap-4">
              <span className={`text-xs font-mono px-3 py-1 rounded ${STAGE_BADGES[featured.status] || 'bg-gray-500/10 text-gray-400'}`}>
                {featured.status}
              </span>
              <span className="text-xs font-mono text-gray-400 uppercase">{featured.category}</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-white flex items-center justify-between">
                <span>{featured.title[l]}</span>
                <Link href={`/${l}/projects/${featured.slug}`} aria-label={featured.title[l]}>
                  <ArrowUpRight className="w-6 h-6 text-gray-400 hover:text-white transition-colors" />
                </Link>
              </h2>
              <p className="text-gray-300 text-base leading-relaxed">
                {featured.description[l]}
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-400">
              <div>
                <span className="font-mono text-gray-500 uppercase block mb-1">Operational Problem</span>
                <p className="text-gray-300">Penataan alur affiliate dan riset produk manual yang kompleks.</p>
              </div>
              <div>
                <span className="font-mono text-gray-500 uppercase block mb-1">Architecture Approach</span>
                <p className="text-gray-300">Orkestrasi multi-agen dengan titik verifikasi manusia yang eksplisit.</p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-2">
              {featured.techStack.map((tech) => (
                <span key={tech} className="text-xs px-2.5 py-1 rounded bg-white/[0.04] text-gray-300 font-mono border border-white/5">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 2. ACTIVE SYSTEMS */}
        <div className="space-y-6">
          <div className="text-xs font-mono uppercase tracking-widest text-gray-400">
            02 / Active Systems & Lab Prototypes
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeSystems.map((p) => (
              <div key={p.id} className="p-6 rounded-xl bg-[#13161F] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono px-2.5 py-0.5 rounded ${STAGE_BADGES[p.status] || 'bg-gray-500/10 text-gray-400'}`}>
                    {p.status}
                  </span>
                  <span className="text-xs font-mono text-gray-500">{p.category}</span>
                </div>
                <h3 className="text-xl font-bold text-white flex items-center justify-between">
                  <span>{p.title[l]}</span>
                  <Link href={`/${l}/projects/${p.slug}`} aria-label={p.title[l]}>
                    <ArrowUpRight className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                  </Link>
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {p.summary[l]}
                </p>
                <div className="pt-3 border-t border-white/[0.06] flex flex-wrap gap-2">
                  {p.techStack.slice(0, 3).map((tech) => (
                    <span key={tech} className="text-[11px] px-2 py-0.5 rounded bg-white/[0.04] text-gray-400 font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}

