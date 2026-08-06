'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import MobileMenu from './MobileMenu';
import LanguageSwitcher from './LanguageSwitcher';

interface NavbarProps {
  locale: 'id' | 'en';
}

export default function Navbar({ locale }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: locale === 'id' ? 'Proyek' : 'Projects',  href: `/${locale}/projects` },
    { label: locale === 'id' ? 'Tentang' : 'About',    href: `/${locale}/about` },
    { label: locale === 'id' ? 'Artikel' : 'Articles', href: `/${locale}/articles` },
    { label: locale === 'id' ? 'Layanan' : 'Services', href: `/${locale}/services` },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <>
      <header
        className="fixed top-0 w-full z-50
                   border-b border-border-subtle
                   bg-surface/80 backdrop-blur-md"
      >
        <div className="max-w-content mx-auto px-[20px] md:px-[48px] h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex-shrink-0 text-headline-sm font-bold text-text-primary
                       hover:text-text-primary transition-colors"
            aria-label="BirruLabs home"
          >
            Birru<span className="text-gradient">Labs</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {links.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2 rounded text-body-sm font-medium transition-colors ${
                  isActive(href)
                    ? 'bg-surface-elevated text-text-primary'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
                }`}
                aria-current={isActive(href) ? 'page' : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher locale={locale} />
            <Link
              href={`/${locale}/contact`}
              className="hidden md:inline-flex btn-primary text-sm py-2 px-4 min-h-[36px]"
            >
              {locale === 'id' ? 'Hubungi' : 'Contact Us'}
            </Link>
            <button
              className="md:hidden p-2 rounded text-text-secondary
                         hover:text-text-primary hover:bg-surface-elevated transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen
                ? <X className="w-5 h-5" aria-hidden="true" />
                : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        locale={locale}
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={links}
      />
    </>
  );
}
