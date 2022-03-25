---
title: 前端下载和导出excel表格
date: 2022-03-08
categories:
  - tips
  - html
tags:
  - tips
---

:::tip

​ 前端导出导入及下载`excel`表格

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

### **导入**

&emsp;&emsp;还需要引入 XLSX 模块，[xlsx.core.min.js](https://github.com/SheetJS/sheetjs/tree/master/dist)

`import XLSX from './xlsx.core.min.js'`
```js
function importFile(e) {
  var files = e.target.files;
  var fileReader = new FileReader();
  let _this = this;
  fileReader.onload = function (ev) {
    try {
      var data = ev.target.result;
      var workbook = XLSX.read(data, {
        type: "binary",
      }); // 以二进制流方式读取得到整份excel表格对象
      var persons = []; // 存储获取到的数据
    } catch (e) {
      console.log("文件类型不正确", e);
      return;
    }
    // 表格的表格范围，可用于判断表头是否数量是否正确
    var fromTo = "";
    // 遍历每张表读取
    for (var sheet in workbook.Sheets) {
      if (workbook.Sheets.hasOwnProperty(sheet)) {
        fromTo = workbook.Sheets[sheet]["!ref"];
        console.log(fromTo);
        persons = persons.concat(
          XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
        );
        // break; // 如果只取第一张表，就取消注释这行
      }
    }
    //在控制台打印出来表格中的数据
    console.log(persons);
  };
  // 以二进制方式打开文件
  fileReader.readAsArrayBuffer(files[0]);
}
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
