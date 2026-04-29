const fs = require("fs");
const path = require("path");

const baseDir = __dirname;

const chapters = [
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
];

const titles = {
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
};

const contents = [
  (t) => `steps:\n  - name: ${t}\n    # TODO: Add pipeline step`,
  (t) =>
    `jobs:\n  ${t.toLowerCase().replace(/ /g, "_")}:\n    # TODO: Define job configuration`,
  (t) =>
    `pipeline:\n  stages:\n    - ${t.toLowerCase().replace(/ /g, "_")}\n    # TODO: Configure stage`,
  (t) => `deploy:\n  # TODO: Add deployment configuration for ${t}`,
  (t) => `build:\n  # TODO: Add build configuration`,
  (t) => `test:\n  # TODO: Add test configuration`,
  (t) => `release:\n  # TODO: Add release configuration`,
  (t) => `monitor:\n  # TODO: Add monitoring configuration`,
  (t) => `config:\n  # TODO: Add system configuration`,
  (t) => `scale:\n  # TODO: Add scaling configuration`,
];

function getGame(chapter, missionNum) {
  const title =
    titles[chapter]?.[missionNum - 1] || `${chapter} Mission ${missionNum}`;
  const content = contents[(missionNum - 1) % contents.length](title);
  return {
    title,
    initialState: { content },
    validation: { type: "pipeline", rules: ["must_include:TODO"] },
    id: `mission_${String(missionNum).padStart(2, "0")}`,
    type: "pipeline",
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
  console.log(`pipeline/${chapter}: 10 missions created`);
});

console.log("Done!");
