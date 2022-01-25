---
title: canvas
date: 2021-08-26
categories:
  - js
tags:
  - canvas
---

## 概念

&emsp;&emsp;`<canvas>` 是 HTML5 新增的元素，可用于通过使用 JavaScript 中的脚本来绘制图形。例如，它可以用于绘制图形、制作照片、创建动画，甚至可以进行实时视频处理或渲染。

&emsp;&emsp;`<canvas>` 只是一个画布，本身并不具有绘图的能力，绘图必须使用 JavaScript 等脚本语言。可以认为`canvas`只是一块画布，Javascript 是画笔。

&emsp;&emsp;`canvas`只有两个属性， width 和 height。如果不给 `<canvas>` 设置 `widht、height` 属性时，则默认 `width`为 300、`height` 为 150，单位都是 `px`。也可以使用 `css` 属性来设置宽高，但是如宽高属性和初始比例不一致，他会出现扭曲。所以，建议永远不要使用 `css` 属性来设置 `<canvas>` 的宽高。

## 矩形

&emsp;&emsp;`canvas` 提供了三种方法绘制矩形：

- **fillRect(x, y, width, height)**：绘制一个填充的矩形。
- **strokeRect(x, y, width, height)**：绘制一个矩形的边框。
- **clearRect(x, y, widh, height)**：清除指定的矩形区域，然后这块区域会变的完全透明。

&emsp;&emsp;一个左上角 ( 50, 50) 坐标处开始的长 200，宽 100 的被填充为红色的矩形。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <canvas id="base"></canvas>
    <script>
      const base = document.querySelector("#base");
      const content = base.getContext("2d"); // getContext("2d") 对象是内建的 HTML5 对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。
      content.fillStyle = "red"; //填充颜色
      content.fillRect(50, 50, 200, 100); // fillRect(x,y,width,height) 绘制路径
    </script>
  </body>
</html>
```

<div style="text-align:center">
    <img src="https://i.niupic.com/images/2022/01/25/9Udl.png" />
</div>

## 路径

&emsp;&emsp;路径相关方法：

- `beginPath()`新建一条路径，路径一旦创建成功，图形绘制命令被指向到路径上生成路径
- `moveTo(x, y)`把画笔移动到指定的坐标`(x, y)`。相当于设置路径的起始点坐标。
- `closePath()`闭合路径之后，图形绘制命令又重新指向到上下文中
- `stroke()`通过线条来绘制图形轮廓
- `fill()`通过填充路径的内容区域生成实心的图形

### 线段

```javascript
// 左上角为(0,0), 一条(50,50)开始， 到(250,250)结束的线段
(function draw() {
  const base = document.querySelector("#base");
  const c = base.getContext("2d");
  c.beginPath();
  c.moveTo(50, 50);
  c.lineTo(250, 250);
  c.closePath();
  c.stroke();
})();
```

### 三角形

```javascript
// 左上角为(0,0), 一条(50,50)开始， 到(250,250)结束的线段
(function draw() {
  const base = document.querySelector("#base");
  const c = base.getContext("2d");
  c.beginPath();
  c.moveTo(200, 100);
  c.lineTo(100, 0);
  c.lineTo(0, 100);
  c.closePath();
  c.stroke(); //
  c.fill();
})();
```

## 圆弧

&emsp;&emsp;两个方法

- **arc(x, y, r, startAngle, endAngle, anticlockwise)**:以`(x, y)` 为圆心，以`r` 为半径，从 `startAngle` 弧度开始到`endAngle`弧度结束。`anticlosewise` 是布尔值，`true` 表示逆时针，`false` 表示顺时针(默认是顺时针)。

&emsp;&emsp;这里的度数指的是弧度，Math.PI/2 = 90 度 ， Math.Pi = 180 度

- **arcTo(x1, y1, x2, y2, radius)**: 根据给定的控制点和半径画一段圆弧，最后再以直线连接两个控制点。

```javascript
// 1/4圆  90度
(function draw() {
  const base = document.querySelector("#base");
  const c = base.getContext("2d");
  c.beginPath();
  c.arc(50, 50, 40, 0, -Math.PI / 2, true);
  c.stroke();
})();
```

## 样式

- `fillStyle = color` 设置图形的填充颜色

- `strokeStyle = color` 设置图形轮廓的颜色

- `lineCap = type` 线条末端样式。

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body>
      <canvas id="base"></canvas>
      <script>
        let lineCaps = ["butt", "round", "square"];
        const canvas = document.querySelector("#base");
        const ctx = canvas.getContext("2d");

        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.moveTo(20 + 30 * i, 30);
          ctx.lineTo(20 + 30 * i, 100);
          ctx.lineWidth = 20;
          ctx.lineCap = lineCaps[i];
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.moveTo(0, 30);
        ctx.lineTo(300, 30);

        ctx.moveTo(0, 100);
        ctx.lineTo(300, 100);

        ctx.strokeStyle = "red";
        ctx.lineWidth = 1;
      </script>
    </body>
  </html>
  ```

  &emsp;&emsp;效果图：
    <div style="text-align:center">
        <img src="https://i.niupic.com/images/2022/01/25/9Udr.png" />
    </div>
