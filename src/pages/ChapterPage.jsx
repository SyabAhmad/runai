import { Link, useParams } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';

// Match: games/[tech]/[chapter]/mission_XX/games.json
const missionModules = import.meta.glob('../data/games/**/mission_*/games.json', { eager: true });

export default function ChapterPage() {
  const { technology, chapter } = useParams();
  const { completedMissions } = useGameStore();
  const displayChapter = chapter.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  // Get all missions for this chapter
  const missions = [];
  Object.entries(missionModules).forEach(([path, module]) => {
    if (path.includes(`/data/games/${technology}/${chapter}/`)) {
      const parts = path.split('/');
      const missionFolder = parts[5]; // mission_01, mission_02, etc.
      if (missionFolder && missionFolder.startsWith('mission_')) {
        const data = module.default;
        missions.push({
          id: missionFolder,
          ...data
        });
      }
    }
  });

  // Sort by mission number
  missions.sort((a, b) => {
    const numA = parseInt(a.id.split('_')[1]);
    const numB = parseInt(b.id.split('_')[1]);
    return numA - numB;
  });

  return (
    <div className="p-6">
      <Link to={`/${technology}`} className="inline-flex items-center gap-2 text-text-dim hover:text-text mb-4">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to {technology} Chapters
      </Link>

      <h1 className="text-2xl font-bold text-text mb-6">{displayChapter}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {missions.map((mission, index) => {
          const isCompleted = (completedMissions[`${technology}/${chapter}`] || []).includes(mission.id);
          return (
            <Link
              key={mission.id}
              to={`/${technology}/${chapter}/${mission.id}`}
              className="panel p-5 hover:border-accent/50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${isCompleted ? 'bg-success/20 text-success' : 'bg-secondary text-text-dim'}`}>
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : index + 1}
                </div>
                <h3 className="font-semibold text-text">{mission.title || mission.id}</h3>
              </div>
              <p className="text-sm text-text-dim mb-2">{mission.type || 'mission'}</p>
              <span className="text-xs text-accent">+{mission.xpReward || 100} XP</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
