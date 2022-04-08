---
title: Pinia 与 Vuex
date: 2022-04-08
categories:
  - vue
tags:
  - vue
---

:::tip

**Pinia** API 与 **Vuex** ≤4 有很大不同，即：

- `mutations `不再存在。他们经常被认为是 非常 冗长。他们最初带来了 `devtools `集成，但这不再是问题。
- 无需创建自定义复杂包装器来支持 `TypeScript`，所有内容都是类型化的，并且 `API `的设计方式尽可能利用 TS 类型推断。

- 不再需要注入、导入函数、调用函数、享受自动完成功能！

- 无需动态添加 `Store`，默认情况下它们都是动态的，您甚至都不会注意到。请注意，您仍然可以随时手动使用 `Store `进行注册，但因为它是自动的，您无需担心。

- 不再有 `modules` 的嵌套结构。您仍然可以通过在另一个 `Store` 中导入和 使用 来隐式嵌套 `Store`，但 `Pinia` 通过设计提供平面结构，同时仍然支持 Store 之间的交叉组合方式。 您甚至可以拥有 Store 的循环依赖关系。

- 没有 命名空间模块。鉴于 `Store `的扁平架构，“命名空间” `Store `是其定义方式所固有的，您可以说所有 `Store `都是命名空间的。

  ...

  简单来说比`Vuex`简单且好用 = =

:::

## 关于安装

<p style="color:#42b983;font-weight:bold"> Vuex</p>

```js
// store/index.js
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex); //将状态从根组件“注入”到每一个子组件中
const store = new Vuex.Store({
  module: {},
  getters: {},
});
export default store;

// main.js
import Vue from "vue";
import store from "./store";
new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
```

<p style="color:#ffcf49;font-weight:bold"> Pinia</p>

```js
// store/counter.js
import { defineStore } from "pinia";
export const useCounterStore = defineStore({
  id: "counter",
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});

// main.js
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
createApp(App).use(createPinia()).mount("#app");
```

<hr>

## Vuex--State

