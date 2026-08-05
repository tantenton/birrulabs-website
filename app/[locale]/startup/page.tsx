import type { Metadata } from 'next';
import Link from 'next/link';
import { Download, ExternalLink } from 'lucide-react';
import type { Locale } from '@/lib/translations';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: `Startup Profile | BirruLabs`,
    description: locale === 'id'
      ? 'Profil lengkap BirruLabs untuk startup program, accelerator, dan partnership.'
      : 'Complete BirruLabs profile for startup programs, accelerators, and partnerships.',
  };
}

export default async function StartupProfilePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const isID = l === 'id';

  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F0F2F5]">

      {/* HEADER */}
      <section className="px-4 py-20 md:py-24 border-b border-[#2D3036]">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isID ? 'Profil Startup BirruLabs' : 'BirruLabs Startup Profile'}
          </h1>
          <p className="text-xl text-[#A3A6AC]">
            {isID
              ? 'Informasi lengkap untuk startup program, accelerator, AI credits, dan partnership.'
              : 'Complete information for startup programs, accelerators, AI credits, and partnerships.'}
          </p>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="px-4 py-12 border-b border-[#2D3036]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">{isID ? 'Ringkasan' : 'Overview'}</h2>
          <div className="space-y-4 text-[#A3A6AC] leading-relaxed">
            <p>
              <strong className="text-[#F0F2F5]">BirruLabs</strong> {isID ? 'adalah' : 'is a'} {isID ? 'studio teknologi founder-led yang membangun' : 'founder-led technology studio building'} autonomous AI agent systems, social media automation, affiliate automation, {isID ? 'dan' : 'and'} creative content pipelines.
            </p>
            <p>
              {isID
                ? 'Kami fokus membangun tools dan infrastruktur untuk multi-agent orchestration, human-in-the-loop workflows, dan local-first business software.'
                : 'We focus on building tools and infrastructure for multi-agent orchestration, human-in-the-loop workflows, and local-first business software.'}
            </p>
          </div>
        </div>
      </section>

      {/* PROBLEM & SOLUTION */}
      <section className="px-4 py-12 border-b border-[#2D3036]">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">{isID ? 'Masalah' : 'Problem'}</h3>
            <ul className="space-y-3 text-[#A3A6AC]">
              <li className="flex items-start gap-2">
                <span className="text-[#EF4444] mt-1">●</span>
                {isID
                  ? 'Single-agent AI tidak cukup untuk workflow kompleks'
                  : 'Single-agent AI is not enough for complex workflows'}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#EF4444] mt-1">●</span>
                {isID
                  ? 'Full automation tidak aman untuk customer-facing content'
                  : 'Full automation is not safe for customer-facing content'}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#EF4444] mt-1">●</span>
                {isID
                  ? 'Cloud-only software tidak cocok untuk area koneksi tidak stabil'
                  : 'Cloud-only software does not fit areas with unstable connectivity'}
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">{isID ? 'Solusi' : 'Solution'}</h3>
            <ul className="space-y-3 text-[#A3A6AC]">
              <li className="flex items-start gap-2">
                <span className="text-[#10B981] mt-1">✓</span>
                {isID
                  ? 'Multi-agent orchestration dengan CEO pattern'
                  : 'Multi-agent orchestration with CEO pattern'}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#10B981] mt-1">✓</span>
                {isID
                  ? 'Human-in-the-loop approval workflows'
                  : 'Human-in-the-loop approval workflows'}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#10B981] mt-1">✓</span>
                {isID
                  ? 'Local-first software dengan sync opsional'
                  : 'Local-first software with optional sync'}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CURRENT STAGE */}
      <section className="px-4 py-12 border-b border-[#2D3036]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">{isID ? 'Tahap Saat Ini' : 'Current Stage'}</h2>
          <div className="space-y-4 text-[#A3A6AC]">
            <p>
              <strong className="text-[#F0F2F5]">{isID ? 'Tahap:' : 'Stage:'}</strong> {isID ? 'Internal Alpha / Prototype' : 'Internal Alpha / Prototype'}
            </p>
            <p>
              <strong className="text-[#F0F2F5]">{isID ? 'Tim:' : 'Team:'}</strong> 1 {isID ? 'founder teknis (solo, building in public)' : 'technical founder (solo, building in public)'}
            </p>
            <p>
              <strong className="text-[#F0F2F5]">{isID ? 'Proyek Aktif:' : 'Active Projects:'}</strong> 6 {isID ? '(Affiloom, BirruHealthOS, Social Media AI Manager, Creative Factory, BirruAffHub, AI Agent Orchestration)' : '(Affiloom, BirruHealthOS, Social Media AI Manager, Creative Factory, BirruAffHub, AI Agent Orchestration)'}
            </p>
          </div>
        </div>
      </section>

      {/* WHY NOW */}
      <section className="px-4 py-12 border-b border-[#2D3036]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">{isID ? 'Mengapa Sekarang?' : 'Why Now?'}</h2>
          <ul className="space-y-3 text-[#A3A6AC]">
            <li className="flex items-start gap-3">
              <span className="text-indigo-400 mt-1 font-bold">1.</span>
              {isID
                ? 'LLM capabilities telah cukup mature untuk production multi-agent systems'
                : 'LLM capabilities are mature enough for production multi-agent systems'}
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-400 mt-1 font-bold">2.</span>
              {isID
                ? 'Permintaan tinggi untuk human-in-the-loop automation (bukan full-auto)'
                : 'High demand for human-in-the-loop automation (not full-auto)'}
            </li>
            <li className="flex items-start gap-3">
              <span className="text-indigo-400 mt-1 font-bold">3.</span>
              {isID
                ? 'Local-first architecture relevan untuk emerging markets dengan koneksi tidak stabil'
                : 'Local-first architecture is relevant for emerging markets with unstable connectivity'}
            </li>
          </ul>
        </div>
      </section>

      {/* TECHNOLOGY DIFFERENTIATION */}
      <section className="px-4 py-12 border-b border-[#2D3036]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">{isID ? 'Diferensiasi Teknologi' : 'Technology Differentiation'}</h2>
          <ul className="space-y-4">
            {[
              isID ? 'CEO orchestrator pattern untuk agent coordination' : 'CEO orchestrator pattern for agent coordination',
              isID ? 'Human-in-the-loop approval dengan priority scoring' : 'Human-in-the-loop approval with priority scoring',
              isID ? 'Local-first architecture (SQLite → PostgreSQL sync)' : 'Local-first architecture (SQLite → PostgreSQL sync)',
              isID ? 'Security-first design: CSP, rate limiting, input validation' : 'Security-first design: CSP, rate limiting, input validation',
              isID ? 'Build in public: dokumentasi proses, bukan hanya hasil' : 'Build in public: document process, not just outcomes',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 p-4 rounded-lg bg-[#16191F] border border-[#2D3036]">
                <span className="text-indigo-400 mt-0.5">✓</span>
                <span className="text-[#A3A6AC]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PARTNERSHIP NEEDS */}
      <section className="px-4 py-12 border-b border-[#2D3036]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">{isID ? 'Kebutuhan Partnership' : 'Partnership Needs'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: isID ? 'AI Credits' : 'AI Credits', desc: isID ? 'OpenAI, Anthropic, xAI, Replicate' : 'OpenAI, Anthropic, xAI, Replicate' },
              { title: isID ? 'Accelerator' : 'Accelerator', desc: isID ? 'YC, Antler, Iterative, 500 Global' : 'YC, Antler, Iterative, 500 Global' },
              { title: isID ? 'Infrastructure' : 'Infrastructure', desc: isID ? 'Vercel, Supabase, Modal, Fly.io' : 'Vercel, Supabase, Modal, Fly.io' },
              { title: isID ? 'Strategic' : 'Strategic', desc: isID ? 'Co-development, pilot projects' : 'Co-development, pilot projects' },
            ].map(({ title, desc }) => (
              <div key={title} className="p-5 rounded-lg bg-[#16191F] border border-[#2D3036]">
                <h3 className="font-semibold mb-2 text-indigo-300">{title}</h3>
                <p className="text-sm text-[#A3A6AC]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">
            {isID ? 'Tertarik Berkolaborasi?' : 'Interested in Collaboration?'}
          </h2>
          <p className="text-[#A3A6AC] mb-8">
            {isID
              ? 'Hubungi kami untuk diskusi startup program, partnership, atau pilot project.'
              : 'Contact us to discuss startup programs, partnerships, or pilot projects.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${l}/contact`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors min-h-[48px]"
            >
              {isID ? 'Hubungi Kami' : 'Contact Us'}
            </Link>
            <a
              href="https://github.com/tantenton/birrulabs-website"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-[#2D3036] hover:bg-[#16191F] font-semibold transition-colors min-h-[48px]"
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              GitHub
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
