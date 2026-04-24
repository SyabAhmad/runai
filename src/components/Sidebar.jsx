import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';

const missionModules = import.meta.glob('../data/games/**/mission_*/games.json', { eager: true });
const XP_PER_LEVEL = 500;

export default function Sidebar({ technology: propTech }) {
  const { technology: urlTech, chapter: urlChapter, mission: urlMission } = useParams();
  const tech = propTech || urlTech;
  const chapter = urlChapter;
  const { xp, completedMissions } = useGameStore();

  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const levelProgress = ((xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100;

  const chapters = useMemo(() => {
    if (!tech) return [];
    const chapterSet = new Set();
    Object.keys(missionModules).forEach((path) => {
      if (path.includes(`/data/games/${tech}/`)) {
        const parts = path.split('/');
        const chapterId = parts[4];
        if (chapterId) chapterSet.add(chapterId);
      }
    });
    return Array.from(chapterSet).sort((a, b) => a.localeCompare(b));
  }, [tech]);

  const missions = useMemo(() => {
    if (!chapter || !tech) return [];
    const missionList = [];

    Object.entries(missionModules).forEach(([path, module]) => {
      if (path.includes(`/data/games/${tech}/${chapter}/`)) {
        const parts = path.split('/');
        const missionFolder = parts[5];
        if (missionFolder?.startsWith('mission_')) {
          missionList.push({
            id: missionFolder,
            ...module.default,
          });
        }
      }
    });

    return missionList.sort((a, b) => {
      const numA = Number.parseInt(a.id.split('_')[1], 10);
      const numB = Number.parseInt(b.id.split('_')[1], 10);
      return numA - numB;
    });
  }, [tech, chapter]);

  const formatName = (str) => {
    if (!str) return '';
    return str.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const renderMissionIcon = (mission, isCompleted, isUnlocked) => {
    if (isCompleted) {
      return (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    }
    if (!isUnlocked) {
      return (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m0 0v3m0-3h3m-3 0H9m3 0a9 9 0 10-9-9c1.153 0 2.24.275 3.193.765a6.985 6.985 0 014.197 4.197A9 9 0 0112 21z" />
        </svg>
      );
    }
    return <span className="text-xs font-semibold">{mission.id.split('_').pop()}</span>;
  };

  return (
    <aside className="h-full w-72 border-r border-border bg-gradient-to-b from-primary via-[#0f1724] to-primary">
      <div className="flex h-full flex-col">
        <div className="border-b border-border px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20 text-accent">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-text">RunAI</p>
              <p className="text-xs text-text-dim">Mission Console</p>
            </div>
          </div>
        </div>

        <div className="border-b border-border px-4 py-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
              Lvl {level}
            </span>
            <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
              {xp} XP
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-border">
            <div
              className="h-full bg-gradient-to-r from-accent to-[#60a5fa] transition-all duration-300"
              style={{ width: `${levelProgress}%` }}
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-3 scrollbar-thin">
          {!chapter && (
            <div className="space-y-1">
              <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-text-dim">Chapters</p>
              {chapters.map((chapterId) => (
                <Link
                  key={chapterId}
                  to={`/${tech}/${chapterId}`}
                  className="flex items-center rounded-md border border-transparent px-3 py-2 text-xs text-text-muted transition-colors hover:border-accent/30 hover:bg-accent/10 hover:text-text"
                >
                  {formatName(chapterId)}
                </Link>
              ))}
            </div>
          )}

          {chapter && (
            <div className="space-y-1">
              <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-text-dim">{formatName(chapter)}</p>
              {missions.map((mission) => {
                const isCompleted = (completedMissions[`${tech}/${chapter}`] || []).includes(mission.id);
                const isActive = urlMission === mission.id;
                const isUnlocked = useGameStore.getState().isUnlocked(tech, chapter, mission.id);

                return (
                  <Link
                    key={mission.id}
                    to={`/${tech}/${chapter}/${mission.id}`}
                    className={`flex items-center gap-2 rounded-md border px-2.5 py-2 text-xs transition-colors ${
                      isActive
                        ? 'border-accent/40 bg-accent/15 text-text'
                        : 'border-transparent text-text-muted hover:border-border-muted hover:bg-secondary/40 hover:text-text'
                    } ${!isUnlocked ? 'pointer-events-none opacity-40' : ''}`}
                  >
                    <span className={`flex h-5 w-5 items-center justify-center rounded border text-[10px] ${
                      isCompleted ? 'border-success/40 bg-success/10 text-success' : 'border-border text-text-dim'
                    }`}>
                      {renderMissionIcon(mission, isCompleted, isUnlocked)}
                    </span>
                    <span className="flex-1 truncate">{mission.title || mission.id}</span>
                    <span className="text-[10px] font-medium text-accent">+{mission.xpReward || 100}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </nav>

        <div className="border-t border-border px-4 py-3">
          <div className="flex items-center gap-2 text-xs text-text-dim">
            <span className="h-2 w-2 rounded-full bg-success" />
            Training active
          </div>
        </div>
      </div>
    </aside>
  );
}
