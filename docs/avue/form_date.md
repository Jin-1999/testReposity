---
title: form中的各种时间类型
---

:::tip
包括简单的时间， 时间区间， 时间格式等。
:::

简单的时间类型,表格上方搜索位置, 格式：年月日

```js
{
    label: '时间',
    prop: 'createDate',
    type: 'date',
    format: 'yyyy-MM-dd',
    valueFormat: 'yyyy-MM-dd',
    search:slot,
    searchSpan: 6,
    searchLabelWidth: 100,
},
```
