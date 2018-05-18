/**
 *
 *  Created by youli on 2017/11/29
 *
 */
import { Modal } from 'antd-mobile';
import { isApp } from '../system.config';
import { http } from '../request';
import { payOrderAliPay } from '../apiMap';
import { appBrowser, aliPay } from '../cordovaTool';
import { isWeChat } from '../weChat/index';
import { goPage } from '../tool';

const scancodePay = ({ parame, payType }) => new Promise((resolve, reject) => {
  http(payOrderAliPay, {
    ...parame,
    PayType: payType
  }).then((data) => {
    const { Result } = data;

    if (isApp) {
      Modal.alert(
        '是否支付成功？',
        '',
        [
          {
            text: '取消',
            onPress: () => {
              resolve({ responseData: data, payType, type: 'cancel' });
            }
          },
          {
            text: '确定',
            onPress: () => {
              resolve({ responseData: data, payType, type: 'ok' });
            }
          }
        ],
      );
      appBrowser().open(Result, '_system', 'location=yes');
    } else {
      isWeChat().then(
        () => {
          // 去支付宝支付页面
          const keys = Object.keys(parame);
          const result = keys.filter(item => item.toUpperCase() === 'ORDERID');
          const orderId = parame[result[0]];

          if (location.href.indexOf('/pay/alipay') === -1) {
            goPage(`/pay/alipay/${orderId}`);
          }
        },
        () => {
          // 跳转支付
          location.href = Result;
        }
      );
    }
  }, () => {
    reject();
  });
});

const appPay = ({ parame, payType }) => new Promise((resolve) => {
  const { Result } = parame;
  aliPay()(Result, (msg) => {
    resolve({ responseData: parame, payType, type: 'ok', msg });
  }, (msg) => {
    resolve({ responseData: parame, payType, type: 'fail', msg });
  });
});

export default {
  scancodePay,
  appPay
};
