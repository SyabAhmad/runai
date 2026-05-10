import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const BADGES = {
  // Streak badges
  streak_3:  { id: 'streak_3',  name: 'Spark Starter',    emoji: '✨',  desc: '3 day streak',          color: '#a78bfa' },
  streak_7:  { id: 'streak_7',  name: 'Week Warrior',     emoji: '🔥',  desc: '7 day streak',          color: '#f97316' },
  streak_14: { id: 'streak_14', name: 'Fortnight Flame',   emoji: '💥',  desc: '14 day streak',         color: '#ef4444' },
  streak_30: { id: 'streak_30', name: 'Monthly Maven',     emoji: '👑',  desc: '30 day streak',         color: '#eab308' },
  streak_60: { id: 'streak_60', name: 'Double Decade',     emoji: '🏆',  desc: '60 day streak',         color: '#f59e0b' },
  streak_90: { id: 'streak_90', name: 'Legend Streaker',  emoji: '🌟',  desc: '90 day streak',         color: '#facc15' },
  // Completion badges
  first_mission:  { id: 'first_mission',  name: 'First Spark',     emoji: '🌱',  desc: 'Complete first mission',    color: '#34d399' },
  ten_complete:   { id: 'ten_complete',   name: 'Deca Learner',    emoji: '📓',  desc: 'Complete 10 missions',      color: '#60a5fa' },
  fifty_complete: { id: 'fifty_complete', name: 'Half Century',   emoji: '🎯',  desc: 'Complete 50 missions',      color: '#a78bfa' },
  hundred_complete: { id: 'hundred_complete', name: 'Century Club', emoji: '💎',  desc: 'Complete 100 missions',     color: '#f472b6' },
  all_sql:        { id: 'all_sql',        name: 'SQL Master',     emoji: '🗄️',  desc: 'Complete all SQL missions', color: '#38bdf8' },
  all_docker:     { id: 'all_docker',     name: 'Docker Sage',     emoji: '🐳',  desc: 'Complete all Docker missions', color: '#22d3ee' },
  all_linux:      { id: 'all_linux',      name: 'Linux Wizard',   emoji: '🐧',  desc: 'Complete all Linux missions', color: '#4ade80' },
};

export const STREAK_BONUSES = {
  3:  25,
  7:  50,
  14: 100,
  30: 250,
  60: 500,
  90: 1000,
};

const getStreakBadges = (streak) => {
  const badges = [];
  const thresholds = [3, 7, 14, 30, 60, 90];
  for (const t of thresholds) {
    if (streak >= t) badges.push(`streak_${t}`);
  }
  return badges;
};

const getCompletionBadges = (completedMissions, totalMissions) => {
  const badges = [];
  const total = Object.values(completedMissions).flat().length;
  const sqlCount = Object.entries(completedMissions)
    .filter(([key]) => key.startsWith('sql/'))
    .flatMap(([, m]) => m).length;

  if (total >= 1)  badges.push('first_mission');
  if (total >= 10) badges.push('ten_complete');
  if (total >= 50) badges.push('fifty_complete');
  if (total >= 100) badges.push('hundred_complete');
  return badges;
};

export const useGameStore = create(
  persist(
    (set, get) => ({
      currentTechnology: null,
      currentChapter: null,
      currentMission: null,
      completedMissions: {},
      xp: 0,
      level: 1,
      streak: 0,
      longestStreak: 0,
      weeklyStreak: 0,
      lastCompletedDate: null,
      hintsUsed: {},
      badges: [],

      setCurrentTechnology: (tech) => set({ currentTechnology: tech }),
      setCurrentChapter: (chapter) => set({ currentChapter: chapter }),
      setCurrentMission: (mission) => set({ currentMission: mission }),

      addXp: (amount) => set((state) => {
        const newXp = state.xp + amount;
        const newLevel = Math.floor(newXp / 500) + 1;
        return { xp: newXp, level: newLevel };
      }),

      getChapterProgress: (tech, chapter) => {
        const state = get();
        const key = `${tech}/${chapter}`;
        const completed = state.completedMissions[key] || [];
        return completed.length;
      },

      getChapterTotal: (tech, chapter, missions) => {
        return missions ? missions.length : 10;
      },

      isUnlocked: (tech, chapter, missionId) => {
        const state = get();
        const key = `${tech}/${chapter}`;
        const completed = state.completedMissions[key] || [];
        const missionNum = parseInt(missionId.split('_')[1]);
        if (missionNum === 1) return true;
        const prevMissionId = `mission_${String(missionNum - 1).padStart(2, '0')}`;
        return completed.includes(prevMissionId);
      },

      getHintPenalty: (tech, chapter, missionId) => {
        const state = get();
        const key = `${tech}/${chapter}/${missionId}`;
        const count = state.hintsUsed[key] || 0;
        if (count === 0) return 0;
        return Math.min(count * 10, 50);
      },

      useHint: (tech, chapter, missionId) => {
        const state = get();
        const key = `${tech}/${chapter}/${missionId}`;
        const current = state.hintsUsed[key] || 0;
        set({ hintsUsed: { ...state.hintsUsed, [key]: current + 1 } });
        return current + 1;
      },

      completeMission: (tech, chapter, missionId, xpReward = 100) => {
        const key = `${tech}/${chapter}`;
        const today = new Date().toISOString().split('T')[0];

        set((state) => {
          const completed = state.completedMissions[key] || [];
          if (completed.includes(missionId)) return state;

          const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
          let newStreak = state.streak;
          if (state.lastCompletedDate === today) {
          } else if (state.lastCompletedDate === yesterday) {
            newStreak = state.streak + 1;
          } else {
            newStreak = 1;
          }
          const longestStreak = Math.max(state.longestStreak, newStreak);

          let streakBonus = 0;
          for (const [threshold, bonus] of Object.entries(STREAK_BONUSES)) {
            if (newStreak >= Number(threshold)) streakBonus = bonus;
          }

          const hintKey = `${tech}/${chapter}/${missionId}`;
          const hintsUsed = state.hintsUsed[hintKey] || 0;
          const penalty = hintsUsed === 0 ? 0 : Math.min(hintsUsed * 10, 50);

          const finalXp = xpReward - penalty + streakBonus;
          const newXp = state.xp + Math.max(finalXp, 10);
          const newLevel = Math.floor(newXp / 500) + 1;

          const newCompletedMissions = {
            ...state.completedMissions,
            [key]: [...completed, missionId],
          };
          const totalCompleted = Object.values(newCompletedMissions).flat().length;
          const streakBadges = getStreakBadges(newStreak);
          const completionBadges = getCompletionBadges(newCompletedMissions, totalCompleted);
          const newBadges = [...new Set([...state.badges, ...streakBadges, ...completionBadges])];

          return {
            completedMissions: newCompletedMissions,
            xp: newXp,
            level: newLevel,
            streak: newStreak,
            longestStreak,
            lastCompletedDate: today,
            badges: newBadges,
          };
        });
      },
    }),
    {
      name: 'runai-progress',
      getStorage: () => localStorage,
      skipHydration: true,
    }
  )
);