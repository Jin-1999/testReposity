---
title: Express基础
date:  2022-01-23
categories:
 - node
tags:
 - Express
 - node
 - plugin
---

:::tip

Express是一个基于Node平台的web应用开发框架，它提供了一系列的强大特性，帮助你创建各种Web应用。有效的让我们摆脱了原生的繁琐代码。

:::

安装： ```npm install express --save``` <br>
官方文档: [跳转](https://www.expressjs.com.cn/)
## Express框架特性

- 提供了方便简洁的路由定义方式
- 对获取HTTP请求参数进行了简化处理
- 对模板引擎支持程度高，方便渲染动态HTML页面
- 提供了中间件机制有效控制HTTP请求
- 拥有大量第三方中间件对功能进行扩展

### 原生Node.js与Express框架对比

```javascript
 app.on('request', (req, res) => {
    // 获取GET参数
    let {query} = url.parse(req.url, true);
    // 获取POST参数
    let postData = '';
    req.on('data', (chunk) => {
        postData += chunk;
    });
    req.on('end', () => {
        console.log(querystring.parse(postData)
    })); 
 });

```

```javascript
app.get('/', (req, res) => {
    // 获取GET参数
    console.log(req.query);
 });
 app.post('/', (req, res) => {
    // 获取POST参数
    console.log(req.body);
 }) 
```

### 使用Express搭建服务器

```javascript
const express = require('express')
const app = express()
app.get('/', (req, res) => {
    res.send('Hello, Express')
})
app.listen(3000)
```

<hr>

## 中间件

### 概念

&emsp;&emsp;中间件就是一堆方法，可以接收客户端发来的请求、可以对请求做出响应，也可以将请求继续交给下一个中间件继续处理。

<div align=center>
<img src="https://i.niupic.com/images/2022/01/24/9UbZ.png" />
</div>

## 应用

- 路由保护，客户端在访问需要登录的页面时，可以先使用中间件判断用户登录状态，用户如果未登录，则拦截请求，直接响应，禁止用户进入需要登录的页面。
- 网站维护公告，在所有路由的最上面定义接收所有请求的中间件，直接为客户端做出响应，网站正在维护中。
- 自定义404页面

<hr>

## 路由

### 构建模块化路由

```javascript
//index.js
const express = require('express')
const app = express()

const home = require('./route/home');
const admin = require('./route/admin');

app.get('/home', home);
app.get('/admin', admin);

app.listen(80)
```

```javascript
// route/home.js
const express = require('express')
const home = express.Router();
home.get('/home', (req, res) => {
    res.send('欢迎来到展示页面');
});
module.exports = home;
```

```javascript
// route/admin.js
const express = require('express')
const admin = express()
admin.get('/admin', (req, res) => {
    res.send('欢迎来到管理页面');
});
module.exports = admin;
```

## 获取参数（get/post）

### get参数获取

```javascript
// /home?name=Jin&age=18
home.get('/home', (req, res) => {
    res.send(`展示界面， 传参${JSON.stringify(req.query)}`); 
    //{"name":"Jin","age":"18"}
});
```

### post参数获取

```html
// form.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <form action="http://localhost/add" method="post">
      <input type="text" name="userName" />
      <input type="text" name="password" />
      <input type="submit" />
    </form>
  </body>
</html>

```

```javascript
// index.js
const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: false })) 
app.post('/add', (req, res) => {
    res.send(req.body)
})
app.listen(80)
```

### 路由参数

```javascript
// localhost:3000/find/123 
app.get('/find/:id', (req, res) => { 
    console.log(req.params); // {id: 123} 
});
```

## 静态资源处理

通过Express内置的express.static可以方便地托管静态文件，例如img、CSS、JavaScript 文件等。

```javascript
const express = require('express')
const path = require('path')
const app = express()
app.use(express.static( path.join(__dirname,'public'))) //根目录下public文件夹
app.listen(3000)

// public/image/01.png
// 通过 localhost/image/01.png可以直接访问
```

## 模板引擎

- 为了使art-template模板引擎能够更好的和Express框架配合，模板引擎官方在原art-template模板引擎的基础上封装了express-art-template。
-  使用```npm install art-template express-art-template```命令进行安装。

```javascript
const express = require('express')
const path = require('path')
const app = express()
// 当渲染后缀为art的模板时 使用express-art-template
app.engine('art', require('express-art-template'));
// 设置模板存放目录
app.set('views', path.join(__dirname, 'views'));
// 渲染模板时不写后缀 默认拼接art后缀
app.set('view engine', 'art');
app.get('/', (req, res) => {
    // 渲染模板
    res.render('index', {
        msg:'some message'
    });
}); 
```

```javascript
// views/index.art
{{msg}}
```

### 模板引擎中的公共数据

**app.locals 对象**

```javascript
app.locals.users = [{
    name: '张三',
    age: 20
},{
    name: '李四',
    age: 20
}]
```

