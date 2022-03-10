---
title: avue-tabs手动触发tab切换方法
date: 2022-03-01
categories:
  - avue
tags:
  - avue
---

:::tip

​ avue 文档并未讲解手动触发 tabs 变换的方法，今天遇到个需求特定条件下进入该界面，tab 栏切换至第三栏，记录一下方法。

:::

方法：

`this.refs.tabs.changeTabs(index)`

过程：

**1.查看组件**

&emsp;&emsp;给组件加上`ref="tabs"`, 然后打印一下`this.$refs.tabs`，如下，观察后发现`changeTabs`方法应该是`tab`切换的方法。

```json
$attrs: （…）
$children: [a]
$createElement: ƒ (e,n,r,i)
$el: div.avue-tabs
$listeners: （…）
$options: {parent: a, _parentVnode: pe, propsData: {…}, _parentListeners: {…}, _renderChildren: undefined, …}
$parent: a {_uid: 4063, _isVue: true, $options: {…}, _renderProxy: a, _self: a, …}
$refs: {form: Array(3)}
$root: wn {_uid: 4, _isVue: true, $options: {…}, _renderProxy: wn, _self: wn, …}
$scopedSlots: {$stable: true, $key: undefined, $hasNormal: false}
$slots: {}
$store: s {_committing: false, _actions: {…}, _actionSubscribers: Array(0), _mutations: {…}, _wrappedGetters: {…}, …}
$vnode: pe {tag: 'vue-component-121-avue-tabs', data: {…}, children: undefined, text: undefined, elm: div.avue-tabs, …}
active: （…）
b: ƒ ()
changeTabs: ƒ ()
clearValidate: ƒ ()
form: Object
resetForm: ƒ ()
setVal: ƒ ()
submit: ƒ ()
tableOption: Object
tabsForm: Object
validate: ƒ ()
_c: ƒ (e,n,r,i)
_computedWatchers: {tabsPropOptiom: fn, tabsObjOption: fn, tabsObj: fn, parentOption: fn, columnOption: fn, …}
_data: {__ob__: we}
_directInactive: false
_events: {change: Array(1), submit: Array(1), input: Array(1)}
_hasHookEvent: false
_i18n: VueI18n {_vm: wn, _formatter: BaseFormatter, _modifiers: {…}, _missing: null, _root: null, …}
_inactive: null
_isBeingDestroyed: false
_isDestroyed: false
_isMounted: true
_isVue: true
...
```

**2.查看方法**

```js
// 查看该方法
changeTabs: function(t) {
    this.active = t + ""
},
// 往上查看active发现为0，推测active应为索引值
data: function() {
    return {
        form: {},
        tabsForm: {},
        active: "0",
        tableOption: {}
    }
},
```

**3.尝试方法**

&emsp;&emsp;监听路由参数是否带有`isFromMsg`, 是的话切换至第三个`tab`

```JS
watch: {
    $route: {
        handler(newVal) {
            if (newVal) {
                const { isMessage } = newVal.params;
                if (!isMessage) return;
                this.$nextTick(() => {
                   this.$refs.tabs.changeTabs(2);
                });
            }
        },
        deep: true,
        immediate: true
    }
},
```
