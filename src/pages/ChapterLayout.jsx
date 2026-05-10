import { useEffect } from "react";
import { Outlet, Navigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useGameStore } from "../store/gameStore";
import { MISSIONS } from "../data/missions";

export default function ChapterLayout() {
  const { technology } = useParams();
  const setCurrentTechnology = useGameStore((s) => s.setCurrentTechnology);

  useEffect(() => {
    setCurrentTechnology(technology);
  }, [technology, setCurrentTechnology]);

  const chapterSet = new Set();
  Object.keys(MISSIONS).forEach((key) => {
    if (key.startsWith(`${technology}/`)) {
      const parts = key.split("/");
      if (parts[2]) chapterSet.add(parts[2]);
    }
  });
  const chapters = Array.from(chapterSet);

  if (!chapters.length) return <Navigate to="/" replace />;

  return (
    <div className="h-screen flex overflow-hidden bg-primary">
      <Sidebar technology={technology} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto">
            <Outlet context={{ technology, chapters }} />
          </div>
        </main>
      </div>
    </div>
  );
}
