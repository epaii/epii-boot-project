
export default {
    dependencies:["boot-a"],
    start(data:any) {
        console.log("run in boot-b and get boot-a:age");
        return {
            name: 5
        }

    }
}