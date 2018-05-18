/**
 *
 *  Created by youli on 2017/12/9
 *
 */

import { fail, success } from '../dialog';
import { Wechat } from '../cordovaTool';

// 检测是否安装微信App
const isWeChat = () => (new Promise((resolve, reject) => {
  Wechat().isInstalled(
    (installed) => {
      if (!installed) {
        fail('未检测到微信客户端');
        reject();
      } else {
        resolve();
      }
    },
    () => {
      fail('未检测到微信客户端');
      reject();
    }
  );
}));

// 微信授权
const auth = () => (new Promise((resolve = () => {
}, reject = () => {
}) => {
  const scope = 'snsapi_userinfo';
  const state = `_${+new Date()}`;

  isWeChat().then(
    () => {
      Wechat().auth(
        scope,
        state,
        (response) => {
          resolve(response);
        },
        (reason) => {
          fail('授权失败');
          reject(reason);
        });
    },
    () => {
      reject();
    }
  );
}));

// 支付
const pay = params => (new Promise((resolve, reject) => {
  Wechat().sendPaymentRequest(
    params,
    () => {
      success('支付成功', resolve);
    },
    () => {
      success('支付失败', reject);
    });
}));

// 分享
const share = ({
                 scene, // 0:聊天界面，1：朋友圈
                 title,
                 desc,
                 link,
                 imgUrl
               }) => (new Promise((resolve, reject) => {
                 try {
                   isWeChat().then(
      () => {
        const wxHanlder = Wechat();
        wxHanlder.share({
          message: {
            title,
            description: desc,
            thumb: imgUrl,
            mediaTagName: 'TEST-TAG-001',
            messageExt: '这是第三方带的测试字段',
            messageAction: '<action>dotalist</action>',
            media: {
              type: wxHanlder.Type.WEBPAGE,
              webpageUrl: link
            }
          },
          scene: scene === 0 ? wxHanlder.Scene.SESSION : wxHanlder.Scene.TIMELINE
        },
          resolve,
          reject);
      },
      reject
    );
                 } catch (e) {
                   throw e;
                 }
               }));

export default {
  isWeChat,
  auth,
  pay,
  share
};
