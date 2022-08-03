---
title: Next路由页面相关
date: 2022-08-02
categories:
  - react
tags:
  - react
  - Next
---

## Pages(页面&路由)

在 Next.js 中，一个 **page（页面）** 就是一个从 `.js`、`jsx`、`.ts` 或 `.tsx` 文件导出（export）的 [React 组件](https://reactjs.org/docs/components-and-props.html) ，这些文件存放在 `pages` 目录下。每个 page（页面）都使用其文件名作为路由（route）。

**示例**： 如果你创建了一个命名为 `pages/about.js` 的文件并导出（export）一个如下所示的 React 组件，则可以通过 `/about` 路径进行访问。

```js
function About() {
  return <div>About</div>;
}

export default About;
```

### [具有动态路由的页面](https://www.nextjs.cn/docs/basic-features/pages#具有动态路由的页面)

Next.js 支持具有动态路由的 pages（页面）。例如，如果你创建了一个命名为 `pages/posts/[id].js` 的文件，那么就可以通过 `posts/1`、`posts/2` 等类似的路径进行访问。

:::tip

​ 还有一种以`[...name]`格式命名的文件，可以使用``useRouter().query`返回`name`后路径组成的数据，例如 命名为 `[...id]`, 当我们访问路径为 /id/2022/10/01 时候，返回 query 属性为 `id:['2022','10', '01']`

:::

### 预渲染

在默认的情况下，Next.js 将会**预渲染**每个页面，这意味着 Nextj.js 会预先为每一个页面生成 HTML 文件，而不是由客户端 JavaScript 来完成，预渲染可以带来更好的**性能**和**SEO**效果。

### 两种形式的预渲染

Next.js 中有两种形式的预渲染，**静态生成(Static Generation)** 和 **服务端渲染(Serverside Rendering)** 。 它们的**区别在于为 page 生成 HTML 页面的时机不同。**

- **静态生成(推荐)**：HTML 在构建时生成，并在每次页面请求时重用。
- **服务端渲染**：在每次页面请求时重新生成 HTML。

:::tip

Next.js 允许为每个页面选择预渲染方式，我们可以创建一个“混合模式”的 Next.js 的应用程序，对大多数页面使用静态生成，同时对其他页面使用服务器渲染。

:::

### 路由钩子

### useRouter

```js
import { useRouter } from "next/router";
function fn() {
  const router = userRouter();
  router.push("/home"); //路由跳转
  console.log("router", router);
}
```

### 路由导航

在 Next.js 中， 我们使用[next/link 模块](https://www.nextjs.cn/docs/api-reference/next/link)进行路由的跳转。🌰：

```js
import Link from "next/link";
// href 为一个必填属性
function Home() {
  return (
    <ul>
      <li>
        <Link href="/about">
          <a>About Us</a>
        </Link>
      </li>
    </ul>
  );
}
export default Home;
```

### 404

:::tip

​ 我们可以直接在 pages 目录下建立 404.js 文件，Next.js 会自动讲该文件作为 404 页面

:::
