/**
 *
 *  Created by youli on 2017/11/8
 *
 */

import React from 'react';
import { createForm } from 'rc-form';
import { windowWidth } from '../../utils/window';
import { ValidateForm } from '../form/validateForm';
import { getOrderStatus as getOrderStatusAPI, getCurrentMonthRec, getRechargeStatus as getRechargeTypeAPI } from '../../utils/apiMap';
import {hasBankFeatures} from '../../utils/system.config'
import styles from './listFilter.less';

class Page extends React.Component {

  constructor(p) {
    super(p);
    const {
      action,
      saveFun = () => {
      }
    } = this.props;

    const editTags = this.createEditTags(action, saveFun);
    const editFields = editTags[0].editFields;
    this.state = {
      drawerWidth: (windowWidth * 0.8),
      editTags
    };
  }

  componentDidMount() {
    const {
      initData = {},
      form
    } = this.props;

    const { editTags } = this.state;
    const editFields = editTags[0].editFields;
    const data = {};
    editFields.map((item) => {
      const { id, type } = item;
      if (!initData[id]) {
        return;
      }

      switch (type) {
        case 'fetchSelect':
          data[id] = { value: initData[id] };
          break;
        case 'date':
          const now = new Date(initData[id]);
          data[id] = (now);
          break;
        default:
          data[id] = initData[id];
          break;
      }
    });

    const { setFieldsValue } = form;
    setFieldsValue(data);
  }

  createEditTags = (action, saveFun) => {
    const editTags = [
      {
        editFields: [
          {
            id: 'realName',
            type: 'text',
            label: '客户姓名'
          },
          {
            id: 'phone',
            type: 'text',
            label: '客户电话'
          },
          {
            id: 'orderStatus',
            type: 'fetchSelect',
            label: '订单状态',
            config: {
              initDataAPI: getOrderStatusAPI,
              dataProps:'list'
            }
          },
          {
            id: 'rechargeStatus',
            type: 'fetchSelect',
            label: '充值状态',
            config: {
              initDataAPI: getRechargeTypeAPI,
              dataProps:'list'
            }
          }
        ],
        editBtn: [
          {
            label: '重置',
            className: styles.btn,
            btnConfig: {
              size: 'small',
              type: 'ghost'
            },
            clickFun: () => {
              const { setFieldsValue } = this.props.form;
              const { editFields = [] } = editTags[0];
              const result = {};
              const searchResult = {};
              editFields.map((item) => {
                switch (item.type) {
                  case 'date':
                    return result[item.id] = null;
                  case 'fetchSelect':
                    return result[item.id] = { value: '' };
                  default:
                    searchResult[item.id] = '';
                    return result[item.id] = '';
                }
              });
              setFieldsValue(result);
              saveFun(searchResult);
            }
          },
          {
            label: '搜索',
            className: styles.btn,
            btnConfig: {
              size: 'small'
            },
            clickFun: ({ value }) => {
              const { editFields = [] } = editTags[0];
              const result = {};
              const getDateStr = (startTime) => {
                if (!startTime) {
                  return '';
                }
                return `${startTime.getFullYear()}-${startTime.getMonth() + 1}-${startTime.getDate()}`;
              };
              editFields.map((item) => {
                switch (item.type) {
                  case 'date':
                    return result[item.id] = getDateStr(value[item.id]);
                  case 'fetchSelect':
                    return result[item.id] = (value[item.id] && value[item.id].value) || '';
                  default:
                    return result[item.id] = value[item.id];
                }
              });
              saveFun(result);
            }
          }
        ]
      }
    ];

    return editTags;
  }

  render() {
    const { drawerWidth, editTags } = this.state;
    const { form } = this.props;

    return (
      <div style={{ width: drawerWidth }} className={styles.sidebar}>
        <ValidateForm
          editTags={editTags}
          pageForm={form}
        />
      </div>
    );
  }
}

export default createForm()(Page);

