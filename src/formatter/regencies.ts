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
  const input = fs.readFileSync(inputPath, 'utf-8');
  const lines = input.trim().split('\n');
  const res = lines.map((line) => formatRegency(line)).filter((line) => line);
  const header = [
    'name',
  ];

  // Save the result to a file
  fs.writeFileSync(outputPath, `${header.join(',')}\n${res.join('\n')}`);
};

export default formatRegencies;
