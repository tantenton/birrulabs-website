import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/lib/translations';
import { getT } from '@/lib/translations';

interface HeroSectionProps {
  locale: Locale;
}

const ORBITAL_NODES = [
  { label: 'Router',   angle: 0,   color: '#10B981' },
  { label: 'Memory',   angle: 72,  color: '#6366F1' },
  { label: 'Executor', angle: 144, color: '#10B981' },
  { label: 'Toolbox',  angle: 216, color: '#6366F1' },
  { label: 'Eval',     angle: 288, color: '#10B981' },
];

export default function HeroSection({ locale }: HeroSectionProps) {
  const t = getT(locale);

  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex items-center">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid" aria-hidden="true" />
      <div className="absolute inset-0 bg-hero-glow" aria-hidden="true" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full
                   bg-brand-primary opacity-[0.04] blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative w-full section-container py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — copy */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8
                            rounded-full border border-[rgba(99,102,241,0.2)]
                            bg-[rgba(99,102,241,0.06)]
                            font-mono text-[11px] tracking-widest text-[#6366F1] uppercase">
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#10B981]"
                style={{ animation: 'pulseDot 2s cubic-bezier(0.4,0,0.6,1) infinite' }}
                aria-hidden="true"
              />
              Building in public — AI product lab
            </div>

            <h1 className="text-[36px] md:text-[48px] leading-[1.08] tracking-[-0.02em]
                           font-bold text-[#e2e2e8] mb-6 max-w-[560px]">
              {t.hero.title}
            </h1>

            <p className="text-[18px] leading-[1.65] text-[#c7c4d7] mb-10 max-w-[480px]">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/${locale}/projects`}
                className="btn-primary text-[13px] px-6 py-3"
              >
                {t.hero.cta_primary}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="btn-secondary text-[13px] px-6 py-3"
              >
                {t.hero.cta_secondary}
              </Link>
            </div>

            {/* Social proof / stats */}
            <div className="flex items-center gap-8 mt-12 pt-8 border-t border-[rgba(255,255,255,0.06)]">
              {[
                { value: '6+', label: locale === 'id' ? 'Proyek aktif' : 'Active projects' },
                { value: '100%', label: locale === 'id' ? 'Build in public' : 'Build in public' },
                { value: 'AI-first', label: locale === 'id' ? 'Semua workflow' : 'Every workflow' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="text-[22px] font-bold text-[#e2e2e8] leading-none mb-1">{value}</div>
                  <div className="text-[12px] text-[#908fa0]">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — agent diagram */}
          <div
            className="relative h-[420px] w-full rounded-xl overflow-hidden
                       border border-[rgba(255,255,255,0.06)]
                       bg-[#161920] hidden lg:block"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-grid opacity-50" />

            {/* Central hub */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                width="360"
                height="360"
                viewBox="0 0 360 360"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute"
              >
                {/* Outer ring */}
                <circle cx="180" cy="180" r="110" stroke="rgba(99,102,241,0.12)" strokeWidth="1" />
                {/* Inner ring */}
                <circle cx="180" cy="180" r="60" stroke="rgba(99,102,241,0.18)" strokeWidth="1" />
                {/* Connector lines */}
                {ORBITAL_NODES.map(({ angle, color }) => {
                  const rad = (angle - 90) * (Math.PI / 180);
                  const x2 = 180 + Math.cos(rad) * 110;
                  const y2 = 180 + Math.sin(rad) * 110;
                  return (
                    <line
                      key={angle}
                      x1="180" y1="180"
                      x2={x2} y2={y2}
                      stroke={color}
                      strokeOpacity="0.15"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                  );
                })}
              </svg>

              {/* Central node */}
              <div className="relative z-10 flex flex-col items-center justify-center
                              w-16 h-16 rounded-xl
                              bg-[rgba(99,102,241,0.12)]
                              border border-[rgba(99,102,241,0.3)]">
                <div className="w-6 h-6 rounded bg-[rgba(99,102,241,0.4)]
                                border border-[rgba(99,102,241,0.6)]" />
                <span className="mt-1.5 font-mono text-[9px] text-[#6366F1] tracking-widest">CORE</span>
              </div>

              {/* Orbital nodes */}
              {ORBITAL_NODES.map(({ label, angle, color }) => {
                const rad = (angle - 90) * (Math.PI / 180);
                const x = Math.cos(rad) * 110;
                const y = Math.sin(rad) * 110;
                return (
                  <div
                    key={label}
                    className="absolute z-10 flex flex-col items-center"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center
                                 border"
                      style={{
                        backgroundColor: `${color}18`,
                        borderColor: `${color}35`,
                      }}
                    >
                      <div
                        className="w-3 h-3 rounded-sm"
                        style={{ backgroundColor: `${color}90` }}
                      />
                    </div>
                    <span className="mt-1.5 font-mono text-[10px] text-[#908fa0] whitespace-nowrap">
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Corner label */}
            <div className="absolute top-4 left-4 z-20">
              <span className="font-mono text-[11px] text-[#908fa0]
                              bg-[rgba(10,12,16,0.85)] px-2.5 py-1.5 rounded
                              border border-[rgba(255,255,255,0.06)] backdrop-blur-sm">
                System.Orchestration.01
              </span>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 inset-x-0 h-20
                            bg-gradient-to-t from-[#161920] to-transparent" />
          </div>

        </div>
      </div>
    </section>
  );
}
