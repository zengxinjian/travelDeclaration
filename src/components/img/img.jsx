/**
 *
 *  Created by youli on 2017/11/11
 *
 */
import React, { PropTypes } from 'react';
import { ActivityIndicator, Flex } from 'antd-mobile';
import { windowWidth } from '../../utils/window';
import * as style from './img.less';

class Image extends React.Component {

  constructor(props) {
    super(props);
    const { rate = 1, diffWidth, maxWidth } = this.props;
    const winWidth = windowWidth - diffWidth;
    const width = winWidth < maxWidth ? winWidth : maxWidth;

    this.state = {
      height: (width * rate),
      isloading: true,
      width
    };
  }

  onLoad = () => {
    this.setState({
      isloading: false
    });
  }

  render() {
    const { src, className } = this.props;
    const { height, isloading, width } = this.state;

    return (
      <Flex
        style={{ height: `${height}px`, width: `${width}px` }} className={className}
        align="center"
      >
        <Flex.Item>
          <ActivityIndicator
            className={isloading ? style.loading : style.hide}
            animating={isloading}
          />
          <img
            alt=""
            onLoad={this.onLoad}
            width={`${width}px`}
            src={src}
            className={isloading ? style.hide : style.img}
          />
        </Flex.Item>
      </Flex>
    );
  }
}
Image.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string,
  rate: PropTypes.number,
  diffWidth: PropTypes.number,
  maxWidth: PropTypes.number
};
Image.defaultProps = {
  src: '',
  className: '',
  rate: 1,
  diffWidth: 0,
  maxWidth: innerWidth
};
export default {
  Image
};
