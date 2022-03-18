---
title: vue中实现动态路由
date: 2022-03-18
categories:
  - vue
tags:
  - vue
---

## **插件**

&emsp;&emsp;插件通常用来为 `Vue `添加全局功能。插件的功能范围没有严格的限制——一般有下面几种：

1. 添加全局方法或者 property。如：[vue-custom-element](https://github.com/karol-f/vue-custom-element)
2. 添加全局资源：指令/过滤器/过渡等。如 [vue-touch](https://github.com/vuejs/vue-touch)
3. 通过全局混入来添加一些组件选项。如 [vue-router](https://github.com/vuejs/vue-router)
4. 添加 Vue 实例方法，通过把它们添加到 `Vue.prototype` 上实现。
5. 一个库，提供自己的 API，同时提供上面提到的一个或多个功能。如 [vue-router](https://github.com/vuejs/vue-router)

### **使用插件**

&emsp;&emsp;通过全局方法<code style="color:red">Vue.use()</code>使用插件。它需要在你调用 <code style="color:red">new Vue()</code> 启动应用之前完成：例如

```js
// 调用 `MyPlugin.install(Vue)`
Vue.use(MyPlugin);

new Vue({
  // ...组件选项
});
```

&emsp;&emsp;也可以传入一个可选的选项对象：

```js
Vue.use(MyPlugin, { someOption: true });
```

### **开发插件**

&emsp;&emsp;Vue.js 的插件应该暴露一个 <code style="color:red">install</code> 方法。这个方法的第一个参数是 <code style="color:red">Vue</code> 构造器，第二个参数是一个可选的选项对象：

```js
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或 property
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}
```

## **实现动态路由**

:::tip

动态路由一般用于具备权限管理的后台系统，一般有如下两种方式

1. 纯前端代码控制，根据用户角色分配不同的路由。
2. 实现一个菜单界面和权限控制界面，总管理员可以进行菜单配置和权限配置传至后端，在登录的时候从接口获取当前用户角色的路由表，动态添加路由信息

:::

### **addRoutes**

```js
router.addRoutes(routes: Array<RouteConfig>)
```

&emsp;&emsp;动态添加更多的路由规则。参数必须是一个符合 `routes` 选项要求的数组。

### **addRoute**

&emsp;&emsp;看了下文档尴尬的是，`router.addRoutes`的方法已经给废弃了，使用了<code style="color:red">router.addRoute()</code>来替代，<code style="color:red">router.addRoute()</code>方法用于添加一条新路由规则。如果该路由规则有 `name`，并且已经存在一个与之相同的名字，则会覆盖它。

```
router.addRoutes(routes: Array<RouteConfig>)
```

### **路由数据**

&emsp;&emsp;例如我们从接口获取到如下数据，两个路由--权限管理和菜单管理，其下都有子路由。

```json
{
    "id": "1123598815738675307",
    "parentId": "0",
    "code": "authority",
    "name": "权限管理",
    "alias": "menu",
    "path": "/authority",
    "source": "iconfont icon-bofangqi-suoping",
    "sort": 98,
    "category": 1,
    "action": 0,
    "isOpen": 1,
    "remark": "",
    "isDeleted": 0,
    "children": [
        {
            "id": "1123598815738675308",
            "parentId": "1123598815738675307",
            "code": "role",
            "name": "角色管理",
            "alias": "menu",
            "path": "/authority/role",
            "source": "iconfont iconicon_boss",
            "sort": 1,
            "category": 1,
            "action": 0,
            "isOpen": 1,
            "remark": "",
            "isDeleted": 0,
            "hasChildren": false,
            "parentName": "",
            "categoryName": "",
            "actionName": "",
            "isOpenName": ""
        }
    ],
    "hasChildren": false,
    "parentName": "",
    "categoryName": "",
    "actionName": "",
    "isOpenName": ""
},
{
    "id": "1123598815738675203",
    "parentId": "0",
    "code": "system",
    "name": "系统管理",
    "alias": "menu",
    "path": "/system",
    "source": "iconfont iconicon_setting",
    "sort": 99,
    "category": 1,
    "action": 0,
    "isOpen": 1,
    "remark": "",
    "isDeleted": 0,
    "children": [
        {
            "id": "1123598815738675207",
            "parentId": "1123598815738675203",
            "code": "menu",
            "name": "菜单管理",
            "alias": "menu",
            "path": "/system/menu",
            "source": "iconfont iconicon_subordinate",
            "sort": 97,
            "category": 1,
            "action": 0,
            "isOpen": 1,
            "remark": "",
            "isDeleted": 0,
            "hasChildren": false,
            "parentName": "",
            "categoryName": "",
            "actionName": "",
            "isOpenName": ""
        },
        {
            "id": "1123598815738675206",
            "parentId": "1123598815738675203",
            "code": "dict",
            "name": "系统字典",
            "alias": "menu",
            "path": "/system/dict",
            "source": "iconfont iconicon_addresslist",
            "sort": 98,
            "category": 1,
            "action": 0,
            "isOpen": 1,
            "remark": "",
            "isDeleted": 0,
            "hasChildren": false,
            "parentName": "",
            "categoryName": "",
            "actionName": "",
            "isOpenName": ""
        },
    ],
    "hasChildren": false,
    "parentName": "",
    "categoryName": "",
    "actionName": "",
    "isOpenName": ""
}
```

### **路由插件**

&emsp;&emsp;新建一个文件去写路由插件，如下：

```js
//router-plugin.js
let RouterPlugin = function () {
  this.$router = null;
  this.$store = null;
};
RouterPlugin.install = function (vue, router, store, i18n) {
  this.$router = router;
  this.$router.$routerPlugin = {
    formatRoutes: function (aMenu = []) {
      if (aMenu.length === 0) return;
      const routes = [];
      for (let i = 0; i < aMenu.length; i++) {
        const menuItem = aMenu[i];
        let { path, component, name, icon, children, meta } = menuItem;
        const isChild = children.length !== 0; //判断是否由子路由
        //书写单个路由
        const routesItem = {
          path,
          name,
          icon,
          meta,
          component(resolve) {
            // 判断是否为首路由
            if (first) {
              require(["../page/index"], resolve);
              return;
              // 判断是否有下级路由
            } else if (isChild && !first) {
              require(["../page/index/layout"], resolve);
              return;
            } else {
              require([`../${component}.vue`], resolve);
            }
          },
          redirect: (() => {
            if (!isChild && first && !isURL(path)) return `${path}/index`;
            return "";
          })(),
          children: !isChild
            ? // 无子路由
              []
            : // 有子路由
              (() => {
                return this.formatRoutes(children, false);
              })(),
        };
        routes.push(routesItem);
      }
      // 到这里获取到动态的路由表
    },
  };
};
export default RouterPlugin;
```

### **创建路由实例**

&emsp;&emsp;新建一个`router.js`文件用于书写。

```js
// router.js
import Vue from "vue";
import VueRouter from "vue-router";
import PageRouter from "./page/"; // 404 500 403 登录页...
import ViewsRouter from "./views/"; // 初始公共的一些界面
import RouterPlugin from "./router-plugin"; //封装的路由控制方法
import Store from "../store/"; // vuex
Vue.use(VueRouter);
const createRouter = () =>
  new VueRouter({
    routes: [...PageRouter, ...ViewsRouter],
  });
const Router = createRouter(); // 获得 router 实例
RouterPlugin.install(Vue, Router); // 初始化插件
Router.RouterPlugin.formatRoutes(Store.state.user.menuAll, true); // 初始化路由，从vuex获取路由表
Router.addRoutes([...PageRouter, ...ViewsRouter]); //动态添加路由
export default Router;
```

### **使用路由插件**

&emsp;&emsp;`main.js`中使用封装好的路由插件：

```JS
import router from './router/router';
Vue.use(router)
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
```
