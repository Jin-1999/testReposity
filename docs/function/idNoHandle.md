---
title: idNoHandle
---

:::tip
身份证脱敏
:::

```javascript
function idNoHandle(str = "") {
  return str.replace(/^(.{6})(?:\d+)(.{4})$/, "$1****$2");
}
```
