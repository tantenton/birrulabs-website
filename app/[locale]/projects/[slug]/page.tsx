import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { PROJECTS } from '@/data/projects';
import { getT } from '@/lib/translations';
import type { Locale } from '@/lib/translations';

const STATUS_COLORS: Record<string, string> = {
  'Internal Alpha': 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  'Prototype': 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
  'In Development': 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  'Research': 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
  'Pilot': 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
  'Experimental': 'bg-pink-500/10 text-pink-400 border border-pink-500/20',
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

  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F0F2F5]">
      
      {/* BREADCRUMB */}
      <section className="px-4 py-6 border-b border-[#2D3036]">
        <div className="max-w-4xl mx-auto">
          <Link
            href={`/${l}/projects`}
            className="inline-flex items-center gap-2 text-[#A3A6AC] hover:text-[#F0F2F5] text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            {l === 'id' ? 'Kembali ke Proyek' : 'Back to Projects'}
          </Link>
        </div>
      </section>

      {/* HEADER */}
      <section className="px-4 py-16 border-b border-[#2D3036]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-3 mb-6 flex-wrap">
            <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${STATUS_COLORS[project.status]}`}>
              {project.status}
            </span>
            <span className="text-xs px-3 py-1.5 rounded-full bg-[#1A1D23] text-[#6C6F75] border border-[#2D3036]">
              {project.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{project.title[l]}</h1>
          <p className="text-xl text-[#A3A6AC] leading-relaxed mb-8">{project.summary[l]}</p>
        </div>
      </section>

      {/* DESCRIPTION */}
      <section className="px-4 py-12 border-b border-[#2D3036]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">{l === 'id' ? 'Tentang Proyek' : 'About the Project'}</h2>
          <p className="text-[#A3A6AC] text-lg leading-relaxed">{project.description[l]}</p>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="px-4 py-12 border-b border-[#2D3036]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">{t.common.tech_stack}</h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-lg bg-[#16191F] border border-[#2D3036] text-[#A3A6AC] text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-4 py-12 border-b border-[#2D3036]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">{t.common.features}</h2>
          <ul className="space-y-4">
            {project.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 p-4 rounded-lg bg-[#16191F] border border-[#2D3036]">
                <span className="text-indigo-400 mt-0.5 flex-shrink-0">✓</span>
                <span className="text-[#A3A6AC] leading-relaxed">{feature[l]}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="px-4 py-12 border-b border-[#2D3036]">
        <div className="max-w-4xl mx-auto">
          <div className="p-5 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
            <p className="text-sm text-yellow-200/80 leading-relaxed">
              {l === 'id'
                ? `Status: ${project.status}. Proyek ini masih dalam tahap pengembangan. Tidak ada klaim palsu tentang pengguna, revenue, atau partnership. Semua informasi yang ditampilkan adalah factual.`
                : `Status: ${project.status}. This project is still under development. No false claims about users, revenue, or partnerships. All information displayed is factual.`}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">
            {l === 'id' ? 'Tertarik dengan proyek ini?' : 'Interested in this project?'}
          </h2>
          <p className="text-[#A3A6AC] mb-8">
            {l === 'id'
              ? 'Hubungi kami untuk diskusi lebih lanjut tentang kolaborasi atau partnership.'
              : 'Contact us to discuss collaboration or partnership opportunities.'}
          </p>
          <Link
            href={`/${l}/contact`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors min-h-[48px]"
          >
            {l === 'id' ? 'Hubungi Kami' : 'Contact Us'}
          </Link>
        </div>
      </section>

      {/* RELATED PROJECTS */}
      <section className="px-4 py-12 bg-[#16191F] border-t border-[#2D3036]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-6">
            {l === 'id' ? 'Proyek Lainnya' : 'Other Projects'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROJECTS.filter((p) => p.id !== project.id)
              .slice(0, 2)
              .map((p) => (
                <Link
                  key={p.id}
                  href={`/${l}/projects/${p.slug}`}
                  className="group p-5 rounded-lg bg-[#0F1115] border border-[#2D3036] hover:border-indigo-500/40 transition-all"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_COLORS[p.status]}`}>
                      {p.status}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-indigo-400 transition-colors">
                    {p.title[l]}
                  </h3>
                  <p className="text-sm text-[#A3A6AC] leading-relaxed">{p.summary[l]}</p>
                </Link>
              ))}
          </div>
        </div>
      </section>

    </div>
  );
}
