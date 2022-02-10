---
title: 文字单行及多行超出省略
date:  2020-11-25
categories:
 - css
tags:
 - css
---

### **单行**

```css
div {
    width: 200px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
```



### **多行**

```css
div {
    width: 200px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
```

