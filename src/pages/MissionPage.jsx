import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import GameRenderer from '../components/GameRenderer';
import { evaluateMission } from '../engine/evaluator';

export default function MissionPage() {
  const { technology, chapter, mission: missionId } = useParams();
  const { completeMission } = useGameStore();
  const [mission, setMission] = useState(null);
  const [description, setDescription] = useState('');
  const [hints, setHints] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState(null);
  const [hintIndex, setHintIndex] = useState(0);

  useEffect(() => {
    const basePath = `/src/data/games/${technology}/${chapter}/${missionId}`;
    const hintProgressKey = `hintProgress:${technology}/${chapter}/${missionId}`;
    
    const loadData = async () => {
      try {
        const gamesRes = await fetch(`${basePath}/games.json`);
        const gamesData = await gamesRes.json();
        setMission(gamesData);
        setUserInput(gamesData.initialState?.content || '');
        
        try {
          const descRes = await fetch(`${basePath}/descriptions.json`);
          const descs = await descRes.json();
          setDescription(descs[missionId] || 'Complete the mission.');
        } catch {
          setDescription('Complete the mission.');
        }
        
        try {
          const hintsRes = await fetch(`${basePath}/hints.json`);
          const allHints = await hintsRes.json();
          const missionHints = allHints[missionId] || [];
          setHints(missionHints);

          const savedHintIndex = Number(localStorage.getItem(hintProgressKey) || 0);
          const safeHintIndex = Number.isFinite(savedHintIndex)
            ? Math.max(0, Math.min(savedHintIndex, missionHints.length))
            : 0;
          setHintIndex(safeHintIndex);
        } catch {
          setHints([]);
          setHintIndex(0);
        }
      } catch (error) {
        console.error('Failed to load mission data:', error);
        setMission({ id: missionId, type: 'unknown' });
      }
    };

    loadData();
    setResult(null);
    setHintIndex(0);
    setUserInput('');
  }, [technology, chapter, missionId]);

  const handleSubmit = () => {
    if (!mission) return;
    const evaluation = evaluateMission(mission, { content: userInput });
    if (evaluation.success) {
      completeMission(technology, chapter, missionId, mission.xpReward || 100);
      setResult({ success: true, message: evaluation.message });
    } else {
      setResult({ success: false, message: evaluation.message });
    }
  };

  const revealHint = () => {
    const hintProgressKey = `hintProgress:${technology}/${chapter}/${missionId}`;
    if (hintIndex < hints.length) {
      const nextHintIndex = hintIndex + 1;
      setHintIndex(nextHintIndex);
      localStorage.setItem(hintProgressKey, String(nextHintIndex));
    }
  };

  // Check if mission is unlocked
  const isUnlocked = useGameStore.getState().isUnlocked(technology, chapter, missionId);
  
  if (!mission) return (
    <div className="h-full flex items-center justify-center text-text-muted">
      Loading mission...
    </div>
  );

  if (!isUnlocked) {
    const displayChapter = chapter.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return (
      <div className="h-full flex flex-col items-center justify-center text-text-muted p-6">
        <svg className="w-16 h-16 mb-4 text-text-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m0 0a9 9 0 10-9-9c1.153 0 2.24.275 3.193.765a6.985 6.985 0 01 4.197 4.197A9 9 0 01 12 21z" />
        </svg>
        <h2 className="text-xl font-bold text-text mb-2">Mission Locked</h2>
        <p className="text-sm mb-4">Complete the previous mission to unlock this one.</p>
        <Link 
          to={`/${technology}/${chapter}`}
          className="btn btn-primary"
        >
          Back to Missions
        </Link>
      </div>
    );
  }

  const displayChapter = chapter.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const displayMission = missionId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Top bar with mission info */}
      <div className="px-6 py-4 border-b border-border bg-primary">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-text">{mission.title || displayMission}</h1>
            <p className="text-sm text-text-muted mt-1">{displayChapter} • {mission.type}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs px-3 py-1 bg-accent/20 text-accent rounded-full">
              +{mission.xpReward || 100} XP
            </span>
            <span className={`text-xs px-3 py-1 rounded-full ${
              result?.success ? 'bg-success/20 text-success' : 
              result?.success === false ? 'bg-error/20 text-error' : 
              'bg-secondary text-text-dim'
            }`}>
              {result?.success ? 'Completed' : result?.success === false ? 'Incorrect' : 'In Progress'}
            </span>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Game Editor (2/3 width) */}
        <div className="flex-[2] flex flex-col overflow-hidden border-r border-border">
          <div className="flex-1 overflow-hidden">
            <GameRenderer 
              mission={mission} 
              data={{ ...mission.initialState, content: userInput }} 
              onChange={(value) => setUserInput(value)} 
            />
          </div>

          {/* Submit bar */}
          <div className="px-6 py-3 border-t border-border bg-primary flex items-center justify-between">
            <div className="flex items-center gap-3">
              {result && (
                <span className={`text-sm ${result.success ? 'text-success' : 'text-error'}`}>
                  {result.message}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={revealHint}
                disabled={hintIndex >= hints.length}
                className="btn btn-sm btn-ghost"
              >
                💡 Hint ({hintIndex}/{hints.length})
              </button>
              <button
                onClick={handleSubmit}
                className="btn btn-primary"
                disabled={result?.success}
              >
                Submit Solution
              </button>
            </div>
          </div>
        </div>

        {/* Right: Task Panel (1/3 width) */}
        <div className="flex-[1] flex flex-col overflow-y-auto bg-primary/50">
          {/* Description */}
          <div className="p-6 border-b border-border">
            <h3 className="text-sm font-semibold text-text-dim uppercase tracking-wider mb-3">
              Task Description
            </h3>
            <p className="text-sm text-text leading-relaxed">
              {description}
            </p>
          </div>

          {/* Revealed Hints */}
          {hints.length > 0 && (
            <div className="p-6 border-b border-border">
              <h3 className="text-sm font-semibold text-text-dim uppercase tracking-wider mb-3">
                Hints
              </h3>
              <div className="space-y-3">
                {hints.slice(0, hintIndex).map((hint, index) => (
                  <div key={index} className="p-3 bg-accent/5 border border-accent/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <span className="text-accent text-xs font-bold">💡</span>
                      <p className="text-xs text-text-muted">{hint}</p>
                    </div>
                  </div>
                ))}
                {hintIndex === 0 && (
                  <p className="text-xs text-text-dim italic">Click "Hint" button to reveal hints (reduces XP)</p>
                )}
              </div>
            </div>
          )}

          {/* Mission Info */}
          <div className="p-6">
            <h3 className="text-sm font-semibold text-text-dim uppercase tracking-wider mb-3">
              Details
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-text-dim">Type</span>
                <span className="text-text">{mission.type}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-text-dim">Reward</span>
                <span className="text-accent">+{mission.xpReward || 100} XP</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-text-dim">Status</span>
                <span className={result?.success ? 'text-success' : 'text-text-dim'}>
                  {result?.success ? 'Completed' : 'Pending'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
