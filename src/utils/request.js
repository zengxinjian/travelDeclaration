import fetch from 'dva/fetch';
import { objToUrlParame } from './conver';
import { getStorage, storageKey } from './storage';
import { goLogin } from './tool';
import { loading, hide, systemError } from './dialog';

const parseJSON = response => response.json();

const checkStatus = response => response;

const request = (url, options, config) => new Promise((resolve, reject) => {
  const { hideFail, hideLoading } = config;
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  };
  const token = getStorage(storageKey.userToken);

  if (token) {
    headers.Authorization = `Partner ${encodeURIComponent(token)}`;
  }

  if (!hideLoading) {
    loading('正在加载');
  }

  fetch(url, {
    ...options,
    headers
  })
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      const { Status } = data;
      if (Status === -100) {
        // 未登录
        goLogin();
        return;
      }

      if (data.IsSuccess) {
        resolve(data.Data);
        return;
      }

      reject(data);
      const error = new Error(data);
      error.message = data.Mes;
      throw error;
    })
    .catch((e) => {
      hide();
      reject();
      if (!hideFail) {
        systemError(e.message);
      }
      throw e;
    });
});

const httpGet = (url, data, config) => {
  let requestUrl = (url);
  const parame = objToUrlParame(data);

  if (parame) {
    if (requestUrl.indexOf('?') < 0) {
      requestUrl += `?${parame}`;
    } else {
      requestUrl += `&${parame}`;
    }
  }

  return request(requestUrl, {}, config);
};

const httPost = (url, data, config) => {
  const requestUrl = (url);

  const opt = {
    method: 'POST',
    body: JSON.stringify(data)
  };

  return request(requestUrl, opt, config);
};

const http = (requestApi, option, hideLoading) => {
  const data = {
    ...option
  };

  const { hideFail = false, hideLoading: apiHideLoading = false } = requestApi;
  const hideLoad = hideLoading || apiHideLoading;
  switch (requestApi.method) {
    case 'post':
      return httPost(requestApi.url, data, { hideFail, hideLoading: hideLoad });
    case 'get':
    default:
      return httpGet(requestApi.url, data, { hideFail, hideLoading: hideLoad });
  }
};


export default {
  http
};
