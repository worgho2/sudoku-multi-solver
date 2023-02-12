## [Code of Conduct](./CODE_OF_CONDUCT.md)

Please read the text so that you understand how to conduct while contributing to this project.

## Semantic Versioning

This project uses [SemVer](http://semver.org/) for versioning.

## Sending a Pull Request

**Before submitting a pull request,** please make sure the following is done:

1. Fork [the repository](https://github.com/worgho2/sudoku-multi-solver)
   and create your branch from `main`.
2. If you've added code that should be tested, add tests!
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes (`npm test`).
4. Make sure your code lints and styles (`npm run lint && npm run format`).

### Development Workflow

After cloning, run `npm install` to fetch its dependencies. Then, you can run
several commands:

* `npm run build` will build cjs and es module in the `lib` folder.
* `npm run lint` checks the code style.
* `npm run format` applies code formatting style.
* `npm test` runs the complete test suite.
* `npm run generate` generates game pattern models.

Make sure that your pull request contains unit tests for any new functionality.
This way we can ensure that we don't break your code in the future.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.
