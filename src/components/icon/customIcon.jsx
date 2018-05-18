/**
 *
 *  Created by youli on 2017/11/9
 *
 */
import React, { PropTypes } from 'react';

const CustomIcon = ({ type, className = '', size = 'md', ...restProps }) => (
  <svg
    className={`am-icon am-icon-${size} ${className}`}
    {...restProps}
  >
    <use xlinkHref={type} />
    {/* svg-sprite-loader@0.3.x */}
    {/* <use xlinkHref={#${type.default.id}} /> */} {/* svg-sprite-loader@lastest */}
  </svg>
);
CustomIcon.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
  restProps: PropTypes.object
};


export default {
  CustomIcon
};
