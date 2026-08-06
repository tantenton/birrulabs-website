import type { Metadata } from 'next';
import type { Locale } from '@/lib/translations';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Research & Experiments | BirruLabs',
    description: 'BirruLabs research areas and experimental projects.',
  };
}

const EXPERIMENTS: Record<Locale, { title: string; status: string; desc: string; tags: string[] }[]> = {
  id: [
    {
      title: 'AI Agent Consensus Mechanism',
      status: 'Research',
      desc: 'Eksplorasi voting mechanism untuk multi-agent decision making. Bagaimana multiple agents mencapai consensus tanpa single point of failure.',
      tags: ['multi-agent', 'consensus', 'distributed-systems'],
    },
    {
      title: 'Local LLM Inference',
      status: 'Experimental',
      desc: 'Menjalankan LLM secara lokal (llama.cpp, Ollama) untuk offline use cases. Trade-off antara performa, ukuran model, dan hardware requirements.',
      tags: ['llm', 'local-first', 'inference'],
    },
    {
      title: 'Browser-Based Computer Use',
      status: 'Experimental',
      desc: 'Menggunakan AI untuk mengotomasi browser tanpa API. Pendekatan alternatif untuk platform yang tidak punya API.',
      tags: ['computer-use', 'browser-automation', 'ai-agents'],
    },
    {
      title: 'Offline Viral Clipper (OVC)',
      status: 'Prototype',
      desc: 'Tool untuk memotong video menjadi short-form content secara offline. Tidak butuh internet atau cloud processing.',
      tags: ['video', 'local-first', 'content-creation'],
    },
  ],
  en: [
    {
      title: 'AI Agent Consensus Mechanism',
      status: 'Research',
      desc: 'Exploring voting mechanisms for multi-agent decision making. How multiple agents reach consensus without a single point of failure.',
      tags: ['multi-agent', 'consensus', 'distributed-systems'],
    },
    {
      title: 'Local LLM Inference',
      status: 'Experimental',
      desc: 'Running LLMs locally (llama.cpp, Ollama) for offline use cases. Trade-offs between performance, model size, and hardware requirements.',
      tags: ['llm', 'local-first', 'inference'],
    },
    {
      title: 'Browser-Based Computer Use',
      status: 'Experimental',
      desc: 'Using AI to automate browsers without APIs. Alternative approach for platforms that lack APIs.',
      tags: ['computer-use', 'browser-automation', 'ai-agents'],
    },
    {
      title: 'Offline Viral Clipper (OVC)',
      status: 'Prototype',
      desc: 'Tool for cutting videos into short-form content offline. No internet or cloud processing required.',
      tags: ['video', 'local-first', 'content-creation'],
    },
  ],
};

export default async function ResearchPage({ params }: { params: Promise<{ locale: string }> }) {
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
            {isID ? 'Research & Eksperimen' : 'Research & Experiments'}
          </h1>
          <p className="text-[20px] leading-[1.65] text-[#c7c4d7] max-w-2xl">
            {isID
              ? 'Area penelitian dan eksperimen yang sedang kami eksplorasi.'
              : 'Research areas and experiments we are currently exploring.'}
          </p>
        </div>
      </section>

      <section className="section-container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {EXPERIMENTS[l].map((exp) => (
            <div
              key={exp.title}
              className="rounded-xl bg-[#161920] border border-[rgba(255,255,255,0.07)]
                        hover:border-[rgba(99,102,241,0.3)] transition-all duration-300 p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-[11px] font-medium tracking-[0.12em] uppercase text-[#6366F1] border
                                 border-[rgba(99,102,241,0.3)] bg-[rgba(99,102,241,0.1)] px-2.5 py-1 rounded">
                  {exp.status}
                </span>
              </div>
              <h2 className="text-[20px] leading-[1.3] font-semibold text-[#e2e2e8] mb-3">{exp.title}</h2>
              <p className="text-[14px] leading-[1.7] text-[#c7c4d7] mb-5">{exp.desc}</p>
              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] tracking-[0.03em] text-[#908fa0]
                              bg-[rgba(10,12,16,0.6)] border border-[rgba(255,255,255,0.08)]
                              px-2.5 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-12 p-6 rounded-xl bg-[#0F1215] border border-[rgba(99,102,241,0.2)]
                        font-mono text-[12px] text-[#908fa0] tracking-[0.02em]">
          {isID
            ? 'Semua eksperimen ini bersifat exploratory. Tidak semua akan menjadi product. Hasil research dipublikasikan melalui artikel dan build-in-public updates.'
            : 'All these experiments are exploratory. Not all will become products. Research findings are published through articles and build-in-public updates.'}
        </div>
      </section>
    </div>
  );
}
