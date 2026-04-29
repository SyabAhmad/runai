const fs = require("fs");
const path = require("path");

const baseDir = __dirname;

const chapters = [
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
];

const titles = {
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
  console.log(`system_design/${chapter}: 10 missions created`);
});

console.log("Done!");
