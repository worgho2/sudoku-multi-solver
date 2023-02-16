# sudoku-multi-solver

[![npm](https://img.shields.io/npm/v/sudoku-multi-solver.svg)](https://www.npmjs.com/package/sudoku-multi-solver) ![npm](https://img.shields.io/npm/dm/sudoku-multi-solver) [![license](https://img.shields.io/github/license/worgho2/sudoku-multi-solver.svg)]() ![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/worgho2/sudoku-multi-solver/build-and-test.yml)

A simple and powerful sudoku solver that supports multiple [game patterns](./docs/supported-patterns.md) up to 16x16.

## Install

```sh
npm install sudoku-multi-solver

yarn add sudoku-multi-solver
```

## Usage

```typescript
import SudokuSolver from 'sudoku-multi-solver';

const board = [
    [-1, 3, -1, -1, -1],
    [5, -1, -1, -1, -1],
    [-1, 1, -1, -1, -1],
    [-1, -1, 4, -1, -1],
    [-1, -1, -1, 5, -1],
];

const solver = new SudokuSolver({
    board,
    emptyIdentifier: -1,
    pattern: '5_cross',
});
await solver.solve();

// OR

await SudokuSolver.from({ board }).setEmptyIdentifier(-1).setPattern('5_cross').solve();
```

## Contributing

Please read [CONTRIBUTING.md](./.github/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to the project.

## Versioning

[SemVer](http://semver.org/) is used for versioning.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
