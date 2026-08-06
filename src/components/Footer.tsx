import Link from 'next/link';

interface FooterProps {
  locale: 'id' | 'en';
}

const STUDIO_LINKS = [
  { labelId: 'AI Agents',       labelEn: 'AI Agents',       href: '/services' },
  { labelId: 'Automasi',        labelEn: 'Automation',      href: '/services' },
  { labelId: 'Creative AI',     labelEn: 'Creative AI',     href: '/services' },
  { labelId: 'Studi Kasus',     labelEn: 'Case Studies',    href: '/projects' },
];

const LAB_LINKS = [
  { labelId: 'Open Source',     labelEn: 'Open Source',     href: '/projects' },
  { labelId: 'Tentang',         labelEn: 'About',           href: '/about' },
  { labelId: 'Artikel',         labelEn: 'Articles',        href: '/articles' },
  { labelId: 'Kontak',          labelEn: 'Contact',         href: '/contact' },
];

const LEGAL_LINKS = [
  { labelId: 'Kebijakan Privasi', labelEn: 'Privacy Policy', href: '/privacy' },
  { labelId: 'Syarat Layanan',    labelEn: 'Terms of Service', href: '/terms' },
  { labelId: 'Keamanan',          labelEn: 'Security',         href: '/security' },
];

export default function Footer({ locale }: FooterProps) {
  const isId = locale === 'id';

  return (
    <footer className="border-t border-border-subtle bg-surface">
      <div className="max-w-content mx-auto px-[20px] md:px-[48px] py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="text-headline-sm font-bold text-text-primary mb-3">
              Birru<span className="text-gradient">Labs</span>
            </div>
            <p className="text-body-sm text-text-secondary leading-relaxed mb-6 max-w-[200px]">
              {isId
                ? 'Membangun sistem AI praktis yang bekerja di luar demo.'
                : 'Building practical AI systems that work beyond the demo.'}
            </p>
            <p className="text-body-sm text-text-tertiary">
              © 2026 BirruLabs.
            </p>

            {/* Social */}
            <div className="flex items-center gap-2 mt-5">
              <a
                href="https://github.com/tantenton"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2 rounded text-text-tertiary hover:text-text-primary
                           hover:bg-surface-elevated transition-colors"
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
                className="p-2 rounded text-text-tertiary hover:text-text-primary
                           hover:bg-surface-elevated transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.24 2h3.2L14.4 9.76 22.88 22h-6.88l-4.96-6.48L5.6 22H2.4l7.52-8.32L1.12 2H8.16l4.48 5.84L18.24 2zm-1.12 18h1.76L6.96 3.76H5.12L17.12 20z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Studio */}
          <div>
            <h3 className="label-mono mb-5">Studio</h3>
            <ul className="space-y-3">
              {STUDIO_LINKS.map(({ labelId, labelEn, href }) => (
                <li key={href + (isId ? labelId : labelEn)}>
                  <Link
                    href={`/${locale}${href}`}
                    className="text-body-sm text-text-secondary
                               hover:text-text-primary transition-colors"
                  >
                    {isId ? labelId : labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Lab */}
          <div>
            <h3 className="label-mono mb-5">Lab</h3>
            <ul className="space-y-3">
              {LAB_LINKS.map(({ labelId, labelEn, href }) => (
                <li key={href + (isId ? labelId : labelEn)}>
                  <Link
                    href={`/${locale}${href}`}
                    className="text-body-sm text-text-secondary
                               hover:text-text-primary transition-colors"
                  >
                    {isId ? labelId : labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="label-mono mb-5">Legal</h3>
            <ul className="space-y-3">
              {LEGAL_LINKS.map(({ labelId, labelEn, href }) => (
                <li key={href}>
                  <Link
                    href={`/${locale}${href}`}
                    className="text-body-sm text-text-secondary
                               hover:text-text-primary transition-colors"
                  >
                    {isId ? labelId : labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}
