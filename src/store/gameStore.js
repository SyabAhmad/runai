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

      setCurrentTechnology: (tech) => set({ currentTechnology: tech }),
      setCurrentChapter: (chapter) => set({ currentChapter: chapter }),
      setCurrentMission: (mission) => set({ currentMission: mission }),

      addXp: (amount) => set((state) => ({ xp: state.xp + amount })),

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

      completeMission: (tech, chapter, missionId, xpReward = 100) => {
        const key = `${tech}/${chapter}`;
        set((state) => ({
          completedMissions: {
            ...state.completedMissions,
            [key]: [...(state.completedMissions[key] || []), missionId]
          },
          xp: state.xp + xpReward
        }));
      }
    }),
    {
      name: 'runai-progress',
      getStorage: () => localStorage
    }
  )
);
