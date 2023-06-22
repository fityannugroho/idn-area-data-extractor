import fs from 'fs';
import { inputPath, outputPath } from '../utils/path';

// The regex was tested in https://regex101.com/r/J63CVl
const regex = /^((?:KAB\.?|KOTA)\s[A-Z. ]+)\s/;

const formatRegency = (data: string) => {
  const matchArr = data.match(regex);

  if (!matchArr || !matchArr.length) {
    return '';
  }

  // Can not get the regency code
  const name = matchArr[1].replace(/KAB(?:\.?)\s/, 'KABUPATEN ');

  return [name].join(',');
};

const formatRegencies = () => {
  console.time('format-regency');

  const input = fs.readFileSync(inputPath('regencies.txt'), 'utf-8');
  const lines = input.trim().split('\n');
  const res = lines.map((line) => formatRegency(line)).filter((line) => line);
  const header = [
    'name',
  ];

  // Save the result to a file
  fs.writeFileSync(outputPath('regencies.csv'), `${header.join(',')}\n${res.join('\n')}`);

  console.info('Regencies successfully formatted!');
  console.timeEnd('format-regency');
};

export default formatRegencies;
