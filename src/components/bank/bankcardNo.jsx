/**
 *
 *  Created by youli on 2017/11/16
 *
 */

import React, {PropTypes} from 'react';
import {InputItem} from 'antd-mobile';
import {getBankCardInfoByNum} from '../../utils/apiMap';
import {http} from '../../utils/request';
import {bankList} from './common';
import {fail} from '../../utils/dialog';
import {trim} from '../../utils/format';

class BankcardNo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      cardNo: '',
      bankName: '',
      bankCardType: '',
      bankCode: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    const {value} = nextProps;
    if (!value) {
      return;
    }
    const {bankCardNo: oldNo, bankName: oldName} = value;
    const {cardNo: newNo, bankName: newName} = this.state;

    if ((newName !== oldName) || (newNo !== oldNo)) {
      this.setState({
        error: this.getError({cardNo: oldNo, bankName: oldName}),
        cardNo: oldNo,
        bankName:oldName
      }, () => {
        if (oldNo.length > 10) {
          this.query()
        }
      });
    }
  }

  onErrorClick = () => {
    const {error} = this.state;
    fail(error);
  }

  getError = ({cardNo, bankName}) => {
    if (!cardNo) {
      return '银行卡号不能为空';
    }
    if (!bankName) {
      return '银行卡号错误，无法识别银行名称';
    }
    return null;
  }

  changNo = (cardNo) => {
    const {cardNo: oldNo} = this.state;
    if (oldNo !== cardNo) {
      this.setState({
        cardNo,
        bankName: '',
        bankCardType: '',
        bankCode: '',
        error: this.getError({cardNo})
      }, this.changeNoAndName);
    }
  }

  changeNoAndName = () => {
    const {cardNo: newNo, bankName: newName, bankCardType, bankCode} = this.state;
    const {value = {}, onChange} = this.props;
    const {bankCardNo: oldNo, bankName: oldName} = value;

    if ((newName !== oldName) || (trim(newNo) !== trim(oldNo))) {
      onChange({
        value: bankCode,
        bankCardType,
        bankCode,
        bankCardNo: trim(newNo),
        bankName: newName
      });
    }
  }

  query = () => {
    const {cardNo} = this.state;
    if (!cardNo) {
      return;
    }
    http(getBankCardInfoByNum, {
      no: trim(cardNo)
    })
      .then((dataStr) => {
        const data = JSON.parse(dataStr);
        const {validated, cardType, bank} = data;
        if (!validated) {
          this.setState({
            bankName: '未知银行'
          });
          return;
        }

        if (cardType === 'CC') {
          this.setState({
            bankName: '不支持信用卡'
          });
          return;
        }

        const result = bankList.filter(item => item.bankCode === bank);

        if (!(Array.isArray(result) && result.length === 1)) {
          this.setState({
            bankName: '未知银行'
          });
          return;
        }

        const type = cardType === 'DC' ? '1' : '2';

        this.setState({
          bankName: result[0].bankName,
          bankCardType: type,
          bankCode: result[0].bankCode,
          error: this.getError({cardNo, bankName: result[0].bankName})
        }, () => {
          this.changeNoAndName();
        });
      });
  }

  render() {
    const {bankName, error, cardNo} = this.state;

    return (
      <div>
        <InputItem
          type="tel"
          placeholder="请输入银行卡号"
          clear
          value={cardNo}
          onChange={this.changNo}
          onBlur={this.query}
          error={error}
          onErrorClick={this.onErrorClick}
        >
          银行卡号
        </InputItem>
        <InputItem
          value={bankName}
          placeholder="输入银行卡号自动识别"
          disabled
        >
          开户行
        </InputItem>
      </div>
    );
  }
}

BankcardNo.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func
};

export default {
  BankcardNo
};
