"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onBootFinish = exports.bootStart = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const tools_1 = require("./tools");
let packageMap = {};
let onBootFinishFunction = [];
function getPackage(dir) {
    let packageLockFile = dir + "/package.json";
    if (fs_1.default.existsSync(packageLockFile)) {
        return JSON.parse(fs_1.default.readFileSync(packageLockFile).toString()).dependencies;
    }
    else if (fs_1.default.existsSync(packageLockFile = dir + "/package-lock.json")) {
        return JSON.parse(fs_1.default.readFileSync(packageLockFile).toString()).dependencies;
    }
    else {
        return {};
    }
}
function getBootPackage(packageMap) {
    let out = {};
    for (const key in packageMap) {
        if (Object.prototype.hasOwnProperty.call(packageMap, key)) {
            if (packageMap[key].dev)
                continue;
            try {
                let m = require(key + "/epii.boot");
                if (m && m.default)
                    m = m.default;
                if (typeof m === "function") {
                    out[key] = {
                        name: key,
                        dependencies: [],
                        start: m
                    };
                }
                else if (m.start || m.dependencies) {
                    m.name = key;
                    if (!m.dependencies)
                        m.dependencies = [];
                    out[key] = m;
                }
            }
            catch (error) {
                // console.log(error);
                continue;
            }
        }
    }
    return out;
}
function bootStart(data = null, projectDir = null) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!data)
            data = {};
        const projectRootDir = path_1.default.resolve(projectDir ? projectDir : (__dirname + "/../../../"));
        try {
            let m = require(projectRootDir + "/epii.boot");
            if (m && m.default)
                m = m.default;
            if (typeof m === "function") {
                let o = yield m();
                if (!(o === undefined || o === null)) {
                    if (typeof o === "object") {
                        Object.assign(data, o);
                    }
                    else {
                        data = o;
                    }
                }
            }
        }
        catch (e) {
        }
        packageMap = getBootPackage(getPackage(projectRootDir));
        console.log(packageMap);
        let packageList = (0, tools_1.sort)(packageMap);
        for (let index = 0; index < packageList.length; index++) {
            const element = packageList[index];
            let mOut = yield element.start(data);
            if (!(mOut === undefined || mOut === null)) {
                data[element.name] = mOut;
            }
        }
        if (onBootFinishFunction.length > 0) {
            for (let index = 0; index < onBootFinishFunction.length; index++) {
                const element = onBootFinishFunction[index];
                yield element(data);
            }
        }
    });
}
exports.bootStart = bootStart;
function onBootFinish(fun) {
    onBootFinishFunction.unshift(fun);
}
exports.onBootFinish = onBootFinish;
