import { Data } from '../utils/types';
import compareRegencies from './regencies';

const comparator = async (data: Data) => {
  switch (data) {
    case 'regencies':
      await compareRegencies();
      break;
    default:
      break;
  }
};

export default comparator;
