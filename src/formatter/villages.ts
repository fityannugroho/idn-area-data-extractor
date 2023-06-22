import fs from 'fs';
import { inputPath, outputPath } from '../utils/path';

// The regex was tested in https://regex101.com/r/yySCn0
const regex = /^(\d{2}.\d{2}.\d{2}.\d{4})\s*\d*\s*(.+?)\s?(?:(?=perbaikan|pemekaran|qanun|koreksi|menjadi|surat|penghapusan|semula|sebelum|perubahan|perda|peraturan|uu|undang|keputusan|pindah|peningkatan|penggabungan|berdasarkan|bergabung)|$)/i;

const formatVillage = (data: string) => {
  const matchArr = data.match(regex);

  if (!matchArr || !matchArr.length) {
    return '';
  }

  const code = matchArr[1].replace(/\./g, '');
  const districtCode = code.substring(0, 6);
  // The regex was tested in https://regex101.com/r/RX8JCD
  const name = matchArr[2].replace(/(?<!\s|\d)(\d+?)$/, '').toUpperCase();

  return [code, districtCode, name].join(',');
};

const formatVillages = () => {
  console.time('format-village');

  const input = fs.readFileSync(inputPath('villages.txt'), 'utf-8');
  const lines = input.trim().split('\n');
  const res = lines.map((line) => formatVillage(line)).filter((line) => line);
  const header = [
    'code',
    'district_code',
    'name',
  ];

  // Save the result to a file
  fs.writeFileSync(outputPath('villages.csv'), `${header.join(',')}\n${res.join('\n')}`);

  console.info('Villages successfully formatted!');
  console.timeEnd('format-village');
};

export default formatVillages;
