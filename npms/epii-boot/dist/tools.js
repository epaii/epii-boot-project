"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sort = void 0;
function sort(packageMap) {
    let out = new Set();
    let xianghuset = new Set();
    let addByKeys = function (keys) {
        keys.forEach(key => {
            if (!packageMap[key].dependencies) {
                throw new Error(key + " is not exist!");
            }
            if (out.has(packageMap[key])) {
                return;
            }
            packageMap[key].dependencies.forEach(ykey => {
                if (xianghuset.has(key + "###" + ykey)) {
                    throw new Error(key + " and " + ykey + "  circle dependencie  ");
                }
                else {
                    xianghuset.add(key + "###" + ykey);
                    xianghuset.add(ykey + "###" + key);
                }
            });
            addByKeys(packageMap[key].dependencies);
            out.add(packageMap[key]);
        });
    };
    Object.values(packageMap).forEach(item => {
        addByKeys([item.name]);
    });
    return Array.from(out);
}
exports.sort = sort;
