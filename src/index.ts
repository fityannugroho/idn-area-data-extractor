import { crawlFromPdf } from './crawler';
import formatDistricts from './formatter/districts';
import formatIslands from './formatter/islands';
import formatRegencies from './formatter/regencies';
import formatVillages from './formatter/villages';
import { input, isYes } from './utils/cli';
import { inputPath } from './utils/path';

const main = async () => {
  // === Asking options ===

  console.log('[1] provinces\n[2] regencies\n[3] districts\n[4] villages\n[5] islands');

  const dataToFormat = (await input('Select data to format: (1,2,3,4,5) ', '1,2,3,4,5'));
  const needCrawlPdf = await input('Do you want to crawl the data from PDF? (y/N) ');
  const filePath = isYes(needCrawlPdf) ? await input('Path to PDF file: ') : '';

  // === Start the program execution ===
  console.log('\nRunning the task...');

  if (dataToFormat.includes('2')) {
    if (filePath) {
      await crawlFromPdf(filePath, inputPath('regencies.txt'));
    }
    formatRegencies();
  }

  if (dataToFormat.includes('3')) {
    if (filePath) {
      await crawlFromPdf(filePath, inputPath('districts.txt'));
    }
    formatDistricts();
  }

  if (dataToFormat.includes('4')) {
    if (filePath) {
      await crawlFromPdf(filePath, inputPath('villages.txt'));
    }
    formatVillages();
  }

  if (dataToFormat.includes('5')) {
    if (filePath) {
      await crawlFromPdf(filePath, inputPath('islands.txt'));
    }
    formatIslands();
  }

  console.log('\nDone!');
};

main().catch((err) => {
  console.error(err);
});
