import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ShieldCheck, Cpu, Terminal, CheckCircle2, UserCheck, Layers, GitBranch } from 'lucide-react';
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

const STAGE_BADGES: Record<string, string> = {
  'Internal Alpha': 'bg-amber-500/10 text-amber-300 border border-amber-500/20',
  'Prototype': 'bg-blue-500/10 text-blue-300 border border-blue-500/20',
  'In Development': 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20',
  'Research Track': 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20',
};

const HOW_WE_BUILD_STEPS = [
  { step: '01', title: { id: 'Investigasi', en: 'Investigate' }, desc: { id: 'Identifikasi masalah operasional nyata dan batasan arsitektur.', en: 'Identify concrete operational friction and architectural constraints.' } },
  { step: '02', title: { id: 'Definisi Spesifikasi', en: 'Define' }, desc: { id: 'Formulasi kontrak data, alur agen, dan poin evaluasi manusia.', en: 'Formulate data contracts, agent roles, and human approval checkpoints.' } },
  { step: '03', title: { id: 'Desain Arsitektur', en: 'Design' }, desc: { id: 'Rancang graf aliran data, integrasi API, dan skema memori.', en: 'Map data flow graphs, API integrations, and shared memory schemas.' } },
  { step: '04', title: { id: 'Implementasi TDD', en: 'Implement' }, desc: { id: 'Pengembangan berbasis pengujian otomatis dan komponen modular.', en: 'Build with test-driven development and strict component modularity.' } },
  { step: '05', title: { id: 'Validasi & Audit', en: 'Validate' }, desc: { id: 'Evaluasi akurasi, performa edge-case, dan keamanan sistem.', en: 'Audit system accuracy, edge-case behavior, and security boundaries.' } },
  { step: '06', title: { id: 'Operasi & Monitoring', en: 'Operate' }, desc: { id: 'Deploy ke lingkungan kerja dengan telemetri dan log audit.', en: 'Deploy to live environments with full telemetry and audit trails.' } },
];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const t = getT(l);

  const featured = PROJECTS.find((p) => p.slug === 'affiloom') || PROJECTS[0];
  const supporting = PROJECTS.filter((p) => p.id !== featured.id).slice(0, 3);

  return (
    <div className="relative min-h-screen bg-[#0C0E12] text-[#F3F4F6] selection:bg-indigo-500/20">

      {/* 1. MANIFESTO HERO */}
      <section className="px-4 sm:px-6 pt-20 pb-20 md:pt-28 md:pb-24 max-w-7xl mx-auto border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column (7 cols): Editorial Headline & Action */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/[0.04] border border-white/10 text-xs font-mono text-indigo-300">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              <span>AI Product Lab — Stage: Internal Alpha</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
              {l === 'id' 
                ? 'Membangun sistem AI yang benar-benar bekerja.' 
                : 'Engineering practical AI systems built for verification.'}
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-2xl font-normal">
              {l === 'id'
                ? 'BirruLabs adalah studio teknologi yang merancang autonomous agent systems, software business local-first, dan otomatisasi workflow teruji.'
                : 'BirruLabs is an AI product lab building autonomous agent systems, local-first business software, and verifiable content pipelines.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href={`/${l}/projects`}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors"
              >
                <span>{l === 'id' ? 'Jelajahi Proyek' : 'Explore Systems'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`/${l}/about`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-gray-300 hover:text-white font-semibold text-sm transition-colors"
              >
                <span>{l === 'id' ? 'Prinsip Arsitektur' : 'Design Bible & Principles'}</span>
              </Link>
            </div>
          </div>

          {/* Right Column (5 cols): System Stage Metadata Card */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-xl bg-[#13161F] border border-white/10 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-gray-400">System Blueprint</span>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  INTERNAL ALPHA
                </span>
              </div>

              <div className="space-y-4 text-xs font-mono text-gray-300">
                <div className="flex justify-between border-b border-white/[0.06] pb-2">
                  <span className="text-gray-500">Target Architecture</span>
                  <span className="text-white font-medium">Multi-Agent Orchestration</span>
                </div>
                <div className="flex justify-between border-b border-white/[0.06] pb-2">
                  <span className="text-gray-500">Execution Strategy</span>
                  <span className="text-white font-medium">Human-in-the-Loop Gate</span>
                </div>
                <div className="flex justify-between border-b border-white/[0.06] pb-2">
                  <span className="text-gray-500">Persistence Paradigm</span>
                  <span className="text-white font-medium">Local-First Sync</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Evaluation Metric</span>
                  <span className="text-white font-medium">Empirical Test Verification</span>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-gray-400 leading-relaxed border-t border-white/10">
                {l === 'id' 
                  ? 'Catatan: Sistem berada dalam tahap pengujian Internal Alpha. Semua metrik berdasarkan hasil pengujian lokal terverifikasi.' 
                  : 'Note: Systems are currently in Internal Alpha testing stage. All metrics reflect verified internal build benchmarks.'}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. PROOF OF THINKING (EDITORIAL MANIFESTO STATEMENT - NO CARDS) */}
      <section className="px-4 sm:px-6 py-20 border-b border-white/10 bg-[#0E1016]">
        <div className="max-w-[720px] mx-auto space-y-6">
          <div className="text-xs font-mono uppercase tracking-widest text-indigo-400">
            01 / Metodologi Produk
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
            {l === 'id' 
              ? 'Kami percaya bahwa kecerdasan buatan hanya berharga jika diintegrasikan dengan disiplin rekayasa sistem yang teruji.' 
              : 'AI capabilities are only as valuable as the software engineering discipline that governs them.'}
          </h2>
          <div className="space-y-4 text-gray-300 text-base leading-relaxed">
            <p>
              {l === 'id'
                ? 'Sebagian besar produk AI berorientasi pada demo singkat tanpa memperhatikan keandalan batas edge-case, validasi input, dan alur persetujuan manusia. BirruLabs dibangun dengan prinsip sebaliknya: mengutamakan transparansi tahap pengembangan, arsitektur local-first, dan pengawasan manusia pada setiap titik keputusan kritis.'
                : 'Many AI implementations focus on superficial demos while ignoring boundary validation, local persistence, and human sign-off gates. BirruLabs is built on the opposite premise: explicit stage transparency, local-first software reliability, and human supervision at every decision checkpoint.'}
            </p>
          </div>
        </div>
      </section>

      {/* 3. SELECTED SYSTEMS */}
      <section className="px-4 sm:px-6 py-24 border-b border-white/10 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-2">
              02 / Portfolio & Sistem Aktif
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              {l === 'id' ? 'Sistem Terpilih' : 'Selected Systems'}
            </h2>
          </div>
          <Link href={`/${l}/projects`} className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
            <span>{l === 'id' ? 'Lihat Semua Sistem' : 'View All Systems'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Asymmetrical Layout: 8 cols Featured + 4 cols Active List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Featured System (8 cols) */}
          <div className="lg:col-span-8 p-8 rounded-xl bg-[#13161F] border border-white/10 space-y-6">
            <div className="flex items-center justify-between gap-4">
              <span className={`text-xs font-mono px-3 py-1 rounded ${STAGE_BADGES[featured.status] || 'bg-gray-500/10 text-gray-400'}`}>
                {featured.status}
              </span>
              <span className="text-xs font-mono text-gray-400 uppercase">{featured.category}</span>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white flex items-center justify-between">
                <span>{featured.title[l]}</span>
                <Link href={`/${l}/projects/${featured.slug}`} aria-label={featured.title[l]}>
                  <ArrowUpRight className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                </Link>
              </h3>
              <p className="text-gray-300 text-base leading-relaxed">
                {featured.summary[l]}
              </p>
            </div>

            {/* System Problem & Approach Evidence */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-400">
              <div>
                <span className="font-mono text-gray-500 uppercase block mb-1">Masalah / Problem</span>
                <p className="text-gray-300 leading-relaxed">
                  {l === 'id' ? 'Alur kerja affiliate manual yang lambat dan rentan inkonsistensi data.' : 'Manual affiliate research workflows prone to data fragmentation.'}
                </p>
              </div>
              <div>
                <span className="font-mono text-gray-500 uppercase block mb-1">Pendekatan / Approach</span>
                <p className="text-gray-300 leading-relaxed">
                  {l === 'id' ? 'Otomatisasi multi-agen terintegrasi dengan persetujuan manusia pada setiap rilis.' : 'Multi-agent orchestration with mandatory human sign-off gates.'}
                </p>
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

          {/* Supporting Active Systems List (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">Sistem Aktif Lainnya</h3>
            {supporting.map((p) => (
              <Link
                key={p.id}
                href={`/${l}/projects/${p.slug}`}
                className="block p-5 rounded-xl bg-[#13161F] border border-white/10 hover:border-indigo-500/30 transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-amber-300">{p.status}</span>
                  <span className="text-[11px] font-mono text-gray-500">{p.category}</span>
                </div>
                <h4 className="font-bold text-white text-base group-hover:text-indigo-300 transition-colors flex items-center justify-between">
                  <span>{p.title[l]}</span>
                  <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-indigo-300" />
                </h4>
                <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
                  {p.summary[l]}
                </p>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* 4. HOW WE BUILD (VERTICAL PROCESS NARRATIVE SEQUENCE) */}
      <section className="px-4 sm:px-6 py-24 border-b border-white/10 bg-[#0E1016]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-indigo-400">
              03 / Proses Rekayasa
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              {t.home.how_we_work_title}
            </h2>
            <p className="text-gray-400 text-base">
              {t.home.how_we_work_subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOW_WE_BUILD_STEPS.map((item) => (
              <div key={item.step} className="p-6 rounded-xl bg-[#13161F] border border-white/10 space-y-3">
                <div className="text-xs font-mono text-indigo-400 font-bold">{item.step}</div>
                <h3 className="font-bold text-white text-lg">{item.title[l]}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc[l]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. AI ORCHESTRATION (SIGNATURE ARCHITECTURE MODEL) */}
      <section className="px-4 sm:px-6 py-24 border-b border-white/10 max-w-7xl mx-auto space-y-12">
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-indigo-400">
            04 / Model Arsitektur Otonom
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            {t.home.agent_orchestration_title}
          </h2>
          <p className="text-gray-400 text-base">
            {t.home.agent_orchestration_subtitle}
          </p>
        </div>

        {/* SYSTEM ARCHITECTURE FLOW DIAGRAM */}
        <div className="p-8 rounded-xl bg-[#13161F] border border-white/10 space-y-8">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono">
            <span className="text-gray-400 uppercase">Target Multi-Agent Architecture Topology</span>
            <span className="text-indigo-300">Hermes / Antigravity Pattern</span>
          </div>

          {/* DESKTOP TOPOLOGY FLOW */}
          <div className="hidden lg:grid grid-cols-5 gap-4 text-center items-center">
            
            {/* Step 1: Initiating Event */}
            <div className="p-4 rounded bg-white/[0.03] border border-white/10 space-y-2">
              <div className="text-[11px] font-mono text-gray-400 uppercase">01. Trigger</div>
              <div className="text-sm font-bold text-white">Task / User Request</div>
            </div>

            {/* Flow Arrow */}
            <div className="text-xs font-mono text-indigo-400 flex items-center justify-center gap-1">
              <span>→</span>
            </div>

            {/* Step 2: CEO Orchestrator */}
            <div className="p-4 rounded bg-indigo-600/20 border border-indigo-500/40 space-y-2">
              <div className="text-[11px] font-mono text-indigo-300 uppercase">02. Coordinator</div>
              <div className="text-sm font-bold text-white">CEO Orchestrator</div>
            </div>

            {/* Flow Arrow */}
            <div className="text-xs font-mono text-indigo-400 flex items-center justify-center gap-1">
              <span>→</span>
            </div>

            {/* Step 3: Specialist Workers */}
            <div className="p-4 rounded bg-white/[0.03] border border-white/10 space-y-2">
              <div className="text-[11px] font-mono text-gray-400 uppercase">03. Workers</div>
              <div className="text-sm font-bold text-white">Research & Code Agents</div>
            </div>

          </div>

          {/* CHECKPOINT GATE */}
          <div className="p-4 rounded bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-3 text-amber-300">
              <UserCheck className="w-5 h-5 flex-shrink-0" />
              <span>Human Approval Checkpoint Gate (Mandatory Verification before Commit / Deploy)</span>
            </div>
            <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              GATE ACTIVE
            </span>
          </div>

          {/* MOBILE TOPOLOGY (VERTICAL SEQUENCE) */}
          <div className="lg:hidden space-y-4 text-xs font-mono">
            <div className="p-4 rounded bg-white/[0.03] border border-white/10">
              <span className="text-gray-500 block mb-1">01. INITIATING TRIGGER</span>
              <span className="text-white font-bold">User Request / System Event</span>
            </div>
            <div className="p-4 rounded bg-indigo-600/20 border border-indigo-500/40">
              <span className="text-indigo-300 block mb-1">02. CEO COORDINATOR</span>
              <span className="text-white font-bold">Task Decomposition & Context Assignment</span>
            </div>
            <div className="p-4 rounded bg-white/[0.03] border border-white/10">
              <span className="text-gray-500 block mb-1">03. SPECIALIST EXECUTION</span>
              <span className="text-white font-bold">Research, Writing, Code Generation, QC Audit</span>
            </div>
          </div>

        </div>
      </section>

      {/* 6. RESEARCH AND EXPERIMENTS (LAB JOURNAL INDEX) */}
      <section className="px-4 sm:px-6 py-24 border-b border-white/10 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-2">
              05 / Catatan Riset & Lab Notes
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              {t.articles.title}
            </h2>
          </div>
          <Link href={`/${l}/articles`} className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
            <span>{l === 'id' ? 'Lihat Semua Catatan' : 'View All Research Notes'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-4">
          {[
            {
              date: '2026-08',
              title: l === 'id' ? 'Mengapa AI Agents Butuh Orchestration, Bukan Hanya Prompts' : 'Why AI Agents Need Orchestration, Not Just Prompts',
              category: 'Architecture',
              stage: 'Draft Preparation',
            },
            {
              date: '2026-07',
              title: l === 'id' ? 'Membangun Human-in-the-Loop Content Automation' : 'Building a Human-in-the-Loop Content Automation System',
              category: 'Automation',
              stage: 'Research Track',
            },
            {
              date: '2026-06',
              title: l === 'id' ? 'Pelajaran dari Membangun Multi-Agent Workflows' : 'Lessons From Building Multi-Agent Workflows',
              category: 'Case Study',
              stage: 'In Review',
            },
          ].map((item) => (
            <div key={item.title} className="p-5 rounded-xl bg-[#13161F] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3 text-xs font-mono text-gray-500">
                  <span>{item.date}</span>
                  <span>•</span>
                  <span className="text-indigo-400">{item.category}</span>
                </div>
                <h3 className="font-bold text-white text-base leading-snug">{item.title}</h3>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded bg-white/[0.04] text-gray-400 border border-white/10 self-start md:self-auto">
                {item.stage}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 7. INVITATION (QUIET COLLABORATION CTA) */}
      <section className="px-4 sm:px-6 py-24 max-w-5xl mx-auto text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          {l === 'id' ? 'Mulai Kolaborasi Teruji' : 'Start a Verifiable Project'}
        </h2>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {l === 'id'
            ? 'Diskusikan arsitektur agen, software local-first, atau kebutuhan otomatisasi bisnis Anda bersama BirruLabs.'
            : 'Discuss custom agent architectures, local-first business software, or verification requirements with BirruLabs.'}
        </p>
        <div className="pt-4">
          <Link
            href={`/${l}/contact`}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors"
          >
            <span>{l === 'id' ? 'Hubungi BirruLabs' : 'Contact BirruLabs'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}


