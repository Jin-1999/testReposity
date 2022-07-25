---
title: vue3初体验
date: 2022-02-09
categories:
  - vue
tags:
  - vue
---

# 部分新特性

:::tip

全部特性查看[vue3 文档](https://v3.cn.vuejs.org/api/basic-reactivity.html)

:::

## createApp

&emsp;&emsp;在`Vue3`中，改变全局`Vue`行为的 Api 现在被移动到了由`createApp`方法所创建的应用实例上。

```javascript
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// createApp渲染函数将 template 转化为 html
createApp(App).use(router).use(store).mount("#app");
```

## setup

&emsp;&emsp;`vue3`专门为组件创建的新函数用于预设配置。在`beforeCreated`之前被调用，在初始化 props 后。

&emsp;&emsp;**`setup()`函数中无法访问到`this`**

&emsp;&emsp;使用`setup`函数的时候，接收两个参数

- props

- context

  ### props

`setup` 函数中的第一个参数是 `props`。正如在一个标准组件中所期望的那样，`setup` 函数中的 `props` 是响应式的，当传入新的 prop 时，它将被更新。

```typescript
export default {
  props: {
    title: String,
  },
  setup(props) {
    console.log(props.title);
  },
};
```

### context

传递给 `setup` 函数的第二个参数是 `context`。`context` 是一个普通 JavaScript 对象(**不是响应式的)**，暴露了其它可能在 `setup` 中有用的值：

```typescript
export default {
  setup(props, context) {
    // Attribute (非响应式对象，等同于 $attrs)
    console.log(context.attrs);

    // 插槽 (非响应式对象，等同于 $slots)
    console.log(context.slots);

    // 触发事件 (方法，等同于 $emit)
    console.log(context.emit);

    // 暴露公共 property (函数)
    console.log(context.expose);
  },
};
```

执行 `setup` 时，只能访问以下 property：

- `props`
- `attrs`
- `slots`
- `emit`

## ref

&emsp;&emsp; `ref()`函数将给定的值创建一个响应式的对象。`ref()`函数调用的返回值为一个对象，**该对象只包含一个`value`属性。**

```javascript
import { ref } from 'vue'
...
setup() {
	let num = ref(10)
	return {num}
}
```

## reactive

&emsp;&emsp;该函数返回一个对象的响应式副本。

&emsp;&emsp;响应式转换是“深层”的——它影响所有嵌套 `property`。在基于 [ES2015 Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 的实现中，返回的 `proxy `是**不**等于原始对象的。建议只使用响应式 `proxy`，避免依赖原始对象。

```javascript
import { ref, reactive } from 'vue'
...
setup() {
	let num = ref(10)
    let obj = reactive({
        name:'test',
        date:'2020-12-12'
        num
    })
    console.log(num.value === obj.num) // true
	return {num, obj}
}
```

**&emsp;&emsp;值得注意的是：当将 [ref](https://v3.cn.vuejs.org/api/refs-api.html#ref) 分配给 `reactive` property 时，ref 将被自动解包。** `ref`用于基本数据类型， `reactive`用于复杂数据类型。

## volar 替代 vetur

之前的 vetur 在 vue3 项目中会有一些报错， 在 vue3 是用使用 volar
