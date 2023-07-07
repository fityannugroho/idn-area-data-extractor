import { diff } from 'jest-diff';
import { csvSplitter } from '../utils/csv-parser';
import { latestDataPath, outputPath } from '../utils/path';
import diffConfig from '../config/diff';

const compareIslands = async () => {
  const { rows: oldIslands } = await csvSplitter(latestDataPath('islands'));
  const { rows: newIslands } = await csvSplitter(outputPath);

  const diffIslands = diff(oldIslands, newIslands, diffConfig);
  console.log(diffIslands);
};

export default compareIslands;
