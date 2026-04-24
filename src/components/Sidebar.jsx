import { Link, useParams } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';

// Match mission games.json files to extract chapters
const missionModules = import.meta.glob('../data/games/**/mission_*/games.json', { eager: true });

export default function Sidebar({ technology: propTech }) {
  const { technology: urlTech } = useParams();
  const tech = propTech || urlTech;
  const { level, xp } = useGameStore();

  // Get chapters for this technology
  const chapterSet = new Set();
  Object.keys(missionModules).forEach(path => {
    if (path.includes(`/data/games/${tech}/`)) {
      const parts = path.split('/');
      const chapter = parts[4];
      if (chapter) chapterSet.add(chapter);
    }
  });
  const chapters = Array.from(chapterSet);

  return (
    <aside className="w-64 h-full flex flex-col bg-primary border-r border-border">
      {/* Brand */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-accent flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="font-semibold text-sm text-text">RunAI</span>
        </div>
      </div>

      {/* User stats */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="level-badge">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {level}
            </div>
            <span className="text-xs text-text-dim">Lvl</span>
          </div>
          <div className="xp-badge">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {xp} XP
          </div>
        </div>
        <div className="h-1 bg-border rounded-full overflow-hidden">
          <div 
            className="h-full bg-accent transition-all duration-300" 
            style={{ width: `${(xp % 500) / 5}%` }} 
          />
        </div>
      </div>

      {/* Chapters navigation - only chapter names */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin p-2">
        <div className="mb-2">
          <div className="px-3 py-2 text-xs font-semibold text-text-dim uppercase tracking-wider">
            Chapters
          </div>
          <div className="space-y-1">
            {chapters.map(chapter => {
              const displayChapter = chapter.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
              return (
                <Link
                  key={chapter}
                  to={`/${tech}/${chapter}`}
                  className="nav-item"
                >
                  <span className="flex-1 text-xs truncate">{displayChapter}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-2 px-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-xs text-text-dim">Training active</span>
        </div>
      </div>
    </aside>
  );
}
