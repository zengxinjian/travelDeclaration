/**
 *
 *  Created by youli on 2017/11/12
 *
 */

import React, { PropTypes } from 'react';
import { Picker, List } from 'antd-mobile';

const { cityData } = require('../../json/city');

class City extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      check: [],
      checkData: []
    };
  }

  componentDidMount() {
    this.onOk(['19', '1137', '2326']);
  }

  componentWillReceiveProps(nextProps) {
    const { value: newData = {} } = nextProps;
    const { check: oldData = {} } = this.state;

    const { value: newValue } = newData;
    const { value: oldValue } = oldData;

    if (newValue !== oldValue) {
      const { province, city, district } = newData;
      const result = [`${province.value}`, `${city.value}`, `${district.value}`];
      this.setState({
        check: result,
        checkData: newData
      });
    }
  }

  onOk = (check) => {
    const { check: oldCheck } = this.state;
    const getValue = (value, props) => value && value[0] && value[0][props];
    if (check[0] === oldCheck[0]
      && check[1] === oldCheck[1]
      && check[2] === oldCheck[2]) {
      return;
    }

    const one = cityData.filter(item => item.value === check[0]);
    const two = one[0].children.filter(item => item.value === check[1]);
    const third = two[0].children.filter(item => item.value === check[2]);


    const result = {
      province: { label: getValue(one, 'label'), value: getValue(one, 'value') },
      city: { label: getValue(two, 'label'), value: getValue(two, 'value') },
      district: { label: getValue(third, 'label'), value: getValue(third, 'value') },
      value: (third && third[0] && third[0].value) || (two && two[0] && two[0].value)
    };
    this.setState({
      check,
      checkData: result
    }, () => {
      const { onChange } = this.props;
      onChange(result);
    });
  }

  onCancel = () => {
  }

  render() {
    const { check } = this.state;
    return (
      <Picker
        extra="请选择省市"
        title="请选择所在省市"
        value={check}
        data={cityData}
        onOk={this.onOk}
        onDismiss={this.onCancel}
      >
        <List.Item arrow="horizontal">所在省市</List.Item>
      </Picker>
    );
  }
}

City.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func
};
export default {
  City
};
