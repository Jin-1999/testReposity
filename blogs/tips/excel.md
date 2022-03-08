---
title: 前端下载和导出excel表格
date: 2022-03-08
categories:
  - tips
  - html
tags:
  - tips
---

:::

​ 前端导出和下载`excel`表格

:::

### **导出**

```js
function handleExport() {
  	const arr = [
        {
            pro:'浙江',
            city:'杭州',
            area:'临平'
        },
        {
            pro:'浙江',
            city:'杭州',
            are:'余杭'
        },
    ]
    // 列标题 使用逗号隔开
    let str = `省,市,区\n`;
    // 增加\t为了不让表格显示科学计数法或者其他格式

    for (let i = 0; i < arr.length; i++) {
        for (const key in arr[i]) {
            str += `${arr[i][key] + "\t"},`;
        }
        str += "\n";
    }
    // encodeURIComponent解决中文乱码
    const url = "data:text/csv;charset=utf-8,\ufeff" + encodeURIComponent(str);
    // 通过创建a标签实现
    const link = document.createElement("a");
    link.href = url;
    // 对下载的文件命名
    link.download = `浙江杭州地区.csv`;
    link.click();
},
```

### **下载**

```js
function downloadFile(fileUrl) {
    if (!fileUrl) {
        this.$message.warning('下载资源为空')
        return
    }
    var a = document.createElement('a')
    a.download = new Date().getTime()
    a.href = fileUrl
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
},
```
