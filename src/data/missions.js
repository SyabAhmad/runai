const gamesFiles = import.meta.glob('/src/data/games/**/mission_*/games.json', { eager: true, import: 'default' });
const descFiles = import.meta.glob('/src/data/games/**/mission_*/descriptions.json', { eager: true, import: 'default' });
const hintsFiles = import.meta.glob('/src/data/games/**/mission_*/hints.json', { eager: true, import: 'default' });
const guidelinesFiles = import.meta.glob('/src/data/games/**/mission_*/guidelines.json', { eager: true, import: 'default' });
const solutionsFiles = import.meta.glob('/src/data/games/**/mission_*/solutions.json', { eager: true, import: 'default' });

function parseKey(filePath) {
  const parts = filePath.replace(/^\/src\/data\/games\//, '').split('/');
  return { tech: parts[0], chapter: parts[1], missionId: parts[2] };
}

const MISSIONS = {};

for (const [filePath, data] of Object.entries(gamesFiles)) {
  const { tech, chapter, missionId } = parseKey(filePath);
  const key = `${tech}/${chapter}/${missionId}`;
  MISSIONS[key] = {
    id: missionId,
    tech,
    chapter,
    title: data.title || missionId,
    type: data.type || 'sql_debug',
    xpReward: data.xpReward || 100,
    difficulty: data.difficulty || 'medium',
    initialState: data.initialState || {},
    validation: data.validation || {},
    description: '',
    guidelines: '',
    solution: '',
    source: '',
    hints: [],
  };
}

for (const [filePath, data] of Object.entries(descFiles)) {
  const { tech, chapter, missionId } = parseKey(filePath);
  const key = `${tech}/${chapter}/${missionId}`;
  if (MISSIONS[key]) MISSIONS[key].description = data[missionId] || '';
}

for (const [filePath, data] of Object.entries(hintsFiles)) {
  const { tech, chapter, missionId } = parseKey(filePath);
  const key = `${tech}/${chapter}/${missionId}`;
  if (MISSIONS[key]) MISSIONS[key].hints = Array.isArray(data[missionId]) ? data[missionId] : [];
}

for (const [filePath, data] of Object.entries(guidelinesFiles)) {
  const { tech, chapter, missionId } = parseKey(filePath);
  const key = `${tech}/${chapter}/${missionId}`;
  if (MISSIONS[key]) MISSIONS[key].guidelines = data[missionId] || '';
}

for (const [filePath, data] of Object.entries(solutionsFiles)) {
  const { tech, chapter, missionId } = parseKey(filePath);
  const key = `${tech}/${chapter}/${missionId}`;
  if (MISSIONS[key]) MISSIONS[key].solution = data[missionId] || '';
}

export { MISSIONS };
