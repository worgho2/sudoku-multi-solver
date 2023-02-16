import SudokuSolverError from './errors';
import { sudokuPatternDataMap } from './pattern-data';
import { SudokuPatternModel } from './pattern-model';
import { SudokuPatterns } from './patterns';
import SudokuNode from './node';
import fs from 'fs/promises';
import msgpack5 from 'msgpack5';

export default class SudokuGraph {
    nodes: SudokuNode[];
    private board: number[][];
    private emptyIdentifier: number;
    private pattern: keyof typeof SudokuPatterns;

    constructor(data: { board: number[][]; emptyIdentifier: number; pattern: keyof typeof SudokuPatterns }) {
        this.nodes = [];
        this.board = data.board;
        this.emptyIdentifier = data.emptyIdentifier;
        this.pattern = data.pattern;
    }

    async initialize(): Promise<void> {
        const patternData = sudokuPatternDataMap[this.pattern];
        const data = await fs.readFile(patternData.filePath, 'binary');
        const patternModel = msgpack5().decode(Buffer.from(data, 'binary')) as SudokuPatternModel;

        if (this.board.length !== patternData.order) {
            throw new SudokuSolverError('BoardAndPatternMismatch');
        }

        const nodeMatrix: SudokuNode[][] = Array.from({ length: patternData.order }, (_, i) =>
            Array.from(
                { length: patternData.order },
                (_, j) => new SudokuNode({ i, j, order: patternData.order, boardReference: this.board })
            )
        );

        for (let i = 0; i < patternData.order; i++) {
            for (let j = 0; j < patternData.order; j++) {
                for (const neighbor of patternModel[i][j]) {
                    nodeMatrix[i][j].addNeighbor(nodeMatrix[neighbor[0]][neighbor[1]]);
                }

                nodeMatrix[i][j].setColor(this.board[i][j] === this.emptyIdentifier ? -1 : this.board[i][j]);
            }
        }

        this.nodes = nodeMatrix.flatMap((n) => n);
    }
}
