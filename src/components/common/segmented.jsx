/**
 *
 *  Created by youli on 2017/11/9
 *
 */
import React, { PropTypes } from 'react';
import * as styles from './segmented.less';
import { Flex } from 'antd-mobile';


class Segmented extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    };
  }


  SegmentedClick = (callback, item, index) => {
    callback(item, index);

    this.setState({
      selectedIndex: index
    });
  }

  render() {
    const { values, selectedIndex, onChange } = this.state;
    return (

      <Flex className={styles.segmented}>
        {
          values.map((item, index) => {
            let className = index == selectedIndex ? `${styles.segmentedSelected} ${styles.segmentedItem}` : styles.segmentedItem;
            if (index == values.length - 1) className += ` ${styles.segmentedLastItem}`;
            return <Flex.Item className={className} onClick={() => this.SegmentedClick(onChange, item, index)} key={index}>{item}</Flex.Item>;
          })
        }

      </Flex>

    );
  }
}

Segmented.propTypes = {
  selectedIndex: PropTypes.number,
  values: PropTypes.array,
  onChange: PropTypes.func,
  height: PropTypes.number
};

Segmented.defaultProps = {
  values: [],
  selectedIndex: 0,
  onChange: () => { }
};

export default {
  Segmented
};
