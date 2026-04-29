const fs = require("fs");
const path = require("path");

const baseDir = path.join(__dirname, "src", "data", "games");

// Technology definitions: existing chapters and game type
const technologies = {
  data_engineering: {
    gameType: "ai_code",
    existing: ["etl_processes"],
    chapters: [
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
    ],
  },
  docker: {
    gameType: "terminal",
    existing: ["images"],
    chapters: [
      "images",
      "containers",
      "dockerfile_basics",
      "docker_compose",
      "docker_networks",
      "docker_volumes",
      "multi_stage_builds",
      "docker_security",
      "container_orchestration_basics",
      "docker_troubleshooting",
    ],
  },
  linux: {
    gameType: "terminal",
    existing: ["shell_basics"],
    chapters: [
      "shell_basics",
      "file_management",
      "process_management",
      "user_permissions",
      "networking_commands",
      "text_processing",
      "system_monitoring_linux",
      "package_management",
      "shell_scripting_linux",
      "linux_security",
    ],
  },
  machine_learning: {
    gameType: "ai_code",
    existing: ["supervised_learning"],
    chapters: [
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
    ],
  },
  pipeline: {
    gameType: "pipeline",
    existing: ["github_actions", "gitlab_ci", "jenkins"],
    chapters: [
      "github_actions",
      "gitlab_ci",
      "jenkins",
      "azure_pipelines",
      "travis_ci_advanced",
      "circleci_advanced",
      "gitops_flux",
      "argo_workflows",
      "tekton_pipelines",
      "spinnaker_deployments",
    ],
  },
  system_design: {
    gameType: "pipeline",
    existing: ["scalability_patterns"],
    chapters: [
      "scalability_patterns",
      "load_balancing",
      "caching_strategies",
      "database_sharding",
      "microservices_design",
      "api_gateway_patterns",
      "message_queues",
      "distributed_systems",
      "rate_limiting",
      "fault_tolerance",
    ],
  },
  terminal: {
    gameType: "terminal",
    existing: ["shell_basics", "networking", "process_management"],
    chapters: [
      "shell_basics",
      "networking",
      "process_management",
      "file_permissions",
      "grep_sed_awk",
      "ssh_remote_access",
      "disk_management",
      "environment_variables",
      "cron_scheduling",
      "log_analysis",
    ],
  },
  yolo: {
    gameType: "ai_code",
    existing: ["yolo_architecture"],
    chapters: [
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
    ],
  },
};

