/**
 *
 *  Created by youli on 2017/11/9
 *
 */

import React, {PropTypes} from 'react';
import {InputItem} from 'antd-mobile';
import {CustomIcon} from '../icon/customIcon';

class PassWordInputItem extends React.Component {
  constructor(props) {
    super(props);
    const {eyeStatus = 1} = this.props;
    this.state = {
      eyeStatus,
      val: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    const {value: newValue} = nextProps;
    const {val: oldValue} = this.state;

    if (newValue !== oldValue) {
      this.setState({
        val: newValue
      });
    }
  }

  getInputType = (type) => {
    switch (type) {
      case 1:
        return 'text';
      default:
        return 'money';
    }
  }

  getEyeType = (status) => {
    switch (status) {
      case 0:
        return require('../../assets/icon/eye-cloese.svg');
      case 1:
      default:
        return require('../../assets/icon/eye-open.svg');
    }
  }

  changeEye = () => {
    const {eyeStatus} = this.state;

    if (eyeStatus === 1) {
      this.setState({
        eyeStatus: 0
      });
    } else {
      this.setState({
        eyeStatus: 1
      });
    }
  }

  change = (val) => {
    const {onChange, value} = this.props;

    this.setState({
      val
    });
    if (value !== val) {
      onChange(val);
    }
  }

  render() {
    const {eyeStatus, val} = this.state;
    const {error, onErrorClick, config} = this.props;
    const {passwordType = 1, text = '设置密码'} = config;
    const placeholder = (passwordType === 1) ? '请填写6-20位密码' : '请填写6位数字密码';

    return (
      <InputItem
        type={eyeStatus === 1 ? this.getInputType(passwordType) : 'password'}
        moneyKeyboardAlign="left"
        value={val}
        extra={<CustomIcon type={this.getEyeType(eyeStatus)}/>}
        onExtraClick={this.changeEye}
        onChange={this.change}
        error={error}
        onErrorClick={onErrorClick}
        placeholder={placeholder}
        clear
      >
        {text}
      </InputItem>
    );
  }
}

PassWordInputItem.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  error: PropTypes.array,
  onErrorClick: PropTypes.func,
  config: PropTypes.object
};

PassWordInputItem.defaultProps = {
  error: null,
  onErrorClick: '',
  config: {
    passwordType: 1 // 1:登录密码；2：安全密码
  }
};

export default {
  PassWordInputItem
};
