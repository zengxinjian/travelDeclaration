/*
 {
 "entry": "src/index.js",
 "env": {
 "development": {
 "extraBabelPlugins": [
 "dva-hmr",
 "transform-runtime"
 ]
 },
 "production": {
 "extraBabelPlugins": [
 "transform-runtime"
 ]
 }
 }
 }
 */
const path = require('path'),
  pxtorem = require('postcss-pxtorem');

const svgSpriteDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''), // antd-mobile 内置svg
  path.resolve(__dirname, 'src/assets'),  // 业务代码本地私有 svg 存放目录
];

export default {
  entry: 'src/index.js',
  svgSpriteLoaderDirs: svgSpriteDirs,
  theme: "./theme.config.js",
  proxy: {
    "/api": {
      "target": "http://t.ylpapi.cibyun.com",
      "changeOrigin": true,
      /*"pathRewrite": {"^/api": ""}*/
    }
  },
  resolve: {
    extensions: ['js', '.jsx']
  },
  autoprefixer: {
    "browsers": [
      "last 4 versions",
      "Firefox ESR",
      "> 1%",
      "ie >= 8",
      "iOS >= 8",
      "Android >= 4"
    ]
  },
  env: {
    development: {
      extraBabelPlugins: [
        'dva-hmr',
        'transform-runtime',
        ['import', {'libraryName': 'antd-mobile', 'libraryDirectory': 'lib', 'style': true}]
      ],
    },
    production: {
      extraBabelPlugins: [
        'dva-hmr',
        'transform-runtime',
        ['import', {'libraryName': 'antd-mobile', 'libraryDirectory': 'lib', 'style': true}]
      ],
    }
  }
}

