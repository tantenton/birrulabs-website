'use client';

import { use } from 'react';
import { getT } from '@/lib/translations';
import type { Locale } from '@/lib/translations';
import ContactForm from '@/components/ContactForm';
import { Mail, Globe, MapPin, Clock, ShieldCheck, Sparkles } from 'lucide-react';

export default function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const l = (use(params)).locale as Locale;
  const t = getT(l);

  return (
    <div className="relative min-h-screen bg-[#0B0D13] text-[#F3F4F6] selection:bg-indigo-500/30 selection:text-white">
      
      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-radial-glow pointer-events-none z-0" />

      {/* HEADER SECTION */}
      <section className="relative z-10 px-4 sm:px-6 pt-24 pb-16 md:pt-32 md:pb-20 max-w-7xl mx-auto border-b border-white/10">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{l === 'id' ? 'Kolaborasi & Inovasi' : 'Collaboration & Advisory'}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            {t.contact.title}
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>
      </section>

      {/* CONTENT GRID */}
      <section className="relative z-10 px-4 sm:px-6 py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* CONTACT INFO SIDEBAR */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 space-y-6">
              <h2 className="text-xl font-bold text-white">
                {l === 'id' ? 'Informasi Kontak Direct' : 'Direct Contact Info'}
              </h2>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-gray-500">Email Address</p>
                    <p className="text-white font-medium text-sm sm:text-base mt-0.5">contact@birrulabs.biz.id</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-cyan-600/20 border border-cyan-500/30 text-cyan-400">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-gray-500">Official Website</p>
                    <p className="text-white font-medium text-sm sm:text-base mt-0.5">birrulabs.biz.id</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-gray-500">{l === 'id' ? 'Lokasi Headquarters' : 'Location'}</p>
                    <p className="text-white font-medium text-sm sm:text-base mt-0.5">Indonesia (Global Remote Operations)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* BUSINESS HOURS */}
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-white text-base">
                  {l === 'id' ? 'Jam Operasional' : 'Business Hours'}
                </h3>
              </div>
              <p className="text-gray-300 text-sm">
                {l === 'id' ? 'Senin–Jumat, 09.00–18.00 WIB' : 'Mon–Fri, 09:00–18:00 WIB'}
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                {l === 'id' ? 'Sistem monitoring & agen otomatis berjalan 24/7. Respons pesan dilakukan dalam 24 jam.' : 'Automated agent orchestrators monitor incoming queries 24/7. Team response within 24 hours.'}
              </p>
            </div>

            {/* CONFIDENTIALITY BADGE */}
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 text-emerald-300 text-xs font-mono">
              <ShieldCheck className="w-5 h-5 flex-shrink-0" />
              <span>100% Confidentiality & Data Privacy Guaranteed</span>
            </div>

          </div>

          {/* FORM COMPONENT */}
          <div className="lg:col-span-7">
            <ContactForm locale={l} />
          </div>

        </div>
      </section>

    </div>
  );
}

