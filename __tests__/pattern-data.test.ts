import { SudokuPatterns } from '../src/patterns';
import { sudokuPatternDataMap } from '../src/pattern-data';
import fs from 'fs';

describe('Pattern data', () => {
    describe('Get from map', () => {
        it('When selected, pattern model file should exist', () => {
            // Arrange
            const availablePatterns = Object.keys(SudokuPatterns) as SudokuPatterns[];
            const filePaths = availablePatterns.map((ap) => sudokuPatternDataMap[ap].filePath);

            // Act
            const fileExists = filePaths.map((fp) => fs.existsSync(fp));

            // Assert
            expect(fileExists).not.toContain(false);
        });
    });
});
