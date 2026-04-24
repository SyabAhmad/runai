import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGameStore } from '../store/gameStore';
import GameRenderer from '../components/GameRenderer';
import HintsPanel from '../components/HintsPanel';
import { evaluateMission } from '../engine/evaluator';

export default function MissionPage() {
  const { technology, chapter, mission: missionId } = useParams();
  const { completeMission } = useGameStore();
  const [mission, setMission] = useState(null);
  const [description, setDescription] = useState('');
  const [hints, setHints] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    const basePath = `/src/data/games/${technology}/${chapter}/${missionId}`;
    
    const loadData = async () => {
      try {
        // Load games.json
        const gamesRes = await fetch(`${basePath}/games.json`);
        const gamesData = await gamesRes.json();
        setMission(gamesData);
        setUserInput(gamesData.initialState?.content || '');
        
        // Load descriptions.json
        try {
          const descRes = await fetch(`${basePath}/descriptions.json`);
          const descs = await descRes.json();
          setDescription(descs[missionId] || 'Complete the mission.');
        } catch {
          setDescription('Complete the mission.');
        }
        
        // Load hints.json
        try {
          const hintsRes = await fetch(`${basePath}/hints.json`);
          const allHints = await hintsRes.json();
          setHints(allHints[missionId] || []);
        } catch {
          setHints([]);
        }
      } catch (error) {
        console.error('Failed to load mission data:', error);
        setMission({ id: missionId, type: 'unknown' });
      }
    };

    loadData();
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

  if (!mission) return <div className="p-6 text-text">Loading...</div>;

  return (
    <div className="p-6">
      <Link to={`/${technology}/${chapter}`} className="inline-flex items-center gap-2 text-text-dim hover:text-text mb-4">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to {chapter.replace(/_/g, ' ')}
      </Link>

      <div className="flex gap-6">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-text mb-2">{mission.title || missionId}</h1>
          <p className="text-text-muted mb-6">{description}</p>

          <GameRenderer 
            mission={mission} 
            data={mission.initialState} 
            onChange={(value) => setUserInput(value)} 
          />

          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-accent text-white rounded hover:bg-accent/90"
            >
              Submit
            </button>
            {result && (
              <span className={result.success ? 'text-success' : 'text-error'}>
                {result.message}
              </span>
            )}
          </div>
        </div>

        <div className="w-80">
          <HintsPanel hints={hints} />
          <div className="panel p-4 mt-4">
            <h3 className="text-sm font-semibold text-text mb-2">Details</h3>
            <p className="text-xs text-text-dim">Type: {mission.type}</p>
            <p className="text-xs text-text-dim">XP: +{mission.xpReward || 100}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
