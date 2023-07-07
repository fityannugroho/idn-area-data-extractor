import { diff } from 'jest-diff';
import { csvSplitter } from '../utils/csv-parser.js';
import { latestDataPath, outputPath } from '../utils/path.js';
import diffConfig from '../config/diff.js';

const compareIslands = async () => {
  const { rows: oldIslands } = await csvSplitter(latestDataPath('islands'));
  const { rows: newIslands } = await csvSplitter(outputPath);

  const diffIslands = diff(oldIslands, newIslands, diffConfig);
  console.log(diffIslands);
};

export default compareIslands;
