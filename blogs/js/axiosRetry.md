---
title: 当接口报错时重复请求接口
date: 2022-03-23
categories:
  - js
tags:
  - axios
---

:::tip

​ 接口请求的时候偶尔遇见接口超时等问题，500 502 等错误， 我们可以对超时的接口重复请求一次防止程序中断，以`axios`为例。

:::

```JS
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
axios.interceptors.response.use(undefined,function axiosRetryInterceptor(err) {
    var config = err.config;
    console.log("config", err.config);

    // 没有设置重复次数，返回正常报错
    if (!config || !config.retry) return Promise.reject(err);
    config.__retryCount = config.__retryCount || 0;

    // 重试次数大于设定的次数就返回正常报错
    if (config.__retryCount >= config.retry) {
      return Promise.reject(err);
    }

    config.__retryCount += 1;

    // 使用promise设置延时
    var backOff = new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, config.retryDelay || 1000);
    });

    // 再次发送请求
    return backOff.then(function () {
        return axios(config);
    });
    }
);

//举例
function getData(data) {
    return axios({
        url: "URL",
        method: "post",
        data,
        retry: 2, //设置重复请求次数
        retryDelay: 1000, //设置延时 默认1s
    });
}

getData({ pageNum: 1, pageSize: 10 })
    .then((res) => {
        console.log("success", res);
    })
    .catch((err) => {
        console.log("failure", err);
    });
</script>
```
