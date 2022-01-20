---
title: vue项目中的webpack配置
date:  2021-08-17
categories:
 - vue
tags:   
 - webpack
---


### vue.config.js

**`vue.config.js` 是一个可选的配置文件，如果项目的 (和 `package.json` 同级的) 根目录中存在这个文件，那么它会被 `@vue/cli-service` 自动加载。你也可以使用 `package.json` 中的 `vue` 字段，但是注意这种写法需要你严格遵照 JSON 的格式来写。**

[vue.config.js配置参考](https://cli.vuejs.org/zh/config/#vue-config-js)

```javascript
// vue.config.js 个人

const path = require('path');
const productionGzipExtensions = ['js', 'css']
const webpack = require("webpack");

// 使用gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    publicPath: '/',   //部署应用包时的基本 URL, 默认：'/'
    outputDir: 'dist',  //打包时构建的文件目录， 使用 --no-clean 可关闭打包前清除的行为 
    assetsDir: '',      //打包生成的静态资源相对 outputDir 的目录, 默认 ''
    indexPath: 'index.html',// index.html 的输出路径 (相对于 outputDir)
    lintOnSave: false,  // eslint检测 boolean | 'warning' | 'default' | 'error'
    productionSourceMap: false, // 设置生产环境的source map是否启动
    configureWebpack: config => { // 调整 webpack 配置, 该对象将会被 webpack-merge 合并入最终的 webpack 配置
        // 生产环境下进行压缩
        if (process.env.NODE_ENV === 'production') {
            config.plugins.push(...[
                new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),  //moment 2.18 会将所有本地化内容和核心功能一起打包（见该 GitHub issue），可使用 IgnorePlugin 在打包时忽略本地化内容
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            drop_debugger: true,
                            drop_console: true
                        }
                    },
                    sourceMap: false,
                    parallel: true
                }),
                // 配置compression-webpack-plugin压缩
                new CompressionWebpackPlugin({
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 10240,
                    minRatio: 0.8
                })
            ])
        }
    },
    chainWebpack: config => {  // 对vue cli内部的 webpack 配置进行更细粒度的修改

        // 设置别名
        config.resolve.alias
            .set('@', resolve('src'))
            .set('src', resolve('src'))
            .set('options', resolve('src/const/option.js'))
            .set('components', resolve('src/components'))
            .set('utils', resolve('src/util'))
            .set('assets', resolve('src/assets'))
            .set('api', resolve('src/api'));

        config.module
            .rule('excel')
            .test(/\.xlsx$/)
            .use('url-loader')
            .loader('url-loader')
            .options({
                symbolId: 'files/[name].[ext]'
            })
            .end()

        config.externals({
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'vuex': 'Vuex',
            'axios': 'axios',
            'element-ui': 'ELEMENT',
        });

        const entry = config.entry('app');
        entry.add('babel-polyfill').end();
        entry.add('classlist-polyfill').end();
        // entry.add('@/mock').end(); //模拟后端数据

    },
    devServer: {
        port: 8000, //启动端口
        proxy: {
            '/api': {
                target: 'http://114.55.170.49:9889',
                ws: true,   // websocket 
                pathRewrite: {
                    '^/api': '' //修改路径
                }
            }
        }
    }
};
```

