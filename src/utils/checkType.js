/**
 *
 *  Created by youli on 2017/11/9
 *
 */
import {
  trim
} from './format';

const checkPhone = (phone) => {
  if (!(/^1[34578]\d{9}$/.test(phone))) {
    return false;
  }
  return true;
};

const checkAmount = amount => /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/.test(amount);

const check = (value, rules) => {
  if (!Array.isArray(rules)) {
    return null;
  }

  const val = trim(value);

  const isRequired = (rule, ruleVal) => rule.filter((item) => {
    if (item.required && !ruleVal) {
      return item;
    }
    return false;
  });

  const isPattern = (rule, ruleVal) => rule.filter((item) => {
    const {
      pattern
    } = item;
    if (pattern && !pattern.test(ruleVal)) {
      return item;
    }
    return false;
  });

  const isFunc = (rule, ruleVal) => rules.filter((item) => {
    const {
      func
    } = item;
    if (func && !func(ruleVal)) {
      return item;
    }
    return false;
  });

  const requiredError = isRequired(rules, val);

  const patternError = isPattern(rules, val);

  const funcError = isFunc(rules, val);

  const result = requiredError.concat(patternError).concat(funcError);

  if (result.length === 0) {
    return null;
  }

  return result;
};

const hasSpace = (str) => {
  if (str) {
    return (str.indexOf(' ') > -1);
  }
  return false;
};

const checkType = {
  // 油卡客户
  userName: [{
    id: '1',
    required: true,
    message: '请输入客户姓名',
    warning: '请输入客户姓名'
  }],
  userPhone: [{
    id: '1',
    required: true,
    message: '请输入客户电话',
    warning: '请输入客户电话'
  }, {
    id: '2',
    pattern: /^1[34578]\d{9}$/,
    message: '客户电话错误',
    warning: '客户电话格式错误'
  }],
  // 身份证号码
  userIdCard: [{
    id:'1',
    required:true,
    message:'请输入客户身份证号',
    warning:'请输入客户身份证号'
  },{
    id:'2',
    pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    message:'客户身份证错误',
    warning:'客户身份证错误'
  }],
  // 收单人姓名
  receiveName: [{
    id: '1',
    required: true,
    message: '请输入收单人名称',
    warning: '收单人名称不能为空'
  }],
  // 报单人姓名
  declaratName: [{
    id: '1',
    required: true,
    message: '请输入收单人名称',
    warning: '收单人名称不能为空'
  }],
  // 登录账号
  accountName: [{
    id: '1',
    required: true,
    message: '请输入账号',
    warning: '账号不能为空'
  }, {
    id: '2',
    pattern: /^1[34578]\d{9}$/,
    message: '账号错误',
    warning: '账号格式错误'
  }],

  // 登录密码
  accountPwd: [{
    id: '1',
    required: true,
    message: '请输入密码',
    warning: '密码不能为空'
  }, {
    id: '2',
    pattern: /^\S{6,24}$/,
    message: '密码错误',
    warning: '密码为6-20位数字和字母和特殊字符的组合'
  }],

  // 安全密码
  payPwd: [{
    id: '1',
    required: true,
    message: '请输入安全密码',
    warning: '安全密码不能为空'
  }, {
    id: '2',
    pattern: /^\d{6}$/,
    message: '安全密码错误',
    warning: '安全密码为6位数字'
  }],

  // 银行卡持卡人
  cardholderName: [{
    id: '1',
    required: true,
    message: '请输入持卡人名称',
    warning: '持卡人名称不能为空'
  }],

  // 油卡卡号
  oilCard: [
    {
      id: '1',
      required: true,
      message: '请输入油卡卡号',
      warning: '油卡卡号不能为空'
    },
    {
      id: '3',
      func: (val) => {
        const value = val + '';
        if(!value){
          return false;
        }
        if (value.indexOf('100011') === 0 && value.length===19) {
          return true;
        }
        else if(value.indexOf('90') ===0 && value.length===16){
          return true;
        }
        return false;
      },
      message: '油卡卡号错误',
      warning: '只支持中石化 / 中石油（卡号以90开头）的油卡'
    }
  ],

  // 银行卡号
  bankCardNo: [{
    id: '1',
    required: true,
    message: '请输入银行卡号',
    warning: '银行卡号不能为空'
  }],

  // 短信验证码
  verificaCode: [{
    id: '1',
    required: true,
    message: '请输入短信验证码',
    warning: '短信验证码不能为空'
  }, {
    id: '2',
    pattern: /^\d{6}$/,
    message: '短信验证码错误',
    warning: '短信验证码为6位数字'
  }],

  // phone
  phone: [{
    id: '1',
    required: true,
    message: '请输入手机号',
    warning: '手机号不能为空'
  }, {
    id: '2',
    pattern: /^1[34578]\d{9}$/,
    message: '手机号错误',
    warning: '手机号码格式错误'
  }]
};

const isObject = (val) => {
  if (typeof val === 'object') {
    return true;
  }
  return false;
};

const notEmpty = msg => ({
  required: true,
  message: `请输入${msg}`,
  warning: `${msg}不能为空`
});

export {
  check,
  checkPhone,
  checkAmount,
  hasSpace,
  checkType,
  isObject,
  notEmpty
};
