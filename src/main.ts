import {
  isExistFolderOrFile,
  getPackageObject,
  installPackage,
  generateRcConfig,
  setConfigForPackage,
  error,
  success,
} from './utils';

import { INSTALL_PACKAGES } from './constant';

const log = console.log;

export class Vcommit {
  private rootDir: string;
  constructor(rootDir: string) {
    this.rootDir = rootDir;
  }
  public setup() {
    this.checkBeforeSetup();
    this.setupPackage();
    this.setupConfig();
    log();
    log(success('vcommit run successfully!'));
    log();
  }
  private checkBeforeSetup() {
    const isGit = isExistFolderOrFile(this.rootDir, '.git');
    const isPackage = isExistFolderOrFile(this.rootDir, 'package.json');
    if (!isGit) {
      log(error('Cannot find .git folder.'));
      process.exit(1);
    }
    if (!isPackage) {
      log(error('Cannot find package.json file.'));
      process.exit(1);
    }
  }
  private setupPackage() {
    const install:string[] = [];
    const packageObject = getPackageObject(this.rootDir);
    if (!packageObject.dependencies) packageObject.dependencies = {};
    if (!packageObject.devDependencies) packageObject.devDependencies = {};
    INSTALL_PACKAGES.forEach((pack: string) => {
      if (!(pack in packageObject.dependencies || pack in packageObject.devDependencies)) {
        install.push(pack);
      }
    });
    if (!install.length) return;
    installPackage(install, this.rootDir);
  }
  private setupConfig() {
    generateRcConfig(this.rootDir);
    setConfigForPackage(this.rootDir);
  }
}
