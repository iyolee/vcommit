import * as fs from 'fs';
import * as path from 'path';
import * as shell from 'shelljs';
import chalk from 'chalk';
import { CONFIG_FILENAME } from './constant';
import { IPackage } from './types';

export const error = chalk.red;
export const warning = chalk.yellow;
export const success = chalk.greenBright;
export const info = chalk.blue;
const log = console.log;

export function isExistFolderOrFile(dir: string, file?: string): boolean {
  if (!file) {
    return fs.existsSync(path.join(dir));
  }
  return fs.existsSync(path.join(dir, file));
}

function generateFile(dir: string, filename: string, data: any) {
  const filePath = path.join(dir, filename);
  fs.writeFile(filePath, data, 'utf8', (err: Error | null) => {
    if (err) {
      log(error('Generate a configuration file wrongly, please try again.'));
      log(err);
      process.exit(1);
    }
  });
}

function getConfigObject(rootDir: string, filename: string): object | null {
  try {
    if (isExistFolderOrFile(rootDir, filename)) {
      const rcFile = fs.readFileSync(path.resolve(rootDir, filename));
      return JSON.parse(rcFile.toString('utf-8'));
    }
    return null;
  } catch (e) {
    return null;
  }
}

export function generateRcConfig(rootDir: string) {
  const data = JSON.stringify(
    getConfigObject(path.join(__dirname, '../'), CONFIG_FILENAME), null, 2);
  generateFile(rootDir, CONFIG_FILENAME, data);
}

export function setConfigForPackage(rootDir: string) {
  const packageObject = getPackageObject(rootDir);
  if (!packageObject.husky) packageObject.husky = {};
  if (!packageObject.husky.hooks) packageObject.husky.hooks = {};
  packageObject.husky.hooks['commit-msg'] = 'validate-commit-msg';

  if (!packageObject.scripts) packageObject.scripts = {};
  packageObject.scripts.changelog = 'conventional-changelog -p angular -i CHANGELOG.md -s -r 0';

  const newPackageObject = JSON.stringify(packageObject, null, 2);
  generateFile(rootDir, 'package.json', newPackageObject);
}

export function getPackageObject(rootDir: string): IPackage {
  const packageObject = getConfigObject(rootDir, 'package.json') as IPackage;
  return packageObject;
}

export function installPackage(install: string[], rootPath: string) {
  let cmd = '';
  if (shell.which('yarn')) {
    cmd = `yarn add ${install.join(' ')} --dev`;
  } else if (shell.which('npm')) {
    cmd = `npm install -D ${install.join(' ')}`;
  }

  if (cmd) {
    log();
    log(info(cmd));
    log();
    shell.exec(`cd "${rootPath}" && ${cmd}`);
  } else {
    log(error('npm and yarn not exists'));
  }
}

export function pluckDeep(plainObj: object, keyPath: string) {
  const pathToArr = keyPath.split('.');
  return pathToArr.reduce((xs: any, x) => (xs && xs[x]) ? xs[x] : null, plainObj);
}
