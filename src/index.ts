import { compareRegenciesOutput } from './comparator/regencies';
import { crawlFromPdf } from './crawler';
import formatDistricts from './formatter/districts';
import formatIslands from './formatter/islands';
import formatRegencies from './formatter/regencies';
import formatVillages from './formatter/villages';
import { ProgressBar, input, isYes } from './utils/cli';

const main = async () => {
  // === Asking options ===
  console.log('[1] regencies\n[2] districts\n[3] villages\n[4] islands');

  const dataToFormat = parseInt(await input('Select data to format: '), 10);

  if (Number.isNaN(dataToFormat) || dataToFormat < 1 || dataToFormat > 4) {
    console.error('Invalid input!');
    process.exit(1);
  }

  const needCrawlPdf = await input('Crawl the data from PDF? (y/N) ');
  const filePath = isYes(needCrawlPdf) ? await input('Path to PDF file: ') : '';

  // === Start the program execution ===
  const bar = ProgressBar();

  if (filePath) {
    await crawlFromPdf(filePath, {
      onStart: (totalPages) => bar.start(totalPages, 0, { label: 'Crawling data' }),
      onPageCrawled: (pagesCrawled) => bar.update(pagesCrawled),
    });

    bar.stop();
  }

  bar.start(1, 0, { label: 'Formatting data' });

  switch (dataToFormat) {
    case 1:
      formatRegencies();
      compareRegenciesOutput();
      break;
    case 2:
      formatDistricts();
      break;
    case 3:
      formatVillages();
      break;
    case 4:
      formatIslands();
      break;
    default:
      break;
  }

  bar.update(1);
  bar.stop();
  console.log('\nDone!');
};

main().catch((err) => {
  console.error(err);
});
