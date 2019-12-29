import * as fs from 'fs';
import * as path from 'path';
import { IConfig } from './types';

const CONFIG_FILENAME = '.vcommitrc';

// 检查某文件/文件夹是否存在
function isExistFileOrFolder(dir: string, file: string): boolean {
  return fs.existsSync(path.join(dir, file));
}

// 文件不存在，生成文件，并写入初始内容
function generateFile(filename: string, data: any) {
  const initialDir = process.cwd();
  // if (isExistFileOrFolder(initialDir, filename)) return;
  const filePath = path.join(initialDir, CONFIG_FILENAME);
  fs.writeFile(filePath, data, 'utf8', (error: Error | null) => {
    if (error) {
      // tslint:disable-next-line: no-console
      console.log('Generate a configuration file wrongly, please try again.');
    }
  });
}

// 获取文件内容
export function getConfigObject(filename: string): object | null {
  try {
    const initialDir = process.cwd();
    if (isExistFileOrFolder(initialDir, filename)) {
      const rcFile = fs.readFileSync(path.resolve(initialDir, filename));
      return JSON.parse(rcFile.toString('utf-8'));
    }
    return null;
  } catch (e) {
    return null;
  }
}

export function getRcConfig() {
  const data = getConfigObject('config.json');
  generateFile(CONFIG_FILENAME, JSON.stringify(data, null, 2));
  return getConfigObject(CONFIG_FILENAME);
}

export function getPackageConfig() {
  const configObject = getConfigObject('package.json');
  return configObject;
}

export function getConfig(): IConfig {
  return (getRcConfig() || getPackageConfig()) as IConfig;
}

export function getGitFolder(): string {
  const initialDir = process.cwd();
  if (!isExistFileOrFolder(initialDir, '.git')) {
    throw new Error('Cannot find .git folder');
  }
  const gitDir = path.join(initialDir, '.git');
  return gitDir;
}
