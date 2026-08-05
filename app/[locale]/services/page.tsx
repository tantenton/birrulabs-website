import type { Metadata } from 'next';
import type { Locale } from '@/lib/translations';
import { Bot, Zap, Sparkles, Shield, Code2, Cpu } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Services | BirruLabs',
    description: 'BirruLabs capabilities and services — AI agents, automation, creative pipelines.',
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const isID = l === 'id';

  const services = [
    {
      icon: Bot,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
      title: isID ? 'AI Agent Orchestration' : 'AI Agent Orchestration',
      desc: isID
        ? 'Membangun multi-agent systems dengan CEO orchestrator pattern. Research, creative, QC, dan publishing agents yang bekerja terkoordinasi.'
        : 'Building multi-agent systems with CEO orchestrator pattern. Research, creative, QC, and publishing agents working in coordination.',
      items: isID
        ? ['CEO orchestrator design', 'Worker agent development', 'Task queue & state management', 'Human-in-the-loop approval']
        : ['CEO orchestrator design', 'Worker agent development', 'Task queue & state management', 'Human-in-the-loop approval'],
    },
    {
      icon: Zap,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      title: isID ? 'Automation Workflows' : 'Automation Workflows',
      desc: isID
        ? 'Social media automation, affiliate content automation, dan custom workflow untuk bisnis. End-to-end dari research hingga publishing.'
        : 'Social media automation, affiliate content automation, and custom workflows for businesses. End-to-end from research to publishing.',
      items: isID
        ? ['Social media content pipeline', 'Affiliate automation', 'Content approval workflow', 'Scheduled publishing']
        : ['Social media content pipeline', 'Affiliate automation', 'Content approval workflow', 'Scheduled publishing'],
    },
    {
      icon: Sparkles,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      title: isID ? 'Creative Pipelines' : 'Creative Pipelines',
      desc: isID
        ? 'Pipeline generatif untuk gambar, video, dan voice-over dengan quality control dan approval workflow.'
        : 'Generative pipelines for images, video, and voice-over with quality control and approval workflow.',
      items: isID
        ? ['Image generation (FAL/Replicate)', 'Video generation & clipping', 'Voice-over generation', 'QC & asset delivery']
        : ['Image generation (FAL/Replicate)', 'Video generation & clipping', 'Voice-over generation', 'QC & asset delivery'],
    },
    {
      icon: Code2,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      title: isID ? 'Local-First Software' : 'Local-First Software',
      desc: isID
        ? 'Business software yang berjalan offline dengan sync opsional ke cloud. Cocok untuk area koneksi tidak stabil.'
        : 'Business software that runs offline with optional cloud sync. Ideal for areas with unstable connectivity.',
      items: isID
        ? ['Offline-first architecture', 'SQLite local storage', 'Optional PostgreSQL sync', 'ERP & operational tools']
        : ['Offline-first architecture', 'SQLite local storage', 'Optional PostgreSQL sync', 'ERP & operational tools'],
    },
    {
      icon: Shield,
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      title: isID ? 'Security Consulting' : 'Security Consulting',
      desc: isID
        ? 'Security review, threat modeling, dan implementasi security controls untuk aplikasi web dan AI systems.'
        : 'Security review, threat modeling, and security controls implementation for web applications and AI systems.',
      items: isID
        ? ['Security headers audit', 'Dependency scanning', 'Input validation review', 'CSP & rate limiting setup']
        : ['Security headers audit', 'Dependency scanning', 'Input validation review', 'CSP & rate limiting setup'],
    },
    {
      icon: Cpu,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      title: isID ? 'AI Infrastructure' : 'AI Infrastructure',
      desc: isID
        ? 'Setup dan optimasi infrastruktur untuk AI workloads: model serving, vector stores, embedding pipelines, dan monitoring.'
        : 'Setup and optimization of infrastructure for AI workloads: model serving, vector stores, embedding pipelines, and monitoring.',
      items: isID
        ? ['LLM API integration', 'Vector store setup', 'Embedding pipelines', 'Cost optimization']
        : ['LLM API integration', 'Vector store setup', 'Embedding pipelines', 'Cost optimization'],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F0F2F5]">
      <section className="px-4 py-20 border-b border-[#2D3036]">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isID ? 'Layanan & Kapabilitas' : 'Services & Capabilities'}
          </h1>
          <p className="text-xl text-[#A3A6AC]">
            {isID
              ? 'Apa yang bisa kami bangun bersama Anda.'
              : 'What we can build together with you.'}
          </p>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, color, bg, title, desc, items }) => (
            <div key={title} className="p-6 rounded-xl bg-[#16191F] border border-[#2D3036] hover:border-indigo-500/30 transition-colors">
              <div className={`inline-flex p-3 rounded-lg ${bg} mb-4`}>
                <Icon className={`w-6 h-6 ${color}`} aria-hidden="true" />
              </div>
              <h2 className="text-lg font-semibold mb-3">{title}</h2>
              <p className="text-[#A3A6AC] text-sm leading-relaxed mb-4">{desc}</p>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#6C6F75]">
                    <span className="text-indigo-400 mt-0.5">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">
            {isID ? 'Tertarik Bekerja Sama?' : 'Interested in Working Together?'}
          </h2>
          <p className="text-[#A3A6AC] mb-8">
            {isID
              ? 'Kami terbuka untuk kolaborasi, pilot project, dan custom development.'
              : 'We are open to collaboration, pilot projects, and custom development.'}
          </p>
          <a
            href={`/${l}/contact`}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors min-h-[48px]"
          >
            {isID ? 'Hubungi Kami' : 'Contact Us'}
          </a>
        </div>
      </section>
    </div>
  );
}
