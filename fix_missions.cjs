const fs = require('fs');
const path = require('path');

// ============ AUTOMATION (Terminal) ============
const automationBase = 'F:\\code\\runai\\src\\data\\games\\automation\\automation_chapter';

const automationMissions = [
  {
    id: 'mission_01', title: 'Echo Greeting', xpReward: 100,
    initialState: '#!/bin/bash\n# Print a greeting message to the terminal\n# Use the echo command\n\n',
    rules: ['must_include:echo', 'must_include:Hello'],
    description: 'Learn to use the echo command - the simplest way to output text in Bash.',
    hints: ['The echo command prints text to the terminal', 'Try: echo "Hello, Bestie!"', 'Make sure your message is in quotes!'],
    solution: '#!/bin/bash\necho "Hello, Bestie!"',
    outcome: 'Awesome! The echo command is your first step in shell scripting.'
  },
  {
    id: 'mission_02', title: 'Variables', xpReward: 100,
    initialState: '#!/bin/bash\n# Create a variable called "name" with value "Bestie"\n# Print a greeting using the variable\n\n',
    rules: ['must_include:name=', 'must_include:echo', 'must_include:$name'],
    description: 'Learn to store and use variables to make your scripts dynamic.',
    hints: ['Variables: name=value (no spaces around =)', 'Access with $name or ${name}', 'Try: name="Bestie"; echo "Hello, $name!"'],
    solution: '#!/bin/bash\nname="Bestie"\necho "Hello, $name!"',
    outcome: 'Great! Variables let you store data and reuse it. The $ sign accesses the variable\'s value.'
  },
  {
    id: 'mission_03', title: 'If Statements', xpReward: 100,
    initialState: '#!/bin/bash\n# Check if a file named "test.txt" exists\n# Print "Found it!" if yes, "Not found" otherwise\n\n',
    rules: ['must_include:if', 'must_include:-f', 'must_include:then', 'must_include:else', 'must_include:fi'],
    description: 'Use if-else statements to make decisions based on conditions.',
    hints: ['The -f flag checks if a file exists', 'Syntax: if [ -f "file.txt" ]; then ... else ... fi', 'fi (if backwards) ends the if block'],
    solution: '#!/bin/bash\nif [ -f "test.txt" ]; then\n  echo "Found it!"\nelse\n  echo "Not found"\nfi',
    outcome: 'Perfect! Conditionals let your scripts make decisions. The [ ] is a test command in Bash.'
  },
  {
    id: 'mission_04', title: 'For Loops', xpReward: 150,
    initialState: '#!/bin/bash\n# Print numbers 1 through 5 using a for loop\n# Use brace expansion {1..5}\n\n',
    rules: ['must_include:for', 'must_include:do', 'must_include:done', 'must_include:echo'],
    description: 'Use for loops to repeat tasks with different values.',
    hints: ['Brace expansion {1..5} creates a list of numbers', 'Syntax: for i in {1..5}; do ... done', 'do starts the loop body, done ends it'],
    solution: '#!/bin/bash\nfor i in {1..5}; do\n  echo "Number: $i"\ndone',
    outcome: 'Excellent! Loops save time by repeating tasks. The for loop iterates over each value in the list.'
  },
  {
    id: 'mission_05', title: 'Functions', xpReward: 150,
    initialState: '#!/bin/bash\n# Create a function called "greet" that takes a name parameter\n# Call it with "Bestie" as the argument\n\n',
    rules: ['must_include:greet()', 'must_include:$1'],
    description: 'Organize code into reusable functions that can accept parameters.',
    hints: ['Define functions with name() { ... } syntax', 'Inside a function, $1 is the first argument', 'Call the function by typing its name followed by arguments'],
    solution: '#!/bin/bash\ngreet() {\n  echo "Hello, $1!"\n}\ngreet Bestie',
    outcome: 'Fantastic! Functions make your scripts modular and reusable. They can accept parameters and return values.'
  },
  {
    id: 'mission_06', title: 'Reading Files', xpReward: 150,
    initialState: '#!/bin/bash\n# Read a file line by line and print each line\n# Use "while read line" pattern\n\n',
    rules: ['must_include:while', 'must_include:read', 'must_include:done'],
    description: 'Process files line by line - a common task in automation scripts.',
    hints: ['Pattern: while read line; do ... done < file.txt', '$line contains the current line\'s content', 'The read command reads a line into a variable'],
    solution: '#!/bin/bash\nwhile read line; do\n  echo "Line: $line"\ndone < "input.txt"',
    outcome: 'Awesome! File processing is essential for log analysis, data transformation, and automation tasks.'
  },
  {
    id: 'mission_07', title: 'Exit Codes', xpReward: 150,
    initialState: '#!/bin/bash\n# Run a command and check if it succeeded\n# Use $? to check exit code (0 = success)\n\n',
    rules: ['must_include:$?', 'must_include:if', 'must_include:= 0'],
    description: 'Handle errors gracefully by checking command exit codes.',
    hints: ['$? holds the exit code of the last command', 'Exit code 0 means success, anything else means failure', 'Use: if [ $? -eq 0 ]; then ... fi'],
    solution: '#!/bin/bash\nls "/some/path"\nif [ $? -eq 0 ]; then\n  echo "Success!"\nelse\n  echo "Failed!"\nfi',
    outcome: 'Perfect! Error handling makes scripts robust. Always check exit codes for critical operations.'
  },
  {
    id: 'mission_08', title: 'Cron Basics', xpReward: 200,
    initialState: '#!/bin/bash\n# Create a cron entry that runs backup.sh daily at 2 AM\n# Format: minute hour day month weekday command\n# Just print the cron line (don\'t actually install)\n\n',
    rules: ['must_include:0', 'must_include:2', 'must_include:*', 'must_include:backup'],
    description: 'Schedule recurring tasks using cron - the standard Linux task scheduler.',
    hints: ['Cron format: minute hour day month weekday', 'Asterisk (*) means "any value"', '0 2 * * * means "at 2:00 AM every day"'],
    solution: '#!/bin/bash\necho "0 2 * * * /home/user/backup.sh"\necho "Cron job set!"',
    outcome: 'Great! Cron is powerful for scheduling backups, reports, and maintenance tasks. The five time fields give precise control.'
  },
  {
    id: 'mission_09', title: 'Background Processes', xpReward: 200,
    initialState: '#!/bin/bash\n# Start a long-running command in the background\n# Print its Process ID (PID)\n\n',
    rules: ['must_include:&', 'must_include:$!', 'must_include:echo'],
    description: 'Manage background processes to run tasks without blocking the terminal.',
    hints: ['The & symbol at the end runs a command in the background', '$! gives you the PID of the last background process', 'Use "wait" to wait for background processes to finish'],
    solution: '#!/bin/bash\nsleep 60 &\nPID=$!\necho "Background process started with PID: $PID"',
    outcome: 'Excellent! Background processes let you run multiple tasks concurrently. The $! variable is key for process management.'
  },
  {
    id: 'mission_10', title: 'Automation Capstone', xpReward: 200,
    initialState: '#!/bin/bash\n# Build a backup script that:\n# 1. Takes source directory and destination as arguments\n# 2. Checks if source directory exists (use -d)\n# 3. Creates a timestamped backup folder\n# 4. Uses cp -r to copy the directory\n\n',
    rules: ['must_include:if', 'must_include:-d', 'must_include:date', 'must_include:cp'],
    description: 'Combine all your shell scripting skills into a complete backup automation script.',
    hints: ['Use -d to check if something is a directory', 'date +%Y%m%d_%H%M%S creates a timestamp', 'cp -r copies directories recursively', 'Check $# to ensure correct number of arguments'],
    solution: '#!/bin/bash\nSRC=$1\nDST=$2\nif [ -d "$SRC" ]; then\n  TIMESTAMP=$(date +%Y%m%d_%H%M%S)\n  mkdir -p "$DST/backup_$TIMESTAMP"\n  cp -r "$SRC/"* "$DST/backup_$TIMESTAMP/"\n  echo "Backup completed!"\nelse\n  echo "Source directory not found!"\n  exit 1\nfi',
    outcome: 'Outstanding! You\'ve built a real-world backup script. This capstone shows mastery of variables, conditionals, error handling, and automation!'
  }
];

