import type { Metadata } from 'next';
import type { Locale } from '@/lib/translations';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Terms of Use | BirruLabs',
    description: 'Terms of use for BirruLabs website and services.',
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const isID = l === 'id';

  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F0F2F5]">
      <section className="px-4 py-20 border-b border-[#2D3036]">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{isID ? 'Syarat Penggunaan' : 'Terms of Use'}</h1>
          <p className="text-[#6C6F75] text-sm">{isID ? 'Terakhir diperbarui:' : 'Last updated:'} 2026-08-05</p>
        </div>
      </section>
      <section className="px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-10 text-[#A3A6AC] leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-[#F0F2F5] mb-4">
              {isID ? 'Penggunaan Website' : 'Website Use'}
            </h2>
            <p>{isID
              ? 'Website ini disediakan sebagai sarana informasi tentang BirruLabs dan produk-produknya. Anda diperbolehkan menggunakan website ini untuk tujuan personal dan non-komersial.'
              : 'This website is provided as an informational resource about BirruLabs and its products. You are permitted to use this website for personal and non-commercial purposes.'}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#F0F2F5] mb-4">
              {isID ? 'Kekayaan Intelektual' : 'Intellectual Property'}
            </h2>
            <p>{isID
              ? 'Semua konten di website ini, termasuk teks, gambar, dan kode, adalah milik BirruLabs kecuali dinyatakan lain. Dilarang menyalin atau mendistribusikan tanpa izin.'
              : 'All content on this website, including text, images, and code, belongs to BirruLabs unless otherwise stated. Copying or distributing without permission is prohibited.'}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#F0F2F5] mb-4">
              {isID ? 'Batasan Tanggung Jawab' : 'Limitation of Liability'}
            </h2>
            <p>{isID
              ? 'BirruLabs tidak bertanggung jawab atas kerugian langsung atau tidak langsung yang timbul dari penggunaan website ini. Semua produk yang ditampilkan masih dalam tahap pengembangan dan informasinya dapat berubah.'
              : 'BirruLabs is not liable for direct or indirect damages arising from the use of this website. All products displayed are still in development and information is subject to change.'}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#F0F2F5] mb-4">
              {isID ? 'Perubahan Syarat' : 'Changes to Terms'}
            </h2>
            <p>{isID
              ? 'Kami berhak mengubah syarat penggunaan ini kapan saja. Perubahan akan dipublikasikan di halaman ini.'
              : 'We reserve the right to change these terms of use at any time. Changes will be published on this page.'}</p>
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
