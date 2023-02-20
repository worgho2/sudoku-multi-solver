import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
    verbose: true,
    displayName: 'sudoku-multi-solver',
    preset: 'ts-jest/presets/default-esm',
    rootDir: '.',
    coverageDirectory: 'coverage',
    coverageReporters: ['html', 'lcov', 'text'],
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
    moduleFileExtensions: ['ts', 'js', 'json'],
    moduleNameMapper: {},
    testMatch: ['<rootDir>/__tests__/**/*test.ts'],
    extensionsToTreatAsEsm: ['.ts'],
    globals: {
        __DEVELOPMENT__: false,
    },
    // transform: {
    //     '^.+\\.tsx?$': [
    //         'ts-jest',
    //         {
    //             useESM: true,
    //         },
    //     ],
    // },
};

export default config;
