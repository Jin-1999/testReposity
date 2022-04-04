---
title: avue-curd 大部分情况下模板
---

```html
<avue-crud
  v-model="curdData"
  v-loading="loading"
  :option="option"
  :data="data"
  @on-load="onLoad"
>
  <template slot="prop1Search">
    <!-- 表格搜索自定义 -->
  </template>

  <template slot="prop2" slot-scope="{ row }">
    <!-- 表格自定义 -->
  </template>
</avue-crud>
```

```js
column: [
  {
    label: "exp1",
    prop: "prop2",
    search: true,
    searchslot: true,
  },
  {
    label: "exp2",
    prop: "prop2",
    slot: true,
  },
];
```
