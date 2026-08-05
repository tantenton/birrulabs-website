'use client';

import Link from 'next/link';
import { useEffect } from 'react';

interface MobileMenuProps {
  locale: 'id' | 'en';
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
}

export default function MobileMenu({ locale, isOpen, onClose, links }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="mobile-menu"
      className="fixed inset-0 z-30 bg-[#0F1115] flex flex-col pt-20"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      <nav className="flex flex-col px-4 gap-1">
        {links.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className="flex items-center px-4 py-4 rounded-xl text-lg font-medium text-[#A3A6AC] hover:text-[#F0F2F5] hover:bg-[#16191F] transition-colors min-h-[56px]"
          >
            {label}
          </Link>
        ))}
        <div className="mt-4 px-4">
          <Link
            href={`/${locale}/contact`}
            onClick={onClose}
            className="flex items-center justify-center w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors min-h-[56px]"
          >
            {locale === 'id' ? 'Hubungi Kami' : 'Contact Us'}
          </Link>
        </div>
      </nav>
    </div>
  );
}
