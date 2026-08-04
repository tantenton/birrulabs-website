export const locales = ['id', 'en'] as const;
export const defaultLocale = 'id';

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  id: 'Bahasa Indonesia',
  en: 'English',
};

export const localeFlags: Record<Locale, string> = {
  id: '🇮🇩',
  en: '🇬🇧',
};
