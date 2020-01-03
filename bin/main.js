"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var shell = __importStar(require("shelljs"));
var constant_1 = require("./constant");
var log = console.log;
var Vcommit = /** @class */ (function () {
    function Vcommit(rootDir) {
        this.rootDir = rootDir;
    }
    Vcommit.prototype.setup = function () {
        this.checkBeforeSetup();
        this.setupPackage();
        this.setupConfig();
    };
    Vcommit.prototype.checkBeforeSetup = function () {
        var isGit = utils_1.isExistFolderOrFile(this.rootDir, '.git');
        var isPackage = utils_1.isExistFolderOrFile(this.rootDir, 'package.json');
        if (!isGit) {
            log(utils_1.error('Cannot find .git folder.'));
            process.exit(1);
        }
        if (!isPackage) {
            log(utils_1.error('Cannot find package.json file.'));
            process.exit(1);
        }
    };
    Vcommit.prototype.setupPackage = function () {
        var install = [];
        var packageObject = utils_1.getPackageObject(this.rootDir);
        if (!packageObject.dependencies)
            packageObject.dependencies = {};
        if (!packageObject.devDependencies)
            packageObject.devDependencies = {};
        constant_1.INSTALL_PACKAGES.forEach(function (pack) {
            if (!(pack in packageObject.dependencies && pack in packageObject.devDependencies)) {
                install.push(pack);
            }
        });
        if (!install.length)
            return;
        utils_1.installPackage(install, this.rootDir);
        shell.exec('clear');
    };
    Vcommit.prototype.setupConfig = function () {
        utils_1.generateRcConfig(this.rootDir);
        utils_1.setConfigForPackage(this.rootDir);
    };
    return Vcommit;
}());
exports.Vcommit = Vcommit;
