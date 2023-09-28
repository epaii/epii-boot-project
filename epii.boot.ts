import { onBootFinish } from "epii-boot";
import App from "epii-tiny-app";

export default function () {
    let app = App.createServer();
    onBootFinish(function () {
        // app.listen(8080);
    })
    return {
        app
    }

}