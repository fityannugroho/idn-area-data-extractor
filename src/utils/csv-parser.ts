import { createReadStream } from 'fs';

/**
 * Parse CSV file to JS object.
 * @param path Path to CSV file.
 */
const csvParser = <T = Record<string, string>>(
  path: string,
) => new Promise<T[]>((resolve, reject) => {
    const data: T[] = [];

    /**
     * Parse data from string to object, then push it into the data array.
     *
     * @param strData The data in string.
     */
    const parseAndPush = (strData: string) => {
      const rows = strData.trim().split('\n');
      const headers = rows[0].split(',');

      for (let i = 1; i < rows.length; i += 1) {
        const row = rows[i].split(',');
        let dataRow = {} as T;

        for (let j = 0; j < headers.length; j += 1) {
          const header = headers[j];
          const value = row[j];

          dataRow = {
            ...dataRow,
            [header]: value,
          } as T;
        }

        data.push(dataRow);
      }
    };

    createReadStream(path, 'utf8')
      .on('error', reject)
      .on('data', (chunk) => {
        if (typeof chunk === 'string') {
          parseAndPush(chunk);
        } else {
          parseAndPush(chunk.toString('utf8'));
        }

        resolve(data);
      });
  });
export default csvParser;