// Mission generators for each game type
const missionGenerators = {
  ai_code: (tech, chapter, missionNum) => {
    const titles = {
      data_engineering: {
        etl_processes: [
          "Extract CSV Data", "Transform JSON Records", "Load to Database",
          "Handle Missing Values", "Data Type Conversion", "Filter Records",
          "Aggregate Data", "Join Datasets", "Validate Schema", "Pipeline Error Handling",
        ],
        data_ingestion: [
          "Read API Endpoint", "Ingest Streaming Data", "Parse XML Files",
          "Scrape Web Data", "Ingest from S3", "Database Connector",
          "Kafka Consumer Setup", "Batch File Ingestion", "Data Ingestion Monitoring", "Schema Evolution Handling",
        ],
        data_transformation: [
          "Map Data Fields", "Pivot DataFrames", "Normalize JSON",
          "Flatten Nested Data", "Data Enrichment", "Split Columns",
          "Merge Datasets", "Window Functions", "Date Parsing", "Unit Conversion",
        ],
        data_quality: [
          "Detect Duplicates", "Range Validation", "Regex Validation",
          "Referential Integrity", "Outlier Detection", "Null Value Handling",
          "Data Profiling", "Consistency Checks", "Anomaly Detection DQ", "Quality Score Calculation",
        ],
        pipeline_orchestration: [
          "Define DAG Tasks", "Task Dependencies", "Schedule Pipeline",
          "Retry Logic", "Parallel Execution", "Pipeline Monitoring",
          "Failure Alerts", "Data Lineage", "Version Control Pipelines", "Pipeline Optimization",
        ],
        stream_processing: [
          "Kafka Producer", "Spark Streaming", "Window Aggregations",
          "Event Time Processing", "Stream Joins", "Watermark Handling",
          "Checkpoint Recovery", "Exactly Once", "Stream Filtering", "Real-time Analytics Setup",
        ],
        data_warehousing: [
          "Star Schema Design", "Fact Table Loading", "Dimension Tables",
          "Slowly Changing Dimensions", "ETL to Warehouse", "Query Optimization",
          "Partition Strategy", "Index Tuning", "Warehouse Security", "Data Mart Creation",
        ],
        batch_processing: [
          "MapReduce Job", "Spark RDD Basics", "DataFrame Operations",
          "Partition Tuning", "Shuffle Optimization", "Broadcast Joins",
          "Checkpointing", "Batch Scheduling", "Failure Recovery", "Performance Tuning Batch",
        ],
        data_governance: [
          "Data Catalog Setup", "PII Detection", "Access Control",
          "Data Retention", "Compliance Checking", "Metadata Management",
          "Data Ownership", "Audit Logging", "Policy Enforcement", "Data Masking",
        ],
        real_time_analytics: [
          "Stream Ingestion", "Dashboard Metrics", "Alert Thresholds",
          "Time Series Analysis", "Flink Job Setup", "Real-time Joins",
          "Window Operations", "Late Data Handling", "Backpressure Handling", "Analytics API",
        ],
      },
      machine_learning: {
        supervised_learning: [
          "Linear Regression", "Logistic Regression", "Decision Tree",
          "Random Forest", "SVM Classifier", "KNN Prediction",
          "Naive Bayes", "Gradient Boosting", "Model Prediction", "Evaluation Metrics",
        ],
        unsupervised_learning: [
          "K-Means Clustering", "Hierarchical Clustering", "DBSCAN Clustering",
          "PCA Dimensionality", "t-SNE Visualization", "Gaussian Mixtures",
          "Anomaly Detection", "Association Rules", "Feature Clustering", "Cluster Evaluation",
        ],
        model_evaluation: [
          "Confusion Matrix", "ROC AUC Score", "Precision Recall",
          "F1 Score Calc", "Cross Validation", "Learning Curves",
          "Bias Variance", "Model Comparison", "Calibration Plot", "Error Analysis",
        ],
        feature_selection: [
          "Correlation Filter", "Variance Threshold", "RFE Selection",
          "LASSO Features", "Mutual Information", "Chi-Square Test",
          "Feature Importance", "Permutation Importance", "Boruta Selection", "Feature Stability",
        ],
        ensemble_methods: [
          "Bagging Classifier", "Boosting Algorithm", "Stacking Models",
          "Voting Classifier", "AdaBoost Setup", "XGBoost Basics",
          "LightGBM Model", "CatBoost Model", "Blending Predictions", "Ensemble Tuning",
        ],
        neural_networks_basics: [
          "Perceptron Model", "MLP Classifier", "Activation Functions",
          "Backpropagation", "Weight Initialization", "Batch Normalization",
          "Dropout Regularization", "Optimizers Setup", "Learning Rate Sched", "NN Evaluation",
        ],
        optimization_algorithms: [
          "Gradient Descent", "Stochastic GD", "Mini-batch GD",
          "Momentum Optimizer", "Adam Optimizer", "RMSprop Setup",
          "Learning Rate Decay", "Early Stopping", "Grid Search", "Bayesian Optimization",
        ],
        cross_validation: [
          "K-Fold CV", "Stratified K-Fold", "Leave One Out",
          "Time Series Split", "Group K-Fold", "Shuffle Split",
          "Repeated CV", "Nested CV", "Bootstrap Sampling", "CV Evaluation",
        ],
        hyperparameter_tuning: [
          "Grid Search HP", "Random Search HP", "Optuna Tuning",
          "Hyperband Tuning", "Bayesian HP", "Population Based",
          "ASHA Algorithm", "Successive Halving", "Param Grid Setup", "Tuning Strategy",
        ],
        model_deployment_ml: [
          "Serialize Model", "Flask API", "FastAPI Endpoint",
          "Dockerize Model", "Model Versioning", "A/B Testing",
          "Model Monitoring", "Batch Inference", "Online Learning", "Model Retraining",
        ],
      },
      yolo: {
        yolo_architecture: [
          "YOLO Backbone", "Feature Pyramid", "Detection Head",
          "Anchor Assignment", "Loss Function", "IOU Calculation",
          "Grid Prediction", "Multi-scale", "Backbone Variants", "Architecture Comparison",
        ],
        object_detection_basics: [
          "Bounding Boxes", "Class Confidence", "Detection Output",
          "NMS Basics", "mAP Calculation", "Precision Recall OD",
          "IoU Thresholds", "Detection Speed", "Accuracy Tradeoff", "Detection Metrics",
        ],
        anchor_boxes: [
          "Anchor Generation", "Anchor Scales", "Aspect Ratios",
          "Anchor Matching", "K-Means Anchors", "Anchor Optimization",
          "Multi-scale Anchors", "Anchor-free Detection", "Anchor Refinement", "Adaptive Anchors",
        ],
        non_max_suppression: [
          "Basic NMS", "Soft NMS", "DIoU NMS",
          "Matrix NMS", "Class-aware NMS", "Cluster NMS",
          "Fast NMS", "Adaptive NMS", "Top-K Selection", "NMS Threshold Tuning",
        ],
        dataset_preparation: [
          "COCO Format", "VOC Format", "Label Conversion",
          "Image Resizing", "Augmentation Setup", "Mosaic Augmentation",
          "MixUp Augmentation", "Class Balance", "Dataset Splitting", "Data Validation",
        ],
        model_training_yolo: [
          "Training Loop", "Loss Monitoring", "LR Scheduling",
          "Batch Size Tuning", "Warmup Training", "Mixed Precision",
          "Distributed Training", "Transfer Learning", "Fine Tuning", "Training Resume",
        ],
        inference_optimization: [
          "Model Quantization", "TensorRT Export", "ONNX Conversion",
          "OpenVINO Setup", "Batch Inference", "Multi-threading",
          "GPU Optimization", "FP16 Inference", "INT8 Quantization", "Edge Optimization",
        ],
        custom_classes: [
          "Custom Dataset", "Class Addition", "Label Mapping",
          "Config Update", "Anchor Recalculation", "Class Imbalance",
          "Few-shot Detection", "Incremental Learning", "Domain Adaptation", "Custom Metrics",
        ],
        yolo_evaluation: [
          "mAP50 Calculation", "mAP50-95 Score", "Per-class AP",
          "Confusion Matrix OD", "F1-Score Curve", "PR Curve Plot",
          "Inference Benchmark", "FPS Measurement", "Model Comparison", "Error Analysis OD",
        ],
        deployment_edge: [
          "Jetson Deploy", "Raspberry Pi", "Mobile Export",
          "CoreML Convert", "TFLite Export", "Edge TPU",
          "Model Pruning", "Knowledge Distillation", "Streaming Detection", "API Deployment OD",
        ],
      },
    };

    const title =
      (titles[tech] &&
        titles[tech][chapter] &&
        titles[tech][chapter][missionNum - 1]) ||
      `${chapter} Mission ${missionNum}`;

    const contents = [
      `def solve(data):\n    # TODO: Implement solution for ${title}\n    return result`,
      `def process(input_data):\n    """\n    ${title}: Process the input data correctly.\n    """\n    # TODO: Add your implementation\n    pass`,
      `import numpy as np\n\ndef compute(data):\n    # TODO: Compute ${title.toLowerCase()}\n    return np.array([])`,
      `def transform(df):\n    # TODO: Transform dataframe for ${title}\n    return df`,
      `from sklearn import preprocessing\n\ndef normalize(X):\n    # TODO: Normalize data for ${title}\n    return X`,
      `def evaluate(y_true, y_pred):\n    # TODO: Calculate metric for ${title}\n    return 0.0`,
      `def build_model():\n    # TODO: Build model for ${title}\n    return None`,
      `def predict(model, X_test):\n    # TODO: Make predictions for ${title}\n    return []`,
      `def train(X, y, epochs=10):\n    # TODO: Training loop for ${title}\n    return model`,
      `def preprocess(data):\n    # TODO: Preprocess data for ${title}\n    return data`,
    ];
    const content = contents[(missionNum - 1) % contents.length];

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
  },

  terminal: (tech, chapter, missionNum) => {
    const titles = {
      docker: {
        images: [
          "Build Image", "List Images", "Remove Image", "Tag Image", "Push Image",
          "Pull Image", "Image History", "Image Inspect", "Prune Images", "Export Image",
        ],
        containers: [
          "Run Container", "List Containers", "Stop Container", "Remove Container", "Container Logs",
          "Exec Command", "Container Stats", "Port Mapping", "Volume Mount", "Restart Policy",
        ],
        dockerfile_basics: [
          "FROM Instruction", "RUN Command", "COPY Files", "WORKDIR Setup", "ENV Variables",
          "EXPOSE Port", "CMD Entrypoint", "USER Setup", "LABEL Metadata", "HEALTHCHECK",
        ],
        docker_compose: [
          "Compose Up", "Compose Down", "Service Scaling", "Network Config", "Volume in Compose",
          "Environment File", "Multi-service", "Depends On", "Compose Build", "Override File",
        ],
        docker_networks: [
          "Create Network", "List Networks", "Inspect Network", "Connect Container", "Disconnect Container",
          "Bridge Network", "Host Network", "Overlay Network", "Network Alias", "Prune Networks",
        ],
        docker_volumes: [
          "Create Volume", "List Volumes", "Inspect Volume", "Bind Mount", "Named Volume",
          "Volume Driver", "Backup Volume", "Restore Volume", "Volume Prune", "Tmpfs Mount",
        ],
        multi_stage_builds: [
          "Builder Stage", "Final Stage", "Copy Artifacts", "Optimize Layers", "Minimal Image",
          "Distroless Base", "Build Args", "Cache Layers", "Parallel Builds", "Build Targets",
        ],
        docker_security: [
          "Non-root User", "Read-only FS", "Capabilities Drop", "Security Opt", "Secret Mounts",
          "Image Scanning", "Content Trust", "User Namespace", "AppArmor Profile", "Seccomp Profile",
        ],
        container_orchestration_basics: [
          "Swarm Init", "Create Service", "Scale Service", "Rolling Update", "Stack Deploy",
          "Node List", "Service Logs", "Swarm Leave", "Drain Node", "Placement Constraints",
        ],
        docker_troubleshooting: [
          "Debug Container", "Container Shell", "Resource Limits", "OOM Events", "Network Debug",
          "Volume Issues", "Build Cache", "Daemon Logs", "Inspect Events", "Health Status",
        ],
      },
      linux: {
        shell_basics: [
          "List Directory", "Change Directory", "Print Working Dir", "Make Directory", "Remove File",
          "Copy File", "Move File", "View File", "Search Files", "File Permissions",
        ],
        file_management: [
          "Find Files", "Locate Command", "Disk Usage", "Directory Size", "File Compression",
          "Archive Tar", "Symlink Create", "Hard Link", "Inode Info", "File Types",
        ],
        process_management: [
          "List Processes", "Kill Process", "Background Job", "Foreground Job", "Process Priority",
          "Nice Command", "Top Monitor", "PS Aux", "Process Tree", "Zombie Cleanup",
        ],
        user_permissions: [
          "Add User", "Delete User", "Change Password", "Add Group", "Change Owner",
          "Chmod Numeric", "Chmod Symbolic", "Sudo Command", "SUID Bit", "Sticky Bit",
        ],
        networking_commands: [
          "Ping Host", "Netstat Ports", "SS Command", "Traceroute", "DNS Lookup",
          "IP Address", "Route Table", "ARP Table", "Curl Request", "Wget Download",
        ],
        text_processing: [
          "Grep Search", "Sed Replace", "Awk Fields", "Cut Columns", "Sort Lines",
          "Unique Lines", "WC Count", "Diff Files", "Head Tail", "Regex Match",
        ],
        system_monitoring_linux: [
          "Free Memory", "DF Disk", "Uptime Load", "VM Stat", "Iostat CPU",
          "Netstat Stats", "Sar Report", "Dmesg Logs", "Journalctl", "Systemctl Status",
        ],
        package_management: [
          "Apt Update", "Apt Install", "Apt Remove", "Apt Search", "Dpkg List",
          "Yum Install", "Dnf Update", "RPM Query", "Snap Install", "Flatpak Run",
        ],
        shell_scripting_linux: [
          "Shebang Line", "Variable Set", "If Statement", "For Loop", "While Loop",
          "Case Statement", "Function Def", "Arguments Parse", "Exit Codes", "Source Script",
        ],
        linux_security: [
          "UFW Firewall", "SSH Config", "Fail2ban Setup", "SELinux Mode", "Audit Rules",
          "Chroot Jail", "Cryptsetup", "AppArmor Status", "OpenSSL Cert", "Passwd Policy",
        ],
      },
      terminal: {
        shell_basics: [
          "Echo Command", "Cat Concat", "Less Pager", "More Pager", "Touch File",
          "Rm Remove", "Cp Copy", "Mv Move", "Ln Link", "Df Disk Free",
        ],
        networking: [
          "Ifconfig", "Ip Addr", "Netstat", "Ss Socket", "Ping",
          "Traceroute", "Nslookup", "Dig DNS", "Curl HTTP", "Scp Secure Copy",
        ],
        process_management: [
          "Ps Aux", "Top Interactive", "Htop View", "Kill Signal", "Pkill Pattern",
          "Pgrep Find", "Nohup Background", "Jobs List", "Fg Foreground", "Bg Background",
        ],
        file_permissions: [
          "Ls -l", "Chmod 755", "Chmod U+x", "Chown User", "Chgrp Group",
          "Umask Value", "ACL Get", "ACL Set", "Sudo Chown", "Stat File",
        ],
        grep_sed_awk: [
          "Grep Pattern", "Grep -i", "Grep -v", "Grep -r", "Sed Replace",
          "Sed Delete", "Awk Print", "Awk -F", "Awk Sum", "Awk Filter",
        ],
        ssh_remote_access: [
          "Ssh Connect", "Ssh Keygen", "Ssh Copy Id", "Ssh Config", "Ssh Tunnel",
          "Ssh Agent", "Ssh Port", "Scp Upload", "Rsync Sync", "Sftp Interactive",
        ],
        disk_management: [
          "Df -h", "Du -sh", "Fdisk List", "Mount Device", "Unmount Device",
          "Lsblk Tree", "Blkid UUID", "Mkfs Format", "Fsck Check", "LVM Create",
        ],
        environment_variables: [
          "Echo $PATH", "Export Var", "Unset Var", "Env List", "Printenv",
          "Set Command", "Source Profile", "Alias Create", "Unalias Remove", "Profile Edit",
        ],
        cron_scheduling: [
          "Crontab -e", "Crontab -l", "Cron Syntax", "Cron Every Min", "Cron Daily",
          "Cron Weekly", "Cron Monthly", "Cron Redirect", "At Command", "Systemd Timer",
        ],
        log_analysis: [
          "Tail -f", "Journalctl", "Grep Logs", "Awk Logs", "Sed Logs",
          "Sort Logs", "Uniq Logs", "Wc -l", "Cut Logs", "Less +F",
        ],
      },
    };

    const title =
      (titles[tech] &&
        titles[tech][chapter] &&
        titles[tech][chapter][missionNum - 1]) ||
      `${chapter} Mission ${missionNum}`;

    const contents = [
      `# ${title}\n# TODO: Execute the correct command\n`,
      `# ${title}\n# TODO: Use appropriate flags and options\n`,
      `# ${title}\n# TODO: Pipe commands together\n`,
      `# ${title}\n# TODO: Filter and process output\n`,
      `# ${title}\n# TODO: Configure system settings\n`,
      `# ${title}\n# TODO: Automate with scripting\n`,
      `# ${title}\n# TODO: Debug and troubleshoot\n`,
      `# ${title}\n# TODO: Manage resources\n`,
      `# ${title}\n# TODO: Secure the environment\n`,
      `# ${title}\n# TODO: Optimize performance\n`,
    ];
    const content = contents[(missionNum - 1) % contents.length];

    return {
      title,
      initialState: { content },
      validation: {
        type: "terminal",
        rules: ["must_include:TODO"],
      },
      id: `mission_${String(missionNum).padStart(2, "0")}`,
      type: "terminal",
      xpReward: 50 + missionNum * 10,
    };
  },

  pipeline: (tech, chapter, missionNum) => {
    const titles = {
      pipeline: {
        github_actions: [
          "Checkout Code", "Setup Node", "Run Tests", "Build App", "Deploy Stage",
          "Matrix Build", "Cache Dependencies", "Artifact Upload", "Secret Masking", "Conditional Jobs",
        ],
        gitlab_ci: [
          "Define Stages", "Build Stage", "Test Stage", "Deploy Stage", "Artifacts",
          "Cache Config", "Variables", "Rules", "Matrix Jobs", "Child Pipelines",
        ],
        jenkins: [
          "Freestyle Job", "Pipeline Script", "Declarative Pipe", "Build Triggers", "Post Actions",
          "Parameters", "Credentials", "Agents", "Shared Library", "Blue Ocean",
        ],
        azure_pipelines: [
          "Pipeline YAML", "Agent Pool", "Task Template", "Variable Groups", "Stage Gates",
          "Approval Gates", "Release Pipeline", "Multi-stage", "Container Jobs", "Self-hosted Agent",
        ],
        travis_ci_advanced: [
          "Travis YAML", "Build Matrix", "Environment Vars", "Deploy Provider", "Custom Scripts",
          "Cache Travis", "Notifications", "Branches Only", "Cron Jobs", "Travis API",
        ],
        circleci_advanced: [
          "Config YAML", "Workflows", "Orbs Usage", "Docker Executor", "Machine Executor",
          "Cache CircleCI", "Workspace", "Artifacts Circle", "Contexts", "Scheduled Pipelines",
        ],
        gitops_flux: [
          "Install Flux", "GitRepo Source", "Kustomization", "Helm Release", "Image Automation",
          "Notification Controller", "RBAC Config", "Multi-tenancy", "Bootstrap Cluster", "Flux Monitoring",
        ],
        argo_workflows: [
          "Hello Workflow", "Parameters", "DAG Template", "Artifacts Argo", "Loops Argo",
          "Conditionals", "Cron Workflows", "Resource Template", "Exit Handlers", "Workflow Templates",
        ],
        tekton_pipelines: [
          "Task Definition", "TaskRun", "Pipeline", "PipelineRun", "Workspaces",
          "Results", "Finally Tasks", "Conditions", "Triggers", "Catalog Tasks",
        ],
        spinnaker_deployments: [
          "Application Setup", "Pipeline Create", "Deploy Manifest", "Manual Judgment", "Webhook Stage",
          "Canary Analysis", "Rollback Strategy", "Notifications Spinnaker", "Pipeline Expressions", "Multi-env Deploy",
        ],
      },
      system_design: {
        scalability_patterns: [
          "Horizontal Scaling", "Vertical Scaling", "Load Balancer", "Auto Scaling", "Stateless Design",
          "Session Affinity", "Database Scaling", "Read Replicas", "Write Sharding", "Connection Pooling",
        ],
        load_balancing: [
          "Round Robin LB", "Least Connections", "IP Hash LB", "Weighted LB", "Health Checks",
          "SSL Termination", "Path-based LB", "Geographic LB", "Failover LB", "Sticky Sessions",
        ],
        caching_strategies: [
          "Cache Aside", "Read Through", "Write Through", "Write Behind", "TTL Config",
          "Cache Eviction", "Distributed Cache", "Cache Warming", "Cache Stampede", "Multi-tier Cache",
        ],
        database_sharding: [
          "Shard Key", "Range Sharding", "Hash Sharding", "Directory Sharding", "Shard Balancing",
          "Cross-shard Query", "Shard Migration", "Global Tables", "Sequence Sharding", "Shard Monitoring",
        ],
        microservices_design: [
          "Service Boundary", "API Gateway", "Service Discovery", "Circuit Breaker", "Retry Pattern",
          "Bulkhead Pattern", "Saga Pattern", "Event Sourcing", "CQRS Pattern", "Strangler Fig",
        ],
        api_gateway_patterns: [
          "Rate Limiting", "Authentication GW", "Request Routing", "Response Transform", "API Versioning",
          "Throttling", "Request Validation", "Response Caching", "Logging GW", "Monitoring GW",
        ],
        message_queues: [
          "Queue Basics", "Pub/Sub Model", "Message Ordering", "Dead Letter Queue", "Priority Queue",
          "Delayed Messages", "Queue Sharding", "Exactly Once", "Message Replay", "Queue Monitoring",
        ],
        distributed_systems: [
          "Consensus Protocol", "Leader Election", "Distributed Lock", "ID Generation", "Clock Sync",
          "Gossip Protocol", "Vector Clocks", "CAP Theorem", "Two-phase Commit", "Paxos Basics",
        ],
        rate_limiting: [
          "Token Bucket", "Leaky Bucket", "Fixed Window", "Sliding Window", "Redis Rate Limit",
          "Header Based", "User Based", "IP Based", "Tiered Limits", "Rate Limit Response",
        ],
        fault_tolerance: [
          "Retry Logic", "Timeout Config", "Fallback Strategy", "Bulkhead Isolation", "Degradation",
          "Health Endpoints", "Graceful Shutdown", "Chaos Engineering", "Disaster Recovery", "Backup Strategy",
        ],
      },
    };

    const title =
      (titles[tech] &&
        titles[tech][chapter] &&
        titles[tech][chapter][missionNum - 1]) ||
      `${chapter} Mission ${missionNum}`;

    const contents = [
      `steps:\n  - name: ${title}\n    # TODO: Add pipeline step`,
      `jobs:\n  ${title.toLowerCase().replace(/ /g, "_")}:\n    # TODO: Define job configuration`,
      `pipeline:\n  stages:\n    - ${title.toLowerCase().replace(/ /g, "_")}\n    # TODO: Configure stage`,
      `deploy:\n  # TODO: Add deployment configuration for ${title}`,
      `build:\n  # TODO: Add build configuration`,
      `test:\n  # TODO: Add test configuration`,
      `release:\n  # TODO: Add release configuration`,
      `monitor:\n  # TODO: Add monitoring configuration`,
      `config:\n  # TODO: Add system configuration`,
      `scale:\n  # TODO: Add scaling configuration`,
    ];
    const content = contents[(missionNum - 1) % contents.length];

    return {
      title,
      initialState: { content },
      validation: {
        type: "pipeline",
        rules: ["must_include:TODO"],
      },
      id: `mission_${String(missionNum).padStart(2, "0")}`,
      type: "pipeline",
      xpReward: 50 + missionNum * 10,
    };
  },
};

