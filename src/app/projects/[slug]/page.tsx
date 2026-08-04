import { notFound } from 'next/navigation';

const PROJECTS = [
  {
    slug: 'project-alpha',
    title: 'Project Alpha',
    description: 'A comprehensive enterprise solution built with modern technologies.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
  },
  {
    slug: 'project-beta',
    title: 'Project Beta',
    description: 'High-performance data processing platform for real-time analytics.',
    techStack: ['Go', 'Kafka', 'Redis', 'AWS'],
  },
];

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{project.description}</p>
          
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
