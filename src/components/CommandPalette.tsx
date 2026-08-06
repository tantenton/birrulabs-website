'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, FileText, Code2, Info, Mail, Layers, X } from 'lucide-react';
import { PROJECTS } from '@/data/projects';
import { ARTICLES } from '@/data/articles';
import type { Locale } from '@/lib/translations';

interface CommandPaletteProps {
  locale: Locale;
}

type ResultItem = {
  id: string;
  label: string;
  sublabel?: string;
  href: string;
  icon: React.ReactNode;
  type: 'nav' | 'project' | 'article';
};

function fuzzyMatch(str: string, query: string): boolean {
  if (!query) return true;
  const s = str.toLowerCase();
  const q = query.toLowerCase();
  if (s.includes(q)) return true;
  // simple character sequence match
  let si = 0;
  for (let i = 0; i < q.length; i++) {
    const idx = s.indexOf(q[i], si);
    if (idx === -1) return false;
    si = idx + 1;
  }
  return true;
}

export default function CommandPalette({ locale }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const router = useRouter();

  const navItems: ResultItem[] = [
    { id: 'home',     label: locale === 'id' ? 'Beranda' : 'Home',     href: `/${locale}`,          icon: <Layers className="w-4 h-4" />,   type: 'nav' },
    { id: 'projects', label: locale === 'id' ? 'Proyek' : 'Projects',  href: `/${locale}/projects`, icon: <Code2 className="w-4 h-4" />,    type: 'nav' },
    { id: 'articles', label: locale === 'id' ? 'Artikel' : 'Articles', href: `/${locale}/articles`, icon: <FileText className="w-4 h-4" />, type: 'nav' },
    { id: 'about',    label: locale === 'id' ? 'Tentang' : 'About',    href: `/${locale}/about`,    icon: <Info className="w-4 h-4" />,     type: 'nav' },
    { id: 'contact',  label: locale === 'id' ? 'Kontak' : 'Contact',   href: `/${locale}/contact`,  icon: <Mail className="w-4 h-4" />,     type: 'nav' },
  ];

  const projectItems: ResultItem[] = PROJECTS.map((p) => ({
    id: `project-${p.slug}`,
    label: p.title[locale],
    sublabel: p.category,
    href: `/${locale}/projects/${p.slug}`,
    icon: <Code2 className="w-4 h-4" />,
    type: 'project',
  }));

  const articleItems: ResultItem[] = ARTICLES.map((a) => ({
    id: `article-${a.slug}`,
    label: a.title[locale],
    sublabel: a.category,
    href: `/${locale}/articles/${a.slug}`,
    icon: <FileText className="w-4 h-4" />,
    type: 'article',
  }));

  const allItems = [...navItems, ...projectItems, ...articleItems];

  const filtered = allItems.filter((item) =>
    fuzzyMatch(item.label, query) ||
    (item.sublabel && fuzzyMatch(item.sublabel, query))
  );

  const openPalette = useCallback(() => {
    setOpen(true);
    setQuery('');
    setActiveIdx(0);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const closePalette = useCallback(() => {
    setOpen(false);
    setQuery('');
    setActiveIdx(0);
  }, []);

  const navigate = useCallback((href: string) => {
    closePalette();
    router.push(href);
  }, [closePalette, router]);

  // Ctrl+K / Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        open ? closePalette() : openPalette();
        return;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, openPalette, closePalette]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { closePalette(); return; }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIdx((i) => Math.min(i + 1, filtered.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIdx((i) => Math.max(i - 1, 0));
      }
      if (e.key === 'Enter' && filtered[activeIdx]) {
        navigate(filtered[activeIdx].href);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, filtered, activeIdx, closePalette, navigate]);

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.children[activeIdx] as HTMLElement | undefined;
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIdx]);

  // Reset active on query change
  useEffect(() => { setActiveIdx(0); }, [query]);

  const TYPE_LABEL: Record<ResultItem['type'], string> = {
    nav: 'Navigation',
    project: locale === 'id' ? 'Proyek' : 'Project',
    article: locale === 'id' ? 'Artikel' : 'Article',
  };

  if (!open) return (
    <button
      onClick={openPalette}
      className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg
                 border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)]
                 text-[#908fa0] hover:text-[#e2e2e8] hover:border-[rgba(255,255,255,0.18)]
                 transition-all duration-150 font-mono text-[12px] min-h-[36px]"
      aria-label="Open command palette (Ctrl+K)"
    >
      <Search className="w-3.5 h-3.5" aria-hidden="true" />
      <span className="hidden lg:inline">{locale === 'id' ? 'Cari...' : 'Search...'}</span>
      <kbd className="hidden lg:inline px-1.5 py-0.5 rounded text-[10px]
                      bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)]">
        ⌘K
      </kbd>
    </button>
  );

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[rgba(0,0,0,0.7)] backdrop-blur-sm"
        onClick={closePalette}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative w-full max-w-xl rounded-xl overflow-hidden
                      bg-[#161920] border border-[rgba(255,255,255,0.12)]
                      shadow-[0_24px_80px_rgba(0,0,0,0.6)]">

        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3.5
                        border-b border-[rgba(255,255,255,0.08)]">
          <Search className="w-4 h-4 text-[#908fa0] flex-shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={locale === 'id' ? 'Cari halaman, proyek, artikel...' : 'Search pages, projects, articles...'}
            className="flex-1 bg-transparent text-[15px] text-[#e2e2e8]
                       placeholder:text-[#6C6F75] outline-none"
            aria-autocomplete="list"
            aria-controls="command-palette-list"
            aria-activedescendant={filtered[activeIdx] ? `cp-item-${filtered[activeIdx].id}` : undefined}
          />
          <button
            onClick={closePalette}
            className="p-1 rounded text-[#908fa0] hover:text-[#e2e2e8]
                       hover:bg-[rgba(255,255,255,0.06)] transition-colors"
            aria-label="Close command palette"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Results */}
        <ul
          ref={listRef}
          id="command-palette-list"
          role="listbox"
          className="max-h-[360px] overflow-y-auto py-2"
          style={{ scrollbarWidth: 'thin' }}
        >
          {filtered.length === 0 ? (
            <li className="px-4 py-8 text-center font-mono text-[13px] text-[#6C6F75]">
              {locale === 'id' ? 'Tidak ada hasil' : 'No results found'}
            </li>
          ) : (
            filtered.map((item, i) => (
              <li
                key={item.id}
                id={`cp-item-${item.id}`}
                role="option"
                aria-selected={i === activeIdx}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer
                             transition-colors duration-100
                             ${i === activeIdx
                               ? 'bg-[rgba(99,102,241,0.12)] text-[#e2e2e8]'
                               : 'text-[#c7c4d7] hover:bg-[rgba(255,255,255,0.04)]'
                             }`}
                onClick={() => navigate(item.href)}
                onMouseEnter={() => setActiveIdx(i)}
              >
                <span className={`flex-shrink-0 ${i === activeIdx ? 'text-[#6366F1]' : 'text-[#908fa0]'}`}>
                  {item.icon}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-[14px] truncate">{item.label}</span>
                  {item.sublabel && (
                    <span className="font-mono text-[11px] text-[#908fa0]">{item.sublabel}</span>
                  )}
                </span>
                <span className="font-mono text-[10px] text-[#6C6F75] flex-shrink-0">
                  {TYPE_LABEL[item.type]}
                </span>
                {i === activeIdx && (
                  <ArrowRight className="w-3.5 h-3.5 text-[#6366F1] flex-shrink-0" aria-hidden="true" />
                )}
              </li>
            ))
          )}
        </ul>

        {/* Footer */}
        <div className="flex items-center gap-4 px-4 py-2.5
                        border-t border-[rgba(255,255,255,0.06)]
                        font-mono text-[11px] text-[#6C6F75]">
          <span><kbd className="px-1 rounded bg-[rgba(255,255,255,0.06)]">↑↓</kbd> {locale === 'id' ? 'navigasi' : 'navigate'}</span>
          <span><kbd className="px-1 rounded bg-[rgba(255,255,255,0.06)]">↵</kbd> {locale === 'id' ? 'pilih' : 'select'}</span>
          <span><kbd className="px-1 rounded bg-[rgba(255,255,255,0.06)]">esc</kbd> {locale === 'id' ? 'tutup' : 'close'}</span>
        </div>
      </div>
    </div>
  );
}
