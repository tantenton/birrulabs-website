import type { Metadata } from 'next';
import type { Locale } from '@/lib/translations';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return {
    title: 'Privacy Policy | BirruLabs',
    description: 'Privacy policy for BirruLabs website and services.',
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const isID = l === 'id';

  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F0F2F5]">
      <section className="px-4 py-20 border-b border-[#2D3036]">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-[#6C6F75] text-sm">{isID ? 'Terakhir diperbarui:' : 'Last updated:'} 2026-08-05</p>
        </div>
      </section>
      <section className="px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-10 text-[#A3A6AC] leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-[#F0F2F5] mb-4">
              {isID ? 'Informasi yang Kami Kumpulkan' : 'Information We Collect'}
            </h2>
            <p>{isID
              ? 'Kami mengumpulkan informasi yang Anda berikan langsung kepada kami melalui form kontak, termasuk nama, email, organisasi, dan pesan. Kami tidak mengumpulkan data pribadi secara otomatis selain log server standar.'
              : 'We collect information you directly provide through contact forms, including name, email, organization, and message. We do not automatically collect personal data beyond standard server logs.'}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#F0F2F5] mb-4">
              {isID ? 'Cara Kami Menggunakan Informasi' : 'How We Use Information'}
            </h2>
            <ul className="space-y-2">
              {(isID ? [
                'Merespons pertanyaan dan permintaan Anda',
                'Mengirimkan informasi yang Anda minta',
                'Meningkatkan layanan kami',
                'Analitik penggunaan website (anonymized)',
              ] : [
                'Respond to your inquiries and requests',
                'Send information you requested',
                'Improve our services',
                'Website usage analytics (anonymized)',
              ]).map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-1">•</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#F0F2F5] mb-4">
              {isID ? 'Keamanan Data' : 'Data Security'}
            </h2>
            <p>{isID
              ? 'Kami menggunakan HTTPS, security headers standar (CSP, HSTS, X-Frame-Options), dan tidak menyimpan data sensitif di repository. Form submission diproteksi dengan rate limiting.'
              : 'We use HTTPS, standard security headers (CSP, HSTS, X-Frame-Options), and do not store sensitive data in the repository. Form submissions are protected with rate limiting.'}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#F0F2F5] mb-4">
              {isID ? 'Hak Anda' : 'Your Rights'}
            </h2>
            <p>{isID
              ? 'Anda berhak meminta akses, koreksi, atau penghapusan data pribadi Anda. Hubungi kami di contact@birrulabs.biz.id.'
              : 'You have the right to request access, correction, or deletion of your personal data. Contact us at contact@birrulabs.biz.id.'}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#F0F2F5] mb-4">Kontak</h2>
            <p>contact@birrulabs.biz.id</p>
          </div>
        </div>
      </section>
    </div>
  );
}
