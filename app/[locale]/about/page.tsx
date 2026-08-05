import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/lib/translations';

export const metadata: Metadata = {
  title: 'Tentang BirruLabs — AI Product Lab',
  description: 'Filosofi, arsitektur, dan prinsip rekayasa di balik BirruLabs.',
};

const PRINCIPLES = [
  { num: '01', title: { id: 'Local-First Software', en: 'Local-First Software' }, desc: { id: 'Privasi data dan keandalan lokal diutamakan sebelum sinkronisasi cloud.', en: 'Data ownership and local reliability take precedence over cloud dependency.' } },
  { num: '02', title: { id: 'Human-in-the-Loop', en: 'Human-in-the-Loop Control' }, desc: { id: 'Setiap keputusan agen kritis memerlukan gerbang persetujuan manusia.', en: 'Critical agent actions require explicit human sign-off gates.' } },
  { num: '03', title: { id: 'Verifikabilitas Empiris', en: 'Empirical Verification' }, desc: { id: 'Bukti pengujian otomatis dan log audit lebih utama dibanding klaim pemasaran.', en: 'Automated test evidence and audit logs over marketing claims.' } },
  { num: '04', title: { id: 'Minimal Dependencies', en: 'Minimal Dependencies' }, desc: { id: 'Penggunaan pustaka seperlunya untuk menjaga kestabilan jangka panjang.', en: 'Restrained library usage to preserve long-term maintainability.' } },
  { num: '05', title: { id: 'Security by Default', en: 'Security by Default' }, desc: { id: 'Batas keamanan data dan isolasi memori diterapkan sejak desain awal.', en: 'Data security boundaries and memory isolation enforced by design.' } },
  { num: '06', title: { id: 'Transparansi Tahap', en: 'Explicit Stage Transparency' }, desc: { id: 'Status proyek (Internal Alpha, Prototype) ditampilkan secara jujur.', en: 'Project stages are communicated with complete honesty.' } },
];

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;

  return (
    <div className="min-h-screen bg-[#0C0E12] text-[#F3F4F6]">
      
      {/* MANIFESTO HERO */}
      <section className="px-4 sm:px-6 pt-20 pb-16 max-w-7xl mx-auto border-b border-white/10 space-y-6">
        <div className="text-xs font-mono uppercase tracking-widest text-indigo-400">
          Manifesto & Philosophy
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl">
          {l === 'id' ? 'BirruLabs bukan software house. Ini adalah AI Product Lab.' : 'BirruLabs is an AI Product Lab.'}
        </h1>
        <p className="text-gray-300 text-lg sm:text-xl max-w-3xl leading-relaxed">
          {l === 'id'
            ? 'Situs web ini adalah bukti bagaimana lab berpikir, memilih, membangun, menguji, dan mendokumentasikan sistem AI.'
            : 'This website is evidence of how the lab thinks, chooses, builds, tests, and documents software systems.'}
        </p>
      </section>

      {/* CORE PRINCIPLES */}
      <section className="px-4 sm:px-6 py-20 max-w-7xl mx-auto border-b border-white/10 space-y-12">
        <div className="max-w-2xl space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-indigo-400">Prinsip Rekayasa</div>
          <h2 className="text-3xl font-bold text-white tracking-tight">6 Prinsip Teknologi BirruLabs</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRINCIPLES.map((p) => (
            <div key={p.num} className="p-6 rounded-xl bg-[#13161F] border border-white/10 space-y-3">
              <span className="text-xs font-mono text-indigo-400 font-bold">{p.num}</span>
              <h3 className="font-bold text-white text-lg">{p.title[l]}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{p.desc[l]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INVITATION */}
      <section className="px-4 sm:px-6 py-20 max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-bold text-white">Mari Berdiskusi Arsitektur Sistem</h2>
        <p className="text-gray-400 text-base max-w-xl mx-auto leading-relaxed">
          Kami menyambut diskusi teknis mengenai arsitektur agen, otomatisasi workflow, dan integrasi software bisnis.
        </p>
        <Link
          href={`/${l}/contact`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors"
        >
          <span>Hubungi Labs</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

    </div>
  );
}
