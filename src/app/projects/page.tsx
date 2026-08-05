'use client';

import MainLayout from '@/layouts/MainLayout';
import Section from '@/components/Section';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';
import { useTranslations } from 'next-intl';

type Category = 'all' | 'web' | 'mobile' | 'cloud';

export default function ProjectsPage() {
  const t = useTranslations();
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  const categories: { label: string; value: Category }[] = [
    { label: t('projects.categories.all'), value: 'all' },
    { label: t('projects.categories.web'), value: 'web' },
    { label: t('projects.categories.mobile'), value: 'mobile' },
    { label: t('projects.categories.cloud'), value: 'cloud' },
  ];

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <MainLayout>
      {/* Hero Section */}
      <Section padding="large" bg="secondary" align="center">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            {t('projects.title')}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300">
            {t('projects.subtitle')}
          </p>
        </div>
      </Section>

      {/* Filter Section */}
      <Section padding="small">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.value
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* Projects Grid */}
      <Section padding="large">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                category={project.category}
                imageUrl={project.imageUrl}
                tags={project.tags}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-slate-600 dark:text-slate-300">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </Section>
    </MainLayout>
  );
}
