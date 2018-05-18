/**
 *
 *  Created by youli on 2017/11/21
 *
 */

import React, {PropTypes} from 'react';
import {List, WhiteSpace, Button} from 'antd-mobile';
import {fail} from '../../utils/dialog';
import {http} from '../../utils/request';
import {trim} from '../../utils/format';
import {check, isObject} from '../../utils/checkType';
import {createField} from './createField';
import * as style from './form.less';

class CreatePane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formError: {},
      disabledBtn: true
    };
  }

  componentDidMount() {
    const {
      pageForm,
      editFields,
      initForm,
      initFormData,
      initFormDataAPI,
      initFormRequestData,
      initFormConverData
    } = this.props;

    const validate = () => {
      this.hasPaneError({editFields, pageForm, changeStatus: true}).catch(() => {

      });
    };

    if (!initForm) {
      validate();
      return;
    }

    if (!initFormDataAPI) {
      const {setFieldsValue} = pageForm;
      setFieldsValue(initFormData);
      validate();
      return;
    }

    http(initFormDataAPI, initFormRequestData)
      .then((data) => {
        const result = initFormConverData(data);
        const {setFieldsValue} = pageForm;
        setFieldsValue(result);
        validate();
      });
  }

  // 按钮点击事件
  onBtnClick = ({
                  clickApi,
                  editFields,
                  clickFun,
                  validateFun = () => (false),
                  converPostData = ({value}) => (value),
                  success = data => (data), selectTab, pageForm
                }) => () => {
    const successCB = ({error, value}) => {

      const valueTirm = this.trimFields({value});
      if (clickFun) {
        clickFun({error, value: valueTirm});
        return;
      }

      if (validateFun({error, value: valueTirm, selectTab})) {
        return;
      }

      const data = converPostData({value: valueTirm, selectTab});

      http(clickApi, data).then(res => success(res));
    };

    this.hasPaneError({pageForm, editFields, changeStatus: false}).then(
      ({error, value}) => {
        // 验证成功
        successCB({error, value});
      },
    ).catch(
      ({error, value}) => {
        // 验证失败，进行去空格验证
        const errorKeys = Object.keys(error);
        let errorMsg=[];
        let isSuccess = true;
        errorKeys.map((item) => {
          if (!isSuccess){
            return;
          }
          const temp=this.hasFieldError({
            value: value[item],
            rules: error[item]
          });

          if (temp){
            errorMsg=temp.map(item=>(item.warning));
            isSuccess=false;
          }
          else{
            isSuccess=true;
          }
          return null;
        });

        if (isSuccess) {
          successCB({error, value});
          return;
        }
        else{
          fail(errorMsg[0]);
          return;
        }

        // fail('请完善表单信息');
      },
    );
  }

  // rc-form 验证
  hasPaneError = ({pageForm, editFields, changeStatus}) => new Promise((resolve, reject) => {
    const {validateFields} = pageForm;
    const fields = editFields.map(item => item.id);

    validateFields(fields, (error, value) => {
      const errorRules = {};
      const cb = (errorInfo, result, isError) => {
        if (isError) {
          reject({error: errorInfo, value: result});
        } else {
          resolve({error: null, value: result});
        }
      };

      if (error) {
        const errorFields = Object.keys(error);
        errorFields.map((item) => {
          const field = editFields.filter(child => (child.id === item));
          if (!(Array.isArray(field)) && field.length === 1) {
            return null;
          }
          const {getFieldPropsOption = {}, id} = field[0];
          const {rules = []} = getFieldPropsOption;
          errorRules[id] = rules;
          return null;
        });
      }

      if (changeStatus) {
        this.setState({
          formError: errorRules,
          disabledBtn: !!error
        }, () => {
          cb(errorRules, value, !!error);
        });
      } else {
        cb(errorRules, value, !!error);
      }
    });
  })

  // 文本框 change 值检测
  hasFieldError = ({value, rules}) => {
    if (isObject(value)) {
      const {value: temp} = value;
      return check(temp, rules);
    }

    return check(value, rules);
  }

  // 去除字段中所有空格
  trimFields = ({value}) => {
    const result = {};
    if (!value) {
      return result;
    }

    const keys = Object.keys(value);
    if (!Array.isArray(keys)) {
      return result;
    }

    keys.map((item) => {
      const data = value[item];
      if (isObject(data)) {
        result[item] = data;
      } else {
        result[item] = trim(data);
      }
      return null;
    });

    return result;
  }

  inputChange = ({field = {}}) => (value,fields=[],values={}) => {
    const validateField=(field,value)=>{
      const {getFieldPropsOption = {}, id} = field;
      const {rules = []} = getFieldPropsOption;
      const error = this.hasFieldError({value, rules});
      this.setState(({formError})=>{
        if (error) {
          error.showError = 1;
        }
        const result = {
          ...formError,
          [id]: error
        };
        if (!error) {
          delete result[id];
        }
        return {
          disabledBtn: (Object.keys(result).length > 0),
          formError: result
        }
      })
    }
    if(!fields || fields.length===0) {
      validateField(field,value)
    }
    else{
      fields.map(field=>{
        validateField(field,values[field.id])
      })
    }
  }

  render() {
    const {disabledBtn, formError} = this.state;
    const {editFields, editBtn, pageForm, selectTab} = this.props;
    const editFieldsResult = editFields.map((item) => {
      const {getFieldPropsOption} = item;
      return {
        ...item,
        getFieldPropsOption: {
          ...getFieldPropsOption,
          onChange: this.inputChange({field: item, editFields})
        }
      };
    });

    return (
      <div>
        <List>
          {
            editFieldsResult.map(item => createField({...item, formError, pageForm}))
          }
        </List>
        <WhiteSpace size="lg"/>
        {
          editBtn.map((item, id) => (<Button
            key={id}
            disabled={disabledBtn || item.disabledButton}
            className={style.formBtn + ' ' + item.className}
            type="primary"
            onClick={this.onBtnClick({...item, selectTab, pageForm, editFields})}
            {...item.btnConfig}
          >
            {item.label}
          </Button>))
        }
      </div>
    );
  }
}

CreatePane.propTypes = {
  initForm: PropTypes.bool,
  initFormDataAPI: PropTypes.object,
  initFormRequestData: PropTypes.object,
  initFormConverData: PropTypes.func,
  pageForm: PropTypes.object,
  selectTab: PropTypes.number,
  editFields: PropTypes.array,
  editBtn: PropTypes.array
};

CreatePane.defaultProps = {
  initForm: false,
  initFormDataAPI: {},
  initFormRequestData: {},
  initFormConverData: () => {
  },
  pageForm: {},
  selectTab: '',
  editFields: [],
  editBtn: []
};

export default {
  CreatePane
};
