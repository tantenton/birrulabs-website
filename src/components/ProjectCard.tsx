import Link from 'next/link';
import clsx from 'clsx';
import { ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  tags?: string[];
  className?: string;
}

const ProjectCard = ({
  id,
  title,
  description,
  category,
  imageUrl,
  tags = [],
  className,
}: ProjectCardProps) => {
  const categoryColors: Record<string, string> = {
    web: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    mobile: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    cloud: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    ai: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    default: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  };

  const categoryStyle = categoryColors[category.toLowerCase()] || categoryColors.default;

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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryStyle}`}>
            {category}
          </span>
          <Link href={`/projects/${id}`} className="text-slate-400 hover:text-primary-600 transition-colors">
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
          {title}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-4 flex-1">
          {description}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex px-2 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
