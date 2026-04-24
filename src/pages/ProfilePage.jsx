import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';

const missionModules = import.meta.glob('../data/games/**/mission_*/games.json', { eager: true });

const formatName = (value) =>
  value.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

export default function ProfilePage() {
  const { xp, completedMissions } = useGameStore();

  const profile = useMemo(() => {
    const xpPerLevel = 500;
    const level = Math.floor(xp / xpPerLevel) + 1;
    const currentLevelXp = xp % xpPerLevel;
    const levelProgress = (currentLevelXp / xpPerLevel) * 100;
    const xpToNextLevel = xpPerLevel - currentLevelXp;

    const completedSets = {};
    Object.entries(completedMissions).forEach(([key, missions]) => {
      completedSets[key] = new Set(missions);
    });

    const techStats = {};
    const chapterRows = [];
    const missionRows = [];

    Object.keys(missionModules).forEach((path) => {
      const parts = path.split('/');
      const tech = parts[3];
      const chapter = parts[4];
      const missionId = parts[5];
      if (!tech || !chapter || !missionId || !missionId.startsWith('mission_')) return;

      if (!techStats[tech]) techStats[tech] = { total: 0, completed: 0, chapters: {} };
      if (!techStats[tech].chapters[chapter]) techStats[tech].chapters[chapter] = { total: 0, completed: 0 };

      const key = `${tech}/${chapter}`;
      const done = completedSets[key]?.has(missionId) || false;

      techStats[tech].total += 1;
      techStats[tech].chapters[chapter].total += 1;
      if (done) {
        techStats[tech].completed += 1;
        techStats[tech].chapters[chapter].completed += 1;
      }

      missionRows.push({
        tech,
        chapter,
        missionId,
        done,
      });
    });

    Object.entries(techStats).forEach(([tech, stats]) => {
      Object.entries(stats.chapters).forEach(([chapter, chapterStats]) => {
        chapterRows.push({
          tech,
          chapter,
          ...chapterStats,
          percent: chapterStats.total ? Math.round((chapterStats.completed / chapterStats.total) * 100) : 0,
        });
      });
    });

    const totalMissions = missionRows.length;
    const completedCount = missionRows.filter((item) => item.done).length;
    const completionRate = totalMissions ? Math.round((completedCount / totalMissions) * 100) : 0;

    const sortedTech = Object.entries(techStats)
      .map(([tech, stats]) => ({
        tech,
        ...stats,
        percent: stats.total ? Math.round((stats.completed / stats.total) * 100) : 0,
      }))
      .sort((a, b) => b.percent - a.percent || b.completed - a.completed);

    const nextMission = missionRows
      .sort((a, b) => {
        if (a.tech !== b.tech) return a.tech.localeCompare(b.tech);
        if (a.chapter !== b.chapter) return a.chapter.localeCompare(b.chapter);
        return a.missionId.localeCompare(b.missionId);
      })
      .find((item) => !item.done);

    const topChapter = [...chapterRows].sort((a, b) => b.percent - a.percent || b.completed - a.completed)[0];

    return {
      level,
      xpToNextLevel,
      levelProgress,
      completedCount,
      totalMissions,
      completionRate,
      techRows: sortedTech,
      chapterRows: chapterRows.sort((a, b) => b.percent - a.percent || b.completed - a.completed),
      nextMission,
      topChapter,
    };
  }, [xp, completedMissions]);

  return (
    <div className="min-h-screen bg-primary overflow-y-auto px-6 py-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-secondary via-[#1a2638] to-[#0f172a] p-6">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute -bottom-16 left-10 h-40 w-40 rounded-full bg-success/10 blur-3xl" />

          <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-text-dim">Profile Command Center</p>
              <h1 className="mt-2 text-3xl font-bold text-text">Learning Performance</h1>
              <p className="mt-2 text-sm text-text-muted">
                Track momentum, completion quality, and next mission priority.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2">
              <span className="text-xs uppercase tracking-wider text-accent">Level</span>
              <span className="text-lg font-semibold text-accent">{profile.level}</span>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="panel p-4">
            <p className="text-xs uppercase tracking-wide text-text-dim">Total XP</p>
            <p className="mt-2 text-3xl font-bold text-text">{xp}</p>
          </div>
          <div className="panel p-4">
            <p className="text-xs uppercase tracking-wide text-text-dim">Missions Completed</p>
            <p className="mt-2 text-3xl font-bold text-success">{profile.completedCount}</p>
          </div>
          <div className="panel p-4">
            <p className="text-xs uppercase tracking-wide text-text-dim">Coverage</p>
            <p className="mt-2 text-3xl font-bold text-accent">{profile.completionRate}%</p>
          </div>
          <div className="panel p-4">
            <p className="text-xs uppercase tracking-wide text-text-dim">Catalog Size</p>
            <p className="mt-2 text-3xl font-bold text-text">{profile.totalMissions}</p>
          </div>
        </section>

        <section className="panel p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-text-dim">Level Progress</h2>
            <span className="text-xs text-text-muted">{profile.xpToNextLevel} XP to Level {profile.level + 1}</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-border">
            <div
              className="h-full bg-gradient-to-r from-accent to-[#60a5fa] transition-all duration-500"
              style={{ width: `${profile.levelProgress}%` }}
            />
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="panel p-5 lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-text-dim">Technology Breakdown</h2>
              <span className="text-xs text-text-muted">Sorted by completion</span>
            </div>
            <div className="space-y-4">
              {profile.techRows.map((techRow) => (
                <div key={techRow.tech}>
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-sm font-medium text-text">{formatName(techRow.tech)}</p>
                    <p className="text-xs text-accent">{techRow.completed}/{techRow.total} ({techRow.percent}%)</p>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-border">
                    <div className="h-full bg-accent transition-all duration-500" style={{ width: `${techRow.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-5 lg:col-span-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-text-dim">Focus Signals</h2>
            <div className="mt-4 space-y-4">
              <div className="rounded-lg border border-border bg-primary/50 p-4">
                <p className="text-xs text-text-dim">Best Chapter</p>
                <p className="mt-1 text-sm font-semibold text-text">
                  {profile.topChapter ? `${formatName(profile.topChapter.tech)} / ${formatName(profile.topChapter.chapter)}` : 'No chapter data'}
                </p>
                <p className="mt-1 text-xs text-accent">
                  {profile.topChapter ? `${profile.topChapter.completed}/${profile.topChapter.total} complete` : 'Start a mission to generate stats'}
                </p>
              </div>

              <div className="rounded-lg border border-border bg-primary/50 p-4">
                <p className="text-xs text-text-dim">Next Target</p>
                <p className="mt-1 text-sm font-semibold text-text">
                  {profile.nextMission
                    ? `${formatName(profile.nextMission.tech)} / ${formatName(profile.nextMission.chapter)} / ${formatName(profile.nextMission.missionId)}`
                    : 'All missions complete'}
                </p>
                {profile.nextMission && (
                  <Link
                    to={`/${profile.nextMission.tech}/${profile.nextMission.chapter}/${profile.nextMission.missionId}`}
                    className="mt-3 inline-flex items-center rounded-md border border-accent/40 bg-accent/15 px-3 py-1.5 text-xs font-medium text-accent hover:bg-accent/25"
                  >
                    Resume Mission
                  </Link>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link to="/" className="panel p-3 text-center text-xs font-medium text-text hover:border-accent/60">
                  Home
                </Link>
                <Link to="/sql" className="panel p-3 text-center text-xs font-medium text-text hover:border-accent/60">
                  SQL Track
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="panel p-5">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-dim">Chapter Leaderboard</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {profile.chapterRows.slice(0, 9).map((row) => (
              <div key={`${row.tech}/${row.chapter}`} className="rounded-lg border border-border bg-primary/40 p-3">
                <p className="text-xs text-text-dim">{formatName(row.tech)}</p>
                <p className="mt-1 text-sm font-medium text-text">{formatName(row.chapter)}</p>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-text-muted">{row.completed}/{row.total} complete</span>
                  <span className="text-accent">{row.percent}%</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
