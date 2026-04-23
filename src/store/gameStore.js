import { create } from 'zustand';

// Import game data by category
import sqlGames from '../data/games/sql/games.json';
import sqlDescriptions from '../data/games/sql/descriptions.json';
import sqlHints from '../data/games/sql/hints.json';
import sqlSolutions from '../data/games/sql/solutions.json';
import sqlOutcomes from '../data/games/sql/outcomes.json';

import terminalGames from '../data/games/terminal/games.json';
import terminalDescriptions from '../data/games/terminal/descriptions.json';
import terminalHints from '../data/games/terminal/hints.json';
import terminalSolutions from '../data/games/terminal/solutions.json';
import terminalOutcomes from '../data/games/terminal/outcomes.json';

import pipelineGames from '../data/games/pipeline/games.json';
import pipelineDescriptions from '../data/games/pipeline/descriptions.json';
import pipelineHints from '../data/games/pipeline/hints.json';
import pipelineSolutions from '../data/games/pipeline/solutions.json';
import pipelineOutcomes from '../data/games/pipeline/outcomes.json';

// Combined arrays for unified access
const ALL_GAMES = [...sqlGames, ...terminalGames, ...pipelineGames];
const ALL_DESCRIPTIONS = [...sqlDescriptions, ...terminalDescriptions, ...pipelineDescriptions];
const ALL_HINTS = [...sqlHints, ...terminalHints, ...pipelineHints];
const ALL_SOLUTIONS = [...sqlSolutions, ...terminalSolutions, ...pipelineSolutions];
const ALL_OUTCOMES = [...sqlOutcomes, ...terminalOutcomes, ...pipelineOutcomes];

// Category definitions
const CATEGORIES = {
  sql: {
    label: 'SQL',
    iconType: 'sql',
    games: sqlGames,
  },
  terminal: {
    label: 'Terminal',
    iconType: 'terminal',
    games: terminalGames,
  },
  pipeline: {
    label: 'CI/CD',
    iconType: 'pipeline',
    games: pipelineGames,
  },
};

// Helper to get related data by ID
const getById = (arr, id) => arr.find(item => item.id === id);

export const useGameStore = create((set, get) => ({
  // User progress state
  xp: 0,
  level: 1,
  completedMissions: [],
  unlockedMissions: [sqlGames[0]?.id, terminalGames[0]?.id, pipelineGames[0]?.id].filter(Boolean), // Unlock first mission of each category

  // Current game state
  currentGameId: null,
  currentMissionId: null,
  userInput: '',
  feedback: null,
  hintsUsed: 0,
  showHint: false,

  // Get all categories with their games
  getCategories: () => CATEGORIES,

  // Actions
  startGame: (gameId) => {
    const game = getById(ALL_GAMES, gameId);
    const category = gameId.split('_')[1]; // sql, terminal, devops
    const missionNum = gameId.split('_')[2];
    const missionId = `desc_${category}_${missionNum}`;

    set({
      currentGameId: gameId,
      currentMissionId: missionId,
      userInput: game.initialState.content || '',
      feedback: null,
      hintsUsed: 0,
      showHint: false,
    });
  },

  setUserInput: (value) => set({ userInput: value }),

  submitAnswer: () => {
    const { currentGameId, userInput, hintsUsed } = get();
    const game = getById(ALL_GAMES, currentGameId);
    const category = currentGameId.split('_')[1];
    const missionNum = currentGameId.split('_')[2];
    const solution = getById(ALL_SOLUTIONS, `solution_${category}_${missionNum}`);

    if (!game || !solution) return { success: false, message: 'Error: Game data not found' };

    // Validate based on rules
    const normalizedInput = typeof userInput === 'string'
      ? userInput.toLowerCase().trim()
      : userInput.map(s => s.toLowerCase().trim());

    let isValid = true;

    if (game.validation.type === 'sql' || game.validation.type === 'command') {
      // Check if all required patterns are present
      isValid = game.validation.rules.every(rule => {
        const [type, value] = rule.split(':');
        if (type === 'must_include') {
          return normalizedInput.includes(value.toLowerCase());
        }
        return true;
      });
    } else if (game.validation.type === 'structure') {
      // Check ordering for pipeline
      isValid = game.validation.rules.every(rule => {
        const [type, order] = rule.split(':');
        if (type === 'order') {
          const [before, after] = order.split('>').map(s => s.trim());
          const inputArray = Array.isArray(normalizedInput) ? normalizedInput : normalizedInput.split(',').map(s => s.trim());
          const beforeIdx = inputArray.indexOf(before);
          const afterIdx = inputArray.indexOf(after);
          return beforeIdx !== -1 && afterIdx !== -1 && beforeIdx < afterIdx;
        }
        return true;
      });
    }

    if (isValid) {
      // Calculate XP (base 100, minus 10 per hint used, min 20)
      const earnedXp = Math.max(20, 100 - (hintsUsed * 10));

      set((state) => {
        const newXp = state.xp + earnedXp;
        const newLevel = Math.floor(newXp / 500) + 1;
        const completedMissions = [...state.completedMissions, currentGameId];

        // Unlock next mission in same category if exists
        const currentCategoryGames = CATEGORIES[category].games;
        const currentIndex = currentCategoryGames.findIndex(g => g.id === currentGameId);
        const nextGame = currentCategoryGames[currentIndex + 1];
        const unlockedMissions = nextGame
          ? [...state.unlockedMissions, nextGame.id]
          : state.unlockedMissions;

        return {
          xp: newXp,
          level: newLevel,
          completedMissions,
          unlockedMissions,
          feedback: {
            success: true,
            message: `Correct! +${earnedXp} XP`,
            explanation: solution.explanation,
          },
        };
      });

      return { success: true, xp: earnedXp };
    } else {
      set({
        feedback: {
          success: false,
          message: 'Incorrect. Try again.',
        },
      });
      return { success: false, message: 'Incorrect answer' };
    }
  },

  showNextHint: () => {
    const { currentGameId, hintsUsed } = get();
    const category = currentGameId.split('_')[1];
    const missionNum = currentGameId.split('_')[2];
    const hintIndex = hintsUsed;

    const hint = getById(ALL_HINTS, `hint_${category}_${missionNum}`);

    if (hint && hintIndex < 3) { // Max 3 hints per mission
      set({
        showHint: true,
        hintsUsed: hintsUsed + 1,
        feedback: {
          success: false,
          message: 'Hint: ' + hint.message,
          isHint: true,
        },
      });
    }
  },

  resetGame: () => {
    const { currentGameId } = get();
    const game = getById(ALL_GAMES, currentGameId);
    set({
      userInput: game.initialState.content,
      feedback: null,
      hintsUsed: 0,
      showHint: false,
    });
  },

  // Get current mission data
  getCurrentMission: () => {
    const { currentGameId, currentMissionId } = get();
    if (!currentGameId || !currentMissionId) {
      return { game: null, description: null, hints: [], outcome: null };
    }

    const game = getById(ALL_GAMES, currentGameId);
    const description = getById(ALL_DESCRIPTIONS, currentMissionId);
    const category = currentGameId.split('_')[1];
    const missionNum = currentGameId.split('_')[2];
    const outcome = getById(ALL_OUTCOMES, `outcome_${category}_${missionNum}`);

    return {
      game,
      description,
      hints: ALL_HINTS.filter(h => h.id.startsWith(`hint_${category}_`)),
      outcome,
    };
  },
}));
