import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://birrulabs.biz.id'),
  title: {
    default: 'BirruLabs - AI Product Lab',
    template: '%s | BirruLabs',
  },
  description:
    'BirruLabs builds practical AI systems: autonomous agents, social automation, creative pipelines, and business software.',
  keywords: [
    'AI automation',
    'autonomous agents',
    'social media automation',
    'affiliate automation',
    'creative AI',
    'business software',
    'Indonesia startup',
  ],
  authors: [{ name: 'BirruLabs' }],
  creator: 'BirruLabs',
  publisher: 'BirruLabs',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    alternateLocale: ['en_US'],
    url: 'https://birrulabs.biz.id',
    siteName: 'BirruLabs',
    title: 'BirruLabs - AI Product Lab',
    description:
      'Building practical AI systems that work beyond the demo.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BirruLabs - AI Product Lab',
    description:
      'Building practical AI systems that work beyond the demo.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
