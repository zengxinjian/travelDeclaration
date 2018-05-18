/**
 *
 *  Created by youli on 2017/11/11
 *
 */

import React, { PropTypes } from 'react';
import { Modal, Button } from 'antd-mobile';

class Prompt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      val: ''
    };
  }

  ok = () => {
    const { val } = this.state;
    const { okClick } = this.props;
    okClick({ close: this.close, value: val });
  }

  close = () => {
    this.setState({
      visible: false,
      val: ''
    });
  }

  changeVal = (e) => {
    this.setState({
      val: e.target.value
    });
  }

  showPrompt = () => {
    this.setState({
      visible: true
    });
  }

  render() {
    const { visible, val } = this.state;
    const { buttonText, className, title, placeholder, size } = this.props;
    return (
      <div className={className}>
        <Modal
          transparent
          visible={visible}
          title={title}
          footer={[
            { text: '取消', onPress: this.close },
            {
              text: <a onClick={this.ok}>下一步</a>,
              onPress: () => new Promise(() => {

              })
            }
          ]}
        >
          <div className="am-modal-input-container">
            <div className="am-modal-input">
              <input
                autoFocus
                type="text"
                placeholder={placeholder}
                value={val}
                onChange={this.changeVal}
              />
            </div>
          </div>

        </Modal>
        <Button size={size} type="ghost" onClick={this.showPrompt}>{buttonText}</Button>
      </div>
    );
  }
}
Prompt.propTypes = {
  okClick: PropTypes.func,
  buttonText: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.string

};
export default {
  Prompt
};
