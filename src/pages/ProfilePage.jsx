import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { useGameStore, BADGES } from "../store/gameStore";
import { MISSIONS } from "../data/missions";

const formatName = (value) =>
  value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

const getStreakEmoji = (streak) => {
  if (streak >= 90) return "🌟";
  if (streak >= 60) return "🏆";
  if (streak >= 30) return "👑";
  if (streak >= 14) return "💥";
  if (streak >= 7) return "🔥";
  if (streak >= 3) return "✨";
  if (streak >= 1) return "💫";
  return "🌙";
};

const getStreakLabel = (streak) => {
  if (streak >= 90) return "Legend Streaker";
  if (streak >= 60) return "Double Decade";
  if (streak >= 30) return "Monthly Maven";
  if (streak >= 14) return "Fortnight Flame";
  if (streak >= 7) return "Week Warrior";
  if (streak >= 3) return "Spark Starter";
  if (streak >= 1) return "Just Starting";
  return "No Streak";
};

const getStreakColor = (streak) => {
  if (streak >= 90) return "from-yellow-400 via-amber-400 to-orange-400";
  if (streak >= 60) return "from-amber-400 via-orange-400 to-red-400";
  if (streak >= 30) return "from-orange-400 via-red-400 to-pink-400";
  if (streak >= 14) return "from-red-400 via-pink-400 to-purple-400";
  if (streak >= 7) return "from-orange-400 to-red-500";
  if (streak >= 3) return "from-amber-400 to-orange-400";
  if (streak >= 1) return "from-yellow-400 to-amber-400";
  return "from-gray-400 to-gray-500";
};

