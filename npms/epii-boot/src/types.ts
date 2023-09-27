export type Package = {
    dev?: boolean
}

export type BootPackage = {
    name:string,
    dependencies?: string[],
    start(data: any): any
}

export type BootPackageMap =  Record<string,BootPackage>;