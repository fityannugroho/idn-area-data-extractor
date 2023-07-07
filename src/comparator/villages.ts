import { diff } from 'jest-diff';
import { csvSplitter } from '../utils/csv-parser.js';
import { latestDataPath, outputPath } from '../utils/path.js';
import diffConfig from '../config/diff.js';

const compareVillages = async () => {
  const { rows: oldVillages } = await csvSplitter(latestDataPath('villages'));
  const { rows: newVillages } = await csvSplitter(outputPath);

  const diffVillages = diff(oldVillages, newVillages, diffConfig);
  console.log(diffVillages);
};

export default compareVillages;
