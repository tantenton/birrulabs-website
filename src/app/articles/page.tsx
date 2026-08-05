'use client';

import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import Section from '@/components/Section';
import ArticleCard from '@/components/ArticleCard';
import { articles } from '@/data/articles';

export default function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(articles.map((a) => a.category)))];

  const filteredArticles =
    selectedCategory === 'all'
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  return (
    <MainLayout>
      {/* Hero Section */}
      <Section padding="large" bg="secondary" align="center">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Articles
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300">
            Read our latest articles and insights
          </p>
        </div>
      </Section>

      {/* Filter Section */}
      <Section padding="small">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* Articles Grid */}
      <Section padding="large">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                id={article.id}
                title={article.title}
                excerpt={article.excerpt}
                author={article.author}
                date={article.date}
                readTime={article.readTime}
                imageUrl={article.imageUrl}
                category={article.category}
                tags={article.tags}
              />
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-slate-600 dark:text-slate-300">
                No articles found in this category.
              </p>
            </div>
          )}
        </div>
      </Section>
    </MainLayout>
  );
}
