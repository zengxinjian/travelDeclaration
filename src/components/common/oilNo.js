/**
 *
 *  Created by youli on 2018/1/17
 *
 */

import React from 'react'
import {List, InputItem} from 'antd-mobile'
import {checkType, check} from "../../utils/checkType";
import {fail} from '../../utils/dialog'
import styles from './oilNo.less'

class OilNo extends React.Component {

  constructor(p) {
    super(p);
    const {config = {}} = this.props;
    const {hideCardType = false} = config;
    const defaultType = 1;

    this.state = {
      hideCardType,
      defaultType,
      type: hideCardType ? 1 : defaultType,
      oilNo: '',
      oilNo_error: false,
      reOilNo: '',
      reOilNo_error: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const {type: oldType, oilNo: oldOilNo, defaultType} = this.state;
    const {value: newValue} = nextProps;
    if (!newValue || !(typeof newValue === 'object')) {
      this.setState({
        type: defaultType,
        oilNo: '',
      }, this.changeValue);
      return;
    }
    const {type: newType = defaultType, oilNo: newOilNo} = newValue;
    if (newType != oldType || newOilNo != oldOilNo) {
      this.setState({
        type: newType,
        oilNo: newOilNo,
        oilNo_error: check(newOilNo, checkType.oilCard),
        reOilNo: newOilNo,
        reOilNo_error: null,
      })
    }
  }

  onErrorClick = (type) => {
    switch (type) {
      case 'oilNo':
        const {oilNo_error} = this.state;
        fail(oilNo_error[0].warning);
        break;
      case 'reOilNo':
        fail('两次输入的油卡号不一致');
        break;
    }
  }

  changeValue = () => {
    const {type, oilNo, oilNo_error, reOilNo_error} = this.state;
    const {onChange} = this.props;
    const iserror = oilNo_error || reOilNo_error;

    onChange({
      type,
      oilNo: oilNo,
      isError: (type == 0 ? false : iserror),
    });
  }

  changeCardType = (cardType) => {
    this.setState({
      type: cardType,
    }, this.changeValue);
  }

  changeOilNo = (val) => {
    const {reOilNo} = this.state;
    const isError = check(val, checkType.oilCard);
    this.setState({
      oilNo: val,
      oilNo_error: isError
    }, this.changeReOilNo.bind(this, reOilNo))
  }

  changeReOilNo = (val) => {
    const {oilNo} = this.state;
    const isError = (oilNo != val);
    this.setState({
      reOilNo: val,
      reOilNo_error: isError,
    }, this.changeValue)
  }

  createOilNoInput = (type) => {
    if (type !== 1) {
      return;
    }
    const {oilNo, reOilNo, oilNo_error, reOilNo_error} = this.state;
    return (
      <div>
        <InputItem
          placeholder='请填写油卡号'
          onErrorClick={this.onErrorClick.bind(this, 'oilNo')}
          error={oilNo_error}
          value={oilNo}
          onChange={this.changeOilNo}>
          卡号
        </InputItem>
        <InputItem
          placeholder='请重复油卡号'
          value={reOilNo}
          onErrorClick={this.onErrorClick.bind(this, 'reOilNo')}
          error={reOilNo_error}
          onChange={this.changeReOilNo}>
          确认卡号
        </InputItem>
      </div>
    );
  }

  render() {
    const {type = this.state.defaultType, hideCardType} = this.state;

    return (
      <div className={styles.warpper}>
        {
          !hideCardType ?
            <List.Item
              className={styles.type}>
              <p>油卡</p>
              <p className={styles.option}>
                <a onClick={this.changeCardType.bind(this, 0)}
                   className={type === 1 ? '' : styles.active}>稍后填写</a>
                <a onClick={this.changeCardType.bind(this, 1)}
                   className={type === 1 ? styles.active : ''}>油卡号</a>
              </p>
            </List.Item> :
            ''
        }
        {
          this.createOilNoInput(type)
        }
      </div>
    );
  }
}

export default {
  OilNo
};
