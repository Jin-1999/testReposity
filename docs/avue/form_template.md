---
title: avue-form 大部分情况下模板
---

```html
<avue-form v-model="form" :option="option" @submit="submit">
  <template slot-scope="scope" slot="menuForm">
    <el-button @click="cancel">取消</el-button>
  </template>
  <template slot="prop1"> </template>
</avue-form>
```

```js
option:{
    emptyBtn:false,
    column:[
        {
            label:'exp1',
            prop:'prop1',
            formslot:true
        }
    ]
}
```
