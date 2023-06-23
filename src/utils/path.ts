import path from 'path';

/**
 * Get the path of input file in `input` folder.
 * @param fileName The input filename
 */
export const inputPath = (fileName: string) => path.join(__dirname, '../../input', fileName);

/**
 * Get the path of output file in `output` folder.
 * @param fileName The output filename
 */
export const outputPath = (fileName: string) => path.join(__dirname, '../../output', fileName);
