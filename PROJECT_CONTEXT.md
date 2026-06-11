# Project: CodeRIO 2.0 — Session Log

## 2026-06-12

### Done
- Installed `firebase-tools` globally
- Initialized git repo, committed all 195 files
- Pushed to `ratherryan0109/CodeRIO.github.io` (main branch)
- Created `tools/auto-push.js` — file watcher with 30s debounce auto-commit + push
- Added `"watch"` script to `package.json` (`npm run watch`)
- Created `opencode.json` with `instructions` pointing to this file
- Firebase config received but not yet applied (migration from Supabase pending)

### Decisions
- Auto-push: Option C (file watcher, 30s debounce) — run via `npm run watch` in a separate terminal
- Session persistence: this file loaded as opencode instructions
- Auth migration: will use Firebase compat CDN (not modular ESM)

### Next Steps
- Firebase migration: replace Supabase CDN + rewrite auth.js
