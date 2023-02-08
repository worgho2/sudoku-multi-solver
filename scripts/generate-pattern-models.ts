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

/**
 * Blocks are sqrt(order) x sqrt(order)
 * Valid orders: 4, 9, 16
 */
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

function get6x6BrickwallBlockCoordinates(i: number, j: number, order: number = 6): SudokuBlockCoordinates {
    const coordinates: SudokuBlockCoordinates = [];

    let iRef = 0;
    let jRef = j >= 0 && j < 3 ? 0 : 3;

    if (i >= 0 && i < 2) {
        iRef = 0;
    } else if (i >= 2 && i < 4) {
        iRef = 2;
    } else {
        iRef = 4;
    }

    for (let k = iRef; k < iRef + 2; k++) {
        for (let l = jRef; l < jRef + 3; l++) {
            coordinates.push({ i: k, j: l });
        }
    }

    return coordinates;
}

function get6x6LadderBlockCoordinates(i: number, j: number, order: number = 6): SudokuBlockCoordinates {
    const blocks = [
        [
            [0, 0],
            [0, 1],
            [0, 2],
            [0, 3],
            [1, 0],
            [1, 1],
        ],
        [
            [0, 4],
            [0, 5],
            [1, 2],
            [1, 3],
            [1, 4],
            [1, 5],
        ],
        [
            [2, 0],
            [2, 1],
            [2, 2],
            [2, 3],
            [3, 0],
            [3, 1],
        ],
        [
            [2, 4],
            [2, 5],
            [3, 2],
            [3, 3],
            [3, 4],
            [3, 5],
        ],
        [
            [4, 0],
            [4, 1],
            [4, 2],
            [4, 3],
            [5, 0],
            [5, 1],
        ],
        [
            [4, 4],
            [4, 5],
            [5, 2],
            [5, 3],
            [5, 4],
            [5, 5],
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

function get7x7DiagonalBlockCoordinates(i: number, j: number, order: number = 7): SudokuBlockCoordinates {
    const blocks = [
        [
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1],
            [1, 2],
            [2, 1],
            [2, 2],
        ],
        [
            [0, 2],
            [0, 3],
            [0, 4],
            [0, 5],
            [1, 3],
            [1, 4],
            [1, 5],
        ],
        [
            [0, 6],
            [1, 6],
            [2, 5],
            [2, 6],
            [3, 5],
            [3, 6],
            [4, 6],
        ],
        [
            [2, 0],
            [3, 0],
            [3, 1],
            [4, 0],
            [4, 1],
            [5, 0],
            [6, 0],
        ],
        [
            [2, 3],
            [2, 4],
            [3, 2],
            [3, 3],
            [3, 4],
            [4, 2],
            [4, 3],
        ],
        [
            [5, 1],
            [5, 2],
            [5, 3],
            [6, 1],
            [6, 2],
            [6, 3],
            [6, 4],
        ],
        [
            [4, 4],
            [4, 5],
            [5, 4],
            [5, 5],
            [5, 6],
            [6, 5],
            [6, 6],
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

function get8x8BrickwallBlockCoordinates(i: number, j: number, order: number = 8): SudokuBlockCoordinates {
    const coordinates: SudokuBlockCoordinates = [];

    let iRef = 0;
    let jRef = j >= 0 && j < 4 ? 0 : 4;

    if (i >= 0 && i < 2) {
        iRef = 0;
    } else if (i >= 2 && i < 4) {
        iRef = 2;
    } else if (i >= 4 && i < 6) {
        iRef = 4;
    } else {
        iRef = 6;
    }

    for (let k = iRef; k < iRef + 2; k++) {
        for (let l = jRef; l < jRef + 4; l++) {
            coordinates.push({ i: k, j: l });
        }
    }

    return coordinates;
}

function get8x8LadderBlockCoordinates(i: number, j: number, order: number = 8): SudokuBlockCoordinates {
    const coordinates: SudokuBlockCoordinates = [];

    let iRef = 0;
    let jRef = 0;
    let iIncrement = 0;
    let jIncrement = 0;

    if (j >= 0 && j < 2) {
        jRef = 0;
        iIncrement = 4;
        jIncrement = 2;

        if (i >= 0 && i < 4) {
            iRef = 0;
        } else {
            iRef = 4;
        }
    } else if (j >= 2 && j < 6) {
        jRef = 2;
        iIncrement = 2;
        jIncrement = 4;

        if (i >= 0 && i < 2) {
            iRef = 0;
        } else if (i >= 2 && i < 4) {
            iRef = 2;
        } else if (i >= 4 && i < 6) {
            iRef = 4;
        } else {
            iRef = 6;
        }
    } else {
        jRef = 6;
        iIncrement = 4;
        jIncrement = 2;

        if (i >= 0 && i < 4) {
            iRef = 0;
        } else {
            iRef = 4;
        }
    }

    if (i >= 0 && i < 2) {
        iRef = 0;
    } else if (i >= 2 && i < 4) {
        iRef = 2;
    } else if (i >= 4 && i < 6) {
        iRef = 4;
    } else {
        iRef = 6;
    }

    for (let k = iRef; k < iRef + iIncrement; k++) {
        for (let l = jRef; l < jRef + jIncrement; l++) {
            coordinates.push({ i: k, j: l });
        }
    }

    return coordinates;
}

function get10x10BrickwallBlockCoordinates(i: number, j: number, order: number = 10): SudokuBlockCoordinates {
    const coordinates: SudokuBlockCoordinates = [];

    let iRef = 0;
    let jRef = j >= 0 && j < 5 ? 0 : 5;

    if (i >= 0 && i < 2) {
        iRef = 0;
    } else if (i >= 2 && i < 4) {
        iRef = 2;
    } else if (i >= 4 && i < 6) {
        iRef = 4;
    } else if (i >= 6 && i < 8) {
        iRef = 6;
    } else {
        iRef = 8;
    }

    for (let k = iRef; k < iRef + 2; k++) {
        for (let l = jRef; l < jRef + 5; l++) {
            coordinates.push({ i: k, j: l });
        }
    }

    return coordinates;
}

function get12x12BrickwallBlockCoordinates(i: number, j: number, order: number = 12): SudokuBlockCoordinates {
    const coordinates: SudokuBlockCoordinates = [];

    let iRef = 0;
    let jRef = 0;

    if (i >= 0 && i < 3) {
        iRef = 0;
    } else if (i >= 3 && i < 6) {
        iRef = 3;
    } else if (i >= 6 && i < 9) {
        iRef = 6;
    } else {
        iRef = 9;
    }

    if (j >= 0 && j < 4) {
        jRef = 0;
    } else if (j >= 4 && j < 8) {
        jRef = 4;
    } else {
        jRef = 8;
    }

    for (let k = iRef; k < iRef + 3; k++) {
        for (let l = jRef; l < jRef + 4; l++) {
            coordinates.push({ i: k, j: l });
        }
    }

    return coordinates;
}

/**
 * Generate models and write to files
 */

writeToFile(generatePatternModel(4, getRegularBlockCoordinates), 4, 'regular');
writeToFile(generatePatternModel(5, get5x5CrossBlockCoordinates), 5, 'cross');
writeToFile(generatePatternModel(6, get6x6BrickwallBlockCoordinates), 6, 'brickwall');
writeToFile(generatePatternModel(6, get6x6LadderBlockCoordinates), 6, 'ladder');
writeToFile(generatePatternModel(7, get7x7DiagonalBlockCoordinates), 7, 'diagonal');
writeToFile(generatePatternModel(8, get8x8BrickwallBlockCoordinates), 8, 'brickwall');
writeToFile(generatePatternModel(8, get8x8LadderBlockCoordinates), 8, 'ladder');
writeToFile(generatePatternModel(9, getRegularBlockCoordinates), 9, 'regular');
writeToFile(generatePatternModel(10, get10x10BrickwallBlockCoordinates), 10, 'brickwall');
writeToFile(generatePatternModel(12, get12x12BrickwallBlockCoordinates), 12, 'brickwall');
writeToFile(generatePatternModel(16, getRegularBlockCoordinates), 16, 'regular');
writeToFile(generatePatternModel(16, getRegularBlockCoordinates), 16, 'regular');
