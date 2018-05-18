/**
 *
 *  Created by youli on 2017/11/8
 *
 */

import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { WhiteSpace, Flex, Drawer } from 'antd-mobile';
import { PageContent } from '../../../components/layout/main';
import { ListScroll } from '../../../components/scroll/listScroll';
import { date } from '../../../utils/format';
import { CustomIcon } from '../../../components/icon/customIcon';
import {orderList} from '../../../utils/apiMap';
import {
  getOrderStatus,
  getRechargeDetailStatus
} from '../../../components/order/util';
import ListFilter from '../../../components/common/listFilter';
import {storageKey, setStorage, getStorage} from '../../../utils/storage';
import styles from './add.less';

class Page extends React.Component {

  constructor(p) {
    super(p);
    const {requestData={},} = getStorage(storageKey.adminOrder_orderlist_cache) || {};
    this.state = {
      open: false,
      setReloadPage: null,
      requestData: requestData,
      setListViewCacheFun_all:null,
    };
  }

  setReloadPage = (loadPage,setListView) => {
    this.setState({
      setReloadPage: loadPage,
      setListViewCacheFun_all: setListView,
    });
  }

  renderRow = (row) => {
    const { Id, RealName,UserName,OrderStatus,RechargeStatus,CreateTime } = row;

    return (
      <Flex key={Id}
            onClick={this.goDetail.bind(this, Id)}>
        <Flex.Item>{`${RealName}（${UserName}）`}</Flex.Item>
        <Flex.Item>
          {getOrderStatus(OrderStatus)}
        </Flex.Item>
        <Flex.Item>{getRechargeDetailStatus(RechargeStatus)}</Flex.Item>
        <Flex.Item className="two-column add-ellipsis">
          <p>{date(CreateTime).date}</p>
          <p>{date(CreateTime).time}</p>
        </Flex.Item>
      </Flex>
    );
  }

  goDetail = (id) => {
    const { dispatch } = this.props;
    this.state.setListViewCacheFun_all(
      dispatch.bind(this, routerRedux.push({
          pathname: `/client/order/detail/${id}`
      }))
    );
  }

  onOpenChange = () => {
    const { open } = this.state;
    this.setState({
      open: !open
    });
  }

  search = (value) => {
    const { requestData = {}, setReloadPage } = this.state;
    const data={
      ...requestData,
      ...value,
    };
    const keys=Reflect.ownKeys(data);
    const result={};
    keys.filter(item=>value[item]).map(item=>{result[item]=data[item]})

    this.setState({
      open: false,
      requestData:result,
    }, setReloadPage);
  }

  render() {
    const { open, requestData } = this.state;

    return (

      <PageContent
        title="订单列表"
        className="list-flex-line"
        rightContent={
          <a onClick={this.onOpenChange}>
            <CustomIcon
              className="filter-icon"
              type={require('../../../assets/icon/filter.svg')}
            />
          </a>}
      >

        <Drawer
          enableDragHandle
          position="right"
          className={styles.content}
          sidebar={<ListFilter action='clienteorderlist' initData={requestData} saveFun={this.search} />}
          open={open}
          onOpenChange={this.onOpenChange}
        >

          <WhiteSpace />

          <Flex>
            <Flex.Item>姓名</Flex.Item>
            <Flex.Item>订单状态</Flex.Item>
            <Flex.Item>充值状态</Flex.Item>
            <Flex.Item>时间</Flex.Item>
          </Flex>

          <ListScroll
            api={orderList}
            requestData={requestData}
            listname='client_order_list'
            setReloadPage={this.setReloadPage}
            renderRow={this.renderRow}
            diffHeight={50}
          />

        </Drawer>
      </PageContent>
    );
  }
}

export default connect()(Page);

