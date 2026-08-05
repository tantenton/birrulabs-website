'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { getT } from '@/lib/translations';
import type { Locale } from '@/lib/translations';

const PURPOSE_OPTIONS = [
  'partnership', 'startup', 'client', 'product', 'investment', 'media', 'other',
] as const;

export default function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const l = (use(params)).locale as Locale;
  const t = getT(l);

  const [form, setForm] = useState({ name: '', email: '', organization: '', purpose: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // No real API yet — simulate
    await new Promise((r) => setTimeout(r, 800));
    setStatus('success');
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F0F2F5]">

      {/* HEADER */}
      <section className="px-4 py-20 md:py-24 border-b border-[#2D3036]">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.contact.title}</h1>
          <p className="text-xl text-[#A3A6AC]">{t.contact.subtitle}</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-4 py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* CONTACT INFO */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {l === 'id' ? 'Informasi Kontak' : 'Contact Information'}
              </h2>
              <div className="space-y-4 text-[#A3A6AC]">
                <div className="flex items-start gap-3">
                  <span className="text-indigo-400 mt-0.5">✉</span>
                  <div>
                    <p className="text-xs text-[#6C6F75] mb-0.5">Email</p>
                    <p>contact@birrulabs.biz.id</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-indigo-400 mt-0.5">🌐</span>
                  <div>
                    <p className="text-xs text-[#6C6F75] mb-0.5">Website</p>
                    <p>birrulabs.biz.id</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-indigo-400 mt-0.5">📍</span>
                  <div>
                    <p className="text-xs text-[#6C6F75] mb-0.5">{l === 'id' ? 'Lokasi' : 'Location'}</p>
                    <p>Indonesia</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 rounded-xl bg-[#16191F] border border-[#2D3036]">
              <h3 className="font-semibold mb-2 text-sm text-[#6C6F75] uppercase tracking-wider">
                {l === 'id' ? 'Jam Kerja' : 'Business Hours'}
              </h3>
              <p className="text-[#A3A6AC] text-sm">
                {l === 'id' ? 'Senin–Jumat, 09.00–18.00 WIB' : 'Mon–Fri, 09:00–18:00 WIB'}
              </p>
              <p className="text-[#6C6F75] text-sm mt-1">
                {l === 'id' ? 'Biasanya respons dalam 24 jam.' : 'Usually respond within 24 hours.'}
              </p>
            </div>
          </div>

          {/* FORM */}
          <div>
            {status === 'success' ? (
              <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <p className="font-semibold mb-2">✓ {l === 'id' ? 'Pesan Terkirim' : 'Message Sent'}</p>
                <p className="text-sm">{t.contact.success}</p>
                <button
                  onClick={() => { setStatus('idle'); setForm({ name: '', email: '', organization: '', purpose: '', message: '' }); }}
                  className="mt-4 text-sm underline text-emerald-300"
                >
                  {l === 'id' ? 'Kirim pesan lain' : 'Send another message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#A3A6AC] mb-1.5">
                    {t.contact.form.name} <span className="text-[#EF4444]">*</span>
                  </label>
                  <input
                    id="name" name="name" type="text" required autoComplete="name"
                    value={form.name} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#16191F] border border-[#2D3036] text-[#F0F2F5] placeholder-[#6C6F75] focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder={l === 'id' ? 'Nama kamu' : 'Your name'}
                  />
                </div>
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#A3A6AC] mb-1.5">
                    {t.contact.form.email} <span className="text-[#EF4444]">*</span>
                  </label>
                  <input
                    id="email" name="email" type="email" required autoComplete="email"
                    value={form.email} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#16191F] border border-[#2D3036] text-[#F0F2F5] placeholder-[#6C6F75] focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="email@domain.com"
                  />
                </div>
                {/* Organization */}
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-[#A3A6AC] mb-1.5">
                    {t.contact.form.organization}
                  </label>
                  <input
                    id="organization" name="organization" type="text" autoComplete="organization"
                    value={form.organization} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#16191F] border border-[#2D3036] text-[#F0F2F5] placeholder-[#6C6F75] focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder={l === 'id' ? 'Perusahaan / organisasi' : 'Company / organization'}
                  />
                </div>
                {/* Purpose */}
                <div>
                  <label htmlFor="purpose" className="block text-sm font-medium text-[#A3A6AC] mb-1.5">
                    {t.contact.form.purpose} <span className="text-[#EF4444]">*</span>
                  </label>
                  <select
                    id="purpose" name="purpose" required
                    value={form.purpose} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#16191F] border border-[#2D3036] text-[#F0F2F5] focus:outline-none focus:border-indigo-500 transition-colors"
                  >
                    <option value="">{l === 'id' ? 'Pilih tujuan...' : 'Select purpose...'}</option>
                    {PURPOSE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {t.contact.form.purpose_options[opt]}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#A3A6AC] mb-1.5">
                    {t.contact.form.message} <span className="text-[#EF4444]">*</span>
                  </label>
                  <textarea
                    id="message" name="message" rows={5} required
                    value={form.message} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#16191F] border border-[#2D3036] text-[#F0F2F5] placeholder-[#6C6F75] focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                    placeholder={l === 'id' ? 'Ceritakan kebutuhanmu...' : 'Tell us about your needs...'}
                  />
                </div>
                {/* Privacy */}
                <p className="text-xs text-[#6C6F75]">{t.contact.privacy}</p>
                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-6 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold transition-colors min-h-[48px] flex items-center justify-center gap-2"
                  aria-busy={loading}
                >
                  {loading ? (
                    <><span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" aria-hidden="true" />{l === 'id' ? 'Mengirim...' : 'Sending...'}</>
                  ) : t.contact.submit}
                </button>
                {status === 'error' && (
                  <p className="text-sm text-[#EF4444]">{t.contact.error}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
