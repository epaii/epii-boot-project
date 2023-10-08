"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readConfig = exports.readCurrentDirConfig = exports.readProjectConfig = exports.readArgsConfig = exports.getDataByNamespace = exports.getConfigFromDir = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
let argsConfig = process.argv.splice(2).filter(item => item.startsWith("--")).reduce((o, item, index) => {
    let tmp = item.substring(2).split("=");
    if (tmp.length === 1)
        tmp[1] = "1";
    o[tmp[0]] = tmp[1];
    return o;
}, {});
const projectConfigFilePath = path_1.default.dirname(process.argv[1]) + path_1.default.sep;
const currentDirConfigPath = process.cwd() + path_1.default.sep;
let projectConfig = null;
let currentDirConfig = null;
function getConfigFromDir(dir) {
    try {
        let f = "";
        if (fs_1.default.existsSync(f = dir + "epii.config.json")) {
            return JSON.parse(fs_1.default.readFileSync(f).toString());
        }
        else if (fs_1.default.existsSync(f = dir + "epii.config.js")) {
            return require(projectConfigFilePath);
        }
    }
    catch (error) {
    }
    return null;
}
exports.getConfigFromDir = getConfigFromDir;
currentDirConfig = getConfigFromDir(currentDirConfigPath);
projectConfig = getConfigFromDir(projectConfigFilePath);
if (argsConfig["epii.config"]) {
    if (fs_1.default.existsSync(argsConfig["epii.config"])) {
        try {
            if (argsConfig["epii.config"].endsWith(".json"))
                argsConfig = Object.assign(JSON.parse(fs_1.default.readFileSync(argsConfig["epii.config"]).toString()), argsConfig);
            else {
                argsConfig = Object.assign(require(argsConfig["epii.config"]), argsConfig);
            }
        }
        catch (error) {
        }
    }
}
function getDataByNamespace(data, namespace = "") {
    if (namespace.length === 0)
        return data;
    let out = {};
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            if (key.startsWith(namespace + ".")) {
                out[key.substring((namespace + ".").length)] = data[key];
            }
        }
    }
    return out;
}
exports.getDataByNamespace = getDataByNamespace;
function readArgsConfig() {
    return argsConfig;
}
exports.readArgsConfig = readArgsConfig;
function readProjectConfig() {
    return projectConfig;
}
exports.readProjectConfig = readProjectConfig;
function readCurrentDirConfig() {
    return currentDirConfig;
}
exports.readCurrentDirConfig = readCurrentDirConfig;
function readConfig(defualtConfig = {}, namespace = "") {
    if (projectConfig)
        Object.assign(defualtConfig, getDataByNamespace(projectConfig, namespace));
    if (currentDirConfig)
        Object.assign(defualtConfig, getDataByNamespace(currentDirConfig, namespace));
    if (argsConfig)
        Object.assign(defualtConfig, getDataByNamespace(argsConfig, namespace));
    return defualtConfig;
}
exports.readConfig = readConfig;