function generateGuidelines(chapterName) {
  const displayName = chapterName
    .replace(/_/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
  return {
    [chapterName]: `## What You Will Learn\\n\\nMaster ${displayName.toLowerCase()} through hands-on practical missions. You will gain real-world experience through guided exercises.\\n\\n### Key Concepts\\n- Core ${displayName.toLowerCase()} concepts and patterns\\n- Practical implementation strategies\\n- Common pitfalls and best practices\\n\\n### Why This Matters\\nMastering these skills will improve your productivity and enable you to build robust, scalable solutions.`,
  };
}

function createMissionFile(techDir, chapter, missionNum, gameType) {
  const missionDir = path.join(
    techDir,
    chapter,
    `mission_${String(missionNum).padStart(2, "0")}`,
  );
  if (!fs.existsSync(missionDir)) {
    fs.mkdirSync(missionDir, { recursive: true });
  }

  const gameFile = path.join(missionDir, "games.json");
  if (!fs.existsSync(gameFile)) {
    const content = missionGenerators[gameType](
      techDir.split(path.sep).pop(),
      chapter,
      missionNum,
    );
    fs.writeFileSync(gameFile, JSON.stringify(content, null, 2));
    return true;
  }
  return false;
}

function createGuidelines(techDir, chapter) {
  const guidelinesFile = path.join(techDir, chapter, "guidelines.json");
  if (!fs.existsSync(guidelinesFile)) {
    const guidelines = generateGuidelines(chapter);
    fs.writeFileSync(guidelinesFile, JSON.stringify(guidelines, null, 2));
    return true;
  }
  return false;
}
          "Debug Container",
          "Container Shell",
          "Resource Limits",
          "OOM Events",
          "Network Debug",
          "Volume Issues",
          "Build Cache",
          "Daemon Logs",
          "Inspect Events",
          "Health Status",
        ],
      },
      linux: {
        shell_basics: [
          "List Directory",
          "Change Directory",
          "Print Working Dir",
          "Make Directory",
          "Remove File",
          "Copy File",
          "Move File",
          "View File",
          "Search Files",
          "File Permissions",
        ],
        file_management: [
          "Find Files",
          "Locate Command",
          "Disk Usage",
          "Directory Size",
          "File Compression",
          "Archive Tar",
          "Symlink Create",
          "Hard Link",
          "Inode Info",
          "File Types",
        ],
        process_management: [
          "List Processes",
          "Kill Process",
          "Background Job",
          "Foreground Job",
          "Process Priority",
          "Nice Command",
          "Top Monitor",
          "PS Aux",
          "Process Tree",
          "Zombie Cleanup",
        ],
        user_permissions: [
          "Add User",
          "Delete User",
          "Change Password",
          "Add Group",
          "Change Owner",
          "Chmod Numeric",
          "Chmod Symbolic",
          "Sudo Command",
          "SUID Bit",
          "Sticky Bit",
        ],
        networking_commands: [
          "Ping Host",
          "Netstat Ports",
          "SS Command",
          "Traceroute",
          "DNS Lookup",
          "IP Address",
          "Route Table",
          "ARP Table",
          "Curl Request",
          "Wget Download",
        ],
        text_processing: [
          "Grep Search",
          "Sed Replace",
          "Awk Fields",
          "Cut Columns",
          "Sort Lines",
          "Unique Lines",
          "WC Count",
          "Diff Files",
          "Head Tail",
          "Regex Match",
        ],
        system_monitoring_linux: [
          "Free Memory",
          "DF Disk",
          "Uptime Load",
          "VM Stat",
          "Iostat CPU",
          "Netstat Stats",
          "Sar Report",
          "Dmesg Logs",
          "Journalctl",
          "Systemctl Status",
        ],
        package_management: [
          "Apt Update",
          "Apt Install",
          "Apt Remove",
          "Apt Search",
          "Dpkg List",
          "Yum Install",
          "Dnf Update",
          "RPM Query",
          "Snap Install",
          "Flatpak Run",
        ],
        shell_scripting_linux: [
          "Shebang Line",
          "Variable Set",
          "If Statement",
          "For Loop",
          "While Loop",
          "Case Statement",
          "Function Def",
          "Arguments Parse",
          "Exit Codes",
          "Source Script",
        ],
        linux_security: [
          "UFW Firewall",
          "SSH Config",
          "Fail2ban Setup",
          "SELinux Mode",
          "Audit Rules",
          "Chroot Jail",
          "Cryptsetup",
          "AppArmor Status",
          "OpenSSL Cert",
          "Passwd Policy",
        ],
      },
      terminal: {
        shell_basics: [
          "Echo Command",
          "Cat Concat",
          "Less Pager",
          "More Pager",
          "Touch File",
          "Rm Remove",
          "Cp Copy",
          "Mv Move",
          "Ln Link",
          "Df Disk Free",
        ],
        networking: [
          "Ifconfig",
          "Ip Addr",
          "Netstat",
          "Ss Socket",
          "Ping",
          "Traceroute",
          "Nslookup",
          "Dig DNS",
          "Curl HTTP",
          "Scp Secure Copy",
        ],
        process_management: [
          "Ps Aux",
          "Top Interactive",
          "Htop View",
          "Kill Signal",
          "Pkill Pattern",
          "Pgrep Find",
          "Nohup Background",
          "Jobs List",
          "Fg Foreground",
          "Bg Background",
        ],
        file_permissions: [
          "Ls -l",
          "Chmod 755",
          "Chmod U+x",
          "Chown User",
          "Chgrp Group",
          "Umask Value",
          "ACL Get",
          "ACL Set",
          "Sudo Chown",
          "Stat File",
        ],
        grep_sed_awk: [
          "Grep Pattern",
          "Grep -i",
          "Grep -v",
          "Grep -r",
          "Sed Replace",
          "Sed Delete",
          "Awk Print",
          "Awk -F",
          "Awk Sum",
          "Awk Filter",
        ],
        ssh_remote_access: [
          "Ssh Connect",
          "Ssh Keygen",
          "Ssh Copy Id",
          "Ssh Config",
          "Ssh Tunnel",
          "Ssh Agent",
          "Ssh Port",
          "Scp Upload",
          "Rsync Sync",
          "Sftp Interactive",
        ],
        disk_management: [
          "Df -h",
          "Du -sh",
          "Fdisk List",
          "Mount Device",
          "Unmount Device",
          "Lsblk Tree",
          "Blkid UUID",
          "Mkfs Format",
          "Fsck Check",
          "LVM Create",
        ],
        environment_variables: [
          "Echo $PATH",
          "Export Var",
          "Unset Var",
          "Env List",
          "Printenv",
          "Set Command",
          "Source Profile",
          "Alias Create",
          "Unalias Remove",
          "Profile Edit",
        ],
        cron_scheduling: [
          "Crontab -e",
          "Crontab -l",
          "Cron Syntax",
          "Cron Every Min",
          "Cron Daily",
          "Cron Weekly",
          "Cron Monthly",
          "Cron Redirect",
          "At Command",
          "Systemd Timer",
        ],
        log_analysis: [
          "Tail -f",
          "Journalctl",
          "Grep Logs",
          "Awk Logs",
          "Sed Logs",
          "Sort Logs",
          "Uniq Logs",
          "Wc -l",
          "Cut Logs",
          "Less +F",
        ],
      },
    };

    const title =
      (titles[tech] &&
        titles[tech][chapter] &&
        titles[tech][chapter][missionNum - 1]) ||
      `${chapter} Mission ${missionNum}`;
    const contents = [
      `# ${title}\n# TODO: Execute the correct command\n`,
      `# ${title}\n# TODO: Use appropriate flags and options\n`,
      `# ${title}\n# TODO: Pipe commands together\n`,
      `# ${title}\n# TODO: Filter and process output\n`,
      `# ${title}\n# TODO: Configure system settings\n`,
      `# ${title}\n# TODO: Automate with scripting\n`,
      `# ${title}\n# TODO: Debug and troubleshoot\n`,
      `# ${title}\n# TODO: Manage resources\n`,
      `# ${title}\n# TODO: Secure the environment\n`,
      `# ${title}\n# TODO: Optimize performance\n`,
    ];
    const content = contents[(missionNum - 1) % contents.length];

    return {
      title,
      initialState: { content },
      validation: {
        type: "terminal",
        rules: ["must_include:TODO"],
      },
      id: `mission_${String(missionNum).padStart(2, "0")}`,
      type: "terminal",
      xpReward: 50 + missionNum * 10,
    };
  },

  pipeline: (tech, chapter, missionNum) => {
    const titles = {
      pipeline: {
        github_actions: [
          "Checkout Code",
          "Setup Node",
          "Run Tests",
          "Build App",
          "Deploy Stage",
          "Matrix Build",
          "Cache Dependencies",
          "Artifact Upload",
          "Secret Masking",
          "Conditional Jobs",
        ],
        gitlab_ci: [
          "Define Stages",
          "Build Stage",
          "Test Stage",
          "Deploy Stage",
          "Artifacts",
          "Cache Config",
          "Variables",
          "Rules",
          "Matrix Jobs",
          "Child Pipelines",
        ],
        jenkins: [
          "Freestyle Job",
          "Pipeline Script",
          "Declarative Pipe",
          "Build Triggers",
          "Post Actions",
          "Parameters",
          "Credentials",
          "Agents",
          "Shared Library",
          "Blue Ocean",
        ],
        azure_pipelines: [
          "Pipeline YAML",
          "Agent Pool",
          "Task Template",
          "Variable Groups",
          "Stage Gates",
          "Approval Gates",
          "Release Pipeline",
          "Multi-stage",
          "Container Jobs",
          "Self-hosted Agent",
        ],
        travis_ci_advanced: [
          "Travis YAML",
          "Build Matrix",
          "Environment Vars",
          "Deploy Provider",
          "Custom Scripts",
          "Cache Travis",
          "Notifications",
          "Branches Only",
          "Cron Jobs",
          "Travis API",
        ],
        circleci_advanced: [
          "Config YAML",
          "Workflows",
          "Orbs Usage",
          "Docker Executor",
          "Machine Executor",
          "Cache CircleCI",
          "Workspace",
          "Artifacts Circle",
          "Contexts",
          "Scheduled Pipelines",
        ],
        gitops_flux: [
          "Install Flux",
          "GitRepo Source",
          "Kustomization",
          "Helm Release",
          "Image Automation",
          "Notification Controller",
          "RBAC Config",
          "Multi-tenancy",
          "Bootstrap Cluster",
          "Flux Monitoring",
        ],
        argo_workflows: [
          "Hello Workflow",
          "Parameters",
          "DAG Template",
          "Artifacts Argo",
          "Loops Argo",
          "Conditionals",
          "Cron Workflows",
          "Resource Template",
          "Exit Handlers",
          "Workflow Templates",
        ],
        tekton_pipelines: [
          "Task Definition",
          "TaskRun",
          "Pipeline",
          "PipelineRun",
          "Workspaces",
          "Results",
          "Finally Tasks",
          "Conditions",
          "Triggers",
          "Catalog Tasks",
        ],
        spinnaker_deployments: [
          "Application Setup",
          "Pipeline Create",
          "Deploy Manifest",
          "Manual Judgment",
          "Webhook Stage",
          "Canary Analysis",
          "Rollback Strategy",
          "Notifications Spinnaker",
          "Pipeline Expressions",
          "Multi-env Deploy",
        ],
      },
      system_design: {
        scalability_patterns: [
          "Horizontal Scaling",
          "Vertical Scaling",
          "Load Balancer",
          "Auto Scaling",
          "Stateless Design",
          "Session Affinity",
          "Database Scaling",
          "Read Replicas",
          "Write Sharding",
          "Connection Pooling",
        ],
        load_balancing: [
          "Round Robin LB",
          "Least Connections",
          "IP Hash LB",
          "Weighted LB",
          "Health Checks",
          "SSL Termination",
          "Path-based LB",
          "Geographic LB",
          "Failover LB",
          "Sticky Sessions",
        ],
        caching_strategies: [
          "Cache Aside",
          "Read Through",
          "Write Through",
          "Write Behind",
          "TTL Config",
          "Cache Eviction",
          "Distributed Cache",
          "Cache Warming",
          "Cache Stampede",
          "Multi-tier Cache",
        ],
        database_sharding: [
          "Shard Key",
          "Range Sharding",
          "Hash Sharding",
          "Directory Sharding",
          "Shard Balancing",
          "Cross-shard Query",
          "Shard Migration",
          "Global Tables",
          "Sequence Sharding",
          "Shard Monitoring",
        ],
        microservices_design: [
          "Service Boundary",
          "API Gateway",
          "Service Discovery",
          "Circuit Breaker",
          "Retry Pattern",
          "Bulkhead Pattern",
          "Saga Pattern",
          "Event Sourcing",
          "CQRS Pattern",
          "Strangler Fig",
        ],
        api_gateway_patterns: [
          "Rate Limiting",
          "Authentication GW",
          "Request Routing",
          "Response Transform",
          "API Versioning",
          "Throttling",
          "Request Validation",
          "Response Caching",
          "Logging GW",
          "Monitoring GW",
        ],
        message_queues: [
          "Queue Basics",
          "Pub/Sub Model",
          "Message Ordering",
          "Dead Letter Queue",
          "Priority Queue",
          "Delayed Messages",
          "Queue Sharding",
          "Exactly Once",
          "Message Replay",
          "Queue Monitoring",
        ],
        distributed_systems: [
          "Consensus Protocol",
          "Leader Election",
          "Distributed Lock",
          "ID Generation",
          "Clock Sync",
          "Gossip Protocol",
          "Vector Clocks",
          "CAP Theorem",
          "Two-phase Commit",
          "Paxos Basics",
        ],
        rate_limiting: [
          "Token Bucket",
          "Leaky Bucket",
          "Fixed Window",
          "Sliding Window",
          "Redis Rate Limit",
          "Header Based",
          "User Based",
          "IP Based",
          "Tiered Limits",
          "Rate Limit Response",
        ],
        fault_tolerance: [
          "Retry Logic",
          "Timeout Config",
          "Fallback Strategy",
          "Bulkhead Isolation",
          "Degradation",
          "Health Endpoints",
          "Graceful Shutdown",
          "Chaos Engineering",
          "Disaster Recovery",
          "Backup Strategy",
        ],
      },
    };

    const title =
      (titles[tech] &&
        titles[tech][chapter] &&
        titles[tech][chapter][missionNum - 1]) ||
      `${chapter} Mission ${missionNum}`;
    const contents = [
      `steps:\n  - name: ${title}\n    # TODO: Add pipeline step`,
      `jobs:\n  ${title.toLowerCase().replace(/ /g, "_")}:\n    # TODO: Define job configuration`,
      `pipeline:\n  stages:\n    - ${title.toLowerCase().replace(/ /g, "_")}\n    # TODO: Configure stage`,
      `deploy:\n  # TODO: Add deployment configuration for ${title}`,
      `build:\n  # TODO: Add build configuration`,
      `test:\n  # TODO: Add test configuration`,
      `release:\n  # TODO: Add release configuration`,
      `monitor:\n  # TODO: Add monitoring configuration`,
      `config:\n  # TODO: Add system configuration`,
      `scale:\n  # TODO: Add scaling configuration`,
    ];
    const content = contents[(missionNum - 1) % contents.length];

    return {
      title,
      initialState: { content },
      validation: {
        type: "pipeline",
        rules: ["must_include:TODO"],
      },
      id: `mission_${String(missionNum).padStart(2, "0")}`,
      type: "pipeline",
      xpReward: 50 + missionNum * 10,
    };
  },
};

