---
title: mockjs模拟数据
date: 2022-02-15
categories:
  - plugin
tags:
  - plugin
---

## **使用 mockjs**

**项目安装 mock**

```
npm install mockjs
```

**项目中新建 mock 文件**

```js
//引入mock模块
import Mock from "mockjs";
```

**将 mock 文件在 main.js 中导入**

```js
import Vue from 'vue'
import App FROM './App.vue'
import './mock/index.js'

Vue.config.productionTip = false

new Vue({
	render:h => h(App),
}).$mount('#app')
```

## **mock 语法**

### **生成字符串**

- 生成指定次数字符串

```js
import Mock from "mockjs";
const data = Mock.mock({
  "string|4": "哈哈",
});
```

- 生成指定范围长度字符串

```js
const data = Mock.mock({
  "string|1-8": "哈哈",
});
```

### **生成文本**

- 生成一个随机字符串

```js
const data = Mock.mock({
  string: "@cword",
});
```

- 生成指定长度和范围

```js
const data = Mock.mock({
    string:"@cword(1)"
    str :"@cword(10,15)"
})
```

### **生成标题和句子**

- 生成标题和句子

```js
const data = Mock.mock({
    title:"@ctitle(8)"
    sentence:"@csentence"
})
```

- 生成指定长度的标题和句子

```js
const data = Mock.mock({
    title:"@ctitle(8)"
    sentence:"@csentence(50)"
})
```

- 生成指定范围的

```js
const data = Mock.mock({
    title:"@ctitle(5,8)"
    sentence:"@csentence(50,100)"
})
```

### **生成段落**

- 随机生成段落

```js
const data = Mock.mock({
  content: "@cparagraph()",
});
```

### **生成数字**

- 生成指定数字

```js
const data = Mock.mock({
  "number|80": 1,
});
```

- 生成范围数字

```js
const data = Mock.mock({
  "number|1-99": 1,
});
```

### **生成自增 id**

- 随机生成标识

```js
const data = Mock.mock({
  id: "@increment",
});
```

### **生成姓名-地址-身份证**

- 随机生成姓名-地址-身份证

```js
const data = Mock.mock({
	name:"@cname()"
	idCard:"@id()"
	address:"@city(true)"
})
```

### **随机生成图片**

- 生成图片：@image（“300\*200”，‘#ff0000','#fff','gif','随机动图'）
- 参数 1：图片大小

```
[
	'300*250','250*250','240*400','336*280'
	'180*150','720*300','468*60','234*60'
	'388*31','250*250','240*400','120*40'
	'125*125','250*250','240*400','336*280'
]
```

- 参数 2：图片背景色

- 参数 3：图片前景色

- 参数 4：图片格式
- 参数 5：图片文字

##### 生成时间

- @Date
- 生成指定格式时间：@date(yyyy-MM-dd hh:mm:ss)

指定数组返回的参数

- 指定长度：‘date|5’
- 指定范围:'data|5-10'

```js
const data = Mock.mock({
'list|50-99':[
        {
            name:'@cname'
            address:'@city(true)'
            id:'@increment()'
        }
    ]
})
```

## **mock 拦截请求**

### **定义 get 请求**

```js
Mock.mock("api/get/news", "get", () => {
  return {
    status: 200,
    message: "获取数据成功",
  };
});
```

### **定义 post 请求**

```js
Mock.mock("api/post/news", "post", () => {
  return {
    status: 200,
    message: "获取数据成功",
  };
});
```

## **mock 语法规范**

**数据模板中的每个属性由 3 部分构成：属性名、生成规则、属性值：**

```
// 属性名   name
// 生成规则 rule
// 属性值   value
'name|rule': value
```

**注意：**

- _属性名_ 和 _生成规则_ 之间用竖线 `|` 分隔。

- _生成规则_ 是可选的。

- 生成规则

  有 7 种格式：

  1. `'name|min-max': value`
  2. `'name|count': value`
  3. `'name|min-max.dmin-dmax': value`
  4. `'name|min-max.dcount': value`
  5. `'name|count.dmin-dmax': value`
  6. `'name|count.dcount': value`
  7. `'name|+step': value`

- **生成规则** 的 含义 需要依赖 **属性值的类型** 才能确定。

- _属性值_ 中可以含有 `@占位符`。

- _属性值_ 还指定了最终值的初始值和类型。

**生成规则和示例：**

### 1. 属性值是字符串 **String**

1. `'name|min-max': string`

   通过重复 `string` 生成一个字符串，重复次数大于等于 `min`，小于等于 `max`。

2. `'name|count': string`

   通过重复 `string` 生成一个字符串，重复次数等于 `count`。

### 2. 属性值是数字 **Number**

1. `'name|+1': number`

   属性值自动加 1，初始值为 `number`。

2. `'name|min-max': number`

   生成一个大于等于 `min`、小于等于 `max` 的整数，属性值 `number` 只是用来确定类型。

