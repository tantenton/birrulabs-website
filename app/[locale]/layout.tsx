import { notFound } from 'next/navigation';
import { locales } from '@/i18n.config';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as 'id' | 'en')) notFound();
  const l = locale as 'id' | 'en';

  return (
    <div lang={locale} className={`${inter.variable} ${jetbrains.variable}`}>
      <Navbar locale={l} />
      {/* pt-16 offsets the fixed navbar (h-16) */}
      <div className="pt-16">
        {children}
      </div>
      <Footer locale={l} />
    </div>
  );
}
