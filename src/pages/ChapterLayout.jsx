import { Outlet, Navigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useGameStore } from '../store/gameStore';

// Get all mission games.json to extract chapters
const missionModules = import.meta.glob('../data/games/**/mission_*/games.json', { eager: true });

export default function ChapterLayout() {
  const { technology } = useParams();
  const setCurrentTechnology = useGameStore((s) => s.setCurrentTechnology);
  setCurrentTechnology(technology);

  // Extract unique chapters for this technology
  const chapterSet = new Set();
  Object.keys(missionModules).forEach(path => {
    if (path.includes(`/data/games/${technology}/`)) {
      const parts = path.split('/');
      const chapter = parts[4]; // ../data/games/[tech]/[chapter]/mission_XX/games.json
      if (chapter) chapterSet.add(chapter);
    }
  });
  const chapters = Array.from(chapterSet);

  if (!chapters.length) return <Navigate to="/" replace />;

  return (
    <div className="h-screen flex overflow-hidden bg-primary">
      <Sidebar technology={technology} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col p-4 overflow-hidden">
            <Outlet context={{ technology, chapters }} />
          </div>
          <aside className="w-80 border-l border-border bg-primary overflow-hidden">
            {/* TaskPanel can be rendered here by child routes if needed */}
          </aside>
        </main>
      </div>
    </div>
  );
}
