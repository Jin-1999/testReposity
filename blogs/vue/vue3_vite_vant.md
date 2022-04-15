---
title: vue3+vant移动端
date: 2022-04-15
categories:
  - vue
tags:
  - vue3
  - vue
---

:::tip

​ 记录使用 vue3+vant3 开发的 app, 边开发边更新。 [Gitee 地址](https://gitee.com/jin_juntong/vant3_app.git)

:::

## 初始化

- **初始化 vue3**

```
npm init vue@latest
```

- **引入 vant3**

```
npm i vant
```

- 按需引入插件

&emsp;&emsp;1、插件下载

```
npm i vite-plugin-style-import@1.4.1 -D
```

&emsp;&emsp;2、配置插件 vite.config.js

```js
import vue from "@vitejs/plugin-vue";
import styleImport, { VantResolve } from "vite-plugin-style-import";

export default {
  plugins: [
    vue(),
    styleImport({
      resolves: [VantResolve()],
    }),
  ],
};
```

&emsp;&emsp;3、引入组件

```js
import { createApp } from "vue";
import { Button } from "vant";

const app = createApp();
app.use(Button);
```

- **安装 sass**

```
npm install sass sass-loader -D
```

- **安装 axios**

```
npm install --save axios vue-axios
```

&emsp;&emsp;在 main.js 引入

```js
import axios from "./service/http";
import VueAxios from "vue-axios";
app.use(VueAxios, axios);
```

- **安装 mock**

```
npm install mockjs -D
```

## axios 配置

```js
// ./service/http.js
import axios from "axios";
import { Notify } from "vant";
axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";

axios.interceptors.request.use(
  (config) => {
    console.log("request config", config);
    const token = sessionStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Basic ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(new Error(err));
  }
);

axios.interceptors.response.use(
  (res) => {
    const status = res.data.code || res.status;
    const message = res.data.msg;
    if (status !== 200) {
      Notify(message);
      console.log(new Error(res));
      return Promise.inject(new Error(res));
    }
    console.log(res.data);
    return res.data;
  },
  (err) => {
    Notify(err);
    console.log(new Error(err));
    return Promise.reject(new Error(err));
  }
);

export default axios;
```

## 路由守卫配置

```js
// permission
import router from "./index";

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem("token");
  let isAuthenticated = token ? true : false;

  if (isAuthenticated) {
    next();
  } else {
    if (to.name === "login") {
      next();
    } else {
      next({ name: "login" });
    }
  }
});

router.afterEach(() => {});
```
