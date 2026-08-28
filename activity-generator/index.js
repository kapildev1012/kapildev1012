import jsonfile from 'jsonfile';
import moment from 'moment';
import simpleGit from 'simple-git';
import random from 'random';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FILE_PATH = path.join(__dirname, 'data.json');

const git = simpleGit(__dirname);

/**
 * Make a single backdated commit on a randomized date in the past year.
 * @param {number} n Total number of commits left to generate
 * @param {boolean} shouldPush Whether to push to remote upon completion
 */
const makeCommit = (n, shouldPush = false) => {
  if (n === 0) {
    console.log('🎉 Finished generating all requested commits!');
    if (shouldPush) {
      console.log('🚀 Pushing commits to remote repository in batch...');
      return git.push(['-u', 'origin', 'main'], () => {
        console.log('✅ All commits pushed to GitHub successfully!');
      });
    }
    return;
  }

  // Generate random coordinates:
  // x: weeks in a year (0 to 54)
  // y: days in a week (0 to 6)
  const x = random.int(0, 54);
  const y = random.int(0, 6);

  const DATE = moment()
    .subtract(1, 'y')
    .add(1, 'd')
    .add(x, 'w')
    .add(y, 'd')
    .format();

  const data = {
    timestamp: DATE,
    commit_index: n,
    generated_at: new Date().toISOString()
  };

  console.log(`[#${n}] Generating commit on date: ${DATE}`);

  jsonfile.writeFile(FILE_PATH, data, () => {
    git.add(FILE_PATH).commit(
      `chore(activity): update log entry #${n}`,
      { '--date': DATE },
      () => makeCommit(n - 1, shouldPush)
    );
  });
};

// Example usage: Generate 100 random commits across the past year
const TOTAL_COMMITS = parseInt(process.env.COMMITS || '50', 10);
const AUTO_PUSH = process.argv.includes('--push');

console.log(`🚀 Starting GitHub Activity Generator: ${TOTAL_COMMITS} commits (Auto-push: ${AUTO_PUSH})...`);
makeCommit(TOTAL_COMMITS, AUTO_PUSH);
