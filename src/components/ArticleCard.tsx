import Link from 'next/link';
import clsx from 'clsx';
import { ArrowRight, Calendar, User } from 'lucide-react';

interface ArticleCardProps {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: number;
  imageUrl: string;
  category?: string;
  tags?: string[];
  className?: string;
}

const ArticleCard = ({
  id,
  title,
  excerpt,
  author,
  date,
  readTime,
  imageUrl,
  category,
  tags = [],
  className,
}: ArticleCardProps) => {
  return (
    <div
      className={clsx(
        'group flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-sm hover:shadow-xl transition-all duration-300',
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {category && (
          <div className="mb-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
              {category}
            </span>
          </div>
        )}

        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
          <Link href={`/articles/${id}`} className="inline-block">
            {title}
          </Link>
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 mb-4 flex-1">
          {excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center space-x-1">
            <User className="w-3 h-3" />
            <span>{author}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>{readTime} min read</span>
          </div>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/articles?tag=${tag}`}
                className="inline-flex px-2 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleCard;
