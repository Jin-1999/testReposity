---
title: vscode中添加git环境
date: 2022-03-08
categories:
  - tips
tags:
  - tips
---

:::tip

​ 随时间格式可能会有所变化，可根据[官网](https://code.visualstudio.com/docs/editor/integrated-terminal#_configuration)最新格式配置。

:::

在`setting.json`中添加如下代码, 记得重启

```json
"terminal.integrated.profiles.windows": {
    "Bash": {
        "path": [
            "D:\\DATA\\RFID\\Git\\bin\\bash.exe" //bash路径
        ],
        "icon": "terminal-bash"
    }
}
```
