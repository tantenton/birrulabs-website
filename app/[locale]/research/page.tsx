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

const STATUS_COLORS: Record<string, string> = {
  'Research': 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
  'Experimental': 'bg-pink-500/10 text-pink-400 border border-pink-500/20',
  'Prototype': 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
};

export default async function ResearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  const isID = l === 'id';

  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F0F2F5]">
      <section className="px-4 py-20 border-b border-[#2D3036]">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isID ? 'Research & Eksperimen' : 'Research & Experiments'}
          </h1>
          <p className="text-xl text-[#A3A6AC]">
            {isID
              ? 'Area penelitian dan eksperimen yang sedang kami eksplorasi.'
              : 'Research areas and experiments we are currently exploring.'}
          </p>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {EXPERIMENTS[l].map((exp) => (
            <div key={exp.title} className="p-6 rounded-xl bg-[#16191F] border border-[#2D3036]">
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_COLORS[exp.status]}`}>
                  {exp.status}
                </span>
              </div>
              <h2 className="text-xl font-semibold mb-3">{exp.title}</h2>
              <p className="text-[#A3A6AC] text-sm leading-relaxed mb-4">{exp.desc}</p>
              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 rounded bg-[#1A1D23] text-[#6C6F75]">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto mt-12 p-5 rounded-xl bg-indigo-500/5 border border-indigo-500/20">
          <p className="text-sm text-[#A3A6AC]">
            {isID
              ? '🔬 Semua eksperimen ini bersifat exploratory. Tidak semua akan menjadi product. Hasil research dipublikasikan melalui artikel dan build-in-public updates.'
              : '🔬 All these experiments are exploratory. Not all will become products. Research findings are published through articles and build-in-public updates.'}
          </p>
        </div>
      </section>
    </div>
  );
}
