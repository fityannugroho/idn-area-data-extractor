import { crawlFromPdf } from './crawler';
import formatDistricts from './formatter/districts';
import formatIslands from './formatter/islands';
import formatVillages from './formatter/villages';
import { input, isYes } from './utils/cli';
import { inputPath } from './utils/path';

const main = async () => {
  // === Asking options ===

  const needCrawlIslands = await input('Do you want to crawl the islands data from PDF? (y/N) ');
  const islandsfilePath = isYes(needCrawlIslands) ? await input('Path to PDF file: ') : '';
  const needCrawlDistricts = await input('Do you want to crawl the districts data from PDF? (y/N) ');
  const districtsfilePath = isYes(needCrawlDistricts) ? await input('Path to PDF file: ') : '';
  const needCrawlVillages = await input('Do you want to crawl the villages data from PDF? (y/N) ');
  const villagesFilePath = isYes(needCrawlVillages) ? await input('Path to PDF file: ') : '';

  // === Start the program execution ===
  console.log('\nRunning the task...');

  if (islandsfilePath) {
    await crawlFromPdf(islandsfilePath, inputPath('islands.txt'));
  }

  if (districtsfilePath) {
    await crawlFromPdf(districtsfilePath, inputPath('districts.txt'));
  }

  if (villagesFilePath) {
    await crawlFromPdf(villagesFilePath, inputPath('villages.txt'));
  }

  formatIslands();
  formatVillages();
  formatDistricts();
};

main().catch((err) => {
  console.error(err);
});
