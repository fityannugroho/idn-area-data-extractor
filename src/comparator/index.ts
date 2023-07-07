import { Data } from '../utils/types.js';
import compareDistricts from './districts.js';
import compareIslands from './islands.js';
import compareRegencies from './regencies.js';
import compareVillages from './villages.js';

const comparator = async (data: Data) => {
  switch (data) {
    case 'regencies':
      await compareRegencies();
      break;
    case 'districts':
      await compareDistricts();
      break;
    case 'villages':
      await compareVillages();
      break;
    case 'islands':
      await compareIslands();
      break;
    default:
      break;
  }
};

export default comparator;
