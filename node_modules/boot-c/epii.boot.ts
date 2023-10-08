import { Module, Route } from "shiyue-boot";

export default function () {
    //    Module("/aaa",__dirname+"/c");
    Route("/dddd", function (ctx) {
        ctx.success({ d: 9 });
    })
}