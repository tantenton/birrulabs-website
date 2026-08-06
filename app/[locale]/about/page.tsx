import type { Metadata } from 'next';
import { getT } from '@/lib/translations';
import type { Locale } from '@/lib/translations';
import { Target, Wrench, GitBranch, Bot, Shield } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = getT(locale as Locale);
  return {
    title: `${t.about.title} | BirruLabs`,
    description: t.about.subtitle,
  };
}

const PRINCIPLES: Record<Locale, string[]> = {
  id: [
    'Local-first: sistem yang berjalan offline, sync ketika koneksi tersedia',
    'Human-in-the-loop: AI membantu, manusia memutuskan',
    'Minimal dependency: audit semua package, jangan tambah yang tidak perlu',
    'Security by default: enkripsi, validasi input, secure headers',
    'Build in public: dokumentasikan proses, bukan hanya hasil',
    'No fake metrics: hanya tampilkan data yang nyata',
  ],
  en: [
    'Local-first: systems that run offline, sync when connectivity is available',
    'Human-in-the-loop: AI assists, humans decide',
    'Minimal dependency: audit all packages, add only what is needed',
    'Security by default: encryption, input validation, secure headers',
    'Build in public: document the process, not just the outcome',
    'No fake metrics: only display real, verifiable data',
  ],
};

const WORKFLOW_STEPS: Record<Locale, { step: string; title: string; desc: string }[]> = {
  id: [
    { step: '01', title: 'Research & Audit', desc: 'Audit repo, baca docs, pahami konteks sebelum menulis satu baris kode.' },
    { step: '02', title: 'Design & Plan', desc: 'Rancang arsitektur, buat ADR, definisikan interface sebelum implementasi.' },
    { step: '03', title: 'Build & Test', desc: 'TDD, atomic commits, CI di setiap push. Tidak ada "it works on my machine".' },
    { step: '04', title: 'Ship & Monitor', desc: 'Deploy ke preview, QA human approval, merge ke production, pantau metrik.' },
  ],
  en: [
    { step: '01', title: 'Research & Audit', desc: 'Audit repo, read docs, understand context before writing a single line of code.' },
    { step: '02', title: 'Design & Plan', desc: 'Design architecture, write ADRs, define interfaces before implementation.' },
    { step: '03', title: 'Build & Test', desc: 'TDD, atomic commits, CI on every push. No "it works on my machine".' },
    { step: '04', title: 'Ship & Monitor', desc: 'Deploy to preview, human QA approval, merge to production, monitor metrics.' },
  ],
};

const BUILDING: Record<Locale, { title: string; desc: string }[]> = {
  id: [
    { title: 'Autonomous AI Agents', desc: 'CEO orchestrator yang mengelola specialized worker agents untuk complex multi-step tasks.' },
    { title: 'Social Media Automation', desc: 'Pipeline riset, penulisan, approval human-in-the-loop, dan publishing otomatis.' },
    { title: 'Affiliate Automation', desc: 'Affiloom untuk workflow affiliate end-to-end dari discovery hingga publishing.' },
    { title: 'Creative Pipelines', desc: 'Generasi gambar, video, voice-over dengan QC pipeline dan human approval.' },
    { title: 'Local-First ERP', desc: 'BirruHealthOS: sistem bisnis yang berjalan penuh offline, sync ketika online.' },
  ],
  en: [
    { title: 'Autonomous AI Agents', desc: 'CEO orchestrator managing specialized worker agents for complex multi-step tasks.' },
    { title: 'Social Media Automation', desc: 'Automated research, writing, human-in-the-loop approval, and publishing pipeline.' },
    { title: 'Affiliate Automation', desc: 'Affiloom for end-to-end affiliate workflows from discovery to publishing.' },
    { title: 'Creative Pipelines', desc: 'Image, video, voice-over generation with QC pipeline and human approval.' },
    { title: 'Local-First ERP', desc: 'BirruHealthOS: business system that runs fully offline, syncs when online.' },
  ],
};

