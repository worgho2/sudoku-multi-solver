import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';

function getConfig() {
    const isDevelopment = !!process.env.ROLLUP_WATCH;
    const fileName = isDevelopment ? 'sudoku-multi-solver.development' : 'sudoku-multi-solver';

    return {
        input: 'src/index.ts',
        plugins: [
            replace({
                preventAssignment: true,
                values: {
                    __DEVELOPMENT__: isDevelopment,
                },
            }),
            typescript({
                tsconfig: './src/tsconfig.json',
                sourceMap: false,
                outputToFilesystem: true,
            }),
            terser(),
        ],
        output: [
            {
                file: `./lib/${fileName}.mjs`,
                format: 'esm',
                exports: 'auto',
            },
            {
                file: `./lib/${fileName}.js`,
                format: 'cjs',
                exports: 'auto',
            },
        ],
    };
}

export default [getConfig()];
