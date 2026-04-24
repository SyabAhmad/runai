import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useGameStore } from "../store/gameStore";

const missionModules = import.meta.glob(
  "../data/games/**/mission_*/games.json",
  { eager: true },
);

const formatName = (value) =>
  value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

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
      const parts = path.split("/");
      const tech = parts[3];
      const chapter = parts[4];
      const missionId = parts[5];
      if (!tech || !chapter || !missionId || !missionId.startsWith("mission_"))
        return;

      if (!techStats[tech])
        techStats[tech] = { total: 0, completed: 0, chapters: {} };
      if (!techStats[tech].chapters[chapter])
        techStats[tech].chapters[chapter] = { total: 0, completed: 0 };

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
          percent: chapterStats.total
            ? Math.round((chapterStats.completed / chapterStats.total) * 100)
            : 0,
        });
      });
    });

    const totalMissions = missionRows.length;
    const completedCount = missionRows.filter((item) => item.done).length;
    const completionRate = totalMissions
      ? Math.round((completedCount / totalMissions) * 100)
      : 0;

    const sortedTech = Object.entries(techStats)
      .map(([tech, stats]) => ({
        tech,
        ...stats,
        percent: stats.total
          ? Math.round((stats.completed / stats.total) * 100)
          : 0,
      }))
      .sort((a, b) => b.percent - a.percent || b.completed - a.completed);

    const nextMission = missionRows
      .sort((a, b) => {
        if (a.tech !== b.tech) return a.tech.localeCompare(b.tech);
        if (a.chapter !== b.chapter) return a.chapter.localeCompare(b.chapter);
        return a.missionId.localeCompare(b.missionId);
      })
      .find((item) => !item.done);

    const topChapter = [...chapterRows].sort(
      (a, b) => b.percent - a.percent || b.completed - a.completed,
    )[0];

    return {
      level,
      xpToNextLevel,
      levelProgress,
      completedCount,
      totalMissions,
      completionRate,
      techRows: sortedTech,
      chapterRows: chapterRows.sort(
        (a, b) => b.percent - a.percent || b.completed - a.completed,
      ),
      nextMission,
      topChapter,
    };
  }, [xp, completedMissions]);

  return (
    <div className="min-h-screen bg-primary overflow-y-auto px-6 py-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="relative overflow-hidden rounded-2xl border border-pink-300/20 bg-gradient-to-br from-[#2d1f39] via-[#2a2544] to-[#13263c] p-6">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-pink-300/15 blur-3xl" />
          <div className="absolute -bottom-16 left-10 h-40 w-40 rounded-full bg-amber-300/10 blur-3xl" />

          <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-pink-200/80">
                Bestie Progress Diary
              </p>
              <h1 className="mt-2 text-3xl font-bold text-text">
                Pookie Growth Profile
              </h1>
              <p className="mt-2 text-sm text-pink-100/85">
                YOUR wins, streaks, and next sparkle mission in one place.
              </p>
            </div>
            <div className="inline-flex items-center gap-3 rounded-full border border-pink-300/30 bg-pink-400/10 px-4 py-2">
              <img
                src="/mentee-logo.png"
                alt="MenteE logo"
                className="h-7 w-7 rounded-full border border-pink-300/40 object-cover"
              />
              <span className="text-xs uppercase tracking-wider text-pink-200">
                Level
              </span>
              <span className="text-lg font-semibold text-pink-200">
                {profile.level}
              </span>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-pink-300/20 bg-gradient-to-b from-pink-400/10 to-secondary p-4">
            <p className="text-xs uppercase tracking-wide text-text-dim">
              Total XP
            </p>
            <p className="mt-2 text-3xl font-bold text-text">{xp}</p>
          </div>
          <div className="rounded-2xl border border-emerald-300/20 bg-gradient-to-b from-emerald-400/10 to-secondary p-4">
            <p className="text-xs uppercase tracking-wide text-text-dim">
              Missions Completed
            </p>
            <p className="mt-2 text-3xl font-bold text-success">
              {profile.completedCount}
            </p>
          </div>
          <div className="rounded-2xl border border-amber-300/20 bg-gradient-to-b from-amber-400/10 to-secondary p-4">
            <p className="text-xs uppercase tracking-wide text-text-dim">
              Coverage
            </p>
            <p className="mt-2 text-3xl font-bold text-amber-200">
              {profile.completionRate}%
            </p>
          </div>
          <div className="rounded-2xl border border-blue-300/20 bg-gradient-to-b from-blue-400/10 to-secondary p-4">
            <p className="text-xs uppercase tracking-wide text-text-dim">
              Catalog Size
            </p>
            <p className="mt-2 text-3xl font-bold text-text">
              {profile.totalMissions}
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-pink-300/20 bg-secondary/80 p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-text-dim">
              Love-Powered Progress
            </h2>
            <span className="text-xs text-pink-100/80">
              {profile.xpToNextLevel} XP to Level {profile.level + 1}
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-border">
            <div
              className="h-full bg-gradient-to-r from-pink-300 via-amber-300 to-blue-300 transition-all duration-500"
              style={{ width: `${profile.levelProgress}%` }}
            />
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="rounded-2xl border border-pink-300/20 bg-secondary/80 p-5 lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-text-dim">
                Tech Bloom Meter
              </h2>
              <span className="text-xs text-pink-100/75">
                Sorted by completion
              </span>
            </div>
            <div className="space-y-4">
              {profile.techRows.map((techRow) => (
                <div key={techRow.tech}>
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-sm font-medium text-text">
                      {formatName(techRow.tech)}
                    </p>
                    <p className="text-xs text-pink-200">
                      {techRow.completed}/{techRow.total} ({techRow.percent}%)
                    </p>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-border">
                    <div
                      className="h-full bg-gradient-to-r from-pink-300 to-amber-300 transition-all duration-500"
                      style={{ width: `${techRow.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-pink-300/20 bg-secondary/80 p-5 lg:col-span-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-text-dim">
              Bestie Focus Notes
            </h2>
            <div className="mt-4 space-y-4">
              <div className="rounded-lg border border-amber-300/20 bg-primary/50 p-4">
                <p className="text-xs text-text-dim">Best Chapter</p>
                <p className="mt-1 text-sm font-semibold text-text">
                  {profile.topChapter
                    ? `${formatName(profile.topChapter.tech)} / ${formatName(profile.topChapter.chapter)}`
                    : "No chapter data"}
                </p>
                <p className="mt-1 text-xs text-amber-200">
                  {profile.topChapter
                    ? `${profile.topChapter.completed}/${profile.topChapter.total} complete`
                    : "Start a mission to generate stats"}
                </p>
              </div>

              <div className="rounded-lg border border-pink-300/25 bg-primary/50 p-4">
                <p className="text-xs text-text-dim">Next Target</p>
                <p className="mt-1 text-sm font-semibold text-text">
                  {profile.nextMission
                    ? `${formatName(profile.nextMission.tech)} / ${formatName(profile.nextMission.chapter)} / ${formatName(profile.nextMission.missionId)}`
                    : "All missions complete"}
                </p>
                {profile.nextMission && (
                  <Link
                    to={`/${profile.nextMission.tech}/${profile.nextMission.chapter}/${profile.nextMission.missionId}`}
                    className="mt-3 inline-flex items-center rounded-md border border-pink-300/40 bg-pink-400/15 px-3 py-1.5 text-xs font-medium text-pink-200 hover:bg-pink-400/25"
                  >
                    Resume Pookie Mission
                  </Link>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/"
                  className="rounded-lg border border-pink-300/25 bg-primary/60 p-3 text-center text-xs font-medium text-text transition hover:border-pink-300/60"
                >
                  Home
                </Link>
                <Link
                  to="/sql"
                  className="rounded-lg border border-pink-300/25 bg-primary/60 p-3 text-center text-xs font-medium text-text transition hover:border-pink-300/60"
                >
                  SQL Track
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-pink-300/20 bg-secondary/80 p-5">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-dim">
            Chapter Loveboard
          </h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {profile.chapterRows.slice(0, 9).map((row) => (
              <div
                key={`${row.tech}/${row.chapter}`}
                className="rounded-lg border border-pink-300/15 bg-primary/40 p-3"
              >
                <p className="text-xs text-text-dim">{formatName(row.tech)}</p>
                <p className="mt-1 text-sm font-medium text-text">
                  {formatName(row.chapter)}
                </p>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-text-muted">
                    {row.completed}/{row.total} complete
                  </span>
                  <span className="text-pink-200">{row.percent}%</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
