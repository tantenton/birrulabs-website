import type { Metadata } from 'next';
import { getT } from '@/lib/translations';
import type { Locale } from '@/lib/translations';

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

const BUILDING: Record<Locale, { title: string; desc: string }[]> = {
  id: [
    { title: 'Autonomous AI Agents', desc: 'CEO orchestrator yang mengelola specialized worker agents.' },
    { title: 'Social Media Automation', desc: 'Pipeline riset, penulisan, approval, dan publishing otomatis.' },
    { title: 'Affiliate Automation', desc: 'Affiloom dan BirruAffHub untuk workflow affiliate end-to-end.' },
    { title: 'Creative Pipelines', desc: 'Generasi gambar, video, voice-over dengan QC pipeline.' },
    { title: 'Local-First Business Software', desc: 'BirruHealthOS: ERP yang berjalan offline.' },
  ],
  en: [
    { title: 'Autonomous AI Agents', desc: 'CEO orchestrator managing specialized worker agents.' },
    { title: 'Social Media Automation', desc: 'Automated research, writing, approval, and publishing pipeline.' },
    { title: 'Affiliate Automation', desc: 'Affiloom and BirruAffHub for end-to-end affiliate workflows.' },
    { title: 'Creative Pipelines', desc: 'Image, video, voice-over generation with QC pipeline.' },
    { title: 'Local-First Business Software', desc: 'BirruHealthOS: ERP that runs offline.' },
  ],
};

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const t = getT(l);

  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F0F2F5]">

      {/* HERO */}
      <section className="px-4 py-20 md:py-28 border-b border-[#2D3036]">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">{t.about.title}</h1>
          <p className="text-xl text-[#A3A6AC] leading-relaxed">{t.about.subtitle}</p>
        </div>
      </section>

      {/* MISSION + VALUES */}
      <section className="px-4 py-16 border-b border-[#2D3036]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-[#16191F] border border-[#2D3036]">
            <div className="text-2xl mb-4">🎯</div>
            <h2 className="text-xl font-semibold mb-3">{t.about.mission_title}</h2>
            <p className="text-[#A3A6AC] leading-relaxed">{t.about.mission_text}</p>
          </div>
          <div className="p-6 rounded-xl bg-[#16191F] border border-[#2D3036]">
            <div className="text-2xl mb-4">🛠️</div>
            <h2 className="text-xl font-semibold mb-3">{t.about.values_title}</h2>
            <ul className="space-y-2">
              {t.about.values.map((v) => (
                <li key={v} className="flex items-start gap-2 text-[#A3A6AC]">
                  <span className="text-emerald-400 mt-0.5">✓</span>
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="px-4 py-16 border-b border-[#2D3036]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">{t.about.story_title}</h2>
          <p className="text-[#A3A6AC] text-lg leading-relaxed">{t.about.story_text}</p>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section className="px-4 py-16 border-b border-[#2D3036]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-10">
            {l === 'id' ? 'Yang Sedang Kami Bangun' : 'What We Are Building'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BUILDING[l].map(({ title, desc }) => (
              <div key={title} className="p-5 rounded-lg bg-[#16191F] border border-[#2D3036]">
                <h3 className="font-semibold mb-2 text-indigo-300">{title}</h3>
                <p className="text-[#A3A6AC] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY PRINCIPLES */}
      <section className="px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-10">
            {l === 'id' ? 'Prinsip Teknologi' : 'Technology Principles'}
          </h2>
          <ul className="space-y-4">
            {PRINCIPLES[l].map((p, i) => (
              <li key={i} className="flex items-start gap-4 p-4 rounded-lg bg-[#16191F] border border-[#2D3036]">
                <span className="text-indigo-400 font-mono font-bold text-sm mt-0.5 w-6 flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[#A3A6AC] leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

    </div>
  );
}
