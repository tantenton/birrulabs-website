import type { Metadata } from 'next';
import Link from 'next/link';
import { Bot, Zap, Sparkles, ArrowRight, Terminal, Cpu, CheckCircle2, ShieldCheck, Layers, ArrowUpRight, Play } from 'lucide-react';
import { PROJECTS } from '@/data/projects';
import { getT } from '@/lib/translations';
import type { Locale } from '@/lib/translations';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = getT(locale as Locale);
  return {
    title: 'BirruLabs — Autonomous AI Product Lab',
    description: t.hero.subtitle,
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

const STEPS = ['step_research', 'step_design', 'step_build', 'step_ship'] as const;
const STEP_DESCS: Record<Locale, string[]> = {
  id: ['Riset mendalam & identifikasi masalah', 'Arsitektur multi-agen & UX presisi', 'Pengembangan dengan TDD & CI/CD', 'Deploy, monitoring & continuous learning'],
  en: ['Deep problem research & solution specs', 'Multi-agent architecture & precision UX', 'Development with TDD & CI/CD', 'Deployment, monitoring & continuous learning'],
};

const AGENTS = [
  { name: 'CEO Orchestrator', role: 'Task Decomposition', color: 'border-indigo-500/40 bg-indigo-600/20 text-indigo-300' },
  { name: 'Research Agent', role: 'Context & Knowledge Retrieval', color: 'border-cyan-500/40 bg-cyan-600/20 text-cyan-300' },
  { name: 'Creative Agent', role: 'UI/UX & Copy Synthesis', color: 'border-purple-500/40 bg-purple-600/20 text-purple-300' },
  { name: 'Engineering Agent', role: 'Code Generation & Refactoring', color: 'border-emerald-500/40 bg-emerald-600/20 text-emerald-300' },
  { name: 'QC Agent', role: 'Automated Testing & Audit', color: 'border-amber-500/40 bg-amber-600/20 text-amber-300' },
  { name: 'Publishing Agent', role: 'CI/CD & Deployment', color: 'border-blue-500/40 bg-blue-600/20 text-blue-300' },
];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const t = getT(l);

  const featured = PROJECTS.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="relative min-h-screen bg-[#0B0D13] text-[#F3F4F6] selection:bg-indigo-500/30 selection:text-white">
      
      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-radial-glow pointer-events-none z-0" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-96 left-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* HERO SECTION */}
      <section className="relative z-10 px-4 sm:px-6 pt-24 pb-20 md:pt-32 md:pb-28 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: TEXT CONTENT */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* LIVE BADGE */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-indigo-500/30 backdrop-blur-md text-indigo-300 text-xs sm:text-sm font-mono shadow-inner shadow-indigo-500/20">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span>Building in Public — Autonomous AI Product Lab</span>
            </div>

            {/* TITLE */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              {l === 'id' ? (
                <>
                  Membangun Sistem <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">AI Otonom</span> & Produk Masa Depan
                </>
              ) : (
                <>
                  Engineering <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">Autonomous AI</span> Systems Beyond Demos
                </>
              )}
            </h1>

            {/* SUBTITLE */}
            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-2xl font-normal">
              {t.hero.subtitle}
            </p>

            {/* CALL TO ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href={`/${l}/projects`}
                className="inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-semibold text-base shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 active:scale-95"
              >
                <span>{t.hero.cta_primary}</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>

              <Link
                href={`/${l}/contact`}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-indigo-500/40 text-gray-200 hover:text-white font-semibold text-base backdrop-blur-md transition-all duration-300 active:scale-95"
              >
                <span>{t.hero.cta_secondary}</span>
              </Link>
            </div>

            {/* KEY METRICS / TRUST TAGS */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-2xl font-bold text-white font-mono">4+</div>
                <div className="text-xs text-gray-400">{l === 'id' ? 'Produk Aktif' : 'Active Products'}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white font-mono">6</div>
                <div className="text-xs text-gray-400">{l === 'id' ? 'Agen Otonom' : 'Orchestrated Agents'}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white font-mono">100%</div>
                <div className="text-xs text-gray-400">{l === 'id' ? 'Transparan in Public' : 'Public Build Status'}</div>
              </div>
            </div>

          </div>

          {/* RIGHT: INTERACTIVE AI AGENT TERMINAL / PREVIEW WIDGET */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-indigo-500/30 via-cyan-500/20 to-transparent shadow-2xl shadow-indigo-950/50">
              <div className="bg-[#121520]/90 backdrop-blur-xl rounded-[15px] p-5 space-y-4 border border-white/10">
                
                {/* WINDOW HEADER */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-indigo-300 font-mono">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>birrulabs-orchestrator.v2</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                {/* LIVE SIMULATION LOG FEED */}
                <div className="space-y-3 font-mono text-xs text-gray-300 py-2">
                  <div className="flex items-start gap-2 text-indigo-400">
                    <span className="text-gray-600">[00:01]</span>
                    <span className="font-semibold">[CEO-Agent]</span>
                    <span className="text-gray-300">Initializing project execution tree for Affiloom AI...</span>
                  </div>

                  <div className="flex items-start gap-2 text-cyan-400">
                    <span className="text-gray-600">[00:02]</span>
                    <span className="font-semibold">[Research]</span>
                    <span className="text-gray-300">Retrieved 14 contextual patterns & market signals</span>
                  </div>

                  <div className="flex items-start gap-2 text-emerald-400">
                    <span className="text-gray-600">[00:04]</span>
                    <span className="font-semibold">[Engineer]</span>
                    <span className="text-gray-300">Compiled Next.js 15 App Router routes (0 errors)</span>
                  </div>

                  <div className="flex items-start gap-2 text-purple-400">
                    <span className="text-gray-600">[00:05]</span>
                    <span className="font-semibold">[QC-Agent]</span>
                    <span className="text-gray-300">Automated tests passed: 18/18 specs green</span>
                  </div>
                </div>

                {/* PREVIEW STATUS CARD */}
                <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-600/30 text-indigo-300">
                      <Cpu className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">Multi-Agent Workflow</div>
                      <div className="text-[11px] text-gray-400">Status: Autonomous Execution</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    ONLINE
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* WHAT WE BUILD / CORE PILLARS */}
      <section className="relative z-10 px-4 sm:px-6 py-20 border-t border-white/10 bg-[#0D0F17]/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              {t.home.what_we_build_title}
            </h2>
            <p className="text-gray-400 text-base sm:text-lg">
              {t.home.what_we_build_subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Bot,
                title: t.home.ai_agents_title,
                desc: t.home.ai_agents_desc,
                color: 'text-indigo-400',
                bg: 'bg-indigo-500/10 border-indigo-500/20',
                glow: 'group-hover:border-indigo-500/50',
              },
              {
                icon: Zap,
                title: t.home.automation_title,
                desc: t.home.automation_desc,
                color: 'text-cyan-400',
                bg: 'bg-cyan-500/10 border-cyan-500/20',
                glow: 'group-hover:border-cyan-500/50',
              },
              {
                icon: Sparkles,
                title: t.home.creative_title,
                desc: t.home.creative_desc,
                color: 'text-purple-400',
                bg: 'bg-purple-500/10 border-purple-500/20',
                glow: 'group-hover:border-purple-500/50',
              },
            ].map(({ icon: Icon, title, desc, color, bg, glow }) => (
              <div
                key={title}
                className={`group p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-all duration-300 ${glow} hover:-translate-y-1.5 shadow-xl`}
              >
                <div className={`inline-flex p-4 rounded-xl border ${bg} mb-6 shadow-inner`}>
                  <Icon className={`w-7 h-7 ${color}`} aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                  {title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS SHOWCASE */}
      <section className="relative z-10 px-4 sm:px-6 py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-indigo-400 mb-2">
                <Layers className="w-4 h-4" />
                <span>Selected Portfolio</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {t.projects.title}
              </h2>
              <p className="text-gray-400 mt-2 text-base max-w-xl">
                {t.projects.subtitle}
              </p>
            </div>
            
            <Link
              href={`/${l}/projects`}
              className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold text-sm group"
            >
              <span>{t.projects.view_all}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((p) => (
              <Link
                key={p.id}
                href={`/${l}/projects/${p.slug}`}
                className="group relative rounded-2xl p-[1px] bg-white/10 hover:bg-gradient-to-b hover:from-indigo-500/40 hover:to-cyan-500/20 transition-all duration-300 hover:-translate-y-1.5 shadow-xl"
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

                    <h3 className="font-bold text-xl text-white group-hover:text-indigo-300 transition-colors flex items-center justify-between">
                      <span>{p.title[l]}</span>
                      <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                      {p.summary[l]}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2">
                    {p.techStack.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] text-gray-300 font-mono border border-white/[0.05]">
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* HOW WE WORK / STEP PIPELINE */}
      <section className="relative z-10 px-4 sm:px-6 py-20 border-t border-white/10 bg-[#0D0F17]/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {t.home.how_we_work_title}
            </h2>
            <p className="text-gray-400 text-base sm:text-lg">
              {t.home.how_we_work_subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((key, i) => (
              <div key={key} className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600/30 to-cyan-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 font-bold font-mono text-lg shadow-inner">
                  0{i + 1}
                </div>
                <h3 className="font-bold text-white text-lg">{t.home[key]}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{STEP_DESCS[l][i]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AGENT ORCHESTRATION PIPELINE */}
      <section className="relative z-10 px-4 sm:px-6 py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400">
              <Cpu className="w-4 h-4" />
              <span>Multi-Agent Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {t.home.agent_orchestration_title}
            </h2>
            <p className="text-gray-400 text-base sm:text-lg">
              {t.home.agent_orchestration_subtitle}
            </p>
          </div>

          {/* AGENTS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {AGENTS.map((agent, i) => (
              <div
                key={agent.name}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 hover:border-indigo-500/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-gray-500">AGENT #{i + 1}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${agent.color}`}>
                    Active
                  </span>
                </div>
                <h3 className="font-bold text-white text-lg">{agent.name}</h3>
                <p className="text-xs text-gray-400 font-mono">{agent.role}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ARTICLES / RESEARCH PREVIEW */}
      <section className="relative z-10 px-4 sm:px-6 py-20 border-t border-white/10 bg-[#0D0F17]/60">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {t.articles.title}
              </h2>
              <p className="text-gray-400 mt-2 text-base">
                {t.articles.subtitle}
              </p>
            </div>
            <Link href={`/${l}/articles`} className="text-indigo-400 hover:text-indigo-300 font-semibold text-sm flex items-center gap-1">
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              l === 'id' ? 'Mengapa AI Agents Butuh Orchestration, Bukan Hanya Prompts' : 'Why AI Agents Need Orchestration, Not Just Prompts',
              l === 'id' ? 'Membangun Human-in-the-Loop Content Automation' : 'Building a Human-in-the-Loop Content Automation System',
              l === 'id' ? 'Pelajaran dari Membangun Multi-Agent Workflows' : 'Lessons From Building Multi-Agent Workflows',
            ].map((title) => (
              <div key={title} className="p-7 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4 hover:border-indigo-500/30 transition-colors">
                <span className="inline-block text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono">
                  {t.articles.coming_soon}
                </span>
                <h3 className="font-bold text-lg text-gray-200 leading-snug">{title}</h3>
                <p className="text-xs text-gray-500 font-mono">BirruLabs AI Engineering Insights</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* STARTUP CTA SECTION */}
      <section className="relative z-10 px-4 sm:px-6 py-24 border-t border-white/10">
        <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden p-10 sm:p-16 text-center border border-indigo-500/30 bg-gradient-to-b from-indigo-950/50 via-[#121520] to-[#0B0D13] shadow-2xl shadow-indigo-950/60">
          
          <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {t.home.startup_cta_title}
            </h2>
            <p className="text-gray-300 text-lg sm:text-xl leading-relaxed">
              {t.home.startup_cta_subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href={`/${l}/contact`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-base shadow-lg shadow-indigo-500/30 transition-all duration-300 active:scale-95"
              >
                <span>{t.home.startup_cta_primary}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href={`/${l}/contact`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-white font-bold text-base transition-all duration-300 active:scale-95"
              >
                <span>{t.home.startup_cta_secondary}</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

