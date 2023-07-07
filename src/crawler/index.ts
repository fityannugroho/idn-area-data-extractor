import fs from 'node:fs';
import PdfReader from '../utils/pdf-reader.js';
import { inputPath } from '../utils/path.js';

/**
 * Crawl text from PDF and store it to `dist/input.txt`
 */
export const crawlFromPdf = async (filePath: string) => {
  const pdfReader = new PdfReader(filePath);
  await pdfReader.load();

  const numPages = pdfReader.getNumPages();
  const promises: Promise<string>[] = [];

  for (let i = 1; i <= numPages; i += 1) {
    promises.push(pdfReader.getPageContentString(i));
  }

  const pageContents = await Promise.all(promises);
  fs.writeFileSync(inputPath, pageContents.join('\n'), 'utf-8');

  return numPages;
};
