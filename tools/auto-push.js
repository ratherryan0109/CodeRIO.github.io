import { watch } from 'fs';
import { execSync } from 'child_process';
import { resolve } from 'path';

const ROOT = resolve(import.meta.dirname, '..');
const IGNORE = /node_modules|\.git[\\/]|\.env/;
const DEBOUNCE_MS = 30000;
const COMMIT_MSG = 'auto-sync';

let timer = null;
let pending = false;

function debouncedPush(filePath) {
  if (IGNORE.test(filePath)) return;
  clearTimeout(timer);
  pending = true;
  const relative = filePath.replace(ROOT + '\\', '');
  console.log(`[auto-push] \u23F1 Change detected, waiting ${DEBOUNCE_MS / 1000}s... (${relative})`);
  timer = setTimeout(doPush, DEBOUNCE_MS);
}

function doPush() {
  if (!pending) return;
  pending = false;
  try {
    execSync('git add .', { cwd: ROOT, stdio: 'pipe' });
    execSync(`git commit -m "${COMMIT_MSG}"`, { cwd: ROOT, stdio: 'pipe' });
    execSync('git push', { cwd: ROOT, stdio: 'pipe' });
    console.log(`[auto-push] \u2705 Auto-committed & pushed successfully at ${new Date().toLocaleTimeString()}`);
  } catch (err) {
    const msg = err.stderr?.toString()?.trim() || err.message;
    if (msg.includes('nothing to commit') || msg.includes('up to date')) {
      return;
    }
    console.log(`[auto-push] \u274C Push failed: ${msg.split('\n')[0]}`);
  }
}

console.log('[auto-push] \u{1F440} Watching for file changes...');
watch(ROOT, { recursive: true }).on('change', debouncedPush);
