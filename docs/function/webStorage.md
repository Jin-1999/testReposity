---
title: webStorage
---

:::tip

​ 对于浏览器端缓存的二次封装。

:::

```js
/**
 * @desc: 设置缓存
 * @params {name:'键名', content:'缓存内容', type:'缓存类型 默认为session'}
 * @return: 示例
 * setStore({name:'token', content:'abcdefg', type:'session'})
 * //sessionStorage
 * token: {dataType: "string", content: 'abcdefg', datetime: 1645771078104}
 */
const setStore = (params = {}) => {
  let keyName = "缓存前缀—";
  let { name, content, type } = params;
  name = keyName + name;
  let obj = {
    dataType: typeof content,
    content: content,
    type: type,
    datetime: new Date().getTime(),
  };
  if (type) window.localStorage.setItem(name, JSON.stringify(obj));
  else window.sessionStorage.setItem(name, JSON.stringify(obj));
};
```

```js
/**
 * @desc:读取缓存
 * @params {name:'键名', debug:'是否返回全部属性'}
 * @return: getStore({name:'token'})   //默认从sessionStorage里读取  没有再从localStorage读取
 */
const getStore = (params = {}) => {
  let keyName = "缓存前缀—";
  let { name, debug } = params;
  name = keyName + name;
  let obj = {},
    content;
  obj = window.sessionStorage.getItem(name);
  if (checkIsEmpty(obj)) obj = window.localStorage.getItem(name);
  if (checkIsEmpty(obj)) return;
  try {
    obj = JSON.parse(obj);
  } catch {
    return obj;
  }
  if (debug) {
    return obj;
  }
  if (obj.dataType == "string") {
    content = obj.content;
  } else if (obj.dataType == "number") {
    content = Number(obj.content);
  } else if (obj.dataType == "boolean") {
    content = eval(obj.content);
  } else if (obj.dataType == "object") {
    content = obj.content;
  }
  return content;
};
```

```js
/**
 * @desc: 判断是否为空
 * @params：val
 * @return: 数组长度为0 对象内部为空 null undefined 返回true
 */
function checkIsEmpty(val) {
  if (typeof val == "boolean") {
    return false;
  }
  if (typeof val == "number") {
    return false;
  }
  if (val instanceof Array) {
    if (val.length == 0) return true;
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === "{}") return true;
  } else {
    if (
      val == "null" ||
      val == null ||
      val == "undefined" ||
      val == undefined ||
      val == ""
    ) {
      return true;
    }
    return false;
  }
  return false;
}
```
