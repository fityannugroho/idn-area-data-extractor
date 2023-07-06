import fs from 'fs';
import PdfReader from '../utils/pdf-reader';
import { inputPath } from '../utils/path';

/**
 * Crawl text from PDF and store it to `dist/input.txt`
 */
export const crawlFromPdf = async (filePath: string) => {
  console.log('Crawling data from PDF...');

  const pdfReader = new PdfReader(filePath);
  await pdfReader.load();

  const numPages = pdfReader.getNumPages();
  const contentOfPagesPromise: Promise<string>[] = [];

  for (let i = 1; i <= numPages; i += 1) {
    contentOfPagesPromise.push(pdfReader.getPageContentString(i));
  }
  const contentOfPages = await Promise.all(contentOfPagesPromise);

  // Write the result to input file.
  fs.writeFileSync(inputPath, contentOfPages.join('\n'), 'utf-8');
};
