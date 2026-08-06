import { Search, Code2, CheckSquare, ArrowRight, Cpu } from 'lucide-react';
import type { Locale } from '@/lib/translations';

interface AgentOrchestrationProps {
  locale: Locale;
}

const AGENTS = [
  { id: 'research',  label: 'Research',  status: 'active',    color: '#10B981', delay: '0s' },
  { id: 'product',   label: 'Product',   status: 'planning',  color: '#6366F1', delay: '0.3s' },
  { id: 'frontend',  label: 'Frontend',  status: 'building',  color: '#F59E0B', delay: '0.6s' },
  { id: 'qa',        label: 'QA',        status: 'verifying', color: '#8B5CF6', delay: '0.9s' },
  { id: 'deploy',    label: 'Deploy',    status: 'ready',     color: '#06B6D4', delay: '1.2s' },
];

const STATUS_COLOR: Record<string, string> = {
  active:    '#10B981',
  planning:  '#6366F1',
  building:  '#F59E0B',
  verifying: '#8B5CF6',
  ready:     '#06B6D4',
};

const WORKFLOW = [
  { step: '01', label: 'Research',  icon: Search },
  { step: '02', label: 'Design',    icon: Cpu },
  { step: '03', label: 'Build',     icon: Code2 },
  { step: '04', label: 'Verify',    icon: CheckSquare },
  { step: '05', label: 'Ship',      icon: ArrowRight },
];

export default function AgentOrchestration({ locale }: AgentOrchestrationProps) {
  const isID = locale === 'id';

  return (
    <section className="py-24 md:py-32 section-divider">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <div>
            <p className="label-mono mb-4">Agentic Systems</p>
            <h2 className="text-[32px] md:text-[40px] leading-[1.15] tracking-[-0.015em]
                           font-semibold text-[#e2e2e8] mb-6">
              {isID ? 'Orkestrasi Multi-Agent' : 'Multi-Agent Orchestration'}
            </h2>
            <p className="text-[16px] leading-[1.75] text-[#c7c4d7] mb-8">
              {isID
                ? 'Setiap workflow dijalankan oleh agen yang terspesialisasi. CEO orchestrator mendelegasikan ke worker agents — research, engineering, QA, publishing — dengan human-in-the-loop approval di setiap checkpoint kritis.'
                : 'Every workflow is run by specialized agents. The CEO orchestrator delegates to worker agents — research, engineering, QA, publishing — with human-in-the-loop approval at every critical checkpoint.'}
            </p>

            {/* Workflow steps */}
            <div className="flex items-center gap-0 flex-wrap">
              {WORKFLOW.map(({ step, label, icon: Icon }, i) => (
                <div key={step} className="flex items-center">
                  <div className="flex flex-col items-center gap-1.5 group">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center
                                    bg-[rgba(99,102,241,0.08)] border border-[rgba(99,102,241,0.2)]
                                    group-hover:bg-[rgba(99,102,241,0.16)] group-hover:border-[rgba(99,102,241,0.4)]
                                    transition-all duration-200">
                      <Icon className="w-4 h-4 text-[#6366F1]" aria-hidden="true" />
                    </div>
                    <span className="font-mono text-[10px] text-[#908fa0] tracking-[0.06em]">{label}</span>
                  </div>
                  {i < WORKFLOW.length - 1 && (
                    <div className="w-6 h-px bg-[rgba(99,102,241,0.25)] mx-1 mb-5" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right — live orchestration diagram */}
          <div
            className="relative h-[360px] rounded-xl overflow-hidden
                       bg-[#161920] border border-[rgba(255,255,255,0.08)]
                       shadow-[0_0_40px_rgba(99,102,241,0.08)]"
            aria-label="Agent orchestration diagram"
            role="img"
          >
            <div className="absolute inset-0 bg-grid opacity-30" aria-hidden="true" />
            <div
              className="absolute inset-0"
              style={{ background: 'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.08), transparent 70%)' }}
              aria-hidden="true"
            />

            {/* CEO Orchestrator center */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Connection lines SVG */}
              <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                {AGENTS.map(({ id, color }, i) => {
                  const angle = (i / AGENTS.length) * 2 * Math.PI - Math.PI / 2;
                  const r = 110;
                  const cx = 50, cy = 50;
                  const x2 = cx + Math.cos(angle) * (r / 3.6);
                  const y2 = cy + Math.sin(angle) * (r / 3.0);
                  return (
                    <line
                      key={id}
                      x1="50%" y1="50%"
                      x2={`${x2}%`} y2={`${y2}%`}
                      stroke={color}
                      strokeOpacity="0.2"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                  );
                })}
              </svg>

              {/* CEO node */}
              <div
                className="relative z-10 flex flex-col items-center justify-center
                            w-20 h-20 rounded-xl
                            bg-[rgba(99,102,241,0.15)]
                            border-2 border-[rgba(99,102,241,0.45)]
                            shadow-[0_0_32px_rgba(99,102,241,0.35)]"
                style={{ animation: 'pulse 3s ease-in-out infinite' }}
              >
                <Cpu className="w-7 h-7 text-[#6366F1]" aria-hidden="true" />
                <span className="font-mono text-[9px] text-[#6366F1] tracking-widest mt-1 font-semibold">CEO</span>
              </div>

              {/* Worker agents */}
              {AGENTS.map(({ id, label, status, color, delay }, i) => {
                const angle = (i / AGENTS.length) * 2 * Math.PI - Math.PI / 2;
                const r = 130;
                const x = Math.cos(angle) * r;
                const y = Math.sin(angle) * r;
                return (
                  <div
                    key={id}
                    className="absolute z-10 flex flex-col items-center gap-1.5"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: 'translate(-50%, -50%)',
                      animation: `pulse 3s ease-in-out infinite`,
                      animationDelay: delay,
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex flex-col items-center justify-center
                                 border-2 transition-all duration-300 hover:scale-110"
                      style={{
                        backgroundColor: `${color}18`,
                        borderColor: `${color}40`,
                        boxShadow: `0 0 20px ${color}25`,
                      }}
                    >
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} aria-hidden="true" />
                    </div>
                    <span className="font-mono text-[10px] text-[#c7c4d7] whitespace-nowrap font-medium">{label}</span>
                    <span
                      className="font-mono text-[9px] px-1.5 py-0.5 rounded"
                      style={{
                        color: STATUS_COLOR[status],
                        backgroundColor: `${STATUS_COLOR[status]}18`,
                        border: `1px solid ${STATUS_COLOR[status]}30`,
                      }}
                    >
                      {status}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Corner label */}
            <div className="absolute top-4 left-4 z-20">
              <span className="font-mono text-[11px] text-[#c7c4d7]
                              bg-[rgba(10,12,16,0.9)] px-3 py-1.5 rounded
                              border border-[rgba(99,102,241,0.2)] backdrop-blur-sm">
                {isID ? '// sistem aktif (simulasi visual)' : '// system active (visual simulation)'}
              </span>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 inset-x-0 h-16
                            bg-gradient-to-t from-[#161920] to-transparent" aria-hidden="true" />
          </div>

        </div>
      </div>
    </section>
  );
}
