export default class SudokuNode {
    index: string;
    private i: number;
    private j: number;
    private order: number;
    private wrappedColor: number;
    private wrappedSaturation: number;
    private neighbors: Map<string, SudokuNode>;
    private boardReference: number[][];

    constructor(data: { i: number; j: number; order: number; boardReference: number[][] }) {
        this.index = `${data.i}_${data.j}`;
        this.i = data.i;
        this.j = data.j;
        this.order = data.order;
        this.wrappedColor = -1;
        this.wrappedSaturation = 0;
        this.neighbors = new Map<string, SudokuNode>();
        this.boardReference = data.boardReference;
    }

    get color() {
        return this.wrappedColor;
    }

    get saturation() {
        return this.wrappedSaturation;
    }

    setColor(color: number) {
        if (color === -1) {
            return;
        }

        this.wrappedColor = color;
        this.boardReference[this.i][this.j] = color;
        this.increaseNeighborsSaturation();
    }

    removeColor() {
        this.wrappedColor = -1;
        this.boardReference[this.i][this.j] = -1;
        this.decreaseNeighborsSaturation();
    }

    hasColor() {
        return this.wrappedColor !== -1;
    }

    getNeighborsColors(): number[] {
        const colorSet = new Set<number>();

        for (const neighbor of this.neighbors.values()) {
            if (neighbor.hasColor()) {
                colorSet.add(neighbor.color);
            }
        }

        return [...colorSet.values()];
    }

    getAvailableColors(): number[] {
        const colorSet = new Set<number>(Array.from({ length: this.order }, (_, i) => i + 1));

        for (const color of this.getNeighborsColors()) {
            colorSet.delete(color);
        }

        return [...colorSet.values()];
    }

    increaseSaturation() {
        this.wrappedSaturation += 1;
    }

    decreaseSaturation() {
        this.wrappedSaturation -= 1;
    }

    increaseNeighborsSaturation() {
        for (const neighbor of this.neighbors.values()) {
            neighbor.increaseSaturation();
        }
    }

    decreaseNeighborsSaturation() {
        for (const neighbor of this.neighbors.values()) {
            neighbor.decreaseSaturation();
        }
    }

    addNeighbor(sudokuNode: SudokuNode) {
        this.neighbors.set(sudokuNode.index, sudokuNode);
    }
}
