import { Bot, GitBranch, Sparkles } from 'lucide-react';
import CapabilityCard from './CapabilityCard';
import type { Locale } from '@/lib/translations';
import { getT } from '@/lib/translations';

interface CoreCapabilitiesProps {
  locale: Locale;
}

export default function CoreCapabilities({ locale }: CoreCapabilitiesProps) {
  const t = getT(locale);

  const capabilities = [
    {
      icon: Bot,
      iconColor: 'text-[#6366F1]',
      iconBg: 'bg-[rgba(99,102,241,0.1)]',
      title: t.home.ai_agents_title,
      description: t.home.ai_agents_desc,
    },
    {
      icon: GitBranch,
      iconColor: 'text-[#10B981]',
      iconBg: 'bg-[rgba(16,185,129,0.1)]',
      title: t.home.automation_title,
      description: t.home.automation_desc,
    },
    {
      icon: Sparkles,
      iconColor: 'text-[#F59E0B]',
      iconBg: 'bg-[rgba(245,158,11,0.1)]',
      title: t.home.creative_title,
      description: t.home.creative_desc,
    },
  ];

  return (
    <section className="section-divider">
      <div className="section-container py-24 md:py-32">
        {/* Header */}
        <div className="mb-16">
          <p className="label-mono mb-4">Systems architecture</p>
          <h2 className="text-[32px] md:text-[40px] leading-[1.15] tracking-[-0.015em]
                         font-semibold text-[#e2e2e8] mb-4 max-w-xl">
            {t.home.what_we_build_title}
          </h2>
          <p className="text-[16px] leading-[1.6] text-[#c7c4d7] max-w-lg">
            {t.home.what_we_build_subtitle}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {capabilities.map((cap) => (
            <CapabilityCard key={cap.title} {...cap} />
          ))}
        </div>
      </div>
    </section>
  );
}
