---
title: form中的select类型
---

:::tip
avue 表单的 select 类型基本用法。
:::

1、使用 dicUrl

返回数组内字段为 dicValue, dicKey 所以要用 props 重新设置一下

```js
{
  label: "状态",
  prop: "status",
  type: "select",
  dicUrl: "/api/blade-system/dict/dictionary?code=status",
  props: {
    label: "dictValue",
    value: "dictKey",
  },
  dataType: "number",
  rules: [
    {
      required: true,
      message: "请选择状态",
      trigger: "blur",
    },
  ],
}
```

2、使用 dicData

```js
{
  label: "状态",
  prop: "status",
  type: "select",
  dicData:[
    {
      label:'启用',
      value:1
    },
    {
      label:'禁止',
      value:0
    }
  ],
  dataType: "number",
  rules: [
    {
      required: true,
      message: "请选择状态",
      trigger: "blur",
    },
  ],
}
```
