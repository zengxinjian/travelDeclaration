import React, {PropTypes} from 'react';
import {InputItem, DatePicker, List} from 'antd-mobile';
import {VerificaCode} from '../common/verificaCode';
import {PassWordInputItem} from '../common/passWordInputItem';
import {City} from '../common/city';
import {BankcardNo} from '../bank/bankcardNo';
import {FetchSelect} from '../common/fetchSelect'
import {info} from '../../utils/dialog';
import {OilNo} from '../common/oilNo'
import * as style from './createField.less';

const createField = ({
                       id,
                       type,
                       label,
                       placeholder,
                       getFieldPropsOption,
                       config,
                       formError = {},
                       pageForm
                     }) => {
  const {getFieldProps, getFieldValue} = pageForm;

  const fieldError = (formError && formError[id]) || [];

  const onErrorClick = (error) => {
    /* if (Array.isArray(error) && error.length > 0) {
      info(error[0].message);
    }*/
    const errorIds = error.map(item => item.id);
    const {rules = []} = getFieldPropsOption;
    const hasError = (fieldId) => {
      const res = errorIds.filter(item => item === fieldId);
      return res.length > 0;
    };

    info(
      <div className={style.error}>
        {
          rules.map((item, index) => (
            <p
              key={index}
              className={hasError(item.id) ? style.fail : style.success}
            >
              {`${index + 1}：${item.warning}`}
            </p>
          ))
        }
      </div>, 2,
    );
  };

  const showElementError = (error) => {
    if (error.length === 0) {
      return null;
    }

    const {showError} = error;
    if (!showError) {
      return null;
    }

    return error;
  };

  const createVerificaCode = (fieldConfig, getValue) => {
    const {phone, phoneValue, rules, api} = fieldConfig;
    const validatePhone = (phone ? getValue(phone) : phoneValue);

    const res = {
      moneyKeyboardAlign: 'left',
      type: 'tel',
      extra: <VerificaCode
        api={api}
        phone={validatePhone}
        rules={rules}
      />
    };

    return res;
  };

  let commonConfig = {
    placeholder: placeholder || `请填写${label}`,
    ...config,
    type,
    key: id,
    clear: true,
    error: showElementError.bind(null, fieldError)(),
    onErrorClick: onErrorClick.bind(null, fieldError),
    ...getFieldProps(id, {...getFieldPropsOption})
  };

  switch (type) {
    case 'date':
      const {title} = config;
      return <DatePicker
        mode="date"
        key={id}
        title={title}
        format='YYYY-MM-DD'
        {...commonConfig}
      >
        <List.Item arrow="horizontal">{label}</List.Item>
      </DatePicker>;
    case 'oilNo':
      return <OilNo key={id} config={config} {...commonConfig}/>;
    case 'password':
      return <PassWordInputItem key={id} config={config} {...commonConfig} />;
    case 'city':
      return <City key={id} {...commonConfig} />;
    case 'bankCard':
      return <BankcardNo key={id} config={config} {...commonConfig} />;
    case 'other':
      return config.createElement({commonConfig});
    case 'fetchSelect':
      return <FetchSelect key={id} config={config} title={label} {...commonConfig}/>;
    case 'verificaCode':
      commonConfig = {
        ...commonConfig,
        ...(createVerificaCode(config, getFieldValue))
      };

      delete commonConfig.phone;
      delete commonConfig.rules;
      delete commonConfig.api;
      delete commonConfig.phoneValue;

      break;
    default:
      break;
  }

  return (
    <InputItem
      {...commonConfig}
    >
      {label}
    </InputItem>
  );
};

createField.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  getFieldPropsOption: PropTypes.object,
  config: PropTypes.object,
  formError: PropTypes.object,
  pageForm: PropTypes.object

};

export default {
  createField
};
