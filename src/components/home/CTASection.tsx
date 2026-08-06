import Link from 'next/link';
import type { Locale } from '@/lib/translations';

interface CTASectionProps {
  locale: Locale;
}

export default function CTASection({ locale }: CTASectionProps) {
  const isId = locale === 'id';

  return (
    <section className="section-container py-20 md:py-28">
      <div className="relative rounded-2xl overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[#161920]" aria-hidden="true" />
        <div className="absolute inset-0 bg-grid opacity-30" aria-hidden="true" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(99,102,241,0.15), transparent)',
          }}
          aria-hidden="true"
        />
        {/* Border glow */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, transparent 50%, rgba(16,185,129,0.08) 100%)',
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 rounded-2xl border border-[rgba(99,102,241,0.15)]" aria-hidden="true" />

        {/* Content */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center
                        p-10 md:p-16">
          <div>
            <h2 className="text-[32px] md:text-[40px] leading-[1.15] tracking-[-0.015em]
                           font-semibold text-[#e2e2e8] mb-4">
              {isId
                ? 'Siap untuk skala kecerdasan bisnis Anda?'
                : 'Ready to scale your intelligence?'}
            </h2>
            <p className="text-[16px] leading-[1.65] text-[#c7c4d7]">
              {isId
                ? 'Bermitra dengan studio kami untuk membangun agentic workflow yang disesuaikan dengan bottleneck operasional Anda.'
                : 'Partner with our studio to build custom agentic workflows tailored to your operational bottlenecks.'}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
            <Link
              href={`/${locale}/contact`}
              className="btn-primary text-[13px] px-7 py-3.5"
            >
              {isId ? 'Hubungi Studio' : 'Contact Studio'}
            </Link>
            <Link
              href={`/${locale}/projects`}
              className="btn-secondary text-[13px] px-7 py-3.5"
            >
              {isId ? 'Lihat Proyek' : 'View Projects'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
