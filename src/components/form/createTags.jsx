/**
 *
 *  Created by youli on 2017/11/21
 *
 */

import React, { PropTypes } from 'react';
import { Tabs } from 'antd-mobile';
import { CreatePane } from './createPane';

class CreateTags extends React.Component {
  constructor(props) {
    super(props);
    const { tabs = [] } = this.props;
    this.state = {
      selectTab: tabs[0].value
    };
  }

  changeTabs = (a) => {
    this.setState({
      selectTab: a.value
    });
  }

  render() {
    const { selectTab } = this.state;
    const {
      editTags,
      tabs,
      pageForm,
      initFormDataAPI,
      initFormRequestData,
      initFormConverData,
      initForm,
      className,
    } = this.props;

    return (
      <Tabs tabs={tabs} onChange={this.changeTabs}>
        {
          editTags.map((item, index) => <CreatePane
            {...item}
            initFormDataAPI={initFormDataAPI}
            initFormRequestData={initFormRequestData}
            initForm={initForm}
            initFormConverData={initFormConverData}
            key={index}
            pageForm={pageForm}
            selectTab={selectTab}
            className={className}
          />)
        }
      </Tabs>
    );
  }
}

CreateTags.propTypes = {
  initForm: PropTypes.bool,
  initFormDataAPI: PropTypes.object,
  initFormRequestData: PropTypes.object,
  initFormConverData: PropTypes.func,
  tabs: PropTypes.array,
  editTags: PropTypes.array,
  pageForm: PropTypes.object
};

CreateTags.defaultProps = {
  className:'',
  initForm: false,
  initFormDataAPI: {},
  initFormRequestData: {},
  initFormConverData: () => {
  },
  tabs: [],
  editTags: [],
  pageForm: {}
};


export default {
  CreateTags
};