&emsp;&emsp;<span style="color:#42b983;font-weight:bold"> Vuex</span> 使用**单一状态树**——是的，用一个对象就包含了全部的应用层级状态。至此它便作为一个“唯一数据源 ([SSOT](https://en.wikipedia.org/wiki/Single_source_of_truth))”而存在。这也意味着，每个应用将仅仅包含一个 `store `实例。在`vuex`中，更改 `Vuex `的 `store `中的状态的唯一方法是提交 `mutation`，虽然直接去调用`$store.state`也可以修改状态，但是在`devtool`中无法跟踪到状态的变化，且在严格模式下会报错。

- 使用 `mapState`辅助函数或者直接调用`$store`去获取状态

```js
// mapState
import { mapState } from 'vuex'
computed: {
    ...mapState({
        user: state => state.user
        // user: 'user'
    })
},
// this.$store
createad() {
    console.log(this.$store.user)
},
```

## Pinia--State

&emsp;&emsp;在 <span style="color:#ffcf49;font-weight:bold"> Pinia</span >中，状态被定义为返回初始状态的函数。我们可以直接调用该`实例.state`去修改状态。

```js
import { defineStore } from "pinia";

const useStore = defineStore("storeId", {
  // 推荐使用 完整类型推断的箭头函数
  state: () => {
    return {
      // 所有这些属性都将自动推断其类型
      counter: 0,
      name: "Eduardo",
      isAdmin: true,
    };
  },
});
```

&emsp;&emsp;使用

- 直接使用`state`更改

```html
<script setup>
  import { useStore } from "@/store/counter";
  const store = useSotre();
  console.log(store.counter);
  store.counter++;
</script>
```

- 使用`$patch`更改

```html
<script setup>
  import { useStore } from "@/store/counter";
  const store = useSotre();
  // 对象形式
  store.$patch({
    counter: store.counter + 1,
    name: "Abalam",
  });
  //函数形式
  store.$patch((state) => {
    state.name = "Tony";
    state.counter++;
    state.items.push({ name: "test", age: 18 });
  });
</script>
```

&emsp;&emsp;这里的主要区别是`$patch()` 允许您将批量更改的日志写入开发工具中的一个条目中。 注意**两者，`state` 和 `$patch()` 的直接更改都出现在 devtools** 中，并且可以进行 `time travelled`（在 `Vue 3` 中还没有）。

&emsp;&emsp;**`$state`** 直接替换状态

&emsp;&emsp;您可以通过将其 `$state` 属性设置为新对象来替换 `Store `的整个状态：

```JS
store.$state = { counter: 666, name: 'Paimon' }
```

<hr>

## Vuex--Getters

<span style="color:#42b983;font-weight:bold"> &emsp;&emsp;Vuex</span> 允许我们在 `store` 中定义“`getter`”（可以认为是 `store `的计算属性）。就像计算属性一样，`getter `的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: "...", done: true },
      { id: 2, text: "...", done: false },
    ],
  },
  getters: {
    doneTodos: (state) => {
      return state.todos.filter((todo) => todo.done);
    },
  },
});
```

&emsp;&emsp;访问 Getters:

- 通过属性访问

```js
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```

- 通过方法访问

&emsp;&emsp;你也可以通过让 `getter `返回一个函数，来实现给 `getter `传参。在你对 store 里的数组进行查询时非常有用。

```js
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find((todo) => todo.id === id);
  };
}
```

```js
store.getters.getTodoById(2); // -> { id: 2, text: '...', done: false }
```

&emsp;&emsp;`getter `在通过方法访问时，每次都会去进行调用，而不会缓存结果

- 使用 mapGetters 辅助函数 , 方法如`mapState`

## Pinia--Getters

&emsp;&emsp;<span style="color:#ffcf49;font-weight:bold"> Pinia</span >中 Getter 完全等同于 Store 状态的 [计算值](https://v3.vuejs.org/guide/reactivity-computed-watchers.html#computed-values)。 它们可以用 `defineStore()` 中的 `getters` 属性定义。 他们接收“状态”作为第一个参数**以鼓励**箭头函数的使用：

```js
export const useStore = defineStore("main", {
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
});
```

- 没有`setup()`的时候可以使用 [previous section of state](https://pinia.web3doc.top/core-concepts/state.html#options-api) 中使用的相同 `mapState()` 函数映射到 `getter`。

```js
import { mapState } from 'pinia'
import { useCounterStore } from '../stores/counterStore'

export default {
  computed: {
    // 允许访问组件内的 this.doubleCounter
    // 与从 store.doubleCounter 中读取相同
    ...mapState(useCounterStore, ['doubleCount'])
    // 与上面相同，但将其注册为 this.myOwnName
    ...mapState(useCounterStore, {
      myOwnName: 'doubleCounter',
      // 您还可以编写一个访问 store 的函数
      double: store => store.doubleCount,
    }),
  },
}
```

<hr>

## Vuex--Mutation

&emsp;&emsp;更改 <span style="color:#42b983;font-weight:bold"> Vuex</span> 的 `store `中的状态的唯一方法是提交 `mutation`。`Vuex `中的 `mutation `非常类似于事件：每个 `mutation `都有一个字符串的 **事件类型 (type)** 和 一个 **回调函数 (handler)**。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 `state `作为第一个参数：

```js
const store = new Vuex.Store({
  state: {
    count: 1,
  },
  mutations: {
    increment(state, payload) {
      // 变更状态
      state.count += payload.amount;
    },
  },
});
```

- 使用`commit`触发 mutation

```js
store.commit("increment", {
  amount: 10,
});

// 对象风格提交
store.commit({
  type: "increment",
  amount: 10,
});
```

- 使用`mapMutations`辅助函数将组件中的 `methods `映射为 `store.commit` 调用

```js
import { mapMutations } from "vuex";

