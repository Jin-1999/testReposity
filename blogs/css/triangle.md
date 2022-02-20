---
title: 画一个三角形
date:  2021-04-23
categories:
 - css
tags:
 - css
---

### **css实现三角形**

```html
<stlyle>
.box {
        width: 0;
        height: 0;
        border-width: 50px 0 50px 50px;
        border-style: solid;
        border-color: transparent transparent transparent #000;
    }
</stlyle>
<body>
    <div class="box"></div>
</body>
```

效果：

<div style="display:flex;justify-content:center">
    <img src="http://chuantu.xyz/t6/742/1645355196x2728291260.png" />
</div>



### **canvas实现三角形**

```html
<body>
    <canvas id="box"></canvas>
    <script>
        const box = document.querySelector(".box");
        const c = box.getContext("2d");
        c.beginPath();
        c.moveTo(0, 0);
        c.lineTo(50, 50);
        c.lineTo(0, 100);
        c.stroke();
        c.fill();
    </script>
</body>
```

