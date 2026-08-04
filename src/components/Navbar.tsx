'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';

interface NavbarProps {
  variant?: 'default' | 'minimal';
  className?: string;
}

const Navbar = ({ variant = 'default', className }: NavbarProps) => {
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

  return (
    <nav className={clsx('flex items-center space-x-1 lg:space-x-2', className)}>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={clsx(
              'px-3 py-2 rounded-lg text-sm font-medium transition-all',
              {
                'bg-primary-600 text-white shadow-md': isActive,
                'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800':
                  !isActive && variant === 'default',
                'text-slate-500 hover:text-primary-600 dark:hover:text-primary-400':
                  !isActive && variant === 'minimal',
              }
            )}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;
