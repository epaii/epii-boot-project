import { BootPackage, BootPackageMap } from "./types";

export function sort(packageMap: BootPackageMap): BootPackage[] {
    return Object.values(packageMap);
}