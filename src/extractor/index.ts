import extractDistricts from './districts';
import extractIslands from './islands';
import extractRegencies from './regencies';
import extractVillages from './villages';

export type Data = 'regencies' | 'districts' | 'villages' | 'islands';

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
