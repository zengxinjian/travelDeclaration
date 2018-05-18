/**
 *
 *  Created by youli on 2018/1/11
 *
 */

// 订单状态
const getOrderStatus = (s) => {
  let res = '';
  switch (s) {
    case 1:
      res = '待核单';
      break;
    case 2:
      res = '待充值';
      break;
    case 3:
      res = '充值中';
      break;
    case 99:
      res = '已完成';
      break;
    case -1:
      res = '已撤单';
      break;
    case -2:
      res='核单不通过';
      break;
  }
  return res;
};

// 充值进度
const getRechargeDetailStatus = (s) => {
  let res = '';
  switch (s) {
    case 0:
      res = '未充值';
      break;
    case 10:
      res = '已首充';
      break;
  }
  if (s > 10 && s < 20) {
    res = `已充值${s - 10}期`;
  }
  return res;
};

export default {
  getOrderStatus,
  getRechargeDetailStatus,
};
