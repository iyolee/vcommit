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
var path = __importStar(require("path"));
var main_1 = require("./main");
var utils_1 = require("./utils");
var version = utils_1.getPackageObject(path.join(__dirname, '../')).version;
var rootDir = process.cwd();
var vcommit = new main_1.Vcommit(rootDir);
commander_1.default
    .usage('<command> [options]')
    .option('-s, --setup', 'Generate project configuration.')
    .version(version)
    .parse(process.argv);
if (commander_1.default.setup) {
    vcommit.setup();
}
