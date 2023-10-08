import { App, ContextHandler, Controller, IController, InitHandler, ResponseAdvice } from "shiyue";
export declare function Use(handler: ContextHandler): void;
export declare function Init(handler: InitHandler): void;
export declare function Module(route: string, module: String | Controller | Function | IController): void;
export declare function Route(route: string, handler: ContextHandler): void;
export declare function ResponseAdvice(handler: ResponseAdvice): void;
export declare function Port(port: number): void;
export declare function _doBootFunctions(app: App): Promise<void>;
