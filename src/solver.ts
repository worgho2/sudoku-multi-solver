import SudokuSolverError from './errors';
import SudokuGraph from './graph';
import SudokuNode from './node';
import { SudokuPatterns } from './patterns';

export default class SudokuSolver {
    private board: number[][];
    private emptyIdentifier: number;
    private pattern: keyof typeof SudokuPatterns;

    constructor(data: { board: number[][]; emptyIdentifier?: number; pattern?: keyof typeof SudokuPatterns }) {
        this.board = data.board;
        this.emptyIdentifier = data.emptyIdentifier ?? -1;
        this.pattern = data.pattern ?? '9_regular';
    }

    static from(data: { board: number[][] }): SudokuSolver {
        return new SudokuSolver({ board: data.board });
    }

    setEmptyIdentifier(emptyIdentifier: number): SudokuSolver {
        this.emptyIdentifier = emptyIdentifier;
        return this;
    }

    setPattern(pattern: keyof typeof SudokuPatterns): SudokuSolver {
        this.pattern = pattern;
        return this;
    }

    async solve(): Promise<number[][]> {
        const graph = new SudokuGraph({
            board: this.board,
            emptyIdentifier: this.emptyIdentifier,
            pattern: this.pattern,
        });

        await graph.initialize();

        const success = this.run(graph);

        if (success === false) {
            throw new SudokuSolverError('InvalidBoard');
        }

        return this.board;
    }

    private run(graph: SudokuGraph): boolean {
        const node = this.getUnpaintedNodeWithHighestSaturation(graph);

        if (node === undefined) {
            return true;
        }

        for (const color of node.getAvailableColors()) {
            node.setColor(color);

            if (this.run(graph)) {
                return true;
            } else {
                node.removeColor();
            }
        }

        return false;
    }

    private getUnpaintedNodeWithHighestSaturation(graph: SudokuGraph): SudokuNode | undefined {
        const unpaintedNodes = graph.nodes.filter((n) => !n.hasColor()).sort((a, b) => b.saturation - a.saturation);
        return unpaintedNodes.length === 0 ? undefined : unpaintedNodes[0];
    }
}
