/**
 *
 *  Created by youli on 2017/12/9
 *
 */
import React from 'react';
import { ActionSheet } from 'antd-mobile';
import { CustomIcon } from '../../components/icon/customIcon';
import { isApp } from '../system.config';
import { showTips } from '../tool';
import * as official from './officialAccounts';
import { getUrl } from '../imgTool';
import * as app from './app';

const handler = isApp ? app : official;


const share = ({
                 title,
                 desc,
                 link,
                 imgUrl
               }) => {
  if (isApp) {
    const appShare = handler.share;
    const dataList = [
      {
        icon: <CustomIcon size="lg" type={require('../../assets/icon/wechat.svg')} />,
        title: '微信好友',
        click: () => appShare({
          scene: 0,
          title,
          desc,
          link,
          imgUrl
        })
      },
      {
        icon: <CustomIcon size="lg" type={require('../../assets/icon/pengyouquan.svg')} />,
        title: '微信朋友圈',
        click: () => appShare({
          scene: 1,
          title,
          desc,
          link,
          imgUrl
        })
      }
    ];

    return () => {
      ActionSheet.showShareActionSheetWithOptions({
        options: dataList,
        message: '请选择要分享的平台'
      },
        (buttonIndex) => {
          const btn = dataList[buttonIndex];
          if (btn && btn.click) {
            btn.click();
          }
        });
    };
  }

  handler.share({
    title,
    desc,
    link,
    imgUrl
  });
  return showTips.bind(null, getUrl('/but/sharePopover2.png'), 'share');
};

const isWeChat = handler.isWeChat;

const pay = handler.pay;

const auth = handler.auth;

const catchPhoto = handler.catchPhoto;

const initWeixin = handler.initWeixin;

export {
  isWeChat,
  share,
  pay,
  auth,
  catchPhoto,
  initWeixin
};
