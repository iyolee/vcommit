#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var inquirer_1 = __importDefault(require("inquirer"));
var shell = __importStar(require("shelljs"));
var path = __importStar(require("path"));
var main_1 = require("./main");
var utils_1 = require("./utils");
var log = console.log;
var version = utils_1.getPackageObject(path.join(__dirname, '../')).version;
var rootDir = process.cwd();
var isExistConfig = utils_1.pluckDeep(utils_1.getPackageObject(rootDir), 'husky.hooks.commit-msg');
var isExistRcFile = utils_1.isExistFolderOrFile(rootDir, '.vcmrc');
var vcommit = new main_1.Vcommit(rootDir);
commander_1.default
    .usage('<command> [options]')
    .option('-s, --setup', 'generate project configuration.')
    .option('-u, --upgrade', 'upgrade vcommit.')
    .version(version)
    .parse(process.argv);
if (commander_1.default.upgrade) {
    log();
    log(utils_1.success('upgrade vcommit!'));
    log();
    shell.exec('sudo npm install -g vcommit');
    process.exit(1);
}
if (isExistConfig || isExistRcFile) {
    inquirer_1.default.prompt([
        {
            default: true,
            message: 'Configuration already exists. Do you continue?',
            name: 'configuration',
            type: 'confirm',
        },
    ]).then(function (answers) {
        if (answers.configuration) {
            if (commander_1.default.setup) {
                vcommit.setup();
                log();
                log(utils_1.success('vcommit run successfully!'));
                log();
            }
        }
        else {
            process.exit(1);
        }
    });
}
