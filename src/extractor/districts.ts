import fs from 'fs';
import { inputPath, outputPath } from '../utils/path';
import { nameDescDividerWords } from '../config/regex';

// The regex was tested in https://regex101.com/r/QDaT7Z
const strRegex = `^(\\d{2}.\\d{2}.\\d{2})\\s(.+?)\\s\\d*\\s?(?:\\d|\\.)*\\s?(?:\\s(?=${nameDescDividerWords.join('|')})|$)`;
const regex = new RegExp(strRegex, 'i');

const extractDistrict = (data: string) => {
  const matchArr = data.match(regex);

  if (!matchArr || !matchArr.length) {
    return '';
  }

  const code = matchArr[1].replace(/\./g, '');
  const regencyCode = code.substring(0, 4);
  const name = matchArr[2].toUpperCase();

  return [code, regencyCode, name].join(',');
};

const extractDistricts = () => {
  const input = fs.readFileSync(inputPath, 'utf-8');
  const lines = input.trim().split('\n');
  const res = lines.map((line) => extractDistrict(line)).filter((line) => line);
  const header = [
    'code',
    'regency_code',
    'name',
  ];

  // Save the result to a file
  fs.writeFileSync(outputPath, `${header.join(',')}\n${res.join('\n')}`);
};

export default extractDistricts;
