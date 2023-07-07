import { DiffOptions } from 'jest-diff';

const diffConfig: DiffOptions = {
  contextLines: 2,
  expand: false,
  includeChangeCounts: true,
};

export default diffConfig;
