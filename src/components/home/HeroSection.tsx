import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Locale } from '@/lib/translations';
import { getT } from '@/lib/translations';

interface HeroSectionProps {
  locale: Locale;
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const t = getT(locale);

  return (
    <section className="relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-100" aria-hidden="true" />
      <div className="absolute inset-0 bg-hero-glow" aria-hidden="true" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full
                   bg-brand-primary/5 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative section-container pt-24 pb-32 md:pt-32 md:pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">

          {/* Left — copy */}
          <div className="animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8
                            rounded-full border border-brand-primary/20
                            bg-brand-primary/5 text-brand-primary
                            font-mono text-code-label">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-accent animate-pulse-dot" aria-hidden="true" />
              Building in public — AI product lab
            </div>

            <h1 className="text-headline-xl-mobile md:text-headline-xl text-text-primary mb-6 max-w-xl">
              {t.hero.title}
            </h1>

            <p className="text-body-lg text-text-secondary mb-10 max-w-lg leading-relaxed">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${locale}/projects`}
                className="btn-primary"
              >
                {t.hero.cta_primary}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="btn-secondary"
              >
                {t.hero.cta_secondary}
              </Link>
            </div>
          </div>

          {/* Right — abstract visual */}
          <div
            className="relative h-[380px] w-full rounded-xl overflow-hidden
                       border border-border-subtle bg-surface-elevated
                       hidden lg:block"
            aria-hidden="true"
          >
            {/* Grid background */}
            <div className="absolute inset-0 bg-grid opacity-60" />

            {/* Central node */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Outer ring */}
                <div className="w-32 h-32 rounded-full border border-brand-primary/20
                                flex items-center justify-center">
                  {/* Inner ring */}
                  <div className="w-20 h-20 rounded-full border border-brand-primary/30
                                  flex items-center justify-center bg-brand-primary/5">
                    {/* Core */}
                    <div className="w-10 h-10 rounded-lg bg-brand-primary/20
                                    border border-brand-primary/40
                                    flex items-center justify-center">
                      <div className="w-4 h-4 rounded bg-brand-primary/60" />
                    </div>
                  </div>
                </div>

                {/* Orbiting agent nodes */}
                {[
                  { label: 'Router',   angle: 0,   color: 'bg-brand-accent' },
                  { label: 'Memory',   angle: 72,  color: 'bg-brand-primary' },
                  { label: 'Executor', angle: 144, color: 'bg-brand-accent' },
                  { label: 'Toolbox',  angle: 216, color: 'bg-brand-primary' },
                  { label: 'Eval',     angle: 288, color: 'bg-brand-accent' },
                ].map(({ label, angle, color }) => {
                  const rad = (angle - 90) * (Math.PI / 180);
                  const x = Math.cos(rad) * 88;
                  const y = Math.sin(rad) * 88;
                  return (
                    <div
                      key={label}
                      className="absolute flex flex-col items-center"
                      style={{ transform: `translate(${x}px, ${y}px)`, left: '50%', top: '50%', marginLeft: '-20px', marginTop: '-20px' }}
                    >
                      {/* Connector line */}
                      <div
                        className="absolute border-t border-brand-primary/15"
                        style={{
                          width: '88px',
                          transformOrigin: '0 0',
                          transform: `rotate(${angle + 90}deg)`,
                          top: '10px',
                          left: '10px',
                        }}
                        aria-hidden="true"
                      />
                      <div className={`w-5 h-5 rounded ${color}/20 border border-${color.replace('bg-', '')}/40 flex items-center justify-center`}>
                        <div className={`w-2 h-2 rounded-sm ${color}/70`} />
                      </div>
                      <span className="mt-1 font-mono text-[10px] text-text-tertiary whitespace-nowrap">{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Corner label */}
            <div className="absolute top-4 left-4 font-mono text-code-label text-text-tertiary
                            bg-surface/80 px-2 py-1 rounded border border-border-subtle backdrop-blur-sm">
              System.Orchestration.01
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 inset-x-0 h-16
                            bg-gradient-to-t from-surface-elevated to-transparent" />
          </div>

        </div>
      </div>
    </section>
  );
}
