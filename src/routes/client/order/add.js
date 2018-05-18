/**
 *
 *  Created by youli on 2017/11/8
 *
 */

import React from 'react';
import {connect} from 'dva';
import {Link, routerRedux} from 'dva/router';
import {createForm} from 'rc-form';
import {Tabs, List, Drawer, Button, TextareaItem, InputItem,Modal} from 'antd-mobile';
import {PageContent} from '../../../components/layout/main';
import {ValidateForm} from '../../../components/form/validateForm';
import {checkType, check} from '../../../utils/checkType';
import {success, alert, fail} from '../../../utils/dialog';
import {getGoodList, orderSubmit,partnetUserLoginOut} from '../../../utils/apiMap';
import {http} from '../../../utils/request';
import {phone as formatPhone, toCDB} from '../../../utils/format';
import {storageKey, setStorage, getStorage,  clearStorage,isLogin} from '../../../utils/storage';
import {windowWidth} from '../../../utils/window';
import {ContentScroll} from '../../../components/scroll/contentScroll';
import styles from './add.less';

class Page extends React.Component {
  constructor(p) {
    super(p);
    const userInfo = getStorage(storageKey.userInfo);
    const {phone} = userInfo;

    this.state = {
      phone,
      open: false,
      drawerWidth: (windowWidth * 0.8)
    };
  }

  componentDidMount(){
    if(!isLogin()){
      this.goPage('/client/account/login')
    }
  }

  onOpenChange = () => {
    const {open} = this.state;
    this.setState({
      open: !open
    });
  }

  goPage = (url) => {
    if (!url) {
      return;
    }
    try {
      setStorage(storageKey.adminOrder_orderlist_cache, '')
    }
    catch (ex) {
      console.log(ex)
    }
    const {dispatch} = this.props;
    dispatch(routerRedux.push({
      pathname: url
    }));
  }

  logout = () => {

    alert('是否退出系统？', () => {
      http(partnetUserLoginOut).then(()=>{
        clearStorage();
        success('退出成功', this.goPage('/client/account/login'));
      })
    });
  }

  sidebar = () => {
    const {drawerWidth, phone} = this.state;

    const sidebarList = [
      {title: '我的账号', brief: formatPhone(phone), extra: '', url: ''},
      {title: '订单', brief: '', extra: '', url: '/client/order/list'},
      {title: '修改登录密码', brief: '', extra: '修改', url: '/client/account/editLoginPwd'}
    ];

    const getExtra = (extra) => {
      if (extra) {
        return {extra};
      }
      return null;
    };

    return (
      <div style={{width: drawerWidth}} className={styles.sidebar}>
        <List>
          {
            sidebarList.map((item, index) => {
              const {url, title, extra, brief, isshow} = item;
              const config = getExtra(extra);

              if (isshow === false) {
                return;
              }
              return (
                <List.Item
                  {...config}
                  onClick={this.goPage.bind(this, url)}
                  arrow={url ? 'horizontal' : ''}
                  className={styles.item}
                  key={index}
                >
                  {title}
                  {
                    brief ? (
                      <List.Item.Brief>
                        {brief}
                      </List.Item.Brief>
                    ) : ''
                  }
                </List.Item>
              );
            })
          }
        </List>
        <div className={styles.logout}>
          <Button
            onClick={this.logout}
            type="primary"
            size="small"
          >
            退出登录
          </Button>
        </div>
      </div>
    );
  }

  // 验证表单
  validateForm = ({name, phone, good, oiler,}) => {
    let error = '';
    error = check(name, checkType.oilUserName);
    if (error) {
      fail(error[0].warning);
      return;
    }
    error = check(phone, checkType.oilUserPhone);
    if (error) {
      fail(error[0].warning);
      return;
    }
    if (!good || !good.value) {
      fail('请选择充值套餐');
      return;
    }
    if (!oiler || !oiler.value) {
      fail('请选择收单人');
      return;
    }
    return true;
  }

  // 保存表单
  saveForm = (api, data) => {
    alert('请务必确认清楚客户的油卡是否正确，录单后将开始排队且不可更改。', () => {
      http(api, data).then(
        () => {
          success('保存成功', () => {
            this.goPage('/client/order/list')
            /*const {dispatch} = this.props;
             dispatch(routerRedux.push({
             pathname: '/client/order/list'
             }));*/
          });
        }
      );
    });
  }

  // 解析快速录单
  formatData = (onChange,data) => {
    if (!data) {
      return;
    }
    let dataStr = toCDB(data);
    let values = {};
    const {form} = this.props;
    const {setFieldsValue, getFieldValue} = form;
    const arr = dataStr.split(',');
    values = {
      phone: arr[0] ? arr[0] : '',
      realName: arr[1] ? arr[1] : '',
      idCard: arr[2] ? arr[2]:'',
    };
    setFieldsValue(values);
    onChange(dataStr,this.editTagsBank[0]['editFields'],values);
  }

  // 渲染表单
  renderForm = (open, editTags, pageForm) => (<div className={open ? styles.deleteline : ''}>
    <ValidateForm
      editTags={editTags}
      pageForm={pageForm}
    />
  </div>)

  editTagsBank = [{
    editFields: [
      {
        id: 'phone',
        type: 'tel',
        label: '登录账号',
        getFieldPropsOption: {
          rules: checkType.userPhone
        }
      },
      {
        id: 'realName',
        type: 'text',
        label: '姓名',
        getFieldPropsOption: {
          rules: checkType.userName
        }
      },
      {
        id: 'idCard',
        type: 'tel',
        label: '身份证',
        getFieldPropsOption: {
          rules: checkType.userIdCard
        }
      },
      {
        id: 'good',
        type: 'fetchSelect',
        label: '充值套餐',
        config: {
          initDataAPI: getGoodList,
          dataProps:'list',
          hideEmpty: true,
        }
      },
      {
        id: 'all',
        type: 'other',
        config: {
          createElement: ({commonConfig}) => {
            const {onChange}=commonConfig;
            return <InputItem
              clear
              key='all'
              onChange={this.formatData.bind(this,onChange)}
              placeholder='格式：登录账号,姓名,身份证号'
            >
              快速录单
            </InputItem>
          }
        }
      }
    ],
    editBtn: [
      {
        label: '确定',
        converPostData:({value})=>{
          const {good}=value;
          return {
            ...value,
            goodId:good.value,
          }
        },
        clickApi:orderSubmit,
        success:()=>{
          const {dispatch}=this.props;
          success('报单成功',()=>{
            dispatch(routerRedux.push({
              pathname:'/client/order/list'
            }))
          })
        }
      }
    ]
  }]

  render() {
    const {form} = this.props;
    const {open, phone: adminPhone} = this.state;
    const renderBank = this.renderForm.bind(this, open, this.editTagsBank, form);

    return (

      <PageContent
        title="报单中心"
        leftContent={<span>我的</span>}
        leftClick={this.onOpenChange}
      >
        <ContentScroll>
          <Drawer
            className={styles.content}
            enableDragHandle
            sidebar={this.sidebar()}
            open={open}
            onOpenChange={this.onOpenChange}
          >
            {
              renderBank()
            }
          </Drawer>
        </ContentScroll>
      </PageContent>
    );
  }
}

Page.propTypes = {
  form: React.PropTypes.object,
  dispatch: React.PropTypes.func
};

const AddOrder = connect()(createForm()(Page));

export default AddOrder;

