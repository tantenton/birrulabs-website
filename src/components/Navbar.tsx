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
    { label: locale === 'id' ? 'Beranda' : 'Home', href: `/${locale}` },
    { label: locale === 'id' ? 'Tentang' : 'About', href: `/${locale}/about` },
    { label: locale === 'id' ? 'Proyek' : 'Projects', href: `/${locale}/projects` },
    { label: locale === 'id' ? 'Artikel' : 'Articles', href: `/${locale}/articles` },
    { label: locale === 'id' ? 'Kontak' : 'Contact', href: `/${locale}/contact` },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#2D3036] bg-[#0F1115]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

          {/* LOGO */}
          <Link href={`/${locale}`} className="flex-shrink-0 text-lg font-bold tracking-tight" aria-label="BirruLabs home">
            Birru<span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">Labs</span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {links.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(href)
                    ? 'bg-[#16191F] text-[#F0F2F5]'
                    : 'text-[#A3A6AC] hover:text-[#F0F2F5] hover:bg-[#16191F]'
                }`}
                aria-current={isActive(href) ? 'page' : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher locale={locale} />
            <Link
              href={`/${locale}/contact`}
              className="hidden md:inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors min-h-[36px]"
            >
              {locale === 'id' ? 'Hubungi' : 'Contact Us'}
            </Link>
            {/* HAMBURGER */}
            <button
              className="md:hidden p-2 rounded-lg text-[#A3A6AC] hover:text-[#F0F2F5] hover:bg-[#16191F] transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu locale={locale} isOpen={mobileOpen} onClose={() => setMobileOpen(false)} links={links} />
    </>
  );
}
