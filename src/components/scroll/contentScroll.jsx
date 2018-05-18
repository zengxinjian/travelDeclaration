/**
 *
 *  Created by youli on 2017/11/11
 *
 */

import React, { PropTypes } from 'react';
import { windowHeight } from '../../utils/window';
// 手机滑动组件
const JRoll = require('jroll');

class ContentScroll extends React.Component {
  constructor(props) {
    super(props);
    const { id = 'warpper', diffHeight } = this.props;
    this.state = {
      height: (windowHeight - 45 - diffHeight),
      id
    };
    this.jroll = null;
  }
 // 渲染页面
  componentDidMount() {
    const { id } = this.state;
    const { setJRoll } = this.props;
    const jroll = new JRoll(`#${id}`);
    setJRoll(jroll);

    this.jroll = jroll;
    this.jroll.refresh();
  }
// 组件完成更新时候调用
  componentDidUpdate() {
    this.jroll.refresh();
  }

  render() {
    const { height, id } = this.state;
    const { className } = this.props;

    return (
      <div id={id} style={{ height }} className={className}>
        <div id="scroller" style={{ paddingBottom: '15px' }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
// 定义类型 id字符串 diffHeight数据类型 setJRoll方法 className 字符串 children数组
ContentScroll.propTypes = {
  id: PropTypes.string,
  diffHeight: PropTypes.number,
  setJRoll: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.any
};
ContentScroll.defaultProps = {
  diffHeight: 0,
  id: 'warpper',
  setJRoll: () => {
  }
};
// 对外暴露方法
export default {
  ContentScroll
};
