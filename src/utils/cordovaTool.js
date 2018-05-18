/**
 *
 *  Created by youli on 2017/12/5
 *
 */

const cordova = window.cordova || {};

// 微信插件
const Wechat = () => (window.Wechat);

// 阿里支付
const aliPay = () => ((cordova.plugins && cordova.plugins.MyAlipay.coolMethod) || {});

// 内置浏览器
const appBrowser = () => ((cordova.InAppBrowser) || {});

// 版本更新--获取版本号
const getVersionNumber = () => ((
    cordova.getAppVersion && cordova.getAppVersion.getVersionNumber()) || {}
);

// 版本更新--安卓获取权限
const permissions = () => ((cordova.plugins && cordova.plugins.permissions) || {});

// 版本更新--安卓获取存储的文件夹
const externalRootDirectory = () => ((cordova.file && cordova.file.externalRootDirectory) || {});

// 版本更新--安卓打开安装文件
const fileOpener2 = () => ((cordova.plugins && cordova.plugins.fileOpener2) || {});

// 版本更新--IOS提示框
const upgrade = () => (window.somai.upgrade);

export default {
  aliPay,
  appBrowser,
  fileOpener2,
  externalRootDirectory,
  permissions,
  getVersionNumber,
  upgrade,
  Wechat
};
