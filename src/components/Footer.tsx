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
    <footer className="bg-[#16191F] border-t border-[#2D3036] text-[#A3A6AC]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          {/* BRAND */}
          <div className="lg:col-span-2">
            <div className="text-xl font-bold text-[#F0F2F5] mb-3">
              Birru<span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">Labs</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              {locale === 'id'
                ? 'Membangun sistem AI praktis yang bekerja di luar demo.'
                : 'Building practical AI systems that work beyond the demo.'}
            </p>
            {/* SOCIAL */}
            <div className="flex items-center gap-3 mt-5">
              <a href="https://github.com/tantenton" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2 rounded-lg hover:bg-[#1A1D23] hover:text-[#F0F2F5] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.37.6.1.82-.26.82-.58v-2.17c-3.34.72-4.04-1.6-4.04-1.6-.55-1.38-1.34-1.74-1.34-1.74-1.08-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.07 1.82 2.8 1.3 3.48.99.1-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a href="https://twitter.com/birrulabs" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X" className="p-2 rounded-lg hover:bg-[#1A1D23] hover:text-[#F0F2F5] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.24 2h3.2L14.4 9.76 22.88 22h-6.88l-4.96-6.48L5.6 22H2.4l7.52-8.32L1.12 2H8.16l4.48 5.84L18.24 2zm-1.12 18h1.76L6.96 3.76H5.12L17.12 20z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* PRODUCTS */}
          <div>
            <h3 className="text-sm font-semibold text-[#F0F2F5] uppercase tracking-wider mb-4">
              {locale === 'id' ? 'Produk' : 'Products'}
            </h3>
            <ul className="space-y-2.5">
              {PRODUCTS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={`/${locale}${href}`} className="text-sm hover:text-[#F0F2F5] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-sm font-semibold text-[#F0F2F5] uppercase tracking-wider mb-4">
              {locale === 'id' ? 'Perusahaan' : 'Company'}
            </h3>
            <ul className="space-y-2.5">
              {company.map(({ label, href }) => (
                <li key={href}>
                  <Link href={`/${locale}${href}`} className="text-sm hover:text-[#F0F2F5] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="pt-6 border-t border-[#2D3036] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6C6F75]">
          <p>© 2026 BirruLabs. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href={`/${locale}/privacy`} className="hover:text-[#A3A6AC] transition-colors">Privacy</Link>
            <Link href={`/${locale}/terms`} className="hover:text-[#A3A6AC] transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
