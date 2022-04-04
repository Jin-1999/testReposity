---
title: form中的各种时间类型
---

:::tip
包括简单的时间， 时间区间， 时间格式等。
:::

简单的时间类型,表格上方搜索位置, 格式：年月日

```js
{
    label: "时间",
    prop: "createDate",
    type: "date",
    format: "yyyy-MM-dd",
    valueFormat: "yyyy-MM-dd",
    search: true,
    searchSpan: 6,
    searchLabelWidth: 100,
},
```

时间区间形式, 第一项默认为当天 00:00:00, 第二项默认为 23:59:59, 格式：年月日时分秒

```js
{
    label: "时间",
    prop: "createDate",
    type: "datetime",
    search: true,
    searchRange: true,
    format: "yyyy-MM-dd HH:mm:ss",
    valueFormat: "yyyy-MM-dd HH:mm:ss",
    defaultTime: ["00:00:00", "23:59:59"],
},
```
