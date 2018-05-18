import React from 'react';
import {Router, Route,IndexRoute} from 'dva/router';
import Layout from './components/layout/index';
import ClientLogin from './routes/client/account/login';
import {isUser,isClient} from './utils/system.config';


import styles from './common.less';

const getComponent = function (nextState, cb) {
  require.ensure([], (require) => {
    cb(null, require(this.filePath));
  });
};

function RouterConfig({history, app}) {
  const client = {
    path: 'client',
    childRoutes: [
      {
        path: 'account',
        childRoutes: [
          {
            path: 'login',
            filePath: './routes/client/account/login',
            getComponent
          },
          {
            path: 'editLoginPwd',
            filePath: './routes/client/account/editLoginPwd',
            getComponent
          },
          {
            path: 'myBankCard',
            filePath: './routes/client/account/myBankCard',
            getComponent
          },
          {
            path: 'bankCardDetails/:id',
            filePath: './routes/client/account/bankCardDetails',
            getComponent
          },
          {
            path: 'bankCardAdd',
            filePath: './routes/client/account/bankCardAdd',
            getComponent
          }
        ]
      },
      {
        path: 'order',
        childRoutes: [
          {
            path: 'add',
            filePath: './routes/client/order/add',
            getComponent
          },
          {
            path: 'list',
            filePath: './routes/client/order/list',
            getComponent
          },
          {
            path: 'detail/:orderId',
            filePath: './routes/client/order/detail',
            getComponent
          },
          {
            path: 'rechargDetail/:orderId',
            filePath: './routes/client/order/rechargDetail',
            getComponent
          },
          {
            path: 'editOilNo/:orderId/:type',
            filePath: './routes/client/order/editOilNo',
            getComponent
          },
          {
            path: 'editBankNo/:orderId/:type',
            filePath: './routes/client/order/bankNo',
            getComponent
          },
          {
            path: 'total',
            filePath: './routes/client/order/total',
            getComponent
          },
          {
            path: 'bankFrom',
            filePath: './routes/client/order/bankDeclarationForm',
            getComponent
          }
        ]
      },
      {
        path: 'notice',
        childRoutes: [
          {
            path: 'list',
            filePath: './routes/client/notice/list',
            getComponent
          },
          {
            path: 'userlist',
            filePath: './routes/client/notice/userlist',
            getComponent
          },
        ]
      },
      {
        path: 'receive',
        childRoutes: [
          {
            path: 'list',
            filePath: './routes/client/receive/list',
            getComponent
          },
          {
            path: 'detail',
            filePath: './routes/client/receive/detail',
            getComponent
          },
          {
            path: 'add',
            filePath: './routes/client/receive/add',
            getComponent
          }
        ]
      }
    ]
  };
  const user={
    path:'user',
    childRoutes:[
      {
        path: 'order',
        childRoutes: [
          {
            path: 'list',
            filePath: './routes/user/order/userlist',
            getComponent
          },
        ]
      },
      {
        path: 'notice',
        childRoutes: [
          {
            path: 'list',
            filePath: './routes/user/notice/list',
            getComponent
          },
        ]
      },
      {
        path: 'account',
        childRoutes: [
          {
            path: 'index',
            filePath: './routes/user/account/index',
            getComponent
          },
        ]
      },
    ]
  };
  const getIndex=()=>{
      return ClientLogin;
  }

  const routes = [
    {
      path: '/',
      component: Layout,
      indexRoute: {component: getIndex()},
      childRoutes: [
        client,
        user,
      ]
    }
  ];

  return (
    <Router history={history} routes={routes}></Router>
  )
}


export default RouterConfig;
