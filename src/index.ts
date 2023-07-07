import { confirm, input, select } from '@inquirer/prompts';
import cliProgress from 'cli-progress';
import ora from 'ora';
import comparator from './comparator/index.js';
import { crawlFromPdf } from './crawler/index.js';
import extractor from './extractor/index.js';
import { Data } from './utils/types.js';

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
  const compareData = await confirm({ message: 'Compare for data changes?', default: false });

  // === Start the program execution ===
  const bar = new cliProgress.SingleBar({
    format: 'Crawling data [{bar}] {percentage}% ({value}/{total} pages) in {duration_formatted}',
    barsize: 24,
  });

  if (filePath) {
    await crawlFromPdf(filePath, {
      onStart: (totalPages) => bar.start(totalPages, 0),
      onPageCrawled: (pagesCrawled) => bar.update(pagesCrawled),
    });

    bar.stop();
  }

  const spinner = ora().start('Extracting data');
  extractor(dataToFormat);
  spinner.succeed(`${dataToFormat} data extracted`);

  if (compareData) {
    console.log('Comparing data...');
    await comparator(dataToFormat);
  }

  console.log('\nDone!');
};

main().catch((err) => {
  console.error(err);
});
