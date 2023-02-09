import SudokuSolver from './solver';

/**
 * 5x5 sudoku with cross pattern
 */
const board = [
    [-1, 3, -1, -1, -1],
    [5, -1, -1, -1, -1],
    [-1, 1, -1, -1, -1],
    [-1, -1, 4, -1, -1],
    [-1, -1, -1, 5, -1],
];

/**
 * Using class constructor
 */
const solver = new SudokuSolver({
    board,
    emptyIdentifier: -1,
    pattern: '5_cross',
});
console.log(solver.solve());

/**
 * Using factory method
 */
console.log(SudokuSolver.from({ board }).setEmptyIdentifier(-1).setPattern('5_cross').solve());
