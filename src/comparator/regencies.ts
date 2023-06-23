import fs from 'fs';

export const compareRegenciesOutput = () => {
  const expected = fs.readFileSync('expected/regencies.csv', 'utf-8');
  const output = fs.readFileSync('output/regencies.csv', 'utf-8');

  const expectedLines = expected.trim().split('\n');
  const outputLines = output.trim().split('\n');

  // Remove the header
  expectedLines.shift();
  outputLines.shift();

  // Compare the name only
  const expectedNames = expectedLines.map((line) => line.split(',')[2]);
  const outputNames = outputLines.map((line) => line.split(',')[0]);

  // Find the regencies that not exists in expected (new)
  const newRegencies = outputNames.filter((name) => !expectedNames.includes(name));
  // Find the regencies that not exists in output (old)
  const oldRegencies = expectedNames.filter((name) => !outputNames.includes(name));

  console.log('New regencies:', newRegencies);
  console.log('Old regencies:', oldRegencies);
};
