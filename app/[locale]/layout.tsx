import { notFound } from 'next/navigation';
import { locales } from '@/i18n.config';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const titles: Record<string, string> = {
    id: 'BirruLabs - AI Product Lab',
    en: 'BirruLabs - AI Product Lab',
  };

  const descriptions: Record<string, string> = {
    id: 'Membangun sistem AI praktis: agen otonom, otomasi sosial, pipeline kreatif, dan software bisnis.',
    en: 'Building practical AI systems: autonomous agents, social automation, creative pipelines, and business software.',
  };

  return {
    title: titles[locale] ?? titles['en'],
    description: descriptions[locale] ?? descriptions['en'],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  return <div lang={locale}>{children}</div>;
}
