---
title: vue自定义指令使用
date: 2022-06-24
categories:
  - vue
tags:
  - vue
---

## 给表格搜索组件增加伸缩功能

```js
Vue.directive("shrink", {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    const ele = el.querySelector(".avue-crud__search");
    const ch = ele.clientHeight;
    const cw = ele.clientWidth;
    ele.style.position = "relative";
    ele.style.overflow = "hidden";
    ele.style.height = ch + "px";
    ele.style["transition-property"] = "height padding-top";
    ele.style["transition-duration"] = "1s";
    ele.style["transition-timing-function"] = "ease-in-out";
    const i = document.createElement("i");
    i.className = "el-icon-arrow-up";
    i.innerText = "收缩功能组件";
    i.style = `cursor:pointer;position:absolute;right:${cw / 2}px;bottom:0`;
    i.addEventListener("click", () => {
      if (i.className === "el-icon-arrow-up") {
        ele.style.height = 0;
        ele.style["padding-top"] = 20 + "px";
        i.className = "el-icon-arrow-down";
        i.innerText = "展开功能组件";
      } else {
        ele.style.height = ch + "px";
        ele.style["padding-top"] = 0;
        i.className = "el-icon-arrow-up";
        i.innerText = "收缩功能组件";
      }
    });
    ele.appendChild(i);
  },
});
```
