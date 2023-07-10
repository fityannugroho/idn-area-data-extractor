import { confirm, input, select } from '@inquirer/prompts';
import fs from 'node:fs';
import ora, { oraPromise } from 'ora';
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
  const filePath = needCrawlPdf ? await input({
    message: 'Path to PDF file:',
    validate: (value) => {
      if (!fs.existsSync(value)) {
        return 'File not found';
      }
      // Ensure the file is PDF
      if (!value.endsWith('.pdf')) {
        return 'File must be PDF';
      }
      return true;
    },
  }) : '';
  const compareData = await confirm({ message: 'Compare for data changes?', default: false });

  // === Start the program execution ===
  const spinner = ora();

  if (filePath) {
    await oraPromise(crawlFromPdf(filePath), {
      text: 'Crawling data from PDF',
      successText: (numOfPages) => `${numOfPages} pages crawled`,
    });
  }

  spinner.start(`Extracting ${dataToFormat} data`);
  extractor(dataToFormat);
  spinner.succeed('Data extracted');

  if (compareData) {
    console.log('\nComparing data...');
    await comparator(dataToFormat);
  }

  console.log('\nDone!');
};

main().catch((err) => {
  console.error(err);
});
