const fs = require("fs");
const path = require("path");

const baseDir = __dirname;

const chapters = [
  "yolo_architecture",
  "object_detection_basics",
  "anchor_boxes",
  "non_max_suppression",
  "dataset_preparation",
  "model_training_yolo",
  "inference_optimization",
  "custom_classes",
  "yolo_evaluation",
  "deployment_edge",
];

const titles = {
  yolo_architecture: [
    "YOLO Backbone",
    "Feature Pyramid",
    "Detection Head",
    "Anchor Assignment",
    "Loss Function",
    "IOU Calculation",
    "Grid Prediction",
    "Multi-scale",
    "Backbone Variants",
    "Architecture Comparison",
  ],
  object_detection_basics: [
    "Bounding Boxes",
    "Class Confidence",
    "Detection Output",
    "NMS Basics",
    "mAP Calculation",
    "Precision Recall OD",
    "IoU Thresholds",
    "Detection Speed",
    "Accuracy Tradeoff",
    "Detection Metrics",
  ],
  anchor_boxes: [
    "Anchor Generation",
    "Anchor Scales",
    "Aspect Ratios",
    "Anchor Matching",
    "K-Means Anchors",
    "Anchor Optimization",
    "Multi-scale Anchors",
    "Anchor-free Detection",
    "Anchor Refinement",
    "Adaptive Anchors",
  ],
  non_max_suppression: [
    "Basic NMS",
    "Soft NMS",
    "DIoU NMS",
    "Matrix NMS",
    "Class-aware NMS",
    "Cluster NMS",
    "Fast NMS",
    "Adaptive NMS",
    "Top-K Selection",
    "NMS Threshold Tuning",
  ],
  dataset_preparation: [
    "COCO Format",
    "VOC Format",
    "Label Conversion",
    "Image Resizing",
    "Augmentation Setup",
    "Mosaic Augmentation",
    "MixUp Augmentation",
    "Class Balance",
    "Dataset Splitting",
    "Data Validation",
  ],
  model_training_yolo: [
    "Training Loop",
    "Loss Monitoring",
    "LR Scheduling",
    "Batch Size Tuning",
    "Warmup Training",
    "Mixed Precision",
    "Distributed Training",
    "Transfer Learning",
    "Fine Tuning",
    "Training Resume",
  ],
  inference_optimization: [
    "Model Quantization",
    "TensorRT Export",
    "ONNX Conversion",
    "OpenVINO Setup",
    "Batch Inference",
    "Multi-threading",
    "GPU Optimization",
    "FP16 Inference",
    "INT8 Quantization",
    "Edge Optimization",
  ],
  custom_classes: [
    "Custom Dataset",
    "Class Addition",
    "Label Mapping",
    "Config Update",
    "Anchor Recalculation",
    "Class Imbalance",
    "Few-shot Detection",
    "Incremental Learning",
    "Domain Adaptation",
    "Custom Metrics",
  ],
  yolo_evaluation: [
    "mAP50 Calculation",
    "mAP50-95 Score",
    "Per-class AP",
    "Confusion Matrix OD",
    "F1-Score Curve",
    "PR Curve Plot",
    "Inference Benchmark",
    "FPS Measurement",
    "Model Comparison",
    "Error Analysis OD",
  ],
  deployment_edge: [
    "Jetson Deploy",
    "Raspberry Pi",
    "Mobile Export",
    "CoreML Convert",
    "TFLite Export",
    "Edge TPU",
    "Model Pruning",
    "Knowledge Distillation",
    "Streaming Detection",
    "API Deployment OD",
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
  console.log(`yolo/${chapter}: 10 missions created`);
});

console.log("Done!");
