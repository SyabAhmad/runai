import { Link, useParams } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';

export default function Header() {
  const { xp, level } = useGameStore();
  const { technology, chapter, mission } = useParams();

  const getPageTitle = () => {
    if (mission) return mission.replace(/_/g, ' ');
    if (chapter) return chapter.replace(/_/g, ' ');
    if (technology) return technology.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    return 'RunAI';
  };

  return (
    <header className="h-12 flex items-center justify-between px-4 border-b border-border bg-primary">
      <div className="flex items-center gap-3">
        {technology && (
          <Link to="/" className="text-text-dim hover:text-text">
            <span className="text-sm">← Home</span>
          </Link>
        )}
        <h1 className="text-sm font-semibold text-text">{getPageTitle()}</h1>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs text-accent">{xp} XP</span>
        <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">Lvl {level}</span>
      </div>
    </header>
  );
}
