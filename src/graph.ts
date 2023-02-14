import SudokuSolverError from './errors';
import { sudokuPatternDataMap } from './pattern-data';
import { SudokuPatternModel } from './pattern-model';
import { SudokuPatternModelBlock } from './pattern-model-block';
import { SudokuPatterns } from './patterns';
import SudokuNode from './node';

export default class SudokuGraph {
    nodes: SudokuNode[];
    private patternModel?: SudokuPatternModel;

    constructor(data: { board: number[][]; emptyIdentifier: number; pattern: keyof typeof SudokuPatterns }) {
        const patternData = sudokuPatternDataMap[data.pattern];

        if (data.board.length !== patternData.order) {
            throw new SudokuSolverError('BoardAndPatternMismatch');
        }

        try {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            this.patternModel = require(patternData.filePath) as SudokuPatternModel;
        } catch (error) {
            throw new SudokuSolverError('MissingPatternModelFile');
        }

        const nodeMatrix: SudokuNode[][] = Array.from({ length: patternData.order }, (_, i) =>
            Array.from(
                { length: patternData.order },
                (_, j) => new SudokuNode({ i, j, order: patternData.order, boardReference: data.board })
            )
        );

        for (let i = 0; i < patternData.order; i++) {
            for (let j = 0; j < patternData.order; j++) {
                for (const neighbor of this.getNodeNeighborList(i, j)) {
                    nodeMatrix[i][j].addNeighbor(nodeMatrix[neighbor[0]][neighbor[1]]);
                }

                nodeMatrix[i][j].setColor(data.board[i][j] === data.emptyIdentifier ? -1 : data.board[i][j]);
            }
        }

        this.nodes = nodeMatrix.flatMap((n) => n);
        this.patternModel = undefined;
    }

    private getNodeNeighborList(i: number, j: number): SudokuPatternModelBlock {
        if (this.patternModel === undefined) return [];
        return this.patternModel[i][j];
    }
}
