import { readFileSync } from 'fs';

const message = readFileSync(process.argv[2], 'utf-8').trim();

const commitRE =
    /^(revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip)(\(.+\))?: .{1,50}/;

if (!commitRE.test(message)) {
    console.log();
    console.error(`invalid commit message format.`);
    process.exit(1);
}
