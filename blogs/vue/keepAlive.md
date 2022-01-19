---
title: keep-alive
date:  2021-07-12
categories:
 - vue
tags:   
 - vue
---

&emsp;&emsp;根据官方文档所说的， 当在一些组件之间切换的时候，你有时会想保持这些组件的状态，以避免反复渲染导致的性能问题。这个时候可以使用 &#60;keep-alive&#62; 来缓存组件第一次被创建的时候的状态。

```javascript
<keep-alive>
    <router-view class="avue-view" v-if="$route.meta.$keepAlive" /> 
</keep-alive>
```

&emsp;&emsp;值得注意的时候，被&#60;keep-alive&#62;包裹的组件，会拥有两个生命周期，**activated**  和 **deactivated** 。

- activated

被 keep-alive 缓存的组件激活时调用。

- deactivated

被 keep-alive 缓存的组件失活时调用。

tip: 上述两个钩子在服务器端渲染期间均不被调用。