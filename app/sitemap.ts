import { MetadataRoute } from 'next';

const BASE_URL = 'https://birrulabs.biz.id';
const locales = ['id', 'en'] as const;

const staticRoutes = [
  '',
  '/about',
  '/projects',
  '/articles',
  '/contact',
  '/startup',
  '/services',
  '/roadmap',
  '/privacy',
  '/terms',
  '/security',
];

const projectSlugs = [
  'affiloom',
  'birruhealthos',
  'social-media-ai-manager',
  'creative-factory',
  'birrua-ffhub',
  'ai-agent-orchestration',
];

const articleSlugs = [
  'why-ai-agents-need-orchestration',
  'building-human-in-the-loop',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.8,
      });
    }

    for (const slug of projectSlugs) {
      entries.push({
        url: `${BASE_URL}/${locale}/projects/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }

    for (const slug of articleSlugs) {
      entries.push({
        url: `${BASE_URL}/${locale}/articles/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return entries;
}
