---
title: typescript开发中常见问题
date: 2022-07-19
categories:
  - typescript
tags:
  - typescript
  - tips
---

## 引用路径别名@报错

解决方法：在 ts.config.json 文件中添加以下配置：

```json
"compilerOptions": {
    "paths": {
        "@": ["src"],
        "@/*": ["src/*"]
    }
}
```

:::tip
在 vite 中使用@路径同样会报错，在 vite.config.ts 中配置路径

```ts
resolve: {
    alias: {
       "@": resolve(__dirname, "./src")
    }
}
```

:::

## node 相关模块类型报错

例如`__dirname`, `path` 等会提示错误

解决方法： 需要手动下载 @types/node 包声明类型, 然后重启编辑器

`npm install @types/node -D`
