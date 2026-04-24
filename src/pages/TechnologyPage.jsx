import { Link, useParams } from 'react-router-dom';

// Match: games/[tech]/[chapter]/mission_XX/games.json
const missionModules = import.meta.glob('../data/games/**/mission_*/games.json', { eager: true });

export default function TechnologyPage() {
  const { technology } = useParams();
  const displayTech = technology.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  // Extract unique chapters for this technology
  const chapterSet = new Set();
  Object.keys(missionModules).forEach(path => {
    if (path.includes(`/data/games/${technology}/`)) {
      const parts = path.split('/');
      // ../data/games/[tech]/[chapter]/mission_XX/games.json
      const chapter = parts[4];
      if (chapter) chapterSet.add(chapter);
    }
  });
  const chapters = Array.from(chapterSet);

  return (
    <div className="p-6">
      <Link to="/" className="inline-flex items-center gap-2 text-text-dim hover:text-text mb-4">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Technologies
      </Link>

      <h1 className="text-2xl font-bold text-text mb-6">{displayTech}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {chapters.map(chapter => {
          const displayChapter = chapter.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          return (
            <Link
              key={chapter}
              to={`/${technology}/${chapter}`}
              className="panel p-5 hover:border-accent/50 transition-colors"
            >
              <h3 className="text-base font-semibold text-text">{displayChapter}</h3>
              <p className="text-sm text-text-muted">View missions</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
