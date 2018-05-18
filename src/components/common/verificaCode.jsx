/**
 *
 *  Created by youli on 2017/11/9
 *
 */
import React, {PropTypes} from 'react';
import * as styles from './verificaCode.less';
import {success, fail} from '../../utils/dialog';
import {check} from '../../utils/checkType';
import {http} from '../../utils/request';
import {trim} from '../../utils/format';

class VerificaCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: true,
      displayText: '验证码',
      totalCount: 120
    };
  }

  // 倒计时
  startCutDown = (num) => {
    let count = num;
    setTimeout(() => {
      count -= 1;
      if (count <= 0) {
        this.setState({
          displayText: '验证码',
          status: true
        });
      } else {
        this.setState({
          displayText: `${count} 秒`
        }, () => {
          this.startCutDown(count);
        });
      }
    }, 1000);
  }

  // 发送验证码
  sendCode = () => {
    const {status, totalCount} = this.state;
    const {phone, rules, api} = this.props;
    const phoneTrim = trim(phone);
    const error = check(phoneTrim, rules);

    if (error) {
      fail(error[0].message);
      return;
    }

    if (!status) {
      return;
    }

    http(api, {
      phone: phoneTrim
    })
      .then(() => {
        success('发送成功');
        this.setState({
          status: false,
          displayText: `${totalCount} 秒`
        }, () => (this.startCutDown(totalCount)));
      });
  }

  render() {
    const {status, displayText} = this.state;
    return (
      <a
        className={status ? styles.show : styles.hide}
        onClick={this.sendCode}
      >
        {displayText}
      </a>
    );
  }
}

VerificaCode.propTypes = {
  messageType: PropTypes.number,
  phone: PropTypes.string,
  rules: PropTypes.array
};

VerificaCode.defaultProps = {
  rules: [],
  messageType: 4,
  phone: ''
};

export default {
  VerificaCode
};
