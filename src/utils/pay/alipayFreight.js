/**
 *  运费支付宝支付
 */
import { isWeChat } from '../weChat/index';
import { goPage } from '../tool';

const aliFegihtPay = ({ parame }) => {
  const { Result, FreightMoney } = parame;
    // 检查是否是微信浏览器
  isWeChat().then(
        () => {
            // 去支付宝支付页面
          const keys = Object.keys(parame);
          const result = keys.filter(item => item.toUpperCase() === 'ORDERID');
          const orderId = parame[result[0]];
          if (location.href.indexOf('/pay/alipayFeight') === -1) {
            const resultUrl = encodeURIComponent(Result);
            goPage(`/pay/alipayFeight/${orderId}/${FreightMoney}/${resultUrl}`);
          }
        }, () => {
            // 跳转支付
    location.href = Result;
  });
};
export default {
  aliFegihtPay
};
