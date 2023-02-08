import SudokuGraph from './graph';
import SudokuNode from './node';
import { SudokuPattern, sudokuPatternData } from './pattern';

export default class SudokuSolver {
    #board: number[][];
    #emptyIdentifier: number;
    #pattern: keyof typeof SudokuPattern;
    #printBoardFunction: (board: number[][]) => void;

    constructor(data: { board: number[][]; emptyIdentifier: number; pattern: keyof typeof SudokuPattern }) {
        this.#board = data.board;
        this.#emptyIdentifier = data.emptyIdentifier;
        this.#pattern = data.pattern;
        this.#printBoardFunction = sudokuPatternData[data.pattern].printBoard;
    }

    solve(data: { printToConsole: boolean } = { printToConsole: false }): number[][] {
        const graph = new SudokuGraph({
            board: this.#board,
            emptyIdentifier: this.#emptyIdentifier,
            pattern: this.#pattern,
        });

        const success = this.#run(graph);

        if (success === false) {
            throw new Error('Invalid input');
        }

        if (data.printToConsole === true) {
            this.#printBoardFunction(this.#board);
        }

        return this.#board;
    }

    #run(graph: SudokuGraph): boolean {
        const node = this.#getUnpaintedNodeWithHighestSaturation(graph);

        if (node === undefined) {
            return true;
        }

        for (const color of node.getAvailableColors()) {
            node.setColor(color);

            if (this.#run(graph)) {
                return true;
            } else {
                node.removeColor();
            }
        }

        return false;
    }

    #getUnpaintedNodeWithHighestSaturation(graph: SudokuGraph): SudokuNode | undefined {
        const unpaintedNodes = graph.nodes.filter((n) => !n.hasColor()).sort((a, b) => b.saturation - a.saturation);
        return unpaintedNodes.length === 0 ? undefined : unpaintedNodes[0];
    }
}
