import { readFile } from 'node:fs';

export type SplitterOptions = {
  /**
   * @default true
   */
  hasHeader?: boolean
};

type SplitterResult = {
  rows: string[]
  headers?: string[]
};

/**
 * Get each lines from CSV file.
 * @param path Path to CSV file.
 */
export const csvSplitter = (
  path: string,
  options?: SplitterOptions,
) => new Promise<SplitterResult>((resolve, reject) => {
  const { hasHeader = true } = options || {};

  readFile(path, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      reject(err);
    }

    const rows = data.trim().split('\n');
    const headers = hasHeader ? rows.shift()?.split(',') : undefined;

    resolve({ headers, rows });
  });
});

/**
 * Parse data from string to object.
 * @param rows The data in string.
 */
const parseData = <T = Record<string, string>>(rows: string[], headers: string[]) => {
  const data: T[] = [];

  for (let i = 1; i < rows.length; i += 1) {
    const row = rows[i].split(',');
    let newData = {} as T;

    for (let j = 0; j < headers.length; j += 1) {
      const field = headers[j];
      const value = row[j];

      newData = {
        ...newData,
        [field]: value,
      } as T;
    }

    data.push(newData);
  }

  return data;
};

export type ParserOptions = SplitterOptions;

/**
 * Parse CSV file to JS object.
 * @param path Path to CSV file.
 */
const csvParser = async <T = Record<string, string>>(
  path: string,
  options?: ParserOptions,
) => {
  const { headers, rows } = await csvSplitter(path, options);

  if (!headers) {
    throw new Error('CSV file must have headers');
  }

  return parseData<T>(rows, headers);
};

export default csvParser;
