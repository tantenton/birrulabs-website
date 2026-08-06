import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PROJECTS } from '@/data/projects';
import { getT } from '@/lib/translations';
import type { Locale } from '@/lib/translations';
import StatusBadge from '@/components/ui/StatusBadge';
import TechChip from '@/components/ui/TechChip';

const STATUS_MAP: Record<string, import('@/components/ui/StatusBadge').StatusVariant> = {
  'Internal Alpha': 'alpha',
  'Live':           'live',
  'Prototype':      'prototype',
  'In Development': 'development',
  'Research':       'research',
  'Pilot':          'pilot',
  'Experimental':   'experimental',
};

export async function generateStaticParams() {
  const locales = ['id', 'en'] as const;
  const paths: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const project of PROJECTS) {
      paths.push({ locale, slug: project.slug });
    }
  }
  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const l = locale as Locale;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title[l]} | BirruLabs`,
    description: project.summary[l],
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const l = locale as Locale;
  const t = getT(l);
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) notFound();

  const variant = STATUS_MAP[project.status] ?? 'development';
  const relatedProjects = PROJECTS.filter((p) => p.id !== project.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#0A0C10] text-[#e2e2e8]">

      {/* BREADCRUMB */}
      <div className="border-b border-[rgba(255,255,255,0.06)]">
        <div className="section-container py-4">
          <Link
            href={`/${l}/projects`}
            className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.03em]
                       text-[#908fa0] hover:text-[#e2e2e8] transition-colors duration-150"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            {l === 'id' ? 'Kembali ke Proyek' : 'Back to Projects'}
          </Link>
        </div>
      </div>

      {/* HERO HEADER */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-25" aria-hidden="true" />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(99,102,241,0.1), transparent)' }}
          aria-hidden="true"
        />
        <div className="relative section-container py-16 md:py-24">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <StatusBadge variant={variant} label={project.status} />
            <span className="font-mono text-[11px] text-[#908fa0]
                             bg-[rgba(255,255,255,0.05)] px-3 py-1 rounded
                             border border-[rgba(255,255,255,0.08)]">
              {project.category}
            </span>
          </div>
          <h1 className="text-[40px] md:text-[56px] leading-[1.05] tracking-[-0.02em]
                         font-bold text-[#e2e2e8] mb-6 max-w-3xl">
            {project.title[l]}
          </h1>
          <p className="text-[20px] leading-[1.6] text-[#c7c4d7] max-w-2xl">
            {project.summary[l]}
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="section-container py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left — main content */}
          <div className="lg:col-span-2 space-y-16">

            {/* About the project */}
            <section>
              <h2 className="text-[24px] leading-[1.3] tracking-[-0.01em] font-semibold
                             text-[#e2e2e8] mb-6 pb-4 border-b border-[rgba(255,255,255,0.06)]">
                {l === 'id' ? 'Tentang Proyek' : 'About the Project'}
              </h2>
              <p className="text-[16px] leading-[1.75] text-[#c7c4d7]">
                {project.description[l]}
              </p>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-[24px] leading-[1.3] tracking-[-0.01em] font-semibold
                             text-[#e2e2e8] mb-6 pb-4 border-b border-[rgba(255,255,255,0.06)]">
                {t.common.features}
              </h2>
              <ul className="space-y-3">
                {project.features.map((feature, i) => (
                  <li
                    key={i}
                    className="group flex items-start gap-4 p-5 rounded-xl
                               bg-[#161920] border border-[rgba(255,255,255,0.07)]
                               hover:border-[rgba(99,102,241,0.2)]
                               transition-all duration-200"
                  >
                    <CheckCircle2
                      className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-[15px] leading-[1.65] text-[#c7c4d7]">
                      {feature[l]}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Disclaimer */}
            <div className="p-5 rounded-xl border border-[rgba(245,158,11,0.2)]
                            bg-[rgba(245,158,11,0.04)]">
              <p className="font-mono text-[12px] text-[#F59E0B]/80 leading-relaxed tracking-[0.02em]">
                <span>{'// '}</span>Status: {project.status}.{' '}
                {l === 'id'
                  ? 'Proyek ini masih dalam tahap pengembangan. Tidak ada klaim palsu tentang pengguna, revenue, atau partnership.'
                  : 'This project is still under development. No false claims about users, revenue, or partnerships.'}
              </p>
            </div>

          </div>

          {/* Right — sidebar */}
          <div className="space-y-8">

            {/* Tech stack */}
            <div className="p-6 rounded-xl bg-[#161920] border border-[rgba(255,255,255,0.07)]">
              <h3 className="label-mono mb-5">{t.common.tech_stack}</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <TechChip key={tech} label={tech} />
                ))}
              </div>
            </div>

            {/* Status info */}
            <div className="p-6 rounded-xl bg-[#161920] border border-[rgba(255,255,255,0.07)]">
              <h3 className="label-mono mb-5">{t.common.status}</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-[#908fa0]">Status</span>
                  <StatusBadge variant={variant} label={project.status} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-[#908fa0]">{t.common.category}</span>
                  <span className="font-mono text-[12px] text-[#c7c4d7]">{project.category}</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="p-6 rounded-xl border border-[rgba(99,102,241,0.2)]
                            bg-[rgba(99,102,241,0.04)]">
              <h3 className="text-[16px] font-semibold text-[#e2e2e8] mb-2">
                {l === 'id' ? 'Tertarik?' : 'Interested?'}
              </h3>
              <p className="text-[13px] leading-[1.6] text-[#908fa0] mb-5">
                {l === 'id'
                  ? 'Diskusikan kolaborasi atau partnership dengan kami.'
                  : 'Discuss collaboration or partnership opportunities.'}
              </p>
              <Link
                href={`/${l}/contact`}
                className="btn-primary w-full justify-center text-[13px] py-3"
              >
                {l === 'id' ? 'Hubungi Kami' : 'Contact Us'}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* RELATED PROJECTS */}
      <section className="border-t border-[rgba(255,255,255,0.06)] bg-[#0F1215]">
        <div className="section-container py-16">
          <h2 className="text-[22px] font-semibold text-[#e2e2e8] mb-8">
            {l === 'id' ? 'Proyek Lainnya' : 'Other Projects'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedProjects.map((p) => {
              const rv = STATUS_MAP[p.status] ?? 'development';
              return (
                <Link
                  key={p.id}
                  href={`/${l}/projects/${p.slug}`}
                  className="group p-6 rounded-xl
                             bg-[#161920] border border-[rgba(255,255,255,0.07)]
                             hover:border-[rgba(99,102,241,0.25)]
                             transition-all duration-300
                             hover:-translate-y-0.5"
                >
                  <div className="mb-3">
                    <StatusBadge variant={rv} label={p.status} />
                  </div>
                  <h3 className="text-[16px] font-semibold text-[#e2e2e8] mb-2
                                 group-hover:text-white transition-colors">
                    {p.title[l]}
                  </h3>
                  <p className="text-[13px] leading-[1.6] text-[#908fa0]">
                    {p.summary[l]}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
