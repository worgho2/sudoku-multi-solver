export default class SudokuNode {
    index: string;
    #color: number;
    #neighbors: Map<string, SudokuNode>;
    #saturation: number;
    #order: number;

    constructor(i: number, j: number, order: number) {
        this.index = `${i}_${j}`;
        this.#order = order;
        this.#color = -1;
        this.#neighbors = new Map<string, SudokuNode>();
        this.#saturation = 0;
    }

    get degree() {
        return this.#neighbors.size;
    }

    get color() {
        return this.#color;
    }

    get saturation() {
        return this.#saturation;
    }

    setColor(color: number) {
        if (color === -1) {
            return;
        }

        this.#color = color;
        this.increaseNeighborsSaturation();
    }

    removeColor() {
        this.#color = -1;
        this.decreaseNeighborsSaturation();
    }

    hasColor() {
        return this.#color !== -1;
    }

    getNeighborsColors(): number[] {
        const colorSet = new Set<number>();

        for (const neighbor of this.#neighbors.values()) {
            if (neighbor.hasColor()) {
                colorSet.add(neighbor.color);
            }
        }

        return [...colorSet.values()];
    }

    getAvailableColor(): number[] {
        const colorSet = new Set<number>(Array.from({ length: this.#order }, (_, i) => i + 1));

        for (const color of this.getNeighborsColors()) {
            colorSet.delete(color);
        }

        return [...colorSet.values()];
    }

    increaseSaturation() {
        this.#saturation += 1;
    }

    increaseNeighborsSaturation() {
        for (const neighbor of this.#neighbors.values()) {
            neighbor.increaseSaturation();
        }
    }

    decreaseSaturation() {
        this.#saturation -= 1;
    }

    decreaseNeighborsSaturation() {
        for (const neighbor of this.#neighbors.values()) {
            neighbor.decreaseSaturation();
        }
    }

    addNeighbor(sudokuNode: SudokuNode) {
        this.#neighbors.set(sudokuNode.index, sudokuNode);
    }
}
