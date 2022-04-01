---
title: form中的select类型
---

:::tip
avue 表单的 select 类型基本用法。
:::

使用 dicUrl

```js
option: {
  column: [
    {
      label: "状态",
      prop: "status",
      type: "select",
      dicUrl: "/api/blade-system/dict/dictionary?code=appUserLis_status",
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
    },
  ];
}
```
