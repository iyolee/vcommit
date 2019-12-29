#! /usr/bin/env node

import commander from 'commander';
import * as path from 'path';
import { Vcommit } from './main';
import { getPackageObject } from './utils';

const version = getPackageObject(path.join(__dirname, '../')).version;
const rootDir = process.cwd();
const vcommit = new Vcommit(rootDir);

commander
  .usage('<command> [options]')
  .option('-s, --setup', 'Generate project configuration.')
  .version(version)
  .parse(process.argv);

if (commander.setup) {
  vcommit.setup();
}
