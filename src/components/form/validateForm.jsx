/**
 *
 *  Created by youli on 2017/11/9
 *
 */

import React, { PropTypes } from 'react';
import { createForm } from 'rc-form';
import { CreateTags } from './createTags';
import { CreatePane } from './createPane';

const Form = ({
                editTags,
                pageForm,
                tabs,
                initFormDataAPI,
                initFormData,
                initFormRequestData,
                initForm,
                initFormConverData,
                className,
              }) => {
  if (Array.isArray(tabs) && tabs.length > 1) {
    return (
      <CreateTags
        initFormDataAPI={initFormDataAPI}
        initFormData={initFormData}
        initFormRequestData={initFormRequestData}
        initForm={initForm}
        initFormConverData={initFormConverData}
        editTags={editTags}
        pageForm={pageForm}
        tabs={tabs}
        className={className}
      />
    );
  }
  return (<CreatePane
    {...editTags[0]}
    initFormDataAPI={initFormDataAPI}
    initFormData={initFormData}
    initFormRequestData={initFormRequestData}
    initForm={initForm}
    initFormConverData={initFormConverData}
    pageForm={pageForm}
    selectTab={0}
    className={className}
  />);
};

Form.propTypes = {
  className:PropTypes.string,
  tabs: PropTypes.array,
  initForm: PropTypes.bool,
  initFormData:PropTypes.object,
  initFormDataAPI: PropTypes.object,
  initFormRequestData: PropTypes.object,
  initFormConverData: PropTypes.func,
  pageForm: PropTypes.object,
  editTags: PropTypes.array
};

Form.defaultProps = {
  className:'',
  tabs: [],
  initForm: false,
  initFormData:{},
  initFormDataAPI: {},
  initFormRequestData: {},
  initFormConverData: () => {
  },
  pageForm: {},
  editTags: [
    {
      editFields: [],
      editBeditBtn: []
    }
  ]
};

const ValidateForm = createForm()(Form);
export default {
  ValidateForm
};
