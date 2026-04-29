const fs = require("fs");
const path = require("path");

const baseDir = path.join(__dirname, "src", "data", "games", "ai_engineering");

// Update AI fundamentals mission 1 with detailed content
function updateMission1() {
  const chapter = 'ai_fundamentals';
  const missionId = 'mission_01';
  const missionDir = path.join(baseDir, chapter, missionId);

  const title = "Understanding AI Paradigms";
  const description = "Build a comprehensive explanation of the relationships between Artificial Intelligence, Machine Learning, and Deep Learning. Create a function that returns a detailed comparison including historical context, key differences, real-world applications, and learning approaches.";
  const hints = [
    "Start by researching the historical timeline of AI development",
    "Consider how each field builds upon the previous one",
    "Think about real-world examples like self-driving cars (AI), recommendation systems (ML), and image recognition (DL)"
  ];
  const solution = `def explain_ai_relationships():
    """
    Comprehensive explanation of AI, ML, and DL relationships
    """
    ai_ml_dl_relationships = {
        "artificial_intelligence": {
            "definition": "Broad field encompassing creation of machines that perform tasks requiring human intelligence",
            "scope": "General intelligence, problem-solving, reasoning, learning, perception",
            "historical_context": "Term coined in 1956 at Dartmouth Conference",
            "examples": ["Chess playing computers", "Autonomous vehicles", "Medical diagnosis systems"],
            "approaches": ["Rule-based systems", "Expert systems", "Machine learning", "Neural networks"]
        },
        "machine_learning": {
            "definition": "Subset of AI focusing on algorithms that learn patterns from data without explicit programming",
            "relationship_to_ai": "ML provides the learning capability that enables AI systems to improve performance",
            "key_characteristics": ["Data-driven learning", "Pattern recognition", "Statistical modeling", "Adaptability"],
            "types": ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning"],
            "algorithms": ["Decision Trees", "Neural Networks", "Support Vector Machines", "Ensemble Methods"]
        },
        "deep_learning": {
            "definition": "Subset of ML using artificial neural networks with multiple layers (deep architectures)",
            "relationship_to_ml": "DL extends traditional ML by automatically learning hierarchical feature representations",
            "key_innovations": ["Multi-layer neural networks", "Automatic feature learning", "End-to-end learning"],
            "architectures": ["Convolutional Neural Networks (CNN)", "Recurrent Neural Networks (RNN)", "Transformers"],
            "applications": ["Computer vision", "Natural language processing", "Speech recognition", "Generative AI"]
        },
        "relationships_and_differences": {
            "ai_vs_ml": "AI is the goal (intelligent machines), ML is one approach to achieve AI",
            "ml_vs_dl": "ML includes traditional algorithms, DL focuses on deep neural networks",
            "ai_as_umbrella": "AI encompasses ML, DL, and other approaches like symbolic reasoning",
            "complementary_nature": "DL has revolutionized ML capabilities, enabling breakthroughs in AI applications"
        },
        "current_state_and_future": {
            "convergence": "Modern AI systems often combine multiple approaches (hybrid AI)",
            "data_centric": "All three fields increasingly depend on large-scale data and computational power",
            "ethical_considerations": "As AI/ML/DL systems become more powerful, responsible development becomes crucial"
        }
    }

    return ai_ml_dl_relationships`;

  const outcome = "Successfully analyzed AI, ML, and DL paradigms with comprehensive examples!";

  // Update games.json
  const gamesData = {
    title,
    initialState: {
      content: solution.split('\\n').slice(0, 5).join('\\n') + '\\n    # TODO: Complete the implementation'
    },
    validation: {
      type: "ai_code",
      rules: ["must_include:def", "must_include:return"]
    },
    id: missionId,
    type: "ai_code",
    xpReward: 60
  };

  // Update other files
  const descriptionsData = { [missionId]: description };
  const hintsData = { [missionId]: hints };
  const solutionsData = { [missionId]: solution };
  const outcomesData = { [missionId]: outcome };

  // Write files
  fs.writeFileSync(path.join(missionDir, "games.json"), JSON.stringify(gamesData, null, 2));
  fs.writeFileSync(path.join(missionDir, "descriptions.json"), JSON.stringify(descriptionsData, null, 2));
  fs.writeFileSync(path.join(missionDir, "hints.json"), JSON.stringify(hintsData, null, 2));
  fs.writeFileSync(path.join(missionDir, "solutions.json"), JSON.stringify(solutionsData, null, 2));
  fs.writeFileSync(path.join(missionDir, "outcomes.json"), JSON.stringify(outcomesData, null, 2));

  console.log(`${missionId}: Updated with detailed mission content!`);
}

// Run the update
updateMission1();
console.log("Mission 1 update completed!");