// ============ CI/CD PIPELINES (Pipeline Builder) ============
const cicdBase = 'F:\\code\\runai\\src\\data\\games\\cicd_pipelines\\cicd_pipelines_chapter';

const cicdMissions = [
  {
    id: 'mission_01', title: 'First Pipeline', xpReward: 100,
    initialState: '["checkout"]',
    rules: ['must_include:checkout', 'must_include:build', 'must_include:test'],
    description: 'Build a simple pipeline with checkout and build steps.',
    hints: ['Start with "checkout" to get your code', 'Add "build" to compile your code', 'Add "test" to verify your code works'],
    solution: '["checkout", "build", "test"]',
    outcome: 'Great! Every CI/CD pipeline starts with checking out code, then building and testing it.'
  },
  {
    id: 'mission_02', title: 'Add Install Step', xpReward: 100,
    initialState: '["checkout"]',
    rules: ['must_include:install', 'must_include:build'],
    description: 'Add an install step before building to set up dependencies.',
    hints: ['Dependencies must be installed before building', 'Add "install" before "build"', 'Think about what comes first: install or build?'],
    solution: '["checkout", "install", "build", "test"]',
    outcome: 'Perfect! Installing dependencies before building is a fundamental CI/CD practice.'
  },
  {
    id: 'mission_03', title: 'Test Integration', xpReward: 100,
    initialState: '["checkout", "install", "build"]',
    rules: ['must_include:test'],
    description: 'Add automated testing to catch bugs before deployment.',
    hints: ['Tests should run after building', 'Add "test" to the pipeline', 'Testing ensures your code works correctly'],
    solution: '["checkout", "install", "build", "test"]',
    outcome: 'Excellent! Automated tests are your safety net. They catch regressions before code reaches production.'
  },
  {
    id: 'mission_04', title: 'Linting', xpReward: 150,
    initialState: '["checkout", "install", "build", "test"]',
    rules: ['must_include:lint'],
    description: 'Add code quality checks (linting) to enforce coding standards.',
    hints: ['Linting checks code style and common errors', 'Add "lint" before or after tests', 'ESLint is commonly used for JavaScript'],
    solution: '["checkout", "install", "lint", "build", "test"]',
    outcome: 'Fantastic! Linting enforces consistent code style. Fast feedback on style issues saves review time.'
  },
  {
    id: 'mission_05', title: 'Security Scan', xpReward: 150,
    initialState: '["checkout", "install", "build", "test"]',
    rules: ['must_include:scan'],
    description: 'Add vulnerability scanning to check for security issues in dependencies.',
    hints: ['Security scans check for known vulnerabilities', 'Add "scan" after install or build', 'npm audit is one way to scan for security issues'],
    solution: '["checkout", "install", "scan", "build", "test"]',
    outcome: 'Awesome! Security scans protect your app from known vulnerabilities in dependencies.'
  },
  {
    id: 'mission_06', title: 'Deploy Step', xpReward: 150,
    initialState: '["checkout", "install", "build", "test"]',
    rules: ['must_include:deploy'],
    description: 'Add deployment to deliver your code to a live environment.',
    hints: ['Deploy should be the final step after all checks pass', 'Add "deploy" at the end of the pipeline', 'Only deploy when tests pass!'],
    solution: '["checkout", "install", "build", "test", "deploy"]',
    outcome: 'Perfect! Deployment is the final stage that delivers value to users. Only deploy after all checks pass.'
  },
  {
    id: 'mission_07', title: 'Push Artifacts', xpReward: 150,
    initialState: '["checkout", "install", "build", "test"]',
    rules: ['must_include:push'],
    description: 'Add artifact management to preserve build outputs for later use.',
    hints: ['Artifacts are build outputs that persist after pipeline ends', 'Add "push" to store build results', 'Artifacts can be downloaded or used by other jobs'],
    solution: '["checkout", "install", "build", "test", "push"]',
    outcome: 'Great! Artifacts preserve your build outputs. They can be downloaded later or used by other pipeline jobs.'
  },
  {
    id: 'mission_08', title: 'Parallel Stages', xpReward: 200,
    initialState: '{"jobs": {"build": {"steps": []}}}',
    rules: ['must_include:jobs'],
    description: 'Configure parallel execution of jobs to speed up your pipeline.',
    hints: ['Jobs at the same level run in parallel', 'Define separate jobs for unrelated tasks', 'Each job can have its own steps'],
    solution: '{"jobs": {"build": {"steps": ["checkout", "build"]}, "test": {"steps": ["checkout", "test"]}}}',
    outcome: 'Excellent! Parallel jobs drastically reduce pipeline time. Each job runs in its own environment.'
  },
  {
    id: 'mission_09', title: 'Notifications', xpReward: 200,
    initialState: '["checkout", "install", "build", "test", "deploy"]',
    rules: ['must_include:notify'],
    description: 'Add notifications to keep the team informed of pipeline results.',
    hints: ['Notifications can alert on success, failure, or always', 'Add "notify" at the end of the pipeline', 'Teams use Slack, email, or webhooks for notifications'],
    solution: '["checkout", "install", "build", "test", "deploy", "notify"]',
    outcome: 'Perfect! Notifications keep your team in the loop. The "if: always()" ensures notification even if the build fails.'
  },
  {
    id: 'mission_10', title: 'CI/CD Capstone', xpReward: 200,
    initialState: '["checkout"]',
    rules: ['must_include:lint', 'must_include:test', 'must_include:build', 'must_include:deploy'],
    description: 'Build a complete end-to-end CI/CD pipeline with all stages.',
    hints: ['Start with checkout, then install dependencies', 'Add lint, build, test in that order', 'Deploy should be the final step', 'Consider adding notifications too'],
    solution: '["checkout", "install", "lint", "build", "test", "deploy", "notify"]',
    outcome: 'Outstanding! You\'ve built a complete CI/CD pipeline! This capstone demonstrates mastery of modern DevOps practices.'
  }
];

