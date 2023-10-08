# 使用说明

### 开放方法
 - readConfig 
 ```js
 /*
 * defualtConfig：默认配置
   namespace:配置前缀
 */
 readConfig(defualtConfig,namespace="");
 ```

### 修改配置的优先级（递增）  
   ` !!!!配置文件名称为 epii.config.json | epii.config.js`
 - 1.项目发布目录（例：/dist）
 - 2.程序运行目录
 - 3.命令行指向配置文件（xxx/xxx.js --epii.config=path/to/epii.config.json ）//配置文件命名可自定义
 - 4.命令行其它参数