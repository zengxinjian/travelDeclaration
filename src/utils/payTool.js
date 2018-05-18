/**
 *
 *  Created by youli on 2017/11/29
 *
 */
import { http } from './request';
import { scancodePay, appPay } from './pay/aliPay';
import { aliFegihtPay } from './pay/alipayFreight';
import { linePay } from './pay/linePay';
import { pay as weChatPay } from './weChat/index';
import { bankcardPay } from './pay/bankcardPay';
import { getStorage, storageKey, setStorage } from './storage';
import { getPayChannels } from './apiMap';

const payMethods = {
  WeiXin: {
    type: '1',
    title: '微信公众号支付',
    pay: (data) => {
      const result = JSON.parse(data.Result);
      result.OrderId = data.OrderId;
       // 跳转路径 orderType 1 订单支付
      result.href = `/pay/result/${data.OrderId}/1`;

      return weChatPay({ parame: result, payType: 1 });
    }
  },
  lineSingle: {
    type: '2',
    title: '线下报单'
  },
  Backstage: {
    type: '4',
    title: '云宝抵用券'
  },
  FastPay: {
    type: '3',
    title: '快捷支付',
    pay: data => bankcardPay({ parame: data, payType: 3 })
  },
  AliPay: {
    type: '5',
    title: '支付宝扫码支付',
    pay: data => scancodePay({ parame: data, payType: 5 })
  },
  OfficalAliPay: {
    type: '6',
    title: '支付宝App支付',
    pay: data => appPay({ parame: data, payType: 6 })
  },
  OffLinePay: {
    type: '7',
    title: '线下转账付款',
    pay: data => linePay({ parame: data, payType: 7 })
  }
};


// 运费支付的支付方式
const payMethodsFeight = {
  WeiXin: {
    type: '1',
    title: '微信公众号支付',
    pay: (data) => {
      // 跳转路径 orderType 2 运费支付
      const result = JSON.parse(data.Result);
      result.href = `/pay/result/${data.OrderId}/2`;

      return weChatPay({ parame: result, payType: 1 });
    }
  },
  FastPay: {
    type: '3',
    title: '快捷支付',
    pay: data => bankcardPay({ parame: data, payType: 3 })
  },

  AliPay: {
    type: '5',
    title: '支付宝扫码支付',
    pay: data => aliFegihtPay({ parame: data, payType: 5 })
  },

  OfficalAliPay: {
    type: '6',
    title: '支付宝App支付',
    pay: data => appPay({ parame: data, payType: 6 })
  },
  OffLinePay: {
    type: '7',
    title: '线下转账付款',
    pay: data => linePay({ parame: data, payType: 7 })
  }
};

// 获取支付方式  1代表运费支持
const getPayType = (type) => {
  switch (type) {
    case 1 :
      return payMethodsFeight;
    default:
      return payMethods;
  }
};


const getPayMthod = supportType => new Promise((resolve) => {
  const sessionData = getStorage(storageKey.payMethods);
  const { hasGetData, payMedthods } = sessionData || {};

  const supportMen = getPayType(supportType);

  const getPayDetails = (items) => {
    const result = items.map(item => supportMen[item]);

    resolve(result);
  };

  if (payMedthods && hasGetData) {
    getPayDetails(payMedthods);
    return;
  }

  http(getPayChannels).then((data) => {
    const result = Object.keys(data).filter(item => data[item] === '1');
    setStorage(storageKey.payMethods, {
      hasGetData: true,
      payMedthods: result
    });
    getPayDetails(result);
  });
});

const getPayMthodName = (type) => {
  const keys = Object.keys(payMethods);


  const result = keys.filter(item => (parseInt(payMethods[item].type) === parseInt(type)));

  if (result.length === 0) {
    return '未知';
  }
  return payMethods[result[0]].title;
};

export {
  payMethods,
  getPayMthodName,
  getPayMthod
};
