import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  roots: ['<rootDir>'],
  moduleDirectories: ['node_modules'],
  verbose: true,
  preset: 'jest-preset-angular',
  collectCoverage: true,
  coverageDirectory: './coverage',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  coveragePathIgnorePatterns: [
    'node_modules',
    'test-config',
    'interfaces',
    '.module.ts',
    '.router.ts',
    '.html',
    'enum',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/dist/',
    '<rootDir>/src/test.ts',
    '<rootDir>/setup-jest.ts',
  ],
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
    './**/*.ts': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
export default config;
