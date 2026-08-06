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
  manifest: '/manifest.json',
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
  alternates: {
    canonical: 'https://birrulabs.biz.id',
    languages: {
      'id': 'https://birrulabs.biz.id/id',
      'en': 'https://birrulabs.biz.id/en',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="alternate" type="application/rss+xml" title="BirruLabs RSS Feed" href="/rss.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "BirruLabs",
              "url": "https://birrulabs.biz.id",
              "logo": "https://birrulabs.biz.id/icon-512.png",
              "description": "Engineering studio building autonomous AI agents, workflow automation, and creative pipelines.",
              "sameAs": [
                "https://github.com/tantenton",
                "https://twitter.com/birrulabs"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "contact@birrulabs.biz.id",
                "contactType": "customer service"
              }
            })
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
