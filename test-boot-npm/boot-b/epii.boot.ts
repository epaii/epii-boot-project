
export default {
    dependencies:["boot-c"],
    start(data:any) {
        console.log("run in boot-b and get boot-a:age");
        return {
            name: 5
        }

    }
}