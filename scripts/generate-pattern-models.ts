import fs from 'node:fs';
import path from 'node:path';

type SudokuBlockCoordinates = { i: number; j: number }[];
type SudokuPatternModel = SudokuBlockCoordinates[][];

/**
 * Writes pattern model to file
 * @param patternModel
 * @param order
 * @param patternName
 */
function writeToFile(patternModel: SudokuPatternModel, order: number, patternName: string) {
    const filePath = path.resolve(__dirname, '..', 'patterns', `${order}`, `${patternName}.json`);

    fs.writeFile(filePath, JSON.stringify(patternModel), function (err) {
        if (err) {
            console.log(`Failed generating pattern model file: patterns/${order}/${patternName}.json`);
        }
        console.log(`Generated pattern model file: patterns/${order}/${patternName}.json`);
    });
}

/**
 * Generates pattern model
 * @param order order size of board side
 * @param getBlockCoordinates function that gets block's coordinates based on current coordinate
 * @returns
 */
function generatePatternModel(
    order: number,
    getBlockCoordinates: (i: number, j: number, order: number) => SudokuBlockCoordinates
): SudokuPatternModel {
    const sudokuPatternModel: SudokuPatternModel = Array.from({ length: order }, (_) =>
        Array.from({ length: order }, (_) => [])
    );

    for (let i = 0; i < order; i++) {
        for (let j = 0; j < order; j++) {
            const edgeSet: Set<string> = new Set();

            for (let k = 0; k < order; k++) {
                edgeSet.add(`${k}_${j}`);
                edgeSet.add(`${i}_${k}`);
            }

            for (const coordinate of getBlockCoordinates(i, j, order)) {
                edgeSet.add(`${coordinate.i}_${coordinate.j}`);
            }

            edgeSet.delete(`${i}_${j}`);

            sudokuPatternModel[i][j] = [...edgeSet.values()]
                .map((index) => index.split('_').map((x) => parseInt(x)))
                .map((pair) => ({ i: pair[0], j: pair[1] }));
        }
    }

    return sudokuPatternModel;
}

function getRegularBlockCoordinates(i: number, j: number, order: number): SudokuBlockCoordinates {
    const coordinates: SudokuBlockCoordinates = [];

    const root = Math.floor(Math.sqrt(order));
    const iMult = Math.floor(i / root);
    const jMult = Math.floor(j / root);

    for (let k = root * iMult; k < root * iMult + root; k++) {
        for (let l = root * jMult; l < root * jMult + root; l++) {
            coordinates.push({ i: k, j: l });
        }
    }

    return coordinates;
}

function get5x5CrossBlockCoordinates(i: number, j: number, order: number = 5): SudokuBlockCoordinates {
    const blocks = [
        [
            [0, 0],
            [0, 1],
            [0, 2],
            [1, 0],
            [1, 1],
        ],
        [
            [0, 3],
            [0, 4],
            [1, 3],
            [1, 4],
            [2, 4],
        ],
        [
            [2, 0],
            [3, 0],
            [3, 1],
            [4, 0],
            [4, 1],
        ],
        [
            [3, 3],
            [3, 4],
            [4, 2],
            [4, 3],
            [4, 4],
        ],
        [
            [1, 2],
            [2, 1],
            [2, 2],
            [2, 3],
            [3, 2],
        ],
    ];

    for (const block of blocks) {
        for (const coordinate of block) {
            if (i === coordinate[0] && j === coordinate[1]) {
                return block.map((c) => ({ i: c[0], j: c[1] }));
            }
        }
    }
    return [];
}

/**
 * Generate models and write to files
 */

writeToFile(generatePatternModel(4, getRegularBlockCoordinates), 4, 'regular');
writeToFile(generatePatternModel(5, get5x5CrossBlockCoordinates), 5, 'cross');
writeToFile(generatePatternModel(9, getRegularBlockCoordinates), 9, 'regular');
writeToFile(generatePatternModel(16, getRegularBlockCoordinates), 16, 'regular');
writeToFile(generatePatternModel(16, getRegularBlockCoordinates), 16, 'regular');
