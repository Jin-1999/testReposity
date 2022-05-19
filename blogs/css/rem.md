---
title: rem适配
date: 2022-04-12
categories:
  - css
tags:
  - rem
---

### **关于 rem**

&emsp;&emsp;em 是一个相对单位长度，相对于当前对象内文本的字体尺寸。例如一般浏览器默认字体大小为`font-size:16px`， 即`1em = 16px` , 但是 em 会继承父级元素的字体大小，并不是固定的 , 可以说是相对于父元素来决定的。

&emsp;&emsp;其在文章段落空两格的时候很有用处。

```css
p {
  text-indent: 2em;
}
```

&emsp;&emsp;rem 同样是一个相对单位，但是它是相对于`HTML`根元素来设置的，不会根据父级字体大小改变而改变。默认情况下 `1rem = 16px;`

&emsp;&emsp;使用 rem 可以进行不同屏幕分辨率下的尺寸适配。关于分辨率，我们可以看一下 iphone 手机的分辨率，

<div style="display:flex;justify-content:center">
    <img src="https://s1.ax1x.com/2022/04/12/LmcHr8.png" />
</div>

&emsp;&emsp;以 iphone6 为例， 实际物理分辨率为 `750 * 1334`， 但是我们在设计时候都是根据其逻辑像素（css 像素） `375 * 667` 来处理的， 缩放比例为 2, 我们可以使用 `window.devicePixelRatio`来获取前显示设备的物理像素分辨率与 CSS 像素分辨率之比，一般被称为`dpr `。

&emsp;&emsp; 这两种分辨率会造成一些出人意料的结果，例如我们在 css 上写某个伪类高度为 1px（375px 设计图标注为 1px 的情况）, 在 iphone6 手机上实际显示为 2px 的高度，会比我们想象中要“厚”一些。

### [lib-flexible](https://github.com/amfe/lib-flexible)

&emsp;&emsp;引入后可以直接使用 rem , 但是要自己手动换算， 默认为当前屏幕宽度的`1/10`作为根字体大小，`375px`下即 `1rem = 37.5px`

```js
(function flexible(window, document) {
  var docEl = document.documentElement;
  var dpr = window.devicePixelRatio || 1;

  // adjust body font size
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = 12 * dpr + "px";
    } else {
      document.addEventListener("DOMContentLoaded", setBodyFontSize);
    }
  }
  setBodyFontSize();

  // set 1rem = viewWidth / 10
  function setRemUnit() {
    var rem = docEl.clientWidth / 10;
    docEl.style.fontSize = rem + "px";
  }

  setRemUnit();

  // reset rem unit on page resize
  window.addEventListener("resize", setRemUnit);
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) {
      setRemUnit();
    }
  });

  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement("body");
    var testElement = document.createElement("div");
    testElement.style.border = ".5px solid transparent";
    fakeBody.appendChild(testElement);
    docEl.appendChild(fakeBody);
    if (testElement.offsetHeight === 1) {
      docEl.classList.add("hairlines");
    }
    docEl.removeChild(fakeBody);
  }
})(window, document);
```

### **px 自动转 rem**

&emsp;&emsp;在项目中可以根据插件自动修改单位，不需要手动去换算值。

1. `npm i postcss-pxtorem@5.1.1 -D`

2. 修改配置文件， `rooValue` 根据设计图尺寸修改，此处为 375px 设计图下

   ```js
   //.postcssrc.js
   module.exports = {
     plugins: {
       "postcss-pxtorem": {
         rootValue: 37.5,
         propList: ["*"],
       },
     },
   };
   ```

### **px 单位下移动端边框粗细问题解决方案**

```scss
@mixin thinBorder(
  $directionMaps: bottom,
  $color: #ccc,
  $radius: (
    0,
    0,
    0,
    0,
  ),
  $position: after
) {
  // 是否只有一个方向
  $isOnlyOneDir: string==type-of($directionMaps);
  $isAll: $directionMaps==all;

  @if ($isOnlyOneDir) {
    $directionMaps: ($directionMaps);
  }

  @if ($isAll) {
    $directionMaps: (top, right, bottom, left);
  }

  @each $directionMap in $directionMaps {
    border-#{$directionMap}: 1px solid $color;
  }

  // 判断圆角是list还是number
  @if (list==type-of($radius)) {
    border-radius: nth($radius, 1)
      nth($radius, 2)
      nth($radius, 3)
      nth($radius, 4);
  } @else {
    border-radius: $radius;
  }

  @media only screen and (-webkit-min-device-pixel-ratio: 2) {
    & {
      position: relative;

      // 删除1像素密度比下的边框
      @each $directionMap in $directionMaps {
        border-#{$directionMap}: none;
      }
    }

    &:#{$position} {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 200%;
      height: 200%;
      transform: scale(0.5);
      box-sizing: border-box;
      padding: 1px;
      transform-origin: 0 0;
      pointer-events: none;
      border: 0 solid $color;

      @each $directionMap in $directionMaps {
        border-#{$directionMap}-width: 1px;
      }

      // 判断圆角是list还是number
      @if (list==type-of($radius)) {
        border-radius: nth($radius, 1) *
          2
          nth($radius, 2) *
          2
          nth($radius, 3) *
          2
          nth($radius, 4) *
          2;
      } @else {
        border-radius: $radius * 2;
      }
    }
  }

  @media only screen and (-webkit-min-device-pixel-ratio: 3) {
    &:#{$position} {
      // 判断圆角是list还是number
      @if (list==type-of($radius)) {
        border-radius: nth($radius, 1) *
          3
          nth($radius, 2) *
          3
          nth($radius, 3) *
          3
          nth($radius, 4) *
          3;
      } @else {
        border-radius: $radius * 3;
      }

      width: 300%;
      height: 300%;
      transform: scale(0.3333);
    }
  }
}
```
