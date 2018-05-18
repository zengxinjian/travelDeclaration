/**
 *
 *  Created by youli on 2017/11/17
 *
 */

import React, { PropTypes } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import * as style from './index.less';

const Layout = ({ location, children }) => {
  return (
    <CSSTransitionGroup
      className={style.transitionWrapper}
      transitionName="slide-in"
      transitionEnterTimeout={300}
      transitionLeaveTimeout={300}
    >
      <div key={location.pathname} className={style.mainlayout}>
        {children}
      </div>
    </CSSTransitionGroup>
  );
};

Layout.propTypes = {
  location: PropTypes.object,
  children: PropTypes.object
};
export default Layout;
