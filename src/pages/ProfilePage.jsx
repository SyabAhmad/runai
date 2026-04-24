import { useGameStore } from '../store/gameStore';
import { Link } from 'react-router-dom';

// Dynamically load all mission data
const missionModules = import.meta.glob('../data/games/**/mission_*/games.json', { eager: true });

export default function ProfilePage() {
  const { xp, level, completedMissions, addXp } = useGameStore();
  
  // Calculate stats from completedMissions object
  const completedCount = Object.values(completedMissions).reduce((sum, arr) => sum + arr.length, 0);
  const xpToNextLevel = (level * 500) - xp;
  const currentLevelXp = xp % 500;
  const levelProgress = (currentLevelXp / 500) * 100;

  // Extract tech/chapter stats
  const techStats = {};
  Object.entries(missionModules).forEach(([path, module]) => {
    const parts = path.split('/');
    const tech = parts[3];
    const chapter = parts[4];
    if (!tech || !chapter) return;

    if (!techStats[tech]) techStats[tech] = { chapters: {}, completed: 0, total: 0 };
    if (!techStats[tech].chapters[chapter]) {
      techStats[tech].chapters[chapter] = { completed: 0, total: 0 };
    }

    const missionFolder = parts[5]; // mission_XX
    if (missionFolder?.startsWith('mission_')) {
      techStats[tech].chapters[chapter].total += 1;
      techStats[tech].total += 1;

      // Check if completed
      if ((completedMissions[`${tech}/${chapter}`] || []).includes(missionFolder)) {
        techStats[tech].chapters[chapter].completed += 1;
        techStats[tech].completed += 1;
      }
    }
  });

  return (
    <div className="min-h-screen bg-primary overflow-y-auto">
      <div className="mb-8 px-6 pt-6">
        <h1 className="text-3xl font-bold text-text mb-2">Your Progress</h1>
        <p className="text-text-dim">Track your engineering journey</p>
      </div>

      {/* Stats Overview */}
      <div className="panel mx-6 mb-6 p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-3xl font-bold text-accent mb-1">{level}</div>
            <div className="text-xs text-text-dim uppercase tracking-wide">Level</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-text mb-1">{xp}</div>
            <div className="text-xs text-text-dim uppercase tracking-wide">Total XP</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-success mb-1">{completedCount}</div>
            <div className="text-xs text-text-dim uppercase tracking-wide">Completed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-text mb-1">{Object.keys(missionModules).length}</div>
            <div className="text-xs text-text-dim uppercase tracking-wide">Total Missions</div>
          </div>
        </div>

        {/* Level progress bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-text-dim mb-2">
            <span>Level {level}</span>
            <span>{xpToNextLevel > 0 ? `${xpToNextLevel} XP to Level ${level + 1}` : 'Max level reached'}</span>
          </div>
          <div className="h-2 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-accent transition-all duration-500" style={{ width: `${levelProgress}%` }} />
          </div>
        </div>
      </div>

      {/* Technology Progress */}
      <div className="mb-8 px-6">
        <h2 className="text-xl font-bold text-text mb-4">Technology Progress</h2>
        <div className="space-y-4">
          {Object.entries(techStats).map(([tech, stats]) => (
            <div key={tech} className="panel overflow-hidden">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="text-sm font-semibold text-text">
                  {tech.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </h3>
                <span className="text-sm font-semibold text-accent">
                  {stats.completed}/{stats.total}
                </span>
              </div>
              <div className="h-1 bg-border">
                <div 
                  className="h-full bg-accent transition-all duration-500" 
                  style={{ width: `${(stats.completed / stats.total) * 100}%` }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 pb-6">
        <Link to="/" className="panel p-4 flex items-center gap-3 hover:border-accent/50 transition-colors">
          <svg className="w-5 h-5 text-text-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-sm text-text">Back to Home</span>
        </Link>

        <Link to="/sql" className="panel p-4 flex items-center gap-3 hover:border-accent/50 transition-colors">
          <svg className="w-5 h-5 text-text-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          <span className="text-sm text-text">Continue Learning</span>
        </Link>
      </div>
    </div>
  );
}
