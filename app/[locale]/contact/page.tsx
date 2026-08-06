'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { getT } from '@/lib/translations';
import type { Locale } from '@/lib/translations';

const PURPOSE_OPTIONS = [
  'partnership', 'startup', 'client', 'product', 'investment', 'media', 'other',
] as const;

type FormFields = { name: string; email: string; organization: string; purpose: string; message: string };
type FormErrors = Partial<Record<keyof FormFields, string>>;

function validateForm(form: FormFields, l: Locale): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = l === 'id' ? 'Nama wajib diisi' : 'Name is required';
  if (!form.email.trim()) {
    errors.email = l === 'id' ? 'Email wajib diisi' : 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = l === 'id' ? 'Format email tidak valid' : 'Invalid email format';
  }
  if (!form.purpose) errors.purpose = l === 'id' ? 'Pilih tujuan kontak' : 'Please select a purpose';
  if (!form.message.trim()) {
    errors.message = l === 'id' ? 'Pesan wajib diisi' : 'Message is required';
  } else if (form.message.trim().length < 20) {
    errors.message = l === 'id' ? 'Pesan minimal 20 karakter' : 'Message must be at least 20 characters';
  }
  return errors;
}

export default function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const l = (use(params)).locale as Locale;
  const t = getT(l);

  const [form, setForm] = useState<FormFields>({ name: '', email: '', organization: '', purpose: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormFields, boolean>>>({});
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name as keyof FormFields]) {
      const updated = { ...form, [name]: value };
      const newErrors = validateForm(updated, l);
      setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormFields] }));
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validateForm(form, l);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormFields] }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const allTouched = Object.keys(form).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);
    const newErrors = validateForm(form, l);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setLoading(true);
    // No real API yet — simulate
    await new Promise((r) => setTimeout(r, 1200));
    setStatus('success');
    setLoading(false);
  }

  const purposeLabels: Record<string, Record<Locale, string>> = {
    partnership: { id: 'Partnership / Kolaborasi', en: 'Partnership / Collaboration' },
    startup: { id: 'Startup / Bisnis', en: 'Startup / Business' },
    client: { id: 'Project Client', en: 'Project Client' },
    product: { id: 'Product / Licensing', en: 'Product / Licensing' },
    investment: { id: 'Investment', en: 'Investment' },
    media: { id: 'Media / Press', en: 'Media / Press' },
    other: { id: 'Lainnya', en: 'Other' },
  };

  const inputClass = (field: keyof FormFields) =>
    `w-full px-4 py-3 rounded-lg bg-[#0A0C10] text-[#e2e2e8] placeholder:text-[#6C6F75]
     focus:outline-none transition-all duration-150
     ${errors[field] && touched[field]
       ? 'border-2 border-[#EF4444] focus:ring-2 focus:ring-[rgba(239,68,68,0.2)]'
       : 'border border-[rgba(255,255,255,0.1)] focus:border-[#6366F1] focus:ring-2 focus:ring-[rgba(99,102,241,0.2)]'
     }`;

  const FieldError = ({ field }: { field: keyof FormFields }) =>
    errors[field] && touched[field] ? (
      <p className="mt-1.5 flex items-center gap-1.5 font-mono text-[11px] text-[#EF4444]" role="alert">
        <AlertCircle className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
        {errors[field]}
      </p>
    ) : null;

  return (
    <div className="min-h-screen bg-[#0A0C10] text-[#e2e2e8]">

      {/* HEADER */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-25" aria-hidden="true" />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(99,102,241,0.08), transparent)' }}
          aria-hidden="true"
        />
        <div className="relative section-container py-20 md:py-28">
          <p className="label-mono mb-4">Get in Touch</p>
          <h1 className="text-[40px] md:text-[56px] leading-[1.05] tracking-[-0.02em]
                         font-bold text-[#e2e2e8] mb-5 max-w-2xl">
            {t.contact.title}
          </h1>
          <p className="text-[18px] leading-[1.65] text-[#c7c4d7] max-w-xl">
            {t.contact.subtitle}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="section-container py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left — contact info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-[20px] font-semibold text-[#e2e2e8] mb-6">
                {l === 'id' ? 'Informasi Kontak' : 'Contact Information'}
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl
                                bg-[#161920] border border-[rgba(255,255,255,0.07)]">
                  <Mail className="w-5 h-5 text-[#6366F1] mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-mono text-[11px] text-[#908fa0] mb-1">Email</p>
                    <a
                      href="mailto:contact@birrulabs.biz.id"
                      className="text-[14px] text-[#e2e2e8] hover:text-[#6366F1] transition-colors"
                    >
                      contact@birrulabs.biz.id
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl
                                bg-[#161920] border border-[rgba(255,255,255,0.07)]">
                  <MessageSquare className="w-5 h-5 text-[#6366F1] mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-mono text-[11px] text-[#908fa0] mb-1">
                      {l === 'id' ? 'Waktu Respons' : 'Response Time'}
                    </p>
                    <p className="text-[14px] text-[#e2e2e8]">
                      {l === 'id' ? '1-2 hari kerja' : '1-2 business days'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick FAQ */}
            <div className="p-6 rounded-xl bg-[#161920] border border-[rgba(255,255,255,0.07)]">
              <h3 className="text-[16px] font-semibold text-[#e2e2e8] mb-4">FAQ</h3>
              <div className="space-y-4 text-[13px]">
                <div>
                  <p className="font-semibold text-[#e2e2e8] mb-1">
                    {l === 'id' ? 'Apakah bisa konsultasi gratis?' : 'Free consultation available?'}
                  </p>
                  <p className="text-[#908fa0] leading-relaxed">
                    {l === 'id'
                      ? 'Ya, initial call 30 menit untuk memahami kebutuhan Anda.'
                      : 'Yes, 30-minute initial call to understand your needs.'}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-[#e2e2e8] mb-1">
                    {l === 'id' ? 'Timeline proyek?' : 'Project timeline?'}
                  </p>
                  <p className="text-[#908fa0] leading-relaxed">
                    {l === 'id'
                      ? 'Tergantung scope. Biasanya 2-8 minggu untuk MVP.'
                      : 'Depends on scope. Usually 2-8 weeks for MVP.'}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-[#e2e2e8] mb-1">
                    {l === 'id' ? 'Lokasi?' : 'Location?'}
                  </p>
                  <p className="text-[#908fa0] leading-relaxed">
                    {l === 'id'
                      ? 'Remote. Kami bekerja dengan klien global.'
                      : 'Remote. We work with global clients.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-2">
            <div className="p-8 rounded-xl bg-[#161920] border border-[rgba(255,255,255,0.07)]">
              {status === 'success' ? (
                <div className="text-center py-12">
                  <div className="inline-flex p-4 rounded-full bg-[rgba(16,185,129,0.1)] mb-6">
                    <CheckCircle2 className="w-8 h-8 text-[#10B981]" aria-hidden="true" />
                  </div>
                  <h3 className="text-[20px] font-semibold text-[#e2e2e8] mb-3">
                    {l === 'id' ? 'Pesan Terkirim!' : 'Message Sent!'}
                  </h3>
                  <p className="text-[15px] text-[#c7c4d7] mb-8 max-w-md mx-auto">
                    {l === 'id'
                      ? 'Terima kasih telah menghubungi kami. Kami akan merespons dalam 1-2 hari kerja.'
                      : 'Thank you for contacting us. We will respond within 1-2 business days.'}
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="btn-secondary"
                  >
                    {l === 'id' ? 'Kirim Pesan Lain' : 'Send Another Message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="text-[20px] font-semibold text-[#e2e2e8] mb-6">
                    {l === 'id' ? 'Kirim Pesan' : 'Send a Message'}
                  </h2>

                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block font-mono text-[11px] text-[#908fa0] mb-2 uppercase tracking-wider">
                      {l === 'id' ? 'Nama' : 'Name'} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-required="true"
                      aria-invalid={!!errors.name && touched.name}
                      aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
                      className={inputClass('name')}
                      placeholder={l === 'id' ? 'Nama lengkap' : 'Full name'}
                    />
                    <FieldError field="name" />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block font-mono text-[11px] text-[#908fa0] mb-2 uppercase tracking-wider">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-required="true"
                      aria-invalid={!!errors.email && touched.email}
                      className={inputClass('email')}
                      placeholder="you@example.com"
                    />
                    <FieldError field="email" />
                  </div>

                  {/* Organization */}
                  <div>
                    <label htmlFor="organization" className="block font-mono text-[11px] text-[#908fa0] mb-2 uppercase tracking-wider">
                      {l === 'id' ? 'Organisasi / Perusahaan' : 'Organization / Company'}
                    </label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      value={form.organization}
                      onChange={handleChange}
                      className={inputClass('organization')}
                      placeholder={l === 'id' ? 'Opsional' : 'Optional'}
                    />
                  </div>

                  {/* Purpose */}
                  <div>
                    <label htmlFor="purpose" className="block font-mono text-[11px] text-[#908fa0] mb-2 uppercase tracking-wider">
                      {l === 'id' ? 'Tujuan Kontak' : 'Purpose of Contact'} *
                    </label>
                    <select
                      id="purpose"
                      name="purpose"
                      value={form.purpose}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-required="true"
                      aria-invalid={!!errors.purpose && touched.purpose}
                      className={inputClass('purpose')}
                    >
                      <option value="">{l === 'id' ? 'Pilih...' : 'Select...'}</option>
                      {PURPOSE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {purposeLabels[opt][l]}
                        </option>
                      ))}
                    </select>
                    <FieldError field="purpose" />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block font-mono text-[11px] text-[#908fa0] mb-2 uppercase tracking-wider">
                      {l === 'id' ? 'Pesan' : 'Message'} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-required="true"
                      aria-invalid={!!errors.message && touched.message}
                      rows={6}
                      className={`${inputClass('message')} resize-none`}
                      placeholder={l === 'id'
                        ? 'Ceritakan tentang proyek atau kebutuhan Anda...'
                        : 'Tell us about your project or needs...'}
                    />
                    <FieldError field="message" />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center text-[14px] py-3.5
                               disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      l === 'id' ? 'Mengirim...' : 'Sending...'
                    ) : (
                      <>
                        {l === 'id' ? 'Kirim Pesan' : 'Send Message'}
                        <Send className="w-4 h-4" aria-hidden="true" />
                      </>
                    )}
                  </button>

                  <p className="text-[12px] text-[#6C6F75] text-center">
                    {l === 'id'
                      ? 'Dengan mengirim pesan, Anda menyetujui '
                      : 'By sending a message, you agree to our '}
                    <Link href={`/${l}/privacy`} className="text-[#6366F1] hover:underline">
                      {l === 'id' ? 'kebijakan privasi' : 'privacy policy'}
                    </Link>
                    .
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
