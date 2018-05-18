/**
 *
 *  Created by youli on 2017/8/31
 *  轻提示
 */

import { Toast, Modal } from 'antd-mobile';

const dialog = {
  alert(msg, ok = () => {
  }, onCancel = () => {
  }) {
    Modal.alert(msg, '', [
      { text: '取消', onPress: onCancel },
      { text: '确定', onPress: ok }
    ]);
  },
  success(msg, cb = () => {
  }) {
    Toast.success(msg, 2, cb);
  },
  fail(msg, cb = () => {

  }) {
    Toast.fail(msg, 2, cb);
  },
  systemError(msg) {
    Toast.offline(msg, 2);
  },
  info(msg) {
    Toast.info(msg, 3);
  },
  loading(msg) {
    Toast.loading(msg, 1);
  },
  hide() {
    Toast.hide();
  }
};

export default dialog;
