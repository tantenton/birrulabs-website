'use client';

import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Projects', href: '/projects' },
    { name: 'Articles', href: '/articles' },
    { name: 'Startup Profile', href: '/startup-profile' },
    { name: 'Contact', href: '/contact' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] md:hidden">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="absolute right-0 inset-y-0 w-3/4 max-w-xs bg-white dark:bg-slate-900 shadow-xl p-6 overflow-y-auto animate-slide-in-right">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={clsx(
                  'block px-4 py-3 rounded-lg transition-colors',
                  {
                    'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium': isActive,
                    'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800': !isActive,
                  }
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <Link
            href="/contact"
            onClick={onClose}
            className="block w-full px-4 py-3 text-center text-white bg-primary-600 hover:bg-primary-700 rounded-lg font-medium transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
