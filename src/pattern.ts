import path from 'node:path';

export enum SudokuPattern {
    '4_default',
    '9_default',
    '16_default',
}

export type SudokuPatternData = {
    order: number;
    filePath: string;
    printBoard: (board: number[][]) => void;
};

const filesPath: string = path.resolve(__dirname, '..', 'patterns');

export const sudokuPatternData: {
    [k in keyof typeof SudokuPattern]: SudokuPatternData;
} = {
    '4_default': {
        order: 4,
        filePath: path.resolve(filesPath, '4', 'default.json'),
        printBoard(board) {
            console.log('┏━━━┯━━━┳━━━┯━━━┓');

            for (let i = 0; i < board.length; i++) {
                console.log(`┃ ${board[i].slice(0, 2).join(' │ ')} ┃ ${board[i].slice(2, 4).join(' │ ')} ┃`);

                if (i === board.length - 1) {
                    console.log('┗━━━┷━━━┻━━━┷━━━┛');
                } else if ((i + 1) % 2 === 0) {
                    console.log('┣━━━┿━━━╋━━━┿━━━┫');
                } else {
                    console.log('┠───┼───╂───┼───┨');
                }
            }
        },
    },
    '9_default': {
        order: 9,
        filePath: path.resolve(filesPath, '9', 'default.json'),
        printBoard(board) {
            console.log('┏━━━┯━━━┯━━━┳━━━┯━━━┯━━━┳━━━┯━━━┯━━━┓');

            for (let i = 0; i < board.length; i++) {
                console.log(
                    `┃ ${board[i].slice(0, 3).join(' │ ')} ┃ ${board[i].slice(3, 6).join(' │ ')} ┃ ${board[i]
                        .slice(6, 9)
                        .join(' │ ')} ┃`
                );

                if (i === board.length - 1) {
                    console.log('┗━━━┷━━━┷━━━┻━━━┷━━━┷━━━┻━━━┷━━━┷━━━┛');
                } else if ((i + 1) % 3 === 0) {
                    console.log('┣━━━┿━━━┿━━━╋━━━┿━━━┿━━━╋━━━┿━━━┿━━━┫');
                } else {
                    console.log('┠───┼───┼───╂───┼───┼───╂───┼───┼───┨');
                }
            }
        },
    },
    '16_default': {
        order: 16,
        filePath: path.resolve(filesPath, '16', 'default.json'),
        printBoard(board) {
            console.log('┏━━━━┯━━━━┯━━━━┯━━━━┳━━━━┯━━━━┯━━━━┯━━━━┳━━━━┯━━━━┯━━━━┯━━━━┳━━━━┯━━━━┯━━━━┯━━━━┓');

            for (let i = 0; i < board.length; i++) {
                const chunk = board[i].map((i) => String(i).padStart(2, ' '));
                console.log(
                    `┃ ${chunk.slice(0, 4).join(' │ ')} ┃ ${chunk.slice(4, 8).join(' │ ')} ┃ ${chunk
                        .slice(8, 12)
                        .join(' │ ')} ┃ ${chunk.slice(12, 16).join(' │ ')} ┃`
                );

                if (i === board.length - 1) {
                    console.log('┗━━━━┷━━━━┷━━━━┷━━━━┻━━━━┷━━━━┷━━━━┷━━━━┻━━━━┷━━━━┷━━━━┷━━━━┻━━━━┷━━━━┷━━━━┷━━━━┛');
                } else if ((i + 1) % 4 === 0) {
                    console.log('┣━━━━┿━━━━┿━━━━┿━━━━╋━━━━┿━━━━┿━━━━┿━━━━╋━━━━┿━━━━┿━━━━┿━━━━╋━━━━┿━━━━┿━━━━┿━━━━┫');
                } else {
                    console.log('┠────┼────┼────┼────╂────┼────┼────┼────╂────┼────┼────┼────╂────┼────┼────┼────┨');
                }
            }
        },
    },
};
