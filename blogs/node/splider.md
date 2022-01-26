---
title: 爬虫（node）
date:  2022-01-25
categories:
 - node
tags:
 - 爬虫
 - node
 - plugin
---

## 爬虫概念


&emsp;&emsp;[网络爬虫](https://baike.baidu.com/item/%E7%BD%91%E7%BB%9C%E7%88%AC%E8%99%AB/5162711?fromtitle=%E7%88%AC%E8%99%AB&fromid=22046949&fr=aladdin)（又称为网页蜘蛛，网络机器人，在[FOAF](https://baike.baidu.com/item/FOAF/4916497)社区中间，更经常的称为网页追逐者），是一种按照一定的规则，自动地抓取万维网信息的[程序](https://baike.baidu.com/item/程序/13831935)或者[脚本](https://baike.baidu.com/item/脚本/1697005)。另外一些不常使用的名字还有蚂蚁、自动索引、模拟程序或者蠕虫。

## 获取数据

```javascript
const http = require('http')
const https = require('https')

const server = http.createServer((req, res) => {
    let data = ''
    https.get('https://www.meizu.com/', (result) => {
        result.on('data', (chunk) => {
            data += chunk
        })
        result.on('end', () => {
            console.log(data)
        })
    })
})

server.listen(3000)
```

## 筛选数据

### [cheerio](https://cheerio.js.org/#note)  

利用cheerio将html字符串转化为DOM

安装：```npm install cheerio -S```

使用：

```javascript
const http = require('http')
const https = require('https')
const cheerio = require('cheerio')

function filterData(data) {
    const $ = cheerio.load(data)
    $('.goods-box .goods-name').each((index, el) => {
        console.log($(el).text()); //获取商品名称
    })
}

const server = http.createServer((req, res) => {
    let data = ''
    https.get('https://www.meizu.com/', (result) => {
        result.on('data', (chunk) => {
            data += chunk
        })
        result.on('end', () => {
            filterData(data)
        })
    })
})

server.listen(3000)
```

## 导入数据

将数据导入数据库中

```javascript
const http = require('http')
const https = require('https')
const cheerio = require('cheerio')
const mongoose = require('mongoose')

function filterData(data) {
    const $ = cheerio.load(data)
    let goodsArr = []
    $('.goods-box .goods-name').each((index, el) => {
        goodsArr.push(($(el).text()))
    })
    console.log('goodsARR', goodsArr);
    importData(goodsArr)
}

function importData(dataArr) {
    console.log('dataArr', dataArr);
    dataArr.forEach((item, index) => {
        Splider.create({ goods_name: item })  //导入数据库
    })
}

mongoose.connect('mongodb://localhost/meizu')
    .then(() => { console.log('连接成功') })
    .catch((res) => { console.log('数据库连接失败', res) })

// 设定集合规则
const spliderSchema = new mongoose.Schema({
    goods_name: String,
});

const Splider = mongoose.model('Splider', spliderSchema)

const server = http.createServer((req, res) => {
    let data = ''
    https.get('https://www.meizu.com/', (result) => {
        result.on('data', (chunk) => {
            data += chunk
        })
        result.on('end', () => {
            filterData(data)
        })
    })
})

server.listen(8000)
```

