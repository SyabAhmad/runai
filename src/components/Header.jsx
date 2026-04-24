import { Link, useParams } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';

export default function Header() {
  const { xp, level } = useGameStore();
  const { technology, chapter, mission } = useParams();

  const formatName = (str) => {
    if (!str) return '';
    return str.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  };

  return (
    <header className="h-12 flex items-center justify-between px-4 border-b border-border bg-primary">
      {/* Left: Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-sm">
        <Link to="/" className="text-text-dim hover:text-text transition-colors">
          Home
        </Link>

        {technology && (
          <>
            <span className="text-text-dim">/</span>
            <Link 
              to={`/${technology}`} 
              className="text-text-dim hover:text-text transition-colors"
            >
              {formatName(technology)}
            </Link>
          </>
        )}

        {chapter && (
          <>
            <span className="text-text-dim">/</span>
            <Link 
              to={`/${technology}/${chapter}`} 
              className="text-text-dim hover:text-text transition-colors"
            >
              {formatName(chapter)}
            </Link>
          </>
        )}

        {mission && (
          <>
            <span className="text-text-dim">/</span>
            <span className="text-text font-semibold">
              {formatName(mission)}
            </span>
          </>
        )}

        {/* Show page title if no specific level */}
        {!technology && !chapter && !mission && (
          <span className="text-text font-semibold">RunAI</span>
        )}
      </div>

      {/* Right: Stats */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-accent">{xp} XP</span>
        <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">Lvl {level}</span>
      </div>
    </header>
  );
}
