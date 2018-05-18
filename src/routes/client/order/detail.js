
import React from 'react';
import {connect} from 'dva'
import { routerRedux } from 'dva/router';
import { List, Button, Steps } from 'antd-mobile';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { PageContent } from '../../../components/layout/main';
import { ContentScroll } from '../../../components/scroll/contentScroll';
import {
  getOrderStatus,
  getRechargeDetailStatus,
} from '../../../components/order/util';
import { date } from '../../../utils/format';
import { http } from '../../../utils/request';
import { orderDetail } from '../../../utils/apiMap';
import { alert, success } from '../../../utils/dialog';
import { storageKey, setStorage, getStorage } from '../../../utils/storage';
import {hasBankFeatures} from '../../../utils/system.config'
import styles from './detail.less';

class CompleteOrder extends React.Component {
  constructor(props) {
    super(props);
    const { params } = this.props;
    const { orderId } = params;

    const userInfo = getStorage(storageKey.adminInfo);
    const { phone } = userInfo || {};
    this.state = {
      orderId,
      phone,
      data: {},
      track: [],
    };
  }

  componentDidMount() {
    this.fetch();
  }

  fetch = () => {
    const { orderId } = this.state;

    if (orderId <= 0) {
      return;
    }
    http(orderDetail, { orderId }).then(
      (data) => {
        const { order = {}, track = [] } = data;

        this.setState({
          data: order,
          track,
        });
      }
    );
  }

  render() {

    const { data = {}, track = [], orderId } = this.state;
    const Step = Steps.Step;
    const userdata = [
      { label: '姓名', value: data.RealName },
      { label: '电话', value: data.UserName },
      { label: '身份证号', value: data.IdCard }
    ];

    const orderdata = [
      { label: '产品名称', value: data.GoodName },
      { label: '订单编号', value: data.OrderNo },
      { label: '订单状态', value: getOrderStatus(data.OrderStatus) },
      { label: '录单时间', value: date(data.CreateTime, 'D') },
      { label: '核单时间', value: date(data.AuditTime, 'D') },
      {
        label: '充值进度',
        value: getRechargeDetailStatus(data.RechargeStatus),
        click: () => {
          const { dispatch } = this.props;
          dispatch(routerRedux.push({
            pathname: `/client/order/rechargDetail/${orderId}`
          }));
        }
      }
    ];

    return (
      <PageContent
        title="订单详情"
      >
        <ContentScroll>
          <List
            renderHeader={'客户信息'}
            className="list-show-detail"
          >
            {
              userdata.map(item => (
                <List.Item key={item.label} extra={item.value}>{item.label}</List.Item>))
            }
          </List>

          <List renderHeader={'订单信息'} className="list-show-detail">
            {
              orderdata.map(item => (
                item.click ?
                  <List.Item
                    key={item.label} arrow="horizontal"
                    onClick={item.click.bind(this, item.value)}
                    extra={item.value || '暂无'}
                  >{item.label}</List.Item> :
                  <List.Item key={item.label} extra={item.value || '暂无'}>{item.label}</List.Item>
              ))
            }
          </List>

          <List renderHeader="订单跟踪" className={styles.track}>
            <Steps className={styles.step} current={track.length}>
              {
                track.map(item => (
                  <Step
                    key={item.Id}
                    title={item.TrackText}
                    description={item.CreateTime.replace('T', ' ')}
                  />))
              }
            </Steps>
          </List>
        </ContentScroll>
      </PageContent>
    );
  }
}


export default connect()(CompleteOrder);

