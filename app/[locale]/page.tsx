import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <div className="container mx-auto px-4 py-16">
      <section className="mb-24">
        <h1 className="mb-6 text-5xl font-bold tracking-tight lg:text-7xl">
          {t('hero.title')}
        </h1>
        <p className="mb-8 text-xl text-muted-foreground lg:text-2xl">
          {t('hero.subtitle')}
        </p>
        <div className="flex gap-4">
          <a
            href="#projects"
            className="rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90"
          >
            {t('hero.cta_primary')}
          </a>
          <a
            href="#about"
            className="rounded-lg border px-6 py-3 font-semibold hover:bg-accent"
          >
            {t('hero.cta_secondary')}
          </a>
        </div>
      </section>

      <section id="about" className="mb-24">
        <h2 className="mb-6 text-3xl font-bold">{t('about.title')}</h2>
        <p className="text-lg text-muted-foreground">
          {t('about.description')}
        </p>
      </section>

      <section id="projects" className="mb-24">
        <h2 className="mb-6 text-3xl font-bold">{t('projects.title')}</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border p-6">
            <h3 className="mb-2 text-xl font-semibold">
              Social Media AI Manager
            </h3>
            <p className="text-muted-foreground">
              Multi-agent system for content research, planning, writing, and
              publishing.
            </p>
          </div>
          <div className="rounded-lg border p-6">
            <h3 className="mb-2 text-xl font-semibold">Affiloom</h3>
            <p className="text-muted-foreground">
              Affiliate content automation with product-content workflow.
            </p>
          </div>
          <div className="rounded-lg border p-6">
            <h3 className="mb-2 text-xl font-semibold">Creative Factory</h3>
            <p className="text-muted-foreground">
              Automated pipeline for image, video, and voice-over generation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
