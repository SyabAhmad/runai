import { useEffect, useRef } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import TaskPanel from '../components/TaskPanel';
import CodeEditor from '../components/CodeEditor';
import Terminal from '../components/Terminal';
import PipelineBuilder from '../components/PipelineBuilder';
import { useGameStore } from '../store/gameStore';
import chapters from '../data/chapters.json';

// Sound effects using Web Audio API
const playSound = (type) => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  switch (type) {
    case 'success':
      // Ascending major chord
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
      break;
    case 'error':
      // Descending buzz
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.2);
      oscillator.type = 'sawtooth';
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
      break;
    case 'levelup':
      // Triumphant fanfare
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.15);
        osc.type = 'triangle';
        gain.gain.setValueAtTime(0.3, audioContext.currentTime + i * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.15 + 0.4);
        osc.start(audioContext.currentTime + i * 0.15);
        osc.stop(audioContext.currentTime + i * 0.15 + 0.4);
      });
      break;
    case 'click':
      // Subtle click
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
      break;
  }
};

export default function GamePage() {
  const { chapterId, gameId } = useParams();
  const { feedback, level: currentLevel } = useGameStore();
  const previousLevelRef = useRef(currentLevel);

  // Find chapter and game
  const chapter = chapters.chapters.find(c => c.id === chapterId);
  const game = chapter?.missions.find(m => m.id === gameId);

  // Play sounds on feedback changes
  useEffect(() => {
    if (feedback) {
      if (feedback.success) {
        playSound('success');
        // Check for level up
        if (currentLevel > previousLevelRef.current) {
          playSound('levelup');
        }
        previousLevelRef.current = currentLevel;
      } else if (!feedback.isHint) {
        playSound('error');
      }
    }
  }, [feedback, currentLevel]);

  // Auto-open sound on first interaction (browser policy)
  const enableAudio = () => {
    if (typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        new AudioContext().resume();
      }
    }
  };

  if (!chapter || !game) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex-1 flex overflow-hidden">
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 p-4 overflow-hidden">
          {game.type === 'sql_debug' && <CodeEditor />}
          {game.type === 'terminal' && <Terminal />}
          {game.type === 'pipeline' && <PipelineBuilder />}
        </div>
      </main>

      <aside className="w-80 border-l border-border bg-primary overflow-hidden">
        <TaskPanel />
      </aside>
    </div>
  );
}