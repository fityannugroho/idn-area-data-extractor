import { diff } from 'jest-diff';
import diffConfig from '../config/diff.js';
import { csvSplitter } from '../utils/csv-parser.js';
import { latestDataPath, outputPath } from '../utils/path.js';

const compareRegencies = async () => {
  const { rows: oldRegencies } = await csvSplitter(latestDataPath('regencies'));
  const { rows: newRegencies } = await csvSplitter(outputPath);

  const diffRegencyNames = diff(oldRegencies, newRegencies, diffConfig);

  console.log(diffRegencyNames);
};

export default compareRegencies;
