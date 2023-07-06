import { confirm, input, select } from '@inquirer/prompts';
import { crawlFromPdf } from './crawler';
import extractor, { Data } from './extractor';
import { ProgressBar } from './utils/cli';

const main = async () => {
  // === Asking options ===
  const dataToFormat = await select<Data>({
    message: 'Select data to extract:',
    choices: [
      { value: 'regencies' },
      { value: 'districts' },
      { value: 'villages' },
      { value: 'islands' },
    ],
  });

  const needCrawlPdf = await confirm({ message: 'Crawl data from PDF?', default: false });
  const filePath = needCrawlPdf ? await input({ message: 'Path to PDF file:' }) : '';

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
  extractor(dataToFormat);

  bar.update(1);
  bar.stop();
  console.log('\nDone!');
};

main().catch((err) => {
  console.error(err);
});
