import clsx from 'clsx';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  padding?: 'none' | 'small' | 'medium' | 'large';
  bg?: 'default' | 'secondary' | 'dark' | 'primary';
  align?: 'left' | 'center' | 'right';
}

const Section = ({
  children,
  className,
  containerClassName,
  padding = 'medium',
  bg = 'default',
  align = 'center',
}: SectionProps) => {
  const paddingClasses = {
    none: '',
    small: 'py-8',
    medium: 'py-16',
    large: 'py-24',
  };

  const bgClasses: Record<string, string> = {
    default: 'bg-white dark:bg-slate-900',
    secondary: 'bg-slate-50 dark:bg-slate-800',
    dark: 'bg-slate-900 text-white',
    primary: 'bg-primary-600 text-white',
  };

  const textAlignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <section className={clsx(paddingClasses[padding], bgClasses[bg], className)}>
      <div className={clsx('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', containerClassName, textAlignClasses[align])}>
        {children}
      </div>
    </section>
  );
};

export default Section;
