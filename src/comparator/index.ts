import { Data } from '../utils/types';
import compareDistricts from './districts';
import compareIslands from './islands';
import compareRegencies from './regencies';
import compareVillages from './villages';

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
