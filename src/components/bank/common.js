/**
 *
 *  Created by youli on 2017/11/16
 *
 */


const bankList = [
  {
    bankCode: 'CMB',
    bankName: '招商银行',
    icon: 'spp-zhaoshang',
    bgColor: '#c55154',
    imgSrc: 'bankicon/zhaoshangyinhang.png',
    backgroundSrc: 'bankicon/zhaoshangyinhang.png'
  }, {
    bankCode: 'CCB',
    bankName: '中国建设银行',
    icon: 'spp-jiansheyinxing',
    bgColor: '#1965a1',
    imgSrc: 'bankicon/jiansheyinhang.png',
    backgroundSrc: 'bankicon/jiansheyinhang.png'
  },
  {
    bankCode: 'SPABANK',
    bankName: '平安银行',
    icon: 'spp-jiansheyinxing',
    bgColor: '#d39049',
    imgSrc: 'bankicon/pinanBank.png',
    backgroundSrc: 'bankicon/jiansheyinhang.png'
  },

  {
    bankCode: 'ABC',
    bankName: '中国农业银行',
    icon: 'spp-nongyeyinxing',
    bgColor: '#008c76',
    imgSrc: 'bankicon/nongyeyinghang.png',
    backgroundSrc: 'bankicon/nongyeyinghang.png'
  }, {
    bankCode: 'BOC',
    bankName: '中国银行',
    icon: 'line-height-33 spp-zhongguoyinxing',
    bgColor: '#b6273a',
    imgSrc: 'bankicon/zhongguoyinhang.png',
    backgroundSrc: 'bankicon/zhongguoyinhang.png'
  }, {
    bankCode: 'ICBC',
    bankName: '中国工商银行',
    icon: 'spp-gongshangyinxing',
    bgColor: '#ff0014',
    imgSrc: 'bankicon/zhongguogongshangyinhang.png',
    backgroundSrc: 'bankicon/zhongguogongshangyinhang.png'
  }, {
    bankCode: 'SPDB',
    bankName: '上海浦东发展银行',
    icon: ' spp-guangdongpufayinxing',
    bgColor: '#383ca3',
    imgSrc: 'bankicon/pufayinhang.png',
    backgroundSrc: 'bankicon/pufayinhang.png'
  }, {
    bankCode: 'BCOM',
    bankName: '交通银行',
    icon: 'margin-left-5 font30 spp-jiaotongyinxing',
    bgColor: '#383ca3',
    imgSrc: 'bankicon/jiaotongyinhang.png',
    backgroundSrc: 'bankicon/jiaotongyinhang.png'
  }, {
    bankCode: 'CMBC',
    bankName: '中国民生银行',
    icon: 'margin-left-5 font30 spp-minshengyinxing',
    bgColor: '#3d95ce',
    imgSrc: 'bankicon/minshengyinhang.png',
    backgroundSrc: 'bankicon/minshengyinhang.png'
  }, {
    bankCode: 'SDB',
    bankName: '深圳发展银行',
    icon: 'margin-left-5 font30 spp-sdb',
    bgColor: '#2173BA',
    imgSrc: 'bankicon/shenzhenfazhanyinhang.png',
    backgroundSrc: 'bankicon/shenzhenfazhanyinhang.png'
  }, {
    bankCode: 'GDB',
    bankName: '广东发展银行',
    icon: 'margin-left-5 font30 spp-guangdongfazhanyinxing',
    bgColor: '#2173BA',
    imgSrc: 'bankicon/guangdongfazhanyinhang.png',
    backgroundSrc: 'bankicon/guangdongfazhanyinhang.png'
  }, {
    bankCode: 'CITIC',
    bankName: '中信银行',
    icon: 'margin-left-5 font30 spp-zhongxinyinxing',
    bgColor: '#c55154',
    imgSrc: 'bankicon/zhongxinyinhang.png',
    backgroundSrc: 'bankicon/zhongxinyinhang.png'
  }, {
    bankCode: 'HXB',
    bankName: '华夏银行',
    icon: 'margin-left-5 font30 spp-huaxiayinxing',
    bgColor: '#c55154',
    imgSrc: 'bankicon/huaxiayinhang.png',
    backgroundSrc: 'bankicon/huaxiayinhang.png'
  }, {
    bankCode: 'CIB',
    bankName: '兴业银行',
    icon: 'spp-xingyeyinxing',
    bgColor: '#1965a1',
    imgSrc: 'bankicon/xingyeyinhang.png',
    backgroundSrc: 'bankicon/xingyeyinhang.png'
  }, {
    bankCode: 'init-GZNCXYS',
    bankName: '广州市农村信用合作社',
    icon: 'spp-guangzhoushinongcunxinyonghezuoshe',
    bgColor: '#05884f',
    imgSrc: 'bankicon/guangzhoushinongcunxinyongshe.png',
    backgroundSrc: 'bankicon/guangzhoushinongcunxinyongshe.png'
  }, {
    bankCode: 'init-GZSY',
    bankName: '广州市商业银行',
    icon: 'spp-guangzhoushishangyeyinxing',
    bgColor: '#fac82e',
    imgSrc: 'bankicon/guangzhoushishangyeyinhang.png',
    backgroundSrc: 'bankicon/guangzhoushishangyeyinhang.png'
  }, {
    bankCode: 'SRCB',
    bankName: '上海农村商业银行',
    icon: 'spp-shanghainongshangyinxingyy-copy',
    bgColor: '#1965a1',
    imgSrc: 'bankicon/shanghainongshangyinhang.png',
    backgroundSrc: 'bankicon/shanghainongshangyinhang.png'
  }, {
    bankCode: 'PSBC',
    bankName: '中国邮政储蓄银行',
    icon: 'font30 spp-zhongguoyouzhengchuxu',
    bgColor: '#008c76',
    imgSrc: 'bankicon/zhongguoyouzhengchuxu.png',
    backgroundSrc: 'bankicon/zhongguoyouzhengchuxu.png'
  }, {
    bankCode: 'CEB',
    bankName: '中国光大银行',
    icon: 'margin-left-5 font30 spp-zhongguoguangdayinxing',
    bgColor: '#1965a1',
    imgSrc: 'bankicon/guangdayinhang.png',
    backgroundSrc: 'bankicon/guangdayinhang.png'
  }, {
    bankCode: 'SHB',
    bankName: '上海银行',
    icon: 'spp-iconcopy-copy',
    bgColor: '#1965a1',
    imgSrc: 'bankicon/shanghaiyinhang.png',
    backgroundSrc: 'bankicon/shanghaiyinhang.png'
  }, {
    bankCode: 'BOB',
    bankName: '北京银行',
    icon: 'margin-left-5 font30 spp-beijingyinxing',
    bgColor: '#c55154',
    imgSrc: 'bankicon/beijingyinhang.png',
    backgroundSrc: 'bankicon/beijingyinhang.png'
  }, {
    bankCode: 'CBHB',
    bankName: '渤海银行',
    icon: 'font30 spp-bohaiyinxing',
    bgColor: '#1965a1',
    imgSrc: 'bankicon/bohaiyinhang.png',
    backgroundSrc: 'bankicon/bohaiyinhang.png'
  }, {
    bankCode: 'init-BJNCSY',
    bankName: '北京农村商业银行',
    icon: 'font30 spp-beijingnongcunshangyeyinxing',
    bgColor: '#c55154',
    imgSrc: 'bankicon/beijingnongcunshangyeyinhang.png',
    backgroundSrc: 'bankicon/beijingnongcunshangyeyinhang.png'
  }];

const commonBank = {
  bankCode: 'init-BJNCSY',
  icon: 'font30 spp-beijingnongcunshangyeyinxing',
  bgColor: 'common_bank',
  imgSrc: 'bankicon/duisizhanghu.png',
  backgroundSrc: 'bankicon/duisizhanghu.png'
};

export {
  bankList,
  commonBank
};
