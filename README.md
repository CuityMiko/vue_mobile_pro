### Vue项目基本骨架
+ src : 项目程序目录
+ src/bower_components : bower管理的web前端libs
+ src/components : 组件
+ src/containers : Vue容器文件目录
+ src/js/app.js : 项目入口文件
+ src/pages : 前端页面
+ src/index.html : 项目入口页面
+ src/template.html : webpack生产环境自动生成到dist目录的项目入口页面模板
+ .babelrc : babel配置文件
+ .bowerrc : 指定bower install的组件存放位置
+ .eslintignore : 配置eslint语法规范监测忽略的文件目录
+ .eslintrc.js : 定义eslint语法规范规则
+ .gitignore : 定义git上传忽略的文件目录
+ bower.json : bower配置文件
+ ESLint.md : eslint笔记
+ gulpfile.js : gulp配置文件
+ package.json : npm配置文件
+ typings.json : 智能提示配置文件
+ webpack.develop.config.js : webpack开发时配置文件
+ webpack.publish.config.js : webpack发布生产时配置文件
+ server : node服务器端
+ src/js/stores : vuex的Store机构目录
+ 运行:
```
npm install

// dev
npm run develop

// 打包
npm run publish
```
### 项目使用技术
##### client
+ vue2.0
+ vue-router
+ vuex
+ webpack
+ mint-ui
+ babel
+ eslint
##### server
+ nodejs
+ express
+ mongoose

### 版本说明
+ master为项目的基本骨架
+ v1为项目的基础实现

### Project Detail
#### mint-ui
+ 官网：https://mint-ui.github.io/#!/zh-cn
+ install && use
```
// step1
npm i mint-ui -S
// step2
// app.js引入
import Mint from 'mint-ui';
Vue.use(Mint);
// step3
// css引入
import 'mint-ui/lib/style.css'
```

### 注意
+ 1.如果出现vue-lazyload相关external-helpers的问题,则去node_modules的vue-lazyload中的.babelrc文件中删除
```
"plugins": [
    "external-helpers"
]
```




