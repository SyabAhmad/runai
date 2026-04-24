import { Link } from 'react-router-dom';

// Match: games/[tech]/[chapter]/mission_XX/games.json
const missionModules = import.meta.glob('../data/games/**/mission_*/games.json', { eager: true });

export default function HomePage() {
  const techSet = new Set();
  Object.keys(missionModules).forEach(path => {
    const parts = path.split('/');
    // ../data/games/[tech]/...
    const tech = parts[3];
    if (tech) techSet.add(tech);
  });
  const technologies = Array.from(techSet);

  const renderIcon = (tech) => {
    const icons = {
      sql: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4',
      terminal: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      pipeline: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
      ai_engineering: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
    };
    const d = icons[tech] || icons.pipeline;
    return (
      <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={d} />
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-primary overflow-y-auto">
      <div className="text-center mb-16 pt-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-text mb-4 px-6">Master Real Engineering Skills</h1>
        <p className="text-lg text-text-muted leading-relaxed px-6">Interactive learning platform for SQL, DevOps, AI, and more.</p>
      </div>

      <div className="px-6 mb-16">
        <h2 className="text-2xl font-bold text-text mb-6">Technologies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {technologies.map(tech => {
            const display = tech.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            return (
              <Link key={tech} to={`/${tech}`} className="panel block p-5 hover:border-accent/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                    {renderIcon(tech)}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-text">{display}</h3>
                    <p className="text-sm text-text-muted">View chapters</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
