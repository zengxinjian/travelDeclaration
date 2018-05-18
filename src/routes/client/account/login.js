
import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {createForm} from 'rc-form';
import {WhiteSpace} from 'antd-mobile';
import {PageContent} from '../../../components/layout/main';
import {ValidateForm} from '../../../components/form/validateForm';
import {checkType} from '../../../utils/checkType';
import {partnetUserLogin} from '../../../utils/apiMap';
import {success} from '../../../utils/dialog';
import {storageKey, getStorage,setStorage} from '../../../utils/storage';
import {http} from '../../../utils/request';


class Page extends React.Component {

  constructor(p) {
    super(p);
    const userInfo = getStorage(storageKey.userInfo) || {};
    const {phone} = userInfo;
    this.state = {
      phone,
      eyeStatus: 0,
    };
  }

  saveSuccess = (data) => {
    const {token,phone,name}=data;
    setStorage(storageKey.userToken, token);
    setStorage(storageKey.userInfo, {phone, name});
    success('登录成功', () => {
      const {dispatch}=this.props;
      dispatch(routerRedux.push({
        pathname: '/client/order/add'
      }));
    });
  }

  render() {
    const {form} = this.props;
    const {eyeStatus} = this.state;
    const editTags = [
      {
        editFields: [
          {
            id: 'phone',
            type: 'text',
            label: '账号',
            getFieldPropsOption: {
              rules: checkType.accountName
            }
          },
          {
            id: 'data',
            type: 'password',
            label: '密码',
            getFieldPropsOption: {
              rules: checkType.accountPwd
            },
            config: {
              text: '密码',
              eyeStatus,
            }
          }
        ],
        editBtn: [
          {
            label: '登录',
            clickApi: partnetUserLogin,
            converPostData: ({value}) => {
              return {
                ...value,
                type: 1
              }
            },
            success: (data) => {
              this.saveSuccess(data);
            }
          }
        ]
      }
    ];

    return (

      <PageContent
        title='报单中心登录'
        leftContent={<span/>}
        leftClick={() => {
        }}
      >

        <WhiteSpace/>

        <ValidateForm
          initForm
          initFormDataAPI={null}
          editTags={editTags}
          pageForm={form}
        />

      </PageContent>
    );
  }
}

export default connect()(createForm()(Page));

