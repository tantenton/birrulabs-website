import type { Metadata } from 'next';
import { getT } from '@/lib/translations';
import type { Locale } from '@/lib/translations';
import { Target, Wrench, Sparkles, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = getT(locale as Locale);
  return {
    title: `${t.about.title} | BirruLabs AI Product Lab`,
    description: t.about.subtitle,
  };
}

const PRINCIPLES: Record<Locale, string[]> = {
  id: [
    'Local-first: Sistem yang berjalan offline dan otomatis sinkronisasi saat terhubung internet.',
    'Human-in-the-loop: AI bertindak sebagai akselerator, eksekusi final tetap pada kontrol manusia.',
    'Minimal dependency: Audit ketat dependency package, hindari bloatware dan library tak terpakai.',
    'Security by default: Enkripsi data end-to-end, validasi input presisi, dan secure header HTTP.',
    'Build in public: Transparansi penuh dalam proses riset, arsitektur, dan iterasi produk.',
    'No fake metrics: Hanya menampilkan data empiris yang terverifikasi tanpa rekayasa.',
  ],
  en: [
    'Local-first: Systems designed to operate offline and sync seamlessly upon connection.',
    'Human-in-the-loop: AI drives speed, humans retain ultimate intent and sign-off authority.',
    'Minimal dependency: Rigorous package auditing to preserve high efficiency and security.',
    'Security by default: End-to-end encryption, input validation, and secure headers by default.',
    'Build in public: Documenting real progress, architecture, and failures openly.',
    'No fake metrics: Reporting zero exaggerated data—only verified operational metrics.',
  ],
};

const BUILDING: Record<Locale, { title: string; desc: string }[]> = {
  id: [
    { title: 'Autonomous AI Agents', desc: 'CEO orchestrator yang mengelola specialized worker agents otonom.' },
    { title: 'Social Media Automation', desc: 'Pipeline riset, penulisan, approval, dan publishing multi-platform.' },
    { title: 'Affiliate Automation', desc: 'Affiloom & BirruAffHub untuk workflow affiliate end-to-end.' },
    { title: 'Creative Pipelines', desc: 'Generasi gambar, video, dan voice-over dengan sistem evaluasi QC.' },
    { title: 'Local-First Business Software', desc: 'BirruHealthOS: Platform ERP modern yang berjalan offline.' },
  ],
  en: [
    { title: 'Autonomous AI Agents', desc: 'CEO orchestrator managing specialized worker agents autonomously.' },
    { title: 'Social Media Automation', desc: 'Automated research, copy synthesis, approval, and publishing pipeline.' },
    { title: 'Affiliate Automation', desc: 'Affiloom and BirruAffHub for end-to-end affiliate performance.' },
    { title: 'Creative Pipelines', desc: 'Multimodal asset generation with automated QC verification.' },
    { title: 'Local-First Business Software', desc: 'BirruHealthOS: High-reliability ERP operating offline.' },
  ],
};

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const t = getT(l);

  return (
    <div className="relative min-h-screen bg-[#0B0D13] text-[#F3F4F6] selection:bg-indigo-500/30 selection:text-white">

      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-radial-glow pointer-events-none z-0" />

      {/* HERO SECTION */}
      <section className="relative z-10 px-4 sm:px-6 pt-24 pb-16 md:pt-32 md:pb-20 border-b border-white/10 max-w-7xl mx-auto">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5" />
            <span>{l === 'id' ? 'Filosofi & Identitas Labs' : 'Lab Identity & Philosophy'}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">{t.about.title}</h1>
          <p className="text-gray-400 text-lg sm:text-xl leading-relaxed">{t.about.subtitle}</p>
        </div>
      </section>

      {/* MISSION + VALUES */}
      <section className="relative z-10 px-4 sm:px-6 py-16 border-b border-white/10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4 hover:border-indigo-500/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">{t.about.mission_title}</h2>
            <p className="text-gray-400 text-sm leading-relaxed">{t.about.mission_text}</p>
          </div>

          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4 hover:border-cyan-500/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Wrench className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">{t.about.values_title}</h2>
            <ul className="space-y-3">
              {t.about.values.map((v) => (
                <li key={v} className="flex items-start gap-3 text-gray-300 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* STORY SECTION */}
      <section className="relative z-10 px-4 sm:px-6 py-20 border-b border-white/10 max-w-7xl mx-auto">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-indigo-400">
            <Sparkles className="w-4 h-4" />
            <span>Origin Story</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{t.about.story_title}</h2>
          <p className="text-gray-300 text-lg leading-relaxed">{t.about.story_text}</p>
        </div>
      </section>

      {/* WHAT WE ARE BUILDING */}
      <section className="relative z-10 px-4 sm:px-6 py-20 border-b border-white/10 max-w-7xl mx-auto">
        <div className="space-y-12">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {l === 'id' ? 'Yang Sedang Kami Bangun' : 'What We Are Building'}
            </h2>
            <p className="text-gray-400 text-base">
              {l === 'id' ? 'Fokus riset dan aplikasi praktis yang kami jalankan saat ini.' : 'Current research focus and active production applications.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BUILDING[l].map(({ title, desc }) => (
              <div key={title} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 hover:border-indigo-500/30 transition-colors">
                <h3 className="font-bold text-lg text-indigo-300">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY PRINCIPLES */}
      <section className="relative z-10 px-4 sm:px-6 py-20 max-w-7xl mx-auto">
        <div className="max-w-3xl space-y-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
              {l === 'id' ? 'Prinsip Arsitektur Teknologi' : 'Engineering & Architectural Principles'}
            </h2>
            <p className="text-gray-400 text-base">
              {l === 'id' ? 'Standar mutu yang tidak bisa dikompromikan dalam setiap lini kode.' : 'Non-negotiable quality standards embedded across every repository.'}
            </p>
          </div>

          <div className="space-y-4">
            {PRINCIPLES[l].map((p, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-indigo-500/30 transition-colors">
                <span className="text-indigo-400 font-mono font-bold text-sm mt-0.5 w-6 flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-gray-300 text-sm leading-relaxed">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