function generateGuidelines(chapterName) {
  const displayName = chapterName
    .replace(/_/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
  return {
    [chapterName]: `## What You Will Learn\\n\\nMaster ${displayName.toLowerCase()} through hands-on practical missions. You will gain real-world experience through guided exercises.\\n\\n### Key Concepts\\n- Core ${displayName.toLowerCase()} concepts and patterns\\n- Practical implementation strategies\\n- Common pitfalls and best practices\\n\\n### Why This Matters\\nMastering these skills will improve your productivity and enable you to build robust, scalable solutions.`,
  };
}

function createMissionFile(techDir, chapter, missionNum, gameType) {
  const missionDir = path.join(
    techDir,
    chapter,
    `mission_${String(missionNum).padStart(2, "0")}`,
  );
  if (!fs.existsSync(missionDir)) {
    fs.mkdirSync(missionDir, { recursive: true });
  }

  const gameFile = path.join(missionDir, "games.json");
  if (!fs.existsSync(gameFile)) {
    const content = missionGenerators[gameType](
      techDir.split(path.sep).pop(),
      chapter,
      missionNum,
    );
    fs.writeFileSync(gameFile, JSON.stringify(content, null, 2));
    return true;
  }
  return false;
}

function createGuidelines(techDir, chapter) {
  const guidelinesFile = path.join(techDir, chapter, "guidelines.json");
  if (!fs.existsSync(guidelinesFile)) {
    const guidelines = generateGuidelines(chapter);
    fs.writeFileSync(guidelinesFile, JSON.stringify(guidelines, null, 2));
    return true;
  }
  return false;
}

let totalCreated = 0;
let totalUpdated = 0;

Object.entries(technologies).forEach(([techName, config]) => {
  const techDir = path.join(baseDir, techName);
  if (!fs.existsSync(techDir)) {
    fs.mkdirSync(techDir, { recursive: true });
  }

  config.chapters.forEach((chapter) => {
    const chapterDir = path.join(techDir, chapter);
    if (!fs.existsSync(chapterDir)) {
      fs.mkdirSync(chapterDir, { recursive: true });
      totalCreated++;
    }

    if (createGuidelines(techDir, chapter)) {
      totalCreated++;
    }

    for (let missionNum = 1; missionNum <= 10; missionNum++) {
      if (createMissionFile(techDir, chapter, missionNum, config.gameType)) {
        totalCreated++;
      }
    }
  });

  console.log(
    `Processed ${techName}: ${config.chapters.length} chapters, game type: ${config.gameType}`,
  );
});

console.log(`\nDone! Created/updated ${totalCreated} files.`);
