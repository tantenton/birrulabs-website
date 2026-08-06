'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import MobileMenu from './MobileMenu';
import LanguageSwitcher from './LanguageSwitcher';
import CommandPalette from './CommandPalette';
import { useScrolled } from '@/hooks/useScrolled';

interface NavbarProps {
  locale: 'id' | 'en';
}

export default function Navbar({ locale }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrolled(20);

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
        className={`fixed top-0 w-full z-50 transition-all duration-300
          border-b backdrop-blur-xl
          ${scrolled
            ? 'border-[rgba(255,255,255,0.08)] bg-[rgba(10,12,16,0.95)] shadow-[0_1px_24px_rgba(0,0,0,0.4)]'
            : 'border-[rgba(255,255,255,0.04)] bg-[rgba(10,12,16,0.7)]'
          }`}
      >
        {/* Top accent line */}
        <div className="absolute top-0 inset-x-0 h-px
                        bg-gradient-to-r from-transparent via-[rgba(99,102,241,0.4)] to-transparent"
             aria-hidden="true" />

        <div className="max-w-[1120px] mx-auto px-5 md:px-12 h-16
                        flex items-center justify-between gap-4">

          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex-shrink-0 font-bold text-[20px] tracking-tight
                       text-[#e2e2e8] hover:text-white
                       transition-colors duration-150"
            aria-label="BirruLabs home"
          >
            Birru<span className="text-gradient">Labs</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
            {links.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`px-3.5 py-2 rounded-md text-[14px] font-medium
                            transition-all duration-150 ${
                  isActive(href)
                    ? 'bg-[rgba(99,102,241,0.1)] text-[#e2e2e8]'
                    : 'text-[#c7c4d7] hover:text-[#e2e2e8] hover:bg-[rgba(255,255,255,0.05)]'
                }`}
                aria-current={isActive(href) ? 'page' : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            <CommandPalette locale={locale} />
            <LanguageSwitcher locale={locale} />
            <Link
              href={`/${locale}/contact`}
              className="hidden md:inline-flex btn-primary text-[13px] py-2 px-5 min-h-[36px]"
            >
              {locale === 'id' ? 'Hubungi' : 'Contact Us'}
            </Link>
            <button
              className="md:hidden p-2 rounded-md text-[#c7c4d7]
                         hover:text-[#e2e2e8] hover:bg-[rgba(255,255,255,0.05)]
                         transition-all duration-150 min-h-[44px] min-w-[44px]
                         flex items-center justify-center"
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
