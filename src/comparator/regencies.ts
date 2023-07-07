import { Regency, regencies } from 'idn-area-data';
import { diff } from 'jest-diff';
import diffConfig from '../config/diff';
import csvParser from '../utils/csv-parser';
import { outputPath } from '../utils/path';

const compareRegencies = async () => {
  const oldRegencies = await regencies();
  const newRegencies = await csvParser<Regency>(outputPath);

  const oldRegencyNames = oldRegencies.map((regency) => regency.name);
  const newRegencyNames = newRegencies.map((regency) => regency.name);
  const diffRegencyNames = diff(oldRegencyNames, newRegencyNames, diffConfig);

  console.log(diffRegencyNames);
};

export default compareRegencies;
