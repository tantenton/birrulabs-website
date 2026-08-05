'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { Loader2, Mail, MessageSquare, Send, CheckCircle2, User } from 'lucide-react';

interface ContactFormProps {
  className?: string;
  locale?: 'id' | 'en';
}

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm = ({ className, locale = 'en' }: ContactFormProps) => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      setTimeout(() => setIsSuccess(false), 6000);
    } catch {
      setError(locale === 'id' ? 'Gagal mengirim pesan. Silakan coba lagi.' : 'Failed to send message. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className={clsx('relative rounded-2xl p-[1px] bg-gradient-to-b from-white/10 via-indigo-500/20 to-transparent shadow-2xl', className)}>
      <div className="bg-[#121520]/90 backdrop-blur-xl rounded-[15px] p-6 sm:p-10 border border-white/10 space-y-6">
        
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {locale === 'id' ? 'Kirim Pesan ke Labs' : 'Get in Touch with Our Lab'}
          </h2>
          <p className="text-gray-400 text-sm">
            {locale === 'id' 
              ? 'Diskusikan proyek AI, otomatisasi agen, atau peluang kolaborasi. Kami merespons dalam 24 jam.'
              : 'Discuss custom AI solutions, agentic workflow automation, or partnership opportunities.'}
          </p>
        </div>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              {locale === 'id' ? 'Pesan Terkirim!' : 'Message Received!'}
            </h3>
            <p className="text-gray-400 text-sm max-w-sm">
              {locale === 'id'
                ? 'Terima kasih telah menghubungi BirruLabs. Tim agen kami akan segera meninjau pesan Anda.'
                : 'Thank you for reaching out to BirruLabs. We will review your message and respond promptly.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-xs font-mono font-semibold uppercase tracking-wider text-gray-300">
                  {locale === 'id' ? 'Nama Lengkap' : 'Your Name'}
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl focus:border-indigo-500 focus:bg-white/[0.06] focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-white text-sm placeholder:text-gray-600"
                    placeholder="Jane Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-xs font-mono font-semibold uppercase tracking-wider text-gray-300">
                  {locale === 'id' ? 'Alamat Email' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl focus:border-indigo-500 focus:bg-white/[0.06] focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-white text-sm placeholder:text-gray-600"
                    placeholder="jane@company.com"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="block text-xs font-mono font-semibold uppercase tracking-wider text-gray-300">
                {locale === 'id' ? 'Subjek / Topik' : 'Subject'}
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl focus:border-indigo-500 focus:bg-white/[0.06] focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-white text-sm placeholder:text-gray-600"
                  placeholder={locale === 'id' ? 'Pengembangan AI Custom, Automasi Agent, dll' : 'Custom AI Build, Multi-agent Workflow, etc.'}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block text-xs font-mono font-semibold uppercase tracking-wider text-gray-300">
                {locale === 'id' ? 'Detail Pesan' : 'Message Context'}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl focus:border-indigo-500 focus:bg-white/[0.06] focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all resize-none text-white text-sm placeholder:text-gray-600"
                placeholder={locale === 'id' ? 'Jelaskan kebutuhan produk atau proyek Anda...' : 'Tell us about your product goals or technical requirements...'}
              />
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs font-mono">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 disabled:opacity-50 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 active:scale-98 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-cyan-200" />
                  <span>{locale === 'id' ? 'Mengirim...' : 'Sending Message...'}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{locale === 'id' ? 'Kirim Pesan' : 'Send Message'}</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactForm;

