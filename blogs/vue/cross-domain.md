---
title: vue处理跨域问题
date: 2022-03-09
categories:
  - vue
tags:
  - vue
  - proxy
---

:::tip

​ 违背了浏览器的同源策略就会产生跨域问题，根据`MDN`所介绍，「同源策略」是一个重要的安全策略，它用于限制一个[origin](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FGlossary%2F%E6%BA%90)的文档或者它加载的脚本如何能与另一个源的资源进行交互。它能帮助阻隔恶意文档，减少可能被攻击的媒介。

:::

### **产生原因**

http://localhost:8080

&emsp;&emsp;例如上面的`URL`, 由协议名 // 域名 : 端口号组成， 只要这三者有任意一个部分不相同就会产生跨域问题。

### **代理服务器**

&emsp;&emsp;使用服务器与服务器之间通信不会有跨域问题，我们可以使用`nginx `, `webpack`， `cli`中的相关配置去代理服务器。这里只介绍使用`vue-cli`去代理服务器。

一个最简单的 🌰

```json
// vue.config.js
module.exports = {
  devServer: {
    proxy: 'http://localhost:4000'
  }
}
```

这会告诉开发服务器将任何未知请求 (没有匹配到静态文件的请求) 代理到`http://localhost:4000`。

多个代理控制行为，项目常用，🌰

```json
module.exports = {
  devServer: {
    port: 8081,
    proxy: {
      '/api': {  // 匹配/api开头的请求
        target: '<url>',
        ws: true,
        changeOrigin: true,
        pathRewrite:{
             '^/api': ''   //将 /api及之前的字符串设置为空，确保传输路径和服务器路径匹配
        }
      },
      '/foo': {
        target: '<other_url>'
      }
    }
  }
}
```
