import { Link, useParams } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';

// Match mission games.json files to extract chapters
const missionModules = import.meta.glob('../data/games/**/mission_*/games.json', { eager: true });

export default function Sidebar({ technology: propTech }) {
  const { technology: urlTech, chapter: urlChapter, mission: urlMission } = useParams();
  const tech = propTech || urlTech;
  const chapter = urlChapter;
  const { level, xp, completedMissions } = useGameStore();

  // Get chapters for this technology
  const chapterSet = new Set();
  Object.keys(missionModules).forEach(path => {
    if (path.includes(`/data/games/${tech}/`)) {
      const parts = path.split('/');
      const chap = parts[4];
      if (chap) chapterSet.add(chap);
    }
  });
  const chapters = Array.from(chapterSet);

  // Get missions for the current chapter
  const getMissions = () => {
    if (!chapter) return [];
    const missions = [];
    Object.entries(missionModules).forEach(([path, module]) => {
      if (path.includes(`/data/games/${tech}/${chapter}/`)) {
        const parts = path.split('/');
        const missionFolder = parts[5];
        if (missionFolder && missionFolder.startsWith('mission_')) {
          missions.push({
            id: missionFolder,
            ...module.default
          });
        }
      }
    });
    return missions.sort((a, b) => {
      const numA = parseInt(a.id.split('_')[1]);
      const numB = parseInt(b.id.split('_')[1]);
      return numA - numB;
    });
  };

  const missions = getMissions();

  const formatName = (str) => {
    if (!str) return '';
    return str.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  };

  const renderIcon = (mission, isCompleted, isUnlocked) => {
    if (isCompleted) {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    }
    if (!isUnlocked) {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m0 0v3m0-3h3m-3 0H9m3 0a9 9 0 10-9-9c1.153 0 2.24.275 3.193.765a6.985 6.985 0 014.197 4.197A9 9 0 0112 21z" />
        </svg>
      );
    }
    return (
      <span className="w-4 h-4 flex items-center justify-center text-xs font-medium">
        {mission.id.split('_').pop()}
      </span>
    );
  };

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

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin p-2">
        {/* Show CHAPTERS when no chapter selected */}
        {!chapter && (
          <div className="mb-2">
            <div className="px-3 py-2 text-xs font-semibold text-text-dim uppercase tracking-wider">
              Chapters
            </div>
            <div className="space-y-1">
              {chapters.map(chap => (
                <Link
                  key={chap}
                  to={`/${tech}/${chap}`}
                  className="nav-item"
                >
                  <span className="flex-1 text-xs truncate">{formatName(chap)}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Show MISSIONS when chapter is selected */}
        {chapter && (
          <div className="mb-2">
            <div className="px-3 py-2 text-xs font-semibold text-text-dim uppercase tracking-wider">
              {formatName(chapter)}
            </div>
            <div className="space-y-1">
              {missions.map(mission => {
                const isCompleted = (completedMissions[`${tech}/${chapter}`] || []).includes(mission.id);
                const isActive = urlMission === mission.id;
                const isUnlocked = useGameStore.getState().isUnlocked(tech, chapter, mission.id);

                return (
                  <Link
                    key={mission.id}
                    to={`/${tech}/${chapter}/${mission.id}`}
                    className={`nav-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${!isUnlocked ? 'opacity-50 pointer-events-none' : ''}`}
                  >
                    <div className="nav-icon">
                      {renderIcon(mission, isCompleted, isUnlocked)}
                    </div>
                    <span className="flex-1 text-xs truncate">{mission.title || mission.id}</span>
                    <span className="flex-shrink-0 text-xs text-accent">+{mission.xpReward || 100}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
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