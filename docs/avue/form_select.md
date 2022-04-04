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

3、省市区 级联效果 （三个独立下拉框） 利用`cascaderItem`关联

```js
column: [
  {
    label: "省",
    prop: "province",
    type: "select",
    labelWidth: 40,
    span: 4,
    hide: true,
    search: false,
    dicUrl: `/api/address/selectByPid/368100107951677440`,
    dicMethod: "get",
    props: {
      label: "name",
      value: "id",
    },
    cascaderItem: ["city", "area"],
  },
  {
    label: "市",
    prop: "city",
    type: "select",
    labelWidth: 40,
    span: 4,
    hide: true,
    dicMethod: "get",
    dicUrl: `/api/address/selectByPid/{{key}}`,
    props: {
      label: "name",
      value: "id",
    },
  },
  {
    label: "区",
    prop: "area",
    type: "select",
    labelWidth: 40,
    span: 4,
    hide: true,
    dicMethod: "get",
    dicUrl: `/api/address/selectByPid/{{key}}`,
    props: {
      label: "name",
      value: "id",
    },
  },
];
```
