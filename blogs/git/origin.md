---
title: git远程分支切换
date: 2021-7-12
categories:
  - git
tags:
  - git
---

::: tip

当前仓库已经关联了远程仓库时候，需先删除相关的仓库，再添加需要关联的远程仓库。

不然会报如下错误

<span style="color:red"> fatal: remote origin already exists. </span>

:::
**查看关联的仓库**

`git remote -v`

**删除关联的仓库**

`git remote rm origin`

**添加关联的仓库**

`git remote add origin <url>`
