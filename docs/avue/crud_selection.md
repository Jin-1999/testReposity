---
title: crud中的多选行
---

:::tip
用于多选行的操作
:::

```html
<!-- 当选择项发生变化时会触发该事件 -->
<avue-crud ref="crud" @selection-change="selectionChange" ...> </avue-crud>
```

```js
option:{
    selection:true, //多选列显隐
},
selectionList:[]

computed:{
    ids(){
        return this.selectionList.map(v=>v.id)
    }
}
methods:{
    selectionChange(list) {
        this.selectionList = list;
    }
}

```
