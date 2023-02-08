export default class SudokuSolverError extends Error {
    constructor(category: keyof typeof SudokuErrorCategory) {
        super(SudokuErrorCategory[category]);
    }
}

enum SudokuErrorCategory {
    InvalidEmptyIdentifier = 'InvalidEmptyIdentifier',
}
