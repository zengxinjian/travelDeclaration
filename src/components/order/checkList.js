/**
 *
 *  Created by youli on 2017/11/8
 *
 */

import React from 'react';
import {connect} from 'dva';
import {Link, routerRedux} from 'dva/router';
import {WhiteSpace, Flex, Tabs, Button, Checkbox} from 'antd-mobile';
import {PageContent} from '../layout/main';
import {ListScroll} from '../scroll/listScroll';
import {date} from '../../utils/format';
import {success, fail} from '../../utils/dialog';
import {
  getOrderStatus,
  getCurrentMonthRec,
  getRechargeStatus
} from '../order/util';
import {
  storageKey,
  setStorage
} from '../../utils/storage';
import styles from './checkList.less';

class Page extends React.Component {

  constructor(props) {
    super(props);
    const {action} = this.props;
    let isrecharge = false;
    let title = '';
    let isBankAuto=false;
    switch (action) {
      case 'audit':
        title = '审核';
        break;
      case 'carryout':
        title = '出单';
        break;
      case 'recharge_auto_bank':
      case 'recharge_auto_bank_error':
        title = '充值';
        isrecharge = true;
        isBankAuto=true;
        break;
      case 'recharge_bank':
      case 'recharge':
      case 'recharge_error':
        title = '充值';
        isrecharge = true;
        break;
    }
    this.state = {
      action,
      isrecharge,
      title,
      isBankAuto,
      list_cache:null,
      count: 0,
      totalAmount:0,
      changeDataSource: null,
      auditAll: false,
      auditSelect: [],
      auditData: [],
    };
  }

  showCardNo=(isrecharge,row)=>{
    if(!isrecharge){
      return '';
    }
    let msg='';
    const {
      RefuellingCard,
      RechargeType,
      BankCard='',
      BankCardName='',
      BankName=''
    }=row;

    switch (RechargeType){
      case 1:
        msg= `油卡号：${RefuellingCard==='0'?'暂无':RefuellingCard}`;
        break;
      default:
        msg= `${BankName || '银行卡号'}：${BankCard || '暂无'}（${BankCardName || '暂无'}）`;
        break;
    }

    return <p className="absolute-row">
      {msg}
      </p>
  }

  renderRow = ({
                 click,
               } = {}, row) => {
    const {
      RechargeType,
      RefuellingCard,
      Id,
      QueueNo,
      Name,
      DeclarationName,
      CreateTime,
      OrderStatus,
      CurrentMonthRec,
      RechargeStatus,
      CarryOutTime,
      isChecked = false
    } = row;

    let time=CreateTime;
    const {isrecharge,isBankAuto} = this.state;
    if(isrecharge){
      time=CarryOutTime;
    }

    if(isBankAuto){
      return <Flex
        key={Id}
        onClick={this.goDetail.bind(this,Id,row)}>
        <a onClick={click.bind(this, row)}>
          <Flex.Item>
            <Checkbox checked={isChecked}/>
            {row.BankCardName}
          </Flex.Item>
        </a>
        <Flex.Item className={`${styles.two} add-ellipsis`}>
          <p>{row.BankCard}</p>
          <p>{row.BankName}</p>
        </Flex.Item>

        <Flex.Item>
          {row.Amount}
        </Flex.Item>
      </Flex>
    }
    else {
      return (
        <Flex
          key={Id}
          onClick={this.goDetail.bind(this, Id,row)}
          className={`${isrecharge ? 'relative-list' : ''} ${(RefuellingCard === '0' && RechargeType === 1) ? 'tbl-red-bg' : ''}`}
        >

          {
            this.showCardNo(isrecharge, row)
          }

          <a onClick={click.bind(this, row)}>
            <Flex.Item>
              <Checkbox checked={isChecked}/>
              {QueueNo}
            </Flex.Item>
          </a>
          <Flex.Item>
            {Name}
          </Flex.Item>
          {
            (isrecharge) ?
              <Flex.Item>{getCurrentMonthRec(CurrentMonthRec)}</Flex.Item> :
              <Flex.Item>{getOrderStatus(OrderStatus)}</Flex.Item>
          }

          <Flex.Item>{
            isrecharge ?
              getRechargeStatus(RechargeStatus) :
              DeclarationName
          }</Flex.Item>
          <Flex.Item className={`${styles.two} add-ellipsis`}>
            <p>{date(time).date}</p>
            <p>{date(time).time}</p>
          </Flex.Item>
        </Flex>
      );
    }
  }

  audit = () => {
    const {auditSelect, auditData, title,isBankAuto} = this.state;
    const {action,reponseData={}} = this.props;

    if (auditSelect.length < 1) {
      fail(`请选择要${title}的订单`);
      return;
    }
    const result = [];
    auditData.map((item) => {
      if (item.isChecked) {
        const {Id, QueueNo, Name, FirstAmount, DeclarationName, RefuellingCard, RechargeType,RechargeStatus,MonthlyAmount} = item;
        if(isBankAuto){
          result.push({
            Id,
            QueueNo:'/',
            BankCard:item.BankCard,
            BankName:item.BankName,
            Name:item.BankCardName,
            FirstAmount:item.Amount,
            MonthlyAmount:item.Amount,
            DeclarationName:'/'
          })
        }
        else {
          result.push({
            Id, QueueNo, Name, FirstAmount, DeclarationName, RefuellingCard, RechargeType, RechargeStatus, MonthlyAmount
          });
        }
      }
    });
    setStorage(storageKey[`adminOrder_${action}`], {
      result,
      reponseData,
      isBankAuto,
    });
    const {dispatch} = this.props;
    this.writeHistory(dispatch.bind(this,routerRedux.push({
      pathname: `/service/order/confirmAudit/${action}`
    })))
  }

