/**
 *
 *  Created by youli on 2017/11/29
 *
 */
import { Modal } from 'antd-mobile';
import { isApp } from '../system.config';
import { appBrowser } from '../cordovaTool';

const bankcardPay = ({ parame, payType }) => new Promise((resolve) => {
  const { Result } = parame;

  if (isApp) {
    Modal.alert(
      '是否支付成功？',
      '',
      [
        {
          text: '取消',
          onPress: () => {
            resolve({ responseData: parame, payType, type: 'cancel' });
          }
        },
        {
          text: '确定',
          onPress: () => {
            resolve({ responseData: parame, payType, type: 'ok' });
          }
        }
      ],
    );

    appBrowser().open(Result, '_system', 'location=yes');
    return;
  }

  // web
  location.href = Result;
});

export default {
  bankcardPay
};
