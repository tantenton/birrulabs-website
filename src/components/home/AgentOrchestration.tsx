import { Search, Code2, CheckSquare } from 'lucide-react';
import type { Locale } from '@/lib/translations';

interface AgentOrchestrationProps {
  locale: Locale;
}

const AGENT_ROLES = ['Research', 'Product', 'Frontend', 'Backend', 'QA', 'Security', 'DevOps'];

const FEATURES = [
  {
    icon: Search,
    iconColor: 'text-brand-primary',
    titleId: 'Research & Konteks',
    titleEn: 'Research & Context',
    descId: 'Agent yang menjelajahi sumber data, mem-parsing dokumentasi, dan membangun landasan faktual.',
    descEn: 'Agents dedicated to traversing data sources, parsing documentation, and establishing factual grounding.',
  },
  {
    icon: Code2,
    iconColor: 'text-brand-accent',
    titleId: 'Logika & Sintesis',
    titleEn: 'Logic & Synthesis',
    descId: 'Agent logika yang menulis kode, menghasilkan struktur, dan mensintesis data menjadi format yang actionable.',
    descEn: 'Specialized logic agents that write code, generate structures, and synthesize researched data into actionable formats.',
  },
  {
    icon: CheckSquare,
    iconColor: 'text-text-tertiary',
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
      <div className="section-container py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — static diagram */}
          <div
            className="relative h-[420px] w-full rounded-xl overflow-hidden
                       border border-border-subtle bg-surface-elevated order-2 lg:order-1"
            aria-hidden="true"
          >
            {/* Grid bg */}
            <div className="absolute inset-0 bg-grid opacity-40" />

            {/* Corner label */}
            <div className="absolute top-4 left-4 z-10">
              <span className="font-mono text-code-label text-text-tertiary
                              bg-surface/90 px-3 py-1.5 rounded border border-border-subtle backdrop-blur-sm">
                System.Schematic.01
              </span>
            </div>

            {/* Agent stack diagram */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pt-10">
              {AGENT_ROLES.map((role, i) => (
                <div
                  key={role}
                  className="flex items-center gap-3 w-56"
                  style={{
                    transform: `translateX(${Math.sin(i * 0.7) * 12}px)`,
                    opacity: 1 - i * 0.08,
                  }}
                >
                  {/* Pulse dot */}
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-accent flex-shrink-0"
                    style={{ opacity: 0.4 + (AGENT_ROLES.length - i) * 0.08 }}
                  />
                  {/* Bar */}
                  <div
                    className="flex-1 h-8 rounded border border-brand-primary/15
                               bg-surface-container/60 backdrop-blur-sm
                               flex items-center px-3 gap-2"
                  >
                    <span className="font-mono text-code-label text-text-secondary">{role}</span>
                    <div className="ml-auto w-1 h-3 rounded-full bg-brand-accent/40" />
                  </div>
                </div>
              ))}

              {/* Bottom connector */}
              <div className="w-px h-6 bg-gradient-to-b from-brand-primary/20 to-transparent mt-1" />
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent" />
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 inset-x-0 h-20
                            bg-gradient-to-t from-surface-elevated to-transparent" />
          </div>

          {/* Right — text */}
          <div className="order-1 lg:order-2">
            <p className="label-mono mb-4">Agentic Systems</p>
            <h2 className="text-headline-lg text-text-primary mb-6">
              {isId ? 'Orkestrasi Multi-Agent' : 'Agentic Orchestration'}
            </h2>
            <p className="text-body-lg text-text-secondary mb-10 leading-relaxed">
              {isId
                ? 'Kami merancang sistem multi-agent di mana persona AI yang terspesialisasi berkolaborasi untuk menyelesaikan tugas kompleks. Dengan memisahkan penalaran ke peran spesifik, kami mencapai keandalan lebih tinggi dan output yang deterministik.'
                : 'We design multi-agent systems where specialized AI personas collaborate to solve complex tasks. By segmenting reasoning into specific roles, we achieve higher reliability and deterministic outputs.'}
            </p>

            <div className="flex flex-col gap-6">
              {FEATURES.map(({ icon: Icon, iconColor, titleId, titleEn, descId, descEn }) => (
                <div key={titleEn} className="flex gap-4">
                  <div className="mt-0.5 flex-shrink-0">
                    <Icon className={`w-5 h-5 ${iconColor}`} aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-body-md font-semibold text-text-primary mb-1">
                      {isId ? titleId : titleEn}
                    </h4>
                    <p className="text-body-sm text-text-secondary leading-relaxed">
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
