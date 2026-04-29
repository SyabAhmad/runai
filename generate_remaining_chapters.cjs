const fs = require("fs");
const path = require("path");

const baseDir = path.join(__dirname, "src", "data", "games", "ai_engineering");

// Generate remaining chapters quickly
const remainingChapters = [
  "rag_systems",
  "fine_tuning_models",
  "vector_databases",
  "ai_agents",
  "mlops_ai",
  "ai_security",
  "generative_ai_apps"
];

remainingChapters.forEach(chapter => {
  const chapterDir = path.join(baseDir, chapter);
  if (!fs.existsSync(chapterDir)) {
    fs.mkdirSync(chapterDir, { recursive: true });
  }

  // Create guidelines
  const guidelines = {
    [chapter]: `## What You Will Learn\\n\\nMaster ${chapter.replace(/_/g, " ")} through hands-on practical missions.`
  };
  fs.writeFileSync(
    path.join(chapterDir, "guidelines.json"),
    JSON.stringify(guidelines, null, 2)
  );

  // Generate 10 basic missions for each chapter
  for (let i = 1; i <= 10; i++) {
    const missionId = `mission_${String(i).padStart(2, "0")}`;
    const missionDir = path.join(chapterDir, missionId);

    if (!fs.existsSync(missionDir)) {
      fs.mkdirSync(missionDir, { recursive: true });
    }

    const title = `${chapter.replace(/_/g, " ")} Mission ${i}`;
    const description = `Complete ${chapter.replace(/_/g, " ")} mission ${i} to master this technology.`;
    const hints = ["Think about the core concepts", "Consider best practices", "Use appropriate tools"];
    const solution = `def solve_mission_${i}():\n    # TODO: Implement solution for ${chapter} mission ${i}\n    return "Mission ${i} completed"`;
    const outcome = `Mission ${i} in ${chapter.replace(/_/g, " ")} completed successfully!`;

    // Generate games.json
    const gamesData = {
      title,
      initialState: {
        content: solution.split('\\n').slice(0, 2).join('\\n') + '\\n    # TODO: Complete the implementation'
      },
      validation: {
        type: "ai_code",
        rules: ["must_include:def", "must_include:return"]
      },
      id: missionId,
      type: "ai_code",
      xpReward: 50 + i * 10
    };

    // Generate descriptions.json
    const descriptionsData = {
      [missionId]: description
    };

    // Generate hints.json
    const hintsData = {
      [missionId]: hints
    };

    // Generate solutions.json
    const solutionsData = {
      [missionId]: solution
    };

    // Generate outcomes.json
    const outcomesData = {
      [missionId]: outcome
    };

    // Write all files
    fs.writeFileSync(
      path.join(missionDir, "games.json"),
      JSON.stringify(gamesData, null, 2)
    );

    fs.writeFileSync(
      path.join(missionDir, "descriptions.json"),
      JSON.stringify(descriptionsData, null, 2)
    );

    fs.writeFileSync(
      path.join(missionDir, "hints.json"),
      JSON.stringify(hintsData, null, 2)
    );

    fs.writeFileSync(
      path.join(missionDir, "solutions.json"),
      JSON.stringify(solutionsData, null, 2)
    );

    fs.writeFileSync(
      path.join(missionDir, "outcomes.json"),
      JSON.stringify(outcomesData, null, 2)
    );
  }

  console.log(`${chapter}: 10 missions with basic content created`);
});

console.log("All remaining AI Engineering chapters generated!");