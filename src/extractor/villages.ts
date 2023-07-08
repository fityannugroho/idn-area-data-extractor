import fs from 'node:fs';
import { forceDividerWords, dividerWords } from '../config/regex.js';
import { inputPath, outputPath } from '../utils/path.js';

const fdws = forceDividerWords.join('|');
const dws = dividerWords.join('|');

// The regex was tested in https://regex101.com/r/yySCn0
const strRegex = `^(\\d{2}\\.\\d{2}\\.\\d{2}\\.\\d{4})\\s*\\d*\\s*(.+?)(?=\\s(?:${fdws})\\b$|$|\\s(?:${dws})\\b.+$)`;
const regex = new RegExp(strRegex, 'i');

const extractVillageData = (data: string) => {
  const matchArr = data.match(regex);

  if (!matchArr || !matchArr.length) {
    return undefined;
  }

  const code = matchArr[1].replace(/\./g, '');
  const districtCode = code.substring(0, 6);
  // The regex was tested in https://regex101.com/r/RX8JCD
  const name = matchArr[2].replace(/(?<!\s|\d)(\d+?)$/, '').toUpperCase();

  return { code, districtCode, name };
};

const extractVillages = () => {
  const input = fs.readFileSync(inputPath, 'utf-8');
  const lines = input.trim().split('\n');
  const res: string[] = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const formatted = extractVillageData(line);

    if (formatted) {
      // Check the next line if not the last line,
      // may it the rest of the village name.
      if (i < lines.length - 1) {
        const nextLine = lines[i + 1];
        const words = nextLine.split(' ');
        // The regex was tested in https://regex101.com/r/FfdNRZ
        const wordStrRegex = `^(?!(?:${dws})\\b)([a-z.'()/\\- ]+?)$`;
        const wordRegex = new RegExp(wordStrRegex, 'i');

        if (words.length <= 4 && words.every((w) => w.match(wordRegex))) {
          formatted.name = `${formatted.name} ${nextLine.trim()}`.toUpperCase();
          i += 1;
        }
      }

      res.push(`${formatted.code},${formatted.districtCode},${formatted.name}`);
    }
  }

  const header = [
    'code',
    'district_code',
    'name',
  ];

  // Save the result to a file
  fs.writeFileSync(outputPath, `${header.join(',')}\n${res.sort().join('\n')}`);
};

export default extractVillages;
