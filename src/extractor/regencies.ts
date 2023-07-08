import fs from 'node:fs';
import { inputPath, outputPath } from '../utils/path.js';

const extractRegency = (data: string) => {
  // The regex was tested in https://regex101.com/r/J63CVl
  const regencyRegex = /^((?:KAB\.?|KOTA)\s[A-Z\\. ]+)\s.+(\d{2}\.\d{2})\s.+$/i;

  const match = data.match(regencyRegex);

  if (!match || !match.length) {
    return '';
  }

  const name = match[1].replace(/KAB(?:\.?)\s/, 'KABUPATEN ');
  const code = match[2].replace(/\./g, '');
  const provinceCode = code.substring(0, 2);

  return [code, provinceCode, name].join(',');
};

const extractRegencies = () => {
  const input = fs.readFileSync(inputPath, 'utf-8');
  const rows = input.trim().split('\n');
  const mergedRows: string[] = [];

  // Combine data spread across multiple rows.
  for (let i = 0; i < rows.length; i += 1) {
    const row = rows[i];
    // The regex was tested in https://regex101.com/r/l1PJvE
    const regencyCodeRegex = /^((?:KAB\.?|KOTA)\s[A-Z. ]+)\s/i;

    if (row.match(regencyCodeRegex)) {
      mergedRows.push(row);
    } else {
      const lastRow = mergedRows.pop();

      if (lastRow) {
        mergedRows.push(`${lastRow} ${row}`);
      }
    }
  }

  const res = mergedRows.map((row) => extractRegency(row));
  const header = ['code', 'province_code', 'name'];

  // Save the result to a file
  fs.writeFileSync(outputPath, `${header.join(',')}\n${res.join('\n')}`);
};

export default extractRegencies;
