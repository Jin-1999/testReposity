---
title: express路由
date: 2022-02-27
categories:
  - node
tags:
  - node
  - express
---

:::tip

​ 每当一个请求到达服务器的时候，需经过路由的匹配，当匹配成功之后，才会调用对应的处理函数。

​ 在匹配时，会按照路由的顺序进行匹配，如果**请求类型** 和 **请求的 URL** 同时匹配成功，则`Express`会将这次请求转个对应函数处理。

:::

**一个简单的 🌰**： 直接将路由挂载到`app`上。

```js
const express = require("express");
const app = express();

app.get("/demo1", (req, res) => {});
app.post("/demo2", (req, res) => {});

app.listen(3000);
```

### **模块化路由**

&emsp;&emsp;将路由抽离为单独的模块

- `express.Router()` 在` js`文件内创建路由对象
- `app.use()` 注册路由模块

🌰：

```js
// router_01.js
const express = require("express");
const router = express.Router();

router.get("/user/list", (req, res) => {
  res.end("get user list");
});
router.post("/user/add", (req, res) => {
  res.end("post add message");
});
module.exports = router;
```

```js
// index.js
const express = require("express");
const app = express();

const router = require("./router_01.js");
//app.use(router)
app.use("/api", router); //添加路由统一访问前缀

app.listen(3000);
```

### **部分 API**

- **router.METHOD（路径，[回调，...]回调）**

&emsp;&emsp;例如： `router.get()` `router.post()` `router.put()` `router.all()` 匹配所有方法

- **router.param（名称，回调）**

&emsp;&emsp;为路由参数添加回调触发器，其中`name`为参数名称，`callback`为回调函数。

- **router.route(路径)**

&emsp;&emsp;返回单个路由的实例，然后您可以使用该实例处理带有可选中间件的 HTTP 动词。用于`router.route()`避免重复的路线命名，从而避免输入错误。
