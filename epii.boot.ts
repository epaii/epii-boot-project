import { Module, Port, ResponseAdvice, Route, Use } from "shiyue-boot";

export default function () {

     
    Route("/aaa", function (ctx) {
        ctx.error(66666 + "");
    })
}