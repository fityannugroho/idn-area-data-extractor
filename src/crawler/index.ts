import fs from 'node:fs';
import PdfReader from '../utils/pdf-reader.js';
import { inputPath } from '../utils/path.js';

type Options = {
  onStart: (totalPages: number) => void;
  onPageCrawled?: (totalPagesCrawled: number) => void;
};

/**
 * Crawl text from PDF and store it to `dist/input.txt`
 */
export const crawlFromPdf = async (filePath: string, options?: Options) => {
  const pdfReader = new PdfReader(filePath);
  await pdfReader.load();

  const numPages = pdfReader.getNumPages();

  // Clear input file.
  fs.writeFileSync(inputPath, '', 'utf-8');
  options?.onStart?.(numPages);

  for (let i = 1; i <= numPages; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const pageContent = await pdfReader.getPageContentString(i);

    fs.appendFileSync(inputPath, `${pageContent}\n`, 'utf-8');
    options?.onPageCrawled?.(i);
  }
};
