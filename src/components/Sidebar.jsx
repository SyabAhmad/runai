import { useGameStore } from '../store/gameStore';

export default function Sidebar() {
  const { currentGameId, startGame, completedMissions, xp, level, getCategories } = useGameStore();
  const categories = getCategories();

  const renderCategoryIcon = (iconType) => {
    switch (iconType) {
      case 'sql':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
          </svg>
        );
      case 'terminal':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'pipeline':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <aside className="w-56 h-full flex flex-col bg-primary border-r border-border">
      {/* Logo / Brand */}
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
        {/* XP bar */}
        <div className="h-1 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-300"
            style={{ width: `${(xp % 500) / 5}%` }}
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin p-2">
        {Object.entries(categories).map(([catKey, catData]) => (
          <div key={catKey} className="mb-4">
            <div className="px-3 py-2 flex items-center gap-2 text-xs font-semibold text-text-dim uppercase tracking-wider">
              {renderCategoryIcon(catData.iconType)}
              {catData.label}
            </div>
            <div className="space-y-1">
              {catData.games.map((game) => {
                const isActive = currentGameId === game.id;
                const isCompleted = completedMissions.includes(game.id);
                const isUnlocked = useGameStore.getState().unlockedMissions.includes(game.id);

                return (
                  <div
                    key={game.id}
                    onClick={() => isUnlocked && startGame(game.id)}
                    className={`
                      nav-item
                      ${isActive ? 'active' : ''}
                      ${isCompleted ? 'completed' : ''}
                      ${!isUnlocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                  >
                    <div className="nav-icon">
                      {isCompleted ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="w-4 h-4 flex items-center justify-center text-xs font-medium">
                          {game.id.split('_').pop()}
                        </span>
                      )}
                    </div>
                    <span className="flex-1 text-xs truncate">
                      {game.type === 'sql_debug' ? 'Query' :
                       game.type === 'terminal' ? 'Command' :
                       'Pipeline'} {game.id.split('_').pop()}
                    </span>
                    {isCompleted && (
                      <svg className="w-3 h-3 text-success" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer - settings/about could go here */}
      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-2 px-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-xs text-text-dim">Training active</span>
        </div>
      </div>
    </aside>
  );
}
