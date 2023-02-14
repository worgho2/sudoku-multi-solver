# rollup-plugin-purgecss

<!-- [![Build Status](https://travis-ci.org/FullHuman/rollup-plugin-purgecss.svg?branch=master)](https://travis-ci.org/FullHuman/rollup-plugin-purgecss) [![CircleCi](https://circleci.com/gh/FullHuman/rollup-plugin-purgecss/tree/master.svg?style=shield)]() [![dependencies Status](https://david-dm.org/fullhuman/rollup-plugin-purgecss/status.svg)](https://david-dm.org/fullhuman/rollup-plugin-purgecss) [![devDependencies Status](https://david-dm.org/fullhuman/rollup-plugin-purgecss/dev-status.svg)](https://david-dm.org/fullhuman/rollup-plugin-purgecss?type=dev)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/8ae0379b223a459ca1b704648e924d55)](https://www.codacy.com/app/FullHuman/rollup-plugin-purgecss?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=FullHuman/rollup-plugin-purgecss&amp;utm_campaign=Badge_Grade)
[![npm](https://img.shields.io/npm/v/rollup-plugin-purgecss.svg)](https://www.npmjs.com/package/rollup-plugin-purgecss)
[![license](https://img.shields.io/github/license/fullhuman/rollup-plugin-purgecss.svg)]() [![Greenkeeper badge](https://badges.greenkeeper.io/FullHuman/rollup-plugin-purgecss.svg)](https://greenkeeper.io/) -->

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
solver.solve();

// OR

SudokuSolver.from({ board }).setEmptyIdentifier(-1).setPattern('5_cross').solve();
```

## Contributing

Please read [CONTRIBUTING.md](./.github/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to the project.

## Versioning

[SemVer](http://semver.org/) is used for versioning.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
