import type { Metadata } from 'next';
import type { Locale } from '@/lib/translations';
import { getT } from '@/lib/translations';
import HeroSection from '@/components/home/HeroSection';
import CoreCapabilities from '@/components/home/CoreCapabilities';
import FeaturedProjectsSection from '@/components/home/FeaturedProjectsSection';
import AgentOrchestration from '@/components/home/AgentOrchestration';
import CTASection from '@/components/home/CTASection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getT(locale as Locale);
  return {
    title: 'BirruLabs — AI Product Lab',
    description: t.hero.subtitle,
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l = locale as Locale;

  return (
    <>
      {/* Skip to main content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]
                   focus:px-4 focus:py-2 focus:rounded focus:bg-brand-primary focus:text-white
                   focus:font-mono focus:text-sm"
      >
        Skip to main content
      </a>
      <main id="main-content">
        <HeroSection locale={l} />
        <CoreCapabilities locale={l} />
        <FeaturedProjectsSection locale={l} />
        <AgentOrchestration locale={l} />
        <CTASection locale={l} />
      </main>
    </>
  );
}
