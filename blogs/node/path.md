---
title: path API
date: 2022-02-26
categories:
  - node
tags:
  - node
---

### **path.join([...paths])**

&emsp;&emsp;用于将`path`片段连接在一起并规范化， **`path`必须为字符串。**

🌰

```js
const path = requrire('path')
fn(path) {
    return path.join(__dirname, path)
}
fn('.file/01.text')
//当前文件目录下\file\01.text
//注意的是 ../ 会抵消前面的路径

path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// 返回: '/foo/bar/baz/asdf'

path.join('foo', {}, 'bar');
// 抛出 'TypeError: Path must be a string. Received {}'
```

### **path.basename(path[, ext])**

&emsp;&emsp;返回`path`的最后一部分，一般为文件名字。 第二个参数为文件扩展名，可选参数。

🌰

```js
path.basename(__dirname);
path.basename("c://目录1//目录2/文件名.txt"); //文件名.txt
path.basename("c://目录1//目录2/文件名.txt", ".txt"); //文件名
```

### **path.dirname(path)**

&emsp;&emsp;返回`path`的目录名字。 必须为字符串

🌰

```js
path.dirname("/foo/bar/baz/asdf/quux");
// 返回: '/foo/bar/baz/asdf'
```

### **path.parse(path)**

&emsp;&emsp;返回一个对象，包含`path`的重要元素。

🌰

```js
path.parse("C:\\path\\dir\\file.txt");

// 返回:
// { root: 'C:\\',
//   dir: 'C:\\path\\dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }
```

### **path.extname(path)**

&emsp;&emsp;返回文件扩展名。

```js
path.extname("./01.txt");
// .txt
```
