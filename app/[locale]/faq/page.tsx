import type { Metadata } from 'next';
import type { Locale } from '@/lib/translations';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'FAQ | BirruLabs',
    description: 'Frequently asked questions about BirruLabs.',
  };
}

const FAQS: Record<Locale, { q: string; a: string }[]> = {
  id: [
    {
      q: 'Apa itu BirruLabs?',
      a: 'BirruLabs adalah studio teknologi founder-led yang membangun autonomous AI agent systems, social media automation, affiliate automation, dan creative content pipelines. Kami building in public dan tidak mengklaim hal-hal yang belum terbukti.',
    },
    {
      q: 'Apakah BirruLabs menerima klien atau proyek custom?',
      a: 'Ya, kami terbuka untuk kolaborasi, pilot projects, dan custom development. Hubungi kami melalui halaman kontak untuk diskusi lebih lanjut.',
    },
    {
      q: 'Status produk BirruLabs saat ini?',
      a: 'Semua produk masih dalam tahap early development (Internal Alpha, Prototype, atau In Development). Tidak ada produk yang sudah launch secara publik. Kami menggunakan label status yang akurat dan tidak mengklaim angka pengguna atau revenue.',
    },
    {
      q: 'Apakah BirruLabs menerima investasi?',
      a: 'Kami terbuka untuk diskusi dengan investor yang aligned dengan visi kami. Hubungi kami melalui form kontak dengan tujuan "Investment".',
    },
    {
      q: 'Bagaimana cara mendaftar startup program atau accelerator bersama BirruLabs?',
      a: 'Lihat halaman Startup Profile untuk informasi lengkap tentang stage, produk, dan kebutuhan kami. Hubungi kami untuk diskusi lebih lanjut.',
    },
    {
      q: 'Apakah BirruLabs open source?',
      a: 'Beberapa komponen dan tools mungkin akan di-open source di masa depan. Saat ini, sebagian besar kode bersifat proprietary. Website ini sendiri ada di GitHub.',
    },
    {
      q: 'Bagaimana melaporkan security issue?',
      a: 'Kirim email ke security@birrulabs.biz.id dengan subject "[SECURITY] Deskripsi Singkat". Lihat halaman Security untuk panduan responsible disclosure.',
    },
  ],
  en: [
    {
      q: 'What is BirruLabs?',
      a: 'BirruLabs is a founder-led technology studio building autonomous AI agent systems, social media automation, affiliate automation, and creative content pipelines. We build in public and do not claim unverified things.',
    },
    {
      q: 'Does BirruLabs accept clients or custom projects?',
      a: 'Yes, we are open to collaboration, pilot projects, and custom development. Contact us via the contact page for further discussion.',
    },
    {
      q: 'What is the current status of BirruLabs products?',
      a: 'All products are still in early development (Internal Alpha, Prototype, or In Development). No products have publicly launched. We use accurate status labels and do not claim user numbers or revenue.',
    },
    {
      q: 'Does BirruLabs accept investment?',
      a: 'We are open to discussions with investors aligned with our vision. Contact us via the contact form with purpose "Investment".',
    },
    {
      q: 'How to apply for startup programs or accelerators with BirruLabs?',
      a: 'See the Startup Profile page for complete information about our stage, products, and needs. Contact us for further discussion.',
    },
    {
      q: 'Is BirruLabs open source?',
      a: 'Some components and tools may be open sourced in the future. Currently, most code is proprietary. This website itself is on GitHub.',
    },
    {
      q: 'How to report a security issue?',
      a: 'Send an email to security@birrulabs.biz.id with subject "[SECURITY] Brief Description". See the Security page for responsible disclosure guidelines.',
    },
  ],
};

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const isID = l === 'id';

  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F0F2F5]">
      <section className="px-4 py-20 border-b border-[#2D3036]">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">FAQ</h1>
          <p className="text-xl text-[#A3A6AC]">
            {isID ? 'Pertanyaan yang sering ditanyakan.' : 'Frequently asked questions.'}
          </p>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS[l].map((faq, i) => (
            <details
              key={i}
              className="group p-6 rounded-xl bg-[#16191F] border border-[#2D3036] hover:border-indigo-500/30 transition-colors"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-semibold">
                {faq.q}
                <span className="text-indigo-400 flex-shrink-0 text-xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-[#A3A6AC] leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
