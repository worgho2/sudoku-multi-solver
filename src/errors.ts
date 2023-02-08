export default class SudokuSolverError extends Error {
    constructor(category: keyof typeof SudokuErrorCategory) {
        super(SudokuErrorCategory[category]);
    }
}

enum SudokuErrorCategory {
    InvalidEmptyIdentifier = 'Empty identifier must be lower than 1',
    InvalidBoard = 'Input board is invalid',
    BoardAndPatternMismatch = 'Mismatch between choosen pattern order and board order',
    MissingPatternModelFile = 'Missing model pattern file',
}
