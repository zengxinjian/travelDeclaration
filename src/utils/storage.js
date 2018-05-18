/**
 * Created by Administrator on 2017/9/2.
 */
import {
  goLogin, getQueryString
} from './tool';
import {
  isObject
} from './checkType';
import {
  weChatId
} from './system.config';


const isSession = type => (type === 'session');

const storageKey = {
  userToken: {
    name: 'token1',
    isObjectData: false,
    outClear: true
  },
  userInfo: {
    name: 'userInfo',
    isObjectData: true,
    outClear: true
  },
  adminToken: {
    name: 'admin-token',
    isObjectData: false,
    outClear: true
  },
  adminInfo: {
    name: 'admin-Info',
    isObjectData: true,
    outClear: true
  },
  adminCheckList_selectIndex:{
    name: 'adminCheckList_selectIndex',
    type: 'session',
    outClear: true
  },
  adminOrder_audit: {
    name: 'adminOrderAudit',
    type: 'session',
    isObjectData: true,
    fail: 'toLogin',
    outClear: true
  },
  adminOrder_carryout: {
    name: 'adminOrderCarryOut',
    type: 'session',
    isObjectData: true,
    fail: 'toLogin',
    outClear: true
  },
  adminOrder_recharge: {
    name: 'adminOrderrecharge',
    type: 'session',
    isObjectData: true,
    fail: 'toLogin',
    outClear: true
  },
  adminOrder_recharge_error: {
    name: 'adminOrderrecharge_error',
    type: 'session',
    isObjectData: true,
    fail: 'toLogin',
    outClear: true
  },
  adminOrder_recharge_bank: {
    name: 'adminOrderrecharge_bank',
    type: 'session',
    isObjectData: true,
    fail: 'toLogin',
    outClear: true
  },

  adminOrder_recharge_auto_bank: {
    name: 'adminOrderrecharge_auto_bank',
    type: 'session',
    isObjectData: true,
    fail: 'toLogin',
    outClear: true
  },
  adminOrder_recharge_auto_bank_error: {
    name: 'adminOrderrecharge_auto_bank_error',
    type: 'session',
    isObjectData: true,
    fail: 'toLogin',
    outClear: true
  },
  adminOrder_orderlist_cache: {
    name: 'adminOrder_orderlist_cache',
    type: 'session',
    isObjectData: true,
    outClear: true
  },
  admin_bank_order:{
    name:'admin_bank_order',
    type: 'session',
    isObjectData: true,
    outClear: true
  }
};

const setStorage = (item, value) => {
  const {
    name
  } = item;
  let result = value;

  if (isObject(value)) {
    result = JSON.stringify(value);
  }

  if (isSession(item.type)) {
    sessionStorage.setItem(name, result);
  } else {
    localStorage.setItem(name, result);
  }
};


const getStorage = (item) => {
  const {
    name,
    type,
    isObjectData,
    fail
  } = item;
  let result = '';

  if (isSession(type)) {
    result = sessionStorage.getItem(name);
  } else {
    result = localStorage.getItem(name);
  }

  if (!result) {
    switch (fail) {
      case 'toLogin':
        goLogin();
        break;
      case 'openId':
        return getQueryString('openid');
      default:
        break;
    }
    return '';
  }


  return isObjectData ? JSON.parse(result) : result;
};

const removeStorage = (item) => {
  const {
    name,
    type
  } = item;
  if (isSession(type)) {
    sessionStorage.removeItem(name);
  } else {
    localStorage.removeItem(name);
  }
};

// 清除只有退出才清除的session/local
const clearStorage = () => {
  for (const i in storageKey) {
    if (storageKey[i].outClear) {
      removeStorage(storageKey[i]);
    }
  }
};


const isLogin = () => (!!getStorage(storageKey.userToken));

const todayHasNotDo = (action, day) => {
  if (!isLogin()) {
    return;
  }
  const data = getStorage(action);
  if (!data) {
    setStorage(action, day);
    return true;
  }
};


export default {
  storageKey,
  setStorage,
  getStorage,
  removeStorage,
  clearStorage,
  isLogin,
  todayHasNotDo
};
