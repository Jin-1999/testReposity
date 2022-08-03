---
title: vue3源码
date: 2022-07-29
categories:
  - vue
tags:
  - vue3
---

# 虚拟 dom

## 优势

1、vue 框架引进虚拟 dom 来减少对真实 dom 的操作，从而提高性能。
对真实的 dom 进行操作时，容易引起回流和重绘。
虚拟 dom 是对真实 dom 的抽象，在 vue 中使用 render function 生成虚拟节点 VNode，其本质是一个对象
最后只需要使用 babel 将虚拟 dom 转换为真实的 dom ， 即可展示界面
2、虚拟 dom 容易实现跨平台，例如渲染在 ssr, native , ssr , webGL 等等

## 虚拟 dom 渲染过程

1、 编译 template 模板， 使用正则去匹配 指令 class style 等等， 生成 AST
2、 标记静态节点
3、 生成 render function , 返回虚拟节点
4、 虚拟节点转换为真实节点
5、 浏览器展示

# 三大模块

## Compiler 编译模块

## RunTime 渲染模块（render 模块）

## Reactivity 响应模块
