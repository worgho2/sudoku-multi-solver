import { SudokuPatterns } from './patterns';

export type SudokuPatternData = {
    order: number;
    filePath: string;
};

const getFilePath = (order: number, pattern: string) => `../pattern-models/${order}/${pattern}.json`;

export const sudokuPatternDataMap: {
    [k in keyof typeof SudokuPatterns]: SudokuPatternData;
} = {
    '4_regular': {
        order: 4,
        filePath: getFilePath(4, 'regular'),
    },
    '5_cross': {
        order: 5,
        filePath: getFilePath(5, 'cross'),
    },
    '6_brickwall': {
        order: 6,
        filePath: getFilePath(6, 'brickwall'),
    },
    '6_ladder': {
        order: 6,
        filePath: getFilePath(6, 'ladder'),
    },
    '7_diagonal': {
        order: 7,
        filePath: getFilePath(7, 'diagonal'),
    },
    '8_brickwall': {
        order: 8,
        filePath: getFilePath(8, 'brickwall'),
    },
    '8_ladder': {
        order: 8,
        filePath: getFilePath(8, 'ladder'),
    },
    '8_cross': {
        order: 8,
        filePath: getFilePath(8, 'cross'),
    },
    '9_regular': {
        order: 9,
        filePath: getFilePath(9, 'regular'),
    },
    '10_brickwall': {
        order: 10,
        filePath: getFilePath(10, 'brickwall'),
    },
    '10_ladder': {
        order: 10,
        filePath: getFilePath(10, 'ladder'),
    },
    '10_ladder_2': {
        order: 10,
        filePath: getFilePath(10, 'ladder-2'),
    },
    '10_diagonal': {
        order: 10,
        filePath: getFilePath(10, 'diagonal'),
    },
    '10_diamond': {
        order: 10,
        filePath: getFilePath(10, 'diamond'),
    },
    '12_brickwall': {
        order: 12,
        filePath: getFilePath(12, 'brickwall'),
    },
    '12_cross': {
        order: 12,
        filePath: getFilePath(12, 'cross'),
    },
    '12_ladder': {
        order: 12,
        filePath: getFilePath(12, 'ladder'),
    },
    '12_short_and_long': {
        order: 12,
        filePath: getFilePath(12, 'short-and-long'),
    },
    '16_regular': {
        order: 16,
        filePath: getFilePath(16, 'regular'),
    },
};
