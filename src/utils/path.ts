import { Areas } from 'idn-area-data';
import path from 'path';

/**
 * Get the path of input_file.txt
 */
export const inputPath = path.resolve('dist/input.txt');

/**
 * Get the path of output_file.csv
 */
export const outputPath = path.resolve('dist/output.csv');

/**
 * Get the path to latest data of idn-area-data.
 */
export const latestDataPath = (area: Areas) => path.resolve('node_modules/idn-area-data/data', `${area}.csv`);
