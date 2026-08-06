import { Search, Code2, CheckSquare } from 'lucide-react';
import type { Locale } from '@/lib/translations';

interface AgentOrchestrationProps {
  locale: Locale;
}

const AGENT_ROLES = ['Research', 'Product', 'Frontend', 'Backend', 'QA', 'Security', 'DevOps'];

const FEATURES = [
  {
    icon: Search,
    iconColor: 'text-[#6366F1]',
    titleId: 'Research & Konteks',
    titleEn: 'Research & Context',
    descId: 'Agent yang menjelajahi sumber data, mem-parsing dokumentasi, dan membangun landasan faktual.',
    descEn: 'Agents dedicated to traversing data sources, parsing documentation, and establishing factual grounding.',
  },
  {
    icon: Code2,
    iconColor: 'text-[#10B981]',
    titleId: 'Logika & Sintesis',
    titleEn: 'Logic & Synthesis',
    descId: 'Agent logika yang menulis kode, menghasilkan struktur, dan mensintesis data menjadi format yang actionable.',
    descEn: 'Specialized logic agents that write code, generate structures, and synthesize researched data into actionable formats.',
  },
  {
    icon: CheckSquare,
    iconColor: 'text-[#908fa0]',
    titleId: 'Validasi & QA',
    titleEn: 'Validation & QA',
    descId: 'Agent verifikasi independen yang memeriksa output terhadap kriteria sukses yang ketat.',
    descEn: 'Independent verifier agents that review outputs against strict success criteria before returning results.',
  },
];

export default function AgentOrchestration({ locale }: AgentOrchestrationProps) {
  const isId = locale === 'id';

  return (
    <section className="section-divider">
      <div className="section-container py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — static diagram */}
          <div
            className="relative h-[480px] w-full rounded-xl overflow-hidden
                       border border-[rgba(255,255,255,0.06)]
                       bg-[#161920] order-2 lg:order-1"
            aria-hidden="true"
          >
            {/* Grid bg */}
            <div className="absolute inset-0 bg-grid opacity-40" />

            {/* Corner label */}
            <div className="absolute top-4 left-4 z-10">
              <span className="font-mono text-[11px] text-[#908fa0]
                              bg-[rgba(10,12,16,0.9)] px-3 py-1.5 rounded
                              border border-[rgba(255,255,255,0.06)] backdrop-blur-sm">
                System.Schematic.01
              </span>
            </div>

            {/* Agent stack diagram */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8">
              {AGENT_ROLES.map((role, i) => (
                <div
                  key={role}
                  className="flex items-center gap-3 w-full max-w-xs"
                  style={{
                    transform: `translateX(${Math.sin(i * 0.6) * 16}px)`,
                    opacity: 1 - i * 0.06,
                  }}
                >
                  {/* Pulse dot */}
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-[#10B981] flex-shrink-0"
                    style={{
                      opacity: 0.5 + (AGENT_ROLES.length - i) * 0.07,
                    }}
                  />
                  {/* Bar */}
                  <div
                    className="flex-1 h-10 rounded-lg border border-[rgba(99,102,241,0.15)]
                               bg-[rgba(30,48,36,0.4)] backdrop-blur-sm
                               flex items-center px-4 gap-2
                               hover:border-[rgba(99,102,241,0.25)] transition-colors"
                  >
                    <span className="font-mono text-[13px] text-[#c7c4d7]">{role}</span>
                    <div className="ml-auto w-1 h-4 rounded-full bg-[rgba(16,185,129,0.5)]" />
                  </div>
                </div>
              ))}

              {/* Bottom connector */}
              <div className="w-px h-8 bg-gradient-to-b from-[rgba(99,102,241,0.25)] to-transparent mt-2" />
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[rgba(99,102,241,0.3)] to-transparent" />
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 inset-x-0 h-24
                            bg-gradient-to-t from-[#161920] to-transparent" />
          </div>

          {/* Right — text */}
          <div className="order-1 lg:order-2">
            <p className="label-mono mb-4">Agentic Systems</p>
            <h2 className="text-[32px] md:text-[40px] leading-[1.15] tracking-[-0.015em]
                           font-semibold text-[#e2e2e8] mb-5">
              {isId ? 'Orkestrasi Multi-Agent' : 'Agentic Orchestration'}
            </h2>
            <p className="text-[18px] leading-[1.65] text-[#c7c4d7] mb-12">
              {isId
                ? 'Kami merancang sistem multi-agent di mana persona AI yang terspesialisasi berkolaborasi untuk menyelesaikan tugas kompleks. Dengan memisahkan penalaran ke peran spesifik, kami mencapai keandalan lebih tinggi dan output yang deterministik.'
                : 'We design multi-agent systems where specialized AI personas collaborate to solve complex tasks. By segmenting reasoning into specific roles, we achieve higher reliability and deterministic outputs.'}
            </p>

            <div className="flex flex-col gap-8">
              {FEATURES.map(({ icon: Icon, iconColor, titleId, titleEn, descId, descEn }) => (
                <div key={titleEn} className="flex gap-4">
                  <div className="mt-0.5 flex-shrink-0">
                    <Icon className={`w-5 h-5 ${iconColor}`} aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-[16px] leading-[1.4] font-semibold text-[#e2e2e8] mb-1.5">
                      {isId ? titleId : titleEn}
                    </h4>
                    <p className="text-[14px] leading-[1.6] text-[#c7c4d7]">
                      {isId ? descId : descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
