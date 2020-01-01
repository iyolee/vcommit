#! /usr/bin/env node

import commander from 'commander';
import inquirer from 'inquirer';
import * as shell from 'shelljs';
import * as path from 'path';
import { Vcommit } from './main';
import { getPackageObject, pluckDeep, isExistFolderOrFile, success } from './utils';

const log = console.log;
const version = getPackageObject(path.join(__dirname, '../')).version;
const rootDir = process.cwd();
const isExistConfig = pluckDeep(getPackageObject(rootDir), 'husky.hooks.commit-msg');
const isExistRcFile = isExistFolderOrFile(rootDir, '.vcmrc');
const vcommit = new Vcommit(rootDir);

commander
  .usage('<command> [options]')
  .option('-s, --setup', 'generate project configuration.')
  .option('-u, --upgrade', 'upgrade vcommit.')
  .version(version)
  .parse(process.argv);

if (commander.upgrade) {
  log();
  log(success('upgrade vcommit!'));
  log();
  shell.exec('sudo npm install -g vcommit');
  process.exit(1);
}

if (isExistConfig || isExistRcFile) {
  inquirer.prompt([
    {
      default: true,
      message: 'Configuration already exists. Do you continue?',
      name: 'configuration',
      type: 'confirm',
    },
  ]).then((answers: { configuration: boolean }) => {
    if (answers.configuration) {
      if (commander.setup) {
        vcommit.setup();
        log();
        log(success('vcommit run successfully!'));
        log();
      }
    } else {
      process.exit(1);
    }
  });
}
