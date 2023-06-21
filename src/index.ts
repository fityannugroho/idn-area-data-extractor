import crawlIslands from './crawler/islands';
import formatIslands from './formatter/islands';
import { input, isYes } from './utils/cli';

const main = async () => {
  // === Asking options ===

  const needCrawlIslands = await input('Do you want to crawl the islands data from PDF? (y/N) ');
  const filePath = isYes(needCrawlIslands) ? await input('Path to PDF file: ') : '';

  // === Start the program execution ===

  if (filePath) {
    await crawlIslands(filePath);
  }

  formatIslands();
};

main().catch((err) => {
  console.error(err);
});
