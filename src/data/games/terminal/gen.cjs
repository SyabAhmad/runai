const fs = require("fs");
const path = require("path");

const baseDir = __dirname;

const chapters = [
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
];

const titles = {
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
  console.log(`terminal/${chapter}: 10 missions created`);
});

console.log("Done!");
