---
title: 关于HTTP缓存
date: 2022-05-08
categories:
  - node
tags:
  - node
  - http
---

**http 强制缓存和协商缓存**

```js
const http = require("http");
const fs = require("fs");
const url = require("url");
const etag = require("etag");
const app = http.createServer();

app.on("request", (req, res) => {
  const { pathname } = url.parse(req.url);
  if (pathname === "/") {
    const data = fs.readFileSync("./index.html");
    res.end(data);
  } else if (pathname === "/img/black.png") {
    //强缓存 Expires
    const data = fs.readFileSync("./img/black.png");
    res.writeHead(200, {
      Expires: new Date("2022-05-08 21:50:00").toUTCString(),
    });
    res.end(data);
  } else if (pathname === "/img/white.png") {
    // 强缓存 Cache-Control max-age 单位:秒  no-cache no-store private public能否被代理服务器缓存
    // max-age   s-maxage 仅在 public下使用
    // Cache-Control:"private, s-maxage=1000"
    const data = fs.readFileSync("./img/white.png");
    res.writeHead(200, {
      "Cache-Control": "max-age=1000",
    });
    res.end(data);
  } else if (pathname === "/img/blue.png") {
    // 协商缓存  last-modify  根据修改资源的时间戳判断 精确至秒
    // 请求头 If-Modified-Since: Sun, 08 May 2022 13:55:21 GMT
    const { mtime } = fs.statSync("./img/blue.png");
    const data = fs.readFileSync("./img/blue.png");
    const ifModifiedSince = req.headers["if-modified-since"];
    if (ifModifiedSince === mtime.toUTCString()) {
      res.statusCode = 304;
      res.end();
      return;
    }
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("last-modified", mtime.toUTCString());
    res.end(data);
  } else if (pathname === "/img/red.png") {
    // 协商缓存 Etag
    // 请求头 If-None-Match: "dbd-TvV8NpqS0ahtxB7NurZ7Kj2rcWY"
    // 响应头 etag: "dbd-TvV8NpqS0ahtxB7NurZ7Kj2rcWY"
    const data = fs.readFileSync("./img/red.png");
    const etagContent = etag(data);
    const ifNoneMatch = req.headers["if-none-match"];
    if (ifNoneMatch === etagContent) {
      res.statusCode = 304;
      res.end();
      return;
    }
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("etag", etagContent);
    res.end(data);
  } else {
    res.statusCode = 404;
    res.end();
  }
});

app.listen(3000);
```
