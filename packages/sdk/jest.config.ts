import type { Config } from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
  testTimeout: 60_000,
  verbose: true,
  setupFiles: ['dotenv/config'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};

export default config;
