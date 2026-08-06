import Link from 'next/link';
import type { Locale } from '@/lib/translations';

interface CTASectionProps {
  locale: Locale;
}

export default function CTASection({ locale }: CTASectionProps) {
  const isId = locale === 'id';

  return (
    <section className="section-container py-20 md:py-32">
      <div className="relative rounded-2xl overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-surface-elevated" aria-hidden="true" />
        <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(99,102,241,0.12), transparent)',
          }}
          aria-hidden="true"
        />
        {/* Border glow */}
        <div className="absolute inset-0 rounded-2xl border border-brand-primary/10" aria-hidden="true" />

        {/* Content */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center p-10 md:p-14">
          <div>
            <h2 className="text-headline-xl-mobile md:text-headline-lg text-text-primary leading-tight mb-4">
              {isId
                ? 'Siap untuk skala kecerdasan bisnis Anda?'
                : 'Ready to scale your intelligence?'}
            </h2>
            <p className="text-body-md text-text-secondary leading-relaxed">
              {isId
                ? 'Bermitra dengan studio kami untuk membangun agentic workflow yang disesuaikan dengan bottleneck operasional Anda.'
                : 'Partner with our studio to build custom agentic workflows tailored to your operational bottlenecks.'}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
            <Link
              href={`/${locale}/contact`}
              className="btn-primary"
            >
              {isId ? 'Hubungi Studio' : 'Contact Studio'}
            </Link>
            <Link
              href={`/${locale}/projects`}
              className="btn-secondary"
            >
              {isId ? 'Lihat Proyek' : 'View Projects'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
