import path from 'node:path';

export enum SudokuPattern {
    '4_regular',
    '5_cross',
    '6_brickwall',
    '6_ladder',
    '7_diagonal',
    '8_brickwall',
    '9_regular',
    '10_brickwall',
    '12_brickwall',
    '16_regular',
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
    '4_regular': {
        order: 4,
        filePath: path.resolve(filesPath, '4', 'regular.json'),
        printBoard(board) {
            console.log('┏━━━┯━━━┳━━━┯━━━┓');

            for (let i = 0; i < board.length; i++) {
                console.log(`┃ ${board[i].slice(0, 2).join('   ')} ┃ ${board[i].slice(2, 4).join('   ')} ┃`);

                if (i === board.length - 1) {
                    console.log('┗━━━┷━━━┻━━━┷━━━┛');
                } else if ((i + 1) % 2 === 0) {
                    console.log('┣━━━┿━━━╋━━━┿━━━┫');
                } else {
                    console.log('┠   ┼   ╂   ┼   ┨');
                }
            }
        },
    },
    '5_cross': {
        order: 5,
        filePath: path.resolve(filesPath, '5', 'cross.json'),
        printBoard(board) {
            const [l0, l1, l2, l3, l4] = board;
            console.log('┏━━━┯━━━┯━━━┳━━━┯━━━┓');
            console.log(`┃ ${l0.slice(0, 3).join('   ')} ┃ ${l0.slice(3).join('   ')} ┃`);
            console.log('┠   ┼   ╆━━━╉   ┼   ┨');
            console.log(`┃ ${l1.slice(0, 2).join('   ')} ┃ ${l1[2]} ┃ ${l1.slice(3).join('   ')} ┃`);
            console.log(`┣━━━╈━━━╃   ╄━━━╅   ┨`);
            console.log(`┃ ${l2[0]} ┃ ${l2.slice(1, 4).join('   ')} ┃ ${l2[4]} ┃`);
            console.log(`┠   ╄━━━╅   ╆━━━╇━━━┫`);
            console.log(`┃ ${l3.slice(0, 2).join('   ')} ┃ ${l3[2]} ┃ ${l3.slice(3).join('   ')} ┃`);
            console.log(`┠   ┼   ╊━━━╃   ┼   ┨`);
            console.log(`┃ ${l4.slice(0, 2).join('   ')} ┃ ${l4.slice(2).join('   ')} ┃`);
            console.log('┗━━━┷━━━┻━━━┷━━━┷━━━┛');
        },
    },
    '6_brickwall': {
        order: 6,
        filePath: path.resolve(filesPath, '6', 'brickwall.json'),
        printBoard(board) {
            console.log('┏━━━┯━━━┯━━━┳━━━┯━━━┯━━━┓');
            for (let i = 0; i < board.length; i++) {
                console.log(`┃ ${board[i].slice(0, 3).join('   ')} ┃ ${board[i].slice(3).join('   ')} ┃`);

                if (i === board.length - 1) {
                    console.log('┗━━━┷━━━┷━━━┻━━━┷━━━┷━━━┛');
                } else if ((i + 1) % 2 === 0) {
                    console.log('┣━━━┿━━━┿━━━╋━━━┿━━━┿━━━┫');
                } else {
                    console.log('┠   ┼   ┼   ╂   ┼   ┼   ┨');
                }
            }
        },
    },
    '6_ladder': {
        order: 6,
        filePath: path.resolve(filesPath, '6', 'ladder.json'),
        printBoard(board) {
            console.log('┏━━━┯━━━┯━━━┯━━━┳━━━┯━━━┓');
            for (let i = 0; i < board.length; i++) {
                if (i % 2 === 0) {
                    console.log(`┃ ${board[i].slice(0, 4).join('   ')} ┃ ${board[i].slice(4).join('   ')} ┃`);
                } else {
                    console.log(`┃ ${board[i].slice(0, 2).join('   ')} ┃ ${board[i].slice(2).join('   ')} ┃`);
                }

                if (i === board.length - 1) {
                    console.log('┗━━━┷━━━┻━━━┷━━━┷━━━┷━━━┛');
                } else if ((i + 1) % 2 === 0) {
                    console.log('┣━━━┿━━━╇━━━┿━━━╈━━━┿━━━┫');
                } else {
                    console.log('┠   ┼   ╆━━━┿━━━╃   ┼   ┨');
                }
            }
        },
    },
    '7_diagonal': {
        order: 7,
        filePath: path.resolve(filesPath, '7', 'diagonal.json'),
        printBoard(board) {
            const [l0, l1, l2, l3, l4, l5, l6] = board;
            console.log('┏━━━┯━━━┳━━━┯━━━┯━━━┯━━━┳━━━┓');
            console.log(`┃ ${l0.slice(0, 2).join('   ')} ┃ ${l0.slice(2, 6).join('   ')} ┃ ${l0[6]} ┃`);
            console.log('┠   ┼   ╄━━━╅   ┼   ┼   ╂   ┨');
            console.log(`┃ ${l1.slice(0, 3).join('   ')} ┃ ${l1.slice(3, 6).join('   ')} ┃ ${l1[6]} ┃`);
            console.log(`┣━━━╅   ┼   ╊━━━┿━━━╈━━━╃   ┨`);
            console.log(
                `┃ ${l2[0]} ┃ ${l2.slice(1, 3).join('   ')} ┃ ${l2.slice(3, 5).join('   ')} ┃ ${l2
                    .slice(5)
                    .join('   ')} ┃`
            );
            console.log(`┠   ╄━━━╈━━━╃   ┼   ╂   ┼   ┨`);
            console.log(
                `┃ ${l3.slice(0, 2).join('   ')} ┃ ${l3.slice(2, 5).join('   ')} ┃ ${l3.slice(5).join('   ')} ┃`
            );
            console.log(`┠   ┼   ╂   ┼   ╆━━━╇━━━╅   ┨`);
            console.log(
                `┃ ${l4.slice(0, 2).join('   ')} ┃ ${l4.slice(2, 4).join('   ')} ┃ ${l4.slice(4, 6).join('   ')} ┃ ${
                    l4[6]
                } ┃`
            );
            console.log(`┠   ╆━━━╇━━━┿━━━╉   ┼   ╄━━━┫`);
            console.log(`┃ ${l5[0]} ┃ ${l5.slice(1, 4).join('   ')} ┃ ${l5.slice(4).join('   ')} ┃`);
            console.log(`┠   ╂   ┼   ┼   ╄━━━╅   ┼   ┨`);
            console.log(`┃ ${l6[0]} ┃ ${l6.slice(1, 5).join('   ')} ┃ ${l6.slice(5).join('   ')} ┃`);
            console.log('┗━━━┻━━━┷━━━┷━━━┷━━━┻━━━┷━━━┛');
        },
    },
    '8_brickwall': {
        order: 8,
        filePath: path.resolve(filesPath, '8', 'brickwall.json'),
        printBoard(board) {
            console.log('┏━━━┯━━━┯━━━┯━━━┳━━━┯━━━┯━━━┯━━━┓');
            for (let i = 0; i < board.length; i++) {
                console.log(`┃ ${board[i].slice(0, 4).join('   ')} ┃ ${board[i].slice(4).join('   ')} ┃`);

                if (i === board.length - 1) {
                    console.log('┗━━━┷━━━┷━━━┷━━━┻━━━┷━━━┷━━━┷━━━┛');
                } else if ((i + 1) % 2 === 0) {
                    console.log('┣━━━┿━━━┿━━━┿━━━╋━━━┿━━━┿━━━┿━━━┫');
                } else {
                    console.log('┠   ┼   ┼   ┼   ╂   ┼   ┼   ┼   ┨');
                }
            }
        },
    },
    '9_regular': {
        order: 9,
        filePath: path.resolve(filesPath, '9', 'regular.json'),
        printBoard(board) {
            console.log('┏━━━┯━━━┯━━━┳━━━┯━━━┯━━━┳━━━┯━━━┯━━━┓');

            for (let i = 0; i < board.length; i++) {
                console.log(
                    `┃ ${board[i].slice(0, 3).join('   ')} ┃ ${board[i].slice(3, 6).join('   ')} ┃ ${board[i]
                        .slice(6, 9)
                        .join('   ')} ┃`
                );

                if (i === board.length - 1) {
                    console.log('┗━━━┷━━━┷━━━┻━━━┷━━━┷━━━┻━━━┷━━━┷━━━┛');
                } else if ((i + 1) % 3 === 0) {
                    console.log('┣━━━┿━━━┿━━━╋━━━┿━━━┿━━━╋━━━┿━━━┿━━━┫');
                } else {
                    console.log('┠   ┼   ┼   ╂   ┼   ┼   ╂   ┼   ┼   ┨');
                }
            }
        },
    },
    '10_brickwall': {
        order: 10,
        filePath: path.resolve(filesPath, '10', 'brickwall.json'),
        printBoard(board) {
            console.log('┏━━━━┯━━━━┯━━━━┯━━━━┯━━━━┳━━━━┯━━━━┯━━━━┯━━━━┯━━━━┓');
            for (let i = 0; i < board.length; i++) {
                const chunk = board[i].map((i) => String(i).padStart(2, ' '));

                console.log(`┃ ${chunk.slice(0, 5).join('   ')} ┃ ${chunk.slice(5).join('   ')} ┃`);

                if (i === board.length - 1) {
                    console.log('┗━━━━┷━━━━┷━━━━┷━━━━┷━━━━┻━━━━┷━━━━┷━━━━┷━━━━┷━━━━┛');
                } else if ((i + 1) % 2 === 0) {
                    console.log('┣━━━━┿━━━━┿━━━━┿━━━━┿━━━━╋━━━━┿━━━━┿━━━━┿━━━━┿━━━━┫');
                } else {
                    console.log('┠    ┼    ┼    ┼    ┼    ╂    ┼    ┼    ┼    ┼    ┨');
                }
            }
        },
    },
    '12_brickwall': {
        order: 12,
        filePath: path.resolve(filesPath, '12', 'brickwall.json'),
        printBoard(board) {
            console.log('┏━━━━┯━━━━┯━━━━┯━━━━┳━━━━┯━━━━┯━━━━┯━━━━┳━━━━┯━━━━┯━━━━┯━━━━┓');
            for (let i = 0; i < board.length; i++) {
                const chunk = board[i].map((i) => String(i).padStart(2, ' '));

                console.log(
                    `┃ ${chunk.slice(0, 4).join('   ')} ┃ ${chunk.slice(4, 8).join('   ')} ┃ ${chunk
                        .slice(8)
                        .join('   ')} ┃`
                );

                if (i === board.length - 1) {
                    console.log('┗━━━━┷━━━━┷━━━━┷━━━━┻━━━━┷━━━━┷━━━━┷━━━━┻━━━━┷━━━━┷━━━━┷━━━━┛');
                } else if ((i + 1) % 3 === 0) {
                    console.log('┣━━━━┿━━━━┿━━━━┿━━━━╋━━━━┿━━━━┿━━━━┿━━━━╋━━━━┿━━━━┿━━━━┿━━━━┫');
                } else {
                    console.log('┠    ┼    ┼    ┼    ╂    ┼    ┼    ┼    ╂    ┼    ┼    ┼    ┨');
                }
            }
        },
    },
    '16_regular': {
        order: 16,
        filePath: path.resolve(filesPath, '16', 'regular.json'),
        printBoard(board) {
            console.log('┏━━━━┯━━━━┯━━━━┯━━━━┳━━━━┯━━━━┯━━━━┯━━━━┳━━━━┯━━━━┯━━━━┯━━━━┳━━━━┯━━━━┯━━━━┯━━━━┓');

            for (let i = 0; i < board.length; i++) {
                const chunk = board[i].map((i) => String(i).padStart(2, ' '));
                console.log(
                    `┃ ${chunk.slice(0, 4).join('   ')} ┃ ${chunk.slice(4, 8).join('   ')} ┃ ${chunk
                        .slice(8, 12)
                        .join('   ')} ┃ ${chunk.slice(12, 16).join('   ')} ┃`
                );

                if (i === board.length - 1) {
                    console.log('┗━━━━┷━━━━┷━━━━┷━━━━┻━━━━┷━━━━┷━━━━┷━━━━┻━━━━┷━━━━┷━━━━┷━━━━┻━━━━┷━━━━┷━━━━┷━━━━┛');
                } else if ((i + 1) % 4 === 0) {
                    console.log('┣━━━━┿━━━━┿━━━━┿━━━━╋━━━━┿━━━━┿━━━━┿━━━━╋━━━━┿━━━━┿━━━━┿━━━━╋━━━━┿━━━━┿━━━━┿━━━━┫');
                } else {
                    console.log('┠    ┼    ┼    ┼    ╂    ┼    ┼    ┼    ╂    ┼    ┼    ┼    ╂    ┼    ┼    ┼    ┨');
                }
            }
        },
    },
};
