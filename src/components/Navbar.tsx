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
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0C0E12]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">

          {/* BRAND LOGO */}
          <Link 
            href={`/${locale}`} 
            className="flex items-center gap-2.5 group focus:outline-none" 
            aria-label="BirruLabs home"
          >
            <span className="text-lg font-bold tracking-tight text-white">
              Birru<span className="text-indigo-400">Labs</span>
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 border-l border-white/10 pl-2 hidden sm:inline-block">
              AI Product Lab
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {links.map(({ label, href }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm font-medium transition-colors ${
                    active
                      ? 'text-white font-semibold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher locale={locale} />
            
            <Link
              href={`/${locale}/contact`}
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              {locale === 'id' ? 'Kontak' : 'Contact'}
            </Link>

            {/* HAMBURGER */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors"
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


