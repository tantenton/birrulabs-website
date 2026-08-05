import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Page Not Found | BirruLabs',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F0F2F5] flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-600/10 border border-indigo-500/20 mb-6">
          <span className="text-4xl font-bold text-indigo-400">404</span>
        </div>
        <h1 className="text-3xl font-bold mb-3">Halaman Tidak Ditemukan</h1>
        <p className="text-[#A3A6AC] mb-8 leading-relaxed">
          Halaman yang Anda cari tidak ada atau telah dipindahkan.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors min-h-[48px]"
        >
          Kembali ke Beranda
        </a>
      </div>
    </div>
  );
}
