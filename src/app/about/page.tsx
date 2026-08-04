import MainLayout from '@/layouts/MainLayout';
import Section from '@/components/Section';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations();

  const values = [
    {
      title: 'Innovation',
      description: 'We continuously explore new technologies and approaches to solve complex problems.',
      icon: '💡',
    },
    {
      title: 'Excellence',
      description: 'We strive for perfection in every project we undertake.',
      icon: '⭐',
    },
    {
      title: 'Integrity',
      description: 'We maintain the highest ethical standards in all our business relationships.',
      icon: '🛡️',
    },
    {
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and open communication.',
      icon: '🤝',
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <Section padding="large" bg="primary" align="center">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t('about.title')}
          </h1>
          <p className="text-lg md:text-xl text-primary-100 leading-relaxed">
            {t('about.intro')}
          </p>
        </div>
      </Section>

      {/* About Content */}
      <Section padding="large">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
            {t('about.mission')}
          </h2>
          <div className="prose prose-lg dark:prose-invert text-slate-600 dark:text-slate-300 mb-16">
            <p className="leading-relaxed">
              Our mission is to empower businesses through innovative technology solutions. We believe that
              technology should be accessible, scalable, and aligned with your business goals.
            </p>
            <p className="mt-4 leading-relaxed">
              With over a decade of experience in the tech industry, we've helped businesses of all sizes
              transform their digital presence and achieve remarkable growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                {t('about.vision')}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                To be the leading technology solutions provider, known for delivering exceptional value
                and driving innovation in every project we undertake.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                {t('about.values')}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Our core values guide everything we do. We believe in delivering excellence, maintaining
                integrity, fostering innovation, and building strong partnerships with our clients.
              </p>
            </div>
          </div>

          {/* Values Grid */}
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div key={index} className="flex items-start space-x-4">
                <span className="text-3xl">{value.icon}</span>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {value.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </MainLayout>
  );
}
