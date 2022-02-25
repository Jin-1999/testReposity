---
title: canvas 实现背景水印
date: 2022-02-25
categories:
- js
tags:
- canvas
---


```js
// 添加水印
const setWaterMark = (str1, str2, str3) => {
  let id = fn(str1, str2, str3);
  if (document.getElementById(id) === null) {
    id = fn(str1, str2, str3);
  }
};

// 移除水印
const removeWaterMark = () => {
  let id = "1.23452384164.123412415";
  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id));
  }
};

// 水印添加方法
let fn = (str1, str2, str3) => {
  let id = "1.23452384164.123412415";
  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id));
  }
  let can = document.createElement("canvas");
  // 设置canvas画布大小
  can.width = 400;
  can.height = 200;

  let cans = can.getContext("2d");
  cans.rotate((-20 * Math.PI) / 180); // 水印旋转角度
  cans.font = "24px 黑体";
  cans.fillStyle = "#666666";
  cans.textAlign = "center";
  cans.textBaseline = "Middle";
  cans.fillText(str1, can.width / 2, can.height); // 水印在画布的位置x，y轴
  cans.fillText(str2, can.width / 2, can.height + 22);
  cans.fillText(str3, can.width / 2, can.height + 44);

  let div = document.createElement("div");
  div.id = id;
  div.style.pointerEvents = "none";
  div.style.top = "40px";
  div.style.left = "0px";
  div.style.opacity = "0.15";
  div.style.position = "fixed";
  div.style.zIndex = "100000";
  div.style.width = document.documentElement.clientWidth + "px";
  div.style.height = document.documentElement.clientHeight + "px";
  div.style.background =
    "url(" + can.toDataURL("image/png") + ") left top repeat";
  document.body.appendChild(div);
  return id;
};
```
