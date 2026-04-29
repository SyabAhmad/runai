const fs = require("fs");
const path = require("path");

const baseDir = __dirname;

const chapters = [
  "etl_processes",
  "data_ingestion",
  "data_transformation",
  "data_quality",
  "pipeline_orchestration",
  "stream_processing",
  "data_warehousing",
  "batch_processing",
  "data_governance",
  "real_time_analytics",
];

const titles = {
  etl_processes: [
    "Extract CSV Data",
    "Transform JSON Records",
    "Load to Database",
    "Handle Missing Values",
    "Data Type Conversion",
    "Filter Records",
    "Aggregate Data",
    "Join Datasets",
    "Validate Schema",
    "Pipeline Error Handling",
  ],
  data_ingestion: [
    "Read API Endpoint",
    "Ingest Streaming Data",
    "Parse XML Files",
    "Scrape Web Data",
    "Ingest from S3",
    "Database Connector",
    "Kafka Consumer Setup",
    "Batch File Ingestion",
    "Data Ingestion Monitoring",
    "Schema Evolution Handling",
  ],
  data_transformation: [
    "Map Data Fields",
    "Pivot DataFrames",
    "Normalize JSON",
    "Flatten Nested Data",
    "Data Enrichment",
    "Split Columns",
    "Merge Datasets",
    "Window Functions",
    "Date Parsing",
    "Unit Conversion",
  ],
  data_quality: [
    "Detect Duplicates",
    "Range Validation",
    "Regex Validation",
    "Referential Integrity",
    "Outlier Detection",
    "Null Value Handling",
    "Data Profiling",
    "Consistency Checks",
    "Anomaly Detection DQ",
    "Quality Score Calculation",
  ],
  pipeline_orchestration: [
    "Define DAG Tasks",
    "Task Dependencies",
    "Schedule Pipeline",
    "Retry Logic",
    "Parallel Execution",
    "Pipeline Monitoring",
    "Failure Alerts",
    "Data Lineage",
    "Version Control Pipelines",
    "Pipeline Optimization",
  ],
  stream_processing: [
    "Kafka Producer",
    "Spark Streaming",
    "Window Aggregations",
    "Event Time Processing",
    "Stream Joins",
    "Watermark Handling",
    "Checkpoint Recovery",
    "Exactly Once",
    "Stream Filtering",
    "Real-time Analytics Setup",
  ],
  data_warehousing: [
    "Star Schema Design",
    "Fact Table Loading",
    "Dimension Tables",
    "Slowly Changing Dimensions",
    "ETL to Warehouse",
    "Query Optimization",
    "Partition Strategy",
    "Index Tuning",
    "Warehouse Security",
    "Data Mart Creation",
  ],
  batch_processing: [
    "MapReduce Job",
    "Spark RDD Basics",
    "DataFrame Operations",
    "Partition Tuning",
    "Shuffle Optimization",
    "Broadcast Joins",
    "Checkpointing",
    "Batch Scheduling",
    "Failure Recovery",
    "Performance Tuning Batch",
  ],
  data_governance: [
    "Data Catalog Setup",
    "PII Detection",
    "Access Control",
    "Data Retention",
    "Compliance Checking",
    "Metadata Management",
    "Data Ownership",
    "Audit Logging",
    "Policy Enforcement",
    "Data Masking",
  ],
  real_time_analytics: [
    "Stream Ingestion",
    "Dashboard Metrics",
    "Alert Thresholds",
    "Time Series Analysis",
    "Flink Job Setup",
    "Real-time Joins",
    "Window Operations",
    "Late Data Handling",
    "Backpressure Handling",
    "Analytics API",
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
  console.log(`data_engineering/${chapter}: 10 missions created`);
});

console.log("Done!");
