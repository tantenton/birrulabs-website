'use client';

import { useState } from 'react';
import { Share2, Link2, Check } from 'lucide-react';
import type { Locale } from '@/lib/translations';

interface ShareButtonProps {
  locale: Locale;
  title: string;
}

export default function ShareButton({ locale, title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={copyLink}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                 border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)]
                 text-[#908fa0] hover:text-[#e2e2e8] hover:border-[rgba(255,255,255,0.18)]
                 transition-all duration-150 font-mono text-[12px]"
      aria-label={copied ? 'Link copied' : 'Copy link'}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-[#10B981]" aria-hidden="true" />
          {locale === 'id' ? 'Tersalin' : 'Copied'}
        </>
      ) : (
        <>
          <Link2 className="w-3.5 h-3.5" aria-hidden="true" />
          {locale === 'id' ? 'Salin Link' : 'Copy Link'}
        </>
      )}
    </button>
  );
}
