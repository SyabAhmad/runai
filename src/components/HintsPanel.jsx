import { useState } from 'react';

export default function HintsPanel({ hints = [] }) {
  const [revealedCount, setRevealedCount] = useState(0);

  const revealNext = () => {
    if (revealedCount < hints.length) {
      setRevealedCount(revealedCount + 1);
    }
  };

  if (hints.length === 0) return null;

  return (
    <div className="panel p-4">
      <h3 className="text-sm font-semibold text-text mb-3">Hints</h3>
      <div className="space-y-2">
        {hints.slice(0, revealedCount).map((hint, index) => (
          <div key={index} className="p-2 bg-secondary/50 rounded text-xs text-text-dim">
            {hint}
          </div>
        ))}
      </div>
      {revealedCount < hints.length && (
        <button
          onClick={revealNext}
          className="mt-3 text-xs text-accent hover:text-accent/80 transition-colors"
        >
          Reveal Hint ({revealedCount}/{hints.length}) - Reduces XP
        </button>
      )}
      {revealedCount === hints.length && hints.length > 0 && (
        <p className="mt-3 text-xs text-text-dim">All hints revealed</p>
      )}
    </div>
  );
}
