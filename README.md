# sudoku-solver
Sudoku solver applying backtrack DSATUR algorithm [Korman 1979]. Supports 19 game patterns from 4x4 to 16x16

## How to use
The `SudokuSolver` class accepts three arguments:
1. **board**: A number matrix representing your board.
2. **emptyIdentifier**: A number less than or equal to 0, that the algorithm uses to identify empty positions in the board matrix.
3. **pattern**: Enum item representing the game pattern. All available patterns are listed [here](./docs/supported-patterns.md).
```typescript
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
    pattern: '5_cross'
});
console.log(solver.solve());

/**
 * Using factory method
 */
console.log(
    SudokuSolver
        .from({ board })
        .setEmptyIdentifier(-1)
        .setPattern('5_cross')
        .solve()
)
```

## Docs
- [Supported Patterns](./docs/supported-patterns.md)
