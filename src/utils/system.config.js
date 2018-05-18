/**
 *
 *  Created by youli on 2017/11/22
 *
 */
const systemConfig = window.systemConfig || {};
const { isService, isClient,isUser,ykUserDomain='ykuser.cibyun.com',hasBankFeatures=true } = systemConfig;
const isWeb = true;
const isAndroid = false;
const isIOS = false;
const isApp = !isWeb;
const companyPhone = {
  text: '400-961-5200',
  value: '4009615200'
};

// android 配置
const androidApi = 'android.tkapi.taiduzhifu.com';
const androidWeChatAppId = 'wxfe16ca93b682e0c8';

// IOS 配置
const iosApi = 'ios.tkapi.taiduzhifu.com';
const iosWeChatAppId = 'wxfe16ca93b682e0c8';

// 生产 环境配置
const webProductApi = 'ykapi.cibyun.cn';
const webProductDomain = 'yk.cibyun.cn';
const webProductWeChatAppId = 'wx4c15340af6f1607f';

// 正式 环境配置
const webApi = 'ykapi.cibyun.cn';
const webDomain = 'yk.cibyun.cn';
const webWeChatAppId = 'wx118ee470612b0913';

// 是否生产环境
const isWebProduct = () => {
  const { href } = location;
  return href.indexOf('http://tk.taiduzhifu.com') === -1;
};

//  环境选择器
const compareEnvironment = (config) => {
  const { webProduct, web, android, ios } = config;
  let url = '';
  if (isWeb) {
    if (isWebProduct()) {
      url = webProduct;
    } else {
      url = web;
    }
  } else if (isAndroid) {
    url = android;
  } else if (isIOS) {
    url = ios;
  }
  return url;
};

const api = compareEnvironment({
  webProduct: webProductApi,
  web: webApi,
  android: androidApi,
  ios: iosApi
});

const web = compareEnvironment({
  webProduct: webProductDomain,
  web: webDomain,
  android: webDomain,
  ios: webDomain
});

const weChatId = compareEnvironment({
  webProduct: webProductWeChatAppId,
  web: webWeChatAppId,
  android: androidWeChatAppId,
  ios: iosWeChatAppId
});

export default {
  systemConfig,
  isApp,
  isAndroid,

  api,
  web,

  weChatId,
  companyPhone,

  isClient,
  isService,
  isUser,
  hasBankFeatures,
  ykUserDomain,
};
