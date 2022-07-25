### 1.

案件查询弹窗修改为单独的 tab 页面
多个弹窗 => 多个 tab 页面

动态路由

1、 点击查看的时候 => 路由上添加 id => 到相应界面 => 根据 ID 请求接口获取内容 => 渲染界面
2、 添加相应标签（tab）， 在路由钩子进入之前， 将要进入的路由通过 add_tag 添加到 vuex 里面的 taglist 里面

```js
store.commit("ADD_TAG", {
  label: label,
  value: value,
  params: to.params,
  query: to.query,
  meta: (() => {
    if (!i18n) {
      return meta;
    }
    return {
      i18n: i18n,
    };
  })(),
  group: router.$avueRouter.group || [],
});
```

3、点击相应的 tag 标签 变化路由 跳转到相应的界面
