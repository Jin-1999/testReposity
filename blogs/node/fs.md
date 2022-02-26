---
title: fs API
date: 2022-02-26
categories:
  - node
tags:
  - node
---

:::tip

​ 在实际开发中使用绝对路径， 而不去使用相对路径。 例如使用 `__dirname`（当前项目绝对路径），或者 `path`模块的相关`Api`。

​ 只记录常见的一些`fs`模块操作。

:::

### **读取文件**

`fs.readFile(path[, options], callback)`

🌰

```js
fs.readFile("./fs.text", "utf-8", (err, data) => {
  if (err) {
    return console.log("读取失败", err);
  }
  console.log("读取成功", data);
});
// 读取成功时 err 为null,  读取失败时 data 为undefined
```

### **写入文件 (覆盖原来文件)**

`fs.writeFile(file, data[, options], callback`

🌰

```js
fs.writeFile("./fs.text", "123457", "utf-8", (err) => {
  if (err) {
    return console.log("文件写入失败");
  }
  console.log("文件写入成功");
});
// 写入成功时err为null  写入失败时为一个错误的对象
```

### **写入文件 (追加原来文件)**

`fs.appendFile(file, data[, options], callback`

### **检测文件**

`fs.access(path[, mode], callback)`

```js
import { access, constants } from "fs";

const file = "package.json";

// 检查当前目录中是否存在该文件。
access(file, constants.F_OK, (err) => {
  console.log(`${file} ${err ? "does not exist" : "exists"}`);
});

// 检查文件是否可读。
access(file, constants.R_OK, (err) => {
  console.log(`${file} ${err ? "is not readable" : "is readable"}`);
});

// 检查文件是否可写。
access(file, constants.W_OK, (err) => {
  console.log(`${file} ${err ? "is not writable" : "is writable"}`);
});

// 检查文件是否可读可写。
access(file, constants.R_OK | constants.W_OK, (err) => {
  console.log(`${file} ${err ? "is not" : "is"} readable and writable`);
});
```

### **删除文件**

`fs.rm(path[, options], callback)`

### **一个小 demo**

```js
const fs = require("fs");
const path = require("path");

function resolve(url) {
  return path.join(__dirname, url);
}

function styleResolve(data) {
  let res = regStyle.exec(data);
  const styleStr = res[0].replace("<style>", "").replace("</style>", "");
  fs.writeFile(resolve("style.css"), styleStr, (err) => {
    if (err) console.log("写入失败", err);
    console.log("写入 style 成功");
  });
}

function jsResolve(data) {
  let res = regScript.exec(data);
  console.log(res);
  const jsStyle = res[0].replace("<script>", "").replace("</script>", "");
  fs.writeFile(resolve("demo.js"), jsStyle, (err) => {
    if (err) console.log("写入失败", err);
    console.log("写入 js 成功 ");
  });
}

// \s 匹配空白字符   \S 匹配非空白字符  * 匹配任意次数
const regStyle = /<style>[\s\S]*<\/style>/;
const regScript = /<script>[\s\S]*<\/script>/;

fs.readFile(resolve("demo.html"), "utf-8", (err, data) => {
  if (err) return console.log("文件读取失败", err);
  styleResolve(data);
  jsResolve(data);
});
```
