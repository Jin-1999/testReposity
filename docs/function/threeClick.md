---
title: threeClick
date: 0000-00-00
---

:::tip

​ 在规定时间内连续点击三次的事件

:::

```js
function threeClick() {
  let timer,
    num = 0,
    btn = document.querySelector(".btn");
  if (btn) {
    btn.addEventListener("click", () => {
      if (num < 2) {
        if (timer) clearTimeout(timer);
        num++;
        timer = setTimeout(() => {
          num = 0;
        }, 350);
      } else if (num == 2) {
        console.log("点击三次");
      }
    });
  }
}
```
