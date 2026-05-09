import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useGameStore = create(
  persist(
    (set, get) => ({
      currentTechnology: null,
      currentChapter: null,
      currentMission: null,
      completedMissions: {}, // { "tech/chapter": ["mission_01", "mission_02"] }
      xp: 0,
      level: 1,
      streak: 0,
      lastCompletedDate: null, // ISO date string for streak tracking
      hintsUsed: {}, // { "tech/chapter/missionId": count }
      badges: [], // earned badge IDs

      setCurrentTechnology: (tech) => set({ currentTechnology: tech }),
      setCurrentChapter: (chapter) => set({ currentChapter: chapter }),
      setCurrentMission: (mission) => set({ currentMission: mission }),

      getCurrentMission: () => {
        const state = get();
        if (!state.currentTechnology || !state.currentChapter || !state.currentMission) return {};
        
        const { currentTechnology, currentChapter, currentMission } = state;
        const basePath = `../data/games/${currentTechnology}/${currentChapter}/${currentMission}`;
        
        try {
          // Load mission data from JSON files
          const games = require(`../data/games/${currentTechnology}/${currentChapter}/${currentMission}/games.json`);
          const descriptions = require(`../data/games/${currentTechnology}/${currentChapter}/${currentMission}/descriptions.json`);
          const hints = require(`../data/games/${currentTechnology}/${currentChapter}/${currentMission}/hints.json`);
          const solutions = require(`../data/games/${currentTechnology}/${currentChapter}/${currentMission}/solutions.json`);
          const outcomes = require(`../data/games/${currentTechnology}/${currentChapter}/${currentMission}/outcomes.json`);
          
          return {
            game: games,
            description: descriptions[currentMission] || '',
            hints: hints[currentMission] || [],
            solution: solutions[currentMission] || '',
            outcome: outcomes[currentMission] || ''
          };
        } catch {
          return {};
        }
      },

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
        // Count missions in the chapter folder
        return missions ? missions.length : 10;
      },

      isUnlocked: (tech, chapter, missionId) => {
        const state = get();
        const key = `${tech}/${chapter}`;
        const completed = state.completedMissions[key] || [];

        // Extract mission number
        const missionNum = parseInt(missionId.split('_')[1]);
        if (missionNum === 1) return true; // First mission always unlocked

        const prevMissionId = `mission_${String(missionNum - 1).padStart(2, '0')}`;
        return completed.includes(prevMissionId);
      },

      getHintPenalty: (tech, chapter, missionId) => {
        const state = get();
        const key = `${tech}/${chapter}/${missionId}`;
        const count = state.hintsUsed[key] || 0;
        if (count === 0) return 0; // First hint free
        return Math.min(count * 10, 50); // -10, -20, -30, -40, -50 max
      },

      useHint: (tech, chapter, missionId) => {
        const state = get();
        const key = `${tech}/${chapter}/${missionId}`;
        const current = state.hintsUsed[key] || 0;
        set({ hintsUsed: { ...state.hintsUsed, [key]: current + 1 } });
        return current + 1; // Return new count
      },

      completeMission: (tech, chapter, missionId, xpReward = 100) => {
        const key = `${tech}/${chapter}`;
        const today = new Date().toISOString().split('T')[0];

        set((state) => {
          const completed = state.completedMissions[key] || [];
          if (completed.includes(missionId)) {
            return state;
          }

          // Streak logic
          let newStreak = state.streak;
          if (state.lastCompletedDate === today) {
            // Same day, streak unchanged
          } else if (state.lastCompletedDate === new Date(Date.now() - 86400000).toISOString().split('T')[0]) {
            // Consecutive day
            newStreak = state.streak + 1;
          } else {
            // Streak broken or first time
            newStreak = 1;
          }

          // Streak bonus XP
          let streakBonus = 0;
          if (newStreak === 7) streakBonus = 100; // 7-day badge
          if (newStreak === 30) streakBonus = 500; // 30-day badge
          if (newStreak > 0 && newStreak % 10 === 0) streakBonus = 50; // Every 10 days

          // Hint penalty
          const hintKey = `${tech}/${chapter}/${missionId}`;
          const hintsUsed = state.hintsUsed[hintKey] || 0;
          const penalty = hintsUsed === 0 ? 0 : Math.min(hintsUsed * 10, 50);

          const finalXp = xpReward - penalty + streakBonus;
          const newXp = state.xp + Math.max(finalXp, 10); // Minimum 10 XP
          const newLevel = Math.floor(newXp / 500) + 1;

          // Badge awards
          const newBadges = [...state.badges];
          if (newStreak === 7 && !newBadges.includes('streak_7')) newBadges.push('streak_7');
          if (newStreak === 30 && !newBadges.includes('streak_30')) newBadges.push('streak_30');
          if (completed.length + 1 === 10 && !newBadges.includes(`chapter_${tech}_${chapter}`)) {
            newBadges.push(`chapter_${tech}_${chapter}`);
          }

          return {
            completedMissions: {
              ...state.completedMissions,
              [key]: [...completed, missionId]
            },
            xp: newXp,
            level: newLevel,
            streak: newStreak,
            lastCompletedDate: today,
            badges: newBadges
          };
        });
      }
    }),
    {
      name: 'runai-progress',
      getStorage: () => localStorage
    }
  )
);