export default function ProfilePage() {
  const { xp, streak, longestStreak, badges, completedMissions, level: storeLevel } = useGameStore(
    useShallow((s) => ({ xp: s.xp, streak: s.streak, longestStreak: s.longestStreak, badges: s.badges, completedMissions: s.completedMissions, level: s.level }))
  );

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

    Object.values(MISSIONS).forEach(m => {
      const key = `${m.tech}/${m.chapter}`;
      const done = completedSets[key]?.has(m.id) || false;
      if (!techStats[m.tech]) techStats[m.tech] = { total: 0, completed: 0, chapters: {} };
      if (!techStats[m.tech].chapters[m.chapter]) techStats[m.tech].chapters[m.chapter] = { total: 0, completed: 0 };
      techStats[m.tech].total += 1;
      techStats[m.tech].chapters[m.chapter].total += 1;
      if (done) {
        techStats[m.tech].completed += 1;
        techStats[m.tech].chapters[m.chapter].completed += 1;
      }
      missionRows.push({ tech: m.tech, chapter: m.chapter, missionId: m.id, done });
    });

    Object.entries(techStats).forEach(([tech, stats]) => {
      Object.entries(stats.chapters).forEach(([chapter, chapterStats]) => {
        chapterRows.push({ tech, chapter, ...chapterStats, percent: chapterStats.total ? Math.round((chapterStats.completed / chapterStats.total) * 100) : 0 });
      });
    });

    const totalMissions = missionRows.length;
    const completedCount = missionRows.filter((item) => item.done).length;
    const completionRate = totalMissions ? Math.round((completedCount / totalMissions) * 100) : 0;

    const sortedTech = Object.entries(techStats).map(([tech, stats]) => ({
      tech, ...stats, percent: stats.total ? Math.round((stats.completed / stats.total) * 100) : 0,
    })).sort((a, b) => b.percent - a.percent || b.completed - a.completed);

    const nextMission = missionRows.sort((a, b) => {
      if (a.tech !== b.tech) return a.tech.localeCompare(b.tech);
      if (a.chapter !== b.chapter) return a.chapter.localeCompare(b.chapter);
      return a.missionId.localeCompare(b.missionId);
    }).find((item) => !item.done);

    const topChapter = [...chapterRows].sort((a, b) => b.percent - a.percent || b.completed - a.completed)[0];

    return { xpToNextLevel, levelProgress, completedCount, totalMissions, completionRate, techRows: sortedTech, chapterRows: chapterRows.sort((a, b) => b.percent - a.percent || b.completed - a.completed), nextMission, topChapter };
  }, [xp, completedMissions]);

  const earnedBadges = badges.map(id => BADGES[id]).filter(Boolean);
  const allBadgesList = Object.values(BADGES);
  const lockedBadges = allBadgesList.filter(b => !badges.includes(b.id));

  return (
    <div className="min-h-screen bg-primary overflow-y-auto px-6 py-6">
      <div className="mx-auto max-w-6xl space-y-6">

        {/* Header */}
        <section className="relative overflow-hidden rounded-2xl border border-pink-300/20 bg-gradient-to-br from-[#2d1f39] via-[#2a2544] to-[#13263c] p-6">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-pink-300/15 blur-3xl" />
          <div className="absolute -bottom-16 left-10 h-40 w-40 rounded-full bg-amber-300/10 blur-3xl" />
          <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-pink-200/80">Bestie Progress Diary</p>
              <h1 className="mt-2 text-3xl font-bold text-text">Pookie Growth Profile</h1>
              <p className="mt-2 text-sm text-pink-100/85">Your wins, streaks, and next sparkle mission in one place.</p>
            </div>
            <div className="inline-flex items-center gap-3 rounded-full border border-pink-300/30 bg-pink-400/10 px-4 py-2">
              <img src="/mentee-logo.png" alt="MenteE logo" className="h-7 w-7 rounded-full border border-pink-300/40 object-cover" />
              <span className="text-xs uppercase tracking-wider text-pink-200">Level</span>
              <span className="text-lg font-semibold text-pink-200">{storeLevel}</span>
            </div>
          </div>
        </section>

        {/* Streak Banner */}
        <section className={`relative overflow-hidden rounded-2xl border border-amber-300/30 bg-gradient-to-r ${getStreakColor(streak)} p-1`}>
          <div className="rounded-xl bg-secondary/90 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-5xl">{getStreakEmoji(streak)}</span>
                <div>
                  <p className="text-3xl font-bold text-text">{streak}</p>
                  <p className="text-sm font-medium text-text/80">day streak {streak > 1 ? "🔥" : ""}</p>
                  <p className="text-xs text-text/60">{getStreakLabel(streak)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-text/60">Best Ever</p>
                <p className="text-lg font-bold text-amber-200">{longestStreak} {longestStreak >= 3 ? getStreakEmoji(longestStreak) : ""}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <div className="rounded-2xl border border-pink-300/20 bg-gradient-to-b from-pink-400/10 to-secondary p-4 text-center">
            <p className="text-2xl">⚡</p>
            <p className="mt-1 text-2xl font-bold text-text">{profile.xp}</p>
            <p className="text-xs text-text-dim">Total XP</p>
          </div>
          <div className="rounded-2xl border border-emerald-300/20 bg-gradient-to-b from-emerald-400/10 to-secondary p-4 text-center">
            <p className="text-2xl">✅</p>
            <p className="mt-1 text-2xl font-bold text-success">{profile.completedCount}</p>
            <p className="text-xs text-text-dim">Missions Done</p>
          </div>
          <div className="rounded-2xl border border-blue-300/20 bg-gradient-to-b from-blue-400/10 to-secondary p-4 text-center">
            <p className="text-2xl">🎯</p>
            <p className="mt-1 text-2xl font-bold text-blue-200">{profile.completionRate}%</p>
            <p className="text-xs text-text-dim">Coverage</p>
          </div>
          <div className="rounded-2xl border border-purple-300/20 bg-gradient-to-b from-purple-400/10 to-secondary p-4 text-center">
            <p className="text-2xl">📚</p>
            <p className="mt-1 text-2xl font-bold text-purple-200">{profile.totalMissions}</p>
            <p className="text-xs text-text-dim">Total Missions</p>
          </div>
          <div className="rounded-2xl border border-amber-300/20 bg-gradient-to-b from-amber-400/10 to-secondary p-4 text-center">
            <p className="text-2xl">🏅</p>
            <p className="mt-1 text-2xl font-bold text-amber-200">{badges.length}</p>
            <p className="text-xs text-text-dim">Badges Earned</p>
          </div>
          <div className="rounded-2xl border border-pink-300/20 bg-gradient-to-b from-pink-400/10 to-secondary p-4 text-center">
            <p className="text-2xl">🔥</p>
            <p className="mt-1 text-2xl font-bold text-text">{streak}</p>
            <p className="text-xs text-text-dim">Day Streak</p>
          </div>
        </section>

        {/* Badges */}
        <section className="rounded-2xl border border-pink-300/20 bg-secondary/80 p-5">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-dim">
            ✨ Badge Collection — {earnedBadges.length}/{allBadgesList.length} Unlocked
          </h2>
          {/* Earned */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {earnedBadges.map((badge) => (
              <div key={badge.id} className="group relative flex flex-col items-center rounded-xl border border-pink-300/30 bg-gradient-to-b from-amber-400/10 to-primary/80 p-3 text-center shadow-lg shadow-amber-500/5">
                <span className="text-3xl">{badge.emoji}</span>
                <p className="mt-1 text-xs font-semibold text-text">{badge.name}</p>
                <p className="text-[10px] text-text-dim">{badge.desc}</p>
                <div className="absolute -top-10 left-1/2 z-50 max-w-[140px] -translate-x-1/2 scale-0 rounded-lg border border-pink-300/30 bg-[#1a1025] px-2 py-1 text-xs text-text opacity-0 transition group-hover:scale-100 group-hover:opacity-100 pointer-events-none whitespace-nowrap">
                  {badge.name} — {badge.desc}
                </div>
              </div>
            ))}
            {lockedBadges.map((badge) => (
              <div key={badge.id} className="group relative flex flex-col items-center rounded-xl border border-border/50 bg-primary/30 p-3 text-center opacity-50 grayscale">
                <span className="text-3xl blur-[1px]">{badge.emoji}</span>
                <p className="mt-1 text-xs font-semibold text-text/60">{badge.name}</p>
                <p className="text-[10px] text-text/40">{badge.desc}</p>
                <div className="absolute -top-10 left-1/2 z-50 max-w-[140px] -translate-x-1/2 scale-0 rounded-lg border border-border/50 bg-[#1a1025] px-2 py-1 text-xs text-text/60 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 pointer-events-none whitespace-nowrap">
                  🔒 {badge.name} — {badge.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Progress */}
        <section className="rounded-2xl border border-pink-300/20 bg-secondary/80 p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-text-dim">Love-Powered Progress</h2>
            <span className="text-xs text-pink-100/80">{profile.xpToNextLevel} XP to Level {storeLevel + 1}</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-border">
            <div className="h-full bg-gradient-to-r from-pink-300 via-amber-300 to-blue-300 transition-all duration-500" style={{ width: `${profile.levelProgress}%` }} />
          </div>
        </section>

        {/* Tech Progress */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="rounded-2xl border border-pink-300/20 bg-secondary/80 p-5 lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-text-dim">Tech Bloom Meter</h2>
              <span className="text-xs text-pink-100/75">Sorted by completion</span>
            </div>
            <div className="space-y-4">
              {profile.techRows.map((techRow) => (
                <div key={techRow.tech}>
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-sm font-medium text-text">{formatName(techRow.tech)}</p>
                    <p className="text-xs text-pink-200">{techRow.completed}/{techRow.total} ({techRow.percent}%)</p>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-border">
                    <div className="h-full bg-gradient-to-r from-pink-300 to-amber-300 transition-all duration-500" style={{ width: `${techRow.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-pink-300/20 bg-secondary/80 p-5 lg:col-span-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-text-dim">Bestie Focus Notes</h2>
            <div className="mt-4 space-y-4">
              <div className="rounded-lg border border-amber-300/20 bg-primary/50 p-4">
                <p className="text-xs text-text-dim">Best Chapter</p>
                <p className="mt-1 text-sm font-semibold text-text">
                  {profile.topChapter ? `${formatName(profile.topChapter.tech)} / ${formatName(profile.topChapter.chapter)}` : "No chapter data"}
                </p>
                <p className="mt-1 text-xs text-amber-200">
                  {profile.topChapter ? `${profile.topChapter.completed}/${profile.topChapter.total} complete` : "Start a mission to generate stats"}
                </p>
              </div>
              <div className="rounded-lg border border-pink-300/25 bg-primary/50 p-4">
                <p className="text-xs text-text-dim">Next Target</p>
                <p className="mt-1 text-sm font-semibold text-text">
                  {profile.nextMission ? `${formatName(profile.nextMission.tech)} / ${formatName(profile.nextMission.chapter)} / ${formatName(profile.nextMission.missionId)}` : "All missions complete"}
                </p>
                {profile.nextMission && (
                  <Link to={`/${profile.nextMission.tech}/${profile.nextMission.chapter}/${profile.nextMission.missionId}`} className="mt-3 inline-flex items-center rounded-md border border-pink-300/40 bg-pink-400/15 px-3 py-1.5 text-xs font-medium text-pink-200 hover:bg-pink-400/25">
                    Resume Pookie Mission
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/" className="rounded-lg border border-pink-300/25 bg-primary/60 p-3 text-center text-xs font-medium text-text transition hover:border-pink-300/60">Home</Link>
                <Link to="/sql" className="rounded-lg border border-pink-300/25 bg-primary/60 p-3 text-center text-xs font-medium text-text transition hover:border-pink-300/60">SQL Track</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter Loveboard */}
        <section className="rounded-2xl border border-pink-300/20 bg-secondary/80 p-5">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-dim">Chapter Loveboard</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {profile.chapterRows.slice(0, 9).map((row) => (
              <div key={`${row.tech}/${row.chapter}`} className="rounded-lg border border-pink-300/15 bg-primary/40 p-3">
                <p className="text-xs text-text-dim">{formatName(row.tech)}</p>
                <p className="mt-1 text-sm font-medium text-text">{formatName(row.chapter)}</p>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-text-muted">{row.completed}/{row.total} complete</span>
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