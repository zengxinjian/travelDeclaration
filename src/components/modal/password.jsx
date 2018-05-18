/**
 *
 *  Created by youli on 2017/11/15
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Modal, InputItem, Icon } from 'antd-mobile';
import { goBack } from '../../utils/tool';
import { getStorage, storageKey } from '../../utils/storage';
import * as style from './password.less';
import { http } from '../../utils/request';
import { systemError } from '../../utils/dialog';

// 密码输入错误
const forgotPassword = ({
                          dispatch,
                          close = () => {
                          },
                          open = () => {
                          }
                        }) => {
  const d = Modal.alert(
    '安全密码错误，请重试',
    '',
    [
      {
        text: '忘记密码',
        onPress: () => {
          close(
            dispatch(routerRedux.push({
              pathname: '/account/editPayPwd'
            })),
          );
        }
      },
      {
        text: '重试',
        onPress: () => {
          open();
        }
      }
    ],
  );

  return d;
};

// 未设置安全密码
const noPassword = ({ dispatch }) => Modal.alert(
  '您还没有设置安全密码',
  '',
  [
    {
      text: '取消',
      onPress: () => {
        goBack();
      }
    },
    {
      text: '去设置',
      onPress: () => {
        dispatch(routerRedux.push({
          pathname: '/account/editPayPwd'
        }));
      }
    }
  ],
);

// 输入安全密码
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 6,
      inputVal: '',
      visible: false,
      focus: 0,
      passwordValue: []
    };
    this.customFocusInst = {};
  }

  componentDidMount() {
    const { setOpenDialog, dispatch } = this.props;
    setOpenDialog(this.handlerOpen);

    const userInfo = getStorage(storageKey.userInfo);
    const { hasPayPassWord } = userInfo;

    if (hasPayPassWord === true) {
      return;
    }

    noPassword({ dispatch });
  }

  // 保存input的引用
  setInputRef = (element) => {
    this.customFocusInst = element;
  }

  // 打开安全密码输入
  handlerOpen = () => {
    this.setState({
      visible: true,
      focus: 0,
      passwordValue: []
    }, () => {
      this.customFocusInst.focus();
    });
  }

  // 关闭安全密码输入
  handlerClose = (cb = () => {
  }) => {
    this.setState({
      visible: false,
      focus: 0,
      passwordValue: []
    }, cb);
  }

  // 输入完成
  handlerComplete = () => {
    const { submitAPI, submitRequestData, success, dispatch, passwordDescribe } = this.props;
    const { passwordValue } = this.state;
    const password = passwordValue.join('');

    http(submitAPI, {
      ...submitRequestData,
      [passwordDescribe]: password
    }).then((data) => {
      this.handlerClose(() => {
        setTimeout(success.bind(null, data), 100);
      });
    }, (data) => {
      const { Status } = data || {};
      if (Status === -100) {
        // 密码错误
        forgotPassword({
          dispatch,
          close: this.handlerClose,
          open: this.handlerOpen
        });
      } else {
        this.handlerClose(systemError.bind(null, data.Mes));
      }
    });
  }

  // 输入框chang
  handlerChange = (val) => {
    const { focus, count, passwordValue } = this.state;
    if (val === '.') {
      return;
    }

    if (/^\d$/.test(val)) {
      if (focus >= count) {
        // 发生错误,关闭安全密码输入
        this.handlerClose();
      } else if (focus === (count - 1)) {
        // 输入完成
        passwordValue[focus] = val;
        this.setState({
          focus: (focus + 1),
          passwordValue
        }, this.handlerComplete);
      } else {
        // 继续输入
        passwordValue[focus] = val;
        this.setState({
          focus: (focus + 1),
          passwordValue
        });
      }
    } else if (val === '') {
      // 清除
      if (focus < 1) {
        this.setState({
          focus: 0,
          passwordValue: []
        });
        return;
      }
      const preFocus = focus - 1;
      this.setState({
        focus: preFocus,
        passwordValue: passwordValue.slice(0, preFocus)
      });
    }
  }


  // 生成输入框个数
  createInput = (count, passwordValue) => {
    const result = [];
    for (let i = 0; i < count; i += 1) {
      result.push(<InputItem
        key={i}
        type="money"
        ref={this.setInputRef.bind(null, i)}
        onChange={this.handlerChange}
        value={passwordValue[i]}
        className={style.item}
      />);
    }
    return result;
  }

  render() {
    const { visible, passwordValue, inputVal } = this.state;
    const createLi = val => <li><span>{val ? '*' : ''}</span></li>;

    return (
      <Modal
        visible={visible}
        transparent
        maskClosable
        animationType="slide-up"
        title="请输入安全密码"
      >
        <a onClick={this.handlerClose.bind(this, null)} className={style.corss}>
          <Icon type="cross" size="lg" />
        </a>
        <div className={style.warpper}>
          <InputItem
            type="money"
            ref={this.setInputRef}
            onChange={this.handlerChange}
            value={inputVal}
            className={style.itemInput}
          />
          <ul className={style.inputDisplay}>
            {
              createLi(passwordValue[0])
            }
            {
              createLi(passwordValue[1])
            }
            {
              createLi(passwordValue[2])
            }
            {
              createLi(passwordValue[3])
            }
            {
              createLi(passwordValue[4])
            }
            {
              createLi(passwordValue[5])
            }
          </ul>
        </div>
      </Modal>
    );
  }
}

Page.propTypes = {
  dispatch: PropTypes.func,
  passwordDescribe: PropTypes.string,
  success: PropTypes.func,
  setOpenDialog: PropTypes.func,
  submitAPI: PropTypes.object,
  submitRequestData: PropTypes.object
};

Page.defaultProps = {
  passwordDescribe: 'Password',
  success: () => {

  },
  setOpenDialog: () => {

  },
  submitAPI: {},
  submitRequestData: {}
};

const PasswordModal = connect()(Page);

export default {
  PasswordModal
};
