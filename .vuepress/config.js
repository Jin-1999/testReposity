module.exports = {
  "title": "我的博客",
  "description": "",
  "dest": "public",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  "theme": "reco",
  "themeConfig": {
    "subSidebar": 'auto',
    "nav": [
      {
        "text": "Home",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "TimeLine",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "Docs",
        "icon": "reco-message",
        "items": [
          // {
          //   "text": "vuepress-reco",
          //   "link": "/docs/theme-reco/"
          // },
          {
            "text": "function",
            "link": "/docs/function/"
          }
        ]
      },
      {
        "text": "Contact",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/recoluan",
            "icon": "reco-github"
          }
        ]
      }
    ],
    "sidebar": {
      // "/docs/theme-reco/": [
      //   "",
      //   "theme",
      //   "plugin",
      //   "api"
      // ],
      "/docs/function/": [
        "",
        "deepClone",
      ],
    },
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "Category"
      },
      "tag": {
        "location": 3,
        "text": "Tag"
      }
    },
    "friendLink": [
      {
        "title": "CSDN",
        "link": "https://blog.csdn.net/qq_40573810",
      },
      {
        "title": "简书",
        "link": "https://www.jianshu.com/u/26a71ece4fe1"
      },
      {
        "title": "vuepress-theme-reco",
        "link": "https://vuepress-theme-reco.recoluan.com/views/1.x/"
      }
    ],
    "logo": "/avatar.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "JinJuntong",
    "authorAvatar": "/avatar.png",
    "record": "xxxx",
    "startYear": "2017"
  },
  "markdown": {
    "lineNumbers": true
  },
  "plugins": {
    "cat": true,
    "dynamic-title": {
      showIcon: "/favicon.ico",
      showText: "(/≧▽≦/)咦！又好了！",
      hideIcon: "/favicon.ico",
      hideText: "(●—●)喔哟，别走嘛！",
      recoverTime: 2000
    },
    "cursor-effects": {
      size: 2,
      shape: 'circle',  // 点击形状: 'star', 'star' | 'circle'
      zIndex: 999999999
    },
    "nuggets-style-copy": { //代码复制
      copyText: "copy",
      tip: {
        content: "success!",
      },
    },
    "sakura": { //樱花插件
      num: 10,  // 数量
      show: true, 
      zIndex: 20, 
      img: {
        replace: false, //false 默认图 true 换图 需要填写httpUrl地址
        httpUrl: '...' //绝对路径
      }
    }
  }
}