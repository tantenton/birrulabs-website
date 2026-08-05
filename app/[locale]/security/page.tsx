import type { Metadata } from 'next';
import type { Locale } from '@/lib/translations';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Security | BirruLabs',
    description: 'Security philosophy and responsible disclosure for BirruLabs.',
  };
}

export default async function SecurityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const isID = l === 'id';

  const controls = isID ? [
    'HTTPS only — semua traffic dienkripsi',
    'Content Security Policy (CSP) — mencegah XSS',
    'X-Frame-Options: DENY — mencegah clickjacking',
    'Referrer-Policy: strict-origin-when-cross-origin',
    'Permissions-Policy — disable camera/mic/geolocation',
    'Input validation server-side di semua form',
    'Rate limiting pada form submission',
    'Tidak ada secret di repository (env vars only)',
    'Dependency scanning dengan npm audit',
    'No source maps di production',
  ] : [
    'HTTPS only — all traffic encrypted',
    'Content Security Policy (CSP) — prevents XSS',
    'X-Frame-Options: DENY — prevents clickjacking',
    'Referrer-Policy: strict-origin-when-cross-origin',
    'Permissions-Policy — disable camera/mic/geolocation',
    'Server-side input validation on all forms',
    'Rate limiting on form submissions',
    'No secrets in repository (env vars only)',
    'Dependency scanning with npm audit',
    'No source maps in production',
  ];

  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F0F2F5]">
      <section className="px-4 py-20 border-b border-[#2D3036]">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            {isID ? 'Keamanan & Responsible Disclosure' : 'Security & Responsible Disclosure'}
          </h1>
          <p className="text-xl text-[#A3A6AC]">
            {isID
              ? 'Kami menganggap serius keamanan. Berikut kontrol yang diterapkan dan cara melaporkan vulnerability.'
              : 'We take security seriously. Here are the controls we apply and how to report vulnerabilities.'}
          </p>
        </div>
      </section>

      <section className="px-4 py-12 border-b border-[#2D3036]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">
            {isID ? 'Kontrol Keamanan yang Diterapkan' : 'Security Controls Applied'}
          </h2>
          <ul className="space-y-3">
            {controls.map((c, i) => (
              <li key={i} className="flex items-start gap-3 p-4 rounded-lg bg-[#16191F] border border-[#2D3036]">
                <span className="text-emerald-400 mt-0.5">✓</span>
                <span className="text-[#A3A6AC]">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Responsible Disclosure</h2>
          <div className="space-y-6 text-[#A3A6AC]">
            <p>
              {isID
                ? 'Jika Anda menemukan vulnerability keamanan di website atau produk BirruLabs, kami mengapresiasi laporan yang bertanggung jawab.'
                : 'If you discover a security vulnerability in BirruLabs website or products, we appreciate responsible disclosure.'}
            </p>
            <div className="p-5 rounded-xl bg-[#16191F] border border-[#2D3036]">
              <h3 className="font-semibold text-[#F0F2F5] mb-3">
                {isID ? 'Cara Melaporkan' : 'How to Report'}
              </h3>
              <ul className="space-y-2">
                <li>Email: <a href="mailto:security@birrulabs.biz.id" className="text-indigo-400 hover:underline">security@birrulabs.biz.id</a></li>
                <li>Subject: <code className="text-sm bg-[#1A1D23] px-2 py-0.5 rounded">[SECURITY] {isID ? 'Deskripsi Singkat' : 'Brief Description'}</code></li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-[#16191F] border border-[#2D3036]">
              <h3 className="font-semibold text-[#F0F2F5] mb-3">{isID ? 'Yang Kami Minta' : 'What We Ask'}</h3>
              <ul className="space-y-2">
                {(isID ? [
                  'Jangan exploit vulnerability untuk mengakses data user lain',
                  'Berikan waktu yang wajar untuk memperbaiki sebelum disclosure publik',
                  'Jangan melakukan destructive testing',
                ] : [
                  'Do not exploit vulnerabilities to access other users\' data',
                  'Give reasonable time to fix before public disclosure',
                  'Do not perform destructive testing',
                ]).map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-indigo-400 mt-1">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
