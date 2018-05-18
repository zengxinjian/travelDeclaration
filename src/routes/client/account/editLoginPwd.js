import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import { createForm } from 'rc-form';
import { WhiteSpace } from 'antd-mobile';
import { PageContent } from '../../../components/layout/main';
import { checkType } from '../../../utils/checkType';
import {partnetUserUpdatePwd} from '../../../utils/apiMap'
import {success} from '../../../utils/dialog';
import {clearStorage} from '../../../utils/storage';
import { ValidateForm } from '../../../components/form/validateForm';

class Page extends React.Component {

  saveSuccess=() => {

    success('修改成功', () => {
      const {dispatch}=this.props;
      dispatch(routerRedux.push({
        pathname: '/client/account/login'
      }));
      clearStorage();
    });

  }

  render() {
    const { form} = this.props;
    const editTags = [
      {
        editFields: [
          {
            id: 'pwd',
            type: 'password',
            label: '原密码',
            getFieldPropsOption: {
              rules: checkType.accountPwd
            },
            config: {
              text: '原密码'
            }
          },
          {
            id: 'newPwd',
            type: 'password',
            label: '新密码',
            getFieldPropsOption: {
              rules: checkType.accountPwd
            },
            config: {
              text: '新密码'
            }
          }
        ],
        editBtn: [
          {
            label: '修改',
            clickApi: partnetUserUpdatePwd,
            success: () => {
              this.saveSuccess()
            }
          }
        ]
      }
    ];

    return (

      <PageContent title="修改登录密码">

        <WhiteSpace />

        <ValidateForm
          editTags={editTags}
          pageForm={form}
        />

      </PageContent>
    );
  }
}

export default connect()(createForm()(Page));

