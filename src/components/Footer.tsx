import Link from 'next/link';
import { Cpu, Activity } from 'lucide-react';

interface FooterProps {
  locale: 'id' | 'en';
}

const PRODUCTS = [
  { label: 'Affiloom', href: '/projects/affiloom' },
  { label: 'BirruHealthOS', href: '/projects/birruhealthos' },
  { label: 'Social Media AI Manager', href: '/projects/social-media-ai-manager' },
  { label: 'Creative Factory', href: '/projects/creative-factory' },
];

const COMPANY_ID = [
  { label: 'Tentang', href: '/about' },
  { label: 'Proyek', href: '/projects' },
  { label: 'Artikel', href: '/articles' },
  { label: 'Kontak', href: '/contact' },
];

const COMPANY_EN = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Articles', href: '/articles' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer({ locale }: FooterProps) {
  const company = locale === 'id' ? COMPANY_ID : COMPANY_EN;

  return (
    <footer className="bg-[#0B0D13] border-t border-white/10 text-gray-400 relative overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute bottom-0 right-1/4 w-96 h-48 bg-indigo-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* BRAND */}
          <div className="lg:col-span-2 space-y-4">
            <Link href={`/${locale}`} className="inline-flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Birru<span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">Labs</span>
              </span>
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              {locale === 'id'
                ? 'Membangun sistem AI praktis, agen otonom, dan otomatisasi tingkat lanjut yang teruji untuk dunia nyata.'
                : 'Building practical AI systems, autonomous agent workflows, and production-ready intelligent automation.'}
            </p>

            {/* STATUS BADGE */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <Activity className="w-3.5 h-3.5" />
              <span>{locale === 'id' ? 'Sistem Agen Aktif (100% Operational)' : 'AI Agents Active (100% Operational)'}</span>
            </div>

            {/* SOCIAL */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://github.com/tantenton" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="GitHub" 
                className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-indigo-500/40 hover:bg-white/[0.08] hover:text-white transition-all duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.37.6.1.82-.26.82-.58v-2.17c-3.34.72-4.04-1.6-4.04-1.6-.55-1.38-1.34-1.74-1.34-1.74-1.08-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.07 1.82 2.8 1.3 3.48.99.1-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="https://twitter.com/birrulabs" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Twitter/X" 
                className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-indigo-500/40 hover:bg-white/[0.08] hover:text-white transition-all duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.24 2h3.2L14.4 9.76 22.88 22h-6.88l-4.96-6.48L5.6 22H2.4l7.52-8.32L1.12 2H8.16l4.48 5.84L18.24 2zm-1.12 18h1.76L6.96 3.76H5.12L17.12 20z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* PRODUCTS */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4 font-mono">
              {locale === 'id' ? 'PRODUK AI' : 'AI PRODUCTS'}
            </h3>
            <ul className="space-y-3">
              {PRODUCTS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={`/${locale}${href}`} className="text-sm text-gray-400 hover:text-indigo-300 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4 font-mono">
              {locale === 'id' ? 'PERUSAHAAN' : 'COMPANY'}
            </h3>
            <ul className="space-y-3">
              {company.map(({ label, href }) => (
                <li key={href}>
                  <Link href={`/${locale}${href}`} className="text-sm text-gray-400 hover:text-indigo-300 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 BirruLabs AI Product Lab. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href={`/${locale}/privacy`} className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href={`/${locale}/terms`} className="hover:text-gray-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

