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
      iconColor: 'text-brand-primary',
      iconBg: 'bg-brand-primary/10',
      title: t.home.ai_agents_title,
      description: t.home.ai_agents_desc,
    },
    {
      icon: GitBranch,
      iconColor: 'text-brand-accent',
      iconBg: 'bg-brand-accent/10',
      title: t.home.automation_title,
      description: t.home.automation_desc,
    },
    {
      icon: Sparkles,
      iconColor: 'text-brand-warning',
      iconBg: 'bg-brand-warning/10',
      title: t.home.creative_title,
      description: t.home.creative_desc,
    },
  ];

  return (
    <section className="section-divider">
      <div className="section-container py-20 md:py-28">
        {/* Header */}
        <div className="mb-12">
          <p className="label-mono mb-3">Systems architecture</p>
          <h2 className="text-headline-lg text-text-primary">
            {t.home.what_we_build_title}
          </h2>
          <p className="text-body-md text-text-secondary mt-3 max-w-xl">
            {t.home.what_we_build_subtitle}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {capabilities.map((cap) => (
            <CapabilityCard key={cap.title} {...cap} />
          ))}
        </div>
      </div>
    </section>
  );
}
