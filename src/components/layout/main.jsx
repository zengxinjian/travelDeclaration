/**
 *
 *  Created by youli on 2017/11/8
 *
 */

import React, { PropTypes } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { goBack } from '../../utils/tool';
import * as style from './main.less';


const PageContent = ({
                       children,
                       title,
                       rightContent,
                       leftContent,
                       className,
                       leftClick = () => (goBack())
                     }) => (
                       <div>
                         <NavBar
                           className={style.head}
                           mode="light"
                           icon={leftContent ? '' : <Icon type="left" />}
                           leftContent={leftContent}
                           onLeftClick={leftClick}
                           rightContent={rightContent}
                         >
                           {title}
                         </NavBar>

                         <div className={`${style.content} ${className}`}>
                           {children}
                         </div>

                       </div>
);
PageContent.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  rightContent: PropTypes.object,
  leftContent: PropTypes.object,
  className: PropTypes.string,
  leftClick: PropTypes.func
};
PageContent.defaultProps = {
  title: '',
  rightContent: null,
  leftContent: null,
  className: '',
  leftClick: undefined
};
export default {
  PageContent
};

