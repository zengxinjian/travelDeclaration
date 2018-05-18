/**
 *
 *  Created by youli on 2017/11/8
 *
 */

import React from 'react';
import { connect } from 'dva';
import { WhiteSpace, Flex } from 'antd-mobile';
import { PageContent } from '../../../components/layout/main';
import { ListScroll } from '../../../components/scroll/listScroll';
import { gerOrderRechargeList } from '../../../utils/apiMap';
import { getRechargeDetailStatus } from '../../../components/order/util';
import { date } from '../../../utils/format';
import styles from './rechargDetail.less';


class Page extends React.Component {

  constructor(p) {
    super(p);
    const { params } = this.props;
    const { orderId } = params;
    this.state = {
      orderId
    };
  }

  renderRow = (row) => {
    const { Id, Amount, RechargeStatus, CreateTime, ErrorCode, Reason, BatchNo } = row;
    return (
      <Flex key={Id}>
        <Flex.Item>{Amount}</Flex.Item>
        <Flex.Item className="two-column">
          <p>{getRechargeDetailStatus(RechargeStatus)}</p>
        </Flex.Item>
        <Flex.Item className="two-column">
          <p>{date(CreateTime).date}</p>
          <p>{date(CreateTime).time}</p>
        </Flex.Item>
      </Flex>
    );
  }

  render() {
    const { orderId } = this.state;
    return (

      <PageContent
        className="list-flex-line"
        title="订单充值详情"
      >
        <WhiteSpace />

        <Flex>
          <Flex.Item>充值金额</Flex.Item>
          <Flex.Item>状态</Flex.Item>
          <Flex.Item>时间</Flex.Item>
        </Flex>

        <ListScroll
          api={gerOrderRechargeList}
          requestData={{  orderId }}
          renderRow={this.renderRow}
          diffHeight={50}
          dataProps='list'
        />

      </PageContent>
    );
  }
}

export default connect()(Page);

