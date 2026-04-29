const fs = require("fs");
const path = require("path");

const baseDir = __dirname;

const chapters = [
  "supervised_learning",
  "unsupervised_learning",
  "model_evaluation",
  "feature_selection",
  "ensemble_methods",
  "neural_networks_basics",
  "optimization_algorithms",
  "cross_validation",
  "hyperparameter_tuning",
  "model_deployment_ml",
];

const titles = {
  supervised_learning: [
    "Linear Regression",
    "Logistic Regression",
    "Decision Tree",
    "Random Forest",
    "SVM Classifier",
    "KNN Prediction",
    "Naive Bayes",
    "Gradient Boosting",
    "Model Prediction",
    "Evaluation Metrics",
  ],
  unsupervised_learning: [
    "K-Means Clustering",
    "Hierarchical Clustering",
    "DBSCAN Clustering",
    "PCA Dimensionality",
    "t-SNE Visualization",
    "Gaussian Mixtures",
    "Anomaly Detection",
    "Association Rules",
    "Feature Clustering",
    "Cluster Evaluation",
  ],
  model_evaluation: [
    "Confusion Matrix",
    "ROC AUC Score",
    "Precision Recall",
    "F1 Score Calc",
    "Cross Validation",
    "Learning Curves",
    "Bias Variance",
    "Model Comparison",
    "Calibration Plot",
    "Error Analysis",
  ],
  feature_selection: [
    "Correlation Filter",
    "Variance Threshold",
    "RFE Selection",
    "LASSO Features",
    "Mutual Information",
    "Chi-Square Test",
    "Feature Importance",
    "Permutation Importance",
    "Boruta Selection",
    "Feature Stability",
  ],
  ensemble_methods: [
    "Bagging Classifier",
    "Boosting Algorithm",
    "Stacking Models",
    "Voting Classifier",
    "AdaBoost Setup",
    "XGBoost Basics",
    "LightGBM Model",
    "CatBoost Model",
    "Blending Predictions",
    "Ensemble Tuning",
  ],
  neural_networks_basics: [
    "Perceptron Model",
    "MLP Classifier",
    "Activation Functions",
    "Backpropagation",
    "Weight Initialization",
    "Batch Normalization",
    "Dropout Regularization",
    "Optimizers Setup",
    "Learning Rate Sched",
    "NN Evaluation",
  ],
  optimization_algorithms: [
    "Gradient Descent",
    "Stochastic GD",
    "Mini-batch GD",
    "Momentum Optimizer",
    "Adam Optimizer",
    "RMSprop Setup",
    "Learning Rate Decay",
    "Early Stopping",
    "Grid Search",
    "Bayesian Optimization",
  ],
  cross_validation: [
    "K-Fold CV",
    "Stratified K-Fold",
    "Leave One Out",
    "Time Series Split",
    "Group K-Fold",
    "Shuffle Split",
    "Repeated CV",
    "Nested CV",
    "Bootstrap Sampling",
    "CV Evaluation",
  ],
  hyperparameter_tuning: [
    "Grid Search HP",
    "Random Search HP",
    "Optuna Tuning",
    "Hyperband Tuning",
    "Bayesian HP",
    "Population Based",
    "ASHA Algorithm",
    "Successive Halving",
    "Param Grid Setup",
    "Tuning Strategy",
  ],
  model_deployment_ml: [
    "Serialize Model",
    "Flask API",
    "FastAPI Endpoint",
    "Dockerize Model",
    "Model Versioning",
    "A/B Testing",
    "Model Monitoring",
    "Batch Inference",
    "Online Learning",
    "Model Retraining",
  ],
};

const contents = [
  (t) =>
    `def solve(data):\n    # TODO: Implement solution for ${t}\n    return result`,
  (t) =>
    `def process(input_data):\n    """\n    ${t}: Process the input data correctly.\n    """\n    # TODO: Add your implementation\n    pass`,
  (t) =>
    `import numpy as np\n\ndef compute(data):\n    # TODO: Compute ${t.toLowerCase()}\n    return np.array([])`,
  (t) =>
    `def transform(df):\n    # TODO: Transform dataframe for ${t}\n    return df`,
  (t) =>
    `from sklearn import preprocessing\n\ndef normalize(X):\n    # TODO: Normalize data for ${t}\n    return X`,
  (t) =>
    `def evaluate(y_true, y_pred):\n    # TODO: Calculate metric for ${t}\n    return 0.0`,
  (t) =>
    `def build_model():\n    # TODO: Build model for ${t}\n    return None`,
  (t) =>
    `def predict(model, X_test):\n    # TODO: Make predictions for ${t}\n    return []`,
  (t) =>
    `def train(X, y, epochs=10):\n    # TODO: Training loop for ${t}\n    return model`,
  (t) =>
    `def preprocess(data):\n    # TODO: Preprocess data for ${t}\n    return data`,
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
  console.log(`machine_learning/${chapter}: 10 missions created`);
});

console.log("Done!");
