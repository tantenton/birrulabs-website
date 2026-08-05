'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Sparkles, Cpu } from 'lucide-react';
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
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0B0D13]/80 backdrop-blur-xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-6">

          {/* LOGO */}
          <Link 
            href={`/${locale}`} 
            className="flex items-center gap-3 group focus:outline-none" 
            aria-label="BirruLabs home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
              <div className="w-full h-full bg-[#0B0D13] rounded-[11px] flex items-center justify-center group-hover:bg-opacity-90 transition-colors">
                <Cpu className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
                Birru<span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">Labs</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-indigo-300/70 font-semibold font-mono">AI Product Lab</span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-full border border-white/[0.08]" aria-label="Main navigation">
            {links.map(({ label, href }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'text-white bg-indigo-600/30 border border-indigo-500/40 shadow-sm shadow-indigo-500/20 font-semibold'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT SIDE ACTIONS */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher locale={locale} />
            <Link
              href={`/${locale}/contact`}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>{locale === 'id' ? 'Hubungi Labs' : 'Contact Lab'}</span>
            </Link>

            {/* HAMBURGER */}
            <button
              className="md:hidden p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu locale={locale} isOpen={mobileOpen} onClose={() => setMobileOpen(false)} links={links} />
    </>
  );
}

