
import path from "path";
import fs from "fs";
import { BootPackage, BootPackageMap, Package } from "./types";
import { sort } from "./tools";

type PackageRecord = Record<string, Package>;


let packageMap: BootPackageMap = {}
let onBootFinishFunction: Function[] = [];



function getPackage(dir: string): PackageRecord {
    let packageLockFile = dir + "/package.json";
    if (fs.existsSync(packageLockFile)) {
        return JSON.parse(fs.readFileSync(packageLockFile).toString()).dependencies;
    } else if (fs.existsSync(packageLockFile = dir + "/package-lock.json")) {
        return JSON.parse(fs.readFileSync(packageLockFile).toString()).dependencies;
    } else {
        return {}
    }
}


function getBootPackage(packageMap: PackageRecord): BootPackageMap {

    let out: BootPackageMap = {};
    for (const key in packageMap) {
        if (Object.prototype.hasOwnProperty.call(packageMap, key)) {
            if (packageMap[key].dev) continue;
            try {
                let m = require(key + "/epii.boot");
                if (m && m.default) m = m.default;

                if (typeof m === "function") {
                    out[key] = {
                        name: key,
                        dependencies: [],
                        start: m
                    }
                } else if (m.start || m.dependencies) {
                    m.name = key;
                    if(!m.dependencies) m.dependencies=[];
                    out[key] = m;
                }
            } catch (error) {
                // console.log(error);

                continue;
            }

        }
    }
    return out;
}






export async function bootStart(data: any = null, projectDir: string | null = null) {
    if (!data) data = {};
    const projectRootDir = path.resolve(projectDir ? projectDir : (__dirname + "/../../../"));
    try {
        let m = require(projectRootDir + "/epii.boot");
        if (m && m.default) m = m.default;
        if (typeof m === "function") {
            let o = await m();
            if (!(o === undefined || o === null)) {
                if (typeof o === "object") {
                    Object.assign(data, o);
                } else {
                    data = o;
                }
            }
        }
    } catch (e) {

    }

    packageMap = getBootPackage(getPackage(projectRootDir));

    let packageList = sort(packageMap);

    for (let index = 0; index < packageList.length; index++) {
        const element = packageList[index];
        let mOut = await element.start(data);
        if (!(mOut === undefined || mOut === null)) {
            data[element.name] = mOut;
        }
    }
    if (onBootFinishFunction.length > 0) {
        for (let index = 0; index < onBootFinishFunction.length; index++) {
            const element = onBootFinishFunction[index];
            await element(data);
        }
    }

}


export function onBootFinish(fun: Function) {
    onBootFinishFunction.unshift(fun);
}
 
