---
title: Next预渲染相关
date: 2022-08-03
categories:
  - react
tags:
  - react
  - Next
---

默认情况下，Next.js 将 **预渲染** 每个 page（页面）。这意味着 Next.js 会预先为每个页面生成 HTML 文件，而不是由客户端 JavaScript 来完成。预渲染可以带来更好的性能和 SEO 效果。

每个生成的 HTML 文件都与该页面所需的最少 JavaScript 代码相关联。当浏览器加载一个 page（页面）时，其 JavaScript 代码将运行并使页面完全具有交互性。

## 静态生成(static generation)

:::tip

HTML 在 **构建时** 生成，并在每次页面请求（request）时重用。推荐此用法，

:::

如果一个页面使用了 **静态生成**，在 **构建时（build time）** 将生成此页面对应的 HTML 文件 。这意味着在生产环境中，运行 `next build` 时将生成该页面对应的 HTML 文件。然后，此 HTML 文件将在每个页面请求时被重用，还可以被 CDN 缓存。

在 Next.js 中，你可以静态生成 **带有或不带有数据** 的页面。接下来我们分别看看这两种情况。

### **[生成不带数据的静态页面](https://www.nextjs.cn/docs/basic-features/pages#生成不带数据的静态页面)**

默认情况下，Next.js 使用“静态生成”来预渲染页面但不涉及获取数据，例如：

```js
function About() {
  return <div> About </div>;
}

export default About;
```

此页面在预渲染时不需要获取任何外部数据。在这种情况下，Next.js 只需在构建时为每个页面生成一个 HTML 文件即可。

### [需要获取数据的静态生成](https://www.nextjs.cn/docs/basic-features/pages#需要获取数据的静态生成)

某些页面需要获取外部数据以进行预渲染。有两种情况，一种或两种都可能适用。在每种情况下，你都可以使用 Next.js 所提供的以下函数：

1. 您的页面 **内容** 取决于外部数据：使用 `getStaticProps`。
2. 你的页面 **paths（路径）** 取决于外部数据：使用 `getStaticPaths` （通常还要同时使用 `getStaticProps`）。

#### [场景 1： 页面 **内容** 取决于外部数据](https://www.nextjs.cn/docs/basic-features/pages#场景-1：-页面-内容-取决于外部数据)

页面内容要从外部获取的时候，需使用`getStaticProps`

要在预渲染时获取此数据，Next.js 允许你从同一文件 export（导出） 一个名为 getStaticProps 的 async（异步） 函数。该函数在构建时被调用，并允许你在预渲染时将获取的数据作为 props 参数传递给页面。

#### **demo**

```js
import fs from "fs";
import path from "path";
import { execPath } from "process";
function Blog({ posts }) {
  console.log("posts", posts);
  return (
    <div>
      <ul>
        {posts.map((post) => {
          <li key={post.id}>{post.content}</li>;
        })}
      </ul>
    </div>
  );
}
export default Blog;

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "blog.json");
  const res = await fs.readFileSync(filePath);
  const data = JSON.parse(res);
  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }
  if (!data.posts.length) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      posts: data.posts,
    },
    // ISR 增量静态再生
    revalidate: 10,
  };
}
```

#### [场景 2：页面路径取决于外部数据](https://www.nextjs.cn/docs/basic-features/pages#场景-2：页面路径取决于外部数据)

Next.js 允许你创建具有 **动态路由** 的页面。例如，你可以创建一个名为 `pages/posts/[id].js` 的文件用以展示以 `id` 标识的单篇博客文章。当你访问 `posts/1` 路径时将展示 `id: 1` 的博客文章。

但是，在构建 `id` 所对应的内容时可能需要从外部获取数据。

**例如**： 假设你只向数据库添加了一篇博客文章（标记为 `id: 1`）。这种情况下，你只想在构建时针对 `posts/1` 进行预渲染。

稍后，你又添加了第二篇文章，标记为 `id: 2`。这是，你希望对 `posts/2` 也进行预渲染。

因此，预渲染的页面 **paths（路径）** 取决于外部数据。为了解决这个问题，Next.js 允许你从动态页面（在这里是 `pages/posts/[id].js`）中 `export（导出）` 一个名为 `getStaticPaths` 的 `async（异步）` 函数。该函数在构建时被调用，并允许你指定要预渲染的路径。

```js
// 此函数在构建时被调用
export async function getStaticPaths() {
  // 调用外部 API 获取博文列表
  const res = await fetch("https://.../posts");
  const posts = await res.json();

  // 据博文列表生成所有需要预渲染的路径
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}
```

同样在 `pages/posts/[id].js` 中，你还需要 export（导出） `getStaticProps` 以便可以获取 `id` 所对应的博客文章的数据并进行预渲染：

```js
function Post({ post }) {
  // Render post...
}

export async function getStaticPaths() {
  // ...
}

// 在构建时也会被调用
export async function getStaticProps({ params }) {
  // params 包含此片博文的 `id` 信息。
  // 如果路由是 /posts/1，那么 params.id 就是 1
  const res = await fetch(`https://.../posts/${params.id}`);
  const post = await res.json();

  // 通过 props 参数向页面传递博文的数据
  return { props: { post } };
}

export default Post;
```

#### **demo**

```js
import { getEventById } from "../../dummy-data";
import { useRouter } from "next/router";
import classes from "./events.module.css";
import Image from "next/image";
import { getFeaturedEvents } from "../../dummy-data";
function EventPage({ data }) {
  // const router = useRouter();
  // const { eventId } = router.query;
  // const data = getEventById(eventId);
  //  getStaticPaths中fallback设置为true的时候 需要判断是否数据加载完成
  if (!data) {
    return <h1>loading。。。</h1>;
  }

  if (!data.length) {
    return <div>暂无数据</div>;
  }
  const { title, description, location, image, date } = data[0];
  return (
    <div>
      <div className={classes.head}></div>
      <div className={classes.content}>
        <div className={classes.box}>
          <h2>{title}</h2>
          <span className={classes.span}>{date}</span>
          <Image
            src={image}
            width={600}
            height={500}
            priority={true}
            alt={title}
          ></Image>
          <p className={classes.p}>{description}</p>
        </div>
      </div>
    </div>
  );
}

function getData() {
  const data = getFeaturedEvents();
  return data;
}

export async function getStaticProps(context) {
  const { params } = context;
  const { eventId } = params;
  const data = getEventById(eventId);
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data,
    },
  };
}

export async function getStaticPaths() {
  const data = getData();
  const ids = data.map((v) => v.id);
  const paths = ids.map((v) => {
    return {
      params: { eventId: v },
    };
  });
  return {
    paths,
    // 当fallback设置为true的时候， 没有列出来的路径也可以正常访问，但为服务端渲染
    fallback: true, // false true blocking
  };
}

export default EventPage;
```

## 服务端渲染(Server-side Rendering)

:::tip

在 **每次页面请求（request）时** 重新生成 HTML。如果要对某界面实行服务端渲染，则需要`export`一个名为`getServerSideProps`的`async`函数， 服务器将在每次页面请求时调用此函数。

:::

例如，假设你的某个页面需要预渲染频繁更新的数据（从外部 API 获取）。你就可以编写 `getServerSideProps` 获取该数据并将其传递给 `Page` ，如下所示：

```js
// 102
function Page({ data }) {
  // Render data...
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://.../data`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default Page;
```
