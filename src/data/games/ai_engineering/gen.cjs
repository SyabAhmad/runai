const fs = require("fs");
const path = require("path");

const baseDir = __dirname;

const chapters = [
  "ai_fundamentals",
  "llm_basics",
  "prompt_engineering",
  "rag_systems",
  "fine_tuning_models",
  "vector_databases",
  "ai_agents",
  "mlops_ai",
  "ai_security",
  "generative_ai_apps",
];

const titles = {
  ai_fundamentals: [
    "AI vs ML vs DL",
    "Supervised vs Unsupervised",
    "Regression Basics",
    "Classification Tasks",
    "Clustering Introduction",
    "Neural Network Basics",
    "Loss Functions",
    "Gradient Descent",
    "Train-Validation-Test Split",
    "Overfitting & Underfitting",
  ],
  llm_basics: [
    "Transformer Architecture",
    "Attention Mechanism",
    "Tokenization",
    "Embeddings",
    "Model Checkpoints",
    "Model Inference",
    "Temperature Sampling",
    "Top-p Sampling",
    "Context Window",
    "Few-Shot Learning",
  ],
  prompt_engineering: [
    "Zero-Shot Prompts",
    "Few-Shot Prompts",
    "Chain of Thought",
    "System Prompts",
    "Prompt Templates",
    "Output Formatting",
    "Few-Shot Examples",
    "Prompt Optimization",
    "Prompt Chaining",
    "Error Handling Prompts",
  ],
  rag_systems: [
    "Document Loading",
    "Text Splitting",
    "Embedding Generation",
    "Vector Similarity",
    "Retrieval Setup",
    "Context Injection",
    "RAG Pipeline",
    "Query Reformulation",
    "Hybrid Search",
    "RAG Evaluation",
  ],
  fine_tuning_models: [
    "Dataset Preparation",
    "Model Selection",
    "LoRA Fine-Tuning",
    "QLoRA Technique",
    "Training Loop",
    "Validation Metrics",
    "Hyperparameter Tuning",
    "Checkpoint Saving",
    "Model Evaluation",
    "Inference Testing",
  ],
  vector_databases: [
    "Vector Indexing",
    "Similarity Search",
    "HNSW Index",
    "FAISS Setup",
    "Pinecone Integration",
    "Weaviate Basics",
    "Milvus Quick Start",
    "Qdrant Client",
    "Metadata Filtering",
    "Index Optimization",
  ],
  ai_agents: [
    "Agent Architecture",
    "Tool Selection",
    "Memory Systems",
    "Planning Algorithm",
    "Action Execution",
    "Observation Handling",
    "ReAct Pattern",
    "Agent Loop",
    "Multi-Agent Setup",
    "Agent Evaluation",
  ],
  mlops_ai: [
    "Model Registry",
    "Experiment Tracking",
    "Pipeline Orchestration",
    "Model Versioning",
    "A/B Testing",
    "Canary Deployment",
    "Model Monitoring",
    "Drift Detection",
    "Automated Retraining",
    "CI/CD for ML",
  ],
  ai_security: [
    "Prompt Injection",
    "Data Privacy",
    "Model Stealing",
    "Adversarial Attacks",
    "Output Filtering",
    "Access Control",
    "Audit Logging",
    "Encryption",
    "Secure Deployment",
    "Compliance Check",
  ],
  generative_ai_apps: [
    "Text Generation",
    "Image Generation",
    "Audio Synthesis",
    "Code Generation",
    "Chatbot Setup",
    "Summarization App",
    "Translation Service",
    "Content Moderation",
    "Recommendation Engine",
    "Multi-Modal App",
  ],
};

const contents = [
  (t) => `def solve(data):\n    # TODO: Implement solution for ${t}\n    return result`,
  (t) => `def process(input_data):\n    """\n    ${t}: Process the input data correctly.\n    """\n    # TODO: Add your implementation\n    pass`,
  (t) => `import numpy as np\n\ndef compute(data):\n    # TODO: Compute ${t.toLowerCase()}\n    return np.array([])`,
  (t) => `def transform(df):\n    # TODO: Transform dataframe for ${t}\n    return df`,
  (t) => `from sklearn import preprocessing\n\ndef normalize(X):\n    # TODO: Normalize data for ${t}\n    return X`,
  (t) => `def evaluate(y_true, y_pred):\n    # TODO: Calculate metric for ${t}\n    return 0.0`,
  (t) => `def build_model():\n    # TODO: Build model for ${t}\n    return None`,
  (t) => `def predict(model, X_test):\n    # TODO: Make predictions for ${t}\n    return []`,
  (t) => `def train(X, y, epochs=10):\n    # TODO: Training loop for ${t}\n    return model`,
  (t) => `def preprocess(data):\n    # TODO: Preprocess data for ${t}\n    return data`,
];

function getGame(chapter, missionNum) {
  const title =
    titles[chapter]?.[missionNum - 1] || `${chapter} Mission ${missionNum}`;
  const content = contents[(missionNum - 1) % contents.length](title);
  return {
    title,
    initialState: { content },
    validation: {
      type: "ai_code",
      rules: ["must_include:def", "must_include:return"],
    },
    id: `mission_${String(missionNum).padStart(2, "0")}`,
    type: "ai_code",
    xpReward: 50 + missionNum * 10,
  };
}

chapters.forEach((chapter) => {
  const chapterDir = path.join(baseDir, chapter);
  if (!fs.existsSync(chapterDir)) fs.mkdirSync(chapterDir, { recursive: true });

  const guidelines = {
    [chapter]: `## What You Will Learn\\n\\nMaster ${chapter.replace(/_/g, " ")} through hands-on practical missions.`,
  };
  fs.writeFileSync(
    path.join(chapterDir, "guidelines.json"),
    JSON.stringify(guidelines, null, 2),
  );

  for (let i = 1; i <= 10; i++) {
    const missionDir = path.join(
      chapterDir,
      `mission_${String(i).padStart(2, "0")}`,
    );
    if (!fs.existsSync(missionDir))
      fs.mkdirSync(missionDir, { recursive: true });
    fs.writeFileSync(
      path.join(missionDir, "games.json"),
      JSON.stringify(getGame(chapter, i), null, 2),
    );
  }
  console.log(`ai_engineering/${chapter}: 10 missions created`);
});

console.log("Done!");
