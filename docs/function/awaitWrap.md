---
title: awaitWrap
date: 2022-01-02
---

:::tip
减少`async await`中`try catch`的使用次数
:::

```js
const awaitWrap = (promise) => {
  return promise
    .then((data) => {
      console.log("awaitWrap data:", data);
      return [null, data];
    })
    .catch((err) => {
      console.log("awaitWrap err:", err);
      return [err, null];
    });
};

let [err, data] = await awaitWrap(this.getData());
```