// ============ CLOUD (Terminal) ============
const cloudBase = 'F:\\code\\runai\\src\\data\\games\\cloud\\cloud_chapter';

const cloudMissions = [
  {
    id: 'mission_01', title: 'List Resources', xpReward: 100,
    initialState: '# TODO: List all resource groups in Azure\n# Use: az group list\n# Print the output\n',
    rules: ['must_include:az group list', 'must_include:echo'],
    description: 'Learn to list Azure resources using the Azure CLI (az).',
    hints: ['az group list shows all resource groups', 'Azure CLI commands start with "az"', 'Try: az group list --output table for readable output'],
    solution: 'az group list\necho "Resource groups listed!"',
    outcome: 'Awesome! The Azure CLI lets you manage all Azure resources from the terminal.'
  },
  {
    id: 'mission_02', title: 'Create Resource Group', xpReward: 100,
    initialState: '# TODO: Create a resource group named "runai-rg" in eastus\n# Use: az group create --name NAME --location LOCATION\n',
    rules: ['must_include:az group create', 'must_include:runai-rg', 'must_include:eastus'],
    description: 'Create and manage cloud resource groups to organize related resources.',
    hints: ['Resource groups are containers for Azure resources', 'Syntax: az group create --name NAME --location LOCATION', 'eastus is a common Azure region'],
    solution: 'az group create --name runai-rg --location eastus\necho "Resource group created!"',
    outcome: 'Perfect! Resource groups help you organize and manage related resources together.'
  },
  {
    id: 'mission_03', title: 'Create Storage Account', xpReward: 100,
    initialState: '# TODO: Create a storage account named "runaistorage123"\n# Use: az storage account create\n# Specify --resource-group and --location\n',
    rules: ['must_include:az storage account create', 'must_include:runaistorage123', 'must_include:--resource-group'],
    description: 'Create cloud storage accounts to store blobs, files, and other data.',
    hints: ['Storage account names must be globally unique and lowercase', 'Required: --name, --resource-group, --location', 'Add --sku Standard_LRS for locally redundant storage'],
    solution: 'az storage account create --name runaistorage123 --resource-group runai-rg --location eastus --sku Standard_LRS\necho "Storage account created!"',
    outcome: 'Great! Storage accounts provide scalable cloud storage. They can hold blobs, files, queues, and tables.'
  },
  {
    id: 'mission_04', title: 'Create Virtual Network', xpReward: 150,
    initialState: '# TODO: Create a virtual network named "runai-vnet"\n# Use: az network vnet create\n# Address prefix: 10.0.0.0/16\n',
    rules: ['must_include:az network vnet create', 'must_include:runai-vnet', 'must_include:10.0.0.0/16'],
    description: 'Set up virtual networks to enable secure communication between cloud resources.',
    hints: ['Virtual networks isolate your cloud resources logically', 'Address prefix 10.0.0.0/16 gives you 65534 usable IPs', 'You can also create subnets within the vnet'],
    solution: 'az network vnet create --resource-group runai-rg --name runai-vnet --address-prefix 10.0.0.0/16\necho "Virtual network created!"',
    outcome: 'Excellent! Virtual networks provide isolated network spaces. Resources within the same vnet can communicate securely.'
  },
  {
    id: 'mission_05', title: 'Deploy Virtual Machine', xpReward: 150,
    initialState: '# TODO: Deploy a VM named "runai-vm" with ubuntu2204\n# Use: az vm create\n# Add --admin-username and --generate-ssh-keys\n',
    rules: ['must_include:az vm create', 'must_include:runai-vm', 'must_include:ubuntu2204'],
    description: 'Deploy virtual machines to run workloads in the cloud with full OS control.',
    hints: ['VM creation needs: --resource-group, --name, --image', 'ubuntu2204 is a common Linux image', 'Use --generate-ssh-keys for easy SSH access'],
    solution: 'az vm create --resource-group runai-rg --name runai-vm --image ubuntu2204 --admin-username azureuser --generate-ssh-keys\necho "VM deployed!"',
    outcome: 'Fantastic! Virtual machines give you full control over the computing environment. The CLI makes deployment easy.'
  },
  {
    id: 'mission_06', title: 'Deploy Container Instance', xpReward: 150,
    initialState: '# TODO: Deploy a container named "runai-container" using nginx\n# Use: az container create\n# Expose port 80\n',
    rules: ['must_include:az container create', 'must_include:nginx', 'must_include:--port 80'],
    description: 'Deploy container instances to run containerized applications without managing servers.',
    hints: ['Container instances are serverless containers', 'Use --image to specify the container image', 'nginx is a popular web server image'],
    solution: 'az container create --resource-group runai-rg --name runai-container --image nginx --port 80\necho "Container deployed!"',
    outcome: 'Awesome! Container instances let you run containers without managing underlying infrastructure. Perfect for microservices!'
  },
  {
    id: 'mission_07', title: 'Create App Service', xpReward: 150,
    initialState: '# TODO: Create an App Service Plan and Web App\n# Use: az appservice plan create and az webapp create\n# Runtime: node (for a Node.js app)\n',
    rules: ['must_include:az appservice plan', 'must_include:az webapp create', 'must_include:node'],
    description: 'Deploy web applications using Azure App Service - a platform for hosting web apps.',
    hints: ['App Service Plan defines the pricing tier and features', 'Web Apps run your code without managing servers', 'Specify runtime like node, python, dotnet'],
    solution: 'az appservice plan create --resource-group runai-rg --name runai-plan --sku B1\naz webapp create --resource-group runai-rg --plan runai-plan --name runai-webapp --runtime "node|16-lts"\necho "Web app deployed!"',
    outcome: 'Perfect! App Service is a PaaS offering that handles infrastructure management. Just deploy your code!'
  },
  {
    id: 'mission_08', title: 'Scale Set', xpReward: 200,
    initialState: '# TODO: Create a VM scale set named "runai-ss" with 2 instances\n# Use: az vmss create\n# Use ubuntu2204 and --instance-count 2\n',
    rules: ['must_include:az vmss create', 'must_include:runai-ss', 'must_include:--instance-count 2'],
    description: 'Configure auto-scaling VM scale sets to handle varying workloads automatically.',
    hints: ['VM Scale Sets (VMSS) let you deploy identical VMs that scale together', '--instance-count sets initial size', 'You can configure auto-scale rules based on metrics'],
    solution: 'az vmss create --resource-group runai-rg --name runai-ss --image ubuntu2204 --instance-count 2 --admin-username azureuser --generate-ssh-keys\necho "Scale set created!"',
    outcome: 'Excellent! Auto-scaling ensures your app can handle traffic spikes. VMSS automatically adds/removes instances.'
  },
  {
    id: 'mission_09', title: 'Monitoring Setup', xpReward: 200,
    initialState: '# TODO: Enable monitoring for the VM\n# Use: az monitor diagnostic-settings create\n# Send to a Log Analytics workspace\n',
    rules: ['must_include:az monitor', 'must_include:diagnostic-settings'],
    description: 'Set up logging and monitoring to track performance and troubleshoot issues.',
    hints: ['Azure Monitor collects metrics and logs from resources', 'Diagnostic settings route logs to Log Analytics workspace', 'You can monitor CPU, memory, disk, and network metrics'],
    solution: 'az monitor diagnostic-settings create --resource runai-vm --workspace runai-workspace --name runai-diagnostics\necho "Monitoring enabled!"',
    outcome: 'Great! Monitoring gives you visibility into your cloud resources. Logs and metrics help you troubleshoot and optimize.'
  },
  {
    id: 'mission_10', title: 'Cloud Capstone', xpReward: 200,
    initialState: '# TODO: Deploy a full app stack:\n# 1. Create resource group\n# 2. Create App Service Plan (az appservice plan create)\n# 3. Create Web App (az webapp create)\n# 4. Deploy a simple app\n',
    rules: ['must_include:az group create', 'must_include:az appservice plan', 'must_include:az webapp create'],
    description: 'Deploy a full application stack including resource group, app service, and web app.',
    hints: ['Start with creating the resource group', 'App Service Plan defines the pricing tier', 'Create the web app and link it to the plan', 'Use --runtime to specify your app\'s runtime'],
    solution: 'az group create --name runai-app-rg --location eastus\naz appservice plan create --resource-group runai-app-rg --name runai-plan --sku B1\naz webapp create --resource-group runai-app-rg --plan runai-plan --name runai-webapp --runtime "node|16-lts"\necho "Full app stack deployed to cloud!"',
    outcome: 'Outstanding! You\'ve deployed a complete app stack to the cloud! This demonstrates mastery of Azure resource provisioning.'
  }
];

