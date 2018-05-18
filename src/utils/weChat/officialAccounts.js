/**
 *
 *  Created by youli on 2017/12/9
 *
 */

import { storageKey, getStorage, setStorage } from '../storage';
import { api, weChatId, web } from '../system.config';
import { http } from '../request';
import { systemError } from '../dialog';
import { getwechantjsconfig } from '../apiMap';
import { getQueryString, goPage } from '../tool';


const wx = window.wx || {};

// 判断是否微信浏览器
const isWeChat = () => (new Promise((resolve, reject) => {
  const ua = navigator.userAgent.toLowerCase();
  const weChatStr = ua.match(/microMessenger/i);

  if (weChatStr && weChatStr.indexOf('micromessenger') > -1) {
    resolve();
  } else {
    reject();
  }
}));

// 获取微信授权
const auth = () => new Promise((resolve, reject) => (
  isWeChat().then(
    () => {
      let openid = getStorage(storageKey.weChatOpenId);

      if (!openid) {
        openid = getQueryString('openid');
      }

      if (openid) {
        setStorage(storageKey.weChatOpenId, openid);
        resolve();
        return;
      }

      reject();

      const STATE = encodeURIComponent(location.pathname);

      const REDIRECT_URI = encodeURIComponent(`http://${api}/api/WeiXin/GetWeiXinUserInfo`);

      const SCOPE = 'snsapi_base';

      const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${weChatId}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}&state=${STATE}#wechat_redirect`;

      location.href = url;
    },
    () => {
      reject();
    }
  )
));

// 微信公众号支付
const pay = ({ parame }) => {
  setStorage(storageKey.wxPayParam, parame);
  goPage('/pay/wxPay');
};

// 微信支付
const wxPay = () => new Promise((resolve, reject) => {
  const parame = getStorage(storageKey.wxPayParam);
  const onBridgeReady = () => {
    window.WeixinJSBridge.invoke(
      'getBrandWCPayRequest', {
        appId: parame.appId, // 公众号名称，由商户传入
        timeStamp: parame.timeStamp, // 时间戳，自1970年以来的秒数
        nonceStr: parame.nonceStr, // 随机串
        package: parame.package,
        signType: 'MD5', // 微信签名方式：
        paySign: parame.paySign // 微信签名
      },
      (res) => {
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          resolve({ responseData: parame, type: 'ok' });
        } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
          resolve({ responseData: parame, type: 'cancel' });
        } else {
          reject({ responseData: parame, type: 'cancel' });
        }
      },
    );
  };
  if (typeof WeixinJSBridge === 'undefined') {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }
  } else {
    onBridgeReady();
  }
});

// 初始化微信js
const initWechatJSConfig = () => new Promise((resolve, reject) => {
  isWeChat().then(
    () => {
      const openid = getStorage(storageKey.weChatOpenId);
      const authUrl = [
        getStorage(storageKey.weChatJsConfig),
        location.href.split('#')[0],
        `http://${web}/?openid=${openid}`
      ];
      const wxConfig = data => new Promise((wxConfigResolve, wxConfigReject) => {
        wx.config({
          debug: false,
          appId: data.appId,
          timestamp: data.timestamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'translateVoice', 'startRecord', 'stopRecord', 'onRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard']
        });

        wx.ready(() => {
          wxConfigResolve();
        });

        wx.error(() => {
          wxConfigReject();
        });
      });

      const initWeChat = url => new Promise((initWeChatResolve, initWeChatReject) => {
        http(getwechantjsconfig, { url: encodeURIComponent(url) }).then(
          (data) => {
            wxConfig(data).then(
              () => {
                initWeChatResolve();
              },
              () => {
                initWeChatReject();
              }
            );
          },
          (data) => {
            initWeChatReject();
            systemError(JSON.stringify(data));
          },
        );
      });

      initWeChat(authUrl[0]).then(
        resolve, () => {
          initWeChat(authUrl[1]).then(
            resolve,
            reject,
          );
        }
      );
    },
    () => {
      reject();
    }
  );
});

// 分享
const share = ({
                 title,
                 desc,
                 link,
                 imgUrl,
                 success = () => {
                 },
                 cancel = () => {
                 }
               }) => (new Promise((resolve, reject) => {
                 initWechatJSConfig().then(
    () => {
      const result = {
        title,
        link,
        imgUrl,
        desc,
        success,
        cancel
      };


      wx.onMenuShareAppMessage(result);

      // 分享到朋友圈
      wx.onMenuShareTimeline(result);

      // 分享给朋友
      wx.onMenuShareAppMessage(result);

      // 分享到QQ
      wx.onMenuShareQQ(result);

      // 分享到腾讯微博
      wx.onMenuShareWeibo(result);

      // 获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
      wx.onMenuShareQZone(result);

      resolve();
    },
    () => {
      reject();
    }
  );
               }));


const initWeixin = () => {
  initWechatJSConfig().then(() => {
  }, () => {
    // alert('授权失败')
  });
};


export {
  isWeChat,
  auth,
  pay,
  share,
  initWeixin,
  wxPay
};