3. `'name|min-max.dmin-dmax': number`

   生成一个浮点数，整数部分大于等于 `min`、小于等于 `max`，小数部分保留 `dmin` 到 `dmax` 位。

```
Mock.mock({
    'number1|1-100.1-10': 1,
    'number2|123.1-10': 1,
    'number3|123.3': 1,
    'number4|123.10': 1.123
})
// =>
{
    "number1": 12.92,
    "number2": 123.51,
    "number3": 123.777,
    "number4": 123.1231091814
}
```

### 3. 属性值是布尔型 **Boolean**

1. `'name|1': boolean`

   随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率同样是 1/2。

2. `'name|min-max': value`

   随机生成一个布尔值，值为 `value` 的概率是 `min / (min + max)`，值为 `!value` 的概率是 `max / (min + max)`。

### 4. 属性值是对象 **Object**

1. `'name|count': object`

   从属性值 `object` 中随机选取 `count` 个属性。

2. `'name|min-max': object`

   从属性值 `object` 中随机选取 `min` 到 `max` 个属性。

### 5. 属性值是数组 **Array**

1. `'name|1': array`

   从属性值 `array` 中随机选取 1 个元素，作为最终值。

2. `'name|+1': array`

   从属性值 `array` 中顺序选取 1 个元素，作为最终值。

3. `'name|min-max': array`

   通过重复属性值 `array` 生成一个新数组，重复次数大于等于 `min`，小于等于 `max`。

4. `'name|count': array`

   通过重复属性值 `array` 生成一个新数组，重复次数为 `count`。

### 6. 属性值是函数 **Function**

1. `'name': function`

   执行函数 `function`，取其返回值作为最终的属性值，函数的上下文为属性 `'name'` 所在的对象。

### 7. 属性值是正则表达式 **RegExp**

1. `'name': regexp`

   根据正则表达式 `regexp` 反向生成可以匹配它的字符串。用于生成自定义格式的字符串。

   ```
   Mock.mock({
       'regexp1': /[a-z][A-Z][0-9]/,
       'regexp2': /\w\W\s\S\d\D/,
       'regexp3': /\d{5,10}/
   })
   // =>
   {
       "regexp1": "pJ7",
       "regexp2": "F)\fp1G",
       "regexp3": "561659409"
   }
   ```

## **实现新闻管理案例**

```js
const Mock = require("mockjs");
const { newsList } = Mock.mock({
  "newsList|10": [
    {
      id: "@increment",
      title: "@ctitle()",
      content: "@cparagraph(5,10)",
      img_url: "@image('50*50','#FF83FA','#FCFCFC','png','mono')",
      add_time: "@date(yyyy-MM-dd hh:mm:ss)",
    },
  ],
});

var getQuery = (url, name) => {
  const index = url.indexOf("?");
  if (index !== -1) {
    const queryStrArr = url.substr(index + 1).split("&");
    for (var i = 0; i < queryStrArr.length; i++) {
      const itemArr = queryStrArr[i].split("=");
      console.log(itemArr);
      if (itemArr[0] === name) {
        return itemArr[1];
      }
    }
  }
  return null;
};

// 定义获取新闻列表的数据
// /api/get/news?pageinde1&pagesize=10
Mock.mock(/\/api\/get\/news/, "get", (options) => {
  // 获取传递参数pageindex，pagesize
  const pageindex = getQuery(options.url, "pageindex");
  const pagesize = getQuery(options.url, "pagesize");
  const start = (pageindex - 1) * pagesize;
  const end = pagesize * pageindex;
  const totalPage = Math.ceil(newsList.length / pagesize);
  //  pageindex:1 pagesize:10 返回0-9条数据  2-10-（10-19） 3-10（20-29）
  // 数据的起始位置：（pageindex-1）*pagesize 结束位置：pageindex*pagesize
  const list = pageindex > totalPage ? [] : newsList.slice(start, end);
  return {
    status: 200,
    message: "获取新闻列表成功",
    list: list,
    total: totalPage,
  };
});

// 定义添加新闻的数据
Mock.mock("/api/add/news", "post", (options) => {
  const body = JSON.parse(options.body);
  newsList.push(
    Mock.mock({
      id: "@increment",
      title: body.title,
      content: body.content,
      img_url: "@image('50*50','#FF83FA','#FCFCFC','png','mono')",
      add_time: "@date(yyyy-MM-dd hh:mm:ss)",
    })
  );
  return {
    status: 200,
    message: "添加成功",
    list: newsList,
    total: newsList.length,
  };
});

// 定义删除新闻
Mock.mock("/api/delete/news", "post", (options) => {
  const body = JSON.parse(options.body);
  const index = newsList.findIndex((item) => {
    return item.id === body.id;
  });
  newsList.splice(index, 1);
  console.log(index);
  return {
    status: 200,
    message: "添加成功",
    list: newsList,
    total: newsList.length,
  };
});

console.log(newsList);
```