// ============ COMPUTER VISION (AI Code) ============
const cvBase = 'F:\\code\\runai\\src\\data\\games\\computer_vision\\computer_vision_chapter';

const cvMissions = [
  {
    id: 'mission_01', title: 'Load Image', xpReward: 100,
    initialState: 'import cv2\nimport matplotlib.pyplot as plt\n\n# TODO: Load "image.jpg" using cv2.imread()\n# Display it using plt.imshow()\n',
    rules: ['must_include:cv2.imread', 'must_include:plt.imshow', 'must_include:plt.show'],
    description: 'Load and display images with Python using OpenCV and Matplotlib.',
    hints: ['cv2.imread() loads an image from file', 'OpenCV loads in BGR format by default', 'plt.imshow() displays the image, plt.show() renders it'],
    solution: 'import cv2\nimport matplotlib.pyplot as plt\n\nimg = cv2.imread("image.jpg")\nimg_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)\nplt.imshow(img_rgb)\nplt.show()',
    outcome: 'Great! You loaded and displayed an image. OpenCV (cv2) is the go-to library for computer vision in Python.'
  },
  {
    id: 'mission_02', title: 'Grayscale', xpReward: 100,
    initialState: 'import cv2\nimport matplotlib.pyplot as plt\n\nimg = cv2.imread("image.jpg")\n# TODO: Convert to grayscale using cv2.cvtColor()\n',
    rules: ['must_include:cvtColor', 'must_include:COLOR_BGR2GRAY', 'must_include:imshow'],
    description: 'Convert color images to grayscale to simplify processing and reduce data size.',
    hints: ['cv2.cvtColor(img, cv2.COLOR_BGR2GRAY) converts to grayscale', 'Grayscale images have only one channel (intensity)', 'Use plt.imshow(gray, cmap="gray") to display'],
    solution: 'import cv2\nimport matplotlib.pyplot as plt\n\nimg = cv2.imread("image.jpg")\ngray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)\nplt.imshow(gray, cmap="gray")\nplt.show()',
    outcome: 'Perfect! Grayscale conversion reduces complexity. Many CV algorithms work on intensity values rather than color.'
  },
  {
    id: 'mission_03', title: 'Edge Detection', xpReward: 100,
    initialState: 'import cv2\nimport matplotlib.pyplot as plt\n\nimg = cv2.imread("image.jpg")\ngray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)\n# TODO: Apply Canny edge detection with thresholds 100, 200\n',
    rules: ['must_include:Canny', 'must_include:100', 'must_include:200'],
    description: 'Apply edge detection filters to identify boundaries and structure in images.',
    hints: ['Canny edge detection is a popular algorithm', 'Two thresholds: lower (100) and upper (200)', 'Edges are detected where intensity changes sharply'],
    solution: 'import cv2\nimport matplotlib.pyplot as plt\n\nimg = cv2.imread("image.jpg")\ngray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)\nedges = cv2.Canny(gray, 100, 200)\nplt.imshow(edges, cmap="gray")\nplt.show()',
    outcome: 'Excellent! Edge detection finds boundaries in images. Canny is widely used because it finds strong, thin edges.'
  },
  {
    id: 'mission_04', title: 'Face Detection', xpReward: 150,
    initialState: 'import cv2\n\n# TODO: Use Haar cascade to detect faces\n# Load: cv2.data.haarcascades + "haarcascade_frontalface_default.xml"\n',
    rules: ['must_include:CascadeClassifier', 'must_include:detectMultiScale', 'must_include:face'],
    description: 'Use pre-trained Haar cascade models for face detection in images.',
    hints: ['Haar cascades are fast and work well for face detection', 'Load cascade with cv2.CascadeClassifier()', 'detectMultiScale() returns face coordinates'],
    solution: 'import cv2\n\nface_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")\nimg = cv2.imread("image.jpg")\ngray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)\nfaces = face_cascade.detectMultiScale(gray, 1.3, 5)\nprint(f"Found {len(faces)} face(s)")',
    outcome: 'Awesome! You used a pre-trained model for object detection. Haar cascades are fast and work well for faces.'
  },
  {
    id: 'mission_05', title: 'Image Augmentation', xpReward: 150,
    initialState: 'import cv2\nimport numpy as np\n\nimg = cv2.imread("image.jpg")\n# TODO: Apply horizontal flip and brightness adjustment\n',
    rules: ['must_include:flip', 'must_include:rotate', 'must_include:np.clip'],
    description: 'Apply transformations to training images to increase dataset diversity.',
    hints: ['cv2.flip(img, 1) flips horizontally (0=vertical, -1=both)', 'cv2.rotate() for 90/180/270 degree rotations', 'Brightness: np.clip(img + 30, 0, 255).astype(np.uint8)'],
    solution: 'import cv2\nimport numpy as np\n\nimg = cv2.imread("image.jpg")\nflipped = cv2.flip(img, 1)\nrotated = cv2.rotate(img, cv2.ROTATE_90_CLOCKWISE)\nbright = np.clip(img + 30, 0, 255).astype(np.uint8)\nprint("Augmentation complete!")',
    outcome: 'Fantastic! Image augmentation creates variations of training data. This helps models generalize better.'
  },
  {
    id: 'mission_06', title: 'Load Pre-trained Model', xpReward: 150,
    initialState: 'import tensorflow as tf\n\n# TODO: Load MobileNetV2 pre-trained on ImageNet\n# Print model summary\n',
    rules: ['must_include:tf.keras', 'must_include:MobileNet', 'must_include:summary'],
    description: 'Load pre-trained computer vision models for transfer learning or inference.',
    hints: ['TensorFlow Hub or tf.keras.applications has pre-trained models', 'MobileNetV2 is lightweight and fast', 'model.summary() shows the architecture'],
    solution: 'import tensorflow as tf\n\nmodel = tf.keras.applications.MobileNetV2(weights="imagenet")\nmodel.summary()\nprint("MobileNetV2 loaded!")',
    outcome: 'Perfect! You loaded a pre-trained model. Transfer learning with models like MobileNetV2 is powerful in CV.'
  },
  {
    id: 'mission_07', title: 'Run Inference', xpReward: 150,
    initialState: 'import tensorflow as tf\nimport cv2\n\nmodel = tf.keras.applications.MobileNetV2(weights="imagenet")\nimg = cv2.imread("image.jpg")\n# TODO: Preprocess image and run inference\n',
    rules: ['must_include:preprocess_input', 'must_include:predict', 'must_include:resize'],
    description: 'Run inference on new images using a loaded model to make predictions.',
    hints: ['Images need resizing to model input size (224x224 for MobileNet)', 'preprocess_input() normalizes pixel values', 'model.predict() returns predictions'],
    solution: 'import tensorflow as tf\nimport cv2\n\nmodel = tf.keras.applications.MobileNetV2(weights="imagenet")\nimg = cv2.imread("image.jpg")\nimg = cv2.resize(img, (224, 224))\nimg = tf.keras.applications.mobilenet_v2.preprocess_input(img)\npredictions = model.predict(tf.expand_dims(img, axis=0))\nprint("Inference complete!")',
    outcome: 'Great! You ran inference on a new image. The model processes the image and outputs predictions (class probabilities).'
  },
  {
    id: 'mission_08', title: 'Draw Bounding Boxes', xpReward: 200,
    initialState: 'import cv2\n\nimg = cv2.imread("image.jpg")\n# TODO: Draw a green rectangle (x=100, y=100, w=200, h=150)\n# Use cv2.rectangle() with color (0, 255, 0)\n',
    rules: ['must_include:rectangle', 'must_include:0, 255, 0', 'must_include:2'],
    description: 'Draw detection bounding boxes on images to visualize where objects were detected.',
    hints: ['cv2.rectangle(img, (x,y), (x+w, y+h), color, thickness)', 'Green in BGR is (0, 255, 0)', 'Coordinates: (x,y) is top-left, (x+w,y+h) is bottom-right'],
    solution: 'import cv2\n\nimg = cv2.imread("image.jpg")\nx, y, w, h = 100, 100, 200, 150\ncv2.rectangle(img, (x, y), (x+w, y+h), (0, 255, 0), 2)\ncv2.imwrite("output.jpg", img)\nprint("Bounding box drawn!")',
    outcome: 'Excellent! Bounding boxes visualize detection results. The (x,y,w,h) format is standard for rectangular regions.'
  },
  {
    id: 'mission_09', title: 'Video Processing', xpReward: 200,
    initialState: 'import cv2\n\n# TODO: Open webcam, read frames, convert to grayscale\n# Break loop on "q" key press\n',
    rules: ['must_include:VideoCapture', 'must_include:read', 'must_include:waitKey', 'must_include:break'],
    description: 'Process video frames for computer vision tasks by reading and analyzing frame by frame.',
    hints: ['cv2.VideoCapture(0) opens the webcam', 'cap.read() returns (ret, frame)', 'cv2.waitKey(1) waits 1ms, checks for keypress'],
    solution: 'import cv2\n\ncap = cv2.VideoCapture(0)\nwhile True:\n    ret, frame = cap.read()\n    if not ret:\n        break\n    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)\n    cv2.imshow("Video", gray)\n    if cv2.waitKey(1) & 0xFF == ord("q"):\n        break\ncap.release()\ncv2.destroyAllWindows()\nprint("Video processing complete!")',
    outcome: 'Awesome! Video processing applies CV to every frame. This is the foundation of real-time computer vision apps.'
  },
  {
    id: 'mission_10', title: 'CV Capstone', xpReward: 200,
    initialState: 'import cv2\nimport tensorflow as tf\n\n# TODO: Build an end-to-end image classification pipeline:\n# 1. Load image\n# 2. Preprocess it\n# 3. Load pre-trained model\n# 4. Run inference\n# 5. Decode and print top 3 predictions\n',
    rules: ['must_include:imread', 'must_include:preprocess', 'must_include:predict', 'must_include:decode_predictions'],
    description: 'Build an end-to-end image classification pipeline that loads, processes, and classifies images.',
    hints: ['Start by loading the image with cv2.imread()', 'Resize and preprocess for your model (224x224)', 'Use MobileNetV2 or similar pre-trained model', 'Decode predictions to get human-readable labels'],
    solution: 'import cv2\nimport tensorflow as tf\n\nmodel = tf.keras.applications.MobileNetV2(weights="imagenet")\nimg = cv2.imread("image.jpg")\nimg_resized = cv2.resize(img, (224, 224))\nimg_preprocessed = tf.keras.applications.mobilenet_v2.preprocess_input(img_resized)\npredictions = model.predict(tf.expand_dims(img_preprocessed, axis=0))\ndecoded = tf.keras.applications.mobilenet_v2.decode_predictions(predictions, top=3)[0]\nfor _, label, prob in decoded:\n    print(f"{label}: {prob:.2%}")\nprint("Image classification pipeline complete!")',
    outcome: 'Outstanding! You built a complete CV pipeline! This capstone demonstrates loading, preprocessing, inference, and results display.'
  }
];

