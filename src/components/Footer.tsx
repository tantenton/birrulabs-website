import Link from 'next/link';

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
    <footer className="bg-[#0C0E12] border-t border-white/10 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* BRAND STATEMENT */}
          <div className="lg:col-span-2 space-y-4">
            <Link href={`/${locale}`} className="inline-flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white">
                Birru<span className="text-indigo-400">Labs</span>
              </span>
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              {locale === 'id'
                ? 'Membangun sistem AI praktis, software local-first, dan otomatisasi agen yang dapat diuji di dunia nyata.'
                : 'Building practical AI systems, local-first software, and agentic automation built for verification.'}
            </p>

            {/* STAGE METADATA */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/[0.04] border border-white/10 text-xs font-mono text-gray-400">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>{locale === 'id' ? 'Tahap Pengujian: Internal Alpha' : 'Development Stage: Internal Alpha'}</span>
            </div>
          </div>

          {/* PRODUCTS */}
          <div>
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-4">
              {locale === 'id' ? 'SISTEM' : 'SYSTEMS'}
            </h3>
            <ul className="space-y-2.5">
              {PRODUCTS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={`/${locale}${href}`} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-4">
              {locale === 'id' ? 'LABS' : 'LABS'}
            </h3>
            <ul className="space-y-2.5">
              {company.map(({ label, href }) => (
                <li key={href}>
                  <Link href={`/${locale}${href}`} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-mono">
          <p>© 2026 BirruLabs AI Product Lab. Evidence over hype.</p>
          <div className="flex items-center gap-6">
            <Link href={`/${locale}/privacy`} className="hover:text-gray-400 transition-colors">Privacy</Link>
            <Link href={`/${locale}/terms`} className="hover:text-gray-400 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


