import fs from 'fs';
import PdfReader from '../utils/pdf-reader';

export const crawlFromPdf = async (filePath: string, outputPath: string) => {
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
  fs.writeFileSync(outputPath, contentOfPages.join('\n'), 'utf-8');
};
