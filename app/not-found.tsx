import Link from 'next/link';
import type { Locale } from '@/lib/translations';

interface NotFoundPageProps {
  params: Promise<{ locale: string }>;
}

export default async function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0C10] text-[#e2e2e8] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Terminal-style 404 */}
        <div className="inline-flex flex-col items-start gap-1 mb-12 font-mono text-[13px]
                        bg-[#161920] border border-[rgba(255,255,255,0.07)] rounded-xl
                        p-6 text-left w-full max-w-sm">
          <span className="text-[#10B981]">$ birru-agent --locate page</span>
          <span className="text-[#908fa0]">Scanning routes...</span>
          <span className="text-[#908fa0]">Checking cache...</span>
          <span className="text-[#EF4444]">ERROR: Route not found in manifest</span>
          <span className="text-[#908fa0]">Exit code: <span className="text-[#F59E0B]">404</span></span>
          <span className="text-[#908fa0] flex items-center gap-1">
            Status: <span className="text-[#EF4444]">MISSION_NOT_FOUND</span>
            <span className="inline-block w-2 h-4 bg-[#e2e2e8] ml-1 animate-pulse" aria-hidden="true" />
          </span>
        </div>

        <h1 className="text-[40px] md:text-[56px] leading-[1.05] tracking-[-0.02em]
                       font-bold text-[#e2e2e8] mb-4">
          Agent lost.
        </h1>
        <p className="text-[40px] md:text-[56px] leading-[1.05] tracking-[-0.02em]
                      font-bold text-gradient mb-8">
          Mission not found.
        </p>

        <p className="text-[17px] leading-[1.7] text-[#c7c4d7] mb-12 max-w-sm mx-auto">
          The page you are looking for does not exist or has been moved.
          Our agents are standing by.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/id"
            className="btn-primary justify-center"
          >
            Return to Base
          </Link>
          <Link
            href="/id/projects"
            className="btn-secondary justify-center"
          >
            View Projects
          </Link>
        </div>

        {/* Grid decoration */}
        <div
          className="absolute inset-0 bg-grid opacity-15 pointer-events-none -z-10"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 pointer-events-none -z-10"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.06), transparent)' }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
