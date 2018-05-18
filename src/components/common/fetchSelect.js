/**
 *
 *  Created by youli on 2018/1/10
 *
 */

import React from 'react';
import { Picker, List } from 'antd-mobile';
import { http } from '../../utils/request';


class FetchSelect extends React.Component {

  constructor(props) {
    super(props);
    const { hideEmpty } = this.props;
    let data = [
      { label: '请选择', value: '' }
    ];
    if (hideEmpty) {
      data = [];
    }
    this.state = {
      data,
      select: -1
    };
  }

  componentDidMount() {
    const { config = {} } = this.props;
    const { initDataAPI, isBank ,dataProps=''} = config;

    http(initDataAPI).then((response) => {
      let data=[];
      if(!dataProps){
        data=response;
      }
      else{
        data=response[dataProps]
      }
      if (!Array.isArray(data) || data.length === 0) {
        return;
      }
      const { data: selectData = [], select } = this.state;
      let result = data.map(item => ({ label: item.Name, value: item.Id }));
      result = selectData.concat(result);
      this.setState({
        data: result
      });

      if (select === -1 || !select) {
        this.change([result[0].value]);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { value: newValue = {} } = nextProps;
    const { select: oldValue } = this.state;

    if (newValue.value !== oldValue[0]) {
      this.setState({
        select: [newValue.value]
      });
    }
  }

  change = (select) => {
    const { select: oldSelect, data, bankList } = this.state;
    if (select[0] === oldSelect[0]) {
      return;
    }
    this.setState({
      select
    });
    const { onChange, value = [] } = this.props;
    if (value[0] === select[0]) {
      return;
    }
    const result = data.filter(item => item.value === select[0]);
    onChange(result[0]);
  }

  onOk = (select) => {
    this.change(select);
  }

  render() {
    const { data, select } = this.state;
    const { title, hideEmpty } = this.props;
    return (
      <Picker
        extra="请选择"
        cols={1}
        value={select}
        data={data}
        title={title}
        onOk={this.onOk}
      >
        <List.Item arrow="horizontal">{title}</List.Item>
      </Picker>
    );
  }
}

export default { FetchSelect };
