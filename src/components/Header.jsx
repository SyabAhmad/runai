import { Link, useParams } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';

const XP_PER_LEVEL = 500;

export default function Header() {
  const { xp } = useGameStore();
  const { technology, chapter, mission } = useParams();
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;

  const formatName = (str) => {
    if (!str) return '';
    return str.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <header className="h-14 border-b border-border bg-gradient-to-r from-primary via-[#121826] to-primary px-5">
      <div className="flex h-full items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/" className="font-medium text-text-dim transition-colors hover:text-text">
            Home
          </Link>

          {technology && (
            <>
              <span className="text-text-dim">/</span>
              <Link to={`/${technology}`} className="text-text-dim transition-colors hover:text-text">
                {formatName(technology)}
              </Link>
            </>
          )}

          {chapter && (
            <>
              <span className="text-text-dim">/</span>
              <Link to={`/${technology}/${chapter}`} className="text-text-dim transition-colors hover:text-text">
                {formatName(chapter)}
              </Link>
            </>
          )}

          {mission && (
            <>
              <span className="text-text-dim">/</span>
              <span className="font-semibold text-accent">{formatName(mission)}</span>
            </>
          )}

          {!technology && !chapter && !mission && <span className="font-semibold text-text">RunAI</span>}
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            {xp} XP
          </span>
          <span className="rounded-full border border-success/30 bg-success/10 px-3 py-1 text-xs font-medium text-success">
            Lvl {level}
          </span>
        </div>
      </div>
    </header>
  );
}
