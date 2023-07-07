import { diff } from 'jest-diff';
import diffConfig from '../config/diff.js';
import { csvSplitter } from '../utils/csv-parser.js';
import { latestDataPath, outputPath } from '../utils/path.js';

const compareDistricts = async () => {
  const { rows: oldDistrictLines } = await csvSplitter(latestDataPath('districts'));
  const { rows: newDistrictLines } = await csvSplitter(outputPath);

  const diffDistricts = diff(oldDistrictLines, newDistrictLines, diffConfig);
  console.log(diffDistricts);
};

export default compareDistricts;
