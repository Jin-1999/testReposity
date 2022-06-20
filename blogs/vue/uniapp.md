---
title: uniapp开发总结
date: 2022-05-27
categories:
  - vue
tags:
  - uniapp
  - vue
---

## 多端接口封装

&emsp;&emsp; devServer 中的代理仅在 H5 端有效，在 APP 端要直接设置 baseURL。

```js
// main.js
import config from "@/common/config";
// 初始化请求配置
uni.$u.http.setConfig((defaultConfig) => {
  /* defaultConfig 为默认全局配置 */

  // #ifdef H5
  defaultConfig.baseURL = "/api";
  // #endif
  // #ifdef APP-PLUS
  defaultConfig.baseURL = config.baseUrl;
  // #endif

  return defaultConfig;
});

module.exports = (vm) => {
  require("./requestInterceptors")(vm);
  require("./responseInterceptors")(vm);
};

//index.js 引入请求封装
require("./util/request/index")(app);
```

```js
// requestInterceptors.js
/**
 * 请求拦截
 * @param {Object} http
 */
module.exports = (vm) => {
  uni.$u.http.interceptors.request.use(
    (config) => {
      // 可使用async await 做异步操作
      // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}

      config.data = config.data || {};
      // 可以在此通过vm引用vuex中的变量，具体值在vm.$store.state中
      let { vuex_token } = vm.$store.state;

      if (vuex_token && !config.custom?.auth) {
        config.header["Authorization"] = `Basic ${vuex_token}`;
        config.header["blade-Auth"] = `bearer ${vuex_token}`;
      }
      return config;
    },
    (
      config // 可使用async await 做异步操作
    ) => Promise.reject(config)
  );
};

//responseInterceptors.js
/**
 * 响应拦截
 * @param {Object} http
 */
module.exports = (vm) => {
  uni.$u.http.interceptors.response.use(
    (response) => {
      /* 对响应成功做点什么 可使用async await 做异步操作*/
      const data = response.data;
      // 自定义参数
      const custom = response.config?.custom;
      if (data.code !== 200) {
        // 服务端返回的状态码不等于200，则reject()
        // 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
        if (data.code === 401) {
          uni.$u.vuex("vuex_user", "");
          uni.$u.vuex("vuex_token", "");
          uni.$u.toast(data.msg);
          uni.$u.route({
            url: "pages/login/login",
          });
          return Promise.reject(data);
        }

        if (custom.toast !== false) {
          uni.$u.toast(data.msg);
        }
        // 如果需要catch返回，则进行reject
        if (custom?.catch) {
          return Promise.reject(data);
        } else {
          // 否则返回一个pending中的promise
          return new Promise(() => {});
        }
      }
      return data.data || {};
    },
    (response) => {
      /*  对响应错误做点什么 （statusCode !== 200）*/
      return Promise.reject(response);
    }
  );
};
```

## 下载文件并打开

&emsp;&emsp; H5 中可以使用 a 标签的 download 和 href 属性下载，在 ios 和 android 端使用 uniapp 的 uni.downloadFile(OBJECT)下载文件,uni.openDocument(OBJECT)打开文件。

```js
//#ifdef H5
let a = document.createElement("a");
a.download = "结清证明";
a.href = item.url;
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
//#endif

//#ifdef APP-PLUS
uni.showLoading({
  title: "下载中",
});
uni.downloadFile({
  url: item.url,
  success: function (res) {
    const { statusCode, tempFilePath } = res;
    if (statusCode == 200) {
      uni.openDocument({
        showMenu: true,
        filePath: tempFilePath,
        success: function (res) {
          console.log("打开文件成功", res);
        },
      });
    } else {
      uni.$u.toast("下载失败, 请重试");
    }
  },
  fail: function () {
    uni.$u.toast("下载失败, 请重试");
  },
  complete: function () {
    uni.hideLoading();
  },
});
//#endif
```

## 阿里云人脸识别