// ============ WRITE ALL MISSIONS ============
[automationMissions, cicdMissions, cloudMissions, cvMissions].forEach((missions, idx) => {
  const bases = [automationBase, cicdBase, cloudBase, cvBase];
  const base = bases[idx];
  
  missions.forEach(m => {
    const dir = path.join(base, m.id);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    const type = idx === 1 ? 'pipeline' : (idx === 3 ? 'ai_code' : 'terminal');
    
    fs.writeFileSync(path.join(dir, 'games.json'), JSON.stringify({
      title: m.title,
      initialState: { content: m.initialState },
      validation: { type, rules: m.rules },
      id: m.id,
      type,
      xpReward: m.xpReward
    }, null, 2));
    
    fs.writeFileSync(path.join(dir, 'descriptions.json'), JSON.stringify({ [m.id]: m.description }, null, 2));
    fs.writeFileSync(path.join(dir, 'hints.json'), JSON.stringify({ [m.id]: m.hints }, null, 2));
    fs.writeFileSync(path.join(dir, 'solutions.json'), JSON.stringify({ [m.id]: m.solution }, null, 2));
    fs.writeFileSync(path.join(dir, 'outcomes.json'), JSON.stringify({ [m.id]: m.outcome }, null, 2));
  });
});

console.log('All 40 missions updated with proper difficulty curve!');
