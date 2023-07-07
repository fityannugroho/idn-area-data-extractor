import { Data } from '../utils/types';
import compareDistricts from './districts';
import compareRegencies from './regencies';

const comparator = async (data: Data) => {
  switch (data) {
    case 'regencies':
      await compareRegencies();
      break;
    case 'districts':
      await compareDistricts();
      break;
    default:
      break;
  }
};

export default comparator;
