'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface LanguageSwitcherProps {
  locale: 'id' | 'en';
}

export default function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (newLocale: 'id' | 'en') => {
    const newPath = pathname.replace(/^\/(id|en)/, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center rounded-lg border border-[#2D3036] bg-[#16191F] overflow-hidden" role="group" aria-label="Language switcher">
      {(['id', 'en'] as const).map((l) => (
        <button
          key={l}
          onClick={() => switchTo(l)}
          className={`px-3 py-1.5 text-sm font-medium transition-colors min-h-[36px] ${
            locale === l
              ? 'bg-indigo-600 text-white'
              : 'text-[#A3A6AC] hover:text-[#F0F2F5]'
          }`}
          aria-pressed={locale === l}
          aria-label={`Switch to ${l === 'id' ? 'Indonesian' : 'English'}`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
