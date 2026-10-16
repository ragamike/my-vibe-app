export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-amber-500 selection:text-zinc-950 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30 text-amber-400">
              {/* Camera Aperture / Lens Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
                <line x1="9.69" y1="8" x2="21.17" y2="8" />
                <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
                <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
                <line x1="14.31" y1="16" x2="2.83" y2="16" />
                <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
              </svg>
            </div>
            <div>
              <span className="text-sm font-semibold tracking-wider uppercase text-zinc-200">
                Strags Studio
              </span>
              <span className="block text-xs text-zinc-500 font-mono">
                Creative Command Center
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Workspace Active
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12 md:py-16 flex flex-col gap-12">
        {/* Hero Welcome Section */}
        <div className="relative overflow-hidden rounded-3xl border border-zinc-800/90 bg-gradient-to-b from-zinc-900/90 via-zinc-900/40 to-zinc-950 p-8 md:p-14">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(245,158,11,0.12),rgba(255,255,255,0))] pointer-events-none" />

          <div className="relative z-10 max-w-3xl flex flex-col gap-5">
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/60 text-xs font-medium text-zinc-300">
              <span className="text-amber-400">●</span> Production & Portfolio HQ
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Strags Photography and Videography Hub
            </h1>

            <p className="text-base md:text-xl text-zinc-400 leading-relaxed max-w-2xl">
              Welcome to your creative headquarters. Track work in progress,
              curate and showcase finished work, take on new creative challenges,
              and cultivate bold visual ideas.
            </p>

            {/* Quick Action Badges */}
            <div className="pt-2 flex flex-wrap gap-3 text-xs md:text-sm text-zinc-400">
              <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-850/80 border border-zinc-800 text-zinc-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Work in Progress
              </span>
              <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-850/80 border border-zinc-800 text-zinc-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Showcase & Vault
              </span>
              <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-850/80 border border-zinc-800 text-zinc-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Challenges & Ideation
              </span>
            </div>
          </div>
        </div>

        {/* Core Hub Pillars */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Work in Progress */}
          <div className="group relative rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-6 md:p-8 hover:border-zinc-700/90 hover:bg-zinc-900/80 transition-all duration-200 flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 group-hover:scale-105 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                  Active
                </span>
              </div>
              <h2 className="text-xl font-semibold text-white group-hover:text-amber-400 transition-colors">
                Work in Progress
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Log and monitor live production pipelines, shoot schedules, rough
                cuts, color grading passes, and pending client reviews.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500">
              <span>Pipeline Tracker</span>
              <span className="text-zinc-400 group-hover:translate-x-0.5 transition-transform">
                Coming soon &rarr;
              </span>
            </div>
          </div>

          {/* Card 2: Showcase & Storage */}
          <div className="group relative rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-6 md:p-8 hover:border-zinc-700/90 hover:bg-zinc-900/80 transition-all duration-200 flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 group-hover:scale-105 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                  Archive
                </span>
              </div>
              <h2 className="text-xl font-semibold text-white group-hover:text-orange-400 transition-colors">
                Showcase & Storage
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Organize, store, and display your finished photographic series,
                cinematic highlight reels, client deliverables, and portfolio
                favorites.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500">
              <span>Media Vault</span>
              <span className="text-zinc-400 group-hover:translate-x-0.5 transition-transform">
                Coming soon &rarr;
              </span>
            </div>
          </div>

          {/* Card 3: Ideas & Challenges */}
          <div className="group relative rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-6 md:p-8 hover:border-zinc-700/90 hover:bg-zinc-900/80 transition-all duration-200 flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 group-hover:scale-105 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                  Inspiration
                </span>
              </div>
              <h2 className="text-xl font-semibold text-white group-hover:text-yellow-400 transition-colors">
                Ideas & Challenges
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Break creative plateaus with prompts, lighting exercises,
                framing experiments, and structured photo/video challenges.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500">
              <span>Creative Prompts</span>
              <span className="text-zinc-400 group-hover:translate-x-0.5 transition-transform">
                Coming soon &rarr;
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>Strags Photography and Videography Hub &copy; 2026</p>
          <p className="flex items-center gap-2">
            <span>Visual Storytelling</span>
            <span>•</span>
            <span>Production Workflow</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
