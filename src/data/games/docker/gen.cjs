const fs = require("fs");
const path = require("path");

const baseDir = __dirname;

const chapters = [
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
];

const titles = {
  images: [
    "Build Image",
    "List Images",
    "Remove Image",
    "Tag Image",
    "Push Image",
    "Pull Image",
    "Image History",
    "Image Inspect",
    "Prune Images",
    "Export Image",
  ],
  containers: [
    "Run Container",
    "List Containers",
    "Stop Container",
    "Remove Container",
    "Container Logs",
    "Exec Command",
    "Container Stats",
    "Port Mapping",
    "Volume Mount",
    "Restart Policy",
  ],
  dockerfile_basics: [
    "FROM Instruction",
    "RUN Command",
    "COPY Files",
    "WORKDIR Setup",
    "ENV Variables",
    "EXPOSE Port",
    "CMD Entrypoint",
    "USER Setup",
    "LABEL Metadata",
    "HEALTHCHECK",
  ],
  docker_compose: [
    "Compose Up",
    "Compose Down",
    "Service Scaling",
    "Network Config",
    "Volume in Compose",
    "Environment File",
    "Multi-service",
    "Depends On",
    "Compose Build",
    "Override File",
  ],
  docker_networks: [
    "Create Network",
    "List Networks",
    "Inspect Network",
    "Connect Container",
    "Disconnect Container",
    "Bridge Network",
    "Host Network",
    "Overlay Network",
    "Network Alias",
    "Prune Networks",
  ],
  docker_volumes: [
    "Create Volume",
    "List Volumes",
    "Inspect Volume",
    "Bind Mount",
    "Named Volume",
    "Volume Driver",
    "Backup Volume",
    "Restore Volume",
    "Volume Prune",
    "Tmpfs Mount",
  ],
  multi_stage_builds: [
    "Builder Stage",
    "Final Stage",
    "Copy Artifacts",
    "Optimize Layers",
    "Minimal Image",
    "Distroless Base",
    "Build Args",
    "Cache Layers",
    "Parallel Builds",
    "Build Targets",
  ],
  docker_security: [
    "Non-root User",
    "Read-only FS",
    "Capabilities Drop",
    "Security Opt",
    "Secret Mounts",
    "Image Scanning",
    "Content Trust",
    "User Namespace",
    "AppArmor Profile",
    "Seccomp Profile",
  ],
  container_orchestration_basics: [
    "Swarm Init",
    "Create Service",
    "Scale Service",
    "Rolling Update",
    "Stack Deploy",
    "Node List",
    "Service Logs",
    "Swarm Leave",
    "Drain Node",
    "Placement Constraints",
  ],
  docker_troubleshooting: [
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
};

const contents = [
  (t) => `# ${t}\n# TODO: Execute the correct command\n`,
  (t) => `# ${t}\n# TODO: Use appropriate flags and options\n`,
  (t) => `# ${t}\n# TODO: Pipe commands together\n`,
  (t) => `# ${t}\n# TODO: Filter and process output\n`,
  (t) => `# ${t}\n# TODO: Configure system settings\n`,
  (t) => `# ${t}\n# TODO: Automate with scripting\n`,
  (t) => `# ${t}\n# TODO: Debug and troubleshoot\n`,
  (t) => `# ${t}\n# TODO: Manage resources\n`,
  (t) => `# ${t}\n# TODO: Secure the environment\n`,
  (t) => `# ${t}\n# TODO: Optimize performance\n`,
];

function getGame(chapter, missionNum) {
  const title =
    titles[chapter]?.[missionNum - 1] || `${chapter} Mission ${missionNum}`;
  const content = contents[(missionNum - 1) % contents.length](title);
  return {
    title,
    initialState: { content },
    validation: { type: "terminal", rules: ["must_include:TODO"] },
    id: `mission_${String(missionNum).padStart(2, "0")}`,
    type: "terminal",
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
  console.log(`docker/${chapter}: 10 missions created`);
});

console.log("Done!");
