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
Object.defineProperty(exports, "__esModule", { value: true });
exports._doBootFunctions = exports.Port = exports.ResponseAdvice = exports.Route = exports.Module = exports.Init = exports.Use = void 0;
let bootFunctions = [];
function Use(handler) {
    bootFunctions.push(function (app) {
        app.use(handler);
    });
}
exports.Use = Use;
function Init(handler) {
    bootFunctions.push(function (app) {
        app.init(handler);
    });
}
exports.Init = Init;
function Module(route, module) {
    bootFunctions.push(function (app) {
        app.module(route, module);
    });
}
exports.Module = Module;
function Route(route, handler) {
    bootFunctions.push(function (app) {
        app.route(route, handler);
    });
}
exports.Route = Route;
function ResponseAdvice(handler) {
    bootFunctions.push(function (app) {
        app.responseAdvice(handler);
    });
}
exports.ResponseAdvice = ResponseAdvice;
function Port(port) {
    bootFunctions.push(function (app) {
        app.port(port);
    });
}
exports.Port = Port;
function _doBootFunctions(app) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let index = 0; index < bootFunctions.length; index++) {
            const element = bootFunctions[index];
            yield element(app);
        }
    });
}
exports._doBootFunctions = _doBootFunctions;
