import { useGameStore } from '../store/gameStore';

export default function Header() {
  const { resetGame, showNextHint, feedback, level, xp } = useGameStore();
  const currentGameId = useGameStore(state => state.currentGameId);

  const getCurrentMission = useGameStore(state => state.getCurrentMission);
  const missionData = getCurrentMission();

  if (!missionData.game) {
    return null;
  }

  const getGameTypeIcon = (type) => {
    switch (type) {
      case 'sql_debug':
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
    <header className="h-12 flex items-center justify-between px-4 border-b border-border bg-primary">
      {/* Left: Mission info */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-accent/20 flex items-center justify-center text-accent">
            {getGameTypeIcon(missionData.game.type)}
          </div>
          <div>
            <h1 className="text-sm font-semibold text-text">
              {missionData.game.type === 'sql_debug' ? 'SQL Debug' :
               missionData.game.type === 'terminal' ? 'Terminal' :
               'Pipeline'} — Mission {currentGameId.split('_').pop()}
            </h1>
          </div>
        </div>

        {/* XP indicator (small) */}
        <div className="flex items-center gap-2 ml-4 pl-4 border-l border-border">
          <div className="xp-badge">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {xp} XP
          </div>
          <div className="level-badge">
            Lvl {level}
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Hint button */}
        <button
          onClick={showNextHint}
          className="btn btn-sm flex items-center gap-1.5"
          title="Get a hint (reduces XP)"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Hint
        </button>

        {/* Reset button */}
        <button
          onClick={resetGame}
          className="btn btn-sm flex items-center gap-1.5"
          title="Reset to initial state"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset
        </button>

        {/* Submit button (only show if not submitted yet or incorrect) */}
        {(!feedback || !feedback.success) && (
          <button
            onClick={() => useGameStore.getState().submitAnswer()}
            className="btn btn-primary btn-sm flex items-center gap-1.5 ml-2"
            title="Submit (Ctrl+Enter)"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            Submit
          </button>
        )}
      </div>
    </header>
  );
}