export default {
  // ...
  methods: {
    ...mapMutations([
      "increment", // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      "incrementBy", // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: "increment", // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    }),
  },
};
```

&emsp;&emsp;一条重要的原则就是要记住 **mutation 必须是同步函数**。为什么？请参考下面的例子：

```js
mutations: {
  someMutation (state) {
    api.callAsyncMethod(() => {
      state.count++
    })
  }
}
```

&emsp;&emsp;现在想象，我们正在 `debug `一个 `app `并且观察 `devtool `中的 `mutation `日志。每一条 `mutation `被记录，`devtools `都需要捕捉到前一状态和后一状态的快照。然而，在上面的例子中 `mutation `中的异步函数中的回调让这不可能完成：因为当 `mutation `触发的时候，回调函数还没有被调用，`devtools `不知道什么时候回调函数实际上被调用——实质上任何在回调函数中进行的状态的改变都是不可追踪的。

## Pinia--~~Mutation~~

&emsp;&emsp;<span style="color:#ffcf49;font-weight:bold"> Pinia</span > 中 `mutations `不再存在。他们经常被认为是 非常 冗长。他们最初带来了 devtools 集成，但这不再是问题。方法统一使用`Actions`

<hr>

## Vuex--Actions

&emsp;&emsp;**Action** 类似于 `mutation`，不同在于：

- **Action** 提交的是 `mutation`，而不是直接变更状态。
- **Action** 可以包含任意异步操作。

```js
const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  actions: {
    increment(context) {
      context.commit("increment");
    },
    // 使用解构简化代码
    increment({ commit }) {
      commit("increment");
    },
  },
});
```

&emsp;&emsp;`Action `函数接受一个与 `store `实例具有相同方法和属性的 `context `对象，因此你可以调用 `context.commit` 提交一个 `mutation`，或者通过 `context.state` 和 `context.getters` 来获取 `state `和 `getters`。

- 使用 store.dispatch 触发`action`, 方法类似` store.commit`
- `mapActions` 辅助函数将组件的 `methods `映射为 `store.dispatch` 调用

```js
import { mapActions } from "vuex";

export default {
  // ...
  methods: {
    ...mapActions([
      "increment", // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      "incrementBy", // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: "increment", // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    }),
  },
};
```

## Pinia--Actions

&emsp;&emsp;在<span style="color:#ffcf49;font-weight:bold"> Pinia</span > 中，Actions 相当于组件中的 [methods](https://v3.vuejs.org/guide/data-methods.html#methods)。 它们可以使用 `defineStore()` 中的 `actions` 属性定义，并且**它们非常适合定义业务逻辑**：

```js
import { useAuthStore } from "./auth-store";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    // ...
  }),
  actions: {
    async fetchUserPreferences(preferences) {
      const auth = useAuthStore();
      if (auth.isAuthenticated) {
        this.preferences = await fetchPreferences();
      } else {
        throw new Error("User must be authenticated");
      }
    },
  },
});
```

&emsp;&emsp;与 [getters](https://pinia.web3doc.top/core-concepts/getters.html) 一样，操作可以通过 `this` 访问 _whole store instance_ 并提供**完整类型（和自动完成 ✨）支持**。 **与它们不同，`actions` 可以是异步的**，您可以在其中`await` 任何 API 调用甚至其他操作！

## 一个 Pinia🌰

```js
import { defineStore } from "pinia";

export const todos = defineStore("todos", {
  state: () => ({
    /** @type {{ text: string, id: number, isFinished: boolean }[]} */
    todos: [],
    /** @type {'all' | 'finished' | 'unfinished'} */
    filter: "all",
    // type 会自动推断为 number
    nextId: 0,
  }),
  getters: {
    finishedTodos(state) {
      // 自动完成! ✨
      return state.todos.filter((todo) => todo.isFinished);
    },
    unfinishedTodos(state) {
      return state.todos.filter((todo) => !todo.isFinished);
    },
    /**
     * @returns {{ text: string, id: number, isFinished: boolean }[]}
     */
    filteredTodos(state) {
      if (this.filter === "finished") {
        // 自动调用其他 getter ✨
        return this.finishedTodos;
      } else if (this.filter === "unfinished") {
        return this.unfinishedTodos;
      }
      return this.todos;
    },
  },
  actions: {
    // 任何数量的参数，返回一个 Promise 或者不返回
    addTodo(text) {
      // 你可以直接改变状态
      this.todos.push({ text, id: this.nextId++, isFinished: false });
    },
  },
});
```
