"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sort = void 0;
function sort(packageMap) {
    let out = new Set();
    let xianghuset = new Set();
    let addByKeys = function (keys) {
        keys.forEach(key => {
            if (out.has(packageMap[key])) {
                return;
            }
            packageMap[key].dependencies.forEach(ykey => {
                if (xianghuset.has(key + "###" + ykey)) {
                    throw new Error(key + " and " + ykey + " xun huan yinyong");
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
