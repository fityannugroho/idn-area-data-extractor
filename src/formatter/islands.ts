import fs from 'fs';
import path from 'path';

// The regex was tested in https://regex101.com/r/wehfVt/1
const codeRegex = /(\d{2}.\d{2}.4\d{4})\s/;
const nameRegex = /(\D+)\s/;
const coordinateMinRegex = /(?:[0-5][0-9]|60)'/;
const coordinateSecRegex = /(?:[0-5][0-9].[0-9]{2}|60.00)"/;
const coordinateRegex = new RegExp(
  `(${/(?:[0-8][0-9]|90)°/.source
  }${coordinateMinRegex.source
  }${coordinateSecRegex.source
  }${/\s[U|S]\s/.source
  }${/(?:0\d{2}|1(?:[0-7][0-9]|80))°/.source
  }${coordinateMinRegex.source
  }${coordinateSecRegex.source
  }${/\s[B|T]/.source
  })`,
);
const otherInfoRegex = /\s*(\D*)/;
const lineRegex = new RegExp(
  codeRegex.source
  + nameRegex.source
  + coordinateRegex.source
  + otherInfoRegex.source,
);

const formatIsland = (data: string) => {
  const matchArr = data.match(lineRegex);

  if (!matchArr || !matchArr.length) {
    return '';
  }

  const code = matchArr[1].replace(/\./g, '');
  const regencyCode = code.substring(2, 4) === '00' ? '' : code.substring(0, 4);
  const name = matchArr[2];
  const coordinate = matchArr[3].replace('U', 'N').replace('T', 'E').replace('B', 'W');
  const isPopulated = matchArr[4].search(/^BP$/) !== -1 ? 1 : 0;
  const isOutermostSmall = matchArr[4].includes('PPKT') ? 1 : 0;

  return [code, regencyCode, coordinate, isPopulated, isOutermostSmall, name].join(',');
};

const formatIslands = () => {
  const input = fs.readFileSync(path.join(__dirname, '../../input/islands.txt'), 'utf-8');
  const lines = input.trim().split('\n');
  const res = lines.map((line) => formatIsland(line)).filter((line) => line);
  const header = [
    'code',
    'regency_code',
    'coordinate',
    'is_populated',
    'is_outermost_small',
    'name',
  ];

  // Save the result to a file
  fs.writeFileSync(
    path.join(__dirname, '../../output/islands.csv'),
    `${header.join(',')}\n${res.join('\n')}`,
  );

  console.info('Islands successfully formatted!');
};

export default formatIslands;
