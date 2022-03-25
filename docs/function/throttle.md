---
title: throttle
---

```javascript
function throttle(fn, wait = 2000) {
  let previous = 0,
    timer = null;
  return function () {
    let args = arguments;
    let now = +new Date();
    if (now - previous < wait) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        previous = now;
        fn.apply(this, args);
      }, wait);
    } else {
      previous = now;
      fn.apply(this, args);
    }
  };
}
```
