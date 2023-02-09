import path from 'node:path';
import { SudokuPatterns } from './patterns';

export type SudokuPatternData = {
    order: number;
    filePath: string;
};

export const sudokuPatternDataMap: {
    [k in keyof typeof SudokuPatterns]: SudokuPatternData;
} = {
    '4_regular': {
        order: 4,
        filePath: path.resolve(__dirname, '..', 'pattern-models', '4', 'regular.json'),
    },
    '5_cross': {
        order: 5,
        filePath: path.resolve(__dirname, '..', 'pattern-models', '5', 'cross.json'),
    },
    '6_brickwall': {
        order: 6,
        filePath: path.resolve(__dirname, '..', 'pattern-models', '6', 'brickwall.json'),
    },
    '6_ladder': {
        order: 6,
        filePath: path.resolve(__dirname, '..', 'pattern-models', '6', 'ladder.json'),
    },
    '7_diagonal': {
        order: 7,
        filePath: path.resolve(__dirname, '..', 'pattern-models', '7', 'diagonal.json'),
    },
    '8_brickwall': {
        order: 8,
        filePath: path.resolve(__dirname, '..', 'pattern-models', '8', 'brickwall.json'),
    },
    '8_ladder': {
        order: 8,
        filePath: path.resolve(__dirname, '..', 'pattern-models', '8', 'ladder.json'),
    },
    '8_cross': {
        order: 8,
        filePath: path.resolve(__dirname, '..', 'pattern-models', '8', 'cross.json'),
    },
    '9_regular': {
        order: 9,
        filePath: path.resolve(__dirname, '..', 'pattern-models', '9', 'regular.json'),
    },
    '10_brickwall': {
        order: 10,
        filePath: path.resolve(__dirname, '..', 'pattern-models', '10', 'brickwall.json'),
    },
    '10_ladder': {
        order: 10,
        filePath: path.resolve(__dirname, '..', 'pattern-models', '10', 'ladder.json'),
    },
    '10_ladder_2': {
        order: 10,
        filePath: path.resolve(__dirname, '..', 'pattern-models', '10', 'ladder-2.json'),
    },
    '10_diagonal': {
        order: 10,
        filePath: path.resolve(__dirname, '..', 'pattern-models', '10', 'diagonal.json'),
    },
    '10_diamond': {
        order: 10,
        filePath: path.resolve(__dirname, '..', 'pattern-models', '10', 'diamond.json'),
    },
    '12_brickwall': {
        order: 12,
        filePath: path.resolve(__dirname, '..', 'pattern-models', '12', 'brickwall.json'),
    },
    '12_cross': {
        order: 12,
        filePath: path.resolve(__dirname, '..', 'pattern-models', '12', 'cross.json'),
    },
    '12_ladder': {
        order: 12,
        filePath: path.resolve(__dirname, '..', 'pattern-models', '12', 'ladder.json'),
    },
    '12_short_and_long': {
        order: 12,
        filePath: path.resolve(__dirname, '..', 'pattern-models', '12', 'short-and-long.json'),
    },
    '16_regular': {
        order: 16,
        filePath: path.resolve(__dirname, '..', 'pattern-models', '16', 'regular.json'),
    },
};