[阿里云文档地址](https://help.aliyun.com/document_detail/179265.html)

:::tip
&emsp;&emsp;配置 APP 原生插件后需要在 运行 -> 制作自定义调试基座, 然后在运行基座的时候选择自定义基座。
:::

## vuex 封装

:::tip
&emsp;&emsp;统一使用 uni.$u.vuex(key, value)去修改 state 中的值, 部分常用 state 直接混入到全局 mixin 中，直接使用 this.key 去获取 state 值。
:::

```js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex); // vue的插件机制

let lifeData = {};

try {
  // 尝试获取本地是否存在lifeData变量，第一次启动APP时是不存在的
  lifeData = uni.getStorageSync("lifeData");
} catch (e) {}

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
let saveStateKeys = ["vuex_user", "vuex_token", "vuex_bankList"];

// 保存变量到本地存储中
const saveLifeData = function (key, value) {
  // 判断变量名是否在需要存储的数组中
  if (saveStateKeys.indexOf(key) != -1) {
    // 获取本地存储的lifeData对象，将变量添加到对象中
    let tmp = uni.getStorageSync("lifeData");
    // 第一次打开APP，不存在lifeData变量，故放一个{}空对象
    tmp = tmp ? tmp : {};
    tmp[key] = value;
    // 执行这一步后，所有需要存储的变量，都挂载在本地的lifeData对象中
    uni.setStorageSync("lifeData", tmp);
  }
};

// Vuex.Store 构造器选项
const store = new Vuex.Store({
  // 为了不和页面或组件的data中的造成混淆，state中的变量前面建议加上$符号
  state: {
    vuex_user: lifeData.vuex_user || {},
    vuex_token: lifeData.vuex_token || "",
    vuex_bankList: lifeData.vuex_bankList || [],
  },
  mutations: {
    $uStore(state, payload) {
      // 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
      let nameArr = payload.name.split(".");
      let saveKey = "";
      let len = nameArr.length;
      if (nameArr.length >= 2) {
        let obj = state[nameArr[0]];
        for (let i = 1; i < len - 1; i++) {
          obj = obj[nameArr[i]];
        }
        obj[nameArr[len - 1]] = payload.value;
        saveKey = nameArr[0];
      } else {
        // 单层级变量，在state就是一个普通变量的情况
        state[payload.name] = payload.value;
        saveKey = payload.name;
      }
      saveLifeData(saveKey, state[saveKey]);
    },
  },
});

export default store;
```

```js
// $u.mixin.js的部分实现

import { mapState } from "vuex";
import store from "@/store";

// 尝试将用户在根目录中的store/index.js的vuex的state变量，全部加载到全局变量中
let $uStoreKey = ["vuex_user", "vuex_token", "vuex_bankList"];
try {
  $uStoreKey = store.state ? Object.keys(store.state) : [];
} catch (e) {}

module.exports = {
  computed: {
    // 将vuex的state中的所有变量，解构到全局混入的mixin中
    ...mapState($uStoreKey),
  },
  beforeCreate() {
    // 将vuex方法挂在到$u中
    // 使用方法为：如果要修改vuex的state中的user.name变量为"史诗" => uni.$u.vuex('user.name', '史诗')
    // 如果要修改vuex的state的version变量为1.0.1 => uni.$u.vuex('version', '1.0.1')
    uni.$u.vuex = (name, value) => {
      this.$store.commit("$uStore", {
        name,
        value,
      });
    };
  },
};
```

## 页面通讯

:::tip
&emsp;&emsp;HBuilderX 2.0.0 以上可以使用。<br>
1、使用 uni.$emit注册的事件，在每个界面都可以监听到，在使用完之后可以在页面注销手动使用$off 移除该事件<br>
2、遇到页面收到值但是视图不更新的情况（和响应式无关的情况下）,可以在 uni.$emit 外面包裹一层 setTimeout(() => {},0)
3、方法名字需使用驼峰命名, 如 update:name 不生效, 需要使用 updateName
:::

`uni.$emit(eventName,OBJECT)` 触发全局的自定义事件，附加参数都会传给监听器回调函数。<br>
`uni.$on(eventName,callback)` 监听全局的自定义事件，事件由 uni.$emit 触发，回调函数会接收事件触发函数的传入参数。<br>
`uni.$once(eventName,callback)`监听全局的自定义事件，事件由 uni.$emit 触发，但仅触发一次，在第一次触发之后移除该监听器。<br>`uni.$off([eventName, callback])` 移除全局自定义事件监听器<br>

```js
onClick(){
  let name = 'something'
  setTimeout(() => {
      uni.$emit('updateBankName', {
        name
      })
	}, 0)
  uni.$u.route({
    url:'someUrl',
  })
}

// another Page
created(){
  uni.$once('updateBankName',(payload)=>{
    //do something
  })
}
```

## 原生路由传参

:::tip
&emsp;&emsp;[onLoad](https://uniapp.dcloud.net.cn/api/router.html#navigateto)生命周期，其参数为上个页面传递的数据，参数类型为 Object 。
:::

```js
uni.$u.route({
  url: "someUrl?age=18&name=Jin",
});

// 跳转的界面
onLoad({age, name}){
  console.log(age, name) // 18 Jin
}
```

## 关于路由跳转

:::tip
&emsp;&emsp;在三级界面到二级界面的路由跳转应该使用`uni.navigateBack`或`uni.redirectTo`, 不然二级界面的返回会到三级界面。[uniapp 路由跳转](!https://uniapp.dcloud.net.cn/api/router.html#navigateto)
:::

## APP 端底部安全区

```json
//mainfest.json
"app-plus": {
	"safearea": {
		"bottom": {
			"offset": "auto"
		}
	}
}
```

## APP 拨打电话

:::tip
&emsp;&emsp;[文档地址](https://uniapp.dcloud.net.cn/api/system/phone.html#makephonecall) Android 需要在 manifest.json 增加权限 `<uses-permission android:name="android.permission.CALL_PHONE"/>`

:::

```js
uni.makePhoneCall({
  phoneNumber: "123456",
});
```

## Android 平台签名证书

:::tip
&emsp;&emsp;[文档地址](https://ask.dcloud.net.cn/article/35777)
:::
