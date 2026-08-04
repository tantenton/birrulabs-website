import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { supportedLanguages } from '@/lib/i18n';

export consti18nConfig = {
  locales: supportedLanguages,
  defaultLocale: 'en',
};

export function getLocale(): string {
  const cookieStore = cookies();
  const locale = cookieStore.get('NEXT_LOCALE');
  if (locale && supportedLanguages.includes(locale.value as any)) {
    return locale.value;
  }
  return 'en';
}

export function getTranslations(locale: string) {
  return import(`../../public/locales/${locale}/translation.json`);
}

export function redirectWithLocale(path: string) {
  const locale = getLocale();
  return `/(${locale})${path}`;
}

export function generateStaticParams() {
  return supportedLanguages.map((lng) => ({ lng }));
}
