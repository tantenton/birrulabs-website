import type { Metadata } from 'next';
import Link from 'next/link';
import { Bot, Zap, Sparkles, ArrowRight } from 'lucide-react';
import { PROJECTS } from '@/data/projects';
import { getT } from '@/lib/translations';
import type { Locale } from '@/lib/translations';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = getT(locale as Locale);
  return {
    title: 'BirruLabs — AI Product Lab',
    description: t.hero.subtitle,
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

const STEPS = ['step_research', 'step_design', 'step_build', 'step_ship'] as const;
const STEP_DESCS: Record<Locale, string[]> = {
  id: ['Riset masalah dan solusi', 'Rancang arsitektur dan UX', 'Build dengan TDD', 'Deploy dan monitor'],
  en: ['Research problem and solution', 'Design architecture and UX', 'Build with TDD', 'Deploy and monitor'],
};

const AGENTS = ['CEO Orchestrator', 'Research Agent', 'Creative Agent', 'Engineering Agent', 'QC Agent', 'Publishing Agent'];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const t = getT(l);

  const featured = PROJECTS.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F0F2F5]">

      {/* HERO */}
      <section className="relative px-4 py-20 md:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-transparent to-emerald-950/20 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Building in public — AI product lab
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
            {t.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-[#A3A6AC] max-w-2xl mb-10 leading-relaxed">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`/${l}/projects`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors min-h-[48px]"
            >
              {t.hero.cta_primary}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href={`/${l}/contact`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-[#2D3036] hover:bg-[#16191F] text-[#F0F2F5] font-semibold transition-colors min-h-[48px]"
            >
              {t.hero.cta_secondary}
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section className="px-4 py-20 border-t border-[#2D3036]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{t.home.what_we_build_title}</h2>
          <p className="text-[#A3A6AC] mb-12">{t.home.what_we_build_subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Bot, title: t.home.ai_agents_title, desc: t.home.ai_agents_desc, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
              { icon: Zap, title: t.home.automation_title, desc: t.home.automation_desc, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
              { icon: Sparkles, title: t.home.creative_title, desc: t.home.creative_desc, color: 'text-purple-400', bg: 'bg-purple-500/10' },
            ].map(({ icon: Icon, title, desc, color, bg }) => (
              <div key={title} className="p-6 rounded-xl bg-[#16191F] border border-[#2D3036] hover:border-indigo-500/30 transition-colors">
                <div className={`inline-flex p-3 rounded-lg ${bg} mb-4`}>
                  <Icon className={`w-6 h-6 ${color}`} aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-[#A3A6AC] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="px-4 py-20 border-t border-[#2D3036]">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">{t.projects.title}</h2>
              <p className="text-[#A3A6AC]">{t.projects.subtitle}</p>
            </div>
            <Link href={`/${l}/projects`} className="hidden sm:inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium">
              {t.projects.view_all} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((p) => (
              <Link
                key={p.id}
                href={`/${l}/projects/${p.slug}`}
                className="group p-6 rounded-xl bg-[#16191F] border border-[#2D3036] hover:border-indigo-500/40 transition-all hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_COLORS[p.status] || 'bg-gray-500/10 text-gray-400'}`}>
                    {p.status}
                  </span>
                  <span className="text-xs text-[#6C6F75] px-2 py-1 rounded-full bg-[#1A1D23]">{p.category}</span>
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-indigo-400 transition-colors">{p.title[l]}</h3>
                <p className="text-[#A3A6AC] text-sm leading-relaxed mb-4">{p.summary[l]}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.techStack.slice(0, 3).map((tech) => (
                    <span key={tech} className="text-xs px-2 py-0.5 rounded bg-[#1A1D23] text-[#6C6F75]">{tech}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 sm:hidden text-center">
            <Link href={`/${l}/projects`} className="inline-flex items-center gap-2 text-indigo-400 text-sm font-medium">
              {t.projects.view_all} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="px-4 py-20 border-t border-[#2D3036]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{t.home.how_we_work_title}</h2>
          <p className="text-[#A3A6AC] mb-12">{t.home.how_we_work_subtitle}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STEPS.map((key, i) => (
              <div key={key} className="relative">
                <div className="w-10 h-10 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold mb-4">
                  {i + 1}
                </div>
                <h3 className="font-semibold mb-1">{t.home[key]}</h3>
                <p className="text-[#A3A6AC] text-sm">{STEP_DESCS[l][i]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AGENT ORCHESTRATION */}
      <section className="px-4 py-20 border-t border-[#2D3036]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{t.home.agent_orchestration_title}</h2>
          <p className="text-[#A3A6AC] mb-12">{t.home.agent_orchestration_subtitle}</p>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 overflow-x-auto pb-4">
            {AGENTS.map((agent, i) => (
              <div key={agent} className="flex items-center gap-3 flex-shrink-0">
                <div className={`px-4 py-3 rounded-lg border text-sm font-medium ${i === 0 ? 'bg-indigo-600/20 border-indigo-500/40 text-indigo-300' : 'bg-[#16191F] border-[#2D3036] text-[#A3A6AC]'}`}>
                  {agent}
                </div>
                {i < AGENTS.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-[#6C6F75] flex-shrink-0" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES PLACEHOLDER */}
      <section className="px-4 py-20 border-t border-[#2D3036]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">{t.articles.title}</h2>
          <p className="text-[#A3A6AC] mb-12">{t.articles.subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              l === 'id' ? 'Mengapa AI Agents Butuh Orchestration, Bukan Hanya Prompts' : 'Why AI Agents Need Orchestration, Not Just Prompts',
              l === 'id' ? 'Membangun Human-in-the-Loop Content Automation' : 'Building a Human-in-the-Loop Content Automation System',
              l === 'id' ? 'Pelajaran dari Membangun Multi-Agent Workflows' : 'Lessons From Building Multi-Agent Workflows',
            ].map((title) => (
              <div key={title} className="p-6 rounded-xl bg-[#16191F] border border-[#2D3036]">
                <span className="inline-block text-xs px-2 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 mb-4">
                  {t.articles.coming_soon}
                </span>
                <h3 className="font-semibold text-[#A3A6AC] leading-snug">{title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STARTUP CTA */}
      <section className="px-4 py-20 border-t border-[#2D3036]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.home.startup_cta_title}</h2>
          <p className="text-[#A3A6AC] mb-10 text-lg">{t.home.startup_cta_subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${l}/contact`} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors min-h-[48px]">
              {t.home.startup_cta_primary}
            </Link>
            <Link href={`/${l}/contact`} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-[#2D3036] hover:bg-[#16191F] font-semibold transition-colors min-h-[48px]">
              {t.home.startup_cta_secondary}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
