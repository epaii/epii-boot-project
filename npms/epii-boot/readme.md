# epii-boot 教程
## npm包启动引擎

### 开放方法
- bootStart
- onBootFinish
```js
 import { bootStart,onBootFinish } from "epii-boot";

//开启引擎，读取npm依赖包
bootStart(data?: any, projectDir?: string | null): Promise<void>;

//读取结束后，执行回调
onBootFinish(fun: Function): void

```