const AGENT_ROLES: Record<Locale, { role: string; desc: string }[]> = {
  id: [
    { role: 'CEO Orchestrator', desc: 'Koordinasi seluruh agent, buat keputusan strategis, handle exception.' },
    { role: 'Research Agent', desc: 'Traversal data, parsing dokumentasi, verifikasi fakta.' },
    { role: 'Engineering Agent', desc: 'Menulis kode, membuat struktur, implementasi fitur.' },
    { role: 'QC Agent', desc: 'Review output, validasi terhadap kriteria, reject jika tidak memenuhi standar.' },
    { role: 'Publishing Agent', desc: 'Format dan distribute output ke target platform.' },
  ],
  en: [
    { role: 'CEO Orchestrator', desc: 'Coordinates all agents, makes strategic decisions, handles exceptions.' },
    { role: 'Research Agent', desc: 'Data traversal, documentation parsing, fact verification.' },
    { role: 'Engineering Agent', desc: 'Writes code, creates structures, implements features.' },
    { role: 'QC Agent', desc: 'Reviews output, validates against criteria, rejects if standards not met.' },
    { role: 'Publishing Agent', desc: 'Formats and distributes output to target platforms.' },
  ],
};

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const t = getT(l);

  return (
    <div className="min-h-screen bg-[#0A0C10] text-[#e2e2e8]">

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-25" aria-hidden="true" />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(99,102,241,0.1), transparent)' }}
          aria-hidden="true"
        />
        <div className="relative section-container py-20 md:py-28">
          <p className="label-mono mb-4">Engineering Studio</p>
          <h1 className="text-[40px] md:text-[56px] leading-[1.05] tracking-[-0.02em]
                         font-bold text-[#e2e2e8] mb-6 max-w-2xl">
            {t.about.title}
          </h1>
          <p className="text-[20px] leading-[1.65] text-[#c7c4d7] max-w-xl">
            {t.about.subtitle}
          </p>
        </div>
      </section>

      {/* MISSION + VALUES */}
      <section className="section-divider">
        <div className="section-container py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-xl bg-[#161920] border border-[rgba(255,255,255,0.07)]">
              <div className="inline-flex p-3 rounded-xl bg-[rgba(99,102,241,0.1)] mb-6">
                <Target className="w-6 h-6 text-[#6366F1]" aria-hidden="true" />
              </div>
              <h2 className="text-[20px] font-semibold text-[#e2e2e8] mb-4">{t.about.mission_title}</h2>
              <p className="text-[15px] leading-[1.75] text-[#c7c4d7]">{t.about.mission_text}</p>
            </div>
            <div className="p-8 rounded-xl bg-[#161920] border border-[rgba(255,255,255,0.07)]">
              <div className="inline-flex p-3 rounded-xl bg-[rgba(16,185,129,0.1)] mb-6">
                <Shield className="w-6 h-6 text-[#10B981]" aria-hidden="true" />
              </div>
              <h2 className="text-[20px] font-semibold text-[#e2e2e8] mb-4">{t.about.values_title}</h2>
              <ul className="space-y-2.5">
                {t.about.values.map((v) => (
                  <li key={v} className="flex items-start gap-3 text-[15px] text-[#c7c4d7]">
                    <span className="text-[#10B981] mt-0.5 flex-shrink-0" aria-hidden="true">✓</span>
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="section-divider">
        <div className="section-container py-16 md:py-20">
          <div className="max-w-2xl">
            <p className="label-mono mb-4">Origin</p>
            <h2 className="text-[32px] md:text-[40px] leading-[1.15] tracking-[-0.015em]
                           font-semibold text-[#e2e2e8] mb-6">
              {t.about.story_title}
            </h2>
            <p className="text-[17px] leading-[1.8] text-[#c7c4d7]">{t.about.story_text}</p>
          </div>
        </div>
      </section>

      {/* METHODOLOGY */}
      <section className="section-divider">
        <div className="section-container py-16 md:py-20">
          <p className="label-mono mb-4">Methodology</p>
          <h2 className="text-[32px] md:text-[40px] leading-[1.15] tracking-[-0.015em]
                         font-semibold text-[#e2e2e8] mb-12 max-w-xl">
            {l === 'id' ? 'Cara Kami Bekerja' : 'How We Work'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORKFLOW_STEPS[l].map(({ step, title, desc }) => (
              <div key={step} className="relative p-6 rounded-xl
                                         bg-[#161920] border border-[rgba(255,255,255,0.07)]">
                <span className="font-mono text-[36px] font-bold text-[rgba(99,102,241,0.15)]
                                 leading-none block mb-4">
                  {step}
                </span>
                <h3 className="text-[16px] font-semibold text-[#e2e2e8] mb-2">{title}</h3>
                <p className="text-[13px] leading-[1.65] text-[#908fa0]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI ORCHESTRATION */}
      <section className="section-divider">
        <div className="section-container py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="label-mono mb-4">Agentic Systems</p>
              <h2 className="text-[32px] md:text-[40px] leading-[1.15] tracking-[-0.015em]
                             font-semibold text-[#e2e2e8] mb-6">
                {l === 'id' ? 'AI Orchestration' : 'AI Orchestration'}
              </h2>
              <p className="text-[17px] leading-[1.8] text-[#c7c4d7] mb-8">
                {l === 'id'
                  ? 'Kami tidak hanya menggunakan AI tools — kami membangun sistem multi-agent yang digunakan untuk mengoperasikan BirruLabs sendiri. Setiap workflow dijalankan oleh agen yang terspesialisasi dengan role yang jelas.'
                  : 'We do not just use AI tools — we build multi-agent systems that we use to operate BirruLabs itself. Every workflow is run by specialized agents with clearly defined roles.'}
              </p>
              <div className="flex items-center gap-3 p-4 rounded-lg
                              border border-[rgba(99,102,241,0.2)] bg-[rgba(99,102,241,0.05)]">
                <Bot className="w-5 h-5 text-[#6366F1] flex-shrink-0" aria-hidden="true" />
                <span className="font-mono text-[13px] text-[#c7c4d7]">
                  {l === 'id' ? 'Hermes Agent menjalankan workflow ini' : 'Hermes Agent runs this workflow'}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              {AGENT_ROLES[l].map(({ role, desc }, i) => (
                <div
                  key={role}
                  className="flex gap-4 p-5 rounded-xl
                             bg-[#161920] border border-[rgba(255,255,255,0.07)]
                             hover:border-[rgba(99,102,241,0.2)]
                             transition-colors duration-200"
                >
                  <span className="font-mono text-[11px] text-[#6366F1] mt-1 flex-shrink-0 w-4">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h4 className="text-[14px] font-semibold text-[#e2e2e8] mb-1">{role}</h4>
                    <p className="text-[13px] leading-[1.55] text-[#908fa0]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section className="section-divider">
        <div className="section-container py-16 md:py-20">
          <p className="label-mono mb-4">Products</p>
          <h2 className="text-[32px] md:text-[40px] leading-[1.15] tracking-[-0.015em]
                         font-semibold text-[#e2e2e8] mb-12">
            {l === 'id' ? 'Yang Sedang Kami Bangun' : 'What We Are Building'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BUILDING[l].map(({ title, desc }) => (
              <div key={title}
                   className="p-6 rounded-xl bg-[#161920] border border-[rgba(255,255,255,0.07)]
                              hover:border-[rgba(99,102,241,0.2)] transition-colors duration-200">
                <h3 className="text-[15px] font-semibold text-[#6366F1] mb-2">{title}</h3>
                <p className="text-[13px] leading-[1.65] text-[#908fa0]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH PRINCIPLES */}
      <section className="section-divider">
        <div className="section-container py-16 md:py-20">
          <p className="label-mono mb-4">Philosophy</p>
          <h2 className="text-[32px] md:text-[40px] leading-[1.15] tracking-[-0.015em]
                         font-semibold text-[#e2e2e8] mb-12 max-w-xl">
            {l === 'id' ? 'Prinsip Teknologi' : 'Technology Principles'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
            {PRINCIPLES[l].map((p, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 rounded-xl
                           bg-[#161920] border border-[rgba(255,255,255,0.07)]"
              >
                <span className="font-mono text-[13px] font-bold text-[rgba(99,102,241,0.5)] mt-0.5 flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[14px] leading-[1.65] text-[#c7c4d7]">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
