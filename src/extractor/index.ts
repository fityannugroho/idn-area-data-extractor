import { Data } from '../utils/types.js';
import extractDistricts from './districts.js';
import extractIslands from './islands.js';
import extractRegencies from './regencies.js';
import extractVillages from './villages.js';

const extractor = (data: Data) => {
  switch (data) {
    case 'regencies':
      extractRegencies();
      break;
    case 'districts':
      extractDistricts();
      break;
    case 'villages':
      extractVillages();
      break;
    case 'islands':
      extractIslands();
      break;
    default:
      break;
  }
};

export default extractor;
