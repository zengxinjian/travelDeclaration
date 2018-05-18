/**
 *
 *  Created by youli on 2017/11/12
 *
 */

import { hashHistory } from 'dva/router';
import { isApp, isClient } from './system.config';

const goBack = () => {
  hashHistory.goBack();
};

const goPage = (url) => {
  location.href = `${url}`;
};

const goLogin = () => {
  /* const href = location.href;
  if (href.indexOf('/service/') > -1) {
    goPage('/service/account/login');
  }
  else {
    goPage('/client/account/login');
  }*/
  if (isClient) {
    goPage('/client/account/login');
  } else {
    goPage('/service/account/login');
  }
};

// 获取浏览器参数
const getQueryString = (name) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return null;
};

// 背景图遮罩提示
const showTips = (src, className) => {
  const html = `<img class=${className} src=${src} />`;
  const element = document.createElement('div');
  const clickFn = function clickFn() {
    this.parentNode.removeChild(this);
  };

  element.setAttribute('class', 'spp-action');

  element.onclick = clickFn;

  element.innerHTML = html;

  document.body.appendChild(element);
};

// 图片提示
const showImgTips = (src, click = () => {
}) => {
  const html = `<div class="bg"></div><div class="img"><img src=${src} /></div>`;
  const element = document.createElement('div');
  const clickFn = function clickFn(e) {
    const nodeName = (e && e.target && e.target.nodeName);

    if (nodeName === 'IMG') {
      click();
    }

    this.parentNode.removeChild(this);
  };

  element.setAttribute('class', 'spp-action-image');

  element.onclick = clickFn;

  element.innerHTML = html;

  document.body.appendChild(element);
};

export {
  goPage,
  goBack,
  goLogin,
  getQueryString,
  showTips,
  showImgTips
};
