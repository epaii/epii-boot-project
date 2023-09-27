import App from "epii-tiny-app";
type hasApp ={
    app:App
}
export default function (data:hasApp) {
    data.app.module("/ddd",__dirname+"/aaa");
}