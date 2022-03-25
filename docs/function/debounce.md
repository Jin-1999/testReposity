---
title: debounce
---

```javascript
function debounce(fn, wait, isImmediate) {
  wait = wait === undefined ? 300 : wait; //默认300ms
  let timer, result;
  return function () {
    let context = this;
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    if (isImmediate) {
      if (!timer) result = fn.apply(context, args);
      timer = setTimeout(function () {
        timer = null;
      }, wait);
    } else {
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, wait);
    }
    return result;
  };
}
```
