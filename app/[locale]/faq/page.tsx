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
    <div className="min-h-screen bg-[#0A0C10] text-[#e2e2e8]">
      <section
        className="relative overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(99,102,241,0.1), transparent)' }}
      >
        <div className="absolute inset-0 bg-grid opacity-25" aria-hidden="true" />
        <div className="relative section-container py-20 md:py-28">
          <h1 className="text-[40px] md:text-[56px] leading-[1.05] tracking-[-0.02em] font-bold text-[#e2e2e8] mb-4">
            FAQ
          </h1>
          <p className="text-[20px] leading-[1.65] text-[#c7c4d7] max-w-2xl">
            {isID ? 'Pertanyaan yang sering ditanyakan.' : 'Frequently asked questions.'}
          </p>
        </div>
      </section>

      <section className="section-container py-16 md:py-20">
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS[l].map((faq, i) => (
            <details
              key={i}
              className="group rounded-xl bg-[#161920] border border-[rgba(255,255,255,0.07)]
                        hover:border-[rgba(99,102,241,0.3)] transition-all duration-300"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-6">
                <span className="text-[16px] md:text-[17px] leading-[1.4] font-semibold text-[#e2e2e8]">
                  {faq.q}
                </span>
                <span
                  className="text-[#6366F1] flex-shrink-0 text-[20px] transition-transform duration-200 group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="px-6 pb-6 text-[15px] leading-[1.7] text-[#c7c4d7]">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