  setAuditChangeData = ({listRow, responseData, changeDataSource}) => {
    const auditSelect=listRow.filter(item=>item.isChecked)

    this.setState({
      count: responseData.count,
      totalAmount:responseData.amount,
      auditData: listRow,
      auditAll: false,
      auditSelect,
      changeDataSource,
    });
  }

  writeHistory=(cb=()=>{})=>{
    this.state.list_cache(cb);
  }

  checkAuditAll = () => {
    const {auditAll, auditSelect, auditData, changeDataSource} = this.state;
    let temp_Select = [];
    let temp_data = [];

    if (auditAll) {
      temp_Select = [];
      temp_data = auditData.map(item => ({
        ...item,
        isChecked: false,
      }));

    } else {
      temp_Select = [...auditData];
      temp_data = auditData.map(item => ({
        ...item,
        isChecked: true,
      }));
    }

    changeDataSource(temp_data);

    this.setState({
      auditAll: !auditAll,
      auditSelect: temp_Select,
      auditData: temp_data,
    });
  }

  checkAudit = (row, e) => {
    e.stopPropagation();

    const {Id}=row;
    const {auditSelect, auditData, changeDataSource} = this.state;
    const index = auditSelect.findIndex(item=>item.Id===Id);
    let ischecked = false;

    if (index > -1) {
      auditSelect.splice(index, 1);
      ischecked = false;
    } else {
      auditSelect.push(row);
      ischecked = true;
    }

    const result = auditData.map(item => {
      let temp = item.isChecked;
      if (item.Id === Id) {
        temp = ischecked;
      }
      return {
        ...item,
        isChecked: temp,
      }
    })

    changeDataSource(result);

    this.setState({
      auditData: result,
      auditAll: auditData.length === auditSelect.length,
      auditSelect,
    });
  }

  goDetail = (id,row) => {
    const {dispatch} = this.props;
    const {isBankAuto}=this.state;
    if(isBankAuto){
      const {reponseData={}}=this.props;
      const {BankCardName,BankCard,BankName}=row;
      const data={
        ...reponseData,
        bankName:BankName,
        bankCardNo:BankCard,
        bankCardName:BankCardName
      };
      setStorage(storageKey.admin_bank_order,data);
      this.writeHistory(dispatch.bind(this, routerRedux.push({
        pathname: `/service/bank/bankOrderDetail`
      })))
    }
    else {
      this.writeHistory(dispatch.bind(this, routerRedux.push({
        pathname: `/service/order/detail/${id}`
      })))
    }
  }

  setReloadPage=(loadPage,setListView)=>{
    const {setReloadPage : props_setReloadPage=()=>{}}=this.props;
    this.setState({
      list_cache:setListView
    })
    props_setReloadPage(loadPage,setListView);
  }

  render() {
    const {auditSelect = [], auditAll, auditData = [], title, count = 0,totalAmount=0, isrecharge,action,isBankAuto} = this.state;
    const {
      requestAPI,
      requestData,
      dataProps = 'data',
      setReloadPage = () => {
      },
    } = this.props;

    return (

      <div className={styles.warpper}>
        {
          isBankAuto?
            <Flex>
              <Flex.Item>持卡人</Flex.Item>
              <Flex.Item>卡号</Flex.Item>
              <Flex.Item>金额</Flex.Item>
            </Flex>
            :
            <Flex>
              <Flex.Item>排队号</Flex.Item>
              <Flex.Item>姓名</Flex.Item>
              <Flex.Item>{isrecharge ? '本月状态' : '状态'}</Flex.Item>
              <Flex.Item>{isrecharge ? '充值进度' : '报单人'}</Flex.Item>
              <Flex.Item>{isrecharge ? '出单时间':'时间'}</Flex.Item>
            </Flex>
        }

        <ListScroll
          api={requestAPI}
          listname={action}
          dataProps={dataProps}
          requestData={requestData}
          setChangeData={this.setAuditChangeData}
          setReloadPage={this.setReloadPage}
          renderRow={this.renderRow.bind(this, {
            click: this.checkAudit,
          })}
          diffHeight={130}
          className={styles.list}
        />

        <div className={count > 0 ? styles.bottom : 'component-hide'}>
          <a onClick={this.checkAuditAll} className={styles.left}>
            <Checkbox checked={auditAll}/>
            全选
            {
              isBankAuto?
                <p className={styles.selectText}>
                  <span>（共{count}个,金额:￥{totalAmount}）</span>
                  <span>（已选{auditAll ? auditData.length : auditSelect.length}个,金额:￥{
                    auditAll ?
                      auditData.reduce((total,item)=>(total+parseInt(item.Amount)),0):
                      auditSelect.reduce((total,item)=>(total+parseInt(item.Amount)),0)
                  }）</span>
                </p>:
                <span>（总共{count}个，已选{auditAll ? auditData.length : auditSelect.length}个）</span>
            }

          </a>
          <div className={styles.right}>
            <Button onClick={this.audit} size="small" type="primary">{`去${title}`}</Button>
          </div>
        </div>
      </div>


    );
  }
}

Page.propTypes = {
  dispatch: React.PropTypes.func,
  action: React.PropTypes.string,
  requestAPI: React.PropTypes.object,
  requestData: React.PropTypes.object,
  reponseData:React.PropTypes.object
};


export default Page;
