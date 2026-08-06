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
            className="relative h-[480px] w-full rounded-xl overflow-hidden
                       border border-[rgba(255,255,255,0.08)]
                       bg-[#161920] hidden lg:block
                       shadow-[0_0_40px_rgba(99,102,241,0.08)]"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-grid opacity-40" />
            
            {/* Radial glow */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: 'radial-gradient(circle at center, rgba(99,102,241,0.15), transparent 70%)',
              }}
            />

            {/* Central hub */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                width="400"
                height="400"
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute animate-[spin_60s_linear_infinite]"
                style={{ animationDirection: 'reverse' }}
              >
                {/* Outer ring */}
                <circle 
                  cx="200" cy="200" r="130" 
                  stroke="rgba(99,102,241,0.15)" 
                  strokeWidth="1.5"
                  strokeDasharray="8 8"
                  className="animate-[spin_40s_linear_infinite]"
                  style={{ transformOrigin: 'center' }}
                />
                {/* Inner ring */}
                <circle 
                  cx="200" cy="200" r="70" 
                  stroke="rgba(99,102,241,0.2)" 
                  strokeWidth="1.5"
                />
                {/* Connector lines */}
                {ORBITAL_NODES.map(({ angle, color }) => {
                  const rad = (angle - 90) * (Math.PI / 180);
                  const x2 = 200 + Math.cos(rad) * 130;
                  const y2 = 200 + Math.sin(rad) * 130;
                  return (
                    <line
                      key={angle}
                      x1="200" y1="200"
                      x2={x2} y2={y2}
                      stroke={color}
                      strokeOpacity="0.2"
                      strokeWidth="1"
                      strokeDasharray="6 6"
                    />
                  );
                })}
              </svg>

              {/* Central node */}
              <div className="relative z-10 flex flex-col items-center justify-center
                              w-20 h-20 rounded-xl
                              bg-[rgba(99,102,241,0.15)]
                              border-2 border-[rgba(99,102,241,0.4)]
                              shadow-[0_0_30px_rgba(99,102,241,0.3)]
                              animate-pulse"
                   style={{ animationDuration: '3s' }}>
                <div className="w-8 h-8 rounded-lg bg-[rgba(99,102,241,0.5)]
                                border border-[rgba(99,102,241,0.7)]" />
                <span className="mt-2 font-mono text-[10px] text-[#6366F1] tracking-widest font-semibold">CORE</span>
              </div>

              {/* Orbital nodes */}
              {ORBITAL_NODES.map(({ label, angle, color }, i) => {
                const rad = (angle - 90) * (Math.PI / 180);
                const x = Math.cos(rad) * 130;
                const y = Math.sin(rad) * 130;
                return (
                  <div
                    key={label}
                    className="absolute z-10 flex flex-col items-center animate-pulse"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: 'translate(-50%, -50%)',
                      animationDelay: `${i * 0.4}s`,
                      animationDuration: '3s',
                    }}
                  >
                    <div
                      className="w-11 h-11 rounded-lg flex items-center justify-center
                                 border-2 transition-all duration-500
                                 hover:scale-110"
                      style={{
                        backgroundColor: `${color}20`,
                        borderColor: `${color}45`,
                        boxShadow: `0 0 20px ${color}30`,
                      }}
                    >
                      <div
                        className="w-4 h-4 rounded-sm"
                        style={{ backgroundColor: `${color}` }}
                      />
                    </div>
                    <span className="mt-2 font-mono text-[11px] text-[#c7c4d7] whitespace-nowrap font-medium">
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Corner label */}
            <div className="absolute top-5 left-5 z-20">
              <span className="font-mono text-[11px] text-[#c7c4d7]
                              bg-[rgba(10,12,16,0.9)] px-3 py-2 rounded
                              border border-[rgba(99,102,241,0.2)] backdrop-blur-sm
                              shadow-lg">
                System.Orchestration.01
              </span>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 inset-x-0 h-24
                            bg-gradient-to-t from-[#161920] via-[#161920]/80 to-transparent" />
          </div>

        </div>
      </div>
    </section>
  );
}
