---
title: 使用prettier和eslint格式化代码
date: 2022-04-02
categories:
  - tips
tags:
  - tips
---

`.prettierrc` 相关配置

```json
{
  "semi": false, //结尾是否有分号
  "singleQuote": false, //是否单引号
  "bracketSpacing": true, //对象首尾是否有空格
  "arrowParens": "avoid", //箭头函数在能省略省略括号时省略
  "tabWidth": 4, //tab缩进 默认:2
  "useTabs": false //是否使用tab缩进
}
```

`eslintrc.js` 相关配置

```js
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
  },
  parserOptions: {
    parser: "babel-eslint",
  },
};
```
