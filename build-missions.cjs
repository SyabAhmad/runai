const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, 'src/data');
const outFile = path.resolve(__dirname, 'src/data/missions.js');
const jsonFile = path.resolve(__dirname, 'src/data/missions.json');

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch { return null; }
}

function walkDir(dir) {
  let results = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results = results.concat(walkDir(full));
      } else {
        results.push(full);
      }
    }
  } catch {}
  return results;
}

function findFiles(patternDir, re) {
  const allFiles = walkDir(patternDir);
  return allFiles.filter(f => {
    const rel = path.relative(patternDir, f).replace(/\\/g, '/');
    return re.test(rel);
  });
}

const gamesFiles = findFiles(baseDir, /^games\/[^/]+\/[^/]+\/mission_[^/]+\/games\.json$/);
const descFiles = findFiles(baseDir, /^games\/[^/]+\/[^/]+\/mission_[^/]+\/descriptions\.json$/);
const hintsFiles = findFiles(baseDir, /^games\/[^/]+\/[^/]+\/mission_[^/]+\/hints\.json$/);
const guideFiles = findFiles(baseDir, /^games\/[^/]+\/[^/]+\/mission_[^/]+\/guidelines\.json$/);
const solFiles = findFiles(baseDir, /^games\/[^/]+\/[^/]+\/mission_[^/]+\/solutions\.json$/);
const srcFiles = findFiles(baseDir, /^games\/[^/]+\/[^/]+\/mission_[^/]+\/source\.json$/);

function normalizeKey(k) {
  return (k || '').trim().replace(/^["']|["']$/g, '').toLowerCase();
}

function makeLookup(files) {
  const map = {};
  for (const f of files) {
    const data = readJson(f);
    if (!data || typeof data !== 'object') continue;
    const rel = path.relative(baseDir, f).replace(/\\/g, '/');
    const parts = rel.split('/');
    const tech = parts[1];
    const chapter = parts[2];
    const missionFolder = parts[3];
    for (const [k, v] of Object.entries(data)) {
      map[`${tech}/${chapter}/${normalizeKey(k)}`] = v;
    }
  }
  return map;
}

const descriptions = makeLookup(descFiles);
const hints = makeLookup(hintsFiles);
const guidelines = makeLookup(guideFiles);
const solutions = makeLookup(solFiles);
const sources = makeLookup(srcFiles);

const missions = {};

for (const filePath of gamesFiles) {
  const data = readJson(filePath);
  if (!data) continue;

  const rel = path.relative(baseDir, filePath).replace(/\\/g, '/');
  const parts = rel.split('/');
  const tech = parts[1];
  const chapter = parts[2];
  const missionFolder = parts[3];

  const key = missionFolder;
  const nkey = normalizeKey(key);
  const missionKey = `${tech}/${chapter}/${key}`;

  const hintRaw = hints[`${tech}/${chapter}/${nkey}`] || [];
  const hintArray = Array.isArray(hintRaw) ? hintRaw : [];

  missions[missionKey] = {
    id: key,
    tech,
    chapter,
    folder: missionFolder,
    title: data.title || key,
    type: data.type || 'sql_debug',
    xpReward: data.xpReward || 100,
    difficulty: data.difficulty || 'medium',
    initialState: data.initialState || {},
    validation: data.validation || {},
    description: descriptions[`${tech}/${chapter}/${nkey}`] || '',
    guidelines: guidelines[`${tech}/${chapter}/${nkey}`] || '',
    solution: solutions[`${tech}/${chapter}/${nkey}`] || '',
    source: sources[`${tech}/${chapter}/${nkey}`] || '',
    hints: hintArray,
  };
}

// Write as a regular JS object (safe — no template literals involved)
const output = `// Auto-generated at ${new Date().toISOString()} — regenerate with: node build-missions.cjs
import data from './missions.json' assert { type: 'json' };
export const MISSIONS = data;
export const MISSION_LIST = Object.values(data);
`;

fs.writeFileSync(jsonFile, JSON.stringify(missions, null, 2), 'utf-8');
fs.writeFileSync(outFile, output, 'utf-8');
console.log(`[build-missions] Wrote ${jsonFile} — ${Object.keys(missions).length} missions`);
console.log(`[build-missions] Wrote ${outFile}`);
