"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var shell = __importStar(require("shelljs"));
var chalk_1 = __importDefault(require("chalk"));
var constant_1 = require("./constant");
exports.error = chalk_1.default.red;
exports.warning = chalk_1.default.yellow;
exports.success = chalk_1.default.greenBright;
exports.info = chalk_1.default.blue;
var log = console.log;
function isExistFolderOrFile(dir, file) {
    if (!file) {
        return fs.existsSync(path.join(dir));
    }
    return fs.existsSync(path.join(dir, file));
}
exports.isExistFolderOrFile = isExistFolderOrFile;
function generateFile(dir, filename, data) {
    var filePath = path.join(dir, filename);
    fs.writeFile(filePath, data, 'utf8', function (err) {
        if (err) {
            log(exports.error('Generate a configuration file wrongly, please try again.'));
            log(err);
            process.exit(1);
        }
    });
}
function getConfigObject(rootDir, filename) {
    try {
        if (isExistFolderOrFile(rootDir, filename)) {
            var rcFile = fs.readFileSync(path.resolve(rootDir, filename));
            return JSON.parse(rcFile.toString('utf-8'));
        }
        return null;
    }
    catch (e) {
        return null;
    }
}
function generateRcConfig(rootDir) {
    var data = JSON.stringify(getConfigObject(path.join(__dirname, '../'), constant_1.CONFIG_FILENAME), null, 2);
    generateFile(rootDir, constant_1.CONFIG_FILENAME, data);
}
exports.generateRcConfig = generateRcConfig;
function setConfigForPackage(rootDir) {
    var packageObject = getPackageObject(rootDir);
    if (!packageObject.husky)
        packageObject.husky = {};
    if (!packageObject.husky.hooks)
        packageObject.husky.hooks = {};
    packageObject.husky.hooks['commit-msg'] = 'validate-commit-msg';
    if (!packageObject.scripts)
        packageObject.scripts = {};
    packageObject.scripts.changelog = 'conventional-changelog -p angular -i CHANGELOG.md -s -r 0';
    var newPackageObject = JSON.stringify(packageObject, null, 2);
    generateFile(rootDir, 'package.json', newPackageObject);
}
exports.setConfigForPackage = setConfigForPackage;
function getPackageObject(rootDir) {
    var packageObject = getConfigObject(rootDir, 'package.json');
    return packageObject;
}
exports.getPackageObject = getPackageObject;
function installPackage(install, rootPath) {
    var cmd = '';
    if (shell.which('yarn')) {
        cmd = "yarn add " + install.join(' ') + " --dev";
    }
    else if (shell.which('npm')) {
        cmd = "npm install -D " + install.join(' ');
    }
    if (cmd) {
        log();
        log(exports.info(cmd));
        log();
        shell.exec("cd \"" + rootPath + "\" && " + cmd);
    }
    else {
        log(exports.error('npm and yarn not exists'));
    }
}
exports.installPackage = installPackage;
function pluckDeep(plainObj, keyPath) {
    var pathToArr = keyPath.split('.');
    return pathToArr.reduce(function (xs, x) { return (xs && xs[x]) ? xs[x] : null; }, plainObj);
}
exports.pluckDeep = pluckDeep;
