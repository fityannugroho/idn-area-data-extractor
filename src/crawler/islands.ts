import fs from 'fs';
import path from 'path';
import PdfReader from '../utils/pdf-reader';

const crawlIslands = async (filePath: string) => {
  const pdfReader = new PdfReader(filePath);
  await pdfReader.load();

  const numPages = pdfReader.getNumPages();
  const contentOfPagesPromise: Promise<string>[] = [];

  for (let i = 1; i <= numPages; i += 1) {
    contentOfPagesPromise.push(pdfReader.getPageContentString(i));
  }
  const contentOfPages = await Promise.all(contentOfPagesPromise);

  // Write into input/islands.txt
  const islandsFilePath = path.join(__dirname, '../../input/islands.txt');
  fs.writeFileSync(islandsFilePath, contentOfPages.join(''), 'utf-8');

  console.log('Islands data successfully crawled and stored in `input/islands.txt`');
};

export default crawlIslands;
