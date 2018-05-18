/**
 *
 *  Created by youli on 2017/11/10
 *  格式化数据方法
 */
import {checkAmount} from './checkType';

// 保留两位小数
const toFixed = (num) => {
  if (!num) {
    return '0.00';
  }
  if (!checkAmount(num)) {
    return '0.00';
  }
  const res = parseFloat(num);
  return res.toFixed(2);
};

// 大额添加，隔离
const addComma = (money) => {
  /* if (num < 1000) {
    return num;
  }*/
  const numArr = money.split('.');
  const num = (numArr.length > 0 ? numArr[0] : money);
  const arr = String(num).split('').reverse();
  const result = [];

  arr.map((item, index) => {
    if (index !== 0 && index % 3 === 0) {
      result.push(',');
      result.push(item);
      return result;
    }
    result.push(item);
    return result;
  });

  return result.reverse().join('') + (numArr.length > 0 ? (`.${numArr[1]}`) : '');
};

// 大额显示
const integral = num => addComma(toFixed(num));

// 去除所有空格
const trim = (str) => {
  if (!str) {
    return '';
  }
  const encodeStr = encodeURIComponent(str);
  const result = encodeStr.replace(/%E2%80%86/g, '').replace(/%20/g, '');
  return decodeURIComponent(result);
};

// 手机号隐藏
const phone = (str) => {
  if (!str) {
    return '';
  }
  return `${str.substr(0, 3)}****${str.substr(7, 4)}`;
};

// 银行卡隐藏
const bankCardNo = (str) => {
  if (!str) {
    return '';
  }
  const len = str.length;
  return `${str.substr(0, 4)} **** **** ** ${str.substr(len - 3, len)}`;
};
// 整形
const number = str => Number(str);

// 减法函数
const Subtr = (arg1, arg2) => {
  let r1 = '';
  let r2 = '';
  let m = '';
  let n = '';
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  // last modify by deeka
  // 动态控制精度长度
  n = (r1 >= r2) ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
};

const date = (s, format) => {
  if (!s) {
    return '';
  }
  let temp='T';
  if(s.indexOf('T')>-1){
    temp='T';
  }
  if(s.indexOf(' ')>-1){
    temp=' ';
  }
  const d = {
    date: s.substr(0, s.indexOf(temp)),
    time: s.substring(s.indexOf(temp) + 1, s.indexOf('.') > -1 ? s.indexOf('.') : s.length)
  };
  if (format === 'D') {
    return `${d.date}  ${d.time}`;
  }
  return d;
};

function toCDB(str)
{
  var tmp = "";
  for(var i=0;i<str.length;i++)
  {
    if(str.charCodeAt(i)>65248&&str.charCodeAt(i)<65375)
    {
      tmp += String.fromCharCode(str.charCodeAt(i)-65248);
    }
    else
    {
      tmp += String.fromCharCode(str.charCodeAt(i));
    }
  }
  return tmp
}
export {integral, trim, phone, bankCardNo, number, Subtr, date,toCDB};
