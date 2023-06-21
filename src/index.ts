import { crawlFromPdf } from './crawler';
import formatIslands from './formatter/islands';
import { input, isYes } from './utils/cli';
import { inputPath } from './utils/path';

const main = async () => {
  // === Asking options ===

  const needCrawlIslands = await input('Do you want to crawl the islands data from PDF? (y/N) ');
  const filePath = isYes(needCrawlIslands) ? await input('Path to PDF file: ') : '';

  // === Start the program execution ===
  console.log('\nRunning the task...');

  if (filePath) {
    await crawlFromPdf(filePath, inputPath('islands.txt'));
  }

  formatIslands();
};

main().catch((err) => {
  console.error(err);
});
