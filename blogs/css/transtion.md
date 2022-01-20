---
title: transtion
date: 2022-01-17
categories:
  - css
tags:
  - css
---

### transtion 过渡

```
transition: property duration timing-function delay;
```

**css3 引入的 transtion** , 可以让我们的状态变化有了时间的概念，同时产生了丰富多彩的动画效果。我们可以设置四个值，它们分别为：

- transition-property 规定设置过渡效果的 CSS 属性的名称。
- transition-duration 规定完成过渡效果需要多少秒或毫秒。
- transition-timing-function 规定速度效果的速度曲线。
- transition-delay 定义过渡效果何时开始。

#### transition-property 属性

**语法**

```
transition-property: none|all(默认)|property;
```

**示例**

```css
div {
  width: 100px;
  height: 100px;
  background: blue;
  transition: width 2s;
}

div:hover {
  width: 300px;
}
```

#### transition-duration 时间

**示例**

```css
div {
  width: 100px;
  height: 100px;
  background: blue;
  transition-property: width;
  transition-duration: 5s;
}

div:hover {
  width: 300px;
}
```

#### transition-timing-function 效果

**语法**

```
transition-timing-function: linear(匀速)|ease|ease-in(加速)|ease-out(减速)|ease-in-out|cubic-bezier(n,n,n,n);
```

**示例**

```css
div {
  width: 100px;
  height: 100px;
  background: blue;
  transition: width 2s;
  transition-timing-function: linear;
}

div:hover {
  width: 300px;
}
```

#### transition-delay 延时

示例

```css
div {
  transition-delay: 2s;
}
```

#### 局限

（1）transition 需要事件触发，所以没法在网页加载时自动发生。

（2）transition 是一次性的，不能重复发生，除非一再触发。

（3）transition 只能定义开始状态和结束状态，不能定义中间状态，也就是说只有两个状态。

（4）一条 transition 规则，只能定义一个属性的变化，不能涉及多个属性。

为此引申出了 animation 属性来解决这些问题。
