/**
 * niekl 2017-12-20
 * 时间格式化
 */

import moment from 'moment';
// 相对单前天数相加
const addDays = (number, format) => {
  const formats = format || 'YYYY-MM-DD';
  const date = moment().add(number, 'd');
  const params = {
    date,
    formatDate: date.format(formats)
  };
  return params;
};

const subtractDays = (number, format) => {
  const formats = format || 'YYYY-MM-DD';
  const date = moment().subtract(number, 'd');
  const params = {
    date,
    formatDate: date.format(formats),
    nowDate: moment(),
    nowDateFormat: moment().format(formats)
  };
  return params;
};

const formDate = (number, format) => {
  const formats = format || 'YYYY-MM-DD';
  return moment(number).format(formats);
};

const booFormat = str => !(str === 'undefined' || str === 'false');
// 2个时候比较
const isBefore = (strD, endD) => moment(strD).isBefore(endD);

// 2个时间差多少天
const diffDay = (state, endState, splitStr) => {
  const splitStrs = splitStr || '-';
  const stateD = state.split(splitStrs);
  const endD = endState.split(splitStrs);
  const a = moment(stateD);
  const b = moment(endD);
  return a.diff(b, 'days');
};

const nowDate = () => moment();

export { addDays, subtractDays, formDate, booFormat, isBefore, diffDay, nowDate };
