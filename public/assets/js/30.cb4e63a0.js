(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{596:function(t,s,a){"use strict";a.r(s);var n=a(5),r=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"title"}),a("p",[t._v("简单介绍一些关于服务器端的概念")])]),a("h2",{attrs:{id:"网站组成"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#网站组成"}},[t._v("#")]),t._v(" 网站组成")]),t._v(" "),a("p",[t._v("网站应用程序由两大部分组成： "),a("strong",[t._v("客户端")]),t._v("和"),a("strong",[t._v("服务器端")]),t._v("。")]),t._v(" "),a("p",[a("strong",[t._v("客户端")]),t._v("：在浏览器中运行的部分，即用户看到并能交互的界面程序，由HTML, CSS , JavaScript 构成。")]),t._v(" "),a("p",[a("strong",[t._v("服务器端")]),t._v("：在服务器中运行的部分，负责存储数据和处理应用逻辑。")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://i.niupic.com/images/2022/01/21/9TFc.png",alt:""}})]),t._v(" "),a("h2",{attrs:{id:"url"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#url"}},[t._v("#")]),t._v(" URL")]),t._v(" "),a("p",[t._v("传输协议://服务器IP或域名:端口/资源所在位置标志")]),t._v(" "),a("p",[t._v("http://nodejs.cn/learn/the-npx-nodejs-package-runner")]),t._v(" "),a("p",[t._v("端口: 默认为80")]),t._v(" "),a("h2",{attrs:{id:"怎么开发服务端"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#怎么开发服务端"}},[t._v("#")]),t._v(" 怎么开发服务端")]),t._v(" "),a("p",[t._v("在开发阶段，客户端和服务端都使用同一台电脑。")]),t._v(" "),a("p",[t._v("客户端： 浏览器")]),t._v(" "),a("p",[t._v("服务端： node")]),t._v(" "),a("p",[t._v("本机域名： localhost")]),t._v(" "),a("p",[t._v("本机IP： 127.0.0.1")]),t._v(" "),a("h2",{attrs:{id:"创建web服务器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#创建web服务器"}},[t._v("#")]),t._v(" 创建web服务器")]),t._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" http "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" app "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" http"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("createServer")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\napp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("on")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'request'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("req"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" res")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    res"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("end")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'<h1>Hello, user</h1>'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\napp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("listen")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2000")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'启动服务器, 监听2000端口'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br")])]),a("h2",{attrs:{id:"http协议"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#http协议"}},[t._v("#")]),t._v(" HTTP协议")]),t._v(" "),a("p",[a("strong",[t._v("超文本传输协议")]),t._v("， 规定如何从网站服务器传输超文本到本地浏览器，它基于客户端服务器架构工作，是客户端和服务器端请求和应答的标准。")]),t._v(" "),a("h3",{attrs:{id:"报文"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#报文"}},[t._v("#")]),t._v(" 报文")]),t._v(" "),a("p",[t._v("在http请求和响应的过程中传递的数据块叫报文，包括要传送的数据和一些附加信息，并且要遵守规定好的格式。")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://i.niupic.com/images/2022/01/21/9TFg.png",alt:""}})])])}),[],!1,null,null,null);s.default=r.exports}}]);