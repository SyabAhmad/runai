const fs = require("fs");
const path = require("path");

const baseDir = "src/data/games";
const issues = [];

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (entry.name.endsWith(".json")) {
      try {
        const content = fs.readFileSync(fullPath, "utf-8");
        if (!content.trim()) {
          issues.push({ file: fullPath, error: "Empty file" });
          continue;
        }
        JSON.parse(content);
      } catch (err) {
        issues.push({ file: fullPath, error: err.message });
      }
    }
  }
}

scanDir(baseDir);

if (issues.length === 0) {
  console.log("All JSON files are valid!");
} else {
  console.log(`Found ${issues.length} invalid JSON files:\n`);
  issues.forEach(({ file, error }) => {
    console.log(`  ${file}`);
    console.log(`    → ${error}`);
  });
}
