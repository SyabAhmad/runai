import { useGameStore } from '../store/gameStore';

export default function TaskPanel() {
  const { feedback, showHint, showNextHint, resetGame } = useGameStore();

  // Get mission data from store
  const getCurrentMission = useGameStore(state => state.getCurrentMission);
  const missionData = getCurrentMission();

  if (!missionData.game || !missionData.description) {
    return (
      <div className="h-full flex items-center justify-center text-text-dim text-sm p-6 text-center">
        <div>
          <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p>Select a mission from the sidebar to begin</p>
        </div>
      </div>
    );
  }

  const { description, hints, outcome } = missionData;
  const hintCount = showHint ? hints.findIndex(h => h.message === feedback?.message?.replace('Hint: ', '')) + 1 : 0;
  const currentHint = hints[hintCount - 1];

  return (
    <div className="h-full flex flex-col overflow-y-auto scrollbar-thin">
      {/* Context box */}
      <div className="p-4 border-b border-border">
        <div className="flex items-start gap-2 mb-3">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-accent/20 text-accent text-xs font-semibold">
            C
          </span>
          <span className="text-xs font-semibold text-text-dim uppercase tracking-wide">Context</span>
        </div>
        <p className="text-sm text-text leading-relaxed">{description.context}</p>
      </div>

      {/* Task box */}
      <div className="p-4 border-b border-border bg-surface/30">
        <div className="flex items-start gap-2 mb-3">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-success/20 text-success text-xs font-semibold">
            T
          </span>
          <span className="text-xs font-semibold text-text-dim uppercase tracking-wide">Task</span>
        </div>
        <p className="text-sm text-text font-medium leading-relaxed">{description.task}</p>
      </div>

      {/* Constraints */}
      {description.constraints && description.constraints.length > 0 && (
        <div className="px-4 py-3 border-b border-border">
          <div className="flex items-start gap-2">
            <svg className="w-4 h-4 text-text-dim mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <span className="text-xs font-semibold text-text-dim uppercase tracking-wide block mb-1">
                Constraints
              </span>
              <ul className="space-y-1">
                {description.constraints.map((constraint, i) => (
                  <li key={i} className="text-xs text-text-muted flex items-start">
                    <span className="mr-1.5">•</span>
                    <span>{constraint}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Feedback area */}
      {feedback && (
        <div className="px-4 py-3 border-b border-border">
          <div className={`feedback ${feedback.success ? 'success' : 'error'} flex items-start gap-2`}>
            <div className="flex-shrink-0 mt-0.5">
              {feedback.success ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <div className="font-medium">{feedback.message}</div>
              {feedback.explanation && feedback.success && (
                <div className="text-xs mt-1 opacity-80">{feedback.explanation}</div>
              )}
            </div>
          </div>

          {/* Success actions */}
          {feedback.success && outcome && (
            <div className="mt-3 flex items-center gap-2">
              <button onClick={resetGame} className="btn btn-sm">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Practice Again
              </button>
            </div>
          )}
        </div>
      )}

      {/* Hints section */}
      <div className="flex-1 flex flex-col">
        <div className="px-4 py-2 border-b border-border flex items-center justify-between">
          <span className="text-xs font-semibold text-text-dim uppercase tracking-wide flex items-center gap-2">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Hints
          </span>
          {!showHint && hints.length > 0 && (
            <button
              onClick={showNextHint}
              className="text-xs text-accent hover:underline"
            >
              Show hint
            </button>
          )}
        </div>

        {/* Hint content */}
        <div className="flex-1 p-4">
          {showHint && currentHint ? (
            <div className="hint-box">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold">💡 Hint {hintCount}</span>
                {hintCount >= 3 && (
                  <span className="text-xs text-text-dim">(final hint)</span>
                )}
              </div>
              <p className="text-sm">{currentHint.message}</p>
            </div>
          ) : (
            <div className="text-xs text-text-dim">
              Stuck? Click "Show hint" for progressive help. Hints reduce XP reward.
            </div>
          )}
        </div>
      </div>

      {/* Outcome (shown after completion) */}
      {feedback?.success && outcome && (
        <div className="p-4 border-t border-border bg-success/5">
          <div className="text-xs font-semibold text-success uppercase tracking-wide mb-1">
            What you learned
          </div>
          <p className="text-xs text-text-dim mb-2">{outcome.summary}</p>
          <div className="flex flex-wrap gap-1">
            {outcome.concepts.map((concept, i) => (
              <span
                key={i}
                className="inline-flex px-2 py-0.5 rounded-full bg-success/20 text-success text-xs"
              >
                {concept}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
