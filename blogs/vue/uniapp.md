---
title: uniapp开发总结
date: 2022-05-27
categories:
  - vue
tags:
  - uniapp
  - vue
---

## 多端接口封装

&emsp;&emsp; devServer 中的代理仅在 H5 端有效，在 APP 端要直接设置 baseURL。

```js
// main.js
import config from "@/common/config";
// 初始化请求配置
uni.$u.http.setConfig((defaultConfig) => {
  /* defaultConfig 为默认全局配置 */

  // #ifdef H5
  defaultConfig.baseURL = "/api";
  // #endif
  // #ifdef APP-PLUS
  defaultConfig.baseURL = config.baseUrl;
  // #endif

  return defaultConfig;
});

module.exports = (vm) => {
  require("./requestInterceptors")(vm);
  require("./responseInterceptors")(vm);
};

//index.js 引入请求封装
require("./util/request/index")(app);
```

```js
// requestInterceptors.js
/**
 * 请求拦截
 * @param {Object} http
 */
module.exports = (vm) => {
  uni.$u.http.interceptors.request.use(
    (config) => {
      // 可使用async await 做异步操作
      // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}

      config.data = config.data || {};
      // 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
      let { vuex_token } = vm.$store.state;

      if (vuex_token && !config.custom?.auth) {
        config.header["Authorization"] = `Basic ${vuex_token}`;
        config.header["blade-Auth"] = `bearer ${vuex_token}`;
      }
      return config;
    },
    (
      config // 可使用async await 做异步操作
    ) => Promise.reject(config)
  );
};

//responseInterceptors.js
/**
 * 响应拦截
 * @param {Object} http
 */
module.exports = (vm) => {
  uni.$u.http.interceptors.response.use(
    (response) => {
      /* 对响应成功做点什么 可使用async await 做异步操作*/
      const data = response.data;
      // 自定义参数
      const custom = response.config?.custom;
      if (data.code !== 200) {
        // 服务端返回的状态码不等于200，则reject()
        // 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
        if (data.code === 401) {
          uni.$u.vuex("vuex_user", "");
          uni.$u.vuex("vuex_token", "");
          uni.$u.toast(data.msg);
          uni.$u.route({
            url: "pages/login/login",
          });
          return Promise.reject(data);
        }

        if (custom.toast !== false) {
          uni.$u.toast(data.msg);
        }
        // 如果需要catch返回，则进行reject
        if (custom?.catch) {
          return Promise.reject(data);
        } else {
          // 否则返回一个pending中的promise
          return new Promise(() => {});
        }
      }
      return data.data || {};
    },
    (response) => {
      /*  对响应错误做点什么 （statusCode !== 200）*/
      return Promise.reject(response);
    }
  );
};
```

## 下载资源

h5 中可以使用 a 标签的 download 和 href 属性下载，在 ios 和 android 端使用 uniapp 的 uni.downloadFile(OBJECT)去下载文件。
