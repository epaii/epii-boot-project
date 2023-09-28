import { BootPackage, BootPackageMap } from "./types";

export function sort(packageMap: BootPackageMap): BootPackage[] {
    let out: Set<BootPackage> = new Set();
    let xianghuset = new Set();
    let addByKeys = function (keys: string[]) {
        keys.forEach(key => {
            packageMap[key].dependencies.forEach(ykey => {
                if (xianghuset.has(key + "###" + ykey)) {
                    throw new Error(key + " and " + ykey + " xun huan yinyong");
                } else {
                    xianghuset.add(key + "###" + ykey);
                    xianghuset.add(ykey + "###" + key);
                }
            });
            addByKeys(packageMap[key].dependencies);
            out.add(packageMap[key]);
        })
    }
    Object.values(packageMap).forEach(item => {
        addByKeys([item.name]);
    })
    return Array.from(out);
}