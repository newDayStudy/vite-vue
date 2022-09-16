# Vue 3 + Vite

使用 ant-design-vue 二次封装表单，表格
日历展示

## 启动项目

npm run dev / yarn dev

## 启动服务器 （需创建表）

yarn server / npm run server

### 问卷调查

data 目录存放表的数据
问题表: question.json
选项表: answer.json

### 若无数据库

打开文件 server/startServer.js startServer 改为 false,使用本地数据

### 使用 mock 数据

vite.config.js 中 localEnable: true
apis/http.js 中 baseURL 注释
