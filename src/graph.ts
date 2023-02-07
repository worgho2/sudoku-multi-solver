import SudokuNode from './node';

export default class SudokuGraph {
    nodes: SudokuNode[];
    #order: number;

    constructor(board: string[][]) {
        this.#order = board.length;

        const nodeMatrix: SudokuNode[][] = Array.from({ length: 9 }, (_, i) =>
            Array.from({ length: 9 }, (_, j) => new SudokuNode(i, j, this.#order))
        );

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                for (const edge of this.#getEdgesIndex(i, j)) {
                    nodeMatrix[i][j].addNeighbor(nodeMatrix[edge.i][edge.j]);
                }

                nodeMatrix[i][j].setColor(board[i][j] === '.' ? -1 : parseInt(board[i][j]));
            }
        }

        this.nodes = nodeMatrix.flatMap((n) => n);
    }

    /**
     * TODO: make generic based on order
     */
    #getEdgesIndex(i: number, j: number): { i: number; j: number }[] {
        const edgeSet: Set<string> = new Set();

        for (let k = 0; k < 9; k++) {
            edgeSet.add(`${k}_${j}`);
            edgeSet.add(`${i}_${k}`);
        }

        const iMult = Math.floor(i / 3);
        const jMult = Math.floor(j / 3);

        for (let k = 3 * iMult; k < 3 * iMult + 3; k++) {
            for (let l = 3 * jMult; l < 3 * jMult + 3; l++) {
                edgeSet.add(`${k}_${l}`);
            }
        }

        edgeSet.delete(`${i}_${j}`);

        return [...edgeSet.values()].map((index) => {
            const [i, j] = index.split('_').map((ij) => parseInt(ij));
            return { i, j };
        });
    }

    print(response: string[][]) {
        const r = response.flatMap((n) => n).map((n) => parseInt(n));

        for (let i = 0; i < 81; i += 9) {
            if ((i + 1) % 9 === 0) {
                console.log(` \n`);
            }

            const responseLine = r.slice(i, i + 9);
            const currentLine = this.nodes
                .slice(i, i + 9)
                .map((n, j) => ({
                    n,
                    label:
                        (n.color === r[i + j] ? '\x1b[32m' : '\x1b[31m') +
                        String(n.color).padStart(2, ' ') +
                        '\x1b[37m',
                }))
                .map(
                    (obj) =>
                        `(${obj.label} ${String(obj.n.saturation).padStart(2, '0')} ${String(obj.n.degree).padStart(
                            2,
                            '0'
                        )})`
                );

            console.log(`${responseLine}\t${currentLine}`);
        }
    }
}
