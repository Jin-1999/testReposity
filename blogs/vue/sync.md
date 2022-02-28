---
title: Vue中组件双向绑定
date: 2022-02-28
categories:
  - vue
tags:
  - vue
---

:::tip

​ 在`Vue`项目进行组件通信时，经常出现组件某些属性要双向绑定的情况。在`Vue`单向数据流的情况下，记录一些实现的方法。（数据向下，方法向上）

:::

### **.sync**

&emsp;&emsp;推荐使用<span style="color:red"> .sync </span>语法糖。

🌰：实现子组件的显示隐藏

```html
<!-- 父组件 -->
<child visible.sync="visible" />
<button @click="visible = true"></button>

<!-- sync的语法糖 -->
<child :visible="visible" @update:visible="(val) => (visible = val)" />
<script>
  export default {
    data() {
      return {
        visible: false,
      };
    },
  };
</script>
```

```html
<!-- 子组件 -->
<el-dialog visible="visible"></el-dialog>
<button @click="fn"></button>
<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      fn() {
        this.emit("update:visible", false);
      },
    },
  };
</script>
```

### **v-model**

&emsp;&emsp;第二种方法使用<span style="color:red"> v-model </span>指令。`v-model`实际上是一个`v-bind:value`和`v-on:input`合起来的语法糖。

```html
<!-- 以下两者效果一致 -->
<input v-model="num" />
<input :value="num" @input="num = $event.target.value" />
```

&emsp;&emsp;在`Vue2.0`中，提供了`model`属性可以让用户自定义**传值的 prop 名**和**更新值的事件名**。默认值如下：

```js
// 默认的 model 属性
export default {
  model: {
    prop: "value",
    event: "input",
  },
};
```

&emsp;&emsp;修改`model`属性默认值 可以让我们进行组件通信中的双向绑定，🌰：

```html
<!-- 父组件 -->
<child v-model="visible" />
<button @click="visible = true"></button>

<script>
  export default {
    data() {
      return {
        visible: false,
      };
    },
  };
</script>
```

```html
<!-- 子组件 -->
<el-dialog visible="visible"></el-dialog>
<button @click="fn"></button>
<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
    },
    model: {
      prop: "visible",
      event: "update",
    },
    methods: {
      fn() {
        this.emit("update", false);
      },
    },
  };
</script>
```
