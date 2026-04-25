# Add New Chapters TODO

## Task

Add chapter entries to `src/data/chapters.json` for:

- Automation
- CI/CD Pipelines
- Cloud
- Computer Vision

## Steps

- [x] Understand existing SQL chapter structure
- [x] Read current chapters.json
- [x] Append four new chapter entries with empty missions arrays
- [x] Create actual filesystem folder structures under each `*_chapter/` directory
- [x] Generate mission subfolders (mission_01 through mission_04) with required JSON files
- [x] Verify all four chapters have proper structure

## Completed

All four chapter folders now have proper mission structures:

- `src/data/games/automation/automation_chapter/mission_01-04/`
- `src/data/games/cicd_pipelines/cicd_pipelines_chapter/mission_01-04/`
- `src/data/games/cloud/cloud_chapter/mission_01-04/`
- `src/data/games/computer_vision/computer_vision_chapter/mission_01-04/`

Each mission contains: games.json, descriptions.json, hints.json, outcomes.json, solutions.json
