---
title: element中下拉框最后一级显示不全
date:  2022-02-09
categories:
 - vue
tags:
 - vue
 - error
---

:::tip

今天开发新项目的时候发现，`element`的下拉框以及级联下拉的时候，最后一行显示不全, 检查后发现其`el-scrollbar__wrap`该`dom`由于要隐藏滚动条有了如下代码：`margin-bottom: -19px;margin-right:-19px`, 其中`margin-bottom`值令我们最后一行显示不全。

:::


解决办法：

由于在`element`的下拉框直接挂载在`body`上，我们直接在`app.vue`中加入如下代码：

```css
.el-select-dropdown .el-scrollbar .el-scrollbar__wrap {
    margin-bottom: 0 !important;
}
.el-cascader__dropdown .el-scrollbar .el-scrollbar__wrap {
    margin-bottom: 0 !important;
}
```

