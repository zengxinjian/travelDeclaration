/**
 * 线下支付
 */
import { goPage } from '../tool';

const linePay = (parame) => {
  const { OrderId } = parame.parame;
  goPage(`/pay/linePay/${OrderId}`);
};
// 导出
export default {
  linePay
};
