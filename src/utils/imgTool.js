/**
 *
 *  Created by youli on 2017/11/10
 *
 */
/* import { web, isApp } from './system.config';*/

/* const getUrl = url => (isApp ? (`http://${web}/img/${url}`) : (`/img/${url}`));*/

const getUrl = url => (`http://image.taiduzhifu.com/img/${url}`);

export default {
  getUrl
};

