const fs = require("fs");
const path = require("path");

const baseDir = __dirname;

const chapters = [
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
];

const titles = {
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
  console.log(`linux/${chapter}: 10 missions created`);
});

console.log("Done!");
