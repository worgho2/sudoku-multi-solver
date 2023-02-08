import SudokuSolverError from './errors';
import SudokuNode from './node';
import { SudokuPattern, sudokuPatternData } from './pattern';

export default class SudokuGraph {
    nodes: SudokuNode[];
    #order: number;
    #orderEdges: { i: number; j: number }[][][];

    constructor(data: { board: number[][]; emptyIdentifier: number; pattern: keyof typeof SudokuPattern }) {
        const patternData = sudokuPatternData[data.pattern];

        if (data.board.length !== patternData.order) {
            throw new SudokuSolverError('BoardAndPatternMismatch');
        }

        this.#order = patternData.order;

        try {
            this.#orderEdges = require(patternData.filePath) as { i: number; j: number }[][][];
        } catch (error) {
            throw new SudokuSolverError('MissingPatternModelFile');
        }

        const nodeMatrix: SudokuNode[][] = Array.from({ length: this.#order }, (_, i) =>
            Array.from(
                { length: this.#order },
                (_, j) => new SudokuNode({ i, j, order: this.#order, boardReference: data.board })
            )
        );

        for (let i = 0; i < this.#order; i++) {
            for (let j = 0; j < this.#order; j++) {
                for (const edge of this.#getOrderEdges(i, j)) {
                    nodeMatrix[i][j].addNeighbor(nodeMatrix[edge.i][edge.j]);
                }

                nodeMatrix[i][j].setColor(data.board[i][j] === data.emptyIdentifier ? -1 : data.board[i][j]);
            }
        }

        this.nodes = nodeMatrix.flatMap((n) => n);
    }

    #getOrderEdges(i: number, j: number): { i: number; j: number }[] {
        return this.#orderEdges[i][j];
    }
}
