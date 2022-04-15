---
title: vue3+vite中使用svg
date: 2022-04-14
categories:
  - vue
tags:
  - vue
  - svg
---

:::tip

在`vue2+cli`项目中我们会使用如下代码来注册 svg 图片， 在 vite 中并不支持使用`require`引入静态资源。此文记录一下在`vue3+vite`如何优雅使用 svg。

```js
import Vue from "vue";
import SvgIcon from "@/components/SvgIcon"; // 导入 svg 组件

Vue.component("svg-icon", SvgIcon);
const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);
const req = require.context("./svg", false, /\.svg$/);
requireAll(req);
```

[vite](https://vitejs.cn/guide/assets.html#importing-asset-as-string) 中使用`new URL(url, import.meta.url)`暴露一个模块的 url 来获取静态资源
:::

<br>

- ### 建立`src/componets/svgIcon.vue`

```vue
<template>
  <svg :class="svgClass" v-bind="$attrs" :style="{ color: color }">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "",
  },
});

const iconName = computed(() => `#icon-${props.name}`);
const svgClass = computed(() => {
  console.log(props.name, "props.name");
  if (props.name) {
    return `svg-icon icon-${props.name}`;
  }
  return "svg-icon";
});
</script>

<style lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
```

<br>

- ### `main.js`中引入组件

```js
import basicWrap from "./components/basicWrap.vue";
app.component("svg-icon", svgIcon);
```

<br>

- ### 建立`src/plugins/svgBuilder.js`

```js
import { readFileSync, readdirSync } from "fs";

let idPerfix = "";
const svgTitle = /<svg([^>+].*?)>/;
const clearHeightWidth = /(width|height)="([^>+].*?)"/g;

const hasViewBox = /(viewBox="[^>+].*?")/g;

const clearReturn = /(\r)|(\n)/g;

function findSvgFile(dir) {
  const svgRes = [];
  const dirents = readdirSync(dir, {
    withFileTypes: true,
  });
  for (const dirent of dirents) {
    if (dirent.isDirectory()) {
      svgRes.push(...findSvgFile(dir + dirent.name + "/"));
    } else {
      const svg = readFileSync(dir + dirent.name)
        .toString()
        .replace(clearReturn, "")
        .replace(svgTitle, ($1, $2) => {
          let width = 0;
          let height = 0;
          let content = $2.replace(clearHeightWidth, (s1, s2, s3) => {
            if (s2 === "width") {
              width = s3;
            } else if (s2 === "height") {
              height = s3;
            }
            return "";
          });
          if (!hasViewBox.test($2)) {
            content += `viewBox="0 0 ${width} ${height}"`;
          }
          return `<symbol id="${idPerfix}-${dirent.name.replace(
            ".svg",
            ""
          )}" ${content}>`;
        })
        .replace("</svg>", "</symbol>");
      svgRes.push(svg);
    }
  }
  return svgRes;
}

export const svgBuilder = (path, perfix = "icon") => {
  if (path === "") return;
  idPerfix = perfix;
  const res = findSvgFile(path);
  return {
    name: "svg-transform",
    transformIndexHtml(html) {
      return html.replace(
        "<body>",
        `
          <body>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0">
              ${res.join("")}
            </svg>
        `
      );
    },
  };
};
```

<br>

- ### 建立`src/icons/svg`文件夹存放`svg`格式图片

<br>

- ### `vite.configs.js`注册`svg`文件下图片

```js
import { svgBuilder } from "./src/plugins/svgBuilder";
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      resolves: [VantResolve()],
    }),
    svgBuilder("./src/icons/svg/"),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
```

<br>

### 在组件内使用

```vue
<svg-icon :name="iconFileName"></svg-icon>
```
