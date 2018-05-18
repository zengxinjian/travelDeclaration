/**
 *
 *  Created by niekaili on 2017/12/12
 *
 *  单选弹出框 只有查看与关闭
 *
 *  使用方法
 *
 *  <AlertModal
 *      ref="baseModal"
 *      liData={
 *        ['1.省内首台20元，每增加一台加5元；',
 *         '2.省外首台20元，每增加一台加10元；',
 *         '3.东北、西北首台20元，每增加一台加15元；',
 *         '4.海南首台24元，每增加一台6元']}
 *      title="快递费用说明"
 *   />
 *  引入调用的页面
 *
 *  显示方法：
 *  this.refs.baseModal.isVisible();
 *  其中 baseModal 要与 ref="baseModal" 一致
 *
 *
 *  接收参数:
 *
 *  liDate 每一条显示的数据 必须是数组
 *  title 显示的标题
 */

import React, { PropTypes } from 'react';

import { Modal } from 'antd-mobile';

import * as style from './base.less';


// 输入安全密码
class AlertModal extends React.Component {

  constructor(props) {
    super(props);
    // 初始化设置数据
    this.state = {
      visible: false,
      title: this.props.title
    };
  }

  // 关闭
  onClose = () => {
    this.setState({
      visible: false
    });
  }

  isVisible() {
    this.setState({
      visible: !this.visible
    });
  }


  render() {
    // 获取迭代数据
    const listItems = this.props.liData.map((value, index) =>
      <li key={index} className={style.li}>{value}</li>
     );

    return (
      <Modal
        visible={this.state.visible}
        transparent
        closable
        maskClosable
        title={this.state.title}
        onClose={this.onClose}
        footer={[{ text: '确认', onPress: this.onClose }]}
      >
        <div style={{ textAlign: 'left' }}>
          {listItems}
        </div>
      </Modal>
    );
  }
}

AlertModal.propTypes = {
  title: PropTypes.string, // 标题
  liData: PropTypes.array
};
// 默认提示
AlertModal.defaultProps = {
  title: '温馨提示',
  liData: []

};


export default {
  AlertModal
};
