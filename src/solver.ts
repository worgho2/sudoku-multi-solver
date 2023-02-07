import SudokuGraph from './graph';
import SudokuNode from './node';

export default class SudokuSolver {
    static run(graph: SudokuGraph): boolean {
        const node = SudokuSolver.getUnpaintedNodeWithHighestSaturation(graph);

        if (node === undefined) {
            return true;
        }

        const availableColors = node.getAvailableColor();

        for (const color of availableColors) {
            node.setColor(color);

            if (SudokuSolver.run(graph)) {
                return true;
            } else {
                node.removeColor();
            }
        }

        return false;
    }

    /**
     * Find the uncolored node with highest saturation
     *
     * @param graph
     */
    static getUnpaintedNodeWithHighestSaturation(graph: SudokuGraph): SudokuNode | undefined {
        const unpaintedNodes = graph.nodes.filter((n) => !n.hasColor()).sort((a, b) => b.saturation - a.saturation);
        return unpaintedNodes.length === 0 ? undefined : unpaintedNodes[0];
    }
}
